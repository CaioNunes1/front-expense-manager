import React from 'react'

const SignUp = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='flex justify-center text-25px mt-4'>Expense Manager</h1>
      <div className='flex justify-center relative top-20'>
        <div className='flex flex-col'>
          <form action="">
            <h2 className='flex justify-center relative bottom-6 text-20px'>Crie uma conta</h2>

            <div className='flex flex-col w-80' style={{height:'430px',background:'rgba(255,255,255,0.5)', borderRadius:'30px'}}>
              <div className="flex flex-col relative left-9 top-8" style={{position:"relative",}}>
                <label htmlFor="">Nome</label>
                <input type="text" placeholder="Digite seu nome" className="h-10 w-60 " 
                style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} />
              </div>

              <div className="flex flex-col relative left-9 top-16" style={{position:"relative",}}>
                <label htmlFor="">Email</label>
                <input type="text" placeholder="Digite seu nome" className="h-10 w-60 " 
                style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} />
              </div>

              <div className="flex flex-col relative left-9 top-24" style={{position:"relative",}}>
                <label htmlFor="">Senha</label>
                <input type="password" placeholder="Digite seu nome" className="h-10 w-60 " 
                style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} />
              </div>

              <div className="flex flex-col relative left-9 top-32" style={{position:"relative",}}>
                <label htmlFor="">Senha novamente</label>
                <input type="password" placeholder="Digite seu nome" className="h-10 w-60 " 
                style={{borderRadius:'10px', color:'black', background:'rgba(255, 255, 255, 0.5)'}} />
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
