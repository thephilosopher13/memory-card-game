import Header from './components/Header'
import Footer from './components/Footer'
import Gameboard from './components/gameboard/Gameboard'
import { useState } from 'react';
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const handleScoreChange = (newScore) => {
    setScore(newScore);
    if (newScore > bestScore) {
      setBestScore(newScore);
    }
  };

  return (
    <>
      <Header  score={score} bestScore={bestScore}/>
      <Gameboard score={score} onScoreChange={handleScoreChange} bestScore={bestScore} />
      <Footer />
    </>
  )
}

export default App
