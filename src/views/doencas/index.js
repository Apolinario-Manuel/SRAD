import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { AppContext } from '../login/hooks/context';
import Page from 'src/components/Page';
import api from "../../services/api";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Button } from "@chakra-ui/core";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};




const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const Doencas = () => {
  const [data, setData] = React.useState([]);
  const { data: dataContext } = useContext(AppContext);
  const navigate = useNavigate();
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  let columns = [
    { title: "id", field: "id", editable: "never" },
    { title: "Nome da Doença", field: "nome"},
    { title: "Data de Criação", field: "criado_em", editable: "never"},
  ];

  React.useEffect(() => {
    api
      .get(`/doencas`)
      .then((response) => {
        //  console.log(response.data);
        console.log("res:", response.data);
        setData(response.data);

        //setTime(response.data["exam_details"].duration);
      });
  }, []);
  const classes = useStyles();

  const handleRowUpdate = (newData, oldData, resolve) => {
    // validation
    const errorList = [];

    if (errorList.length < 1) {
      const da = new FormData();

      da.append('nome', newData.nome);
      
      api.post(`/doencas/${newData.id}`, da)
        .then((res) => {
          console.log(res);
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          newData.nome = res.data.nome;
          
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
   


    if (errorList.length < 1) { // no error
      const da = new FormData();

      da.append('nome', newData.nome);

      api.post('/doencas', da)
        .then((res) => {
          console.log(res);
          const dataToAdd = [...data];
          newData.nome = res.data.nome;
          newData.id = res.data.id;
          newData.criado_em = res.data.criado_em;
          
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
    api.delete(`/doencas/${oldData.id}`)
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
    <Page
      className={classes.root}
      title="Doenças"
    >
      <Container maxWidth={false}>
      <MaterialTable
            title="Doenças"
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
            options={{exportButton: true}}
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
      </Container>
    </Page>
  );
};

export default Doencas;
