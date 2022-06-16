// NPM Dependencies
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function DeleteItem({ _id, name, onDeleteHandler, onCancel }){
  return (
    <Box>
      <Typography variant="h6" component="h2">Delete</Typography>
      <Typography variant="body1" mt={1.5}>Are you sure to delete {name} ?</Typography>
      <Box mt={2} display="flex" flexDirection="row" justifyContent="flex-end">
        <Button onClick={onCancel}>No</Button>
        <Button onClick={() => onDeleteHandler(_id)} color="error" variant="contained">Yes</Button>
      </Box>
    </Box>
  )
}

export default React.memo(DeleteItem);
