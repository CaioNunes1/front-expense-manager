import api from "./api/api"  
interface DtoSignIn{
  email:string,
  password:string,
}

interface DtoSignUp{
  firstname:string,
  lastname:string,
  email:string,
  password:string,
}
export async function signInUser({email,password}:DtoSignIn){
  try{
    const  response =await api.post('auth/signin',{email,password})
    return response.data
  }
  catch(error){
    console.log(error)
    return error
  }
}

export async function signUpUser({firstname,lastname,email,password}:DtoSignUp){
  try{
    const response=await api.post('auth/signup',{firstname,lastname,email,password})
    return response.data;
  }
  catch(error){
    console.log(error);
    return error;
  }
}

export async function getUser(email:string){
  try{
    const response=await api.get('auth/getUser',{
      params:{
        email:email,
      }
    })

    return response.data
  }
  catch(error){
    console.log(error);
  }
}
