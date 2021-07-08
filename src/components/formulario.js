


import React from 'react';
import { useState } from 'react';

// componentes boostrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'


export default function Formulario(props) {

    console.log(props)



    const valoresIniciales = {
        titulo: '',
        descripcion: '',
        urgencia: ''
    }

    const [valores, setValores] = useState(valoresIniciales);

    const handleSubmit = e => {
        e.preventDefault()
        props.agregarTarea(valores)
        setValores({...valoresIniciales})
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setValores({ ...valores, [name]: value })
    }



    return (

        <Col className="col-12 col-sm-5 col-md-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control type="text" name="Titulo" value={valores.titulo} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="Descripcion" value={valores.descripcion} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Nivel de urgencia: </Form.Label>
                    <Form.Control as="select" name="Urgencia" value={valores.urgencia} onChange={handleChange} custom>
                        <option>Poco</option>
                        <option>Normal</option>
                        <option>Mucho</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" className="mt-4" size="lg" block>
                    Agregar
                </Button>
            </Form>
        </Col>
    )
}