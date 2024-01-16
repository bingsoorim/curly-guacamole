const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#msg");
const nicknForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload}
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server.");
});

socket.addEventListener("message", (message) => {
    // console.log("New Message: ", message.data);
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from the Server.");
});

// setTimeout(() => {
//     socket.send("hellow from the Browser!!!");
// }, 10000);

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    // console.log(input.value);
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nicknForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nicknForm.addEventListener("submit", handleNickSubmit);