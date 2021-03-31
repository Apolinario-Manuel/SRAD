/* eslint-disable */
import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from '@material-ui/core';

import Page from 'src/components/Page';
import api from '../../services/api';
import swal from 'sweetalert';

import { useParams, useNavigate } from 'react-router-dom';
import {
  Flex, CircularProgress, Button as Btn
} from '@chakra-ui/core';

import CardProva from '../../components/CardProva';
import LatestProducts from './LatestProducts';
import ConcursoDetails from './ConcursoDetails';
import TotalCustomers from './TotalCustomers';
import TasksProgress from './TasksProgress';
import Budget from './Budget';
import TotalProfit from './TotalProfit';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));


const ConcursoList = () => {
  const [data, setData] = React.useState([]);
  const { id } = useParams();
  const [categoria, setCategoria] = React.useState([]);
  const [formQtd, setFormQtd] = React.useState('');
  const [formDescription, setFormDescription] = React.useState('');
  const [statistic, setStatistic] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });


  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const cancelAddForm = () => {
    handleClose();
    setFormQtd("");
    setFormDescription("");
  };

  const createForm = () => {
    handleClose();
    let da = new FormData();

    da.append("categoria", state.age);
    da.append("vacancies", formQtd);
    da.append("contest", id);
    api
      .post(`/categoriasconcurso`, da)
      .then((response) => {
        console.log(response.data.name);
        if (response.status == 200 && !response.warning) {
          swal({
            title: `A categoria foi associada com sucesso!`,
            icon: "success",
            button: "Ok!",
          });
          
          setData([
            ...data,
            {
              idContestCategory: response.data.idContestCategory,
              nome: response.data.name,
              cand: response.data.candidates,
              rooms: response.data.room,
              contest: response.data.contest,
              quest: response.data.numberOfQuestions,
            },
          ]);
        }
        else{
          swal({
            title: `Não foi possível associar a categoria!`,
            icon: "error",
            button: "Ok!",
          });
        }
       
      });
  };

  const handleClickOpen = () => {
    api
      .get(
        `/categorias/all`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        if(response.status == 200 && !response.warning){
          setCategoria(response.data);
          setOpen(true);
        }
        else
        swal({
          title: `Não foi possível associar categoria!`,
          icon: "error",
          button: "Ok!",
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {

    api
    .get(
      `/concursoestatiscas/${id}`
    )
    .then((response) => {
      //  console.log(response.data);
      console.log(response);
      setStatistic(response.data);
    });

      api
      .get(
        `/categorias/${id}`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setData(response.data);
      });
  }, []);
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Categoria"
    >
      <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Criar Categoria</DialogTitle>
            <DialogContent>
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Selecione a Categoria</InputLabel>
                <Select
                  
                  native
                  value={state.age}
                  onChange={handleChange}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  {
                    categoria.map( (item) => (
                      <option value={item.id}> {item.name} </option>
                    ))
                  }
                </Select>
              </FormControl>

              <br></br>

              <TextField
                id="name"
                label="Número de Vagas"
                type="number"
                fullWidth
                value={formQtd}
                onChange={(e) => {
                  setFormQtd(e.target.value);
                }}
              />
              
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelAddForm} color="primary">
                Cancelar
              </Button>
              <Button onClick={createForm} color="primary">
                Criar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      <Container maxWidth={false}>
        <Grid
          container
          spacing={1}
        >
        
          <Grid
            item
            lg={3} 
            md={6} 
            xs={12}
          >
            <Budget total={statistic.CandidaturasSubmetidas} />
          </Grid>
          <Grid
            item
            lg={3} 
            md={6} 
            xs={12}
          >
            <TasksProgress total={statistic.CandidaturasAprovadas} />
          </Grid>
          <Grid
            item
            lg={3} 
            md={6} 
            xs={12}
          >
            <TotalCustomers total={statistic.UtentesAprovados} />
          </Grid>
          <Grid
            item
            lg={3} 
            md={6} 
            xs={12}
          >
            <TotalProfit total={statistic.UtentesReprovados} />
          </Grid>
          <Grid item lg={9} md={9} xs={12}>
            <ConcursoDetails />
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <LatestProducts />
          </Grid>
          
          <Grid item lg={12} md={12} xs={12}>
            <Card style={{ boxShadow: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardHeader title="Categorias" />
                <Flex>
            
                  <Btn
                    onClick={handleClickOpen}
                    m={3}
                    border="1px solid #022480"
                    bg="#fff"
                    color="#022480"
                    padding="5px 30px"
                    _hover={{ backgroundColor: '#022480', color: '#fff' }}
                  >
                    Associar Categoria
                  </Btn>
                </Flex>
              </div>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>

                  { data.length == 0
                    ? (
                      <Grid
                        item
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        lg={12}
                      >
                        <CircularProgress isIndeterminate size="70px" thickness={0.1} />
                      </Grid>
                    )
                    : data.map((da) => (
                      <Grid item lg={4} lg={3} md={6} xs={12} >
                        <CardProva
                          notClick={true}
                          delete={setData} 
                          id={da.idContestCategory} 
                          nome={da.name} 
                          cand={da.candidates} 
                          rooms={da.room}
                          contest={da.contest}
                          quest={da.numberOfQuestions}
                          />
                    </Grid>
                    ))}
                </Grid>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
          
        </Grid>
      </Container>
    </Page>
  );
};

export default ConcursoList;
