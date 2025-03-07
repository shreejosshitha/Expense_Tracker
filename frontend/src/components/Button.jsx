import React from 'react';

const Button = ({ text, onClick, type = 'button', style }) => {
  return (
    <button onClick={onClick} type={type} style={{ ...styles.button, ...style }}>
      {text}
    </button>
  );
};

const styles = {
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default Button;
