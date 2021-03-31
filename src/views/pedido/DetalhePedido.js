import React, { useContext } from "react";
import { AppContext } from '../login/hooks/context';
import { useParams, useNavigate } from "react-router-dom";
import PdfViewer from '../../components/PdfViewer';

import api from "../../services/api";
import swal from 'sweetalert';
import {
  Flex,
  Button
} from "@chakra-ui/core";
import { 
  makeStyles,
  Box,
  AppBar,
  Tab
} from '@material-ui/core';

import {
  TabContext,
  TabList,
  TabPanel
} from '@material-ui/lab';

import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Pedido() {
  const [data, setData] = React.useState([]);
  const [historico, setHistorico] = React.useState([]);
  const { data: dataContext } = useContext(AppContext);
  const [showPdf, setShowPdf] = React.useState(false)
  let navigate = useNavigate();
  let text = ""
  let check1 = false
  let check2 = false
  let { id } = useParams();

  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const [form, setForm] = React.useState({});
  const pdf = "https://enapp.desenvolvimento.gov.ao/api/uploads/6030dabab43f9-PROJECTO.pdf"


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  React.useEffect(() => {
    api
      .get(
        `/pedidoutente/${id}`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setData(response.data);

        setHistorico(response.data[3])
      });
  }, []);

  const Div = styled.div`
    hr {
      border-color: #337ab7;
      margin: 15px 0;
    }
    a{
      color: #337ab7;
    }
    p{
      font-family: Source Sans Pro,sans-serif;
      font-size: 1.0em;
      font-weight: 200;
      color: #888;
      margin: 0 0 10px;
    }
    b, strong {
      font-weight: 700;
    }
    h4{
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 18px;
    }
    ul {
      display: block;
      list-style-type: disc;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      padding-inline-start: 40px;
    }

    button, input, select, textarea {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }
    select, textarea {
      width: 100%;
      border: 1px solid #dedede;
      padding: 8px;
      box-sizing: border-box;
    }
    .pull-left {
      float: left!important;
    }
    .btn-default {
        color: #333;
        background-color: #fff;
        border-color: #ccc;
    }
    .btn {
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }
    .pull-right {
        float: right!important;
    }
    .btn-success {
        color: #fff;
        background-color: #5cb85c;
        border-color: #4cae4c;
    }
    legend {
        display: block;
        width: 100%;
        padding: 0;
        margin-bottom: 20px;
        font-size: 21px;
        line-height: inherit;
        color: #333;
        border: 0;
        border-bottom: 1px solid #e5e5e5;
    }
    fieldset {
        min-width: 0;
        padding: 0;
        margin: 0;
        border: 0;
    }
    @media (min-width: 992px){
      .col-md-6 {
          width: 50%;
      }
      .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9 {
          float: left;
      }
    }
    .col-md-6{
        position: relative;
        min-height: 1px;
        float: left;
    }
  `;

  const FlexEl = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 80px 0px 20px;

    @media (max-width: 768px){
      display: block;
      padding: 0px;
    }
  `;

  const PdfDiv = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  return (
    <Flex bg="#f2f3f8" width="100%">
      <Flex flexDir="column" width="90%" m="0px auto" paddingTop="80px">
        <Box>
        <Button
          mb={5}
          bg="#fff"
          color="#022480"
          _hover={{ backgroundColor: "#022480", color: "#fff" }}
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
        <div className={classes.root}>
          <TabContext value={value}>
            <AppBar position="static">
              <TabList onChange={handleChange} aria-label="simple tabs example">
                <Tab label="Dados Gerais" value="1" />
                <Tab label="Utente" value="2" />
                <Tab label="Formulário" value="3" />
                <Tab label="Histórico" value="4" />
                <Tab label="Estado" value="5" />
              </TabList>
            </AppBar>
            <TabPanel value="1">
            
            <Div >
							<h4>Dados Gerais</h4><hr />
							<p><b>Referência</b>: <span> {data[0]?.reference} </span></p>
							<p><b>Código</b>: <span>{data[0]?.key_sepe}</span></p>
							<p><b>Serviço</b>: <span>Concurso Público - Ingresso (Admissão) MESCTI</span></p>
							<p><b>Preço</b>: <span>Kz 0,00 </span></p>
							<p><b>Estado do Pedido</b>: <span>{data[0]?.order_state}</span></p>
							<p><b>Estado Pagamento</b>: <span>{data[0]?.payment_state}</span></p>
							<p><b>Data Registo</b>: <span>{data[0]?.created_at}</span></p>
							<p><b>Data Actualização</b>: <span>{data[0]?.updated_at}</span></p>
							<p><b>Data Aprovação</b>: <span>{data[0]?.aproval_date}</span></p>
							<p><b>Data Pagamento</b>: <span>{data[0]?.payment_date}</span></p>
							
						</Div>
            
            </TabPanel>
            <TabPanel value="2">
              
            <Div class="tab-pane" id="utente" role="tabpanel">
							<h4>Dados do Utente</h4><hr />
							<p><b>Utente</b>: <span>{data[1]?.name}</span></p>
							<p><b>Email</b>: <span>{data[1]?.email}</span></p>
							<p><b>Telemóvel</b>: <span>{data[1]?.telephone}</span></p>
							<p><b>BI</b>: <span> {data[1]?.identity_card}</span></p>
							<p><b>NIF</b>: <span>{data[1]?.identity_card}</span></p>
						</Div>

            </TabPanel>
            <TabPanel value="3">

              <PdfViewer pdf={pdf} 
                onCancel={()=>setShowPdf(false)}
                visible={showPdf}
              />
              
            <Div class="tab-pane" id="formulario" role="tabpanel">
								<h4>Dados do Formulário</h4><hr />
								<br />
                <fieldset id='separador_415' class='separador apresentacao  tab-pane active' >
                  <legend>1. CANDIDATURA</legend>
                  <FlexEl>
                    <Div class='col-md-6'>
                      <fieldset id='grupo_417' class='grupo ' >
                        <legend>INFORMAÇÃO PESSOAL&nbsp;</legend>
                        <p> <label for='bi'>Bilhete de Identidade</label>: {data[2]?.identity_card}</p>
                        <p><label for='nome'>Nome</label>: {data[2]?.name}</p>
                        <p><label for='nif'>NIF</label>: {data[2]?.identity_card}</p>
                        <p><label for='data_nasc'>Data Nascimento</label>: {data[2]?.date_of_birth}</p>
                        <p><label for='genero'>Género</label>: {data[2]?.gender}</p>
                        <p><label for='email'>E-mail</label>: {data[2]?.email}</p>
                        <p><label for='telemovel'>Telemóvel</label>: {data[2]?.telephone}</p>
                      </fieldset>
                    </Div>
                    <Div class='col-md-6'>
                      <fieldset id='grupo_414' class='grupo ' >
                        <legend>CANDIDATURA E DOCUMENTOS ANEXOS&nbsp;</legend>
                        <p>
                          <label for='requerimento'>Requerimento (PDF)</label>:&nbsp; 
                          <span class='opcoes_ficheiro' onClick={()=> window.open(pdf)} >
                            <a target='' class='view-pdf' href='#' title='Pré-visualizar documento 20201030_012539_recibo_0109171311.pdf'>
                              <span class='fa fa-eye '></span>
                            </a>&nbsp;
                            <a target='' href='#' title='Descarregar documento'>
                              <span class='fa fa-download '></span>
                            </a>
                          </span>
                        </p>
                        <p><label for='func_publico'>É funcionário público? (S/N)</label>: {(data[2]?.public_employee == 1) ? "Sim": "Não"}</p>
                        <p><label for='quadro_mescti'>Pertence ao Quadro definitivo do MESCTI? (S/N)</label>: {(data[2]?.mescti == 1 ) ? "Sim": "Não"}</p>
                        <p><label for='posicao'>Categoria a que se candidata</label>: Técnico Superior de 2ª Classe</p>
                        <p><label for='habilitacoes'>Habilitações Literárias</label>: Licenciado</p>
                        <p>
                          <label for='cert_hablitacoes'>Certificado Habilitações Literárias (PDF)</label>:&nbsp;
                          <span class='opcoes_ficheiro'>
                            <a target='' class='view-pdf' href='#' title='Pré-visualizar documento 20201030_012539_plano_de_formacao_2019_versao_final_1.pdf'>
                              <span class='fa fa-eye '></span>
                            </a>&nbsp;
                            <a target='' href='#' title='Descarregar documento'>
                              <span class='fa fa-download '></span>
                            </a>
                          </span>
                        </p>
                      </fieldset>
                    </Div>
                  </FlexEl>
                </fieldset><br/>
                <fieldset id='separador_421' class='separador apresentacao  tab-pane ' >
                  <legend> 2. OUTROS DOCUMENTOS </legend>
                  <FlexEl>
                    <Div class='col-md-6'>
                      <fieldset id='grupo_422' class='grupo ' >
                        <legend>PARA CANDIDATOS APROVADOS&nbsp;</legend>
                        <p><label for='comp_sit_militar'>Comprovativo Situação Militar regularizada (PDF)</label>: N/D</p>
                        <p><label for='atestado_medico'>Atestado Médico (PDF)</label>: N/D</p>
                        <p><label for='cert_reg_criminal'>Certificado de registo criminal (PDF)</label>: N/D</p>
                      </fieldset>
                    </Div>
                    <Div class='col-md-6'>
                      <fieldset id='grupo_423' class='grupo ' >
                        <legend>OUTROS DOCUMENTOS PEDIDOS&nbsp;</legend>
                        <p><label for='cert_form_prof_1'>3 últimas avaliações de desempenho (PDF)</label>: N/D</p>
                        <p><label for='cert_form_prof_2'>Despachos de cargos exercidos nos últimos 3 anos (PDF)</label>: N/D</p>
                        <p><label for='cert_form_prof_3'>Outros documentos (PDF)</label>: N/D</p>
                      </fieldset>
                    </Div>
                    </FlexEl>
                </fieldset><br/>
                <center>
                  {/*<small>Actualizado por João Miguel Alexandre da Silva, em 07/12/2020</small>*/}
                </center><br/>
            </Div>

            </TabPanel>
            <TabPanel value="4">
              <Div>	
                <h4>Histórico de Estados</h4><hr />
                {
                  
                  (historico.length != 0) ? 
                  
                    historico.map((item, index) => 
                    <ul>
                      <li style={{color: (index == 0)? "#000": "#AAA"}}>
                        <b>{item.state}</b>
                        {
                          (item.state == "Devolvido" || item.state == "Recusado" || item.state == "Cancelado") ?
                            <><br/><span>Observações: <i>{item.observation}</i></span></>
                          :
                          null
                        } 
                        
                        <br/>Encaminhamento de responsabilidade para '{item.forward}'
                        <br/><small>Alterado em {item.updated_at?.split(' ')[0]} às {item.updated_at?.split(' ')[1]}, por '{item.forward}'</small> - (Utente notificado por <a title={data[2]?.email}>EMAIL</a>)</li>	
                    </ul>
                    
                  )
                  :
                  (
                    <ul>
                      <li style={{color: "#000"}}>
                        <b>Sem Histórico para apresentar</b>
                        
                      </li>	
                    </ul>
                  )
                }
                
              </Div>
            </TabPanel>
            <TabPanel value="5">
                <Div id="estado" role="tabpanel">
                
                <Div id="validacao">
                  
                  <h4>Alteração de Estado</h4><hr />
                  
                  <form>
                    <input type="hidden" name="accao" value="alterar-estado" />
                    <fieldset>
                        <p>
                        <label for='id_responsavel'>Encaminhar Responsabilidade</label>
                        <select name='id_responsavel' value={form.id_responsavel} onChange={handleForm}>
                          <option value=''>Selecione o novo Utilizador</option>
                          <option value={dataContext?.state?.usuario?.email} >{dataContext?.state?.usuario?.email}</option>
                        </select>
                        </p>
                        <p>
                          
                          <label for='id_estado'>Estado</label>
                          <select name='id_estado' value={form.id_estado} onChange={handleForm} >
                            <option value=''>Selecione o novo estado</option>
                            <option value="Entregue">Entregue</option>
                            <option value="Em análise" >Em análise</option>
                            <option value="Aguarda Aprovação">Aguarda Aprovação</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Devolvido">Devolvido</option>
                            <option value="Recusado">Recusado</option>
                            <option value="Cancelado">Cancelado</option>
                                                    
                          </select>
                        </p>    
                        {
                          (form.id_estado == "Devolvido" || form.id_estado == "Recusado" || form.id_estado == "Cancelado") ?
                          <p>
                            <label for='observacoes'>Observações</label>
                            <textarea name='observacoes' onBlur={(e) => { console.log("ta: ", text.length); text += e.target.value}} ></textarea>
                          </p>
                          :
                          null
                        } 

                        {
                          /*
                            <p>
                            <input type="checkbox" id="notificar_utente_sms" name="notificar_utente_sms"  onChange={(e) => check1 = !check1 } />
                            <label for="notificar_utente_sms">Notificar Utente via SMS para o Nº de telemóvel "{data[2]?.telephone}"</label>
                          </p>
                          */
                        }                       
                        <p>
                          <input type="checkbox" id="notificar_utente_email" name="notificar_utente_email" onChange={(e) => check2 = !check2 } />
                          <label for="notificar_utente_email">Notificar Utente via EMAIL para o endereço <i>"{data[2]?.email}"</i>.</label>
                        </p>
                      
                        <br/>
                        <hr />
                        <p>
                          <a href="#" class='btn btn-default pull-left' onClick={() => navigate(-1)} >Voltar à listagem</a>
                          <Button 
                            className='btn btn-success pull-right' 
                            value='Submeter'
                            onClick={(e) => {
                              e.preventDefault();
                              if(((text.length <= 0) && (form.id_estado == "Devolvido" || form.id_estado == "Recusado" || form.id_estado == "Cancelado")) || !check2 ){
                                if(!check2 && !(form.id_estado == "Devolvido" || form.id_estado == "Recusado" || form.id_estado == "Cancelado"))
                                  swal({
                                    title: `Notifique por e-mail!`,
                                    icon: "info",
                                    button: "Ok!",
                                  })
                                else
                                  swal({
                                    title: `Insira uma observação e notifique por e-mail!`,
                                    icon: "info",
                                    button: "Ok!",
                                  })
                              }
                              else{
                                let dados = new FormData();

                                dados.append('forward', form.id_responsavel)
                                dados.append('state', form.id_estado)
                                dados.append('observation', text)
                                //dados.append('sms', check1)
                                //dados.append('email', check2)
                                

                                api.post(`/mudarestado/${id}`, dados).then((response) => {

                                  if(response.status == 200)
                                    swal({
                                      title: `Alteração de estado feita com sucesso!`,
                                      icon: "success",
                                      button: "Ok!",
                                    })
                                  else
                                    swal({
                                      title: `Não foi possível alterar o estado!`,
                                      icon: "error",
                                      button: "Ok!",
                                    })
                                })
                              }
                            }} 
  
                          >
                            Submeter
                          </Button>
                        </p>
                      
                                      
                    </fieldset>
                  </form>

                </Div>
              </Div>
            </TabPanel>
          </TabContext>
        </div>
        </Box>
      </Flex>
    </Flex>
  );
}
