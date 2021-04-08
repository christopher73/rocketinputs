import { Container, Box, CssBaseline, makeStyles } from "@material-ui/core";
import "./style.css";
import BackgroundImage from "./background.png";
import ImageLogo from "./logo.svg";
const useStyles = makeStyles((theme) => ({
  main: {
    flexDirection: "column",
    background: `url(${BackgroundImage}) no-repeat center center fixed`,
    backgroundSize: "cover",
    overflowY: "scroll",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  logo: {
    width: theme.spacing(10),
    marginLeft: theme.spacing(1),
  },
  footer: {
    width: "100%",
    paddingBottom: theme.spacing(10),
    color: "#FFFF",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
}));
export const AuthBackgroundConponent = ({ children }) => {
  const classes = useStyles();

  return (
    <Box flex="1" className={classes.main}>
      <Container
        className={classes.container}
        component="main"
        maxWidth="xs"
        fixed
      >
        {/* <CssBaseline /> */}
        {children}
      </Container>
      <div className={classes.footer}>
        <p>Powered by</p>
        <img src={ImageLogo} className={classes.logo} alt="auth-logo" />
      </div>
    </Box>
  );
};
