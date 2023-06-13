import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRoom = (props)=> {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  const catData = localStorage.getItem('selectedCat');
  const cats = catData ? JSON.parse(catData) : [];
  const staff_local = localStorage.getItem('Staff')|| 0;
  const user_local = localStorage.getItem('User')|| 0;

  useEffect(() => {
    axios.post('http://localhost:3001/cat/chatroom/get', {id: cats.id})
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send message to backend
    axios.post('http://localhost:3001/cat/chatroom/post', { text: newMessage, id: cats.id, staff_id:staff_local, user_id:user_local })
      .then(response => {
        setMessages([...messages, response.data]);
        setNewMessage('');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  }

  const handleLeaveChatRoom = () => {
    // Navigate back to cat list component
    navigate('/about-cat');
  }

  const renderMessage = (message) => {
    let userId = 'visitor';
    if (message.staff_id > 0) {
      userId = "Staff " + message.staff_id;
    } else if (message.user_id > 0) {
      userId = "User " + message.user_id;
    }
    return (
      <p key={message.id}>
        {userId} : {message.text}
      </p>
    );
  }







  return (
    <div>
      <h1>Chat Room about {cats.name}</h1>
      <img src={cats.picture} alt="cat" style={{ maxWidth: '200px' }} />
      
      <ul>     
        {messages.map((message) => renderMessage(message))}

      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={handleInputChange} />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
      <button className="btn btn-primary" onClick={handleLeaveChatRoom}>Leave Chat Room</button>
    </div>
  );
}

export default ChatRoom;

