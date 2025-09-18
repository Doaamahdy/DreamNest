import jwt from 'jsonwebtoken';

const generateJwt = (id)=>{
   const maxAge = process.env.MAX_AGE * 24 * 60 *60*1000;
   const token = jwt.sign({id},process.env.SECRET_KEY,{
      expiresIn:maxAge
   });
   return token;
}

export default generateJwt;