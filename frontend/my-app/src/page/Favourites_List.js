import React, { useState } from 'react';

const FavouritesCat = () => {
  const [favouritesCat, setFavouritesCat] = useState(JSON.parse(localStorage.getItem('favouritesCat')) || []);

  const handleDelete = (id) => {
    const updatedList = favouritesCat.filter(cat => cat.id !== id);
    localStorage.setItem('favouritesCat', JSON.stringify(updatedList));
    setFavouritesCat(updatedList);
  }

  return (
    <div>
      <h1>Favourite Cats</h1>
      {favouritesCat.length === 0 ? (
        <p>You have no favourite cats yet.</p>
      ) : (
        <ul>
          {favouritesCat.map(cat => (
            <li key={cat.id}>
              <table>
                <thead>
                  <tr>
                    <th><img src={cat.picture} alt="cat" style={{ maxWidth: '200px' }} /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>No:</td><td>{cat.id}</td></tr>
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

export default FavouritesCat;