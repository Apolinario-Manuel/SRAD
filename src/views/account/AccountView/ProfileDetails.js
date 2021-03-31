/* eslint-disable linebreak-style */
import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import api from "../../../services/api";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { AppContext } from '../../../views/login/hooks/context';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  
  const { data: dataContext } = useContext(AppContext);
  const [erro, setErro] = useState(false)
  const [helper, setHelper] = useState("")
  const [sms, setSms] = useState();
  const [alertsms, setAlertsms] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [values, setValues] = useState({
    firstName: dataContext?.state?.usuario?.nome?.split(' ')[0],
    lastName: dataContext?.state?.usuario?.nome?.split(' ')[1],
    password: '',
    email: dataContext?.state?.usuario?.email,
    country: dataContext?.state?.usuario?.tipo
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
      const dados = new FormData();

      dados.append('email', values.email);
      dados.append("password" , values.password);
      dados.append("new_password" , values.new_password);
      dados.append("confirm_password" , values.confirm_password);
      api.post(`/users/${dataContext?.state?.usuario?.id}`, dados)
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
          if(res.status == 200){
            setSms("As alterações foram salvas com sucesso!")
            setAlertsms("success")
            handleClick();
          }else{
            setSms("As alterações não foram salvas!")
            setAlertsms("warning")
            handleClick();
          }

        })
        .catch((error) => {
          setSms("Por favor verifique as informações!")
          setAlertsms("error")
          handleClick();
          console.log(error);
        });
    
  }

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
          subheader="Editando informações"
          title="Perfil"
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
                label="Email"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Senha actual"
                name="password"
                type="password"
                onChange={handleChange}
                required
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Senha nova"
                name="new_password"
                type="password"
                onChange={handleChange}
                required
                value={values.new_password}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                error={erro}
                helperText={helper}
                label="Confirmar senha"
                name="confirm_password"
                type="password"
                onChange={ (e) => {

                  if(values.new_password != e.target.value){
                    setErro(true);
                    setHelper("Password diferente da nova")
                  }
                  else{
                    setErro(false);
                    setHelper("")
                  }

                  setValues({
                    ...values,
                    "confirm_password": e.target.value
                  });
                  
                }}
                required
                value={values.confirm_password}
                variant="outlined"
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
            type="submit"
            disabled={!values.password || !values.new_password || !values.confirm_password || values.new_password != values.confirm_password}
            color="primary"
            variant="contained"
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

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
