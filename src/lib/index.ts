import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { PrismaClient, type Session, type User } from "@prisma/client";
import type { RequestEvent } from "@sveltejs/kit";

export const prisma = new PrismaClient();

export function generateSessionToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token:string,userId:number): Promise<Session> {
   const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
   const session = {
    id:sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    }

    await prisma.session.create({
        data:session
    })
    return session
}

export async function validateSession(sessionToken:string):Promise<SessionValidationResult>{
    const  sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(sessionToken)))
        
     const result = await prisma.session.findUnique({
        where:{
            id:sessionId
        },
        include:{
            user:true
        }
    })
    if(!result){
        return {session:null,user:null,case:'no-user'}
    }

    const {user,...session}= result
    //expired session
    if(Date.now() >= session.expiresAt.getTime()){
        await prisma.session.delete({where:{id:sessionId}})
        return {session:null,user:null,case:'expired-token'}

    }

    if(Date.now()>= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15){
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        await prisma.session.update({
            where:{
                id:session.id
            },
            data:{
                expiresAt:session.expiresAt
            }
        })
    }
    return {session,user,case:''}
}

export async function invalidateSession(sessionId:string){
    await prisma.session.delete({where:{id:sessionId}})
}

export function setSessionTokenCookie(event:RequestEvent,token:string,expiresAt:Date){
    event.cookies.set("session",token,{
        httpOnly:true,
        sameSite:'lax',
        expires:expiresAt,
        path:'/'
    })
}

export function deleteSessionTokenCookie(event:RequestEvent){
    event.cookies.set("session",'',{
        httpOnly:true,
        sameSite:'lax',
        maxAge:0,
        path:'/'
    })
}

export function passwordHash(password:string){
    const passwordHash = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
    return passwordHash
}


export type SessionValidationResult = {
    session: Session|null
    user :User|null
    case:string
}