// NPM Dependencies
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

const constants = {
  serverUrl: 'http://localhost:3001/api/v1.0',
  tokenHeader: 'Bearer',
  tableDataLimit: 5,
  sideBarList: [
    {
      text: 'Category',
      icon: <CategoryOutlinedIcon/>,
      url: '/category',
    },
    {
      text: 'Cars',
      icon: <DirectionsCarFilledOutlinedIcon/>,
      url: '/',
    }
  ],
  drawerWidth: 240,
  modalType: {
    details: 'DETAIL',
    add: 'ADD',
    edit: 'EDIT',
    delete: 'DELETE',
  },
}

export const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: 2,
  transform: 'translate(-50%, -50%)',
  width: 400,
  overflowX: 'scroll',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const categoryTableHeader = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: '#',
  },
  {
    id: '_id',
    numeric: true,
    disablePadding: false,
    label: '_id',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

export const carTableHeader = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: '#',
  },
  {
    id: '_id',
    numeric: true,
    disablePadding: false,
    label: '_id',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'make',
    numeric: false,
    disablePadding: false,
    label: 'Make',
  },
  {
    id: 'model',
    numeric: false,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

export default constants;
