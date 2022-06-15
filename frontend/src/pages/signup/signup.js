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
import {Formik} from "formik";
import axios from "axios";

// App Dependencies
import RandomImageLayout from "../../components/layout/randomImageLayout";
import constant from "../../utils/constant";

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  return (
    <RandomImageLayout>
      <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Create new account ?
      </Typography>
      <Formik
        initialValues={{firstName: '', lastName: '', email: ''}}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.firstName) {
            errors.firstName = 'Required';
          } else if (values.firstName.length < 3) {
            errors.firstName = 'At least 3 char length.';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          } else if (values.lastName.length < 3) {
            errors.lastName = 'At least 3 char length.';
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          axios
            .post(`${constant.serverUrl}/user/sign-up`, values)
            .then(response => {
              console.log('signup response ==', response.data);
              const {success, message} = response.data;
              if (success === 1) {
                setErrorMsg('');
                setSuccessMsg(message);
              }
              setSubmitting(false);
            })
            .catch(error => {
              const {message, response, errors} = error.response.data;
              if (response === 409) {
                setErrorMsg(message);
              } else if (response === 400) {
                let errorsMsg = '<ul>'
                errors.forEach(error => {
                  errorsMsg += `<li>${error.message}</li>`
                });
                errorsMsg += `</ul>`;
                setErrorMsg(errorsMsg)
              }
              setSuccessMsg('');
              setSubmitting(false);
            });
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
            {errorMsg && <Alert severity="error"><span dangerouslySetInnerHTML={{__html: errorMsg}} /></Alert>}
            {successMsg && <Alert severity="success">{successMsg}</Alert>}
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <Box sx={{width: '48%'}} display="flex" flexDirection="column">
                <TextField
                  margin="normal"
                  required
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                />
                {errors.firstName && touched.firstName && <span>{errors.firstName}</span>}
              </Box>
              <Box sx={{width: '48%'}} display="flex" flexDirection="column">
                <TextField
                  margin="normal"
                  required
                  id="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="lastName"
                />
                {errors.lastName && touched.lastName && <span>{errors.lastName}</span>}
              </Box>
            </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              autoFocus
            />
            {errors.email && touched.email && <span>{errors.email}</span>}
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              {isSubmitting ? 'Loading...' : 'Sign up'}
            </Button>
            <Grid container>
              <Grid item xs/>
              <Grid item>
                <Link to="/sign-in" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </RandomImageLayout>
  );
}
