import React from 'react'
import api from '../../../services/api'
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {Button} from '@chakra-ui/core';
import {
  Grid,
  Typography,
  Paper,
  IconButton,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Select,
  Radio,
  FormControlLabel,
  Divider
} from "@material-ui/core"

import swal from 'sweetalert';

import {
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  FilterNone as FilterNoneIcon,
  DeleteOutline as DeleteOutlineIcon
} from '@material-ui/icons';

import { CircularProgress, Flex, Radio as Rd } from "@chakra-ui/core";

function QuestionsTab(props) {

  const [questions, setQuestions]= React.useState([]);
  const [openUploadImagePop, setOpenUploadImagePop] = React.useState(false);
  const [imageContextData, setImageContextData] = React.useState({question: null, option: null});
  const [formData, setFormData] = React.useState({});
  const history = useNavigate();
  const [loadingFormData, setLoadingFormData] = React.useState(true);
  const [supplie, setSupplie] = React.useState([{}]);
  const [value, setValue] = React.useState(""); 
  const [state, setState] = React.useState();
  const [anterior, setAnterior] = React.useState(0);
  const { id } = useParams();
  var quest = [{}];
  var count = 0;

  React.useEffect(()=>{

   
    api
      .get(`/perguntas/admin/${id}`)
      .then((response) => {
        //  console.log(response.data);
        console.log(response.data);
        //setTime(response.data["exam_details"].duration);
        
        if(response.data["questions"] !== undefined){
          //console.log(props.formData.questions.length);
          if(response.data["questions"].length === 0){
            setQuestions([{questionText: "Pergunta", state: 1 , options : [{optionText: "Opção 2", state: 1}], open: false}]);
          } else{
            response.data["questions"].map((da, index) => {
              var opt = [{}];
              da.answers.map((res, index) => 
                  opt[index] = {id: res.id, optionText: res.title, state: 0, correct: (res.state === "Certa") ? true : false}
                )
              
                quest[count] = {id: da.id ,questionText: da.title, state: 0 , options : opt, open: false}
                count++;
            })
          }
          
          quest.reverse();
          setQuestions(quest)
              
          setLoadingFormData(false)
        } 
      });
    
      api
      .get("/supplies")
      .then((response) => {
        //  console.log(response.data);
        setSupplie(response.data);
      
      });
    
    
  }, [])
  

  function saveQuestions(){
    console.log("auto saving questions initiated");
    
    console.log("", questions)
    let da = new FormData();
    
    da.append("idContestCategory", id);
    da.append("questions", JSON.stringify(questions));

    api.post(`/perguntas`, da)
    .then(res => {
    console.log(res);
    if(res.status == 200){
      localStorage.setItem("totalCat", questions.length)
      swal({
        title: `As suas perguntas foram salvas com sucesso`,
        icon: "success",
        button: "Ok!",
      })
      history(-1)
    }

    })
    
  }


  function addMoreQuestionField(){
      expandCloseAll(); //I AM GOD

  
      var da = questions;
      da.reverse();

      var q = [...da, {supplyText: 1 ,questionText: "Pergunta", state: 1, options : [{optionText: "Opção 1", state: 1, correct: false}, {optionText: "Opção 2", state: 1, correct: false}, {optionText: "Opção 3", state: 1, correct: false}, {optionText: "Opção 4", state: 1, correct: false}], open: true}]

      q.reverse();
      setQuestions(q);
      console.log("a:",q);
  }

  function copyQuestion(i){
    let qs = [...questions]; 
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach(opn => {
      if ((opn.optionImage !== undefined)||(opn.optionImage !=="")) {
        var opn1new = {
          optionText : opn.optionText,
          optionImage: opn.optionImage
        }
      } else{
        var opn1new = {
          optionText : opn.optionText
        }
      }
      myNewOptions.push(opn1new)
    });
    const qImage = qs[i].questionImage || "";
    var newQuestion = {questionText: qs[i].questionText, questionImage : qImage ,options:myNewOptions, open: true}
     setQuestions(questions=> [...questions, newQuestion]); 
  }

  function deleteQuestion(i){
    let qs = [...questions]; 
    if(questions.length > 1){
      qs.splice(i, 1);
    }
    setQuestions(qs)
  }


  function handleOptionValue(text,i, j){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
      setQuestions(optionsOfQuestion);
  }
  function handleOptionState(text,i, j){
    var optionsOfQuestion = [...questions];

    optionsOfQuestion[i].options[0].correct = false;
    optionsOfQuestion[i].options[1].correct = false;
    optionsOfQuestion[i].options[2].correct = false;
    optionsOfQuestion[i].options[3].correct = false;

    optionsOfQuestion[i].options[j].correct = true;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
    setAnterior(j);
  }

  function handleQuestionValue(text, i){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
      setQuestions(optionsOfQuestion);
  }

  function handleSupplyValue(text, i){
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].supplyText = text;
      setQuestions(optionsOfQuestion);
  }
 function onDragEnd(result) {
  if (!result.destination) {
    return;
  }
  var itemgg = [...questions];

  const itemF = reorder(
    itemgg,
    result.source.index,
    result.destination.index
  );

  setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function showAsQuestion(i){
    let qs = [...questions];  
     qs[i].open = false;
     setQuestions(qs);
  }

  function expandCloseAll(){
    let qs = [...questions]; 
     for (let j = 0; j < qs.length; j++) {  
      qs[j].open = false;
     }
     setQuestions(qs);
  }

  function handleExpand(i){
    let qs = [...questions]; 
    for (let j = 0; j < qs.length; j++) {
      if(i ===j ){
        qs[i].open = true;
 
      } else{
        qs[j].open = false;
       }
    }
     setQuestions(qs);
  }

  function questionsUI(){
    return  questions && questions.map((ques, i)=> (
      <Draggable key={i} draggableId={i + 'id'} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div>
          <div style={{marginBottom: "15px"}}>
            
          
            <Accordion onChange={()=>{handleExpand(i)}} expanded={questions[i].open}>
              <AccordionSummary            
                aria-controls="panel1a-content"
                id="panel1a-header"
                elevation={1} style={{width:'100%'}}
              >
                { !questions[i].open ? (
              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '3px', paddingTop: '15px', paddingBottom: '15px'}}>
                {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}
                
                <Typography variant="subtitle1" style={{marginLeft: '0px'}}>{questions.length - i}.  {ques.questionText}</Typography>


                {ques.questionImage !==""?(
                  <div>
                    <img src={ques.questionImage} width="400px" height="auto" /><br></br><br></br>
                  </div>
                ): "" }
                
                {ques.options.map((op, j)=>(
                 
                 <div key={j}>
                   <div style={{display: 'flex'}}>
                    <FormControlLabel disabled control={<Radio style={{marginRight: '3px', }} checked={ ques.options[j].correct } />} label={
                        <Typography style={{color: '#555555'}}>
                          {ques.options[j].optionText}
                        </Typography>
                      } />
                   </div>

                  <div>
                    {op.optionImage !==""?(
                      <img src={op.optionImage} width="160px" height="auto" />
                    ): "" }
                  </div>
                 </div>
                ))}  
              </div>            
              ): ""}   
              </AccordionSummary>

              <AccordionDetails>
              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', marginTop:'-15px'}}>
              <div style={{display:'flex', width: '100%', justifyContent: 'space-between'}}>
                <Select
                  native
                  fullWidth={true}
                  value={state}
                  onChange={(e)=>{
                    setState(e.target.value);
                    handleSupplyValue(e.target.value, i)
                  }}
                  
                >
                  {supplie.map((su, index) => 
                      <option value={su.id}>{su.name}</option>
                  )}
              </Select>
                  
                </div>
                <div style={{display:'flex', width: '100%', justifyContent: 'space-between', marginTop:'20px'}}>
                  <Typography style={{marginTop:'3px', fontSize: "25px"}}>{questions.length - i}.</Typography>
                  <TextField 
                        fullWidth={true} 
                        placeholder="Pergunta"

                        value={ques.questionText}
                      onChange={(e)=>{handleQuestionValue(e.target.value, i)}}
                  />
                  
                </div>
                
                
                <div style={{width: '100%'}}>
                {ques.options.map((op, j)=>(
                 <div key={j}>
                      <div  style={{display:'flex', flexDirection:'row', marginLeft:'-12.5px', justifyContent: 'space-between', paddingTop: '5px', paddingBottom: '5px'}}>
                    
                          <Radio 
                            value={ques.options[j].optionText}
                            checked={ques.options[j].correct}
                            onChange={(e) => {
                              setValue(e.target.value);
                              handleOptionState(e.target.value, i, j)
                            }}
                            
                          />
                          <TextField 
                            fullWidth={true} 
                            placeholder="Option text" 
                            style={{marginTop: '5px'}} 
                            value={ques.options[j].optionText}
                            onChange={(e)=>{handleOptionValue(e.target.value, i, j)}}
                          />
                          </div>
                 </div>
                ))}
                </div>  
                
                <br></br>
                <br></br>

                <Typography variant="body2" style={{color: 'grey'}}>Você pode adicionar no máximo 4 respostas. Se você quiser adicionar mais, altere as configurações. Opção única de múltipla escolha disponível!</Typography>
              </div>
              </AccordionDetails>

              <Divider />
              
              <AccordionActions>               
                    <IconButton aria-label="View" onClick={()=>{showAsQuestion(i)}}>
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton aria-label="Copy" onClick={()=>{copyQuestion(i)}}>
                      <FilterNoneIcon />
                    </IconButton>
                    <Divider orientation="vertical" flexItem/>

                    <IconButton aria-label="delete" onClick={()=>{deleteQuestion(i)}}>
                      <DeleteOutlineIcon />
                    </IconButton>

                    <IconButton aria-label="Image">
                      <MoreVertIcon />
                    </IconButton>
              </AccordionActions>
            </Accordion>
          </div>
      </div>
                    </div>
                  )}
      </Draggable>
      
     )
    )
  }




  return (
       <div style={{marginTop:'15px', marginBottom: '7px', paddingBottom:"30px"}}>
           
           <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
              
             <Grid item xs={12} sm={5} style={{width: '100%'}}>
                 
                  <Grid style={{borderTop: '10px solid teal', borderRadius: 10}}>
                      <div>
                      
                          <div>
                            <Paper elevation={2} style={{width:'100%'}}>
                              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
                                <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
                                  {formData.name}
                                </Typography>
                                <Typography variant="subtitle1">{formData.description}</Typography>
                              </div>
                            </Paper>
                          </div> 
                      </div>       
                  </Grid>  

                  <Grid style={{paddingTop: '10px'}}>
                    <div>
                    {//<ImageUplaodModel handleImagePopOpen={openUploadImagePop} handleImagePopClose={()=>{setOpenUploadImagePop(false)}} updateImageLink={updateImageLink} contextData={imageContextData}/>
}
                      <div style={{marginBottom: "12px"}}>                       
                        <Button
                        bg="#022480"
                        color="white"
                        _hover={{ backgroundColor: "#01154b" }}
                        variant="outline"
                        onClick={addMoreQuestionField}
                        mr={4}
                        >Adicionar Pergunta</Button>

                        <Button
                        bg="#022480"
                        color="white"
                        _hover={{ backgroundColor: "#01154b" }}
                        variant="outline"
                        onClick={saveQuestions}
                        mr={4}
                        >Salvar Perguntas</Button>

                        <Button
                        bg="#F0F0F0"
                        color="#022480"
                        _hover={{ backgroundColor: "#022480", color: "#fff"}}
                        variant="outline"
                        onClick={()=> history(-1)}
                        >Voltar</Button>
                      </div>
                      
                      { questions.length == 0 ?

                        (<Flex align="center" justify="center" m={5}>
                          <CircularProgress isIndeterminate size="50px" thickness={0.1} />
                        </Flex>)
                        :
                        (
                          <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                              {(provided, snapshot) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  {questionsUI()}

                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                        )
                      }
                    </div>
                  </Grid>        
              </Grid>           
           </Grid>
       </div>
  );
}
export default QuestionsTab
