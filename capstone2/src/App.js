import React, { useState, useEffect } from 'react';
import './components/artgallery.css';

function App() {
  const [artData, setArtData] = useState([]);

  useEffect(() => {
    fetch('https://api.artsy.net/api/tokens/xapp_token?client_id=b067be3107168262fb6c&client_secret=2729ccad72104a7fdfedc54713bd8b16', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        fetch('https://api.artsy.net/api/artworks?size=40', { // Requesting 40 art pieces
          headers: {
            'X-Xapp-Token': data.token
          }
        })
          .then(response => response.json())
          .then(data => setArtData(data._embedded.artworks))
          .catch(error => console.error('Error fetching art data:', error));
      })
      .catch(error => console.error('Error obtaining Artsy API token:', error));
  }, []);

  return (
    <div className="App">
      <h1>Art Gallery</h1>
      <div className="art-container-horizontal">
        {artData.map(artPiece => (
          <div key={artPiece.id} className="art-piece-horizontal">
            <img src={artPiece._links.thumbnail.href} alt={artPiece.title} />
            <p>{artPiece.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;






