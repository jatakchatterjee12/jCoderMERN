import React, { useState, useEffect }  from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles';
import Input from './Input';
import {signup,signin} from '../../actions/auth';

const initialState = { firstName:'',lastName:'',email:'', password:'', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    //  sign up switchable
    const [isSignup, setIsSignup] = useState(false);
    // const isSignup = true;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignup){
            dispatch(signup(formData, navigate));
        }else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res)=> {
        const result = res?.profileObj; // cannot get property profileObj of undefined, with this ?. we get undefined
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result,token}})

            navigate('/')
        }catch(error){
            console.log(error);
        }
    }


    const googleFailure = (error)=> {
        console.log(error);
        console.log("Google Sign In was unsuccessfull. Try Again Later")
    }
    // "Not a valid origin for the client: http://localhost:3000 has not been 
    // registered for client ID 382694204868-2b7iuqj62u5dqveelnbp8tmdls1ov1r7.apps.googleusercontent.com. 
    // Please go to https://console.developers.google.com/ and register this origin for your project's client ID."
    // error: "idpiframe_initialization_failed"
    
  
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId:"382694204868-2b7iuqj62u5dqveelnbp8tmdls1ov1r7.apps.googleusercontent.com",
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);
  


    return (
        <Container component="main" maxwidth="s">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" >{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="382694204868-2b7iuqj62u5dqveelnbp8tmdls1ov1r7.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In 

                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy ="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
