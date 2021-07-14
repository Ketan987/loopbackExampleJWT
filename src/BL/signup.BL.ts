// import { inject } from "@loopback/context";

// export class UseeSignupBL {
//     constructor(){}
// }

export const signupBL = async(repository:any, userInfo:any) => {
    try{
        return await repository.create(userInfo)
    }
    catch(err){
        return new Error(err);
    }
}