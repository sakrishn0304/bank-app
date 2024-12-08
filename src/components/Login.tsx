import { Button, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, Typography } from "@mui/material";
import "../styles/Login.scss";
import { useEffect, useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import React from "react";

const Login = () => {
    const navigate = useNavigate()
    const loggedInVal:string = window.localStorage.getItem("isLoggedIn")?? "false"
    const loggedUsers: string = window.localStorage.getItem('usersLogged')?? ""
    const [email, setEmail] = useState<string | never>('')
    const [showPassword, setShowPassword] = useState(false)
    const [loggedIn, setLoggedIn] = useState<boolean|string>(JSON.parse(loggedInVal) || false)
    const [error, setError] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [users, setUsers] = useState<[] | string | any>(loggedUsers || [])
    const handleLoginSubmit = () => {
        console.log('checklogin', email, users)
        users?.includes(email) ? 
            ( 
                setLoggedIn(true),
                setError(false)
            )
        : 
            (
                setError(true),
                setLoggedIn(false)
            )
        
    }

    const handleSignUpSubmit = () => {
        const currentUser = email
        setUsers([users, currentUser])
        console.log('usdasdas', users)
        window.localStorage.setItem("usersLogged", users)
        setIsSignUp(false)
        setError(false)
    }

    useEffect(() => {
        window.localStorage.setItem("usersLogged", users)
    }, [users])
    
    if(loggedIn) {
        navigate("/customer")
        window.localStorage.setItem("isLoggedIn", JSON.stringify(loggedIn))
    }

    return (
        <React.Fragment>
            <Paper className="login_outerDiv">
                {loggedIn ? 
                    <Typography variant="h5">You are logged in!!</Typography>
                :
                    
                <React.Fragment>
                    <Typography className="login_header">
                        {isSignUp ?  "SignUp" : "Login"}
                        <Typography variant="caption">{!isSignUp && "(For Existing Users)"}</Typography>
                    </Typography>
                    <Divider />
                    <Stack>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className="login_form">
                            <InputLabel>Email</InputLabel>
                            <OutlinedInput
                                type='email'
                                label="Password"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className="login_form">
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        {isSignUp ? 
                            <Button variant="contained" onClick={handleSignUpSubmit}>
                                SignUp
                            </Button>
                        :
                            <Button variant="contained" onClick={handleLoginSubmit}>
                                Login
                            </Button>
                        }
                        {error && <Typography variant="subtitle2" sx={{color:'red'}}>Invalid credentials</Typography>}
                        <Divider sx={{paddingTop:"10px"}} />
                        <Typography variant="subtitle1">
                            {isSignUp ? "Back to" : "Not an existing user ?" }
                            {isSignUp ? 
                                <Button variant="text" onClick={() => (setIsSignUp(false), setError(false))}>
                                    Login
                                </Button>
                            :
                                <Button variant="text" onClick={() => (setIsSignUp(true), setError(false))}>
                                    Sign Up
                                </Button>
                            }
                        </Typography>
                    </Stack>
                    </React.Fragment>  
                }
            </Paper>
        </React.Fragment>
    )
}

export default Login;