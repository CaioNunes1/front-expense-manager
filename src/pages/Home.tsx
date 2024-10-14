import React, { useEffect, useState } from "react"
import { deleteCategory, getCategory, updateCategory } from "../services/category";
import { getUserId } from "../hooks/hook.userId";
import { useNavigate } from "react-router-dom";
import  Card  from "../components/Card";
import { getExpense, updateExpense } from "../services/expense";
import { getCategoryId } from "../services/category";
import BackIcon from "../components/BackIcon";
const Home = () => {
//assim que faz para quando tem que se passar um props no elemento
  interface DtoCategory{
    userId:number,
    name:string,
  }
  interface DtoExpense{
    amount:number,
    description:string,
    categoryId:number,
    userId:number,
  }
  //const[name,setCategoryCreated]=useState('');
  const navigate=useNavigate()
  const[showCategorieDetails,setShowCategorieDetails]=useState(false);
  const[categories,setCategories]=useState<DtoCategory[]>([]);
  const[expense,setExpense]=useState<DtoExpense>();
  const[name,setName]=useState('');
  const[categoryId,setCategoryId]=useState<number>(0);
  const[clickThreePoints,setClickThreePoints]=useState(false);
  const[activeCategory,setActiveCategory]=useState<string | null>(null)
  const userId=getUserId();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const[nameForEditExpense,setNameForEditExpense]=useState('');
  const[showEditExpense,setShowEditExpense]=useState(false);
  const [amount, setAmount] = useState(expense?.amount || "");
  const [description, setDescription] = useState(expense?.description || "");




  const handleClickThreePoints=( categoryName:string)=>{
      setActiveCategory(categoryName);
      setClickThreePoints(prev=>!prev);   
  }


  useEffect(()=>{
    if(userId !==null){
      const fetchCategory=async()=>{
        try{
          const categories=await getCategory(userId)
          setCategories(categories)
          //console.log(categories);
        }
        catch(error){
          console.log(error)
        }
      };

      fetchCategory();
    }
    else{
      console.log('userId Vazio!')
    }
    

    
  },[userId])//esse userId aqui significa que o useEffct será executado sempre que 
  //o userId mudar, no caso sendo outro usuário

  const AddCategory=()=>{
    navigate('/AddCategory')
  }

  const clickCategorie=(name:string)=>{
    //console.log(name,"nome e",userId,"userId");
    setShowCategorieDetails(prev=>!prev);
    setName(name);
    
    callHandle(name);
    //getExpenseHome();
  }

  const callHandle=async(name:string)=>{
    await handleGetCategoryId(name);
  }

  const handleGetCategoryId = async (name:string) => {
    try {
      if (userId) {
        //console.log(name,"name",userId,"userId handleGetCategoryId")
        const response = await getCategoryId({ name, userId });
        if (response && response > 0) {
          setCategoryId(response);
          await getExpenseHome(response); // Usa o response diretamente
        }
      } else {
        console.log(userId, "vazio");
      }
    } catch (e) {
      console.log("erro", e);
    }
  };
  

  const getExpenseHome =async(categoryId:number)=>{
    if(userId!=null){
      try{
        const response=await getExpense(userId,categoryId)
        setExpense(response);
      }
      catch(e){
        console.log("erro ao fazer requisição da categoria");
      }
    }
    
  }
  const handleEditClick = (categoryName: string) => {
    setEditingCategory(categoryName); // Ativa o modo de edição para a categoria clicada
    setNewCategoryName(categoryName); // Preenche o campo de input com o nome atual da categoria
  };

  const handleUpdateCategory= async(name:string,newName:string)=>{
    setClickThreePoints(false);
    try{
      if(userId){
        const response=await updateCategory({name,userId},newName);
//        setIsEditing(false);
        alert(`Categoria foi editada para ${response}`);
        window.location.reload();
        
      }
      console.log(categoryId);
    }
    catch(e){
      console.log(e,'erro ao fazer requisição');
    }
    finally{
      setEditingCategory(null);
    }
  }
  const handleEditExpense= async(name:string)=>{
    setNameForEditExpense(name);
    setShowCategorieDetails(prev=>!prev);
    setClickThreePoints(prev=>!prev);
    setShowEditExpense(prev=>!prev);
  }

  const handleSaveExpense=async(categoryName:string)=>{
    try{
      const updatedExpense={
        amount:editingExpenseAmount,
        description:description,
      } 

      await updateExpense({categoryId,})
    }
    catch(e){
      console.log(e);
    }
  }

  const handleDeleteCategory=async(name:string)=>{
    try{
      if(userId){
      const response = await deleteCategory({name,userId});
      alert(`Cateria deleteda ${name}`);
      window.location.reload();
      return response;
      }
    } 
    catch(e){
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col">

      <h2 className='flex justify-center relative top-6 text-25px'>Manager Expense</h2>
      <div className="flex relative left-5 bottom-1" onClick={()=>navigate('/SignIn')}>
        <BackIcon/>
      </div>        
      <div className="flex flex-col items-center relative top-32">
        {/* <label className="flex relative bottom-12">Adicione uma categoria</label> */}
        <form onSubmit={AddCategory}>
          <div className="flex justify-center w-80" style={{position:'relative', bottom:'60px'}}>
            <div>
              {/* <input type="text" value={name} placeholder="Digite uma categoria de gastos" className="h-10 w-60 " 
              style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.6)', width:'300px'}} 
              onChange={(e)=>setCategoryCreated(e.target.value)}/> */}
              <div className="flex justify-center relative top-5">
                <button className="h-12 w-60 bg-white hover:bg-gray-300" 
                style={{color:'#251893', borderRadius:'40px'}} >Adicione uma categoria</button>
              </div>
            </div>
          </div>
        </form>

      <h2>Expenses Categories</h2>
        <div className='flex justify-center w-80 overflow-y-scroll' style={{height:'400px', 
          borderRadius:'30px'}}>
          <ul className="flex flex-col" style={{cursor:'pointer'}} >
            {categories.map((category,index)=>(
              <div className="relative">
                <li key={index} >
                  {editingCategory ===category.name ?(
                    <div className="flex relative left-5 bg-transparent text-black font-bold focus:outline-none">
                      <input type="text"
                      value={newCategoryName}
                      onChange={(e)=>setNewCategoryName(e.target.value)}
                      onBlur={()=>handleUpdateCategory(category.name,newCategoryName)}
                      style={{paddingTop:'16px',
                      background:'rgba(255,255,255,0.5)',
                      borderRadius:'2px',width:'320px',}}
                      />
                    </div>
                  ) :
                    (
                      <Card title={category.name} 
                      onClick={()=>clickCategorie(category.name)} 
                      onClickThreePoints={()=>handleClickThreePoints(category.name)}/>
                  
                  )}
                  </li>
                  {showCategorieDetails && name === category.name && (
                    <div className="block">
                      <div className='flex justify-center relative left-5 w-80' style={{height:'auto', 
                          borderRadius:'5px',
                          background:'rgba(255,255,255,0.5)'}}
                          onClick={()=>setShowCategorieDetails(prev=>!prev)}>
                          Valor: {expense?.amount}
                          <br />
                          Descrição da despesa:{expense?.description}
                      </div>
                  </div>
                  )}
                  
                    {clickThreePoints && activeCategory === category.name && (
                        <div className="absolute flex-row bottom-2 left-36 w-40 h-18 rounded-md" style={{backgroundColor:'white',zIndex:10}}>
                          <p style={{color:'black'}} onClick={()=>handleEditClick(category.name)}>Editar Categoria</p>
                          <p style={{color:'black'}} onClick={()=>handleEditExpense(category.name)}>Editar Expense</p>
                          <p style={{color:'black'}} onClick={()=>handleDeleteCategory(category.name)}> Apagar Categoria</p>
                        </div>
                    )}

{showEditExpense && nameForEditExpense === category.name && (
  <div className="flex justify-center relative left-5 w-80" style={{height:'auto', borderRadius:'5px', background:'rgba(255,255,255,0.5)'}}>
    <input 
      type="number" 
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Valor"
      className="mb-2 w-full p-2 border border-gray-300 rounded"
    />
    <input 
      type="text" 
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Descrição"
      className="w-full p-2 border border-gray-300 rounded"
    />
    <button onClick={() => handleSaveExpense(category.name)} className="mt-2 bg-blue-500 text-white p-2 rounded">
      Salvar
    </button>
  </div>
)}

              </div>
            ))}
          </ul>
          
        </div>
      </div>
      
    </div>
  )
}

export default Home
