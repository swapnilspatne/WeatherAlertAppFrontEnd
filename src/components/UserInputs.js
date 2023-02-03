import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
}));

export default function UserInputs() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [location, setLocation] = useState('')
  const [criteria, setCriteria] = useState('')
  const [tempareture, setTempareture] = useState('')
  const classes = useStyles();

  const handleClick = (e) => {
    e.preventDefault()
    const UserInputs = { name, email, phoneNo, location, criteria, tempareture }
    console.log(UserInputs)
    fetch("http://localhost:8080/weatherApp/userDetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(UserInputs)

    }).then(() => {
      console.log("Your request has been submited")
    })

    if (criteria) {
      alert('Your Request for Tempareture less than ' + tempareture);
    } else {
      alert('Your Request for Tempareture greater than ' + tempareture);
    }
    setName('')
    setEmail('')
    setPhoneNo('')
    setLocation('')
    setCriteria('0')
    setTempareture('')
  }

  return (

    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Weather Data Request Form</u></h1>

        <form className={classes.root} noValidate autoComplete="off">

          <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField id="outlined-basic" label="Phone Number" variant="outlined" fullWidth
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <TextField id="outlined-basic" label="Location" variant="outlined" fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select label="criteria" id="outlined-basic" variant="outlined" fullWidth
            onChange={(e) => setCriteria(e.target.value)}
            value={criteria}>
            <option value="0">Tempareture is LESS than</option>
            <option selected value="1">Tempareture is GREATER than</option>
          </select>
          <TextField id="outlined-basic" label="Tempreture" variant="outlined" fullWidth
            value={tempareture}
            onChange={(e) => setTempareture(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </form>

      </Paper>

    </Container>
  );
}
