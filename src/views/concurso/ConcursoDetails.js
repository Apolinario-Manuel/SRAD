/* eslint-disable */
import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import api from "../../services/api";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { AppContext } from '../../views/login/hooks/context';
import Snackbar from '@material-ui/core/Snackbar';
import swal from 'sweetalert';
import MuiAlert from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useParams } from 'react-router';
import { Button } from "@chakra-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const ConcursoDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  
  const { data: dataContext } = useContext(AppContext);
  const { id } = useParams();
  const [sms, setSms] = useState();
  const [alertsms, setAlertsms] = useState();
  const [open, setOpen] = React.useState(false);
  const [data2, setData2]= React.useState([]);
  const [ministry, setMinistry] = React.useState([]);
  const [selectedDate , setSelectedDate] = React.useState(new Date());
  const [selectedDateInicio, setSelectedDateInicio] = React.useState(new Date());
  const [values, setValues] = useState({
    data_inicio: '',
    due_date: '',
    created_at: '',
    entity: '',
    id: '',
    ministry: '',
    idMinistry:'',
    name: '',
    user: '',
    useremail: ''
  });
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dados = new FormData();

    dados.append('data_inicio', values.data_inicio);
    dados.append("due_date" , values.due_date);
    dados.append("entity" , values.entity);
    dados.append("ministry" , values.idMinistry);
    dados.append('name', values.name);
    dados.append("user" , dataContext?.state?.usuario?.id);
    api.post(`/concursos/${id}`, dados)
      .then((res) => {
        console.log(res);
        {/*dataContext.setState({
          usuario:{
            email: res?.data?.email,
            foto: res?.data?.foto,
            id: res?.data?.id,
            nome: valor ,
            tipo: res?.data?.tipo
        }})*/}
        setSms("As alterações foram salvas com sucesso!")
        setAlertsms("success")
        handleClick();
      })
      .catch((error) => {
        setSms("Por favor verifique as informações!")
        setAlertsms("error")
        handleClick();
        console.log(error);
      });
    
  }

  React.useEffect(() => {
    // setUser(auth.getCurrentUser())
    /* api.get("/provas").then((response) => {
      //  console.log(response.data);
      console.log(response);
      setData(response.data);
    }); */

    api
      .get(
        `/concursos/${id}`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setValues(response.data);
      });

      api
      .get(
        `/ministerios`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        if(response.status == 200 && !response.warning){
          setMinistry(response.data);
        }

      });
  }, []);

  return (
    <>
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Informações do Concurso"
          title="Concurso"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Descricao do Concurso"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              {
                values.entity ?
                  <TextField
                    fullWidth
                    label="Entidade"
                    name="entity"
                    onChange={handleChange}
                    value={values.entity}
                  />
                :

                <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Ministério</InputLabel>
                <Select
                  
                  native
                  value={(values?.idMinistry != null)? values.idMinistry: ""}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      ['idMinistry']: e.target.value,
                      ['ministry']: e.target.value
                    })
                  }
                  inputProps={{
                    name: 'ministry',
                    id: 'age-native-simple',
                  }}
                >
                  {
                    ministry.map( (item, index) => {
                      if(item.name == values.ministry)
                        return <option value={item.id}> {values.ministry} </option>
                      else 
                        return  <option value={item.id} > {item.name} </option>
                    })
                  }
                </Select>
              </FormControl>
              }
              
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data de Início:"
                    value={(values?.data_inicio)? values.data_inicio: selectedDateInicio}
                    onChange={(date) => {
                      let data = `${date?.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`
                      setValues({
                        ...values,
                        ['data_inicio']: data
                      });
                    } }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                <KeyboardDatePicker
                    disableToolbar
                    fullWidth
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Data de Término:"
                    value={(values?.due_date)? values.due_date: selectedDate}
                    onChange={(date) => {
                      let data = `${date?.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`
                      setValues({
                        ...values,
                        ['due_date']: data
                      });
                    } }
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                style={{marginTop: 16}}
                fullWidth
                disabled
                label="Criado em:"
                name=""
                value={values.created_at}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                style={{marginTop: 16}}
                fullWidth
                disabled
                label="Criado por:"
                name=""
                onChange={handleChange}
                value={values.useremail}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            border="1px solid #022480"
            bg="rgb(44, 56, 126);"
            color="white"
            padding="5px 30px"
            type="submit"
            color="white"
            variant="contained"
            _hover={{ backgroundColor: '#fff', color: '#022480' }}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Card>
    </form>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertsms}>
          {sms}
        </Alert>
    </Snackbar>
    </>
  );
};

ConcursoDetails.propTypes = {
  className: PropTypes.string
};

export default ConcursoDetails;
