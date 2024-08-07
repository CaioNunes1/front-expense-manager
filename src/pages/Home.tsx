import React, { useEffect, useState } from "react"
import { getCategory } from "../services/category";
import { getUserId } from "../hooks/hook.userId";
import { useNavigate } from "react-router-dom";

const Home = () => {
//assim que faz para quando tem que se passar um props no elemento
  interface DtoCategory{
    userId:number,
    name:string,
  }
  const[menuOpen,setMenuOpen]=useState(false)
  //const[name,setCategoryCreated]=useState('');
  const navigate=useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const[categories,setCategories]=useState<DtoCategory[]>([]);
  
  
  const userId=getUserId();


  useEffect(()=>{
    if(userId !==null){
      const fetchCategory=async()=>{
        try{
          const categories=await getCategory(userId)
          setCategories(categories)
          console.log(categories);
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

  
  

  return (
    <div className="flex flex-col">
      <h2 className='flex justify-center relative top-6 text-25px'>Manager Expense</h2>

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
        <div className='flex justify-center w-80' style={{height:'400px',background:'rgba(255,255,255,0.5)', 
          borderRadius:'30px'}}>
          <ul className="flex flex-col" style={{cursor:'pointer'}} onClick={toggleMenu} >
            {categories.map((category,index)=>(
              <div>
                <li key={index} >
                  <a >{category.name}</a> 
                  </li>
                  {menuOpen &&(
                    <div className="flex">
                      
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
