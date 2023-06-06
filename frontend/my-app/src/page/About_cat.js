import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About_cat = () => {
  const [cats, setCats] = useState([]);

  // Fetch all cats from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/cats/get')
      .then(response => {
        setCats(response.data);
      })
      .catch(error => {
        console.error('Error fetching cats: ' + error.message);
      });
  }, []);

  return (
    <div>
    <h1>Cats</h1>
    <ul>
    {cats.map(cat => (
        <li key={cat.id}>
        <tr>No: {cat.id}</tr>
        <tr>Name: {cat.name}</tr>
        <tr>Years old: {cat.age}</tr>
        <tr>Breed: {cat.breed}</tr>
        </li>
    ))}
    </ul>
    </div>
      );
    }
    
    export default About_cat;