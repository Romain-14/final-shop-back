import Query from "../model/query.js";

export const create = async (req,res,next) => {

    try {
        const query1 = "SELECT * FROM role WHERE title = ?";
        const result = await Query.getDataByValue(query1, req.body.title);
        if(result.length){
            res.status(409).json({
                msg: 'role already existing',
            });
            return;
        }
        const query2 = "INSERT INTO role (title) VALUES (?)";
            await Query.save(query2, req.body);
            res.status(201).json({
                msg: "role added",
            });        
    } catch (error) {
        return next(error);
    }
}

export const findAll = async (req,res)=>{
    try {
        const query = "SELECT * FROM role"
        const result = await Query.getAllDatas(query);
        res.status(200).json({
            result: result,
        })
    } catch (error) {
        return next(error);
    }
}