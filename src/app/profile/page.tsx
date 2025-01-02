"use client"

import React, { useEffect, useState } from 'react';
import './profile.css'
import IconStore from '@/assets/icons';
import Logout from '@/components/Logout/Logout';
import { useAppDispatch, useAppSelector } from '@/hooks/use';
import { fetchPosts } from '@/store/reducers/postsSlice';
import { fetchCurrentUser, fetchUsers } from '@/store/reducers/userSlice';
import Threads from '../profile/inside/threadscomp/threads';
import Replies from '../profile/inside/repliescomp/replies';
import RePost from '../profile/inside/repostcomp/repost';
import { useRouter } from 'next/navigation';
import UserModal from '@/components/userModal/userUp';



const Layout = () => {

  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [section,setSection] = useState('threads');
  const [usModalOpen, setUsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');


  const { icon } = IconStore();
 
  const { currentUser } = useAppSelector((state) => state.users);

  console.log(currentUser);

  const router = useRouter();

  useEffect(() => {
      dispatch(fetchPosts());
      dispatch(fetchUsers());
      dispatch(fetchCurrentUser());
    }, [dispatch])

    const handleOpenModal = (userId: any) => {
      setSelectedUserId(userId);
      setUsModalOpen(true);
    };

    const handleCloseModal = () => {
      setUsModalOpen(false);
      setSelectedUserId('');
    };

  return (
    <div className="bg-black">

    <div className="lay-1">
  
      <nav className='nav-main'>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Threads_%28app%29.png/640px-Threads_%28app%29.png" alt="thlogo" />
              <h2 className='h'>Profile</h2>
              <div className='opt'></div>
      </nav>
    
    

    </div>
  
    <div className="lay-2">
  
    
      <div className='nav2'>
       
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
                <div><svg viewBox="0 0 24 24" className="pin" style={{ fill: 'transparent', height: '26px', width: '26px' }}><path d="M12 23.922c-.072 0-.166-.085-.283-.254a3.489 3.489 0 0 1-.352-.654 5.193 5.193 0 0 1-.293-.899 4.25 4.25 0 0 1-.117-.976v-5.576h2.08v5.576c0 .319-.039.644-.117.976a5.202 5.202 0 0 1-.293.899 3.489 3.489 0 0 1-.352.654c-.11.17-.201.254-.273.254ZM5.78 16.49c-.482 0-.87-.14-1.163-.42-.286-.286-.43-.66-.43-1.123 0-.748.2-1.478.596-2.187.397-.71.947-1.345 1.65-1.905a8.372 8.372 0 0 1 2.481-1.328c.95-.332 1.98-.498 3.086-.498 1.107 0 2.132.166 3.076.498a8.372 8.372 0 0 1 2.48 1.329c.71.56 1.26 1.194 1.651 1.904.397.71.596 1.439.596 2.187 0 .463-.143.837-.43 1.123-.286.28-.67.42-1.152.42H5.779Zm.488-1.787h11.455c.182 0 .257-.104.224-.312-.058-.43-.244-.86-.556-1.29-.313-.43-.73-.82-1.25-1.171a6.823 6.823 0 0 0-1.836-.85A7.792 7.792 0 0 0 12 10.758a7.89 7.89 0 0 0-2.314.322 6.85 6.85 0 0 0-1.827.85c-.52.351-.937.742-1.25 1.172-.312.43-.5.859-.566 1.289-.033.208.042.312.225.312Zm-.84-13.086c0-.338.117-.618.351-.84.241-.228.554-.341.938-.341h10.566c.384 0 .694.113.928.341.24.222.361.502.361.84 0 .352-.136.7-.41 1.045a5.307 5.307 0 0 1-.693.723c-.293.26-.632.534-1.016.82-.384.287-.784.573-1.201.86l.361 5.41h-1.875l-.361-6.24c-.013-.17.042-.284.166-.342.3-.163.583-.326.85-.489.273-.162.514-.315.722-.459.209-.143.381-.27.518-.38.137-.118.23-.202.283-.254.046-.053.055-.098.03-.137-.02-.04-.056-.059-.108-.059H8.152a.123.123 0 0 0-.107.059c-.02.039-.01.084.03.137.051.052.146.136.282.253.144.111.32.238.528.381.215.144.452.297.713.46.267.162.553.325.859.488.124.058.182.172.176.341l-.371 6.24H8.377l.371-5.41a32.5 32.5 0 0 1-1.21-.859 19.68 19.68 0 0 1-1.017-.82 5.57 5.57 0 0 1-.683-.723c-.274-.345-.41-.693-.41-1.045Z" fill="rgb(80, 80, 80)"></path></svg></div>
                <Logout/>
        </div>
        
      </div>
  
      <div className='Post-window flex flex-col'>
        <div className="part-1 p-8 flex flex-col gap-4">
            
            <div className="c-1 flex justify-between ">
                <div className="u-details">
                    <p className='text-2xl'>{currentUser?.username}</p>
                    <p>{currentUser?.name}</p>
                </div>
                <div className="u-profile  object-cover">
                    <img src={currentUser?.profilePic || "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"} alt="pro" className='rounded-full object-cover w-[80px] h-[80px] ' />
                </div>
            </div>

            <div className="c-2 flex justify-between ">
                <div className="followers flex">
                    <div className="fol-icons flex">
                        <img src="https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg" alt="pro" className='w-6 rounded-full border border-black ' />
                        <img src="https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg" alt="pro" className='w-6 rounded-full relative right-2 border border-black' />
                    </div>
                    <p className='text-neutral-600 flex'>
                        {currentUser?.followers.length} followers
                    </p>
                </div>
                <div className="2-icons flex gap-8">
                    <div className="insight">{icon.insight}</div>
                    <div className="instagram">{icon.instagram}</div>
                </div>
            </div>

            <div  onClick={() => handleOpenModal(currentUser?._id)} className="c-3 text-center flex items-center justify-center border border-neutral-700 rounded-lg h-8">
                    Edit profile
            </div>

            <UserModal
                isOpen={usModalOpen}
                onClose={handleCloseModal}
                userId={selectedUserId}
            />

        </div>

        <div className="part-2">

            <div className="c-4 flex">
                <div onClick={() => setSection("threads")} className='threads w-1/3 h-10 text-center border-b border-neutral-700 flex items-center justify-center hover:border-white active:border-white'>Threads</div>
                <div onClick={() => setSection("replies")}  className='replies w-1/3 text-center border-b border-neutral-700 flex items-center justify-center hover:border-white active:border-white'>Replies</div>
                <div onClick={() => setSection("repost")}  className='repost w-1/3 text-center border-b border-neutral-700 flex items-center justify-center hover:border-white active:border-white'>Reposts</div>
            </div>
            
        </div>

        <div className="part-3">

            {section === "threads" && <Threads/>}
            {section === "replies" && <Replies/>}
            {section === "repost" && <RePost/>}
           
        </div>
      </div>
  
    
    
  
      <div className="adj"></div>
  
          
    </div>
  
  
  </div>
  );
};

export default Layout;
