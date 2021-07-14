

async function checkUser(repository:any, userInfo:any) {
    return await repository.findOne({username: userInfo.username})
}

export const loginBL = async(repository:any, userInfo:any, jwt:any)=>{
    try{
        let person = await checkUser(repository, userInfo);
        if(person){
            console.log(person);
            let token = await jwt.sign({username : userInfo.username}, "Secret", {expiresIn : "1H"});
            return {token}
        }
        else{
            return new Error("User Not Present")
        }
    }
    catch(err){
        return new Error(err.message)
    }
}