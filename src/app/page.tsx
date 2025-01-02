"use client";
import './home.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {

  const router = useRouter();

  useEffect(() => {

      router.push('/login');

  }, [router]);

  return (

    <div className="body-home bg-black">
    
          <img
            className="w-32"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Threads_%28app%29.png/640px-Threads_%28app%29.png"
            alt="Threads logo"
            
          />
          <p className="text-white text-xl mt-4">Threads</p>
      
    </div>
  );
};

export default Home;
