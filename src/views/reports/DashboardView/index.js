/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable quotes */
/* eslint no-use-before-define: 0 */

import React, { useContext } from 'react';
import api from '../../../services/api';
import { AppContext } from '../../login/hooks/context';
import {
  Container,
  Grid,
  makeStyles,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import Page from 'src/components/Page';
import Bud from './Budget';
import Budget from '../../../components/Budget';
import LatestOrders from '../../../components/LatestOrders';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 0,
  },
}));

const datas = {
  // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: "Confirmados",
      type: "bar",
      data: [7, 14, 16, 9, 15, 17, 20, 7, 14, 16, 9, 15, 17, 20, 22, 34, 21, 10],
      fill: false,
      fontColor: "#fff",
      borderColor: "#290212",
      backgroundColor: "#0066ff",
      pointBorderColor: "#0066ff",
      pointBackgroundColor: "#0066ff",
      pointHoverBackgroundColor: "#0066ff",
      pointHoverBorderColor: "#0066ff",
      yAxisID: "y-axis-2",
    },
    {
      type: "bar",
      label: "Mortos",
      data: [5, 7, 20, 8, 10, 13, 10, 10, 7, 20, 8, 10, 13, 5, 20, 22, 34, 21, 10],
      fill: false,
      backgroundColor: "#ff4d4d",
      borderColor: "#ff4d4d",
      hoverBackgroundColor: "#ff4d4d",
      hoverBorderColor: "#ff4d4d",
      yAxisID: "y-axis-1",
    },
    {
      type: "bar",
      label: "Recuperados",
      data: [2, 4, 15, 5, 7, 8, 9, 8, 6, 14, 6, 8, 9, 3, 18, 19, 26, 17, 8],
      fill: false,
      backgroundColor: "orange",
      borderColor: "orange",
      hoverBackgroundColor: "orange",
      hoverBorderColor: "orange",
      yAxisID: "y-axis-1",
    },
  ],
};

const Dashboard = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([{}]);
  const { data: dataContext } = useContext(AppContext);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  React.useEffect(() => { 
 
    localStorage.setItem("last", "admin");
    api
      .get(`/dados/${dataContext?.state?.usuario.contest}`)
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setData(response.data);
      });
  
  }, []);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
          <Button
              color="primary"
              variant="contained"
              disabled={ (age == '' ? true : false) }
              style={{ color: '#fff', "margin-bottom": "15px" }}
              onClick={() => window.open(`https://enapp.desenvolvimento.gov.ao/api/relatorio/${age}/${localStorage.getItem('idContestCategory')}/${dataContext?.state?.usuario?.id}`, '_blank')}
            >
            Gerar Relatório
          </Button>
          <FormControl style={{ color: '#fff', minWidth: 200, margin: '-10px 0px 15px 10px' }}>
            <InputLabel id="demo-simple-select-label">Tipo:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              <MenuItem value="listacandidatos">Relatório Por Todas Doenças</MenuItem>
              <MenuItem value="listaporgenero">Relatório Por Gênero</MenuItem>
              <MenuItem value="listafinal">Relatório Por Casos</MenuItem>
            </Select>
          </FormControl>
          { age == '' ?
            
            <span style={{color: "#000"}}> <br/>Obs: Selecione o tipo de relatório para conseguir gerar</span>:
            ``
          }
        <Grid
          container
          style={{ height: "85vh" , marginTop: "5px"}}
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
            
          >
            <Bud sala="30" />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <TotalCustomers utentes="17.478.000" />
          </Grid>
          <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <TasksProgress cat="5.234.000" />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders
              data={datas}
              label={[
                "Luanda",
                "Benguela",
                "Malanje",
                "Namibe",
                "Bié",
                "Cuanza-Sul",
                "Bengo",
                "Cunene",
                "Moxico",
                "Huambo",
                "Cabinda",
                "Zaire",
                "Cuanza-Norte",
                "Huíla",
                "Uíge",
                "Lunda-Norte",
                "Lund-Sul",
                "Cuando-Cubango",
              ]}
            />
          </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <Budget
                data={{
                  labels: [
                    "Malária",
                    "Covid",
                    "Câncer",
                  ],
                  datasets: [
                    {
                      data: [60, 20, 20],
                      backgroundColor: [
                        "#ff4d4d",
                        "#ff8d9d",
                        "#ff10d3",
                      ],
                      hoverBackgroundColor: [
                        "#ff4d4d",
                        "#ff8d9d",
                        "#ff10d3",
                      ],
                    },
                  ],
                }}
              />
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
