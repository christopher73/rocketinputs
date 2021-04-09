import {
  Typography,
  TextField,
  FormControlLabel,
  Box,
  makeStyles,
  Checkbox,
  Grid,
  Button,
} from "@material-ui/core";
import { Link as LinkTo } from "react-router-dom";
import { AuthBackgroundConponent } from "../../components";
import loginImage from "./login.svg";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#ffffff",
    borderRadius: theme.spacing(1),
    // marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#0A1B3E",
  },
  titleDescription: {
    textAlign: "center",
  },
  imageTop: {
    width: theme.spacing(30),
    margin: theme.spacing(4),
    // width
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    // backgroundColor: "#48D3A0",
    margin: theme.spacing(3, 0, 2),
  },
  bottomText: {
    marginBottom: theme.spacing(1),
  },
}));
export const LoginPage = () => {
  const classes = useStyles();
  return (
    <AuthBackgroundConponent>
      <Box container boxShadow={3} className={classes.paper}>
        <img className={classes.imageTop} alt="login" src={loginImage} />{" "}
        <Typography
          color="primary"
          component="h1"
          variant="h4"
          // className={classes.title}
        >
          SIGN IN
        </Typography>
        <Typography
          color="textSecondary"
          component="p"
          variant="p"
          className={classes.titleDescription}
        >
          Log in with your data that you entered during your registration.
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item className={classes.bottomText}>
              <LinkTo to="/register" variant="body2">
                Don't have an account? Sign Up
              </LinkTo>
            </Grid>
            <Grid item className={classes.bottomText}>
              <LinkTo to="/dashboard">Forgot password?</LinkTo>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthBackgroundConponent>
  );
};
