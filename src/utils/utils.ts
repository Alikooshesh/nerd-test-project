export const handleCodeBoxes =(input,setOutput)=>{
    let tempMessages:any = [...input]
    let result:any = []

    let startIndex = tempMessages.findIndex(item => item ==="```")
    let endIndex = tempMessages.findIndex(item => item === "``") || tempMessages.length-1
    let langName = tempMessages[startIndex+1]

    tempMessages.splice(startIndex-1 , endIndex-(startIndex-2),{
        type : "code",
        title : langName,
        text : tempMessages.slice(startIndex+2,endIndex).join("")
    })

    let tempSingeText = ""
    for (let i=0;i<tempMessages.length;i++){
        if (typeof tempMessages[i] === "string"){
            tempSingeText+= tempMessages[i]
        }else {
            result.push({
                type : "text",
                title : null,
                text : tempSingeText
            })
            tempSingeText = ""
            result.push(tempMessages[i])
        }
    }

    setOutput(result)
}