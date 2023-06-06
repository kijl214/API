import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About_cat = () => {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [breedFilter, setBreedFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');

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

  // Filter the list of cats based on the search term, breed filter, and age filter
  const filteredCats = cats.filter(cat => {
    const term = searchTerm.toLowerCase();
    const breed = breedFilter.toLowerCase();
    const age = parseInt(cat.age);
    if (!isNaN(age)) {
      if (ageFilter === 'lessThan5') {
        return (cat.id.toString().includes(term) || cat.name.toLowerCase().includes(term)) && (breed === '' || cat.breed.toLowerCase() === breed) && (age < 5);
      } else if (ageFilter === 'between5And10') {
        return (cat.id.toString().includes(term) || cat.name.toLowerCase().includes(term)) && (breed === '' || cat.breed.toLowerCase() === breed) && (age >= 5 && age <= 10);
      } else if (ageFilter === 'between10And20') {
        return (cat.id.toString().includes(term) || cat.name.toLowerCase().includes(term)) && (breed === '' || cat.breed.toLowerCase() === breed) && (age >= 10 && age <= 20);
      } else if (ageFilter === 'moreThan20') {
        return (cat.id.toString().includes(term) || cat.name.toLowerCase().includes(term)) && (breed === '' || cat.breed.toLowerCase() === breed) && (age > 20);
      }
    }
    return (cat.id.toString().includes(term) || cat.name.toLowerCase().includes(term)) && (breed === '' || cat.breed.toLowerCase() === breed);
  });

  // Get a list of unique cat breeds for the breed select list
  const uniqueBreeds = [...new Set(cats.map(cat => cat.breed))];

  return (
    <div>
      <h1>Cats</h1>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="searchTerm" className="form-label">Search by ID or Name</label>
          <input type="text" className="form-control" id="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="col">
          <label htmlFor="breedFilter" className="form-label">Breed</label>
          <select className="form-select" id="breedFilter" value={breedFilter} onChange={(e) => setBreedFilter(e.target.value)}>
            <option value="">All Breeds</option>
            {uniqueBreeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
          </select>
        </div>
        <div className="col">
          <label htmlFor="ageFilter" className="form-label">Age</label>
          <select className="form-select" id="ageFilter" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} style={{ width: '200px' }}>
            <option value="">All Ages</option>
            <option value="lessThan5">Less than 5 years old</option>
            <option value="between5And10">5-10 years old</option>
            <option value="between10And20">10-20 years old</option>
            <option value="moreThan20">More than 20 years old</option>
          </select>
        </div>
      </div>
      <ul>
        {filteredCats.map(cat => (
          <li key={cat.id}>
            <table>
              <tbody>
                <tr><td>No:</td><td>{cat.id}</td></tr>
                <tr><td>Name:</td><td>{cat.name}</td></tr>
                <tr><td>Years old:</td><td>{cat.age}</td></tr>
                <tr><td>Breed:</td><td>{cat.breed}</td></tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About_cat;