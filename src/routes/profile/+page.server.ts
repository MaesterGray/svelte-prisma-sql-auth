import { redirect } from '@sveltejs/kit'
import { deleteSessionTokenCookie,invalidateSession } from '$lib'
import { encodeHexLowerCase } from '@oslojs/encoding'
import { sha256 } from '@oslojs/crypto/sha2'

export const load = async({locals})=>{

    return{
        user: locals.userAndSession.user,
        session:locals.userAndSession.session
    }
}

export const actions ={
    signOut : async(requestEvent)=>{
        const sessionToken = requestEvent.cookies.get('session')
        const  sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)))
        await invalidateSession(sessionId)
        deleteSessionTokenCookie(requestEvent)
        redirect(303,'/login')
    }
}