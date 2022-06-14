// NPM Dependencies
import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

function CarDetails() {
  return (
    <Box>
      <Typography variant="h6" component="h2">
        Car Details
      </Typography>
      <Table sx={{ mt: 2.5}}>
        <TableBody>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell>Mehran</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Make</b></TableCell>
            <TableCell>Suzuki</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Model</b></TableCell>
            <TableCell>2012</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Registration No</b></TableCell>
            <TableCell>ED2012547BFD*&</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Condition</b></TableCell>
            <TableCell>used</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>Description</b></TableCell>
            <TableCell>
              2017 model, registered 2018
              in ghauri town phase 4
              65000km
              Family used, lifetime
              Alloy rims
              Double doors
              New tyres
              Only petrol
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
}

export default CarDetails;
