import PropTypes from 'prop-types'

function Card ({ title, image, isClicked = 'false', onClick}) {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

    return (
        <div className={isClicked ? 'bg-yellow-600 flex flex-col isClicked max-w-sm rounded shadow-lg' : 'flex flex-col max-w-sm rounded overflow-hidden shadow-lg bg-yellow-600'} onClick={(e) => onClick(e)}>
            <img className='align-self-center' src={image} alt={title}></img>
            <div className="font-bold text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-2">{capitalizedTitle}</div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isClicked: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  };
  

export default Card 