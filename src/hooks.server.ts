import { redirect } from '@sveltejs/kit'
import { validateSession} from '$lib'

export const handle = async({event,resolve})=>{
        const sessionToken = event.cookies.get('session')
    if(event.url.pathname.startsWith('/profile')){

        if(sessionToken===undefined){
             return redirect(303,'/')

        //    return resolve(event)
        }
        if(sessionToken !== undefined){
            const result = await validateSession(sessionToken)
            if(!result.session){
                switch (result.case) {
                    case 'no-user':
                        redirect(300,'/')

                        break;
                    case 'expired-token':
                        redirect(300,'/login')

                        break;
                    default:
                        break;
                }
            }
            event.locals.userAndSession= {user:result.user,session:result.session,case:''}
            return resolve(event)
    }
    } else{
        if(sessionToken){
            redirect(303,'/profile')
        }
    }
    return resolve(event)
}