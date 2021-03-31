/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-control-regex */
import React, { useState, useEffect, forwardRef } from 'react';

import Grid from '@material-ui/core/Grid';

import MaterialTable from 'material-table';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';

import api from '../../../services/api';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const [sms, setSms] = useState();
  const [alertsms, setAlertsms] = useState();
  const [open, setOpen] = React.useState(false);
  const [contests, setContests] = useState({});

  let contests2 = {};


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  useEffect(() => {
    api.get('/users')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log('Error');
      });

      api.get('/concursos')
        .then((res) => {
          res.data.map((item, index) =>{
            contests2 = {
              ...contests2,
              [`${item.id}`]: item.name
            }
          })

          contests2 = {...contests2, [`${contests2.length}`]: "Todos"}

          setContests(contests2)
        })
        .catch((error) => {
          console.log('Error');
        });

        

  }, []);

  const columns = [
    { title: 'Nome', field: 'name'},
    { title: 'Email', field: 'email' },
    { title: 'Tipo', field: 'type', render: (rowData) => <p >{rowData.type}</p> ,initialEditValue: '0', lookup: { 0: 'Master', 1: 'Júri' }},
    { title: 'Concurso', field: 'nameContests', render: (rowData) => <p>{ (rowData.type == "Master")? "Todos" : rowData.nameContests}</p> ,initialEditValue: '0', lookup: contests},
    { title: 'Senha', render: (rowData) => <Button onClick={(e)=>{handleReset(rowData)}} variant="contained" style={{backgroundColor: 'rgb(0, 90, 0)', color: 'white'}}>Reset</Button> }
  ];
  const [data, setData] = useState([]); // table data

  // for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);


  const handleReset = (rowData) =>{
    const da = new FormData();
    console.log("rr")
    da.append("reset", true)
    api.post(`/users/${rowData.id}`, da)
      .then((res) => {
        console.log(res.data);
        setSms("As alterações foram salvas com sucesso!")
        setAlertsms("success")
        handleClick();
      })
      .catch((error) => {
        console.log('Error');
        setSms("Por favor verifique as informações!")
        setAlertsms("error")
        handleClick();
      });
  };

  const handleRowUpdate = (newData, oldData, resolve) => {
    // validation
    const errorList = [];

    if (errorList.length < 1) {
      const da = new FormData();
    if (newData.name === undefined) {
      errorList.push('Insira o Nome');
    }
     
    if (newData.type == 0)
      da.append("type" , "Master");
    if(newData.type == 1)
      da.append("type" , "Júri");

      da.append('name', newData.name);
      da.append('email', newData.email);
      da.append('contest', newData.nameContests);
      
      console.log(newData.type)
      api.post(`/users/${newData.id}`, da)
        .then((res) => {
          console.log(res);
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          newData.name = res.data.name;
          newData.email = res.data.email;
          newData.nameContests = res.data.nameContests;
          newData.type = res.data.type;
          
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(['Ups. Erro ao actualizar os dados...']);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    // validation
    const errorList = [];
   
    if (newData.name === undefined) {
      errorList.push('Insira o Nome');
    }
    if (newData.email === undefined) {
      errorList.push('Insira o Email');
    }
    if (newData.type === undefined) {
      errorList.push('Insira o Tipo');
    }

    if (errorList.length < 1) { // no error
      const da = new FormData();

    if (newData.type == 0)
      da.append("type" , "Master");
    if(newData.type == 1)
      da.append("type" , "Júri");

      da.append('name', newData.name);
      da.append('contest', newData.nameContests);
      da.append('email', newData.email);

      api.post('/users', da)
        .then((res) => {
          console.log(res);
          const dataToAdd = [...data];
          newData.foto = res.data.foto;
          newData.name = res.data.name;
          newData.email = res.data.email;
          newData.nameContests = res.data.nameContests;
          newData.type = res.data.type;
          

          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(['Não foi possível adicionar dados. Server error!']);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    api.delete(`/users/${oldData.id}`)
      .then((res) => {
        console.log(res);
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(['Falha ao eliminar! Server error']);
        setIserror(true);
        resolve();
      });
  };

  return (
    <>

      <Grid container spacing={1}>
        <Grid item xs={3} />
        <Grid item xs={12}>
          <div>
            {iserror
              && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
              )}
          </div>
          <MaterialTable
            title="Usuários"
            localization={{ body: { editRow: { deleteText: 'Deseja realmente eliminar?' } } }}
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
              onRowAdd: (newData) => new Promise((resolve) => {
                handleRowAdd(newData, resolve);
              }),
              onRowDelete: (oldData) => new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
              }),
            }}
          />
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertsms}>
          {sms}
        </Alert>
    </Snackbar>
    </>
  );
}

export default App;
