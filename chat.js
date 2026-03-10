const API_KEY = "YOUR_API_KEY"; 
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;     
let msgInput = document.getElementById('msg');
msgInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMsg();
    }
});      
let sendMsg = () =>{
    let msg = document.getElementById('msg');
    let chatWindow = document.getElementById('chatWindow');
    if(msg.value==="")
    {
        alert("Message cannot be empty");
        return;
    }
    chatWindow.innerHTML +=`
    <div class="userMsg">${msg.value}</div>
    `
    chatWindow.scrollTop = chatWindow.scrollHeight;
    let userMsg = msg.value;
    setTimeout(()=>replyMsg(userMsg),100);
    msg.value = "";
}
let replyMsg = async(userMsg) =>
{
    let chatWindow = document.getElementById('chatWindow');
    
    let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            contents: [{
                    role: "user", 
                    parts: [{ 
                        text: "SYSTEM RULE: You are a brutally honest Love Guru. Blunt, direct, sarcastic, short but descriptive, no sugarcoating.Be a girl's girl. Only talk about love/dating. If I ask about anything else, be rude and refuse. Now, respond to this: " + userMsg 
                    }]
                }]
        })
    });
    let data = await response.json();
    console.log(data)
    let botMsg = data.candidates[0].content.parts[0].text;
    chatWindow.innerHTML +=`
    <div class="botMsg">${botMsg}</div>
    `
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
