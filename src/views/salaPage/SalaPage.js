import React, { forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Box,
  Heading,
  Divider,
} from "@chakra-ui/core";

import {
  IconButton
} from '@material-ui/core'

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
} from '@material-ui/icons'

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

export default function SalaPage() {
  const [data, setData] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [id, setId] = React.useState("");
  const [utente, setUtente] = React.useState("");
  let navigate = useNavigate();
  let { id: idSala } = useParams();

  React.useEffect(() => {
    api
      .get(
        `/candidatosporsalas/${idSala}`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setData(response.data);
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

  return (
    <Flex bg="#f2f3f8" width="100%">
      <Flex flexDir="column" width="98%" m="0px auto" paddingTop="80px">
        <Heading size="lg"> {localStorage.getItem("roomName")} </Heading>
        <Divider />
        <Box m="8px 0px">

          <Button
            
            bg="#fff"
            color="#022480"
            _hover={{ backgroundColor: "#022480", color: "#fff" }}
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
          <Button
              ml={5}
              bg="#022480"
              color="#fff"
              _hover={{ backgroundColor: "#fff", color: "#022480" }}
              variant="outline"
              onClick={() => window.open(`https://enapp.desenvolvimento.gov.ao/api/relatorio/listarsalas/${idSala}`, '_blank')}
            >
            Gerar Relatório
          </Button>
        </Box>

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
            style={{ boxShadow: "none" }}
            title="Utentes"
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
            columns={columns}
            data={data}
            icons={tableIcons}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
