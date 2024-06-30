import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate(); // Obtém a função de navegação

  const handleGetStarted=()=>{
    return navigate('/SignIn')
  }
  return (
    <div className="h-screen flex flex-col justify-center ">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-30px" style={{fontWeight:'500'}}>Welcome to</h2>
        <h2 className="text-30px">Expense Manager</h2>
        <h3 style={{fontSize:'15px', position:"relative", top:'10px'}}>The best way to track your expenses</h3>
      </div>

      <div className="flex justify-center items-end relative top-36">
          <button className="h-12 w-60 bg-white" 
          style={{color:'#251893', borderRadius:'40px'}} onClick={handleGetStarted}>Get Started</button>
      </div>
      
    </div>

  )
}

export default FrontPage
