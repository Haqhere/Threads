import React, { useState,useEffect } from 'react'
import './follow.css'
import axiosInstance from '@/axios/axiosInstances';
import Spinner from '../loading/load';


const Follow :React.FC<{user:any}>= (user) => {



    const[followed,setFollowed] = useState('Follow');

    const[status,setStatus] = useState(false);

    const[fcount,setFcount] = useState(user.user.followers.length);

    const userId = localStorage.getItem('userId');

    const senderId = user.user._id;

    

    useEffect(() => {
    if(user.user.followers.includes(userId))
    {
        setFollowed("Following");
    }else{
        setFollowed('Follow');
    }
    },[userId])





    const handleFollow = async() => {

        setStatus(true);
        try{
            const response = await axiosInstance.post(`/users/follow/${userId}`,{
                userFollowId:  senderId
            });
            console.log(response)
            
        }catch(error){
            console.error('error',error)
        }
         setStatus(false);
    }

    
    const handleFollowing = async() => {
        try{
            const response = await axiosInstance.post(`/users/following/${userId}`, {senderId} );
            console.log(response);
        }catch(error){
            console.error("error",error)
        }
    }




    const handleunFollowing = async() => {
        try{
            const response = await axiosInstance.delete(`/users/following/${userId}`, {data:{senderId}} );
            console.log(response);
        }catch(error){
            console.error("error",error)
        }
    }





    const handleUnFollow = async() => {
       
        setStatus(true);
        try{
            const response = await axiosInstance.post(`/users/unfollow/${userId}`,{
                userUnfollowId: senderId
            });
            console.log(response);
        }catch(error){
            console.error('error',error)
        }
        setStatus(false);
    }




    const handleClick = () => {

        
        if(followed === 'Follow')
        {
            setFollowed("Following")
            setFcount(fcount + 1);
            handleFollow();
            handleFollowing();
        }else{
            setFollowed('Follow')
            setFcount(fcount - 1);
            handleUnFollow();
            handleunFollowing();
        }
       
    }




  return (
    
<div className='bar-info'> 
    <div> 
        <p >{user.user.username}</p> 
        <p className='text-neutral-600'>{user.user.name || "..."}</p>
        <p className='mt-4 mb-3'>{user.user.followers.length }</p>
    </div>
    <div className='fl-btn'>
         <button className='follow-btn' onClick={handleClick}>{status=== true ? <Spinner/>: followed }</button>
    </div>
</div>
   
  )
}

export default Follow
    