// NPM Dependencies
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

// App Dependencies
import RandomImageLayout from "../../components/layout/randomSideImage";

export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <RandomImageLayout>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create new account ?
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <TextField
            margin="normal"
            required
            id="firstName"
            label="First Name"
            name="firstName"
            sx={{ width: '48%' }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            id="lastName"
            label="Last Name"
            name="lastName"
            sx={{ width: '48%' }}
          />
        </Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>
        <Grid container>
          <Grid item xs />
          <Grid item>
            <Link to="/sign-in" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </RandomImageLayout>
  );
}
