import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("https://chat-backend-tp7d.onrender.com/");
function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message });
    setMessage("");
  };
  console.log(message);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <h1>Chat app</h1>
      {chat.map((payload, index) => {
        return <p key={index}>{payload.message}</p>;
      })}

      <form onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="send text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default App;
