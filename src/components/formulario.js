


import React from 'react';
import { useState, useEffect } from 'react';

// componentes boostrap
import Form from 'react-bootstrap/Form'
import { FormText } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

// firebase
import { db } from '../config/firebase'

// react hook + yup
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



export default function Formulario(props) {

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required('El titulo de la tarea es obligatorio'),
        descripcion: Yup.string().required('La descripcion de la tarea es obligatoria')
      });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
        // e.preventDefault()
        props.agregarTarea(valores)
        setValores({...valoresIniciales})
    };


    
    console.log(props.setidActual)
    const valoresIniciales = {
        titulo: '',
        descripcion: '',
    }

    const [valores, setValores] = useState(valoresIniciales);

    const handleCancel = () =>{
        reset()
        props.setidActual('')
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mt-2">
                    <Form.Label className="fw-bolder text-muted">Titulo:</Form.Label>
                    <Form.Control 
                    className={`form-control bg-dark text-white ${errors.titulo ? 'is-invalid' : ''}`}
                    {...register('titulo')}
                    autoComplete="off"
                    // required
                    type="text" 
                    name="titulo" 
                    value={valores.titulo} 
                    onChange={handleChange} />
                    <FormText className="invalid-feedback">{errors.titulo ?.message}</FormText>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label className="fw-bolder text-muted">Descripción:</Form.Label>
                    <Form.Control 
                    className={`form-control bg-dark text-white ${errors.descripcion ? 'is-invalid' : ''}`}
                    {...register('descripcion')}
                    autoComplete="off"
                    // required
                    type="text" 
                    name="descripcion" 
                    value={valores.descripcion} 
                    onChange={handleChange} />
                    <FormText className="invalid-feedback">{errors.descripcion ?.message}</FormText>
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