"use client"
import React from 'react'

import { useGetCarDetails } from '@/services/cars-api/queries';
import OwnerInfo from '../fleet/[id]/components/OwnerInfo';



const ContactPage = () => {
    const plateNo = "CARY77"
      const { data, isLoading, isError } = useGetCarDetails(plateNo);
      console.log(data)
  return (
    <div>
        {isLoading ? <p>Loading...</p>: <>
        <OwnerInfo owner={data.owner}/>
        </>
       
        }
        
    </div>
  )
}

export default ContactPage