import React from 'react'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { toBacklog, toProgress } from '../store/kanban/action'

function TodoCard(kanban) {
    // const todoObject = useSelector((state)s => state.kanban.todo)
    const dispatch = useDispatch()

    function onProgress(todoObject){
        dispatch(toProgress(todoObject))
    }

    function backToBacklog(todoObject){
        dispatch(toBacklog(todoObject))
    }

    return (
        <div>
            <Container>
            <Row>
                <Col>
                <Card border="light" style={{ marginTop: '1rem', width: '15rem' }}>
                    <Card.Body style={{ padding: '1rem', boxShadow: '0px 0px 10px -5px #9e9e9e' }}>
                        <Card.Title>
                            {kanban.todo.title}
                        </Card.Title>
                        <Card.Text>
                            {kanban.todo.desc}
                        </Card.Text>
                        <Card.Body className="text-center">
                            <Button variant="danger" size='sm' onClick={() => backToBacklog(kanban.todo)}>Backlog</Button>
                            {' '}
                            <Button variant="success" size='sm' onClick={() => onProgress(kanban.todo)}>Doing</Button>
                        </Card.Body>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default TodoCard
