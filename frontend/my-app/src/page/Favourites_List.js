import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cats = () => {

  const [cats, setCats] = useState([]);
  const user_id = localStorage.getItem('User');

  // Fetch all cats from the backend
  useEffect(() => {
    axios.post('http://localhost:3001/cats/favourite_cat/get', {user_id})
      .then(response => {
        setCats(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching cats: ' + error.message);
      });
  }, []);

  const handleDelete = (catId) => {
    axios.delete(`http://localhost:3001/cats/favourite_cat/delete/${catId}`)
      .then(response => {
        setCats(cats.filter(cat => cat.id !== catId));
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error deleting cat: ' + error.message);
      });
  };

  return (
    <div>
      <h1>Favourite Cats</h1>
      {cats.length === 0 ? (
        <p>You have no favourite cats yet.</p>
      ) : (
        <ul>
          {cats.map(cat => (
            <li key={cat.id}>
              <table>
                <thead>
                  <tr>
                    <th><img src={cat.picture} alt="cat" style={{ maxWidth: '200px' }} /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>No:</td><td>{cat.catid}</td></tr>
                  <tr><td>Name:</td><td>{cat.name}</td></tr>
                  <tr><td>Years old:</td><td>{cat.age}</td></tr>
                  <tr><td>Breed:</td><td>{cat.breed}</td></tr>
                </tbody>
              </table>
              <button className="btn btn-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
              <br />
              <br />
              <br />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cats;