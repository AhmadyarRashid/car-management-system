// NPM Dependencies
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Formik} from "formik";
import {Autocomplete, FormControl, InputLabel, MenuItem, Select, TextareaAutosize} from "@mui/material";

// App Dependencies
import {top100Films} from '../../utils/constant';

function AddCar({onClose = () => null, isEdit}) {
  return (
    <Formik
      initialValues={{
        name: '',
        model: '',
        make: '',
        registrationNo: '',
        color: '',
        condition: 'Brand New',
        description: ''
    }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        } else if (values.name.length < 3) {
          errors.name = 'At-least length must be 3';
        }
        return errors;
      }}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          onClose();
          setSubmitting(false);
        }, 400);
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
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEdit ? 'Edit Car Information' : 'New Car'}
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: '100%', mt: 4 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
          <TextField
            sx={{marginTop: 2}}
            fullWidth
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Name"
            variant="outlined"
          />
          {errors.name && touched.name && errors.name}
          <TextField
            sx={{marginTop: 2}}
            fullWidth
            id="name"
            name="model"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Model"
            variant="outlined"
          />
          {errors.model && touched.model && errors.model}
          <TextField
            sx={{marginTop: 2}}
            fullWidth
            id="name"
            name="registrationNo"
            value={values.registrationNo}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Registration No"
            variant="outlined"
          />
          {errors.registrationNo && touched.registrationNo && errors.registrationNo}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label">Condition</InputLabel>
            <Select
              id="demo-simple-select"
              value={values.condition}

              label="Condition"
              name="condition"
              onChange={handleChange}
            >
              <MenuItem value="Used">Used</MenuItem>
              <MenuItem value="Brand New">Brand New</MenuItem>
            </Select>
          </FormControl>
          <InputLabel sx={{ mt: 2}} id="demo-simple-select-label">Description:</InputLabel>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <TextareaAutosize
              minRows={6}
              placeholder=""
              style={{ width: '100%', marginTop: '2px !important' }}
            />
          </FormControl>
          <Button
            type="submit"
            disabled={isSubmitting}
            sx={{marginTop: 2}}
            fullWidth
            variant="contained"
          >
            {isSubmitting ? 'Loading...' : 'Submit'}
          </Button>
        </Box>
      )}
    </Formik>
  )
}

export default AddCar;
