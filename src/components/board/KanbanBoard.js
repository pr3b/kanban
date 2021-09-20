import React, { useState } from 'react'
import { Card, Row, Container, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import BacklogCards from '../cards/BacklogCard';
import TodoCard from '../cards/TodoCard';
import ProgressCard from '../cards/ProgressCard';
import FinishedCard from '../cards/FinishedCard';
import { addTask, logout } from '../store/kanban/action';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Avatar, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './Scroll.css'

function KanbanBoard() {
    
    const kanbanBacklog = useSelector((state) => state.kanban.backlog)
    const kanbanTodo = useSelector((state) => state.kanban.todo)
    const kanbanProgress = useSelector((state) => state.kanban.progress)
    const kanbanFinished = useSelector((state) => state.kanban.finished)
    const users = useSelector((state) => state.kanban.username)
    // const valid = useSelector((state) => state.kanban.validation)
    

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const dispatch = useDispatch()
    
    const useStyles = makeStyles((theme) => ({
        avatar: {
                margin: theme.spacing(1),
                backgroundcColor: '#0093E9',
                backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'
        },
        color: {
                backgroundColor: '#0093E9',
                backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'
        },
        root: {
            flexGrow: 1,
          },
          menuButton: {
            marginRight: theme.spacing(2),
          },
          title: {
            flexGrow: 1,
          },
    }));
    
    const classes = useStyles();
    const [auth, setAuth] = useState(true);
      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
      const history = useHistory()
      
      const handleMenu = (e) => {
          setAnchorEl(e.currentTarget)
        };
        
        const handleCloseSecond = () => {
            setAnchorEl(null);
        };
        
        function handleLogout(event){
            dispatch(logout(event))
        }
        
        // const handleValidation = (e) => {
        //     if(e.target.value !== ""){
        //         alert("Valid")
        //     }
        // }

        const handleSubmit = (e) => {
            e.preventDefault()
            const autoIncrementId = kanbanBacklog.length
            dispatch(addTask({id: autoIncrementId + 1,
                title: e.target[0].value, 
                desc: e.target[1].value}))   
        }
        
    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Kanban Board
                    </Typography>
                    {auth && (
                        <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit">
                            <Avatar className={classes.avatar}>{users.charAt(0).toUpperCase()}</Avatar>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleCloseSecond}
                        >
                            <MenuItem onClick={handleShow}>Add Task</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                        </div>
                    )}
                    </Toolbar>
                </AppBar>
            </div>
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Task</Form.Label>
                            <Form.Control type="text" name="title" placeholder="What are you gonna do today?"/>
                            <Form.Text className="text-muted">
                            Let's get productive today!
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-5">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="desc" placeholder="Description"/>
                        </Form.Group>
                        {/* <Button onClick={handleValidation}>click</Button> */}
                        <Button onClick={handleClose} variant="primary" type="submit" value="Submit">
                            Add to Backlog
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Container style={{ marginTop: '2rem' }}>
                <Row style={{ justifyContent: 'center'}}>

                    <Card style={{ width: '16rem', border: 'none', alignItems: 'center'}}>
                    <Card.Header style={{backgroundColor: '#f30', color: '#fff'}}>Backlog</Card.Header>
                    {kanbanBacklog.map((dataBacklog, index) => {
                        return <BacklogCards key={index} backlog={dataBacklog} />
                    })}
                    </Card>

                    <Card style={{ width: '16rem', border: 'none', alignItems: 'center'}}>
                    <Card.Header style={{backgroundColor: '#f90', color: '#fff'}}>Todo</Card.Header>
                    {kanbanTodo.map((dataTodo, index) => {
                        return <TodoCard key={index} todo={dataTodo} />
                    })}
                    </Card>

                    <Card style={{ width: '16rem', border: 'none', alignItems: 'center'}}>
                    <Card.Header style={{backgroundColor: '#39f', color: '#fff'}}>Progress</Card.Header>
                    {kanbanProgress.map((dataProgress, index) => {
                        return <ProgressCard key={index} progress={dataProgress} />
                    })}
                    </Card>

                    <Card style={{ width: '16rem', border: 'none', alignItems: 'center'}}>
                    <Card.Header style={{backgroundColor: '#0c6', color: '#fff'}}>Finished</Card.Header>
                    {kanbanFinished.map((dataFinished, index) => {
                        return <FinishedCard key={index} finished={dataFinished} />
                    })}
                    </Card>
                    
                </Row>
            </Container>
        </>
    )
}

export default KanbanBoard
