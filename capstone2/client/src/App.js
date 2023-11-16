import React, { useState, useEffect } from 'react';
import LoginButton from './components/LoginButton';
import './components/artgallery.css';
import './components/LoginButton.css';

const App = () => {
  const [isLoggedIn] = useState(false);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientId = process.env.REACT_APP_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

        const tokenResponse = await fetch('https://api.artsy.net/api/tokens/xapp_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
          }),
        });

        if (!tokenResponse.ok) {
          throw new Error('Failed to authenticate.');
        }

        const tokenData = await tokenResponse.json();
        const token = tokenData.token;

        const artResponse = await fetch('https://api.artsy.net/api/artworks?size=200', {
          headers: {
            'X-Xapp-Token': token,
          },
        });

        if (!artResponse.ok) {
          throw new Error('Failed to fetch artwork data.');
        }

        const data = await artResponse.json();
        const uniqueArtworks = data._embedded.artworks.reduce((unique, artwork) => {
          return unique.some((a) => a.id === artwork.id) ? unique : [...unique, artwork];
        }, []);

        setArtworks(uniqueArtworks);
      } catch (error) {
        console.error('Error fetching art data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Art Gallery</h1>
          <div className="art-container-horizontal">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="art-piece-horizontal">
                <img src={artwork._links.thumbnail.href} alt={artwork.title} />
                <p>{artwork.title}</p>
                {/* Add more details or styles as needed */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default App;




