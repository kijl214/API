import './App.css';

import React, { useState, useEffect } from 'react';

function CatList() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [breed, setBreed] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetch('/api/cats')
      .then(res => res.json())
      .then(data => setCats(data))
      .catch(err => console.error(err));
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/cats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, breed, photoUrl, location })
      });
      const data = await res.json();
      setCats([...cats, data]);
      setName('');
      setAge(0);
      setBreed('');
      setPhotoUrl('');
      setLocation('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Cat Listings</h1>
      <ul>
        {cats.map(cat => (
          <li key={cat._id}>{cat.name} - {cat.age} years old</li>
        ))}
      </ul>
      <h2>Create New Listing</h2>
      <form onSubmit={handleCreate}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value))}          min="0" max="30"
        />
      </label>
      <br />
      <label>
        Breed:
        <input type="text" value={breed} onChange={e => setBreed(e.target.value)} />
      </label>
      <br />
      <label>
        Photo URL:
        <input type="text" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create</button>
    </form>
  </div>
);
}

export default CatList;
