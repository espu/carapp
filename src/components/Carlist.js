import React, { useState, useEffect } from 'react';
import { API_URL } from './constants';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import AddCar from './AddCar';
import UpdateCar from './UpdateCar';

function Carlist() {
	const [cars, setCars] = useState([]);

	const [columnDefs] = useState([
		{field: 'brand', sortable: true, filter: true},
		{field: 'model', sortable: true, filter: true},
		{field: 'color', sortable: true, filter: true},
		{field: 'fuel', sortable: true, filter: true},
		{field: 'year', sortable: true, filter: true, width: 120},
		{field: 'price', sortable: true, filter: true, width: 150},
		{cellRenderer: params => <UpdateCar data={params.data} updateCar={updateCar} />, width: 120},
		{cellRenderer: params => <Button color="error" size="small" onClick={() => deleteCar(params.data)}>Delete</Button>, width: 120}
	])

  useEffect(() => {
		getCars();
  }, []);

	const getCars = () => {
		fetch(API_URL + '/cars')
    .then(response => {
    	if(response.ok){
        return response.json();
      }
      else
        alert('Fetch issue')
      })
    .then(data => setCars(data._embedded.cars))
    .catch(error => console.error(error))
	}

	const deleteCar = (data) => {
		if (window.confirm('Are you sure?')) {
			fetch(data._links.car.href, {method: 'DELETE'})
			.then(response => {
				if (response.ok){
					getCars();
				}
				else{
					alert('Delete issue')
				}
			})
		}	
	}

	const addCar = (car) => {
		fetch(API_URL + "/cars", {
			method: 'POST',
			headers: { "Content-type": "application/json"},
			body: JSON.stringify(car)
		})
		.then(response => {
			if (response.ok){
				getCars();
			}
			else{
				alert('Add issue')
			}
		})
		.catch(error => console.error(error))
	}

	const updateCar = (car, url) => {
		fetch(url, {
			method: 'PUT',
			headers: { "Content-type": "application/json"},
			body: JSON.stringify(car)
		})
		.then(response => {
			if (response.ok){
				getCars();
			}
			else{
				alert('Update issue')
			}
		})
		.catch(error => console.error(error))
	}

	return(
		<>
			<div style={{ display: 'flex', justifyContent: 'flex-start', margin: 5 }}>
                <Stack spacing={1} direction="row">
					<AddCar addCar={addCar} />
                </Stack>
            </div>
			<div className='ag-theme-material' style={{height: 600, width: '90%', margin: 'auto'}}>
				<AgGridReact 
					rowData={cars}
					columnDefs={columnDefs}
					pagination={true}
					paginationPageSize={10}
				/>
			</div>
		</>
  )
}

export default Carlist;