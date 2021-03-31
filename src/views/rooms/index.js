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

const Rooms = () => {
  const [data, setData] = React.useState([]);
  const { data: dataContext } = useContext(AppContext);
  const navigate = useNavigate();

  let columns = [
    { title: "Nome da Sala", field: "description", editable: "never" },
    { title: "Número da Sala", field: "number", editable: "never" },
    { title: "Qtd de candidatos", field: "quantity_candidates" },
    { title: "Limite de candidatos", field: "limit_candidates" },
    { title: "Categoria", field: "categoryName" },
    {
      title: "Entrar",
      render: (rowData) => (
        <Button
        mb={2}
        bg="#022480"
        color="#F0F0F0"
        isDisabled={rowData?.quantity_candidates == 0 ? true : false}
        _hover={{ backgroundColor: "#fff", color: "#022480" }}
        onClick={() => {localStorage.setItem("roomName", rowData.description ); navigate(`/app/sala/${rowData.id}`)} }
        variant="outline"
      >
        Visualizar
      </Button>
      ),
    },
  ];

  React.useEffect(() => {
    api
      .get(`/todasalas/${dataContext?.state?.usuario?.contest}`)
      .then((response) => {
        //  console.log(response.data);
        console.log("res:", response.data);
        setData(response.data);

        //setTime(response.data["exam_details"].duration);
      });
  }, []);
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <MaterialTable
        style={{ boxShadow: "none", width: "100%"}}
        title=""
        localization={{
            body: {
              emptyDataSourceMessage: 'Nenhum registro para exibir'
            },
            toolbar: {
              searchTooltip: 'Pesquisar'
            },
            pagination: {
              labelRowsSelect: 'linhas',
              labelDisplayedRows: '{count} de {from}-{to}',
              firstTooltip: 'Primeira página',
              previousTooltip: 'Página anterior',
              nextTooltip: 'Próxima página',
              lastTooltip: 'Última página',
          searchTooltip:'Pesquisar',
          searchPlaceholder:'Pesquisar'
            }
          }}
        columns={columns}
        data={data}
        icons={tableIcons}
        options={{exportButton: false}}
      />
      </Container>
    </Page>
  );
};

export default Rooms;
