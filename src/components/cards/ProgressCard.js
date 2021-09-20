import React from 'react'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { toFinished, toTodo } from '../store/kanban/action'

function ProgressCard(kanban) {
    // const progressObject = useSelector((state) => state.kanban.progress)
    const dispatch = useDispatch()

    function onTodo(progressObject){
        dispatch(toTodo(progressObject))
    }

    function onFinished(progressObject){
        dispatch(toFinished(progressObject))
    }

    return (
        <div>
            <Container>
            <Row>
                <Col>
                <Card border="light" style={{ marginTop: '1rem', width: '15rem' }}>
                    <Card.Body style={{ padding: '1rem', boxShadow: '0px 0px 10px -5px #9e9e9e' }}>
                        <Card.Title>
                            {kanban.progress.title}
                        </Card.Title>
                        <Card.Text>
                            {kanban.progress.desc}
                        </Card.Text>
                        <Card.Body className="text-center">
                            <Button variant="danger" size='sm' onClick={() => onTodo(kanban.progress)}>Todo</Button>
                            {' '}
                            <Button variant="success" size='sm' onClick={() => onFinished(kanban.progress)}>Finished</Button>
                        </Card.Body>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default ProgressCard
