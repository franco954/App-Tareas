
import React from 'react';


// compoenentes boostrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


// componentes 
import Tablero from './components/tablero';

//styles
import './styles/styles.css';


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
