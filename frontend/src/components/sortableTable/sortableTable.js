// NPM Dependencies
import React from 'react';

// App Dependencies
import useSortableData from '../../customHooks/useSortableData';
import {TableContainer, Table, Thead, TH, TD} from './sortableTable.styles';

function SortableTable({header, data}) {
  const {items, requestSort} = useSortableData(data);
  return (
    <TableContainer>
      <Table>
        <Thead>
          <tr>
            {header.map((data, index) => (
              <TH key={index} onClick={() => requestSort(data.key)}>
                {data.title}
              </TH>
            ))}
          </tr>
        </Thead>
        <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {Object.keys(item).map((attribute) => <TD>{item[attribute]}</TD>)}
          </tr>
        ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default SortableTable;
