import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCat = () => {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [image, setImage] = useState(null);
  const [selectedCatId, setSelectedCatId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/cats/get')
      .then(response => {
        setCats(response.data);
      })
      .catch(error => {
        console.error('Error fetching cats: ' + error.message);
      });
  }, []);

  // Update the selected cat in the backend
  const updateCat = () => {
    axios.put(`http://localhost:3001/cats/put/${selectedCatId}`, {name,age,breed,image}, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        // Update the list of cats with the updated cat
        const updatedCats = cats.map(cat => {
          if (cat.id === selectedCatId) {
            return { ...cat, name, age, breed };
          } else {
            return cat;
          }
        });
        setCats(updatedCats);
        // Clear the form inputs
        setName('');
        setAge('');
        setBreed('');
        setImage('');
        setSelectedCatId(null);
      })
      .catch(error => {
        console.error('Error updating cat: ' + error.message);
      });
  };

  // Handle the cat selection event
  const handleCatSelection = (cat) => {
    setName(cat.name);
    setAge(cat.age);
    setBreed(cat.breed);
    setSelectedCatId(cat.id);
  };

  return (
    <div>
      <h1>Update a cat</h1>
      <div className="row">
        <div className="col-md-4">
          <ul className="list-group">
            {cats.map(cat => (
              <li key={cat.id} className="list-group-item" onClick={() => handleCatSelection(cat)}>
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          {selectedCatId && (
            <form onSubmit={updateCat}>
              <div className="mb-3">
                <label>Cat Name</label>
                <input type="text" className="form-control" placeholder="cat name" value={name} onChange={e => setName(e.target.value)} />       
              </div>
              <div className="mb-3">
                <label>Age</label>
                <input type="number" className="form-control" placeholder="cat age" value={age} onChange={e => setAge(parseInt(e.target.value))} />       
              </div>
              <div className="mb-3">
                <label>Breed</label>
                <input type="text" className="form-control" placeholder="cat breed" value={breed} onChange={e => setBreed(e.target.value)} />       
              </div>
              <div className="mb-3">
                <label>Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>



              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Update Cat
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateCat;