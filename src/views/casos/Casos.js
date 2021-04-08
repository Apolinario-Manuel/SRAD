/* eslint-disable */
import React, { useState, useEffect, forwardRef , useContext} from 'react';

import Grid from '@material-ui/core/Grid';
import GroupButton from '../../components/GroupButton'
import MaterialTable from 'material-table';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box
} from "@chakra-ui/core";
import {
  IconButton
} from "@material-ui/core";
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
  Visibility as VisibilityIcon
} from '@material-ui/icons';

import api from '../../services/api';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../views/login/hooks/context';

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

function Casos() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const [show, setShow] = React.useState(false);
  const [id, setId] = React.useState("");
  const [utente, setUtente] = React.useState("");
  let navigate = useNavigate();

  const [sms, setSms] = useState();
  const [alertsms, setAlertsms] = useState();
  const [open, setOpen] = React.useState(false);
  const [contests, setContests] = useState({});
  const { data: dataContext } = useContext(AppContext);

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
    api.get(`/casos/casosnome/${dataContext?.state?.usuario?.municipio}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log('Error');
      });
    
      api.get('/doencas')
      .then((res) => {

        let json = {}

        res.data.map((item, pos) => {
          json = {...json, [item.id]:item.nome}
        })
        setContests(json);
      })
      .catch((error) => {
        console.log('Error');
      });

  }, []);

  const columns = [
    { title: "#", field: "id", editable: "never" },
    { title: 'Quantidade', field: 'quantidade'},
    { title: 'Tipo', field: 'tipo', render: (rowData) => <p >{(rowData.tipo == "M") ? "Morte": (rowData.tipo == "R") ? "Recuperado": "Activo"}</p> , initialEditValue: '0', lookup: { 0: 'Morte', 1: 'Recuperado', 2: 'Activo' }},
    { title: 'Doença', field: 'doenca', render: (rowData) => <p>{ rowData.doenca }</p> ,initialEditValue: '0', lookup: contests},
    { title: 'Data', field: 'date', editable: "never"},
  ];
  const [data, setData] = useState([]); // table data

  // for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);


  const handleRowUpdate = (newData, oldData, resolve) => {
    // validation
    const errorList = [];

    if (errorList.length < 1) {
      const da = new FormData();

    if (newData.tipo == 0)
      da.append("tipo" , "M");
    if(newData.tipo == 1)
      da.append("tipo" , "R");
    if(newData.tipo == 2)
      da.append("tipo" , "A");

      da.append('quantidade', newData.quantidade);
      da.append('doenca', newData.doenca);
      da.append('municipio', dataContext?.state?.usuario?.municipio)
      da.append('usuario', dataContext?.state?.usuario?.id)
      
    
      api.post(`/casos/${newData.id}`, da)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          newData.id = res.data.id;
          newData.quantidade = res.data.quantidade;
          newData.doenca = res.data.doenca;
          newData.tipo = res.data.tipo;
          newData.criado_em = res.data.criado_em;
          newData.date = res.data.date;
          
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setErrorMessages([]);
          setIserror(false);
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
   
    if (errorList.length < 1) { // no error
      const da = new FormData();

    if (newData.tipo == 0)
      da.append("tipo" , "M");
    if(newData.tipo == 1)
      da.append("tipo" , "R");
    if(newData.tipo == 2)
      da.append("tipo" , "A");

      da.append('quantidade', newData.quantidade);
      da.append('doenca', newData.doenca);
      da.append('municipio', dataContext?.state?.usuario?.municipio)
      da.append('usuario', dataContext?.state?.usuario?.id)
      api.post(`/casos`, da)
        .then((res) => {
          console.log(res);
          const dataToAdd = [...data];
          newData.id = res.data.id;
          newData.quantidade = res.data.quantidade;
          newData.doenca = res.data.doenca;
          newData.tipo = res.data.tipo;
          newData.criado_em = res.data.criado_em;
          newData.date = res.data.date;
          

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
    api.delete(`/casos/${oldData.id}`)
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
    <Flex bg="#f2f3f8" width="100%">
    <Flex flexDir="column" width="90%" m="0px auto" paddingTop="80px">
      
      {show ? (
        <form>
          <Box display="flex" m="0px auto 8px auto">
            <FormControl width="120px">
              <FormLabel>Código Sepe</FormLabel>
              <Input
                type="text"
                focusBorderColor="#022480"
                onChange={(event) => setId(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl width="160px" ml={3}>
              <FormLabel>Nome do Utente</FormLabel>
              <Input
                type="text"
                focusBorderColor="#022480"
                onChange={(event) => setUtente(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl width="160px" ml={3}>
              <FormLabel>Nota</FormLabel>
              <Input
                type="text"
                focusBorderColor="#022480"
                onChange={(event) => setUtente(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl width="160px" ml={3}>
              <FormLabel>Grau Acadêmico</FormLabel>
              <Input
                type="text"
                focusBorderColor="#022480"
                onChange={(event) => setUtente(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl width="160px" ml={3}>
              <FormLabel>Idade</FormLabel>
              <Input
                type="text"
                focusBorderColor="#022480"
                onChange={(event) => setUtente(event.currentTarget.value)}
              />
            </FormControl>
          </Box>
        </form>
      ) : (
        ""
      )}
      <Box>
      <MaterialTable
            title="Casos"
            columns={columns}
            data={data}
            icons={tableIcons}
            localization={{
              body: {
                emptyDataSourceMessage: "Nenhum registro para exibir",
              },
              toolbar: {
                searchTooltip: "Pesquisar",
              },
              pagination: {
                labelRowsSelect: "linhas",
                labelDisplayedRows: "{count} de {from}-{to}",
                firstTooltip: "Primeira página",
                previousTooltip: "Página anterior",
                nextTooltip: "Próxima página",
                lastTooltip: "Última página",
                searchTooltip: "Pesquisar",
                searchPlaceholder: "Pesquisar",
              },
            }}

            editable={(dataContext?.state?.usuario?.tipo == "DP") ? false : {
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
      </Box>
    </Flex>
  </Flex>
  );
}

export default Casos;
