import React, { useEffect, useState } from "react";
import IconStore from "@/assets/icons";
import axiosInstance from "@/axios/axiosInstances";
import { useAppSelector } from "@/hooks/use";

const Like: React.FC<{ post: any; initialLike: number }> = ({
  post,
  initialLike,
}) => {
  const { icon } = IconStore();
  const { currentUser } = useAppSelector((state) => state.users);

  const userId = localStorage.getItem("userId") || currentUser?._id;

  const [likeCount, setLikeCount] = useState<number>(initialLike);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (post.likes.includes(userId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [userId]);

  const LikesIt = async () => {
    try {
      const response = await axiosInstance.post(`/posts/like/${post._id}`, {
        userId,
      });
      console.log("response :", response);
    } catch (error) {
      console.error("error : ", error);
    }
  };

  const unLikesIt = async () => {
    try {
      const response = await axiosInstance.post(`/posts/unlike/${post._id}`, {
        userId,
      });
      console.log("response :", response);
    } catch (error) {
      console.error("error : ", error);
    }
  };

  const handleLike = async () => {
    if (!isLiked) {
      setIsLiked(true);
      LikesIt();
      setLikeCount(likeCount + 1);
    } else {
      setIsLiked(false);
      unLikesIt();
      setLikeCount(likeCount - 1);
    }
  };

  return (
    <div className="flex gap-1 justify-center items-center">
      <div onClick={handleLike} className="w-5 h-5  relative top-[5px]">
        {isLiked ? icon.LikedHeart : icon.heart}
      </div>
      <span className="text-xs relative top-[5px] ">{likeCount}</span>
    </div>
  );
};

export default Like;
