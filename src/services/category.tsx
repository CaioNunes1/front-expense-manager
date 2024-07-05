import api from "./api/api";

interface DtoCategory{
    name:string,
    userId:number,
}

export const getCategory= async (userId:number): Promise<DtoCategory[]> =>{
    try{
        const response=await api.get('category/getUserCategoryById/',{
            params:{
                userId:userId,
            }
        });
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}