// NPM Dependencies
import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import {Modal} from "@mui/material";

// App Dependencies
import DashboardLayout from "../../components/layout/dashboardLayout";
import MuiSortableTable from "../../components/muiSortableTable/MuiSortableTable";
import AddCategory from "../../components/Forms/AddCategory";
import DeleteItem from "../../components/modals/deleteItem";
import constants, {modalStyles, categoryTableHeader} from "../../utils/constant";

function createData(id, _id, name) {
  return {
    id,
    _id,
    name,
  };
};

const rows = [
  createData(1, 'a123njdc9', 'MG'),
  createData(2, 'a123njdc9', 'Suzuki'),
  createData(3, 'a123njdc9', 'Honda'),
  createData(4, 'a123njdc9', 'KIA'),
  createData(5, 'a123njdc9', 'Audi'),
  createData(6, 'a123njdc9', 'Toyota'),
  createData(7, 'a123njdc9', 'BMW'),
];

export default function CategoryPage() {

  const [page] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(constants.modalType.add);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const decideModalBody = () => {
    if (modalType === constants.modalType.add) {
      return <AddCategory onClose={handleClose} />;
    } else if (modalType === constants.modalType.edit) {
      return <AddCategory isEdit onClose={handleClose} />
    } else {
      return <DeleteItem />
    }
  }

  return (
    <DashboardLayout>
      <MuiSortableTable
        title="Category"
        rows={rows}
        header={categoryTableHeader}
        page={page}
        displayAddNew
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
      />
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Pagination count={10} variant="outlined" shape="rounded"/>
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
