import React from 'react'

import {FaLock,FaEnvelope,FaUser} from 'react-icons/fa6'
import { useRef } from 'react';
export default function Login() {
    
  const email=useRef()
  let form=useRef()
  const password=useRef()
  async  function handleSubmit1(e){
    e.preventDefault()
    const formData = {
        // fullname: fullname.current.value,
        // number: number.current.value,
        email: "manager@gmail.com",
        password: "manager",
      };
      const response = await fetch('https://backend-projectmanager.onrender.com/api/v1/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      localStorage.setItem("token",result.token)
      if(result.id){
        if(result.role=="admin"){
          localStorage.setItem("user",JSON.stringify(result.user))

          window.location.href="/admin "

        }else{
          localStorage.setItem("role",result.role)
          localStorage.setItem("user",JSON.stringify(result.user))
          window.location.href="/dashboard "
        }
      }
  }
 async  function handleSubmit(e){
    e.preventDefault()
    const formData = {
        // fullname: fullname.current.value,
        // number: number.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      const response = await fetch('https://backend-projectmanager.onrender.com/api/v1/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      localStorage.setItem("token",result.token)
      if(result.id){
        if(result.role=="admin"){
          localStorage.setItem("user",JSON.stringify(result.user))

          window.location.href="/admin "

        }else{
          localStorage.setItem("role",result.role)
          localStorage.setItem("user",JSON.stringify(result.user))
          window.location.href="/home "
        }
      }
  }
  return (
    <>
        <div className="limiter relative overflow-clip flex justify-center items-center">
    <div className="h-[100vh] absolute top-0 z-10 left-0 w-[100vw] grid justify-center items-center bg-[rgba(255,255,255,0.8)]"></div>
    <div className="gradient w-[450px] abcdef justify-self-center z-[99] self-center" style={{
        backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.9))",
        backdropFilter: "blur(5px)",
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
    }}>
        <form className="login100-form validate-form" ref={form} onSubmit={handleSubmit}>
            <span className="login100-form-logo relative bottom-3">
                <i className="zmdi zmdi-landscape"></i>
                <FaUser />
            </span>

            <span className="login100-form-title  mt-2 pb-5  text-black">
                Log in
            </span>

            <div className="wrap-input100 validate-input grid " data-validate="Enter Email">
                <input className="input100 border-b-2  border-gray-300 focus:border-blue-500 text-black placeholder:text-black"  ref={email} style={{ outline: "none",paddingLeft:"30px" }} type="text" name="Email" placeholder="Enter Email" />
                <span className="focus-input100"></span>
                <span className="absolute left-0 top-3"><FaEnvelope fill="gray" size={"1.5em"} /></span>
            </div>

            <div className="wrap-input100 validate-input grid" data-validate="Enter password">
                <input className="input100 border-b-2 text-black border-gray-300 focus:border-blue-500 placeholder:text-black" style={{ outline: "none",paddingLeft:"30px" }} type="password" ref={password} name="pass" placeholder="Enter Password" />
                <span className="focus-input100"></span>
                <span className="absolute left-0 top-3"><FaLock color="gray" size={"1.5em"} /></span>
            </div>

            <div className="container-login100-form-btn">
                <button className="border pl-3 pr-3 pt-1 pb-1 border-gray-500   text-black ">
                    Login
                </button>
            </div>
            <p className="text-blue-500 text-xl mt-3 text-center font-semibold underline hover:text-blue-600 hover:cursor-pointer" onClick={handleSubmit1}>Login With Default Credentials</p>
        </form>
    </div>
</div>

   </>
  )
}
