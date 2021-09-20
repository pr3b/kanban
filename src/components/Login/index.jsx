import { Paper, TextField, Button, withStyles, Typography, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../store/kanban/action';
import { useHistory } from 'react-router';

const Centered = (props) => (
    <div {...props} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - (64px + 24px))'}}/>
);

const CustomPaper = withStyles({
    root: {
        height: 300, 
        width: 400,
        padding: 24, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-evenly',
    }
})(Paper)

const LoginContainer = (props) => (
    <div {...props} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} />
)

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '350px',
      },
    MuiInputLabel: {
        outlined: {
          '&$shrink': {
             transform: 'translate(0px, 0px) scale(0.75)',
            },
        },
      },
    },
  }));


export default function Login() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.kanban.isLoggedIn)
    const classes = useStyles();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }
    
    const history = useHistory()
    
    async function buttonLogin(){
        const item = { username, password }
        let result = await fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(item)
        })
        // localStorage.setItem("user-info", JSON.stringify(result.json()))
        history.push("/KanbanBoard")
    }

    return (
        isLoggedIn ? (<Redirect to="/" />)
        :
        (
        <Centered>
            <LoginContainer>
                <CustomPaper variant='outlined'>
                    <Typography variant='h6'>Login</Typography>
                    <form onSubmit={handleSubmit} className={classes.root}>
                        <TextField onChange={(e) => setUsername(e.target.value)} fullWidth id="outlined-basic" variant='filled' label='username' />
                        <TextField onChange={(e) => setPassword(e.target.value)} fullWidth variant='filled' label='password' type='password' />
                        <Button onClick={buttonLogin} fullWidth variant='contained' color='secondary' type='submit'>Login</Button>
                    </form>
                </CustomPaper>
            </LoginContainer>
        </Centered>
        )
    )
}
