import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  makeStyles,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import loginImage from "../../assets/images/login.svg";

import axios from "../../config/axios";
import { ComponentUIWrapper } from "./ComponentUIWrapper";

const useStyles = makeStyles((theme) => ({
  imageTop: {
    width: theme.spacing(30),
    height: theme.spacing(10),
  },
  avatarStyle: {
    backgroundColor: "#1bbd7e",
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  btnLogin: {
    margin: "8px 0px",
  },
}));

const ForgotPassword = (props) => {
  const classes = useStyles();
  const PATH = "/api/changePassword";

  const [form, setForm] = useState({ email: "1@1.com", password: "11111111" });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      const response = await axios.put(PATH, form);
      if (response.data && response.data.success) {
        Swal.fire({
          title: "Password changed!",
          text: "Go to SIGN IN",
          icon: "success",
          confirmButtonText: "GO",
        });
        props.history.push("/");
      }
    } catch (err) {
      console.log(err.response.data.message);
      setError({
        ...error,
        [err.response.data.message.title]: err.response.data.message.details,
      });
    }
  };

  return (
    <ComponentUIWrapper>
      <Paper elevation={10} style={{ padding: 30, width: "33%" }}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <img className={classes.imageTop} alt="login" src={loginImage} />{" "}
          </Avatar>
          <Typography color="primary" component="h6" variant="h6">
            {" "}
            FORGOT PASSWORD{" "}
          </Typography>
          <hr />
        </Grid>
        <TextField
          autoFocus
          variant="outlined"
          margin="normal"
          fullWidth
          required
          type="email"
          error={error["email"] ? true : false}
          helperText={error["email"]}
          label="Email"
          name="email"
          placeholder="Enter Email"
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          type="password"
          error={error["password"] ? true : false}
          helperText={error["password"]}
          label="New Password"
          name="password"
          placeholder="Enter a new password"
          onChange={(e) => handleChange(e)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          size="large"
          className={classes.btnLogin}
          fullWidth
          onClick={handleSubmit}
        >
          CHANGE
        </Button>
        <Typography>
          {" "}
          Do you have an account? <Link href="/">Log In</Link>
        </Typography>
        <Typography>
          {" "}
          Create a new account? <Link href="/register">Sign Up</Link>
        </Typography>
      </Paper>
    </ComponentUIWrapper>
  );
};

export default withRouter(ForgotPassword);
