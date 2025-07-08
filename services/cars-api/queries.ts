import { useQuery } from "@tanstack/react-query";
import api, { authJsonHeader } from "../api"

export const getCarList = async()=>{
    const response = await api.get('/api/cars',{
        headers: await authJsonHeader(),
    });
    return response.data;
}

export const useGetCarList = ()=>{
    return useQuery({
        queryKey: ["car-list"],
        queryFn: ()=> getCarList(),
        select: (data)=> data.data || []
    })
}