import React, { useState } from 'react'

const Login = () => {
  const [currentState,setCurrentState] = useState('Sign Up');
  const [loginData, setLoginData] = useState({email:'',password:'',name:''});
  const onSubmitHandler = async (e) => {
      e.preventDefault();
      console.log(loginData)
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' action="">
        <div className='inline-flex items-center gap-2 mt-10'>
          <p className='prata-regular text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        {currentState==="Login"?"":<input onChange={(e)=>setLoginData({...loginData,name:e.target.value})} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
        <input onChange={(e)=>setLoginData({...loginData,email:e.target.value})} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
        <input onChange={(e)=>setLoginData({...loginData,password:e.target.value})} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password</p>
          {
            currentState==='Login'
            ? <p className='cursor-pointer' onClick={()=>setCurrentState("Sign Up")}>Create Account</p> : <p onClick={()=>setCurrentState("Login")} className='cursor-pointer'>Login Here</p>
          }
        </div>
        <button className='bg-black px-20 py-2 font-light text-white'>{currentState==="Login"?"Sign in":"Sign up"}</button>
        </form>
  )
}

export default Login