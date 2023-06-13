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
  const username = localStorage.getItem('Username')|| 'visitor';
  

  useEffect(() => {
    axios.post('http://localhost:3001/cat/chatroom/get', {id: cats.id})
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [cats.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send message to backend
    axios.post('http://localhost:3001/cat/chatroom/post', { text: newMessage, id: cats.id, staff_id:staff_local, user_id:user_local })
    .then(() => {
      axios.post('http://localhost:3001/cat/chatroom/get', {id: cats.id})
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.error('Error deleting cat: ' + error.message);
    });
  };

  const deletetext = (selectedId) => {
    axios.delete(`http://localhost:3001/cats/chatroom/delete/${selectedId}`)
      .then(() => {
        axios.post('http://localhost:3001/cat/chatroom/get', {id: cats.id})
          .then(response => {
            setMessages(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.error('Error deleting cat: ' + error.message);
      });
  }

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  }

  const handleLeaveChatRoom = () => {
    // Navigate back to cat list component
    navigate('/about-cat');
  }

  const Message = ({ message }) => {
    const [user, setUser] = useState('visitor');
    const [userId, setuserId] = useState("");
    const [userStyle, setuserStyle] = useState('alert alert-info');



    useEffect(() => {
      if (message.staff_id > 0) {
        setuserId ("(Staff id: " + message.staff_id+")");
        setuserStyle ("alert alert-secondary")

        axios.post('http://localhost:3001/cat/chatroom/get/staffname', {id: message.staff_id})
          .then(response => {
            setUser(response.data[0].username);
          })
          .catch(error => {
            console.log(error);
          });

      } else if (message.user_id > 0) {
        setuserId ("(User id: " + message.user_id+")")
        setuserStyle ("alert alert-success")

        axios.post('http://localhost:3001/cat/chatroom/get/username', {id: message.user_id})
          .then(response => {
            setUser(response.data[0].username);
          })
          .catch(error => {
            console.log(error);
          });

      }
    }, [message.staff_id, message.user_id]);

    return (
      <div key={message.id}>
        <li class={userStyle}>
          <p><strong>{user}{userId}</strong> : {message.text}</p>  
          <button class="btn btn-danger btn-sm"  onClick={() => deletetext(message.id)}>Delete</button>  
        </li>
      </div>
    );
  }

  return (
    <div>
      <h5>Chat Room about {cats.name}</h5>
      <img src={cats.picture} alt="cat" style={{ maxWidth: '250px' }} />
      <p class="alert alert-primary">hello {username} !</p>
      <ul>     
        {messages.map((message) => (<Message message={message} />))}
      </ul>
      <form class="alert alert-secondary " onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={handleInputChange} />
        <button class="btn btn-primary btn-sm" type="submit">Send</button>
      </form>
      <button className="btn btn-secondary " onClick={handleLeaveChatRoom}>Leave Chat Room</button>
    </div>
  );
}

export default ChatRoom;

