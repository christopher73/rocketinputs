import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Container } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";

import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // backgroundColor: "red",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  button: {
    margin: theme.spacing(2),
  },
}));
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});
const InputField = (props) => {
  const classes = useStyles();
  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant="filled"
    >
      <InputLabel htmlFor={props.htmlFor}>{props.label}</InputLabel>
      <FilledInput id={props.htmlFor} type="text" {...props} />
    </FormControl>
  );
};

export const FormComponent = ({ open, setOpen }) => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    firstName: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container className={classes.container}>
            <InputField
              htmlFor="firstName"
              label="First Name"
              onChange={handleChange("firstName")}
              value={values.firstName}
            />
            <InputField
              htmlFor="lastName"
              label="Last Name"
              onChange={handleChange("firstName")}
              value={values.firstName}
            />
            <InputField
              htmlFor="nickname"
              label="Nickname"
              onChange={handleChange("firstName")}
              value={values.firstName}
            />
            <InputField
              htmlFor="phone1"
              label="Phone 1"
              onChange={handleChange("firstName")}
              value={values.firstName}
            />
            <InputField
              htmlFor="phone2"
              label="Phone 2"
              onChange={handleChange("firstName")}
              value={values.firstName}
            />
            <InputField
              htmlFor="email"
              label="Email"
              onChange={handleChange("firstName")}
              value={values.firstName}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
};
