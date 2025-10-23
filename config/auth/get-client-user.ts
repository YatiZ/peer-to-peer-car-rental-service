"use client"

import { useSession } from "next-auth/react"

export default function getClientUser(){
    const {data: session} = useSession();
    return session?.user;
}