import React, { useRef, useState } from "react";
import "./postModal.css";
import { useAppSelector } from "@/hooks/use";
import IconStore from "@/assets/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/axios/axiosInstances";





type propTypes = {
  open: boolean;
  onClose: () => void;
};

const PostModal: React.FC<propTypes> = ({ open, onClose }) => {
  
  if (!open) return null;

  
  const[text,setText] = useState<string>('');
  const[image,setImage] = useState<any>('')
  const[preview,setPreview] = useState<any>('');
  const[dummy, setDummy] = useState(false);
  const[status,setStatus] = useState("idle")



  const { currentUser } = useAppSelector((state) => state.users);

  const { icon } = IconStore();


  const inputFiles = useRef<HTMLInputElement | null>(null);
  const handleFileClick = () => {
    if (inputFiles.current) {
      inputFiles.current.click();
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(file){
      setImage(file);
      console.log('file',file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      }
      reader.readAsDataURL(file)
    }
    
  };
  
  const handleDummy = () => { 
    setDummy(true);
    setTimeout(() => {
      setDummy(false);
    }, 2000);
  };
  

  
const handleSubmit =  async() => {

  const userId = localStorage.getItem('userId');
  
  if(text.trim()=== ''){
    toast.error("fill all inputs!", {
      position: 'bottom-center',
      autoClose: 3000,
    })
    return;
  }


  if(!userId){
    toast.error("Please Login!", {
      position: 'bottom-center',
      autoClose: 2000,
    })
    return;
  }
  
  setStatus('loading')

  const newPostData = new FormData();
  newPostData.append('userId',userId);
  newPostData.append('text',text);
  newPostData.append('image',image)

  try{
    const response = await axiosInstance.post('/posts',newPostData);
  }catch (error){
    console.error('error adding new post',error);
  }

  onClose();

}





  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-header">
          <p className="font-sans">Cancel</p> <p>New Thread</p> <p></p>{" "}
        </h2>
        <div className="modal-content">
          <div className="content-header">
            <img
              src={
                currentUser?.profilePic ||
                "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"
              }
              alt="profilepic"
              className="c-pic w-9 rounded-full "
            />
            <div>
              <p className="font-bold">{currentUser?.username}</p>
              <input
                type="text"
                title="text"
                value={text}
                placeholder="𝑊ℎ𝑎𝑡’𝑠 𝑛𝑒𝑤?"
                className="bg-inherit outline-none"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>

              <div>{preview === '' ? ('') : (<img className="preview" src={preview} alt="preview" />) }</div>

          <div className="content-center flex items-center justify-around w-48 ml-6">
            <div className="w-5 text-gray-500 text-[35px]  ">|</div>
            <div className="w-5 font-mono" onClick={handleFileClick}>
              {icon.images}
            </div>
            <div className="w-5" onClick={handleFileClick}>
              {icon.gif}
            </div>
            <div className="w-5" onClick={handleDummy}>
              {icon.hash}
            </div>
            <div className="w-5" onClick={handleDummy}>
              {icon.poll}
            </div>
            <input
              className="input-img"
              type="file"
              name="img"
              ref={inputFiles}
              onChange={handleFile}
            />
          </div>

          <div className="content-last flex gap-7 items-center ml-[30px]">
            <img
              src={
                currentUser?.profilePic ||
                "https://pbs.twimg.com/profile_images/1622382458162520064/d7kv4B_c_400x400.jpg"
              }
              alt="profilepic"
              className="c-end-pic w-4 h-4 rounded-full "
            />
            <input
              type="text"
              title="text"
              value={""}
              placeholder="𝐴𝑑𝑑 𝑡𝑜 𝑡ℎ𝑟𝑒𝑎𝑑"
              className="bg-inherit outline-none"
            />
            {dummy === true ? (
              <p className="dummy-ms">Sorry, technical issue ! </p>
            ) : (
              <></>
            )}
          </div>

          <div className="conent-final text-neutral-600 ml-5 mt-5 mb-5 flex gap-72">
            <p>Your followers can reply & qoute</p>
            <button className="border rounded w-12 text-white" onClick={handleSubmit}> {status === "loading" ? (
                <div className="flex flex-row gap-2 justify-center content-center ">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse [animation-delay:-.5s]"></div>
                </div>
              ) : (
                "Post"
              )}</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PostModal;
 


