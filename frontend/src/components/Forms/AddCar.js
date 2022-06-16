// NPM Dependencies
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Alert, Autocomplete, FormControl,
  InputLabel, MenuItem, Select,
  TextareaAutosize
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import axios from "axios";

// App Dependencies
import constant from '../../utils/constant';
import {getErrorMsg} from '../../utils/helper';

function AddCar({onClose = () => null, isEdit, car = {}, onRefresh = () => null, categories = []}) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onCreateHandler = (values, callback) => {
    axios
      .post(`${constant.serverUrl}/car`, values)
      .then(response => {
        const {success, message} = response.data;
        if (success === 1) {
          setErrorMsg('');
          setSuccessMsg(message);
          setTimeout(() => {
            callback(null, true);
          }, 1000);
        } else {
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
      .patch(`${constant.serverUrl}/car/${car._id}`, values)
      .then(response => {
        const {success, message} = response.data;
        if (success === 1) {
          setErrorMsg('');
          setSuccessMsg(message);
          setTimeout(() => {
            callback(null, true);
          }, 1000);
        } else {
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
      initialValues={{
        name: isEdit ? car.name : '',
        model: isEdit ? car.model : '',
        make: isEdit ? car.make : '',
        category: isEdit ? car.category : categories.length > 0 ? categories[0].label : '',
        registrationNo: isEdit ? car.registrationNo : '',
        condition: isEdit ? car.condition : 'Brand New',
        description: isEdit ? car.description : ''
      }}
      validate={values => {
        const errors = {};
        if (!values.name) errors.name = 'Required';
        else if (values.name.length < 3) errors.name = 'At-least length must be 3';

        if (!values.model) errors.model = 'Required';
        if (!values.make) errors.make = 'Required';
        if (!values.category) errors.category = 'Required';
        if (!values.registrationNo) errors.registrationNo = 'Required';

        if (!values.description) errors.description = 'Required';
        else if (values.description.length < 3) errors.description = 'At-least length must be greater than 10 char';
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
          setFieldValue,
          isSubmitting,
        }) => (
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEdit ? 'Edit Car Information' : 'New Car'}
          </Typography>
          {errorMsg && <Alert severity="error"><span dangerouslySetInnerHTML={{__html: errorMsg}}/></Alert>}
          {successMsg && <Alert severity="success">{successMsg}</Alert>}
          <Autocomplete
            disablePortal
            id="category"
            name="category"
            value={values.category}
            onChange={(event, {label}) => setFieldValue('category', label)}
            onBlur={handleBlur}
            options={categories}
            sx={{width: '100%', mt: 4}}
            renderInput={(params) => <TextField
              {...params}
              label="Category"/>}
          />
          {errors.category && touched.category && <span>{errors.category}</span>}
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
          {errors.name && touched.name && <span>{errors.name}</span>}
          <TextField
            sx={{marginTop: 2}}
            fullWidth
            id="make"
            name="make"
            value={values.make}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Make"
            variant="outlined"
          />
          {errors.make && touched.make && <span>{errors.make}</span>}
          <TextField
            sx={{marginTop: 2}}
            fullWidth
            id="model"
            name="model"
            value={values.model}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Model"
            variant="outlined"
          />
          {errors.model && touched.model && <span>{errors.model}</span>}
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
          {errors.registrationNo && touched.registrationNo && <span>{errors.registrationNo}</span>}
          <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel id="demo-simple-select-label">Condition</InputLabel>
            <Select
              id="demo-simple-select"
              value={values.condition}
              label="Condition"
              name="condition"
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <MenuItem value="Used">Used</MenuItem>
              <MenuItem value="Brand New">Brand New</MenuItem>
            </Select>
          </FormControl>
          <InputLabel sx={{mt: 2}} id="demo-simple-select-label">Description:</InputLabel>
          <FormControl fullWidth sx={{mt: 1}}>
            <TextareaAutosize
              minRows={6}
              value={values.description}
              onChange={event => setFieldValue('description', event.target.value)}
              onBlur={handleBlur}
              placeholder=""
              style={{width: '100%', marginTop: '2px !important'}}
            />
          </FormControl>
          {errors.description && touched.description && <span>{errors.description}</span>}
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
