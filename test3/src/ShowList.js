// Using API : https://api.tvmaze.com/search/shows?q=all

//Listing movie titles, images and other details from api

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all'); // Fetching data of all shows
        setShows(response.data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, []);

  return (
    <div className="container mt-4 bg-black text-white">
      <div className="row justify-content-center">
        {shows.map((show) => (
          <div key={show.show.id} className="col-md-4 mb-4">
            <div className="card bg-dark text-white">
              {show.show.image && show.show.image.medium && (
                <img
                  src={show.show.image.medium}
                  className="card-img-top"
                  alt={show.show.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}  
                /> // show image
              )}
              <div className="card-body">
                <h5 className="card-title">{show.show.name}</h5>    
                <p className="card-text">
                  <strong>Genre:</strong> {show.show.genres.join(', ')} 
                  <br />
                  <strong>Rating:</strong> {show.show.rating && show.show.rating.average}
                </p>
                <p className="btn btn-danger">
                  Show Details
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowList;

