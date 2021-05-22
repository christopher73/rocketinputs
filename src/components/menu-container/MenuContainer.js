import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

const  MenuContainer = ({item}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Paper className={classes.paper} style={item ==="1" ? {borderBottom: "3px solid #3f51b5"}:{}} ><Link href="contact-account" style={{textDecoration: "none",color:"#3f51b5", fontSize: "15px",fontWeight:"bold"}} >ACCOUNT</Link></Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper} style={item ==="2" ? {borderBottom: "3px solid #3f51b5"}:{}} ><Link href="contact-lead"   style={{textDecoration: "none",color:"#3f51b5", fontSize: "15px",fontWeight:"bold"}}> LEAD </Link></Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper} style={item ==="3" ? {borderBottom: "3px solid #3f51b5"}:{}} ><Link href="contact-none"   style={{textDecoration: "none",color:"#3f51b5", fontSize: "15px",fontWeight:"bold"}}> CONTACT</Link></Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}><Link href="#"  variant="body2" style={{color:"white"}}>.</Link></Paper>
          </Grid>
        </Grid>
      </div>
  )
}

export default MenuContainer
