import React, { useState } from 'react'
import {signUpUser } from '../services/user'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
const[firstname,setFirstName]=useState('')
const[lastname,setLastName]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword]=useState('')
const[exists,setExists]=useState(false);
const navigate=useNavigate()


const handleButton=async (event:React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault()

  try{
    if(!firstname){
      return alert('Adicione um nome')
    }
    if(!lastname){
      return alert('Adicione um sobrenome')
    }
    if(!email){
      return alert('Adicione um email')
  }
    if(!password){
      return alert('Adicione uma senha')
    }
    
    

    const result=await signUpUser({firstname,lastname,email,password});
    

    if(result?.access_token){
      setExists(true);
      alert('Usuário criado com sucesso')
    }
    if(result?.access_token==403){
      return alert ('Credenciais incorretas')
    }
    if(result?.access_token==500){
      return alert('Erro ao cadastrar Conta')
    }
  }
  catch(error){
    console.log(error);
  }

  if(exists){
    navigate('/SignIn')
  }

}

  return (
    <div className='flex flex-col'>
      <h1 className='flex justify-center text-25px mt-4'>Expense Manager</h1>
      <div className='flex justify-center relative top-20'>
        <div className='flex flex-col'>
          <form onSubmit={handleButton}>
            <h2 className='flex justify-center relative bottom-6 text-20px'>Crie uma conta</h2>

            <div className='flex flex-col w-80' style={{height:'430px',background:'rgba(255,255,255,0.5)', borderRadius:'30px'}}>
              <div className="flex flex-col relative left-9 top-8" style={{position:"relative",}}>
                <label htmlFor="">Nome</label>
                <input type="text" placeholder="Digite seu nome" className="h-10 w-60 " value={firstname}
                style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}}
                onChange={(e)=>setFirstName(e.target.value)} />
              </div>

              <div className="flex flex-col relative left-9 top-16" style={{position:"relative",}}>
                <label htmlFor="">Sobrenome</label>
                <input type="text" placeholder="Digite seu sobrenome" className="h-10 w-60 " value={lastname}
                style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} 
                onChange={(e)=>setLastName(e.target.value)}/>
              </div>

              <div className="flex flex-col relative left-9 top-24" style={{position:"relative",}}>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Digite seu sobrenome" className="h-10 w-60 " value={email} 
                style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}}
                onChange={(e)=>setEmail(e.target.value)} />
              </div>

              <div className="flex flex-col relative left-9 top-32" style={{position:"relative",}}>
                <label htmlFor="">Senha</label>
                <input type="password" placeholder="Digite sua senha" className="h-10 w-60 " value={password}
                style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}}
                onChange={(e)=>setPassword(e.target.value)} />
              </div>

            </div>

            <div id='Button' className="flex justify-center relative top-10">
              <button className="h-12 w-60 bg-white hover:bg-gray-300" 
              style={{color:'#251893', borderRadius:'40px'}} >Cadastrar</button>
            </div>
        </form>      

        </div>
      </div>
    </div>
  )
}

export default SignUp
