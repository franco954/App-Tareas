


import React from 'react';
import { useState, useEffect } from 'react';

// componentes boostrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { db } from '../config/firebase'


export default function Formulario(props) {

    console.log(props)



    const valoresIniciales = {
        titulo: '',
        descripcion: '',
    }

    const [valores, setValores] = useState(valoresIniciales);

    const handleSubmit = e => {
        e.preventDefault()
        props.agregarTarea(valores)
        setValores({...valoresIniciales})
    }

    const handleChange = e => {
        console.log(e.target)
        const { name, value } = e.target;
        setValores({ ...valores, [name]: value })
        console.log(valores)
    }


    const obtenerMedianteId = async (id) =>{
        const doc = await db.collection('Tareas').doc(id).get();
        setValores({...doc.data()})
    }

    useEffect(()=>{
        console.log(props.idActual);
        if (props.idActual === ""){
            setValores({...valoresIniciales});
        }else{
            obtenerMedianteId(props.idActual); 
        }
    }, [props.idActual]);



    return (

        <Col className="col-12 col-sm-5 col-md-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="titulo" 
                    value={valores.titulo} 
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control 
                    type="text" 
                    name="descripcion" 
                    value={valores.descripcion} 
                    onChange={handleChange} />
                </Form.Group>
                <Button 
                type="submit"
                variant="primary" 
                className="mt-4" 
                size="lg" 
                block>
                    {props.idActual === '' ? 'Guardar' : 'Actualizar'}
                </Button>
            </Form>
        </Col>
    )
}