'use client'

import {useEffect, useState} from "react";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import {handleCodeBoxes} from "@/utils/utils";
import {CodeBlock, irBlack as codepen} from "react-code-blocks";
import useLocalStorage from "react-use-localstorage";

const RewritePage = ()=>{

    const [accessToken, setAccessToken] = useLocalStorage('accessToken', null)

    const [userInput,setUserInput] = useState("")

    const [messages,setMessages] = useState<string>("")

    const [finalMessages , setFinalMessages] = useState<any>([])


    const postNewMessage = (text:string)=>{
        setMessages("")
        setFinalMessages([])
        fetchEventSource(`${process.env.NEXT_PUBLIC_BASE_API_URL}/ai_writers/generate_AI_writer/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                "document_name": "New Document",
                "frequency_penalty": 0,
                "max_tokens": 2048,
                "messages": [
                    {
                        "content": "you are a helpful assistant",
                        "role": "system"
                    },
                    {
                        "content": text,
                        "role": "user"
                    }
                ],
                "model": "gpt-3.5-turbo-0125",
                "presence_penalty": 0,
                "stream": true,
                "temperature": 0.3,
                "top_p": 1,
                "workspace_id": 245
            }),
            onmessage(ev) {
                const msg = JSON.parse(ev.data).content
                setMessages((pr)=> `${pr}${msg}`)
            }
        })
    }

    const handleSubmitBtnClick = ()=>{
        postNewMessage(userInput)
    }

    const handleCopy = (text : string)=>{
        navigator.clipboard.writeText(text)
            .then(res => alert("text copied to clipboard"))
    }

    useEffect(()=>{
        handleCodeBoxes(messages,setFinalMessages)
    },[messages])

    return(
        <>
            <div className={'w-full flex'}>
                <div className={'w-[40%] bg-[#FCFCFD] border-r border-[#EFEFEF]'}>
                    <div className={'w-full lg:pl-[36px] py-[12px] border-b border-[#EFEFEF] flex items-center gap-[12px]'}>
                        <div>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 7.5C22.5 4.99007 24.4901 3 27 3C29.5099 3 31.5 4.99007 31.5 7.5V25.5C31.5 25.8978 31.342 26.2794 31.0607 26.5607L28.0607 29.5607C27.7794 29.842 27.3978 30 27 30H7.5C6.30653 30 5.16193 29.5259 4.31802 28.682C3.47411 27.8381 3 26.6935 3 25.5C3 24.3065 3.47411 23.1619 4.31802 22.318C5.16193 21.4741 6.30653 21 7.5 21H13.5C13.8978 21 14.2794 20.842 14.5607 20.5607C14.842 20.2794 15 19.8978 15 19.5C15 19.1022 14.842 18.7206 14.5607 18.4393C14.2794 18.158 13.8978 18 13.5 18H9C8.17157 18 7.5 17.3284 7.5 16.5C7.5 15.6716 8.17157 15 9 15H13.5C14.6935 15 15.8381 15.4741 16.682 16.318C17.5259 17.1619 18 18.3065 18 19.5C18 20.6935 17.5259 21.8381 16.682 22.682C15.8381 23.5259 14.6935 24 13.5 24H7.5C7.10218 24 6.72064 24.158 6.43934 24.4393C6.15804 24.7206 6 25.1022 6 25.5C6 25.8978 6.15804 26.2794 6.43934 26.5607C6.72064 26.842 7.10218 27 7.5 27H23.3787L22.9393 26.5607C22.658 26.2794 22.5 25.8978 22.5 25.5V7.5ZM25.5 12V24.8787L27 26.3787L28.5 24.8787V12H25.5ZM28.5 9H25.5V7.5C25.5 6.64693 26.1469 6 27 6C27.8531 6 28.5 6.64693 28.5 7.5V9Z" fill="#181818"/>
                            </svg>
                        </div>
                        <p className={'text-[20px] lg:text-[24px]'}>
                            ReWrite
                        </p>
                    </div>

                    <div className={'w-full px-[16px] lg:px-[36px] py-[24px] flex flex-col gap-[36px]'}>
                        <div className={'w-full'}>
                            <h3 className={'mb-[12px]'}>
                                Target Text
                            </h3>

                            <textarea
                                dir={"auto"}
                                className={'w-full p-[8px] lg:px-[16px] bg-[#F8F8F8] rounded-[8px] resize-none outline-none border border-transparent focus:border-[#181818]'}
                                rows={12}
                                placeholder={"paste your text that you wish to rewrite or improve ...  "}
                                value={userInput}
                                onChange={e => {
                                    if (e.target.value.length <= 200){
                                        setUserInput(e.target.value)
                                    }
                                }}
                            />
                            <p>
                                {userInput.length}/200
                            </p>
                        </div>

                        <div className={'w-full'}>
                            <h3 className={'mb-[12px]'}>
                                Language
                            </h3>
                            select
                        </div>

                        <div className={'w-full'}>
                            <h3 className={'mb-[12px]'}>
                                Engine
                            </h3>

                            <div className={'w-full flex flex-col md:flex-row items-center justify-between gap-[18px]'}>
                                select
                                <button
                                    className={'w-[50%] bg-[#9373EE] rounded-[12px] py-[16px] flex items-center text-white'}
                                    onClick={handleSubmitBtnClick}
                                >
                                    <p className={'w-full text-center'}>
                                        Rewrite
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={'w-[60%] px-[36px] pt-[80px] flex flex-col gap-[8px]'}>
                    {finalMessages.filter(item => (item !== null && item.text !== "")).map((item,i) => {
                        if (item.type === 'code'){
                            if (item.title === ""){
                                return null
                            }else {
                                return(
                                    <div key={`ans-box-${i}-code`} className={'w-full mt-[12px] rounded-[12px] bg-[#0D0D0D]'}>
                                        <div className={'w-full px-[12px] py-[4px] rounded-t-[12px] flex items-center justify-between bg-[#2D2D2D] text-[#929292] text-[12px]'}>
                                            <p>{item.title ?? ""}</p>
                                            <div className={'flex items-center gap-[4px] cursor-pointer'} onClick={()=>handleCopy(item.text)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                                     fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                                                    <path
                                                        d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                                    <path
                                                        d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                                </svg>

                                                <p>
                                                    copy code
                                                </p>
                                            </div>
                                        </div>
                                        <div className={'text-[12px]'}>
                                            <CodeBlock
                                                text={item.text}
                                                language={item.title}
                                                showLineNumbers={false}
                                                theme={codepen}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        }

                        return(
                            <div key={`ans-box-${i}`} className={'nerd-response'}>
                                <pre className={'nerd-response-codebox__body max-w-full'}>{item.text ?? ""}</pre>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default RewritePage