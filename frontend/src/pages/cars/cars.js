// NPM Dependencies
import React from 'react';
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

// App Dependencies
import DashboardLayout from "../../components/layout/dashboardLayout";
import SortableTable from "../../components/sortableTable/sortableTable";

export default function CarsPage() {
  return (
    <DashboardLayout>
      <h2>Cars</h2>
      <SortableTable
        header={[{
          key: 'id',
          title: 'id',
        }, {
          key: 'title',
          title: 'title'
        }, {
          key: 'description',
          title: 'description'
        }]}
        data={[
          {id: 1, title: 'Mehran', description: '10/10'},
          {id: 2, title: 'Cultus', description: '8/10'},
          {id: 3, title: 'Honda Civic', description: '6/10'},
          {id: 4, title: 'Prius', description: '9/10'},
        ]}
      />
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Pagination count={20} variant="outlined" shape="rounded"/>
      </Box>
    </DashboardLayout>
  )
}
