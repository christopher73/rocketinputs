import { React } from "react";
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
import backgroundImage from "../../assets/images/bg.png";
import logo from "../../assets/images/logo_small.svg";

export const ComponentUIWrapper = ({ children }) => {
  return (
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {children}
      <Typography
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          marginTop: 30,
        }}
      >
        Powered by
        <img
          src={logo}
          alt="rocketdevs logo"
          width={120}
          style={{ marginLeft: 10 }}
        />
      </Typography>
    </Grid>
  );
};
