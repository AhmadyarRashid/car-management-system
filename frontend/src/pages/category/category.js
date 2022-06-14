// NPM Dependencies
import React from 'react';
import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';

// App Dependencies
import DashboardLayout from "../../components/layout/dashboardLayout";
import SortableTable from "../../components/sortableTable/sortableTable";

export default function CategoryPage() {
  return (
    <DashboardLayout>
      <h2>Categories</h2>
      <SortableTable
        header={[{
          key: 'id',
          title: 'id',
        }, {
          key: 'title',
          title: 'title'
        }]}
        data={[
          {id: 1, title: 'BMW'},
          {id: 2, title: 'Audi'},
          {id: 3, title: 'Honda'},
          {id: 4, title: 'Toyota'},
        ]}
      />
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Pagination count={20} variant="outlined" shape="rounded" />
      </Box>
    </DashboardLayout>
  )
}
