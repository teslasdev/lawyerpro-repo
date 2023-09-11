import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiBookmark, BiPlus, BiSun } from 'react-icons/bi'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaAngleDown, FaAngleRight, FaLessThan } from 'react-icons/fa6'
import {PopupModal, PopupModalNote} from './PopupModal'
import Loader from '../Loader'
import axios from 'axios'
import {SSE} from 'sse'
const Chat = () => {
   const [dropdown , setDropdown] = useState(false)
   const [popUp , setPopUp] = useState(false)
   const [popUpTrial , setPopUpTrial] = useState(false)
   const [email , setEmail] = useState("lawyer")
   const [displayName , setDisplay]= useState("")
   const [loader, setLoader] = useState(true)
   const [responseData , setResponse] = useState(
      [
         
      ]
   )
   const [isActive , setActive] = useState({
      0 : false
   })
   const navigate = useNavigate()
   const chatContainerRef = useRef(null);
   const scrollToBottom = () => {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    };

   useEffect(() => {
      const uid = localStorage.getItem('lawyepro-uid');
      if (!uid)  {
         navigate('/main/login')
      }
   }, [])

   useEffect(() => {
      setTimeout(() => {
         const email = localStorage.getItem('email');
         const display_name = localStorage.getItem('display_name')
         if(!email) {
            setEmail('Default')
         }
         setEmail(email);
         setDisplay(display_name);
         const isSubscribed = localStorage.getItem('isSubscribed')
         if(isSubscribed) {
            setPopUp(true)
         }
         setLoader(false)

      }, 3000)
      setLoader(true)
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

   let [result, setResult] = useState("");

   const resultRef = useRef();

   useEffect(() => {
      resultRef.current = result;
   }, [result]);
   // const handleSend = () => {
   //    if(!prompt) {
   //       return;
   //    }
   //    fetchData(prompt).then((res) => {
   //       alert(res)
   //    });

      
   // }
   let handleSend = async () => {
      if (prompt !== "") {
         setResult("");
         scrollToBottom()
         setResponse((responseData) => [...responseData, 
            {
               position : "end",
               content  : prompt
            }
         ])
         setPrompt("")
        let url = "https://api.openai.com/v1/chat/completions";
        let data = {
         model: 'gpt-3.5-turbo',
         messages : [
            {
               "role": "system",
               "content": "You are helpful assistant in lawyer case and questions, Answer questions relating to lawyer case or court , Any question asked by the user not relating to it , just say you can not answer that but can only answer lawyer question, remove traces of undefined"
             },
            {
              role: 'user',
              content : `${prompt}`,
            }
         ],
         stream: true,
         n: 1,
        };
  
        let source = new SSE(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
          method: "POST",
          payload: JSON.stringify(data),
        });
  
        source.addEventListener("message", (e) => {
          if (e.data != "[DONE]") {
            let payload = JSON.parse(e.data);
            let text = payload.choices[0]?.delta.content;
            if (text != "\n") {
               scrollToBottom()
               resultRef.current = resultRef.current + text;
               console.log("ResultRef.current: " + resultRef.current);
               setResult(resultRef.current);
            }
          } else {
            setResponse((responseData) => [...responseData, 
               {
                  position : "start",
                  content : resultRef.current
               }
            ])
            setResult("")
            source.close();
          }
        });
  
        source.addEventListener("readystatechange", (e) => {
          if (e.readyState >= 2) {
            console.log('DONE')
          }
        });
  
        source.stream();
      } else {
        alert("Please insert a prompt!");
      }
    };

   // const fetchData = async (input) => {
   //    const response = await axios.post(
   //      "https://api.openai.com/v1/chat/completions",
   //      {
   //        model: 'gpt-3.5-turbo',
   //        messages : [
   //          {
   //            role: 'user',
   //            content : `${input}`,
   //          }
   //        ],
   //        stream : true
   //      },
   //      {
   //        headers: {
   //          "Content-Type": "application/json",
   //          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
   //        },
   //      }
   //    );
    
   //    // return response.data.choices[0].message.content;
   //    response.data.on('data', data => {

   //       // data is a buffer
   //       // data.toString() converts to a readable string like below:
   //       // data.toString() gives this -> data: {"id":"cmpl-7MwK...","object":"text_completion","created":1685702342,"choices":[{"text":" joy","index":0,"logprobs":null,"finish_reason":null}],"model":"text-davinci-003"}
   //       const lines = data.toString().split('\n').filter(line => line.trim() !== '');
     
   //       // lines is an array of below lines
   //       for (const line of lines) {
     
   //        // line is this without \n in the end ->: data: {"id":"cmpl-7MwTOu3fnOCKxMMYvBmrLPfZ2hRxJ","object":"text_completion","created":1685702342,"choices":[{"text":" it","index":0,"logprobs":null,"finish_reason":null}],"model":"text-davinci-003"}
   //        // replace 'data: ' with an empty string
   //        const message = line.replace(/^data: /, '');
     
   //        // the last line will have line -> data: [DONE]
   //        if (message === '[DONE]') {
   //         return;
   //        }
     
   //        // message is this unless [DONE] -> {"id":"cmpl-7MwTOu3fnOCKxMMYvBmrLPfZ2hRxJ","object":"text_completion","created":1685702342,"choices":[{"text":" it","index":0,"logprobs":null,"finish_reason":null}],"model":"text-davinci-003"}
   //        const parsed = JSON.parse(message)
     
   //        // parse to js object
   //        const data = {response: parsed.choices[0].text}
     
   //        // adding "data: " as it is a server sent event
   //        const writeData = `data: ${JSON.stringify(data)}`
     
   //        // write the data to stream
   //        console.log('yes')
   //       }
   //      });
   //  };
   return (
      <div className='h-screen fixed w-full'>
         {loader && <Loader />}
         { popUp &&
            <PopupModal setPopUpTrial={setPopUpTrial}  />
         }
         {popUpTrial && 
            <PopupModalNote setPopUpTrial={setPopUpTrial} setPopUp={setPopUp} />
         }
         
         <div className='h-[5%] sm:h-[13%] bg-white sm:bg-transparent flex items-center justify-between px-5'>
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
                     <p className='text-sm'>{displayName}</p>
                     <p className='text-xs font-normal primary-text'>{email}</p>
                  </div>

                  <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-pink-600 text-white'>
                     {email?.slice(0,1)}
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

         <div className='sm:h-[78%] h-[80%] flex items-center gap-2 justify-between p-2'>
            <div className='w-[20%] h-full hidden sm:flex items-start flex-col gap-5 justify-start p-6 rounded-lg bg-white border overflow-scroll'>
               <h4 className='text-xl font-light'>Hello, {displayName}👋</h4>
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

               <div className='sm:h-[65%] h-[80%] flex p-4 flex-col overflow-scroll items-start gap-3' ref={chatContainerRef}>
               {responseData && responseData.map((item , index) => {
                  return (
                     <>
                        <div className={`w-full flex justify-${item.position}`}>
                           <p className={`${item.position === "end" ? 'bg-[#f1f1f3]' : 'bg-[#f2f0e4]'} sm:max-w-[60%] max-w-[90%] text-start  text-[16px] sm:leading-8 leading-6 font-light p-2 rounded-t-lg rounded-r-lg`}>{item.content}</p>
                        </div>
                     </>
                  )
               })}
                  {result &&
                     <div className={`w-full flex text-left justify-start`}>
                        <p className='bg-[#f2f0e4] sm:max-w-[70%] max-w-[90%] text-[16px]  leading-8 font-light  p-2 rounded-t-lg rounded-l-lg'>{result}</p>
                     </div>
                  }
                 
               </div>

               <div className='relative sm:h-[25%] h-[15%] border-t px-4'>
                     <div className='absolute sm:hidden flex items-center gap-3 px-1 py-1 text-[10px] font-normal -top-6  right-3 primary-color-btn rounded-t-lg'>
                        Prompt Library
                        <span className='bg-white w-[10px] border h-[10px] font-bold text-black flex justify-center items-center rounded-full'><BiPlus size={10} /></span>
                     </div>
                  <div className='flex justify-center items-center h-full w-full'>
                     
                     <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Ask Something!' className='relative z-10 sm:px-5 p-2 border-none outline-none sm:h-[60px] h-[40px] w-full rounded-xl bg-gray-100' />
                     <div className='absolute z-40  right-5 sm:w-[40px]  sm:h-[40px] w-[30px]  h-[30px]   bg-[#f2f0e4] rounded-full flex justify-center items-center cursor-pointer' onClick={handleSend}><HiArrowNarrowRight size={20} /></div>
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