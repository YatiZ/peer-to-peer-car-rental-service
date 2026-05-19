import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { CarCreationPayload } from "./schema";

const createCar = async (payload: CarCreationPayload) =>{
    const response = await api.post("/cars/", payload);
    console.log("create car", response)
    return response.data
}

export const useCreateCarMutation = ()=>{
    return useMutation({
        mutationFn: (payload: CarCreationPayload) => createCar(payload),
        onSuccess: (data) => {
            console.log("Car created successful", data);
        }
    })
}

const uploadImage = async (file:File)=>{
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post("/upload/", formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    console.log("upload mutation", response.data)
    return response.data;
}

export const useUploadImageMutation = ()=>{
    return useMutation({
        mutationFn: (file: File) => uploadImage(file),
        onSuccess: (data)=> {
            console.log("upload image success!")
        }
    })
}