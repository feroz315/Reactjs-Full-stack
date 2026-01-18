import React from 'react';

const Cardproduct = ({ image, title, price, category, description, buttonText, onButtonClick }) => {
  
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    maxheight: '400px',
    margin: '16px',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  const titleStyle = {
    fontSize: '1.2em',
    margin: '12px 0',
  };

  const descriptionStyle = {
    fontSize: '1.0em',
    color: '#666',
    marginBottom: '16px',
  };

  const categoryStyle = {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '10px',
  };

  const priceStyle = {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '12px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={cardStyle}>
      {image && <img src={image} alt={title} style={imageStyle} />}
      <h3 style={titleStyle}>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
       <p style={categoryStyle}>{category}</p>
        <p style={priceStyle}>{price}</p>
     
      {buttonText && (
        <button style={buttonStyle} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Cardproduct;