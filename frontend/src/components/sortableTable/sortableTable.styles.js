// NPM Dependencies
import {styled} from "@mui/material/styles";

export const TableContainer = styled('div')(() => ({
  marginTop: '3%',
  width: '100%',
}));

export const Table = styled('table')(() => ({
  width: '100%',
}));

export const Thead = styled('thead')(() => ({
  padding: '4px',
}));

export const TH = styled('th')(() => ({
  width: '20%',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '29.05px',
  borderBottom: '1px solid lightgrey',
  padding: '4px',
  cursor: 'pointer',
}));

export const TD = styled('td')(() => ({
  width: '20%',
  textAlign: 'center',
  fontSSize: '16px',
  lineHeight: '19.36px',
  padding: '10px',
}));
