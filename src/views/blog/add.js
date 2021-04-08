/* eslint-disable react/jsx-no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-multi-str */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';

import Page from 'src/components/Page';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import { Editor } from '@tinymce/tinymce-react';
import { useParams , useNavigate} from 'react-router-dom';
import api from 'src/services/api'
import { AppContext } from '../login/hooks/context';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',

    paddingTop: theme.spacing(0.8)
  },
  productCard: {
    height: '100%'
  },
  row: {
    padding: '16px'
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '16px'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Add2() {
  let navigate = useNavigate();
  const { id } = useParams();
  const classes = useStyles();
  const [file, setFile] = useState(React.createRef())
  const [field, setField] = useState('');
  const [edit, setEdit] = useState('');
  const [sms, setSms] = useState();
  const [alertsms, setAlertsms] = useState();
  const [open, setOpen] = React.useState(false);
  const { data: dataContext } = useContext(AppContext);
  const [doenca, setDoenca] = useState()
  const [allDoenca, setAllDoenca] = useState()

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    setEdit(content);
  };

  useEffect(() => {
    api
      .get(`/doencas`)
      .then((response) => {
        setAllDoenca(response.data);

      });
    if (id) {
      api.get('/informacoes')
        .then((res) => {
          res.data.map((item) => {
            if (item.id == id) {
              setField(item.titulo);
              setEdit(item.descricao);
              setDoenca(item.doenca)
            }
          });
        })
        .catch((error) => {
          console.log('Error');
        });

      
    }
  }, []);

  const handleButton = () => {
    if (id) {
      const dados = new FormData();

      dados.append('titulo', field);
      dados.append('descricao', edit);
      dados.append('usuario', dataContext?.state?.usuario?.id);
      dados.append('doenca', doenca);
      if(file.current.files[0] === undefined){
        console.log("img ")
      }
      else{
        dados.append("img", file.current.files[0]);
      }

      api.post(`/informacoes/${id}`, dados)
        .then((res) => {
          console.log(res);
          setSms("As alterações foram salvas com sucesso!")
          setAlertsms("success")
          handleClick();
        })
        .catch((error) => {
          console.log("Erro");
          setSms("Por favor verifique as informações!")
          setAlertsms("error")
          handleClick();
        });
        

    } else {
      const dados = new FormData();

      dados.append('titulo', field);
      dados.append('descricao', edit);
      dados.append('usuario', dataContext?.state?.usuario?.id);
      dados.append('doenca', doenca);
      if(file.current.files[0] === undefined){
        console.log("img ")
      }
      else{
        dados.append("img", file.current.files[0]);
      }

      api.post(`/informacoes`, dados)
        .then((res) => {
          console.log(res);
          setSms("As alterações foram salvas com sucesso!")
          setAlertsms("success")
          handleClick();
        })
        .catch((error) => {
          console.log("Erro");
          setSms("Por favor verifique as informações!")
          setAlertsms("error")
          handleClick();
        });
        
    }
  };

  return (
    <Page
      className={classes.root}
      title="Adicionar"
    >
      <Container maxWidth={false}>
        <Box mt={3}>

          <Paper className={classes.content}>
            <div className={classes.row}>
              <input
                type="file"
                ref={file}
                onChange={e => {
                  console.log(e.target.files[0])
                  
                  console.log(file.current.files[0].name)
                }}
              />
            </div>
            <div className={classes.row}>
              <TextField
                style={{ width: '80%' }}
                value={field}
                onChange={(e) => setField(e.target.value)}
                label="Titulo"
              />
            </div>
            <div className={classes.row} >
                <FormControl style={{ color: '#fff', minWidth: 200}}>
                  <InputLabel id="demo-simple-select-label">Doença</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={doenca}
                    onChange={(e)=> setDoenca(e.target.value)}
                  >
                    {
                      allDoenca && allDoenca.map((item, index) => (
                        <MenuItem value={item.id} selected={(doenca == item.nome)} >{item.nome}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
            </div>
            <div className={classes.row}>
              <Editor
                apiKey="4pmok9wxp67i2veuxka0uxaum0wrjckaca1tkxan2vs59iby"
                value={edit}
                init={{
                  width: '80%',
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
            <div className={classes.header}>
              <Button
                style={{ backgroundColor: 'rgb(181, 73, 73)', color: 'white' }}
                onClick={handleButton}
                startIcon={<SaveIcon />}
                variant="contained"
                size="small"
                color="primary"
              >
                Salvar
              </Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertsms}>
                  {sms}
                </Alert>
            </Snackbar>
          </Paper>
        </Box>
      </Container>
    </Page>
  );
}

export default Add2;
