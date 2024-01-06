const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const {createTokens, validateToken} = require('../middlewares/JWT');

const dbOperation = require('../dbFiles/dbOperations/dbUserOperations');


router.get('/getusers', validateToken,async (request, response)=>{

    dbOperation.getUsers().then(res=>{
        response.status(200).json(res.recordset);
    })
})


router.post('/register', async (request, response)=>{

    const {username, password} = request.body;

    bcrypt.hash(password, 10).then(async (hash)=>{


        dbOperation.insertUser({username, hash}).then(res=>{
           response.status(200).json('registersuccess')

        }).catch((error)=>{
            response.status(500).json({error: error});

        })

    })
})




router.post('/login', async (request, response)=>{

    const {username, password} = request.body;

    

    dbOperation.getUsersByName({username}).then(res=>{

     



        bcrypt.compare(password, res.recordset[0].password).then((match)=>{
            if(!match){
                response.json({error: 'Wrong Password'});
            }
            else{
                const accessToken = createTokens({username: res.recordset[0].username, id: res.recordset[0].id});

                response.cookie('access-token', accessToken,{
                    maxAge: 60*60*24*30*1000,
                    httpOnly: true,
                })

                response.status(200).json('loginsuccess');
            }
        })

     }).catch((error)=>{
         response.status(500).json({error: error});

     })
    

})


module.exports = router;