
import React, { useState } from "react";
import "./replies.css";
import {useAppSelector } from "@/hooks/use";
import Shimmerui from "@/components/loadingui/shimmerui";
import { formatDistanceToNow } from "date-fns";
import Like from "@/app/ui/Buttons/like/Like";
import CommentModal from "@/components/commentModal/comment";
import Repost from "@/app/lib/repost/repostbutton";
import Replys from "@/components/replyModal/replymodal";
import IconStore from "@/assets/icons";

const Replies = () => {
  const { currentUser } = useAppSelector((state) => state.users);
  const { posts,status } = useAppSelector((state) => state.posts);

  
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [commentdet, setCommentDet] = useState(null);
  const [reply, setReply] = useState(false);
  const [repldet, setReplyDet] = useState(null);

 
  const userId = currentUser?._id;
  const { icon } = IconStore();

  const handleCommentDetails = (post: any) => {
    setCommentOpen(true);
    setCommentDet(post);
  };

  const handleReplydet = (post: any) => {
    setReply(true);
    setReplyDet(post);
  };

  
  console.log(posts);

  return (
    <div className="t-outline">
      {status === "loading" ? (
        <Shimmerui />
      ) : (
        posts
          .filter((post: any) =>
            post.replies.some((reply: any) => reply.userId === userId)
          )
          .map((post: any) => (
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
                  <img
                    className="f-image"
                    src={post.image}
                    alt="post"
                    onClick={() => handleReplydet(post)}
                  />
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
                    <Repost post={post} />
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
                <div className="part-2-2 h-10 ">
                {post.replies
                    .filter((reply: any) => reply.userId === userId)
                    .map((reply: any) => (
                        <div className="rely-out flex gap-4" key={reply._id}>
                            <div className="repro" >
                                <img src={reply.userProfilePic ||"https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"} alt="replypro" className="repro"/>
                            </div>
                            <div className="recon">
                                <p>{reply.username}</p>
                                <p>{reply.text}</p>
                            </div>
                        </div>
                     ))}

                </div>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default Replies;


