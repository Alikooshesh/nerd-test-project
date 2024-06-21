'use client'

import {useEffect, useState} from "react";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import {handleCodeBoxes} from "@/utils/utils";
import useLocalStorage from "react-use-localstorage";

const TranslatePage = ()=>{

    const [accessToken,setAccessToken] = useLocalStorage('accessToken', undefined)

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
        fetchEventSource(`${process.env.NEXT_PUBLIC_BASE_API_URL}/translates/generate_translate/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${accessToken}`,
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
            },
            onerror(err) {
                setAccessToken("null")
            }
        })
    }

    const handleUserInputChange = (e)=>{
        setUserInput(e.target.value)

        if (timer){
            clearTimeout(timer)
        }

        const newTimer = setTimeout(()=>handleTimeout(e.target.value),500)

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

    const handleCopy = (text : string)=>{
        navigator.clipboard.writeText(text)
            .then(res => alert("text copied to clipboard"))
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
            <div className={'w-full'}>
                <div className={'w-full max-w-[950px]'}>
                    <div className={'w-full pl-[16px] lg:pl-[36px] py-[12px] border-b border-[#EFEFEF] flex items-center gap-[12px]'}>
                        <div>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C9.55228 2 10 2.44772 10 3V4H11C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6H9.96409C9.82107 7.97938 9.2571 9.78883 8.38337 11.1868C8.35403 11.2337 8.32427 11.2803 8.29408 11.3265C9.236 11.7144 10.4127 11.9681 11.7245 12.0003C12.2767 12.0139 12.7133 12.4724 12.6997 13.0245C12.6861 13.5767 12.2276 14.0133 11.6755 13.9997C9.8896 13.9559 8.23087 13.559 6.91466 12.8935C6.08473 13.5766 5.10007 14 4 14C3.44772 14 3 13.5523 3 13C3 12.4477 3.44772 12 4 12C4.39033 12 4.79264 11.891 5.18789 11.6659C4.47295 10.9415 4 10.0418 4 9C4 8.44772 4.44772 8 5 8C5.55228 8 6 8.44772 6 9C6 9.38079 6.17691 9.82002 6.6041 10.2566C6.63207 10.2141 6.65983 10.1708 6.68738 10.1267C7.34694 9.07149 7.8194 7.63725 7.95804 6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H8V3C8 2.44772 8.44772 2 9 2ZM16 10C16.3952 10 16.7533 10.2327 16.9138 10.5939L20.9138 19.5939C21.1381 20.0985 20.9108 20.6895 20.4061 20.9138C19.9015 21.1381 19.3105 20.9108 19.0862 20.4061L18.4612 19H13.5388L12.9138 20.4061C12.6895 20.9108 12.0985 21.1381 11.5939 20.9138C11.0892 20.6895 10.8619 20.0985 11.0862 19.5939L15.0862 10.5939C15.2467 10.2327 15.6048 10 16 10ZM14.4277 17H17.5723L16 13.4622L14.4277 17Z" fill="#181818"/>
                            </svg>
                        </div>
                        <p className={'text-[20px] lg:text-[24px]'}>
                            Translate
                        </p>
                    </div>
                    <div className={'w-full mt-[32px]  p-[16px] lg:p-[24px]'}>
                        <div className={'w-fit px-[12px] py-[4px] rounded-[24px] bg-[#E7E8EA] text-[#20262E] flex items-center gap-[16px]'}>
                            {langList.map(item => <span key={`in-lang-${item}`} onClick={()=> setInputLang(item)} className={item === inputLang ? 'px-[8px] py-[4px] bg-[#20262E] text-[#F1FDFF] rounded-[16px]' : 'px-[8px] py-[4px] cursor-pointer'}>{item}</span>)}
                        </div>
                        <div className={'mt-[12px] relative'}>
                    <textarea
                        dir={"auto"}
                        className={'w-full p-[8px] lg:px-[16px] bg-[#F8F8F8] rounded-[8px] resize-none outline-none border border-transparent focus:border-[#181818]'}
                        rows={12}
                        placeholder={"Enter Your text here"}
                        value={userInput}
                        onChange={handleUserInputChange}
                    />

                            <div className={'absolute z-10 bottom-8'}>
                                <div className={'w-full px-[8px] flex items-center gap-4'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-volume-up" viewBox="0 0 16 16">
                                        <path
                                            d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                                        <path
                                            d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                                        <path
                                            d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-clipboard cursor-pointer" viewBox="0 0 16 16"
                                         onClick={()=>handleCopy(userInput)}
                                    >
                                        <path
                                            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                        <path
                                            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                    </svg>
                                </div>
                            </div>
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
                        <div className={'mt-[12px] relative'}>
                    <textarea
                        dir={"auto"}
                        className={'w-full p-[8px] lg:px-[16px] bg-[#F8F8F8] rounded-[8px] resize-none outline-none border border-transparent focus:border-[#181818]'}
                        rows={12}
                        placeholder={"Enter Your text here"}
                        value={outputText}
                        disabled
                    />
                            <div className={'absolute z-10 bottom-8'}>
                                <div className={'w-full px-[8px] flex items-center gap-4'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-volume-up" viewBox="0 0 16 16">
                                        <path
                                            d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                                        <path
                                            d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                                        <path
                                            d="M10.025 8a4.5 4.5 0 0 1-1.318 3.182L8 10.475A3.5 3.5 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.5 4.5 0 0 1 10.025 8M7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11"/>
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-clipboard cursor-pointer" viewBox="0 0 16 16"
                                         onClick={()=>handleCopy(outputText)}
                                    >
                                        <path
                                            d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                        <path
                                            d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TranslatePage