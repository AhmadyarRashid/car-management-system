// NPM Dependencies
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

function CarDetails({car}) {
  const {name, description, model, make, registrationNo, condition, category} = car;
  return (
    <Box>
      <Typography variant="h6" component="h2">
        Car Details
      </Typography>
      <Table sx={{mt: 2.5}}>
        <TableBody>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Category</b></TableCell>
            <TableCell>{category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Make</b></TableCell>
            <TableCell>{make}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Model</b></TableCell>
            <TableCell>{model}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Registration No</b></TableCell>
            <TableCell>${registrationNo}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Condition</b></TableCell>
            <TableCell>{condition}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Description</b></TableCell>
            <TableCell>{description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
}

export default CarDetails;
