import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserType } from '../4-models/userModel';

interface UserContainer {
    user: UserType;
}

const secretKey = "shhhVeryVerySecret";

export const getNewToken = (user: UserType): string => {
    // Create container for the user object
    const container: UserContainer = {user};

    // create expiration time for token
    const options = { expiresIn: '24h' }

    // Generate the token
    const token = jwt.sign(container, secretKey, options);

    return token;
}

export const verifyToken = async (req: Request): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        try{
        // Tiken format: 
        // authorization header --> "Bearer asdnakjnfaknasldfalnfsdjkgnakjdnakdnaskdn"
        //                           01234567

        
        // extract geader from request
        const authHeader = req.header("authorization");

        // if there is no such header
        if(!authHeader){
            resolve(false);
            return;
        }

        // extract the token from the header
        const token = authHeader.substring(7);

        if(!token){
            resolve(false);
            return;
        }

        // verify the token
        jwt.verify(token, secretKey, (err) => {
            if(err){
                resolve(false);
                return;
            }

            // here the token must be legal
            resolve(true);
        })
        }catch(err: any){
            reject(err)
        }
    })
}


export const verifyAdmin = async (req: Request): Promise<boolean> => {
    // check if user is logged-in
    const isLoggedin = await verifyToken(req);

    // if not loggedin
    if(!isLoggedin) return false;

    // extract token
    const authHeader = req.header("authorization");
    const token = authHeader.substring(7);

    // extract container
    const container = jwt.decode(token) as UserContainer;

    const user = container.user;

    return user.role === 2 ? true : false;
}