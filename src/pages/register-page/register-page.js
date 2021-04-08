import {
  Typography,
  TextField,
  FormControlLabel,
  Box,
  makeStyles,
  Checkbox,
  Button,
  Grid,
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
    margin: theme.spacing(3, 0, 2),
  },
  bottomText: {
    marginBottom: theme.spacing(1),
  },
}));
export const RegisterPage = () => {
  const classes = useStyles();
  return (
    <AuthBackgroundConponent>
      <Box container boxShadow={3} className={classes.paper}>
        {/* <img className={classes.imageTop} alt="login" src={loginImage} />{" "} */}
        <Typography
          color="primary"
          component="h1"
          variant="h4"
          // className={classes.title}
        >
          REGISTER
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="usename"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="company-code"
            label="Company Code"
            name="code"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="family-name"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password1"
            label="Password"
            type="password"
            id="password1"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password2"
            label="Verify Password"
            type="password"
            id="password2"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="terms-and-conditions" color="primary" />}
            label={
              <p>
                Creating an account means you’re okay with our
                <a href="url"> Terms of Service, Privacy Policy,</a> and our
                default <a href="url">Notification Settings.</a>
              </p>
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="center">
            <Grid item>
              or{" "}
              <LinkTo to="/" variant="body2">
                Login
              </LinkTo>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthBackgroundConponent>
  );
};
