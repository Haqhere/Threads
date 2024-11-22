import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import './Logout.css'



const Logout = () => {


    const [smodal,setSmodal] = useState(false);

    const router = useRouter();

    const handleSmodal = () => {
        if(!smodal){
          setSmodal(true);
        }else{
          setSmodal(false);
        } 
      }
  
    
    const handleLogout = (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        localStorage.clear();
        setTimeout(() => {
            router.push('/login');
        }, 300);
    }



  return (
    <div> 
        <div onClick={handleSmodal}><svg style={{width:'25px', height:'25px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3a3a3a" d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"/></svg>{smodal==true ? <div className='drop'> 
        <ul>
            <li className='rounded'>Appearance</li>
            <li>Insight</li>
            <li>Settings</li>
            <li>Report a problem</li>
            <li className='rounded' onClick={handleLogout}>Log out</li>
        </ul>
    </div> : ' '} 
    </div>  
    </div>
  )
}

export default Logout