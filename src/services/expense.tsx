import api from "./api/api";

interface DtoExpense{
    amount:number,
    description:string,
    categoryId:number,
    userId:number,
}

export async function getExpense(userId:number,categoryId:number){
    try{
        const response=await api.get('expenses/getUserExpensesById',{
        params:{//usa o params para quando for parametro, e não for um objeto
            userId:userId,
            categoryId:categoryId,
        }    
        })
        return response.data
    }
    catch(error){
        console.log(error);
    }
}

export async function createExpense({amount,description,categoryId,userId}:DtoExpense) {
    try{
        const response=await api.post('expenses/create',{amount,description,categoryId,userId});
        return response.data;
    }
    catch(error){
        console.log(error);
    }
    
}

export const updateExpense=async({categoryId,amount,description}:DtoExpense)=>{
    try{
        const response= await api.put('expense/update',{categoryId,amount,description});
        return response.data;
    }
    catch(e){
        console.log(e);
    }
    
}