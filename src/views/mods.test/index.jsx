import React, { useEffect, useState } from 'react';
import { List, AutoSizer  } from 'react-virtualized';
import { Box } from '@mui/material';

const listHeight = 45;

const fetchData = async () => {
  // Simulate API call
  return new Array(10000).fill(null).map((_, i) => ({
    id: i,
    name: `Item ${i + 1}`,
  }));
};



const onRowsRendered = (obj)=>{
  console.log(obj)
}
const VirtualScrollDynamic = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchData();
      setItems(data);
    };
    loadItems();
  }, []);
  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div style={style} key={index}>
        {item ? item.name : 'Loading...'}
      </div>
    );
  };
  return (
    <Box sx={{ display: 'flex', height: `${window.innerHeight - 70}px`, scrollbarWidth: 'none', '&::-webkit-scrollbar':{ display: 'none' } }}>
      <Box sx={{ flex: '1 1 auto' }}>
        <AutoSizer>
          {({ height, width })=>(
            <List
              width={width}
              height={height}
              rowCount={items.length}
              rowHeight={35}
              rowRenderer={Row}
              rowComponent={Row}
              onRowsRendered={onRowsRendered}
            />
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

export default VirtualScrollDynamic;
