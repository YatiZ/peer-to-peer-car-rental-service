import api from "../api";

export const getMe = async(token?:string)=>{
    if(!token){
        console.warn("getMe() called without a token");
        return null;
    }

    try {
        const response = await api.get("/me/",{
            headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
            }
        });
        console.log("response get", response.data)
        return response.data;
    } catch (error:any) {
         if (error.response) {
      console.error("getMe() API error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error("getMe() unexpected error:", error.message);
    }
    return null;
    }
}