import React, { useState } from 'react';

function PruebaComponente() {
  // Declarar una variable de estado para el color
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  // Función para manejar el cambio de color
  const handleColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  return (
    <div className="App">
      <h1>Cambiar Color de Fondo</h1>
      <input 
        type="color" 
        value={backgroundColor} 
        onChange={handleColorChange} 
      />
        <br />
      <div 
        style={{
          marginTop: '20px',
          width: '200px',
          height: '200px',
          backgroundColor: backgroundColor,
          border: '1px solid #000'
        }}
      >
        <p>Div con color de fondo</p>
      </div>
    </div>
  );
}

export default PruebaComponente;
