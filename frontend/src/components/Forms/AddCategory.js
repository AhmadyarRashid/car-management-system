// NPM Dependencies
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";
import {Formik} from "formik";
import axios from "axios";

// App Dependencies
import constant from "../../utils/constant";
import {getErrorMsg} from '../../utils/helper';

function AddCategory({onClose = () => null, isEdit, category = {}, onRefresh= () => null}) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onCreateHandler = (values, callback) => {
    axios
      .post(`${constant.serverUrl}/car/category`, values)
      .then(response => {
        const {success, message} = response.data;
        if (success === 1) {
          setErrorMsg('');
          setSuccessMsg(message);
          setTimeout(() => {
            callback(null, true);
          }, 1000);
        }else {
          callback(null, true);
        }
      })
      .catch(error => {
        const errorMessage = getErrorMsg(error, navigate);
        setErrorMsg(errorMessage);
        setSuccessMsg('');
        callback(true, null);
      });
  };

  const onUpdateHandler = (values, callback) => {
    axios
      .put(`${constant.serverUrl}/car/category/${category._id}`, values)
      .then(response => {
        const {success, message} = response.data;
        if (success === 1) {
          setErrorMsg('');
          setSuccessMsg(message);
          setTimeout(() => {
            callback(null, true);
          }, 1000);
        }else {
          callback(null, true);
        }
      })
      .catch(error => {
        const errorMessage = getErrorMsg(error, navigate);
        setErrorMsg(errorMessage);
        setSuccessMsg('');
        callback(true, null);
      });
  };

  return (
    <Formik
      initialValues={{name: isEdit ? category.name : ''}}
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
        if (isEdit) {
          onUpdateHandler(values, (err, response) => {
            if (response) {
              onRefresh();
              onClose()
            }
            setSubmitting(false);
          });
        } else {
          onCreateHandler(values, (err, response) => {
            if (response) {
              onRefresh();
              onClose();
            }
            setSubmitting(false);
          });
        }
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
          <Typography variant="h6" component="h2">
            {isEdit ? 'Edit Category' : 'New Category'}
          </Typography>
          {errorMsg && <Alert severity="error"><span dangerouslySetInnerHTML={{__html: errorMsg}}/></Alert>}
          {successMsg && <Alert severity="success">{successMsg}</Alert>}
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

export default AddCategory;
