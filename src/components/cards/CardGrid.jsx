import { useState, useEffect } from 'react';
import Card from "./Card";
import PropTypes from 'prop-types'

function CardGrid({ numbersArray, onClick, clickedCards }){
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

      Promise.all(
        numbersArray.map((number) => {
          const apiUrl = `${baseUrl}${number}`;
          return fetch(apiUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              return { name: data.name, image: data.sprites.front_default };
            })
            .catch((error) => {
              return { error: error.message };
            });
        })
      )
        .then((data) => {
          setPokemonData(data);
          setLoading(false); 
        })
        .catch((error) => {
          setError(error); 
          setLoading(false); 
        });
    }, [numbersArray]); 
    
    let gridClass = 'grid-cols-3 grid-rows-3';
    if (numbersArray.length > 9 && numbersArray.length < 16) {
      gridClass = 'grid-cols-4 grid-rows-4';
    }
    if (numbersArray.length >= 16 && numbersArray.length < 25) {
      gridClass = 'grid-cols-5 grid-rows-5' ;
    }
    if (numbersArray.length >= 25 ) {
      gridClass = 'grid-cols-6 grid-rows-6';
    }
  
    return (
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className={`grid gap-2 grid-flow-row ${gridClass}`}>
            {pokemonData.map((pokemon, index) => (
              <Card
                key={index}
                title={pokemon.name}
                image={pokemon.image}
                isClicked={clickedCards[pokemon.name] || false}
                onClick={() => onClick(pokemon.name)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  CardGrid.propTypes = {
    numbersArray: PropTypes.arrayOf(PropTypes.number).isRequired,
    onClick: PropTypes.func.isRequired,
    clickedCards: PropTypes.object.isRequired
  };

export default CardGrid