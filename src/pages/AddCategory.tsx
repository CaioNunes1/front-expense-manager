import { useState } from "react";
import { createCategory, getCategoryId } from "../services/category";
import { getUserId } from "../hooks/hook.userId";
import { createExpense } from "../services/expense";
import { useNavigate } from "react-router-dom";
import BackIcon from "../components/BackIcon";
const AddCategory = () => {
    const[name,setCategoryCreated]=useState('');
    const[description,setDescription]=useState('');
    const[amount,setAmount]=useState<number>(0);
    const[categoryId,setCategoryId]=useState<number>(0)
    const userId=getUserId();
    const navigate=useNavigate();
    //let categoryId;

    function handleInputName(event:React.ChangeEvent<HTMLInputElement>){
      setCategoryCreated(event.target.value)
    }
    function handleDescription(event:React.ChangeEvent<HTMLInputElement>){
      setDescription(event.target.value)
    }
    
    const handleCreateCategory=async (event:React.FormEvent<HTMLButtonElement>)=>{
    event.preventDefault()
    try{
      if(userId!==null){
        const responseCategory=await createCategory({name,userId})     
  
        if(responseCategory!==null){
          //alert("categoria criada")
          await handleCreateExpense()
        }
        else{
          alert('Erro ao criar categoria')
        }
        
      }
    }
    catch(e){
      console.log(e);
    }
    if(event){
      console.log('event')
    }

    
  }

  const handleCreateExpense=async()=>{
    //pegando o id da categoria criada para passar para a expense
    if(userId){
      try{
        const responseGetcategoryId=await getCategoryId({name,userId});
        
        if(responseGetcategoryId){
          setCategoryId(responseGetcategoryId);//atualiza o categoryId

          if(responseGetcategoryId > 0){
            const responseExpense=await createExpense({amount,description,categoryId,userId});
  
            console.log(responseExpense);
  
            if(responseExpense){
              console.log(responseExpense)
              alert(`Expense criada categoria ${name}`);
              navigate('/Home')
            }
          }
          else {
            alert('Erro ao obter o ID da categoria');
          }
        }
        else {
          alert('Erro ao buscar categoria');
        }
        

      
      }
      catch(error){
        console.log(error)
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
        <div className="flex flex-row">
          <a onClick={()=>navigate('/Home')}>
          <BackIcon/>
          </a>
          <h1 className="text-25px mt-4">Expense Manager</h1>
          
        </div>
      </div>  

    <div className="flex justify-center">
        <div className="flex flex-col justify-center relative top-20">
            <h2 className="flex justify-center mb-5 text-20px">Adicione a sua expense</h2>
            <p>{categoryId}</p>
            {/* <form onSubmit={handleCreateCategory}> */}
                    <div id='white-transparent-container'className="flex flex-col w-80 " style={{height:'350px',background:'rgba(255, 255, 255, 0.5)',borderRadius:'25px'}}>
                        
                        <div className="flex flex-col relative left-9 top-6" style={{position:"relative",}}>
                            <label htmlFor="">Nome</label>
                            <input type="text" value={name} placeholder="Digite o nome da Expense" className="h-10 w-60 " 
                            style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}}  
                            onChange={handleInputName}/>
                        </div>

                        <div className="flex flex-col relative left-9 top-14">
                            <label htmlFor="">Descrição</label>
                            <input type="text" value={description} placeholder="Digite a descrição da dispesa" className="h-10 w-60" 
                            style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}}
                            onChange={handleDescription} />
                        </div>

                        <div className="flex flex-col relative left-9 top-24">
                            <label htmlFor="">Preço</label>
                            <input type="text" value={amount}  placeholder="Digite o preço da dispesa " className="h-10 w-60" 
                            style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} 
                            onChange={handleNumberChange}/>
                        </div>
                    </div>

                    <div id='Button' className="flex justify-center relative top-10">
                    <button 
                      className="h-12 w-60 bg-white hover:bg-gray-300" 
                      style={{color:'#251893', borderRadius:'40px'}}
                      onClick={handleCreateCategory} >Add</button>
                    </div>

                {/* </form> */}
        </div>
      </div>

    </div>
  )
}

export default AddCategory
