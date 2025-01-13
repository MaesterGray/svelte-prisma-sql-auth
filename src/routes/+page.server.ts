import { createSession,generateSessionToken,setSessionTokenCookie,prisma,passwordHash } from '$lib'
import { redirect } from '@sveltejs/kit'

export const actions = {
    signUp: async(requestEvent)=>{

        try{
            const formdata = Object.fromEntries(await requestEvent.request.formData())
            const email = formdata.email as string
            const password = formdata.password as string
            const user = await prisma.user.create({
                data:{
                    email,
                    passwordHash:passwordHash(password)
                }
            })
            const sessionToken = generateSessionToken()
            const session = await createSession(sessionToken,user.id)
            setSessionTokenCookie(requestEvent,sessionToken,session.expiresAt)

        }catch(err){
            console.log(err)
            return {message:'failure'}
        }
        redirect(303,'/profile')
        
    }

}