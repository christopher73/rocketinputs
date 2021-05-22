import {React, useState, useContext} from 'react'
import { Grid, Paper, Avatar, TextField, FormControlLabel, Checkbox, Button, Typography, Link, makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import loginImage from "../../assets/images/login.svg"; 

import axios from '../../config/axios'
import {RocketContext} from '../../context/rocket'

const useStyles = makeStyles((theme) => ({
  imageTop: {
    width: theme.spacing(30),
    height: theme.spacing(10) 
  },
  avatarStyle:{
    backgroundColor:'#1bbd7e',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  btnLogin:{
    margin:'8px 0px'
  }})
)

const Login = (props) => {
  const PATH = '/api/signIn';

  const [, saveAuth] = useContext(RocketContext);
  // const [form, setForm] = useState({'email':'task@localhost.com','password':'qwerty123'})
  const [form, setForm] = useState({})
  const [error, setError] = useState({})

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value,})}
  const handleChecked = (e) => { setForm({ ...form, [e.target.name]: e.target.checked }) }
  const handleSubmit = async e => {
    try{
      const response = await axios.post(PATH, form);
      if (response.data && response.data.success){
        const user  = response.data.user;
        const token = response.headers['authorization'].split(' ')[1];
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(user))
        saveAuth({token, user})
        props.history.push('dashboard');
      }
    }catch(err){
      console.log(err.response.data.message)
      setError({...error,[err.response.data.message.title]:err.response.data.message.details})
    }
  }

  const classes = useStyles();

  return (
    <Grid style={{display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100%" }}>
      <Paper elevation={10} style={{padding:30, width:"33%"}}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
          <img className={classes.imageTop} alt="login" src={loginImage} />{" "}
          </Avatar>
          <Typography color="primary" component="h6" variant="h6" > SIGN IN </Typography>
          <hr />
          <Typography color="textSecondary" component="p" variant="subtitle1"> Log in with your data that you entered during your registration.</Typography>
          <hr />
        </Grid>
        <TextField 
          autoFocus variant="outlined" margin="normal" fullWidth 
          required type="email" error={ error['email'] ? true : false } helperText={error['email']}
          label="Email" name="email" placeholder="Enter Email"  
          onChange={e=>handleChange(e)} 
        />
        <TextField 
          variant="outlined" margin="normal" fullWidth 
          required type="password" error={ error['password'] ? true : false } helperText={error['password']}
          label="Password" name="password" placeholder="Enter Password" 
          onChange={e=>handleChange(e)} 
        />
        {/* <FormControlLabel 
          control={ <Checkbox name="persist" color="primary" /> }
          label="Remember me"
          onChange={e=>handleChecked(e)}
        /> */}
        <Button  type="submit" color="primary" variant="contained" size="large" className={classes.btnLogin} fullWidth onClick={handleSubmit}>Sign In</Button>
        <Typography> Do you want to reset your password?<Link href="/forgot-password" >Forgot password?</Link></Typography>
        <Typography> Do you have an account?<Link href="/register" >Sign Up?</Link></Typography>
      </Paper>
    </Grid>
  )
}

export default withRouter(Login)
