export const handleCodeBoxes =(input:any,setOutput:Function)=>{
    const parts = input.split(/(```[\s\S]*?```)/g);
    let result =  parts.map((part:any) => {
        if (part.startsWith('```') && part.endsWith('```')) {
            const language = part.match(/```(.*?)\n/)[1];
            const code = part.replace(/```.*?\n|\n```/g, '');
            return {
                type: "code",
                title: language,
                text: code
            };
        } else {
            return {
                type: "text",
                title: null,
                text: part.trim()
            };
        }
    }).filter(obj => obj.text);

    if (result.length > 0 && result[result.length - 1].text === 'null') {
        result.pop();
    }

    setOutput(result)
}
