import jwt from 'jsonwebtoken';

// wants to like post
// click the like button => auth middleware(next) => like controller...

const auth = async (req,res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];

        const isCustomAuth = token.length < 500 ;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test'); // custom auth

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token); // google auth

            req.useerId = decodedData?.sub;
        }

        next();
    } catch (error) {
      console.log(error);  
    }
}

export default auth ; // we use it in routes