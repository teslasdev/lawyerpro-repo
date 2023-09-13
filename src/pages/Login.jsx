import React, { useEffect } from 'react'
import Backdrop from './undraw_chatting_re_j55r.svg'
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, dbUser, dbUsers } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';


const Login = () => {
   const navigate = useNavigate()
   useEffect(() => {
      const uid = localStorage.getItem('lawyepro-uid');
      if (uid)  {
         navigate('/')
      } else {
         return;
      }
   }, [])
   const signInWithGoogle = async () => {
         const provider = new GoogleAuthProvider();
         provider.setCustomParameters({
            'login_hint': 'user@example.com'
         });
         
         signInWithPopup(auth, provider)
           .then( async (result) => {
             // This gives you a Google Access Token. You can use it to access the Google API.
            //  const credential = GoogleAuthProvider.credentialFromResult(result);
            //  const token = credential.accessToken;
            //  // The signed-in user info.
             const user = result.user;
             // IdP data available using getAdditionalUserInfo(result)
             // ...
            console.log(user)
            localStorage.setItem('lawyepro-uid', user.uid)
            localStorage.setItem('display_name', user.displayName)
            localStorage.setItem('email', user.email)
            localStorage.setItem('isSubscribed', false)
            const data = {
               uid : user.uid,
               fullname: user.displayName,
               isSubscribed: false
            }
            await addDoc(dbUsers, data)
               .then(docRef => {
               console.log(docRef.id); //p4eZcO5QV43IYnigxALJ
            })
            .catch(error => {
               console.log(error);
            })
             navigate('/')
           }).catch((error) => {
             // Handle Errors here.
            //  const errorCode = error.code;
            //  const errorMessage = error.message;
            //  // The email of the user's account used.
            //  const email = error.customData.email;
            //  // The AuthCredential type that was used.
            //  const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error)
             // ...
           });
   };
   return (
      <div className='h-screen'>
         <div className='h-full flex justify-center items-center'>
            <div className='hidden w-[50%]  h-screen bg-white border-r sm:flex justify-center items-center'>
               <img src={Backdrop} alt="" className='max-w-[408px] max-h-[687px]' />
            </div>
            <div className='sm:w-[50%] sm:px-0 p-4 w-full  h-screen flex justify-center items-center'>
               <div className='w-[460px] h-[380px] sm:h-[501px] bg-white border flex flex-col sm:gap-8 gap-4 justify-center rounded-lg p-4 sm:p-8'>
                  <h4 className='text-xl font-light uppercase'>Login In or Sign Up</h4>

                  <button className='primary-color-btn rounded-full text-sm font-light p-3 w-full' onClick={signInWithGoogle}>Login with Google</button>

                  <p className='primary-text text-sx'>or</p>

                  <h5 className='primary-text sm:text-lg text-xs'>Enter your email below and sign in with a one-time link</h5>
                  <div className='w-full'>
                     <input type="text" placeholder='Email Address' className='pl-3 text-sm w-full border h-[60px] rounded-full outline-none' />
                  </div>
                  <button className='primary-color-btn rounded-full text-sm font-light p-3 w-full'>Get A one-time link</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login