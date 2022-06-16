// NPM Dependencies
import React, {useState, useEffect} from 'react';
import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import {Backdrop, CircularProgress, Modal} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";

// App Dependencies
import DashboardLayout from "../../components/layout/dashboardLayout";
import MuiSortableTable from "../../components/muiSortableTable/MuiSortableTable";
import AddCategory from "../../components/Forms/AddCategory";
import DeleteItem from "../../components/modals/deleteItem";
import constants, {modalStyles, categoryTableHeader} from "../../utils/constant";
import {getErrorMsg} from "../../utils/helper";

export default function CategoryPage() {

  const navigate = useNavigate();
  const [page] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [modalType, setModalType] = useState(constants.modalType.add);

  const token = localStorage.getItem('token');

  const fetchCategory = () => {
    setLoading(true);
    axios
      .get(`${constants.serverUrl}/car/category`)
      .then(response => {
        setLoading(false);
        const {success, payload} = response.data;
        if (success === 1) {
          setCategories(payload);
        }
      })
      .catch(error => {
        const errorMsg = getErrorMsg(error, navigate);
        console.log('errorMsg:', errorMsg);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/sign-in", {replace: true});
    } else {
      fetchCategory();
    }
  }, [navigate, token]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDeleteCategoryHandler = _id => {
    setOpen(false);
    setLoading(true);
    axios
      .delete(`${constants.serverUrl}/car/category/${_id}`)
      .then(() => {
        setLoading(false);
        fetchCategory();
      })
      .catch(error => {
        const errorMsg = getErrorMsg(error, navigate);
        alert(errorMsg.toString());
        setLoading(false);
      });
  }

  const decideModalBody = () => {
    if (modalType === constants.modalType.add) {
      return <AddCategory onRefresh={fetchCategory} onClose={handleClose}/>;
    } else if (modalType === constants.modalType.edit) {
      return <AddCategory onRefresh={fetchCategory} category={selectedCategory} isEdit onClose={handleClose}/>
    } else {
      return <DeleteItem {...selectedCategory} onCancel={handleClose} onDeleteHandler={onDeleteCategoryHandler}/>
    }
  }

  const rows = categories.map(({_id, name}, index) => ({
    id: index + 1,
    _id,
    name,
  }));

  return (
    <DashboardLayout>
      <MuiSortableTable
        title="Category"
        rows={rows}
        header={categoryTableHeader}
        isLoading={isLoading}
        page={page}
        displayAddNew
        openAddNewHandler={() => {
          setModalType(constants.modalType.add);
          handleOpen();
        }}
        onEditHandler={category => {
          setSelectedCategory(category);
          setModalType(constants.modalType.edit);
          handleOpen();
        }}
        onDeleteHandler={category => {
          setSelectedCategory(category);
          setModalType(constants.modalType.delete);
          handleOpen();
        }}
      />
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Pagination count={rows.length / 5} variant="outlined" shape="rounded"/>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="title"
        aria-describedby="description"
      >
        <Box sx={modalStyles}>
          {decideModalBody()}
        </Box>
      </Modal>

      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={isLoading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
    </DashboardLayout>
  )
}
