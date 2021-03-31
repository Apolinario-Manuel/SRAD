import React, { forwardRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
    Clock as ClockIcon
  } from 'react-feather';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box
} from "@chakra-ui/core";

import { AppContext } from '../../views/login/hooks/context';

import {
  IconButton
} from "@material-ui/core";
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
  Visibility as VisibilityIcon
} from "@material-ui/icons";


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

export default function Pedido() {
  const [data, setData] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [id, setId] = React.useState("");
  const [utente, setUtente] = React.useState("");
  const { data: dataContext } = useContext(AppContext);
  let navigate = useNavigate();

  React.useEffect(() => {
    api
      .get(
        `/candidatossubmetidos/${dataContext?.state?.usuario?.contest}`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setData(response.data);
      });
  }, []);

  let columns = [
    { title: <ClockIcon />, render: (rowData) => <span 
        data-toggle="tooltip" 
        data-placement="top" 
        data-html="true" 
        title 
        data-original-title="Pedido Submetido há 2 mêss<br/>O tempo máximo de submissão para este tipo de pedido é de 15 dias.">
            <span style={{position: "relative"}}><span style={{position: "absolute", top: "-6px", left: "10px", color: "orange", fontSize: "22px"}} >●</span>
        </span>
        </span> 
    },
    { title: "Referência", field: "reference" },
    { title: "Código", field: "key_sepe" },
    { title: "Actualização", field: "updated_at" },
    //{ title: "Serviço", field: "identity_card"},
    { title: "Utente", field: "name", editable: "never" },
    { title: "Estado", field: "order_state" },
    { title: "Categoria", field: "category" },
    { title: "Pagamento", field: "payment_state" },
    //{ title: "Responsável", field: "name", editable: "never" },
    {
      title: "Opções",
      render: (rowData) => (
        <IconButton
          aria-label="View"
          onClick={() => {
            navigate(`/app/detalhe/${rowData.id}`);
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
            style={{ boxShadow: "none" }}
            title="Pedidos"
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
            options={{exportButton: false}}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
