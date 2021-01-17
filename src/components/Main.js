import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({

    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));




export default function Main() {
  const classes = useStyles();
  // City being queried
  const [city, setCity] = useState('');
  //Object where the api content is saved
  const [finalText, setFinalText] = useState(null);
  //Error message being returned to the user
  const [errorMessage, setErrorMessage] = useState('');
  //Check response status code
  const [responseFromAPI, setResponseFromAPI] = useState(true);
  const onSubmit = (e) => {

    e.preventDefault();
    const isValid = formValidation();
    // Use to check if response was initially error then was correct
    setResponseFromAPI(true);

    if (isValid){
      const result = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=appid`)
        .then(res => {
          // Check status
          if(res.status === 200){
            return res.json()
          } else if(res.status ===404){
            setErrorMessage('City not found')
            setResponseFromAPI(false)
            setFinalText(null)
          } else {
            setErrorMessage('City not found')
            setResponseFromAPI(false)
            setFinalText(null)
          }
        })
        .then(contents =>  setFinalText(contents))
        .catch(error => console.log(false));
      setErrorMessage('');
    }else {
      setErrorMessage("Don't submit blank field");
      setFinalText(null);
    }

  }

  const formValidation = () => {
    let isValid = true;
    if(city.length <= 0 ){
      isValid = false;
    }else{
      isValid = true;
    }
    return isValid;
  }

  return (
    <div className={classes.root}>
    <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                      <TextField id="outlined-basic" label="Search a city" variant="outlined" onChange= {(e)=>(setCity(e.target.value))} />

                    </Grid>
                    <Grid item/>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type='submit'>
                      Submit
                      </Button>
                    </Grid>
                </Grid>
              <p> {errorMessage} </p>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {
              responseFromAPI ? (
                <Paper className={classes.paper}>
                  <Typography variant="h4"> {finalText ? <img src= {'http://openweathermap.org/img/wn/'+finalText.weather[0].icon+'@2x.png'} alt='Icon'/> : null}</Typography>
                  <Typography variant="body1"> {finalText ? ('The weather condition is ' + finalText.weather[0].main) : null}</Typography>
                  <Typography variant="body1"> {finalText ? ('Precisely, ' + finalText.weather[0].description + ' with temperature ranging between '+finalText.main.temp_min+' and '+finalText.main.temp_max+' (Kelvin). ') : null}</Typography>
                </Paper>
              ) : null
            }
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}
