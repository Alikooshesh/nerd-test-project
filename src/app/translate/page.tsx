'use client'

import {useEffect, useState} from "react";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import {handleCodeBoxes} from "@/utils/utils";

const TranslatePage = ()=>{

    const [userInput,setUserInput] = useState("")
    const [outputText , setOutputText] = useState("")

    const [messages,setMessages] = useState<string[]>([])

    const [langList,setLangList] = useState(['English','Spanish','Persian'])

    const [inputLang , setInputLang] = useState("English")
    const [outputLang , setOutputLang] = useState("Spanish")

    const [timer, setTimer] = useState<any>(null);

    const postNewMessage = (text:string,inputLanguage:string,outputLanguage:string)=>{
        setOutputText("")
        setMessages([])
        fetchEventSource('http://5.78.55.161:8000/v1/api/translates/generate_translate/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJzdWIiOiJkNDY1MzJiOS00YjIyLTQ5ZDQtYWViYi01ZmIyNzAyOWE4MTYiLCJpYXQiOjE3MTg5NTA4NTEsImV4cCI6MTcxODk2ODg1MX0.PMfQec7OSHw0kb0_mMh8GCfQv5ku8ammKtg0n5AzspaXfFsGSnLsvrS_XNMOitcMCbWmgHJxQcYuYLGMgxC7IQ',
            },
            body: JSON.stringify({
                "document_name": "New Document",
                "frequency_penalty": 0,
                "max_tokens": 100,
                "messages": [
                    {
                        "content": `You will be provided with a sentence in ${inputLanguage ?? "auto"}, and your task is to translate it into ${outputLanguage ?? "English"}.`,
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
                setMessages((pr)=>[...pr,msg])
            }
        })
    }

    const handleUserInputChange = (e)=>{
        setUserInput(e.target.value)

        if (timer){
            clearTimeout(timer)
        }

        const newTimer = setTimeout(()=>handleTimeout(e.target.value),1500)

        setTimer(newTimer);
    }

    const handleTimeout = (text) => {
        console.log(text)
        if (text.length > 0){
            postNewMessage(text, inputLang , outputLang)
        }
    };

    const handleChangeBtn = ()=>{
        const tempInputLang = inputLang
        const tempOutputLang = outputLang
        const tempOutputText = outputText

        setInputLang(tempOutputLang)
        setOutputLang(tempInputLang)
        setUserInput(tempOutputText)
        setOutputText("")
    }

    useEffect(()=>{
        if (userInput.length > 0){
            postNewMessage(userInput, inputLang , outputLang)
        }
    },[inputLang,outputLang])

    useEffect(()=>{
        setOutputText(messages.join(""))
    },[messages])

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [timer]);

    return(
        <>
            <div className={'w-full min-h-screen p-[16px] lg:p-[24px]'}>
                <div className={'w-fit px-[12px] py-[4px] rounded-[24px] bg-[#E7E8EA] text-[#20262E] flex items-center gap-[16px]'}>
                    {langList.map(item => <span key={`in-lang-${item}`} onClick={()=> setInputLang(item)} className={item === inputLang ? 'px-[8px] py-[4px] bg-[#20262E] text-[#F1FDFF] rounded-[16px]' : 'px-[8px] py-[4px] cursor-pointer'}>{item}</span>)}
                </div>
                <div className={'mt-[12px]'}>
                    <textarea
                        dir={"auto"}
                        className={'w-full p-[8px] lg:px-[16px] bg-[#F8F8F8] rounded-[8px] resize-none outline-none border border-transparent focus:border-[#181818]'}
                        rows={12}
                        placeholder={"Enter Your text here"}
                        value={userInput}
                        onChange={handleUserInputChange}
                    />
                </div>

                <div className={'w-full flex items-center justify-center'}>
                    <button className={'p-[8px] bg-[#EBEEF2] rounded-full fill-[#20262E]'} onClick={handleChangeBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </button>
                </div>

                <div className={'w-fit mt-[12px] px-[12px] py-[4px] rounded-[24px] bg-[#E7E8EA] text-[#20262E] flex items-center gap-[16px]'}>
                    {langList.map(item => <span key={`out-lang-${item}`} onClick={()=> setOutputLang(item)} className={item === outputLang ? 'px-[8px] py-[4px] bg-[#20262E] text-[#F1FDFF] rounded-[16px]' : 'px-[8px] py-[4px] cursor-pointer'}>{item}</span>)}
                </div>
                <div className={'mt-[12px]'}>
                    <textarea
                        dir={"auto"}
                        className={'w-full p-[8px] lg:px-[16px] bg-[#F8F8F8] rounded-[8px] resize-none outline-none border border-transparent focus:border-[#181818]'}
                        rows={12}
                        placeholder={"Enter Your text here"}
                        value={outputText}
                        disabled
                    />
                </div>
            </div>
        </>
    )
}

export default TranslatePage