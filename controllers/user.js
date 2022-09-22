import { v4 as uuidv4 } from 'uuid';
import {hash, compare} from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
import mailing from '../lib/mailing.js';

const {TOKEN_SECRET} = process.env;

import Query from '../model/query.js';

export const findAll = async (req, res, next) => {
    try {
        const query = "SELECT * FROM user";
        const users = await Query.getAllDatas(query);

        res.status(200).json({
            msg: "all users retrieved",
            result: users,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const findOne = async (req, res, next) => {
    try {
        const query = "SELECT email, alias, firstname, lastname, address, zip, city, signup_date, phone, image_name, uuid, role_id FROM user WHERE uuid = ?";
        const [user] = await Query.getDataByValue(query, req.params.uuid);

        res.status(200).json({
            msg: "user retrieved",
            result: user,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

export const create = async (req, res, next) => {
    try {
        const datas ={
            email: req.body.email,
            password: await hash(req.body.password, saltRounds),
            uuid: uuidv4(),
        }
        const query1 = "SELECT * FROM user WHERE email = ?";
        const user = await Query.getDataByValue(query1, req.body.email)
        if(user.length){
            res.status(409).json({
                msg: 'user already existing',
            });
            return next(error);
        }
        const query2 = "INSERT INTO user (email, password, signup_date, uuid, isAccountValidated, role_id) VALUES (?,?,NOW(),?,'no',3 )";
        await Query.save(query2, datas);
        // fonction envoi de mail ci-dessous en transmettant l'email du nouvel user et de son uuid
        mailing(req.body.email, "Validation du compte", "Bienvenue", "Encore une petite étape, plus qu'à cliquer sur le lien ci-dessous ", datas.uuid );
        res.status(201).json({
            msg: "Welcome, check your email to validate your registration ",
        })
        
    } catch (error) {
        return next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const query1 = "SELECT * FROM user WHERE email = ?";
        const [user] = await Query.getDataByValue(query1, email);
        console.log(email, user)
        if(!user || (user.email !== req.body.email)){
            res.status(404).json({
                msg: "user does not exist",
            });
            return;
        } 
        const isSame = await compare(password, user.password);        
        if(isSame){
            const TOKEN = jwt.sign({uuid: user.uuid}, TOKEN_SECRET );
            res.status(200).json({
                token: TOKEN,
                uuid: user.uuid,
                role: user.role_id
            });
            return;
        } else {
            res.status(401).json({msg: "bad password"});
            return;            
        }
        
    } catch (error) {        
        return next(error);
    }
}

export const update = async (req,res,next) => {
    const {datas} = req.body;
    try {
        const newDatas = {
            alias: datas.alias || null,
            firstname: datas.firstname || null,
            lastname: datas.lastname || null,
            address: datas.address || null,
            zip: parseInt(datas.zip) || null,
            city: datas.city || null,
            phone: parseInt(datas.phone) || null,
            uuid: req.params.uuid
        }
        const query = "UPDATE user SET alias = ?, firstname = ?,lastname = ?, address = ?, zip = ?, city = ?, phone = ? WHERE uuid = ?";
        await Query.save(query, newDatas);
        res.status(200).json({
            msg: "User updated",
        });
        return;
    } catch (error) {
        return next(error)
    }
}

export const remove = async (req,res,next) => {
    try {
        const query = "DELETE FROM user WHERE uuid = ?";
        await Query.remove(query, datas);
        res.status(200).json({
            msg: "user deleted",
        });
        return;
    } catch (error) {
        return next(error)
    }
}

export const updateValidatedEmail = async (req,res,next) => {
    const datas = {
        uuid: req.params.uuid,
    }
    const query = "UPDATE user SET isAccountValidated = 'yes' WHERE uuid = ?";
    try {
        await Query.save(query, datas);
        res.status(200).json({
            msg: "Compte validé !",
        })
    } catch (error) {
        return next(error);
    }
}