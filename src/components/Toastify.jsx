import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

export const Toastify = ({err,signin,signup,resetPw,update,deleteUser}) => {

    console.log(err);
    
    const {setMsg} = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(err){
            toast.error(err,{position:"top-left"})
        }else if(signin || signup){
            toast.success(signin,{position: "top-center"})
            setTimeout(()=>navigate('/'),2000)
        }else if(resetPw){
          toast.success(resetPw,{position: "top-center"})
          setTimeout(()=>navigate('/auth/in'),2000)
        }else if(update){
          toast.success(update,{position: "top-center"})
        }else if(deleteUser){
            toast.success(deleteUser,{position: "top-center"})
            setTimeout(()=>navigate('/'),2000)
        }
        setMsg({})
    },[err,signin,signup,resetPw,update,deleteUser])


  return (
    <div>
      <ToastContainer/>
    </div>
  )
}


