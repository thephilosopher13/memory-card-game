import CardGrid from "../cards/CardGrid";
import { useState } from 'react';

function Gameboard() {
    const [numCards, setNumCards] = useState(0);
    const [numbersArray, setNumbersArray] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [clickedCards, setClickedCards] = useState({});
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [gameOver, setGameOver] = useState(false);

    const incrementScore = () => {
        const updatedScore = score + 1;
        if (updatedScore > bestScore) {
            setBestScore(updatedScore);
          }
          setScore(updatedScore);
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
        setScore(0);
        setIsReady(false);
        setGameOver(false);
    };



      return (
        <div>
            {gameOver ? (
                <div>
                    <h1>Game Over!</h1>
                    <p>Best Score: {bestScore}</p>
                    <button onClick={handleRestartGame}>Return to Title Screen</button>
                </div>
            ) : (
                
                isReady ? (
                    <div>
                      <p>Current Score: {score}</p>
                      <p>Best Score: {bestScore}</p>
                      <CardGrid
                        numbersArray={numbersArray}
                        onClick={handleCardClick}
                        clickedCards={clickedCards}
                      />
                    </div>
                ) : (
                    <div>
                        <label htmlFor="numCards">Number of Cards:</label>
                        <input
                            type="number"
                            id="numCards"
                            value={numCards}
                            onChange={handleNumCardsChange}
                            min={1}
                            max={36} // Adjust the maximum as needed
                        />
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                )
            )}
        </div>
    );
}

export default Gameboard