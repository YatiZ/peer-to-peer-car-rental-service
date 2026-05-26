"use client"
import { useQuery } from "@tanstack/react-query";
import api, { authJsonHeader } from "../api"

export const getCarList = async()=>{
    const response = await api.get('/cars',{
        headers: await authJsonHeader(),
    });
    console.log("Car List Response:", response.data);
    return response.data;
}

export const useGetCarList = ()=>{
    return useQuery({
        queryKey: ["car-list"],
        queryFn: ()=> getCarList(),
        select: (data)=> data || []
    })
}

export const getCarDetails = async(plateNo: string)=>{
    const response = await api.get(`/cars/${encodeURIComponent(plateNo)}/`,{
        headers: await authJsonHeader(),
    });
    return response.data;
}

export const useGetCarDetails = (plateNo?: string)=>{
    return useQuery({
        queryKey: ["car-detail", plateNo],
        queryFn: ()=> getCarDetails(plateNo as string),
        enabled: Boolean(plateNo),
        select: (data)=> data
    })
}
