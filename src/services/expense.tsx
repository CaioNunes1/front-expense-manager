import api from "./api/api";

interface DtoExpense{
    amount:number,
    description:string,
    categoryId:number,
    userId:number,
}

export async function getExpense(userId:number,name:string){
    try{
        const response=await api.get('expenses/getUserExpensesById',{
        params:{//usa o params para quando for parametro, e não for um objeto
            userId:userId,
            name:name
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