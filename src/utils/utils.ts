export const handleCodeBoxes =(input,setOutput)=>{
    const parts = input.split(/(```[\s\S]*?```)/g);
    let result =  parts.map(part => {
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

    setOutput(result)
}