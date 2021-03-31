/* eslint-disable */
import React, { useContext } from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  InputLabel,
  FormControl
} from '@material-ui/core';
import { AppContext } from '../login/hooks/context';
import Page from 'src/components/Page';
import api from '../../services/api';
import swal from 'sweetalert';

import {
  Flex, CircularProgress, Button as Btn
} from '@chakra-ui/core';
import CardConcurso from '../../components/CardConcurso';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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

const Concurso = () => {
  let data_inicio = "";
  let data_fim = "";
  const [ministry, setMinistry] = React.useState([]);
  const { data: dataContext } = useContext(AppContext);
  const [formQtd, setFormQtd] = React.useState('');
  const [formDescription, setFormDescription] = React.useState('');
  const [entidade, setEntidade] = React.useState('');
  const [data2, setData2]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedDate , setSelectedDate] = React.useState(new Date());
  const [selectedDateInicio, setSelectedDateInicio] = React.useState(new Date());

  const classes = useStyles();
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
    if(typeof selectedDateInicio == "string" && typeof selectedDate == "string"){
      let da = new FormData();
      console.log(typeof selectedDateInicio == "string")
      da.append("name", formDescription);
      da.append("ministry", state.age);
      da.append("entity", entidade);
      da.append("data_inicio", `${selectedDateInicio?.split("/")[1]}/${selectedDateInicio?.split("/")[0]}/${selectedDateInicio?.split("/")[2]}`)
      da.append("due_date", `${selectedDate?.split("/")[1]}/${selectedDate?.split("/")[0]}/${selectedDate?.split("/")[2]}`);
      da.append('user', dataContext?.state?.usuario?.id)
      api
        .post(`/concursos`, da)
        .then((response) => {
          console.log(response.data.name);
          if (response.status == 200 && !response.warning) {
            swal({
              title: `O concurso foi criado com sucesso!`,
              icon: "success",
              button: "Ok!",
            });
            setData2([
              ...data2,
              {
                id: response.data?.id,
                name: response.data?.name,
                entity: response.data?.entity,
                ministry: response.data?.ministry?.name,
                data_inicio: response.data?.start_date,
                due_date: response.data?.due_date
              },
            ]);
          }
          else{
            swal({
              title: `Não foi possível criar o Concurso!`,
              icon: "error",
              button: "Ok!",
            });
          }
        
        });
    }else
      swal({
        title: `Preencha todos campos`,
        icon: "warning",
        button: "Ok!",
      });
    
  };

  const handleClickOpen = () => {
    api
      .get(
        `/ministerios`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        if(response.status == 200 && !response.warning){
          setMinistry(response.data);
          setOpen(true);
        }
        else
        swal({
          title: `Não foi possível criar o Concurso!`,
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
        `/concursos`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setData2(response.data);
      });
  }, []);


  return (
    <Page
      className={classes.root}
      title="Concursos"
    >
      <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
          >
            <DialogTitle id="form-dialog-title">Criar Concurso</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Descrição do Concurso"
                type="text"
                fullWidth
                value={formDescription}
                onChange={(e) => {
                  setFormDescription(e.target.value);
                }}
              />

              <br></br>
              <TextField
                margin="dense"
                id="entidade"
                label="Entidade"
                type="text"
                fullWidth
                value={entidade}
                onChange={(e) => {
                  setEntidade(e.target.value);
                }}
              />

              <br></br>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Ministério</InputLabel>
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
                    ministry.map( (item) => (
                      <option value={item.id}> {item.name} </option>
                    ))
                  }
                </Select>
              </FormControl>


              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data de início:"
                    value={selectedDateInicio}
                    onChange={(date) => {
                      data_inicio = `${date?.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`
                      setSelectedDateInicio(data_inicio);
                    } }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
              </MuiPickersUtilsProvider>

              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data de término:"
                    value={selectedDate}
                    onChange={(date) => {
                      data_fim = `${date?.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`
                      setSelectedDate(data_fim);
                    } }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
              </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelAddForm} color="primary">
                Cancelar
              </Button>
              <Button onClick={createForm} color="primary" >
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
          <Grid item lg={12} md={12} xs={12}>
            <Card style={{ boxShadow: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardHeader title="Concursos" />
                <Flex>
                {/*
                  <Btn
                    onClick={handleClickOpen}
                    m={3}
                    border="1px solid #022480"
                    bg="white"
                    color="#022480"
                    padding="5px 30px"
                    _hover={{ backgroundColor: '#022480', color: '#fff' }}
                  >
                    Criar Concurso
                  </Btn>
                */}
                </Flex>
              </div>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>

                  { data2.length == 0
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
                    : data2.map((da) => (
                      <Grid item lg={4} md={6} xs={12}>
                        <CardConcurso
                          delete={setData2}
                          id={da.id}
                          name={da.name}
                          entidade={da.entity}
                          ministry={da.ministry}
                          data_inicio={da.data_inicio}
                          due_date={da.due_date}
                          
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

export default Concurso;
