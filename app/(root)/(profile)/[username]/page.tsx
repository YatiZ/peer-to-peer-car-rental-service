import { Metadata } from 'next';
import React from 'react'

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({params}:Props):Promise<Metadata> {
    const {username} = await params;
    return {

    }
}
