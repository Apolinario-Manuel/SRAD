import React,{ forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

import {
  makeStyles,
  IconButton,
} from '@material-ui/core'

import {
  Visibility as VisibilityIcon,
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
  ViewColumn
} from '@material-ui/icons'

import { Button, Flex  } from "@chakra-ui/core";

import MaterialTable from "material-table";


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


function CandidatosCat(props) {

  const [data, setData] = React.useState([]);
  const { id } = useParams();
  const history = useNavigate();

  React.useEffect(() => {
    api
      .get(`/candidatoscategoria/${id}`)
      .then((response) => {
        //  console.log(response.data);
        console.log("res:", response.data);
        setData(response.data.data);

        //setTime(response.data["exam_details"].duration);
      });
  }, []);

  let columns = [
    { title: "Nome do Utente", field: "name", editable: "never" },
    { title: "Código SEPE", field: "key_sepe" },
    { title: "Bilhete de Identidade", field: "identity_card"},
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
            history(`/app/resultadmin/${rowData.id}`);
            localStorage.setItem("nomeUtente", rowData.name);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];


  return (
    <Flex bg="#f2f3f8" width="100%">
    <div style={{ width: "90%", margin: "0px auto", paddingTop:"40px"}}>
      <Button
        mb={2}
        bg="#F0F0F0"
        color="#022480"
        _hover={{ backgroundColor: "#022480", color: "#fff" }}
        variant="outline"
        onClick={() => history(-1)}
      >
        Voltar
      </Button>
      
      <MaterialTable
        style={{ boxShadow: "none" }}
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
      />
    </div>
    </Flex>
  );
}

export default CandidatosCat;
