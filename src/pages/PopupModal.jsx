import React, { useState } from 'react'
import priceBanner from './image.ea7ab90344d3c6c99a78.png'
import priceBanner1 from './imageStud.8cf15bd0d1b0c00fac23.png'
import {IoMdRadioButtonOff , IoMdRadioButtonOn} from 'react-icons/io'
export const PopupModal = ({setPopUpTrial}) => {
   const [ select , setSelect] = useState(true)
   const [ check , setCheck] = useState(false)
  return (
    <div className='h-screen flex justify-center items-center fixed w-full bg-blur'>
      <div className='sm:w-[32%] w-[90%] transition-all bg-gray-50 overflow-scroll border rounded-lg h-[700px]'>
         <div className='text-[#A21D4E] text-xs  w-full flex justify-end p-3 cursor-pointer' onClick={() => setPopUpTrial(true)}>
            Close
         </div>

         <div className='overflow-scroll'>
            <div className='flex items-center justify-center gap-3'>
               <div className={`border rounded-xl sm:px-4 px-2 text-[16px]  cursor-pointer ${select && 'bg-[#A21D4E] text-white' } `} onClick={() => setSelect(true)}>
                  Individuals
               </div>
               <div className={`border rounded-xl sm:px-4 px-2 text-[16px] cursor-pointer ${!select && 'bg-[#A21D4E] text-white' } `} onClick={() => setSelect(false)}>
                  Students and Teachers
               </div>
            </div>
            { select ? 
            <div className='flex flex-col items-center gap-4 justify-center py-6'>
               <h3 className='sm:w-[70%] w-[90%]'>Unlock full service with PRO, protect your rights and wallet.</h3>
               <img src={priceBanner} alt="" srcset="" />

               <div className='border-gray-200 sm:h-[260px] flex flex-col sm:border-2 border sm:w-[80%] w-[80%] rounded-2xl'>
                  <div className='sm:h-[20%] p-2 bg-[#A21D4E] rounded-t-2xl'>
                     <p className='font-normal text-white text-sm'>50% discount for new users!</p>
                  </div>

                  <div className='w-full border-b-2 flex border-gray-200 h-[40%]'>
                     <div className='w-[50%] border-r sm:p-4 p-2 flex flex-col items-start gap-2'>
                        <span onClick={() => setCheck(false)}>
                           {check ? 
                              <IoMdRadioButtonOff className='cursor-pointer' />
                           :
                              <IoMdRadioButtonOn className='cursor-pointer'/>
                           }
                           
                        </span>
                        <h2 className='font-bold'>Weekly</h2>
                        <div className='flex sm:gap-2 gap-1 items-center'>
                           <p className='text-xs primary-text'>$9.99/week</p>
                           <del className='sm:text-sm text-xs text-red-600 font-semibold'>$19.99</del>
                        </div>
                     </div>

                     <div className='w-[50%] border-r sm:p-4 p-2 flex flex-col items-start gap-2'>
                        <span className='flex items-center justify-between gap-5' onClick={() => setCheck(true)}>
                           { !check ? 
                           <IoMdRadioButtonOff className='cursor-pointer' />
                           :
                              <IoMdRadioButtonOn className='cursor-pointer' />
                           }
                           <div className='rounded-full sm:text-sm text-xs px-2 text-white bg-[#A21D4E]'>
                              $1.9/week
                           </div>
                        </span>
                        <h2 className='font-bold'>Annual</h2>
                        <div className='flex sm:gap-2 gap-1 items-center'>
                           <p className='text-xs primary-text'>$99.99/year</p>
                           <del className='sm:text-sm text-xs text-red-600 font-semibold'>$199.99</del>
                        </div>
                     </div>
                  </div>

                  <div className='sm:px-12 p-4 h-[40%] flex justify-center items-center'>
                     <button className='primary-color-btn rounded-full text-sm font-light p-3 py-4 w-full cursor-pointer'>Continue</button>
                  </div>
                  
               </div>
            </div>
            :
            <div className='flex flex-col items-center gap-4 justify-center py-6'>
               <h3 className='w-[70%]'>Supercharge your education process 📚🚀</h3>
               <img src={priceBanner1} alt="" srcset="" />

               <div className='border-gray-200 sm:h-[260px] flex flex-col sm:border-2 border sm:w-[80%] w-[80%] rounded-2xl'>
                  <div className='sm:h-[20%] p-2 bg-[#A21D4E] rounded-t-2xl flex items-center justify-center'>
                     <p className='font-normal text-white text-sm'>50% discount for new users!</p>
                  </div>

                  <div className='w-full border-b-2 flex border-gray-200 h-[40%]'>
                     <div className='w-[50%] border-r sm:p-4 p-2 flex flex-col items-start gap-2'>
                        <span onClick={() => setCheck(false)}>
                           {check ? 
                              <IoMdRadioButtonOff className='cursor-pointer' />
                           :
                              <IoMdRadioButtonOn className='cursor-pointer'/>
                           }
                           
                        </span>
                        <h2 className='font-bold'>Weekly</h2>
                        <div className='flex gap-2 items-center'>
                           <p className='text-xs primary-text'>$4.99/week</p>
                           <del className='text-sm text-red-600 font-semibold'>$19.99</del>
                        </div>
                     </div>

                     <div className='w-[50%] border-r sm:p-4 p-2 flex flex-col items-start gap-2'>
                        <span className='flex items-center justify-between gap-5' onClick={() => setCheck(true)}>
                        { !check ? 
                           <IoMdRadioButtonOff className='cursor-pointer' />
                           :
                              <IoMdRadioButtonOn className='cursor-pointer' />
                           }
                           <div className='rounded-full sm:text-sm text-xs px-2 text-white bg-[#A21D4E]'>
                              $1.9/week
                           </div>
                        </span>
                        <h2 className='font-bold'>Annual</h2>
                        <div className='flex gap-2 items-center'>
                           <p className='text-xs primary-text'>$9.99/year</p>
                           <del className='sm:text-sm text-xs text-red-600 font-semibold'>$19.99</del>
                        </div>
                     </div>
                  </div>

                  <div className='sm:px-12 p-4 h-[40%] flex justify-center items-center'>
                     <button className='primary-color-btn rounded-full text-sm font-light p-3 py-4 w-full cursor-pointer'>Continue</button>
                  </div>
               </div>

            </div>
            }
         </div>
      </div>
    </div>
  )
}

