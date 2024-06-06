import "@cloudscape-design/global-styles/index.css";
import React, { useState, useEffect } from 'react';
import './App.css';

type Item = {
  '@iot.id': number;
  name: string;
}

type Data = {
  value: Item[],
}

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      fetch('https://sensors.bgs.ac.uk/FROST-Server/v1.1/FeaturesOfInterest')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              setData(data);
              setLoading(false);
          })
          .catch(error => {
              setError(error.message);
              setLoading(false);
          });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data && data.value.length > 0 ? (
        <ul>
          {data.value.map((item) => (
            <li key={item['@iot.id']}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
}

export default App;
