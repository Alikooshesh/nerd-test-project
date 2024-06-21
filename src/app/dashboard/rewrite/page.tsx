'use client'

import {useEffect, useState} from "react";
import {fetchEventSource} from "@microsoft/fetch-event-source";
import {handleCodeBoxes} from "@/utils/utils";

const RewritePage = ()=>{

    const [userInput,setUserInput] = useState("")

    const [messages,setMessages] = useState<string[]>([])

    const [finalMessages , setFinalMessages] = useState<any>([])

    const postNewMessage = (text:string)=>{
        fetchEventSource('http://5.78.55.161:8000/v1/api/ai_writers/generate_AI_writer/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJzdWIiOiJkNDY1MzJiOS00YjIyLTQ5ZDQtYWViYi01ZmIyNzAyOWE4MTYiLCJpYXQiOjE3MTg5NTA4NTEsImV4cCI6MTcxODk2ODg1MX0.PMfQec7OSHw0kb0_mMh8GCfQv5ku8ammKtg0n5AzspaXfFsGSnLsvrS_XNMOitcMCbWmgHJxQcYuYLGMgxC7IQ',
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
                setMessages((pr)=>[...pr,msg])
            }
        })
    }

    const handleSubmitBtnClick = ()=>{
        postNewMessage(userInput)
    }

    useEffect(()=>{
        handleCodeBoxes(messages,setFinalMessages)
    },[messages])

    return(
        <>
            <textarea value={userInput} onChange={e => setUserInput(e.target.value)}/>
            <button onClick={handleSubmitBtnClick}>get data</button>
            {finalMessages.filter(item => item !== null).map(item => {
                if (item.type === 'code'){
                    return(
                        <div className={'nerd-response-codebox'}>
                            <p className={'nerd-response-codebox__title'}>{item.title ?? ""}</p>
                            <pre className={'nerd-response-codebox__body'}>{item.text ?? ""}</pre>
                        </div>
                    )
                }

                return(
                    <div className={'nerd-response'}>
                        <pre className={'nerd-response-codebox__body max-w-full'}>{item.text ?? ""}</pre>
                    </div>
                )
            })}
        </>
    )
}

export default RewritePage