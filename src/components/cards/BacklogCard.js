import React, { useState } from 'react'
import { Card, Row, Container, Button, Modal, Form, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { deleteTask, editTask, toTodo } from '../store/kanban/action'
import EditIcon from '@material-ui/icons/Edit'

function BacklogCards(kanban) {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const dispatch = useDispatch()

    function onDelete(backlogObject){
        dispatch(deleteTask(backlogObject))
    }

    function onTodo(backlogObject){
        dispatch(toTodo(backlogObject))
    }

    // const prototype = () => {
    //     const autoIncrementId = kanban.backlog.id
    //     console.log(autoIncrementId);
    // }

    const handleEdit = (e) => {
        e.preventDefault()
        const formId = kanban.backlog.id
        if(formId){
            dispatch(editTask({
                id: formId,
                title: e.target[0].value,
                desc: e.target[1].value
            }))
        }
    }
    
    return (
        <div>
            <Container>
            <Row>
                <Col>
                <Card border="light" style={{ marginTop: '1rem', width: '15rem' }}>
                    <Card.Body style={{ padding: '1rem', boxShadow: '0px 0px 10px -5px #9e9e9e' }}>
                    <EditIcon onClick={handleShow} style={{position: 'absolute', marginLeft: '11.2rem', cursor: 'pointer'}} />
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                        <Modal.Title>Add Task</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleEdit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Task</Form.Label>
                                    <Form.Control placeholder={kanban.backlog.title} type="text" name="title"/>
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control placeholder={kanban.backlog.desc} type="text" name="desc"/>
                                </Form.Group>
                                <Button onClick={() => handleClose()} variant="primary" type="submit" value="Submit">
                                    Save Changes
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                        <Card.Title>
                            {kanban.backlog.title}
                        </Card.Title>
                        <Card.Text>
                            {kanban.backlog.desc}
                        </Card.Text>
                        <Card.Body className="text-center">
                            {/* <Button onClick={prototype}>click</Button> */}
                            <Button variant="danger" size='sm' onClick={() => onDelete(kanban.backlog.id)}>Delete</Button>
                            {' '}
                            <Button variant="success" size='sm' onClick={() => onTodo(kanban.backlog)}>Todo</Button>
                        </Card.Body>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default BacklogCards
