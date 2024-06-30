import api from "./api"  
interface DtoSignIn{
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