export const PopupModalNote = ({setPopUp,setPopUpTrial}) => {
   const handleCancel = () => {
      setPopUp(false)
      setPopUpTrial(false)
   }
  return (
    <div className='h-screen flex justify-center items-center fixed w-full bg-blur'>
      <div className='sm:w-[32%] w-[90%] transition-all bg-[#A21D4E] overflow-scroll border rounded-lg h-[700px]'>
         <div className='text-[#ffffff] text-xs  w-full flex justify-end p-3 cursor-pointer' onClick={() => handleCancel()}>
            Close
         </div>

         <h3 className='sm:text-2xl text-xl text-white text-start sm:ml-9 m-4 sm:mt-9 mt-4 sm:w-[70%]'>Have doubts? Start with a free trial 🎉</h3>
         <div className='relative p-8 flex flex-col sm:gap-14 gap-10  h-[80%]'>
            <div className='sm:px-12 h-[80%] flex flex-col justify-center items-center gap-5'>
               <h3 className='text-white font-bold'>24 hours for free</h3>
               <p className='text-gray-100 font-light text-xs'>then $19.99/month, cancel anytime</p>
               <button className='bg-white rounded-full text-lg font-light p-3 py-4 w-full cursor-pointer'>Start My Trial</button>
            </div>
         </div>
       
      </div>
    </div>
  )
}

export const PopupModalPrompt = ({setPopUp,setPopUpTrial}) => {
   const handleCancel = () => {
      setPopUp(false)
      setPopUpTrial(false)
   }
  return (
    <div className='h-screen flex justify-center items-center fixed w-full bg-blur'>
      <div className='sm:w-[32%] w-[90%] transition-all bg-[#A21D4E] overflow-scroll border rounded-lg h-[700px]'>
         <div className='text-[#ffffff] text-xs  w-full flex justify-end p-3 cursor-pointer' onClick={() => handleCancel()}>
            Close
         </div>

         <h3 className='text-2xl text-white text-start ml-9 mt-9 w-[70%]'>Have doubts? Start with a free trial 🎉</h3>
         <div className='relative p-8 flex flex-col gap-14  h-[80%]'>
            <div className='px-12 h-[80%] flex flex-col justify-center items-center gap-5'>
               <h3 className='text-white font-bold'>24 hours for free</h3>
               <p className='text-gray-100 font-light text-xs'>then $19.99/month, cancel anytime</p>
               <button className='bg-white rounded-full text-lg font-light p-3 py-4 w-full cursor-pointer'>Start My Trial</button>
            </div>
         </div>
       
      </div>
    </div>
  )
}

export default PopupModal