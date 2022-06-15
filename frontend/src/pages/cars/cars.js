// NPM Dependencies
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import {Modal} from "@mui/material";

// App Dependencies
import DashboardLayout from "../../components/layout/dashboardLayout";
import MuiSortableTable from "../../components/muiSortableTable/MuiSortableTable";
import constants, { modalStyles, carTableHeader } from "../../utils/constant";
import DeleteItem from "../../components/modals/deleteItem";
import AddCar from "../../components/Forms/AddCar";
import CarDetails from "../../components/modals/carDetails";

function createData(id, _id, title, make, model) {
  return {
    id,
    _id,
    title,
    make,
    model,
  };
}

const rows = [
  createData(1, 'a123njdc9','Mehran', 'Suzuki', '2012'),
  createData(2, 'a123njdc9','Cultus', 'Suzuki', '2009'),
  createData(3, 'a123njdc9','Swift', 'Suzuki', '2009'),
  createData(4, 'a123njdc9','Honda Civic', 'Honda', '2009'),
  createData(5, 'a123njdc9','Honda City', 'Honda', '2009'),
  createData(6, 'a123njdc9','Prius', 'Toyota', '2009'),
  createData(7, 'a123njdc9','GLI', 'Toyota', '2009'),
];

export default function CarsPage() {
  const [page] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(constants.modalType.add);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const decideModalBody = () => {
    if (modalType === constants.modalType.add) {
      return <AddCar onClose={handleClose} />;
    } else if (modalType === constants.modalType.edit) {
      return <AddCar isEdit onClose={handleClose} />;
    } else if (modalType === constants.modalType.details) {
      return <CarDetails />;
    } else {
      return <DeleteItem />;
    }
  }

  return (
    <DashboardLayout>
      <MuiSortableTable
        title="Car"
        rows={rows}
        header={carTableHeader}
        page={page}
        displayAddNew
        displayInfoIcon
        openAddNewHandler={() => {
          setModalType(constants.modalType.add);
          handleOpen();
        }}
        onEditHandler={() => {
          setModalType(constants.modalType.edit);
          handleOpen();
        }}
        onDeleteHandler={() => {
          setModalType(constants.modalType.delete);
          handleOpen();
        }}
        onDetailHandler={() => {
          setModalType(constants.modalType.details);
          handleOpen();
        }}
      />
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Pagination count={20} variant="outlined" shape="rounded"/>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          {decideModalBody()}
        </Box>
      </Modal>
    </DashboardLayout>
  )
}
