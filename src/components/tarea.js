import React from "react";

// componentes bootstrap
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

export default function Tarea(props) {
  
  const {modal, setId, data} = props

  return (
    <Card className="col-12 mt-3 border border-1 border-dark">
      <Card.Body>
        <Card.Title className="text-info fw-bold">{data.titulo}</Card.Title>
        <Card.Text className="text-muted">{data.descripcion}</Card.Text>
        <Button
          className="m-2"
          size="sm"
          variant="warning"
          onClick={() => setId(data.id)}
        >
          <i className="far fa-edit"></i>
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => modal(data.id)}
        >
          <i class="far fa-trash-alt"></i>
        </Button>
      </Card.Body>
    </Card>
  );
}
