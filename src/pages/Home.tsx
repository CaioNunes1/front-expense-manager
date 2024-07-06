import { useEffect, useState } from "react"
import { getCategory } from "../services/category";
import { getUserId } from "../hooks/hook.userId";
// interface PropsHome{
//   userId:number
// }

const Home/*: React.FC<PropsHome>*/ = () => {
//assim que faz para quando tem que se passar um props no elemento
  interface DtoCategory{
    userId:number,
    name:string,
  }


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

  return (
    <div className="flex flex-col">
      <h2 className='flex justify-center relative top-6 text-25px'>Manager Expense</h2>

      <div className="flex flex-col items-center relative top-52">
          <h2>Expenses Categories</h2>
        <div className='flex justify-center w-80' style={{height:'400px',background:'rgba(255,255,255,0.5)', 
          borderRadius:'30px'}}>
          <ul className="flex flex-col">
            {categories.map((category,index)=>(
              <li key={index}>
                <p>{category.name}</p> 
                </li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Home
