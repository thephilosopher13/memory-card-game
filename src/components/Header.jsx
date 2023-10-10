import PropTypes from 'prop-types'

function Header({ score, bestScore }) {
    return (
        <header className='flex flex-row justify-between w-screen'>
            <h1 className='header ml-5'>Pokemon Memory Card Game</h1>
             <div><p className="text-2xl font-bold mr-5">Current Score: {score} Best Score: {bestScore}</p></div>
        </header>
    )
}

export default Header

Header.propTypes = {
    score: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired
  };
