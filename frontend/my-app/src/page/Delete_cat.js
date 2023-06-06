import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteCat = () => {
  const [cats, setCats] = useState([]);
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

  // Delete the selected cat from the backend
  const deleteCat = () => {
    axios.delete(`http://localhost:3001/cats/delete/${selectedCatId}`)
      .then(response => {
        // Remove the deleted cat from the list of cats
        const updatedCats = cats.filter(cat => cat.id !== selectedCatId);
        setCats(updatedCats);
        setSelectedCatId(null);
      })
      .catch(error => {
        console.error('Error deleting cat: ' + error.message);
      });
  };

  // Handle the cat selection event
  const handleCatSelection = (cat) => {
    setSelectedCatId(cat.id);
  };

  return (
    <div>
      <h1>Delete a cat</h1>
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
            <>
              <p>Are you sure you want to delete this cat?</p>
              <div className="d-grid gap-2">
                <button type="button" className="btn btn-danger" onClick={deleteCat}>
                  Delete Cat
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedCatId(null)}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteCat;