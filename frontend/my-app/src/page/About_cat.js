import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const About_cat = () => {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [breedFilter, setBreedFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [favouritesCat, setFavouritesCat] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userid = localStorage.getItem('User');
  const navigate = useNavigate();

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

  // Check if user is logged in
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userloggedIn');
    setIsLoggedIn(userLoggedIn === 'true');
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
  const handleAddToFavourites = async (cat) => {
    const formData = new FormData();
    formData.append('catid', cat.id);
    formData.append('userid', userid);
    formData.append('name', cat.name);
    formData.append('age', cat.age);
    formData.append('breed', cat.breed);
  
    // Check if the image property exists and has a value
    if (cat.picture) {
      // Convert the base64 image to a blob
      const byteCharacters = atob(cat.picture.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
  
      formData.append('image', blob);
    }
  
    try {
      const response = await axios.post('http://localhost:3001/cats/favourite_cat/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
  
    } catch (error) {
      console.error(error);
    }
  };



  const handleGoToChatRoom = (cat) => {
    localStorage.setItem('selectedCat', JSON.stringify(cat));
    // Navigate to chat room component
    navigate('/chat-room');
  }

  return (
    <div>
      <h1>Cats</h1>
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Search by ID or Name</label>
          <input type="text" className="form-control" id="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="col">
          <label className="form-label">Breed</label>
          <select className="form-select" id="breedFilter" value={breedFilter} onChange={(e) => setBreedFilter(e.target.value)}>
            <option value="">All Breeds</option>
            {uniqueBreeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Age</label>
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
          <div>
          <li key={cat.id}>
            <table>
            <thead>
            <tr>
                <th><img src={cat.picture} alt="cat" style={{ maxWidth: '200px' }} /></th>
            </tr>
            </thead>
              <tbody>
                <tr>No:  {cat.id}</tr>
                <tr>Name:  {cat.name}</tr>
                <tr>Years old:  {cat.age}</tr>
                <tr>Breed:  {cat.breed}</tr>
                <button
                  className="btn btn-primary"
                  onClick={() => handleGoToChatRoom(cat)}
                >
                  Talk the cat with us
                </button>
                {isLoggedIn &&
                  <tr>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToFavourites(cat)}
                      >
                        Add to Favourites
                      </button>
                    </td>
                  </tr>
                }
                
              </tbody>
            </table>
          </li>
          </div>






        ))}
      </ul>
    </div>
  );
};

export default About_cat;