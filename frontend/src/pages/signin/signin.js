// NPM Dependencies
import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import {Alert} from "@mui/material";
import {Formik} from 'formik';
import axios from 'axios';

// App Dependencies
import RandomImageLayout from "../../components/layout/randomImageLayout";
import constant from "../../utils/constant";

export default function SignIn() {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  return (
    <RandomImageLayout>
      <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={{email: '', password: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          axios
            .post(`${constant.serverUrl}/user/login`, values)
            .then(response => {
              const {success, message} = response.data;
              if (success === 1) {
                setErrorMsg('');
                setSuccessMsg(message);
              }
              setSubmitting(false);
            })
            .catch(error => {
              const {message, response, errors} = error.response.data;
              if (response === 400) {
                let errorsMsg = '<ul>'
                errors.forEach(error => {
                  errorsMsg += `<li>${error.message}</li>`
                });
                errorsMsg += `</ul>`;
                setErrorMsg(errorsMsg)
              } else {
                setErrorMsg(message);
              }
              setSuccessMsg('');
              setSubmitting(false);
            });
          setSubmitting(false);
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
            {errorMsg && <Alert severity="error"><span dangerouslySetInnerHTML={{__html: errorMsg}}/></Alert>}
            {successMsg && <Alert severity="success">{successMsg}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              autoFocus
            />
            {errors.email && touched.email && <span>{errors.email}</span>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete="current-password"
            />
            {errors.password && touched.password && <span>{errors.password}</span>}
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              {isSubmitting ? 'Loading...' : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs/>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </RandomImageLayout>
  );
}
