import React, {useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import api from "../../services/api";
import { AppContext } from '../login/hooks/context';
import { forwardRef } from "react";
import MaterialTable from "material-table";

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
  Visibility as VisibilityIcon,
  
} from "@material-ui/icons";

import IconButton from "@material-ui/core/IconButton";

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

const Candidatos = () => {
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();

  let columns = [
    { title: "Nome do Utente", field: "name", editable: "never" },
    { title: "Código SEPE", field: "key_sepe" },
    { title: "Bilhete de Identidade", field: "identity_card"},
    { title: "Categoria", field: "category"},
    { title: "Gênero", field: "gender" },
    { title: "Nota", 
      field: "score", 
      render: rowData => <p> { (rowData.score == null) ? "Pendente": rowData.score}</p> 
    },
    { 
      title: "Resultado Final", 
      field: "resultFinal" ,
      render: rowData => <p> { (rowData?.score >= 10) ? "Aprovado" : (rowData.score == null) ? "Pendente": "Reprovado"}</p>
    },
    {
      title: "Ver Prova",
      render: (rowData) => (
        <IconButton
          aria-label="View"
          disabled={(rowData.score == null)}
          onClick={() => {
            navigate(`/app/resultadmin/${rowData.id}`);
            localStorage.setItem("nomeUtente", rowData.name);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  
  const classes = useStyles();
  const { data: dataContext } = useContext(AppContext);

  React.useEffect(() => {
    api
      .get(`/candidatosaprovados/${dataContext?.state?.usuario.contest}`)
      .then((response) => {
        //  console.log(response.data);
        console.log("res:", response.data);
        setData(response.data);

      });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth={false}>
        <MaterialTable
        style={{ boxShadow: "none", width: "100%"}}
        title={`Lista de Candidatos`}
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

export default Candidatos;
