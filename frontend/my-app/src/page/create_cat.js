import React, { useState } from 'react';
import axios from 'axios';

function AddCat() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [image, setImage] = useState(null);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add a Cat</h2>
      <div className="mb-3">
        <label htmlFor="name">Name</label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="age">Age</label>
        <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="breed">Breed</label>
        <input type="text" className="form-control" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="image">Image</label>
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