const {sign, verify} = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign(
        {
            username: user.username,
            id: user.id
        },
        process.env.JWT_TOKEN_SECRET
    );

    return accessToken;
}


const validateToken = (request, response, next) => {

    const accessToken = request.cookies['access-token'];


    if(!accessToken){
        return response.status(400).json({error: 'User Not Authenticated'});
    }

    try{
        const validToken = verify(
            accessToken,
            process.env.JWT_TOKEN_SECRET
        )

        if(validToken) {
            request.authenticated = true;

            return next();
        }
    }
    catch(err){
        return response.status(400).json({error: err});
    }
}


module.exports = {createTokens,validateToken}