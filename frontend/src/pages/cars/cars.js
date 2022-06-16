// NPM Dependencies
import React, {useState, useEffect} from 'react';
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import {useNavigate} from "react-router-dom";
import {Backdrop, CircularProgress, Modal} from "@mui/material";
import axios from "axios";

// App Dependencies
import DashboardLayout from "../../components/layout/dashboardLayout";
import MuiSortableTable from "../../components/muiSortableTable/muiSortableTable";
import constants, {modalStyles, carTableHeader} from "../../utils/constant";
import CarDetails from "../../components/modals/carDetails";
import DeleteItem from "../../components/modals/deleteItem";
import AddCar from "../../components/forms/addCar";
import {getErrorMsg} from "../../utils/helper";

export default function CarsPage() {

  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [modalType, setModalType] = useState(constants.modalType.add);

  const token = localStorage.getItem('token');

  const fetchCategory = () => {
    axios
      .get(`${constants.serverUrl}/car/category`)
      .then(response => {
        const {success, payload} = response.data;
        if (success === 1) {
          setCategories(payload);
        }
      })
      .catch(error => {
        const errorMsg = getErrorMsg(error, navigate);
        console.log('errorMsg:', errorMsg);
      });
  };

  const fetchCar = () => {
    setLoading(true);
    axios
      .get(`${constants.serverUrl}/car`, {
        params: {
          page,
          limit: constants.tableDataLimit
        }
      })
      .then(response => {
        setLoading(false);
        const {success, payload} = response.data;
        const {cars: carsList, total} = payload;
        if (success === 1) {
          setTotalPages(Math.ceil(total / constants.tableDataLimit));
          setCars(carsList);
        }
      })
      .catch(error => {
        console.log('errors:', error);
        const errorMsg = getErrorMsg(error, navigate);
        console.log('errorMsg:', errorMsg);
        setCars([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/sign-in", {replace: true});
    } else {
      fetchCar();
      fetchCategory();
    }
  }, [navigate]);

  useEffect(() => {
    fetchCar();
  }, [page]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onDeleteCategoryHandler = _id => {
    setOpen(false);
    setLoading(true);
    axios
      .delete(`${constants.serverUrl}/car/${_id}`)
      .then(() => {
        setLoading(false);
        fetchCar();
      })
      .catch(error => {
        const errorMsg = getErrorMsg(error, navigate);
        alert(errorMsg.toString());
        setLoading(false);
      });
  }

  const decideModalBody = () => {
    const categoryList = categories.map(({_id, name}) => ({
      label: name,
    }))
    if (modalType === constants.modalType.add) {
      return <AddCar categories={categoryList} onRefresh={fetchCar} onClose={handleClose}/>;
    } else if (modalType === constants.modalType.edit) {
      return <AddCar categories={categoryList} onRefresh={fetchCar} car={selectedCar} isEdit onClose={handleClose}/>;
    } else if (modalType === constants.modalType.details) {
      return <CarDetails car={selectedCar}/>;
    } else {
      return <DeleteItem {...selectedCar} onCancel={handleClose} onDeleteHandler={onDeleteCategoryHandler}/>;
    }
  }
  const rows = cars.map(({_id, name, make, model}, index) => ({
    id: (page * constants.tableDataLimit) + (index + 1),
    _id,
    name,
    make,
    model,
  }));

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
        onEditHandler={selCar => {
          setSelectedCar(cars.find(car => car._id === selCar._id));
          setModalType(constants.modalType.edit);
          handleOpen();
        }}
        onDeleteHandler={car => {
          setSelectedCar(car);
          setModalType(constants.modalType.delete);
          handleOpen();
        }}
        onDetailHandler={selCar => {
          setSelectedCar(cars.find(car => car._id === selCar._id));
          setModalType(constants.modalType.details);
          handleOpen();
        }}
      />
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Pagination
          count={totalPages}
          onChange={(event, value) => setPage(value - 1)}
          variant="outlined"
          shape="rounded"
        />
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

      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={isLoading}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    </DashboardLayout>
  )
}
