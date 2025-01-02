import IconStore from '@/assets/icons';
import React, { useState } from 'react'
import { useAppSelector } from "@/hooks/use";
import axiosInstance from '@/axios/axiosInstances';

type prop ={
    post:any
}


const Repost : React.FC<prop> = ( post ) => {

    const { icon } = IconStore();

    const {currentUser} =  useAppSelector((state) => state.users);

    const [repostC,setRepostC] = useState(post.post.reposts.length);

    const handleRepost = async() => {
        
        setRepostC((prevCount:number) => prevCount + 1)

        const repostDoc = {
            userId: currentUser?._id,
            userProfilePic: currentUser?.profilePic,
            username: currentUser?.username
        }

        const postId = post.post._id

        console.log(currentUser)

        console.log(post.post._id)

        try {
            
                const response = await axiosInstance.post(`/posts/repost/${postId}`,repostDoc);
                
                console.log(response);

        } catch (error) {

                console.error("error",error);
            
        }


    }

  return (
  <div className="flex items-center space-x-1 cursor-pointer">
    <div onClick={handleRepost} className='w-5 h-5'>{icon.repost}</div>
    <p className="text-xs flex">{repostC}</p>
  </div>
  )
}

export default Repost