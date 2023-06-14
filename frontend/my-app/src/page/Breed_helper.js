import React, { useState,useEffect } from 'react';
const axios = require('axios');

const Breedhelper = ()=> {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [selectedBreedImage, setSelectedBreedImage] = useState('');

    useEffect(() => {
      const getBreeds = async () => {
        try {
          const response = await axios.get('https://api.thecatapi.com/v1/breeds');
          const breeds = response.data.map((breed) => ({
            id: breed.id,
            name: breed.name
          }));
          setBreeds(breeds);
        } catch (err) {
          console.error('Error getting breeds: ', err);
        }
      };
      getBreeds();
    }, []);


    const handleSelectChange = async (event) => {
        setSelectedBreed(event.target.value);
        try {
          const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${event.target.value}`);
          setSelectedBreedImage(response.data[0]?.url);
        } catch (err) {
          console.error('Error getting breed image: ', err);
        }
      };

    return (
        <div>
        <h1>Breeds Helper</h1>
        <select className="form-select" value={selectedBreed} onChange={handleSelectChange}>
          <option value="">Select a breed</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
  
        {selectedBreedImage && <img style={{ maxWidth: '250px' }} src={selectedBreedImage} alt={selectedBreed} />}
      </div>
      
      );
}

export default Breedhelper;