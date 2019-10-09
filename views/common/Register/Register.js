/***
 *  Created by Sanchit Dang
 ***/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, makeStyles, Typography, Button, Box, Grid, Paper } from '@material-ui/core';
import { notify } from 'components';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  registerBox: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    marginTop: theme.spacing(1)
  },
  developMessage: {
    position: "absolute",
    bottom: "1vh"
  }
}));

export const Register = () => {
  const classes = useStyles();
  const [pageHeading] = useState('Register');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const register = () => {
  };
  const validationCheck = () => {
    const charPattern =  /^[a-zA-Z]*$/;
    if(firstName.length == 0){
      return notify("Please fill in first name.");
    }
    if(!charPattern.test(firstName)){
      return notify("Please enter a valid first name.");
    }
    if(lastName.length == 0){
      return notify("Please fill in last name.");
    }
    if(!charPattern.test(lastName)){
      return notify("Please enter a valid last name.");
    }
    if(emailId.length == 0){
      return notify("Please fill in email.");
    }
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailPattern.test(emailId)) {
      return notify('Email not in proper format');
    }

    const pwdPattern =  /^[0-9a-zA-Z]*$/;
    if(password.length == 0){
      return notify("Please fill in password.");
    }else if(password.length < 6 || password > 18){
      return notify("password length should between 6 and 18.");
    }
    if(!pwdPattern.test(password)){
      return notify("Please enter a valid password format.");
    }
    if (password !== confirmPassword) {
      return notify("Passwords don't match.");
    }
    return register();
  }

  let content = (
    <div>
      <Grid
        container
        spacing={0}
        justify="center"
      >
        <Grid className={classes.registerBox} item xs={10}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              {pageHeading}
            </Typography>
            <form noValidate>
              <TextField variant="outlined" margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="email" onChange={e => setFirstName(e.target.value)} autoFocus />
              <TextField variant="outlined" margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="email" onChange={e => setLastName(e.target.value)} />
              <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={e => setEmailId(e.target.value)} />
              <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={e => setPassword(e.target.value)} autoComplete="current-password" />
              <TextField variant="outlined" margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} autoComplete="current-password" />
              <Button fullWidth variant="contained" color="primary" className={classes.buttons} onClick={validationCheck}>Register</Button>
              <Button fullWidth variant="contained" color="primary" className={classes.buttons} component={Link} to='/login'>Back</Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.developMessage}>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              Developed by Deakin Launchpad
        </Typography>
          </Box>
        </Grid>
      </Grid>
    </div >
  );
  return content;
}
