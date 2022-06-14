import { useMemo, useState } from 'react';

const useSortableData = (items, config = { key: '', direction: '' }) => {
  const [sortConfig, setSortConfig] = useState(config);

  // useMemo because it will not calculate every time. it must be re-calculate if dependent variable will change
  const sortedItems = useMemo(() => {
    // create new copy of items because sort function update its own list variable
    const sortableItems = [...items];
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      sortableItems.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  // invert selected column sorting order by default order must be ascending
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export default useSortableData;
