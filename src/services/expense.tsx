import api from "./api/api";

// interface DtoExpense{
//     amount:number,
//     description:string,
//     categoryId:number,
//     userId:number,
// }

export async function getExpense(userId:number){
    try{
        const response=await api.get('expenses/getUserExpensesById',{
        params:{//usa o params para quando for parametro, e não for um objeto
            userId:userId,
        }    
        })
        return response.data
    }
    catch(error){
        console.log(error);
    }
}