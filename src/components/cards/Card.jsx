import PropTypes from 'prop-types'

function Card ({ title, image, isClicked = 'false', onClick}) {
    return (
        <div className={isClicked ? 'isClicked' : ''} onClick={(e) => onClick(e)}>
            <img src={image} alt={title}></img>
            <div>{title}</div>
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