import api from "./api/api";

interface DtoCategory{
    name:string,
    userId:number,
}

// interface DtoCategoryResponse{
//     name:string,
//     userId:number,
//     id:number
// }

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

export const createCategory =async({name,userId}:DtoCategory)=>{
    try{
        const response =await api.post('category/create',{name,userId})
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

export const getCategoryId = async({name,userId}:DtoCategory)=>{
    try{
        const response= await api.get('category/getCategoryId',{
            params:{name,userId}
        })
        return response.data;
    }
    catch(e){
        console.log(e);
    }
}

export const updateCategory=async({name,userId}:DtoCategory,newName:string)=>{
    try{
        const response=await api.put(`category/updateCategory?newName=${newName}`,{name,userId})
        return response.data;
    }
    catch(e){
        console.log(e)
    }
}

export const deleteCategory=async({name,userId}:DtoCategory)=>{
    try{
        const response= await api.delete('category/delete', {
            params:{name,userId}
        })
        return response.data;
    }
    catch(e){
        console.log(e);
    }

}