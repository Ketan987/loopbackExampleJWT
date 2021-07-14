import { throws } from "should";
import { UserModel } from "../models";
import { UserModelRepository } from "../repositories";

export class UserAuth {
    
    public repository: any;
    public userInfo :any;
    public jwt : any;
    constructor(
        repository:any,
        userInfo:any,
        jwt:any
    ){
        this.repository = repository;
        this.userInfo = userInfo;
        this.jwt = jwt;
    }

    static async signupBL(repository:any, userInfo:any){
        try{
            return await repository.create(userInfo)
        }
        catch(err){
            throw new Error(err);
        }
    }

    static async loginBL(repository:any, userInfo:any, jwt:any){
        try{
            let person = await checkUser(repository, userInfo);
            // console.log("person", person);
            if(person){
                // console.log(person);
                let token = await jwt.sign({username : userInfo.username}, "Secret", {expiresIn : "1H"});
                return {token}
            }
            else{
                throw new Error("User Not Present")
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }
}

async function  checkUser(repository:any, userInfo:any) {
    // console.log("userInfo", userInfo);
    let out = await repository.findOne({where : {username: userInfo.username, password : userInfo.password}})
    // console.log(out);
    return out;
}