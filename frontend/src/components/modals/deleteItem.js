// NPM Dependencies
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function DeleteItem(){
  return (
    <Box>
      <Typography variant="h6" component="h2">Delete</Typography>
      <Typography variant="body1" mt={1.5}>Are you sure to delete this Item ?</Typography>
      <Box mt={2} display="flex" flexDirection="row" justifyContent="flex-end">
        <Button>No</Button>
        <Button color="error" variant="contained">Yes</Button>
      </Box>
    </Box>
  )
}

export default React.memo(DeleteItem);
