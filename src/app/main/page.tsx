"use client";

import React, { useEffect, useState } from "react";
import "./main.css";
import { useAppDispatch, useAppSelector } from "@/hooks/use";
import { fetchPosts } from "@/store/reducers/postsSlice";
import { formatDistanceToNow } from "date-fns";
import { fetchUsers, fetchCurrentUser } from "@/store/reducers/userSlice";
import PostModal from "@/components/postModal/postmodal";
import IconStore from "@/assets/icons";
import Shimmerui from "@/components/loadingui/shimmerui";
import Like from "../ui/Buttons/like/Like";
import Logout from "@/components/Logout/Logout";
import { useRouter } from "next/navigation";
import CommentModal from "../../components/commentModal/comment";
import Replys from "@/components/replyModal/replymodal";
import Repost from "../lib/repost/repostbutton";












const Main = () => {

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { posts, status } = useAppSelector((state) => state.posts);

  const { currentUser } = useAppSelector((state) => state.users);

  const { icon } = IconStore();

  console.log(posts)

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [commentdet,setCommentDet] = useState(null);
  const [reply,setReply] = useState(false);
  const [repldet,setReplyDet] = useState(null);


  const handleCommentDetails = (post:any) =>{
      setCommentOpen(true);
      setCommentDet(post)
  }

  const handleReplydet = (post:any) => {
        setReply(true);
        setReplyDet(post);
  }
    
  return (
    <div className="bg-black">
      <div className="lay-1">
        <nav className="nav-main">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Threads_%28app%29.png/640px-Threads_%28app%29.png"
            alt="thlogo"
          />
          <h2 className="h">For you</h2>
          <div className="opt"></div>
        </nav>
      </div>

      <div className="lay-2">
        <div className="nav2">
          <div className="nav2-1">
            <div onClick={() => router.push("/main")} className="svg">
              {icon.home}
            </div>
            <div onClick={() => router.push("/search")} className="svg">
              {icon.search}
            </div>
            <div onClick={() => setModalOpen(true)} className="svg">
              {icon.addpost}
            </div>
            <div className="svg">{icon.notify}</div>
            <div onClick={() => router.push("/profile")} className="svg">{icon.profile}</div>
          </div>

          <div className="nav2-2">
            <div>
              <svg
                viewBox="0 0 24 24"
                className="pin"
                style={{ fill: "transparent", height: "26px", width: "26px" }}
              >
                <path
                  d="M12 23.922c-.072 0-.166-.085-.283-.254a3.489 3.489 0 0 1-.352-.654 5.193 5.193 0 0 1-.293-.899 4.25 4.25 0 0 1-.117-.976v-5.576h2.08v5.576c0 .319-.039.644-.117.976a5.202 5.202 0 0 1-.293.899 3.489 3.489 0 0 1-.352.654c-.11.17-.201.254-.273.254ZM5.78 16.49c-.482 0-.87-.14-1.163-.42-.286-.286-.43-.66-.43-1.123 0-.748.2-1.478.596-2.187.397-.71.947-1.345 1.65-1.905a8.372 8.372 0 0 1 2.481-1.328c.95-.332 1.98-.498 3.086-.498 1.107 0 2.132.166 3.076.498a8.372 8.372 0 0 1 2.48 1.329c.71.56 1.26 1.194 1.651 1.904.397.71.596 1.439.596 2.187 0 .463-.143.837-.43 1.123-.286.28-.67.42-1.152.42H5.779Zm.488-1.787h11.455c.182 0 .257-.104.224-.312-.058-.43-.244-.86-.556-1.29-.313-.43-.73-.82-1.25-1.171a6.823 6.823 0 0 0-1.836-.85A7.792 7.792 0 0 0 12 10.758a7.89 7.89 0 0 0-2.314.322 6.85 6.85 0 0 0-1.827.85c-.52.351-.937.742-1.25 1.172-.312.43-.5.859-.566 1.289-.033.208.042.312.225.312Zm-.84-13.086c0-.338.117-.618.351-.84.241-.228.554-.341.938-.341h10.566c.384 0 .694.113.928.341.24.222.361.502.361.84 0 .352-.136.7-.41 1.045a5.307 5.307 0 0 1-.693.723c-.293.26-.632.534-1.016.82-.384.287-.784.573-1.201.86l.361 5.41h-1.875l-.361-6.24c-.013-.17.042-.284.166-.342.3-.163.583-.326.85-.489.273-.162.514-.315.722-.459.209-.143.381-.27.518-.38.137-.118.23-.202.283-.254.046-.053.055-.098.03-.137-.02-.04-.056-.059-.108-.059H8.152a.123.123 0 0 0-.107.059c-.02.039-.01.084.03.137.051.052.146.136.282.253.144.111.32.238.528.381.215.144.452.297.713.46.267.162.553.325.859.488.124.058.182.172.176.341l-.371 6.24H8.377l.371-5.41a32.5 32.5 0 0 1-1.21-.859 19.68 19.68 0 0 1-1.017-.82 5.57 5.57 0 0 1-.683-.723c-.274-.345-.41-.693-.41-1.045Z"
                  fill="rgb(80, 80, 80)"
                ></path>
              </svg>
            </div>
            <Logout />
          </div>
        </div>

        <div className="Post-window">
          <div className="add-post h-[70px] flex items-center justify-end border border-stone-800 text-zinc-500"  onClick={() => setModalOpen(true)}>
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

          {status === "loading" ? (
            <Shimmerui />
          ) : (
            posts.map((post) => ( 
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

        <div className="adj"></div>
      </div>
    </div>
  );
};

export default Main;
