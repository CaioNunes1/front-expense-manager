import { useState } from "react"
import { getUser, signInUser } from "../services/user"
import { useNavigate } from "react-router-dom"


const SignIn = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[exists,setExists]=useState(false);
    const navigate=useNavigate();

    const handleLogin= async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        try{
            if(!email){
                return alert('Adicione um email')
            }
            if(!password){
                return alert('Adicione uma senha')
            }

            const result=await signInUser({email,password});
            const resultGetuser=await getUser(email)

            if(result?.access_token && resultGetuser!==null){
                setExists(true);
                
                localStorage.setItem('userId',resultGetuser.toString())
                
                alert('Logado com sucesso')
                
            }
            else if(result?.access_token===403){
                return alert ('Credenciais incorretas')
            }
            else{
                return alert ('Erro ao realizar login')
            }

            
        }
        catch(error){
            console.log(error)
        }

        if(exists){
            navigate('/Home')
        }
    }
  return (
    <div className="flex flex-col">
      <div className="flex justify-center">
        <h1 className="text-25px ml-5 mt-4">Expense Manager</h1>
      </div>  

    <div className="flex justify-center">
        <div className="flex flex-col justify-center relative top-20">
            <h2 className="flex justify-center mb-5 text-20px">Entre na sua conta</h2>
            <form onSubmit={handleLogin}>
                    <div id='white-transparent-container'className="flex flex-col h-72 w-80 " style={{background:'rgba(255, 255, 255, 0.5)',borderRadius:'25px'}}>
                        
                        <div className="flex flex-col relative left-9 top-12" style={{position:"relative",}}>
                            <label htmlFor="">Email</label>
                            <input type="text" value={email}placeholder="Digite seu email" className="h-10 w-60 " 
                            style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div className="flex flex-col relative left-9 top-24">
                            <label htmlFor="">Senha</label>
                            <input type="password" value={password} placeholder="Digite sua senha" className="h-10 w-60" 
                            style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div id='Button' className="flex justify-center relative top-10">
                        <button className="h-12 w-60 bg-white hover:bg-gray-300" 
                        style={{color:'#251893', borderRadius:'40px'}} >Login</button>
                    </div>

                </form>

            <div className="flex relative top-20 justify-center">
                <a href="SignUp" className="hover:bg-gray-400 p-2 rounded">Não tem cadastro? Cadastre-se Aqui </a>
            </div>
        </div>
      </div>

    </div>
  )
}

export default SignIn

// export const userId=(userId:number)=>{
//     HookUserId(userId)
// } 
