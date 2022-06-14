// NPM Dependencies
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';

const constants = {
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

export default constants;
