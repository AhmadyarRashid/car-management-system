import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Button from "@mui/material/Button";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort, headCells} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            sx={{display: headCell.id === '_id' ? 'none' : 'content'}}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = ({title, displayAddNew, openAddNewHandler}) => (
  <Toolbar
    sx={{
      pl: {sm: 2},
      pr: {xs: 1, sm: 1},
    }}
  >
    <Typography
      sx={{flex: '1 1 60%'}}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      {title}
    </Typography>
    {displayAddNew && (
      <Button onClick={openAddNewHandler} color="primary" variant="contained">
        Add New
      </Button>
    )}
  </Toolbar>
);

export default function MuiSortableTable(props) {
  const {
    rows, header, title,
    displayAddNew = false, page = 0, displayInfoIcon= false,
    openAddNewHandler, onEditHandler, onDeleteHandler, onDetailHandler
  } = props;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [rowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{width: '100%', marginTop: 8}}>
      <Paper sx={{width: '100%', mb: 2, padding: 2}}>
        <EnhancedTableToolbar title={title} displayAddNew={displayAddNew} openAddNewHandler={openAddNewHandler}/>
        <TableContainer>
          <Table
            sx={{minWidth: 750}}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              headCells={header}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      {Object.keys(row).map((attribute) =>
                        <TableCell
                          sx={{display: attribute === '_id' ? 'none' : 'content'}}
                          align="left"
                        >{row[attribute]}</TableCell>)}
                      <TableCell align="left">
                        {displayInfoIcon && <InfoOutlinedIcon onClick={onDetailHandler} sx={{marginRight: 2, color: 'skyblue', cursor: 'pointer'}}/>}
                        <EditOutlinedIcon
                          onClick={onEditHandler}
                          sx={{marginRight: 2, color: 'orange', cursor: 'pointer'}}
                        />
                        <DeleteOutlineOutlinedIcon
                          onClick={onDeleteHandler}
                          sx={{color: 'red', cursor: 'pointer'}}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
