import { useState } from "react";
import { createCategory, getCategoryId } from "../services/category";
import { getUserId } from "../hooks/hook.userId";
import { createExpense } from "../services/expense";
import { useNavigate } from "react-router-dom";
const AddCategory = () => {
    const[name,setCategoryCreated]=useState('');
    const[description,setDescription]=useState('');
    const[amount,setAmount]=useState<number>(0);
    const[categoryId,setCategoryId]=useState<number>(0)
    const userId=getUserId();
    const navigate=useNavigate();
    //let categoryId;
    
    const handleCreateCategory=async (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    if(userId!==null){
      const responseCategory=await createCategory({name,userId})      


      if(responseCategory!==null){
        //pegando o id da categoria criada para passar para a expense
        const responseGetcateegoryId=await getCategoryId({name,userId});

        setCategoryId(responseGetcateegoryId);
        console.log('Setando id para criar expense')

        try{
          //const responseExpense=await createExpense({amount,description,categoryId,userId});
    
          // if(responseExpense!==null){
          //   console.log(responseExpense)
          //   alert('Expense criada');
          //   navigate('/Home')
          // }
        }
        catch(error){
          console.log(error)
        }
      }
      else{
        alert('Erro ao criar categoria')
      }


    }
  }

  const handleNumberChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const numValue=parseInt(e.target.value,10)//10 no final para flar que é um númereo decimal
    //usando o parseInt para converter o valor digitado que sempre será uma string para um number
    setAmount(numValue);
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-25px ml-5 mt-4">Expense Manager</h1>
      </div>  

    <div className="flex justify-center">
        <div className="flex flex-col justify-center relative top-20">
            <h2 className="flex justify-center mb-5 text-20px">Adicione a sua expense</h2>
            <p>{categoryId}</p>
            <form onSubmit={handleCreateCategory}>
                    <div id='white-transparent-container'className="flex flex-col w-80 " style={{height:'350px',background:'rgba(255, 255, 255, 0.5)',borderRadius:'25px'}}>
                        
                        <div className="flex flex-col relative left-9 top-6" style={{position:"relative",}}>
                            <label htmlFor="">Nome</label>
                            <input type="text" value={name} placeholder="Digite o nome da Expense" className="h-10 w-60 " 
                            style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}}  
                            onChange={(e)=>setCategoryCreated(e.target.value)}/>
                        </div>

                        <div className="flex flex-col relative left-9 top-14">
                            <label htmlFor="">Descrição</label>
                            <input type="text" value={description} placeholder="Digite a descrição da dispesa" className="h-10 w-60" 
                            style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}}
                            onChange={(e)=>setDescription(e.target.value)} />
                        </div>

                        <div className="flex flex-col relative left-9 top-24">
                            <label htmlFor="">Preço</label>
                            <input type="text" value={amount}  placeholder="Digite o preço da dispesa " className="h-10 w-60" 
                            style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} 
                            onChange={handleNumberChange}/>
                        </div>
                    </div>

                    <div id='Button' className="flex justify-center relative top-10">
                    <button className="h-12 w-60 bg-white hover:bg-gray-300" 
                        style={{color:'#251893', borderRadius:'40px'}} >Add</button>
                    </div>

                </form>
        </div>
      </div>

    </div>
  )
}

export default AddCategory
