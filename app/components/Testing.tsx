"use client"

import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react";

const Testing = () => {
   const { data: session, status } = useSession();
    // const extractTest = test.length
    // console.log(extractTest)
    console.log("session data", session)

    if (status === "loading") return <p>Loading...</p>;
  if (!session)
    return <button onClick={() => signIn()}>Login</button>;
  return (
     <div>
      <p>Logged in as {session.user?.email}</p>
      <p>Name: {session.user?.username}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}

export default Testing