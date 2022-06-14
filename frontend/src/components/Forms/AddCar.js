// NPM Dependencies
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Formik} from "formik";

function AddCar({onClose = () => null, isEdit}) {
  return (
    <Formik
      initialValues={{name: ''}}
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
