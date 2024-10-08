import React, { useEffect, useState } from "react"
import { getCategory, updateCategory } from "../services/category";
import { getUserId } from "../hooks/hook.userId";
import { useNavigate } from "react-router-dom";
import  Card  from "../components/Card";
import { getExpense } from "../services/expense";
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
  const[menuOpen,setMenuOpen]=useState(false)
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickThreePoints=( categoryName:string)=>{
      setActiveCategory(categoryName);
      setClickThreePoints(prev=>!prev);
      
    
    console.log(clickThreePoints)
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
        console.log(name,"name",userId,"userId handleGetCategoryId")
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

  const handleUpdateCategory= async(name:string)=>{
    try{
      if(userId){
        const response=await updateCategory({name,userId});
      }
      
    }
    catch(e){
      console.log(e,'erro ao fazer requisição');
    }
  }
  const handleUpdateExpense= async()=>{
    console.log('chamou a função');
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
          {/* { showCategorieDetails  ? (
                    <div className='flex justify-center w-80 overflow-y-scroll' style={{height:'400px', 
                      borderRadius:'30px',
                      background:'rgba(255,255,255,0.5)'
                      }}>
                        Valor: {expense?.amount}
                        <br />
                        Descrição da despesa:{expense?.description}
                    </div>
                  ) :( */}
        <div className='flex justify-center w-80 overflow-y-scroll' style={{height:'400px', 
          borderRadius:'30px'}}>
          <ul className="flex flex-col" style={{cursor:'pointer'}} onClick={toggleMenu} >
            {categories.map((category,index)=>(
              <div className="relative">
                <li key={index} >
                  {/* <a onClick={()=>clickCategorie(category.name)} > */}
                    <Card title={category.name} 
                      onClick={()=>clickCategorie(category.name)} 
                      onClickThreePoints={()=>handleClickThreePoints(category.name)}/>
                  {/* </a>  */}
                  
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
                        <div className="absolute flex-row bottom-2 left-40 w-36 h-12 rounded-md" style={{backgroundColor:'white',zIndex:10}}>
                          <p style={{color:'black'}} onClick={()=>handleUpdateCategory(category.name)}>Editar Categoria</p>
                          <p style={{color:'black'}} onClick={handleUpdateExpense}>Editar Expense</p>
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
