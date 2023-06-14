import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './all.css';

function AddCat() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const addCat = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('breed', breed);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3001/cats/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      



      setSuccessMessage('Cat added successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToBreedhelper =() => {
    // Navigate to breed helper 
    navigate('/breed-helper');
  }
 




  return (
    <div>
      <h2>Add a Cat</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
      <div className="mb-3">
        <label>Name</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Age</label>
        <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Breed</label>
        <select className="form-select" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)}>
            <option value="">Choose breed</option>
            <option value="British Shorthair">British Shorthair</option>
            <option value="Exotic Shorthair">Exotic Shorthair</option>
            <option value="American Shorthair">American Shorthair</option>
            <option value="Burmese">Burmese</option>
          </select>
      </div>
      <button onClick={(event) => {
      event.preventDefault();
      handleGoToBreedhelper();
    }}>
        breed selection helper
        </button>
      <div className="mb-3">
        <label>Image</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button className="btn btn-primary" onClick={addCat}>Add Cat</button>
    </div>
  );
}

export default AddCat;