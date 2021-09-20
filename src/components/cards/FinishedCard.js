import React from 'react'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { deleteTask, toProgress } from '../store/kanban/action'

function FinishedCard(kanban){
    // const finishedObject = useSelector((state) => state.kanban.finished)
    const dispatch = useDispatch()

    function onDelete(finishedObject) {
        dispatch(deleteTask(finishedObject))
    }

    function onProgress(finishedObject){
        dispatch(toProgress(finishedObject))
    }

    return (
        <div>
            <Container>
            <Row>
                <Col>
                <Card border="light" style={{ marginTop: '1rem', width: '15rem' }}>
                    <Card.Body style={{ padding: '1rem', boxShadow: '0px 0px 10px -5px #9e9e9e' }}>
                        <Card.Title>
                            {kanban.finished.title}
                        </Card.Title>
                        <Card.Text>
                            {kanban.finished.desc}
                        </Card.Text>
                        <Card.Body className="text-center">
                            <Button variant="danger" size='sm' onClick={() => onProgress(kanban.finished)}>Progress</Button>
                            {' '}
                            <Button variant="success" size='sm' onClick={() => onDelete(kanban.finished.id)}>Clear</Button>
                        </Card.Body>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default FinishedCard
