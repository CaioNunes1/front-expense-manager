import { useState } from "react"

const SignIn = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
  return (
    <div className="flex flex-col">
      <h1 className="text-25px ml-5 mt-4">Expense Manager</h1>

    <div className="flex justify-center">
        <div className="flex flex-col justify-center relative top-20">
                <div id='white-transparent-container'className="flex flex-col h-72 w-80 " style={{background:'rgba(255, 255, 255, 0.5)',borderRadius:'25px'}}>
                    
                    <div className="flex flex-col relative left-9 top-12" style={{position:"relative",}}>
                        <label htmlFor="">Email</label>
                        <input type="text" value={email}placeholder="Digite seu email" className="h-10 w-60" 
                        style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} onChange={(e)=>setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col relative left-9 top-24">
                        <label htmlFor="">Senha</label>
                        <input type="password" value={password} placeholder="Digite sua senha" className="h-10 w-60" 
                        style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                </div>

                <div id='Button' className="flex justify-center relative top-10">
                    <button className="h-12 w-60 bg-white" 
                    style={{color:'#251893', borderRadius:'40px'}} >Login</button>
                </div>
        
        </div>
      </div>

    </div>
  )
}

export default SignIn
