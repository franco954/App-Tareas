


import React from 'react';
import { useState, useEffect } from 'react';

// componentes boostrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { db } from '../config/firebase'


export default function Formulario(props) {

    console.log(props.setidActual)



    const valoresIniciales = {
        titulo: '',
        descripcion: '',
    }

    const [valores, setValores] = useState(valoresIniciales);

    const handleCancel = () =>{
        props.setidActual('')
    }

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

        <Col className="col-12 col-md-4 mt-md-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-2">
                    <Form.Label className="fw-bolder text-muted">Titulo:</Form.Label>
                    <Form.Control 
                    className="bg-dark text-white"
                    autoComplete="off"
                    required
                    type="text" 
                    name="titulo" 
                    value={valores.titulo} 
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label className="fw-bolder text-muted">Descripción:</Form.Label>
                    <Form.Control 
                    className="bg-dark text-white"
                    autoComplete="off"
                    required
                    type="text" 
                    name="descripcion" 
                    value={valores.descripcion} 
                    onChange={handleChange} />
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <Button 
                    type="submit"
                    variant="info" 
                    className="m-3" 
                    size="lg" 
                    block>
                        {props.idActual === '' ? 'Guardar' : 'Actualizar'}
                    </Button>
                    {
                        props.idActual &&
                            <Button 
                            variant="danger" 
                            className="m-3" 
                            size="lg" 
                            onClick={handleCancel}
                            block>
                                Cancelar
                            </Button>
                    }
                </Form.Group>
            </Form>
        </Col>
    )
}