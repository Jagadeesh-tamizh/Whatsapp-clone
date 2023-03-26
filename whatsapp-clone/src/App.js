import "./App.css";
import { Chat } from "./Chat";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import "./Chat.css";
import "./Sidebar.css";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/message").then((response) => {
      setMessages(response.data);
      console.log("data fetched", response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("84cdbd8f35f190cc57f0", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log("the fetched state", messages);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
