import React, { useEffect, useState } from 'react'

const Home = () => {

  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

const userHome = async ()=>{
    try {

         const res = await fetch('/getdata', {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
         })

         const data = await res.json()

         console.log(data)
         setUserName(data.name)
         setShow(true)

    } catch (error) {
        console.log(error)

      
    }
}

useEffect(() => {
    userHome();
   }, []);

  return (
    <>
      <div className='home-page'>
         <div className='home-div'>
            <p className='pt-5'>WELCOME</p>
            <h1>{userName}</h1>
            <h2>{show ? 'Happy to see you' : 'We Are The Mern Developer'}</h2>
         </div>
      </div>
    </>
  )
}

export default Home