


import React, { useState } from 'react';
import { useEffect } from 'react';

// db firebase

import { db } from '../config/firebase.js'

// componentes
import Formulario from './formulario.js';

// componentes bootstrap
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';


export default function Tablero() {

    const [tareas, setTareas] = useState([])

    const agregarTarea =  async (valores) =>{    
        await db.collection('Tareas').doc().set(valores);
    }


    const obtenerTareas = async () => {
        db.collection('Tareas').onSnapshot((querySnapshot) =>{
            const docs = [];
            querySnapshot.forEach((doc)=>{
                docs.push({...doc.data(), id:doc.id});
            });
            setTareas(docs)
        });
    };

    useEffect(()=>{
        obtenerTareas();
    },[]);


        return (
            <>
                <Formulario {...{agregarTarea, obtenerTareas}}/>
                <Col className="col-12 col-sm-6 col-md-8 d-flex flex-wrap justify-content-center mt-4">
                    {
                        tareas.map(tarea => (
                            <Card className="col-12 mt-3">
                            <Card.Body>
                                <Card.Title>{tarea.titulo} {tarea.urgencia}</Card.Title>
                                <Card.Text>
                                    {tarea.descripcion}
                                </Card.Text>
                                <Button size="sm" className="m-2" variant="warning"><i class="far fa-edit"></i></Button>
                                <Button size="sm" variant="danger"><i class="far fa-trash-alt"></i></Button>
                            </Card.Body>
                        </Card>
                        ))}            
                </Col>
            </>
        )

}








