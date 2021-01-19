import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

export default function GridExample(props) {
  console.log(props);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const [URL, setURL] = useState(
    `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${props.url}&s=2020-2021`
  );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetch(URL);
    const result = await response.json();

    setRowData(result.table);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        id="myGrid"
        style={{
          height: '1000px',
          width: '1000px',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          modules={AllCommunityModules}
          defaultColDef={{
            width: 125,
            sortable: true,
          }}
          rowData={rowData}
          animateRows={true}
          sortingOrder={['desc', 'asc', null]}
          //   onGridReady={onGridReady}
        >
          <AgGridColumn
            field="name"
            width={220}
            sortingOrder={['desc', 'asc']}
          />
          <AgGridColumn
            field="total"
            width={100}
            sortingOrder={['desc', 'asc']}
          />
          <AgGridColumn
            field="played"
            width={100}
            sortingOrder={['desc', 'asc']}
          />
          <AgGridColumn
            field="win"
            width={100}
            sortingOrder={['desc', 'asc']}
          />
          <AgGridColumn field="loss" width={100} />
          <AgGridColumn field="draw" width={100} />
          <AgGridColumn
            field="goalsfor"
            width={120}
            sortingOrder={['desc', 'asc']}
          />
          <AgGridColumn
            field="goalsagainst"
            width={120}
            sortingOrder={['desc', 'asc']}
          />
          {/* <AgGridColumn field="bronze" />
          <AgGridColumn field="total" /> */}
        </AgGridReact>
      </div>
    </div>
  );
}
// "name": "Inter",
// "teamid": "133681",
// "played": 18,
// "goalsfor": 54,
// "goalsagainst": 33,
// "goalsdifference": 21,
// "win": 12,
// "draw": 4,
// "loss": 2,
// "total": 40
