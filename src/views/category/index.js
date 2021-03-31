/* eslint-disable */
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Typography,
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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Page from 'src/components/Page';
import api from '../../services/api';
import swal from 'sweetalert';

import {
  Flex, Divider as Dv, Icon, CircularProgress, Heading, Button as Btn
} from '@chakra-ui/core';
import CardSala from '../../components/CardSala';

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

const Category = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);

  const [formQtd, setFormQtd] = React.useState('');
  const [formDescription, setFormDescription] = React.useState('');
  const [numberSala, setNumberSala] = React.useState('');
  const [locationSala, setLocationSala] = React.useState('');
  const [formDuration, setFormDuration] = React.useState('');
  const [formhour, setFormHour] = React.useState('');
  const [selectedDateInicio, setSelectedDateInicio] = React.useState(new Date() - new Date());
  const [data2, setData2]= React.useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const cancelAddForm = () => {
    handleClose();
    setFormQtd("");
    setFormDescription("");
  };

  const createForm = () => {
    handleClose();
    let da = new FormData();
    let format = `${selectedDateInicio?.split("/")[1]}/${selectedDateInicio?.split("/")[0]}/${selectedDateInicio?.split("/")[2]}`

    da.append("description", formDescription);
    da.append("contest_category", id);
    da.append("location", locationSala);
    da.append("duration", formDuration);
    da.append("limit_candidates", formQtd);
    da.append("schedule", format + " " + formhour);
    da.append("number", numberSala);
    api
      .post(`/salas`, da)
      .then((response) => {
        
        if (response.status == 200) {
          swal({
            title: `A sala foi criada com sucesso!`,
            icon: "success",
            button: "Ok!",
          });
          setData2([
            ...data2,
            {
              id: response.data.id,
              description: response.data.description,
              limit_candidates: response.data.limit_candidates,
              duration: response.data.duration,
              quantity_candidates: response.data.quantity_candidates,
              location: response.data.location,
              number: response.data.number,
              schedule: response.data.schedule
            },
          ]);
        }
        else{
          swal({
            title: `Não foi possível criar a Sala!`,
            icon: "error",
            button: "Ok!",
          });
        }
        navigate(`/app/categoria/${id}`);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCandidates = (e) => {
    
    if(localStorage.getItem('distribuited') == 0)
    {

      swal({
        title: " Tens a certeza que pretendes distribuir ?",
        text: "Esta acção irá distribuir todos candidatos nas salas!",
        icon: "warning",
        buttons: ["Cancelar", true],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          setIsLoading(true);
          api
          .get(
            `/candidatosparasalas/${id}`
          )
          .then((response) => {
            //  console.log(response.data);
            console.log(response);
            localStorage.setItem(
              'distribuited',
              1
            );
            setData2(response.data);
            setIsLoading(false);
            swal({
              title: 'Os candidatos foram distribuidos com sucesso!',
              icon: 'success',
              button: 'Ok!',
            });
          });
        } else {
          
        }
      });
      
    }
    else{

      swal({
        title: " Tens a certeza que pretendes desfazer ?",
        text: "Esta acção irá eliminar todas informações dos candidatos!",
        icon: "warning",
        buttons: ["Cancelar", true],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          setIsLoading(true);
          api
          .get(
            `/resetarcategoria/${id}`
          )
          .then((response) => {
            //  console.log(response.data);
            console.log(response);
            localStorage.setItem(
              'distribuited',
              0
            );
            setData2(response.data.data);
            setIsLoading(false);
            swal({
              title: 'A distribuição foi anulada com sucesso!',
              icon: 'success',
              button: 'Ok!',
            });
          });
        } else {
          
        }
      });

    }
    
  };

  React.useEffect(() => {

    api
      .get(
        `/salas/${id}`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setData2(response.data);
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
            <DialogTitle id="form-dialog-title">Criar Sala</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Nome da Sala"
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
                id="description"
                label="Nº da Sala"
                type="number"
                fullWidth
                value={numberSala}
                onChange={(e) => {
                  setNumberSala(e.target.value);
                }}
              />
              <br></br>
              
              <TextField
                
                margin="dense"
                id="description"
                label="Localização da Sala"
                type="text"
                fullWidth
                value={locationSala}
                onChange={(e) => {
                  setLocationSala(e.target.value);
                }}
              />

              <br></br>

              <TextField
                id="name"
                label="Limite de candidatos"
                type="number"
                fullWidth
                value={formQtd}
                onChange={(e) => {
                  setFormQtd(e.target.value);
                }}
              />
              <br></br>
              <TextField
                id="datetime-local"
                label="Duração da Prova"
                type="time"
                defaultValue="14:30"
                value={formDuration}
                onChange={(e) => {
                  setFormDuration(e.target.value);
                }}
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data da prova:"
                    value={selectedDateInicio}
                    onChange={(date) => {
                     
                      setSelectedDateInicio(`${date?.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`);
                    } }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
              </MuiPickersUtilsProvider>

              <br></br>

              <TextField
                id="datetime-local"
                label="Hora"
                type="time"
                defaultValue="14:30"
                value={formhour}
                onChange={(e) => {
                  setFormHour(e.target.value);
                }}
                fullWidth
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={cancelAddForm} color="primary">
                Cancelar
              </Button>
              <Button 
                onClick={createForm} 
                color="primary"
                disabled={
                  !formDescription || 
                  !numberSala || 
                  !locationSala || 
                  !formQtd || 
                  !formDuration || 
                  !selectedDateInicio || 
                  !formhour
                }
              >
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
            <Btn
              as={Link} to="/app/categoryList"
              mb={3}
              bg="#fff"
              color="#022480"
              _hover={{ backgroundColor: '#022480', color: '#fff' }}
              variant="outline"
            >
              Voltar
            </Btn>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>

            <Card>
              <CardHeader title="Bolsa de Perguntas" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item lg={12}>
                    <Flex
                      width="100%"
                      height="100%"
                      backgroundColor="#fff"
                      borderRadius="md"
                      border="2px solid #f2f3f8"
                      flexDir="column"
                      align="flex-start"
                      padding={10}
                    >
                      <Typography gutterBottom variant="h5">
                        Total de Perguntas:
                        {' '}
                        {localStorage.getItem('totalCat')}
                      </Typography>

                      <Dv color="f2f3f8" width="100%" margin="10px auto" />
                      <Link to={`/app/form/${id}`}>
                        <Btn
                          bg="#022480"
                          color="#fff"
                          padding="5px 100px"
                          _hover={{ backgroundColor: '#002ead' }}
                        >
                          {' '}
                          <Icon name="add" />
                          {' '}
                          Pergunta
                        </Btn>
                      </Link>
                    </Flex>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Card style={{ marginBottom: '10px', boxShadow: 'none' }}>
              <CardHeader title="Candidatos" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item lg={12}>
                    <Flex
                      width="100%"
                      height="100%"
                      backgroundColor="#fff"
                      borderRadius="md"
                      border="2px solid #f2f3f8"
                      flexDir="column"
                      align="flex-start"
                      padding={10}
                    >
                      <Typography gutterBottom variant="h5">
                        Total de Candidatos:
                        {' '}
                        {localStorage.getItem('totalCand')}
                      </Typography>

                      <Dv color="f2f3f8" width="100%" margin="10px auto" />
                      <Link to={`/app/candidatoscat/${id}`}>
                        <Btn
                          bg="#022480"
                          color="#fff"
                          padding="5px 100px"
                          _hover={{ backgroundColor: '#002ead' }}
                        >
                          Visualizar
                        </Btn>
                      </Link>
                    </Flex>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
            </Card>
          </Grid>
          <Grid item lg={12}>
            <Card style={{ boxShadow: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardHeader title="Salas" />
                <Flex>
                  {
                    localStorage.getItem('totalCat') < 20
                      ? (
                        <Heading as="h6" size="xs" color="#ff0000" mt="auto" mb="auto" mr={3}>
                          Obs: Adiciona no mínimo 20 perguntas para distribuir
                        </Heading>
                      ) : ''
                  }

                  <Btn
                    isLoading={isLoading}
                    mt={3}
                    bg="#022480"
                    color="#fff"
                    padding="5px 40px"
                    isDisabled={!((localStorage.getItem('totalCat') >= 20))}
                    onClick={() => { handleCandidates()}}
                    _hover={{ backgroundColor: '#002ead' }}
                  >
                    { localStorage.getItem(
                      'distribuited'
                    ) == 1 ? "Desfazer Distribuição" : "Distribuir Candidatos"}
                  </Btn>
                  <Btn
                    onClick={handleClickOpen}
                    isDisabled={localStorage.getItem(
                      'distribuited'
                    ) == 1}
                    m={3}
                    border="1px solid #022480"
                    bg="white"
                    color="#022480"
                    padding="5px 30px"
                    _hover={{ backgroundColor: '#022480', color: '#fff' }}
                  >
                    Criar Sala
                  </Btn>
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
                        <CardSala
                          delete={setData2}
                          id={da.id}
                          nome={da.description}
                          qt={da.limit_candidates}
                          qtcandi={da.quantity_candidates}
                          time={da.duration}
                          hour={da.schedule}
                          location={da.location}
                          number={da.number}
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

export default Category;
