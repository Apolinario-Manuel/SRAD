import React, { useEffect, createContext, useState } from 'react';

import swal from 'sweetalert';
import { useNavigate, useLocation } from 'react-router-dom';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import api from '../../../services/api'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from '@material-ui/core';

export const AppContext = createContext({
  state: {},
  setState: () => null
});

function ContextProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useLocalStorage('@app');
  const [helper, setHelper] = useState("")
  const [erro, setErro] = useState(false)
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    password: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const createForm = () => {
    handleClose();
  
      let dados = new FormData();
 
      dados.append("new_password" , values.new_password);
      dados.append("confirm_password" , values.confirm_password);
    
      api.post(`/actualizarsenha/${state?.usuario?.id}`, dados)
        .then((res) => {
        
          if(res.status == 200 ){
            swal({
              title: `Senha actualizada, faça o login novamente com a nova senha!`,
              text: '',
              icon: 'info',
              button: 'Ok',
            }).then((value) => {
              setState(null)
              handleClose()
            });
          }else{
            swal({
              title: `Não foi possível actualizar as informações, consulte o Admin!`,
              text: '',
              icon: 'error',
              button: 'Ok!',
            }).then((value) => {
              setState(null)
              handleClose()
            });
          }

        })
        .catch((error) => {
          swal({
            title: `Verifique a sua conexão!`,
            text: '',
            icon: 'error',
            button: 'Ok!',
          }).then((value) => {
            setState(null)
            handleClose()
          });
          console.log(error);
        });

    
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (() => {
      if (state?.usuario?.type && !location.pathname.includes('app')) {
        navigate('/app/dashboard');
      }

      if (!state?.usuario.type && !location.pathname.includes('loginAdmin')) {
        navigate('/loginAdmin')
      }
    })();
  }, [state]);

  return (
    <AppContext.Provider
      value={
        {
          data: {
            state,
            setState
          }
        }
      }
    >
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <DialogTitle id="form-dialog-title">Actualizar Senha</DialogTitle>
          <DialogContent>

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

            <br></br>
            <br></br>
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


            <br></br>
          </DialogContent>
          <DialogActions>
            <Button 
                onClick={() => {setState(null); handleClose() }} 
                color="primary" 
              >
                Cancelar
            </Button>
            <Button 
              onClick={createForm} 
              color="primary" 
              disabled={!values.new_password || !values.confirm_password || values.new_password != values.confirm_password}
            >
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {children}
    </AppContext.Provider>
  );
}

export default ContextProvider;
