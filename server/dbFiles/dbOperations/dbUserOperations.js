const config = require('../dbConfig'),
    sql = require('mssql');



const getUsers = async ()=>{
    try{
        let pool = await sql.connect(config);
        let users = pool.request().query('Select * from dbo.tb_users');
        return users;
    }
    catch(err){
        console.log(err);
    }
}


const getUsersByName = async ({username}) => {

    try {
        let pool = await sql.connect(config);
        let user = pool.request().query(`SELECT * from dbo.tb_users WHERE username='${username}'`);
        return user;
    }
    catch(err){
        console.log(err);
    }
}

const insertUser = async ({username,hash}) => {

    try{
        let pool = await sql.connect(config);

        let result = pool.request()
            .query(`INSERT INTO dbo.tb_users (username, password) VALUES
                ('${username}','${hash}')
            `);

        return result;
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {
    getUsersByName,
    insertUser,
    getUsers
}