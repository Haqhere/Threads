"use client"

import React from 'react'
import "./reply.css"


type propTypes = {
    open: boolean;
    onClose: () => void;
    post: any;
  };


const Replys: React.FC<propTypes> = ({ open, onClose, post,})=> {

  if (!open) return null;
  
  console.log(post.replies);

  return (
    <div className='R-background' onClick={onClose}>
        <div className="R-box" onClick={(e) => e.stopPropagation()} >

            <div className="rsection-1 pl-5 pr-5 pt-5">

                <div className="rprofile flex gap-2">
                    <img src={ post.postById?.profilePic || "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"} alt="post" className='w-9 h-9 object-cover rounded-full border border-gray-700'/>
                    <p>{post.postById.username}</p>
                </div>

                <p className='mt-4'>{post.text}</p>

                <img src={post.image} alt="post-img" className='post-img' />

            </div>

            <hr className='border-neutral-600'/>

            

            {post.replies.map((p:any) => (
                <div className="pr-box h-[100px] flex " key={p._id}>
                    <div className='pr-pro pl-5 pt-5'>
                         <img src={ p.userProfilePic || "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"} alt="post" className='w-9 h-9 object-cover rounded-full border border-gray-700'/>
                    </div>
                    <div className='pr-content pl-5 pt-5'>
                        <p>{p.username || "user" }</p>
                        <p>{p.text}</p>
                    </div>
                </div>
            ))}

            

        </div>
    </div>
  )
}

export default Replys