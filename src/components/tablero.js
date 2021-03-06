


import React, { useState } from 'react';
import { useEffect } from 'react';

// db firebase
import { db } from '../config/firebase.js'

// componentes
import Formulario from './formulario.js';

// componentes bootstrap
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

// tarea
import Tarea from './tarea.js'


export default function Tablero() {

    const [tareas, setTareas] = useState([])
    const [idActual, setidActual] = useState('')
    const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(true);

    const [idEliminar, setIdEliminar] = useState()
    const handleDelete = (id) => { setIdEliminar(id) }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const agregarTarea = async (valores) => {
        try {
            if (idActual == '') {
                await db.collection('Tareas').doc().set(valores);
            }
            else {
                await db.collection('Tareas').doc(idActual).update(valores);
                setidActual('')
            }
        } catch (error) {
            console.error(error)
        }
    }


    const mostrarModal = (id) => {
        handleShow()
        handleDelete(id)
    };


    const eliminarTarea = () => {
        db.collection("Tareas").doc(idEliminar).delete();
        handleClose()
    };


    const obtenerTareas = async () => {
        db.collection('Tareas').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setTareas(docs)
            setLoading(false)
        });
    };

    useEffect(() => {
        obtenerTareas();
    }, []);


    return (
        <>
            <>
                <Modal
                    animation={false}
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        ??Estas seguro que quieres eliminar esta tarea?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="danger" onClick={eliminarTarea}>Eliminar</Button>
                    </Modal.Footer>
                </Modal>
            </>
            <h2 className="text-center text-info mt-4 fw-bold">CRUD TAREAS</h2>
            <Formulario {...{ agregarTarea, obtenerTareas, idActual, setidActual }} />
            <Col
                className="col-12 col-md-8 d-flex flex-wrap justify-content-center mt-4 "
                key={tareas.id}>
                {
                    loading ?
                        <div className="col-12 mt-5 text-center">
                            <Spinner animation="border" role="status" variant="info">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                        :
                        tareas.map(tarea => (
                            <Tarea data={tarea} modal={mostrarModal} setId={setidActual}/>
                        ))}
            </Col>
        </>
    )

}








