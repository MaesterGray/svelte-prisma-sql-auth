import { createSession,prisma,passwordHash,generateSessionToken,setSessionTokenCookie } from "$lib";
import { redirect } from "@sveltejs/kit";



export const actions={
    login : async(requestEvent)=>{
    const formdata = Object.fromEntries(await requestEvent.request.formData())
    const {password,email}  = formdata as {password:string,email:string}
    const user = await prisma.user.findFirst({
        where:{email:email},
        include:{sessions:true}
    })
    if(!user) return{message:'failed',reason:'user does not exist'}
    if(passwordHash(password)!==user?.passwordHash){
        return {message:'failed',reason:'password or email incorrect'}
    }
    const newToken = generateSessionToken()
    const newSession = await createSession(newToken,user.id)
    setSessionTokenCookie(requestEvent,newToken, newSession.expiresAt)
    redirect(303,'/profile')
    }
}

