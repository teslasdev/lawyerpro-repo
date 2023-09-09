import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiBookmark, BiPlus, BiSun } from 'react-icons/bi'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaAngleDown, FaAngleRight, FaLessThan } from 'react-icons/fa6'
import {PopupModal, PopupModalNote} from './PopupModal'
const Chat = () => {
   const [dropdown , setDropdown] = useState(false)
   const [popUp , setPopUp] = useState(false)
   const [popUpTrial , setPopUpTrial] = useState(false)
   const [isActive , setActive] = useState({
      0 : false
   })

   const data = 
   {
      email : 'Tipsonpaul@gmail.com',
      subscription : false
   }

   useEffect(() => {
      if(data ?? data.subscription) {
         setPopUp(true)
      }
   },[])
   const [prompt , setPrompt] = useState('')
   const prompts = [
      {
         title : "Prompt for Legal Consumer",
         drop : false,
         templates : [
            "What are my rights as an employee?",
            "How do I file for divorce and what are the requirements?",
            "How do I create a will or trust?"
         ]
      },
      {
         title : "Prompt for Legal Manufacturer",
         drop : false,
         templates : [
            "What are my rights as an employee?",
            "How do I file for divorce and what are the requirements?",
            "How do I create a will or trust?"
         ]
      }
   ]

   const handleDrop = (value , index) => {
      let temp = prompts[index]
      temp.drop = !value
      setActive({
         [index] : temp.drop
      })

      console.log(isActive)
      
   }
   return (
      <div className='h-screen'>
         { popUp &&
            <PopupModal setPopUpTrial={setPopUpTrial}  />
         }
         {popUpTrial && 
            <PopupModalNote setPopUpTrial={setPopUpTrial} setPopUp={setPopUp} />
         }
         
         <div className='h-[10%] sm:h-[13%] bg-white sm:bg-transparent flex items-center justify-between px-5'>
            <div>
               <h1 className='font-bold text-lg'>Lawyer Pro Ai</h1>
            </div>

            <div className='hidden sm:flex items-center gap-6'>
               <div onClick={() => setPopUp(true)}>
                  <button className='bg-orange-500 text-white rounded-full px-4 py-2'>Activate Pro</button>
               </div>
               <div className='flex gap-3 items-center h-full'>
                  <Link className='border-r-2 font-bold border-black flex items-center pr-2 h-full'>FAQ</Link>
                  <div>
                     <BiSun size={20} />
                  </div>

                  <div className='text-start border-r-2  border-black pr-2'>
                     <p className='text-sm'>tenserflux</p>
                     <p className='text-xs font-normal primary-text'>tenserflux@gmail.com</p>
                  </div>

                  <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-pink-600 text-white'>
                     t
                  </div>

                  <div className='relative cursor-pointer' onClick={() => setDropdown(!dropdown)}>
                     <FaAngleDown />
                     {dropdown && 
                     <div className='absolute h-[70px] flex justify-center items-start gap-2 px-4 flex-col right-0 top-10 rounded-md bg-white border w-[200px]'>
                        <Link className='text-sm cursor-pointer'>Contact Support</Link>
                        <div className='text-sm cursor-pointer'>
                           Logout
                        </div>
                     </div>
                     }
                  </div>
               </div>
            </div>
         </div>

         <div className='sm:h-[78%] h-[90%] flex items-center gap-2 justify-between p-2'>
            <div className='w-[20%] h-full hidden sm:flex items-start flex-col gap-5 justify-start p-6 rounded-lg bg-white border overflow-scroll'>
               <h4 className='text-xl font-light'>Hello, tenser flux 👋</h4>
               <button className='primary-color-btn rounded-full text-sm font-light p-3 w-full'>+ New Chat</button>
               <h5>Bookmarks:</h5>
               <div className='w-full gap-2 flex flex-col'>
                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>
                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>
                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>
               </div>

               <h5>History:</h5>
               <div className='w-full gap-2 flex flex-col'>
                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>
                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>
                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>

                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>

                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>

                  <div className='w-full border border-gray-300 p-3 rounded-md text-start text-xs cursor-pointer'>
                     some..
                  </div>
               </div>
            </div>

            <div className='w-full sm:w-[45%] h-full flex flex-col rounded-lg bg-white border overflow-scroll'>
               <div className='relative h-[10%] border-b flex justify-center items-center'>
                  Lawyer Pro

                  <div className='absolute right-3 cursor-pointer'>
                     <BiBookmark />
                  </div>
               </div>

               <div className='sm:h-[65%] h-[80%] flex p-4 flex-col overflow-scroll items-start gap-3'>
                  <div className='w-full flex justify-start'>
                     <p className='bg-[#f1f1f3] sm:max-w-[60%] max-w-[90%] text-start sm:text-[16px] text-[13px] sm:leading-8 leading-6 font-light p-2 rounded-t-lg rounded-r-lg'>hello,How arw you doing today</p>
                  </div>
                  <div className='w-full flex justify-end'>
                     <p className='bg-[#f2f0e4] sm:max-w-[60%] max-w-[90%] sm:text-[16px] text-[13px] leading-8 font-light  p-2 rounded-t-lg rounded-l-lg'>Hello</p>
                  </div>
               </div>

               <div className='relative sm:h-[25%] h-[15%] border-t px-4'>
                     <div className='absolute sm:hidden flex items-center gap-3 px-1 py-1 text-[10px] font-normal -top-6  right-3 primary-color-btn rounded-t-lg'>
                        Prompt Library
                        <span className='bg-white w-[10px] border h-[10px] font-bold text-black flex justify-center items-center rounded-full'><BiPlus size={10} /></span>
                     </div>
                  <div className='flex justify-center items-center h-full w-full'>
                     
                     <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Ask Something!' className='relative z-10 sm:px-5 p-2 border-none outline-none sm:h-[60px] h-[40px] w-full rounded-xl bg-gray-100' />
                     <div className='absolute z-40  right-5 sm:w-[40px]  sm:h-[40px] w-[30px]  h-[30px]   bg-[#f2f0e4] rounded-full flex justify-center items-center cursor-pointer'><HiArrowNarrowRight size={20} /></div>
                  </div>
               </div>
            </div>

            <div className='w-[30%] h-full hidden sm:flex items-start flex-col gap-5 justify-start p-6 rounded-lg bg-white border overflow-scroll'>
               <h5>Prompt Templates</h5>
               {prompts && prompts.map((item, index) => {
                  return (
                        <div className='w-full gap-2 flex flex-col'>
                           <div className='w-full primary-color-btn p-3 text-start text-xs rounded-ee-2xl cursor-pointer' onClick={(e) => handleDrop(item.drop , index)}>
                              <div className='flex justify-between px-1 items-center'>
                                 <div className='font-light text-xs'>
                                    <h1>{item.title}</h1>
                                 </div>

                                 <div>
                                    <FaAngleDown />
                                 </div>
                              </div>
                           </div>
                           {isActive[index] &&
                           <div className='text-[11px] text-start'>
                              {item.templates.map((item) => {
                                 return (
                                    <div className='flex items-center justify-between text-[#37352f] bg-[#f4f2eb] text-sm px-2 py-2 my-2 rounded-xl cursor-pointer' onClick={() => setPrompt(item)}>
                                       {item}
                                       <span className='bg-white w-[15px] border h-[15px] font-bold text-black flex justify-center items-center rounded-full'><BiPlus size={10} /></span>
                                    </div>
                                 )
                              })}
                             
                           </div>
                           }
                        </div>
                  )
               })}
            </div>
         </div>

         <div className=''>

         </div>
      </div>
   )
}

export default Chat