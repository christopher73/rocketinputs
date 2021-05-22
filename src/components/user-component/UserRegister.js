import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import loginImage from "../../assets/images/login.svg"; 
import axios from '../../config/axios'

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

const UserRegister = props => {
  const classes = useStyles();
  const PATH = '/api/signUp';

  const [form, setForm] = useState({'userName':'', 'email':'','password':'','firstName':'','lastName':'','dni':'','rePassword':''})
  const [error, setError] = useState({})

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value});  }
  const handleSubmit = async e => {
    let formIsValid = true;
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var errors = {}
    if (!pattern.test(form["email"])) {
      formIsValid = false;
      errors['email'] = "Please enter valid email address.";
    }
    if(!form["userName"]){
      formIsValid = false;
      errors['userName'] = "Cannot be empty";
    }
    if(!form["lastName"]){
      formIsValid = false;
      errors['lastName'] = "Cannot be empty";
    }
    if(!form["firstName"]){
      formIsValid = false;
      errors['firstName'] = "Cannot be empty";
    }
    if(!form["dni"]){
      formIsValid = false;
      errors['dni'] = "Cannot be empty";
    }
    if(!form["password"]){
      formIsValid = false;
      errors['password'] = "Cannot be empty";
    }
    if(!form["rePassword"]){
      formIsValid = false;
      errors['rePassword'] = "Cannot be empty";
    }
    if(form["password"] !== form["rePassword"]){
      formIsValid = false;
      errors['rePassword'] = "Password no math"; 
    }
    if (formIsValid) {
      try{
        const response = await axios.post(PATH, form);
        if (response.data && response.data.success){
          Swal.fire({
            title: 'User created!',
            text: 'Go to SIGN IN',
            icon: 'success',
            confirmButtonText: 'GO'
          })
          props.history.push('/');
        }
      }catch(err){
        setError({...error,[err.response.data.message.title]:err.response.data.message.details})
      }
    }else{
      setError(errors);
    }
  }
  
  return (
    <Grid style={{display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100%" }}>
      <Paper elevation={10} style={{padding:30, width:"33%"}}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
          <img className={classes.imageTop} alt="login" src={loginImage} />{" "}
          </Avatar>
          <Typography color="primary" component="h6" variant="h6" > REGISTER </Typography>
          <hr />
        </Grid>
        <TextField 
          autoFocus variant="outlined" margin="normal" fullWidth 
          required error={ error['userName'] ? true : false } helperText={error['userName']}
          label="User Name" name="userName" placeholder="Enter your user name"  
          onChange={e=>handleChange(e)} 
        />
        <TextField 
          autoFocus variant="outlined" margin="normal" fullWidth 
          required type="email" error={ error['email'] ? true : false } helperText={error['email']}
          label="Email Address" name="email" placeholder="Enter email address" 
          onChange={e=>handleChange(e)} 
        />
        <hr/>
        <TextField 
          autoFocus variant="outlined" margin="normal" fullWidth 
          required error={ error['firstName'] ? true : false } helperText={error['firstName']}
          label="First Name" name="firstName" placeholder="Enter your first name"  
          onChange={e=>handleChange(e)} 
        />
        <TextField 
          autoFocus variant="outlined" margin="normal" fullWidth 
          required error={ error['lastName'] ? true : false } helperText={error['lastName']}
          label="Last Name" name="lastName" placeholder="Enter your last name"  
          onChange={e=>handleChange(e)} 
        />
        <TextField 
          autoFocus variant="outlined" margin="normal" fullWidth 
          required error={ error['dni'] ? true : false } helperText={error['dni']}
          label="D.N.I" name="dni" placeholder="Enter document national identification"  
          onChange={e=>handleChange(e)} 
        />
        <hr/>
        <TextField 
          variant="outlined" margin="normal" fullWidth 
          required type="password" error={ error['password'] ? true : false } helperText={error['password']}
          label="Password" name="password" placeholder="Enter your password" onChange={e=>handleChange(e)} 
        />
        <TextField 
          variant="outlined" margin="normal" fullWidth 
          required type="password" error={ error['rePassword'] ? true : false } helperText={error['rePassword']}
          label="Verify Password" name="rePassword" placeholder="Verify your Password" onChange={e=>handleChange(e)} 
        />
        <Button  type="submit" color="primary" variant="contained" size="large" className={classes.btnLogin} fullWidth onClick={handleSubmit}>Sign Up</Button>
        <Typography> Do you have an account? <Link href="/">Log In</Link></Typography>
        <Typography> Do you want to reset your password?<Link href="/forgot-password" >Forgot password?</Link></Typography>
      </Paper>
    </Grid>
  )
}
export default withRouter(UserRegister)
