"use client"
import React, { useState } from 'react'
import "./comment.css"
import { useAppSelector } from '@/hooks/use';
import IconStore from '@/assets/icons';
import axiosInstance from '@/axios/axiosInstances';
import { toast } from 'react-toastify';

type propTypes = {
    open: boolean;
    onClose: () => void;
    post: any;
  };

const CommentModal: React.FC<propTypes> = ({ open, onClose, post }) => {


    if (!open) return null;

    console.log(post);

    const { currentUser } = useAppSelector((state) => state.users);
    
    const [text, setText] = useState<string>("");
    const [profile, setProfile] = useState<any>(currentUser?.profilePic ||"https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg");
    const [username,setUsername] = useState<any>(currentUser?.username)
    const [status, setStatus] = useState("idle");
    

    
    const { icon } = IconStore();
    
    const postId = post._id;
    
    console.log(currentUser);
    console.log(postId)

    const handleSubmit = async () => {

        const userId = localStorage.getItem("userId");
    
        if (text.trim() === "") {
          toast.error("fill all inputs!", {
            position: "bottom-center",
            autoClose: 3000,
          });
          return;
        }
    
        if (!userId) {
          toast.error("Please Login!", {
            position: "bottom-center",
            autoClose: 2000,
          });
          return;
        }
        
        setStatus("loading");
        
        const reply = {
          text: text,
          userId: userId,
          username: username,
          userProfilePic: profile
      };
       
        
        try {
          const response = await axiosInstance.post(`/posts/${postId}/reply`, reply);
          console.log(response);
        } catch (error) {
          console.error("error adding new post", error);
        }
        
        onClose();
        
      };
      
    return (
    <div className='m-background' onClick={onClose} >
        <div className="m-box"  onClick={(e) => e.stopPropagation()} >
            <div className="m-head"><p  onClick={onClose} >Cancel</p><p>Reply</p><p className='pr-[40px]'></p></div>
            <div className="m-body overflow-scroll">

                <div className="b-1 flex gap-4">
                    <div className="pl-[25px] pt-[10px]">
                      <img src={ post.postById?.profilePic || "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"} alt="Postuser" className='w-9 h-9 object-cover rounded-full border border-gray-700'/>
                    </div>
                    <div className="pt-[8px] text-sm">
                      <p>{post.postById.username}</p>
                      <p>{post.text}</p>
                    </div>
                </div>

                <div className="b-2 flex gap-8">
                    <div className="white-line w-[3px] bg-stone-700 ml-[43px] mt-[5px]" ></div>
                    <div className="">
                      <img src={post.image} alt="post-img" className='post-img' />
                    </div>
                </div>

                <div className="b-3 flex gap-4">
                    <div className="pl-[25px] pt-[10px]">
                      <img src={currentUser?.profilePic || "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"} alt="Currentuser" className='w-9 h-9 object-cover rounded-full border border-gray-700' />
                    </div>
                    <div className="pt-[8px] text-sm">
                      <p>{currentUser?.username}</p>
                      <input
                       type="text"
                       title="text"
                       value={text}
                       placeholder={`Reply to ${post.postById?.username || "user"}`}
                       className="bg-inherit outline-none"
                       onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                </div>

                <div className="b-4 flex">
                    
                    <div className="white-line w-[3px] bg-stone-700 ml-[43px] mt-[5px] mb-[5px]" ></div>
                  
                    <div className="">

                        <div className=" flex items-center justify-around w-48 ml-6 mt-[10px] mb-[10px]">
                    
                            <div className="w-5 font-mono" >
                              {icon.images}
                            </div>
                            <div className="w-5" >
                              {icon.gif}
                            </div>
                            <div className="w-5">
                              {icon.hash}
                            </div>
                            <div className="w-5">
                              {icon.poll}
                            </div>
                           
                        </div>
                    </div>
                </div>

                    

                <div className="b-5 flex gap-6">
                      <img src={currentUser?.profilePic || "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"} alt="Currentuser" className='w-5 h-5 object-cover rounded-full border border-gray-700 ml-[34px] mt-[2px] mb-[10px] ' />
                      <input
                       type="text"
                       title="text"
                       placeholder="Add to thead"
                       className="bg-inherit outline-none mb-[10px] "
                       onChange={(e) => setText(e.target.value)}
                      />
                </div>

            </div>

            <div className="m-post flex justify-around gap-[65px] h-10">
                   <button>Anyone can replay & quote</button>
                   <button className='border border-white w-[60px] h-7 rounded mt-[6px]' onClick={handleSubmit}>{status === 'loading' ? 
                   (<div className="flex flex-row gap-2 justify-center content-center">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse [animation-delay:-.3s]"></div>{" "}
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse [animation-delay:-.5s]"></div>
                    </div>): ('Post')}</button>
            </div>
        </div>
    </div>
  )
}

export default CommentModal  



