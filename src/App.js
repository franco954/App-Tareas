
import React from 'react';

import './styles/App.css';

// compoenentes boostrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


// componentes 
import Tablero from './components/tablero';


function App() {
  return (
    <Container className="app" fluid="md">
      <Row>
        <Tablero />
      </Row>
    </Container>
  );
}

export default App;
