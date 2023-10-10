import CardGrid from "../cards/CardGrid";
import PropTypes from 'prop-types'
import { useState } from 'react';

function Gameboard({score, bestScore, onScoreChange}) {
    const [numCards, setNumCards] = useState(0);
    const [numbersArray, setNumbersArray] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [clickedCards, setClickedCards] = useState({});

    const [gameOver, setGameOver] = useState(false);

    const incrementScore = () => {
      const updatedScore = score + 1;
      onScoreChange(updatedScore);
    };
    

    function generateRandomNumbers(count) {
      
        const uniqueNumbers = new Set();
      
        while (uniqueNumbers.size < count) {
          const randomNumber = Math.floor(Math.random() * (1017 - 1 + 1)) + 1;
          if (!uniqueNumbers.has(randomNumber)) {
            uniqueNumbers.add(randomNumber);
          }
        }
      
        return Array.from(uniqueNumbers);
    }

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      }
      
    
    const handleNumCardsChange = (e) => {
      setNumCards(parseInt(e.target.value, 10));
    };

    const handleSubmit = () => {
        const randomNumbersArray = generateRandomNumbers(numCards);
    
        setNumbersArray(randomNumbersArray);
        setIsReady(true);

    };

    

    const handleCardClick = (title) => {
        if (!clickedCards[title]) {
          const newArray = shuffleArray(numbersArray)
          setClickedCards((prevClickedCards) => ({
            ...prevClickedCards,
            [title]: true,
          }));
          incrementScore()
          setNumbersArray(newArray);
        } else {
            setGameOver(true);
        }
      };

      const handleRestartGame = () => {
        // Reset the game state when restarting
        setClickedCards({});
        onScoreChange(0);
        setIsReady(false);
        setGameOver(false);
    };



      return (
        <div>
            {gameOver ? (
                <div className='mt-5'>
                    <h1 className="text-4xl font-bold">Game Over!</h1>
                    <button className="text-2xl bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded mt-4 self-center" onClick={handleRestartGame}>Return to Title Screen</button>
                </div>
            ) : (
                
                isReady ? (
                    <div className='mt-5'>
                      <CardGrid
                        numbersArray={numbersArray}
                        onClick={handleCardClick}
                        clickedCards={clickedCards}
                      />
                    </div>
                ) : (
                    <div className="flex flex-col align-items-center">
                        <label className="mt-4 text-3xl" htmlFor="numCards">Number of Cards:</label>
                        <input
                            type="number"
                            id="numCards"
                            className='self-center mt-4 text-2xl'
                            value={numCards}
                            onChange={handleNumCardsChange}
                            min={1}
                            max={36} // Adjust the maximum as needed
                        />
                        <button className="text-2xl bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 border-b-4 border-slate-700 hover:border-slate-500 rounded mt-4 self-center" onClick={handleSubmit}>Submit</button>
                    </div>
                )
            )}
        </div>
    );
}

export default Gameboard

Gameboard.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
  onScoreChange: PropTypes.func.isRequired
};
