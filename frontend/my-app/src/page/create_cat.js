import React, { useState } from 'react';
import axios from 'axios';

const Create_cat = () => {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');

  // Add a new cat to the backend
  const addCat = () => {
    axios.post('http://localhost:3001/cats/post', { name, age, breed })
      .then(response => {
        // Add the new cat to the list of cats
        setCats([...cats, { id: response.data.id, name, age, breed }]);
        // Clear the form inputs
        setName('');
        setAge('');
        setBreed('');
      })
      .catch(error => {
        console.error('Error adding cat: ' + error.message);
      });
  };

  return (
    <div>
      <h1>Add a new cat</h1>
      <form onSubmit={addCat}>
        <div className="mb-3">
          <label htmlFor="firstName">Cat Name</label>
          <input type="text" className="form-control" placeholder="cat name" value={name} onChange={e => setName(e.target.value)} />       
        </div>
        <div className="mb-3">
          <label htmlFor="firstName">Age</label>
          <input type="number" className="form-control" placeholder="cat age" value={age} onChange={e => setAge(parseInt(e.target.value))} />      
        </div>
        <div className="mb-3">
          <label htmlFor="firstName">Breed</label>
          <input type="text" className="form-control" placeholder="cat breed" value={breed} onChange={e => setBreed(e.target.value)} />       
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
          Add Cat
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create_cat;