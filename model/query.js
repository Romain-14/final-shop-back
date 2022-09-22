import pool from '../database/db.js';

class Query {

    static async save(q, d){
        const [result] = await pool.execute(q, [...Object.values(d)]);
        return result; 
    }

    static async getDataByValue(q, v){
        const [result] = await pool.execute(q, [v]);
        return result;
    }

    static async getAllDatas(q){
        const [result] = await pool.execute(q);
        return result;
    }

    static async remove(q, uuid){
        const [result] = await pool.execute(q, [uuid]);
        return result;
    }

}

export default Query;