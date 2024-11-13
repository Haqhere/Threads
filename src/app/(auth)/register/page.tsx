"use client";

import React, { useEffect,useState } from 'react';
import './register.css';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/axios/axiosInstances';
import Link from 'next/link'; 




const Register: React.FC = () => {

  const [name,setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);
 
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if(!name||!username||!email||!password||!phone){
    setError("Please fill in all fields.")
  };

  setStatus("loading");
  setError(null);

  try{
    const response = await axiosInstance.post('/users/signup',{name,username,email,password,phone});
    console.log(response.data);
    setStatus("succeeded")
  } catch (error:any) {
    setError(error.response?.data?.message || "signup failed")
    setStatus("failed")
  }
  };

  useEffect(() => {
    if(status==="succeeded"){
      router.push('/login')
    }
  },[status,router]);

  return (
    <>
    
    <body className='register-body'>

      <div className="register-comp">

        <Link href="/login"><div className="back-arrow">🡸</div></Link>

        <div className='register-form'>
          <h3>Register with your Instagram account</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email...'
            />

            <input
              type="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Phone Number'
            />

            <button className='register-button' type='submit' disabled={status === 'loading'}>
              {status === 'loading' ? <div className="flex flex-row gap-2 justify-center"> <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div> <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div> <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div></div> : 'Sign Up'}
            </button>
          </form>

          {status === 'failed' && (
            <div className='error-mess show'>
              {error}
            </div>
          )}
        </div>

        <div className='footer'>
          <p>© 2024</p>
          <p>Threads Terms</p>
          <p>Privacy Policy</p>
          <p>Cookies Policy</p>
          <p>Report a problem</p>
        </div>
      </div>
      
      </body>
    </>
  );
};

export default Register;
