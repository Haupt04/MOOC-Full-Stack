import User from "../models/user.model.js";
import jwt from 'jsonwebtoken' 

const userExtractor = async (request, response, next) => {
    
    if (!request.token){
        request.user = null
        return next()
    }

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET);
        if (!decodedToken){
            request.user = null;
            return next()
        }

        const user = await User.findById(decodedToken.id)
        request.user = user || null
    } catch (error) {
        request.user = null
    }

    next()
}

export default userExtractor