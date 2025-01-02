import React, { useEffect, useState } from "react";
import "./threads.css";
import { useAppDispatch, useAppSelector } from "@/hooks/use";
import PostModal from "@/components/postModal/postmodal";
import axiosInstance from "@/axios/axiosInstances";
import Shimmerui from "@/components/loadingui/shimmerui";
import { formatDistanceToNow } from "date-fns";
import Like from "@/app/ui/Buttons/like/Like";
import CommentModal from "@/components/commentModal/comment";
import Repost from "@/app/lib/repost/repostbutton";
import Replys from "@/components/replyModal/replymodal";
import IconStore from "@/assets/icons";

const Threads = () => {

  const { currentUser } = useAppSelector((state) => state.users);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [userPost,setUserPost]  = useState<any>([]);
  const [status,setStatus] = useState(false);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [commentdet,setCommentDet] = useState(null);
  const [reply,setReply] = useState(false);
  const [repldet,setReplyDet] = useState(null);

  
  const dispatch = useAppDispatch();
  
  const userId = currentUser?._id;
  
  const {icon} = IconStore();
  
  const fetchPostsByUserId = async(userId:any) => {
      setStatus(true);
      try{
          const response = await axiosInstance.get(`/posts/${userId}`);
          console.log(response.data); 

          if (response.data && Array.isArray(response.data.post)) {
            setUserPost(response.data.post); 
          } else {
            console.error("Unexpected response format:", response.data);
          }
          setStatus(false);

        }catch (error:any){
            console.error('error',error);
        } 
    }
    
    useEffect(() => {
        
        fetchPostsByUserId(userId);
        
    }, [dispatch, userId]);
    
    const handleCommentDetails = (post:any) =>{
        setCommentOpen(true);
        setCommentDet(post)
    }
    
    const handleReplydet = (post:any) => {
        setReply(true);
        setReplyDet(post);
    }
    
    console.log(userPost);

  return (
    <div className="t-outline">
      <div
        className="add-post h-[70px] flex items-center justify-end text-zinc-500"
        onClick={() => setModalOpen(true)}
      >
        <div className="current">
          <img
            className="cpro"
            src={
              currentUser?.profilePic ||
              "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"
            }
            alt="profilepic"
          />
          <p className="text-center">What'new...</p>
        </div>
        <button
          className=" post-btn text-white "
          onClick={() => setModalOpen(true)}
        >
          Post
        </button>

      
      </div>
      
        <PostModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {status === true ? (
            <Shimmerui />
          ) : (
            userPost.map((post:any) => ( 
              <div key={post._id} className="f-layout">
                <div className="p-1">
                  <img
                    className="f-propic"
                    src={
                      post.postById?.profilePic ||
                      "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"
                    }
                    alt="profile"
                  />
                </div>
                <div className="p-2">
                  <p className="u-name">
                    {post.postById.username}
                    <span>
                      {formatDistanceToNow(new Date(post.createdOn), {
                        addSuffix: true,
                      })}
                    </span>
                  </p>
                  <p className="f-text">{post.text}</p>
                  {post.image && (
                    <img className="f-image" src={post.image} alt="post" onClick={() => handleReplydet(post)} />
                  )}

                  <div className="p-3 flex">

                    <div className="p-likes cursor-pointer">
                      <Like post={post} initialLike={post.likes.length} />
                    </div>

                    <div
                      className="p-comment cursor-pointer"
                      onClick={() => handleCommentDetails(post)}
                    >
                      <p className="w-5 h-5">{icon.comment}</p>
                      <p className="text-xs">{post.replies.length}</p>

                    </div>

                    <CommentModal
                      open={commentOpen}
                      onClose={() => setCommentOpen(false)}
                      post={commentdet}
                    />

                    <div className="p-repost flex cursor-pointer">
                      <Repost post={post}/>
                    </div>

                    <Replys  
                      open={reply}
                      onClose={() => setReply(false)}
                      post={repldet}
                    />

                    <div className="p-share cursor-pointer">
                      <p className="w-5 h-5">{icon.share}</p>
                      <p className="text-xs"></p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

    </div>
  );
};

export default Threads;
