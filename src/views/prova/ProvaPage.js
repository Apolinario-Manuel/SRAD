/* eslint-disable quotes */
/* eslint-disable import/order */
import React, { useContext, useState, useRef} from "react";
import ComponentSkeleton from "../../components/ComponentSkeleton";
import insignia from "../../img/insignia.png";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Countdown, { zeroPad } from "react-countdown-now";
import { motion } from "framer-motion";
import swal from "sweetalert";
import {
  Heading,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Image,
  Divider,
} from "@chakra-ui/core";
import { Container, Grid } from "@material-ui/core";
import { AppContext } from "../login/hooks/context";
import ReactPaginate from 'react-paginate';
import './styles.css'


export default function ProvaPage(props) {
  const { data: dataContext } = useContext(AppContext);
  const navigate = useNavigate();

  var questions = [{}];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [infoData, setInfoData] = useState({offset: 0 , perPage: 0, currentPage: 0, pageCount:  0});
  const [exam, setExam] = useState({});
  const [fim, setFim] = useState("");
  const { id } = useParams();

  const clockRef = useRef();
  const handlePause =() => clockRef.current.pause();

  React.useEffect(() => {
    //setUser(auth.getCurrentUser())
    localStorage.setItem("last", "utente");
    const timer = setTimeout(() => {
      api
        .get(`/perguntas/${id}`)
        .then((response) => {
          //  console.log(response.data);
          console.log(response);
          setData(response.data.supplies);
          setInfoData({ 
            offset: 0 , 
            perPage: 5, 
            currentPage: 0,
            pageCount: Math.ceil(response.data.supplies.length / 5)
          })

          console.log(infoData)
          setExam(response.data.exam_details);
          setLoading(false);
          //setTime(response.data["exam_details"].duration);
        });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  var  dateObject, seconds, date;
  date=new Date();

  if(dataContext?.state?.usuario?.duration){
    const dateTime = dataContext?.state?.usuario?.duration;

    dateObject = new Date(dateTime); // our Date object
    
    var a = dateTime.split(':'); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]) + "000";
    localStorage.setItem("time", seconds); 
  }

  
  var count = 0;
  let dados = new FormData();
  data.forEach((element, index) => {
    element.forEach((element, index) => {
      questions[count++] = { id: element.id, answer: null };
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    swal({
      title: " Tens a certeza que pretendes submeter ?",
      text: "Após a submissão não poderá alterar nenhuma informação!",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    })
    .then((willDelete) => {
      

      if (willDelete) {
        handlePause();
        var cont = document.querySelector("#container");
        cont.style.filter = "blur(7px)";
        console.log("quest: ", questions);

        dados.append("utente", dataContext?.state?.usuario?.id);
        dados.append("questions", JSON.stringify(questions));
        
        api
          .post(`/usuarioexame`, dados)
          .then((res) => {
            console.log(res);
          });
        swal({
          title: "A sua prova foi submetida!",
          text:
            "Você poderá consultar o gabarito da prova clicando no botão abaixo",
          icon: "warning",
          button: "Consultar",
        }).then(() => navigate("/resultado"));
      } else {

      }
    });
    
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * infoData.perPage;

    setInfoData({ currentPage: selectedPage, offset: offset});

};

  return (
    <>
      <Container style={{ maxWidth: "65%" }} id="container">
        {loading && <ComponentSkeleton />}
        {!loading && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Grid container spacing={1}>
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Flex
                  height="100%"
                  width="100%"
                  backgroundColor="#F0F0F0"
                  borderRadius="md"
                  flexDir="column"
                  padding={10}
                >
                  <Flex flexDir="column" align="center">
                    <Image src={insignia} width="7%" />
                    <Heading as="h3" size="md">
                      REPÚBLICA DE ANGOLA
                    </Heading>
                    <Heading as="h3" size="md">
                      GOVERNO DA REPÚBLICA DE ANGOLA
                    </Heading>
                    <Heading as="h3" size="md">
                      ESCOLA NACIONAL DE ADMINISTRAÇÃO E POLÍTICAS PÚBLICAS
                    </Heading>
                    <Heading as="h3" size="md">
                      {dataContext?.state?.usuario?.contest.toUpperCase()}
                    </Heading>
                  </Flex>
                  <Divider
                    borderColor="black.200"
                    width="90%"
                    margin="20px auto"
                  />
                  
                  <Flex flexDir="row" width="90%" margin="auto" justifyContent="space-between">
                    <div>
                      <Heading as="h5" size="sm">
                        Nome: {dataContext?.state?.usuario?.name}
                      </Heading>
                      <Heading as="h5" size="sm">
                        Categoria: {dataContext?.state?.usuario?.category}
                      </Heading>
                      <Heading as="h5" size="sm">
                        Sala: {dataContext?.state?.usuario?.room + " "} {dataContext?.state?.usuario?.number}
                      </Heading>
                    </div>
                    <div>
                    <Heading as="h5" size="sm">
                        Tempo:{" "}
                        <Countdown
                          date={Date.now() + parseInt(localStorage.getItem("time")) }
                          onPause={(total) =>
                            {
                              console.log("time: ", total)
                              setFim(`${total.hours}:${total.minutes}:${total.seconds}`)
                              dados.append("finished", `${total.hours}:${total.minutes}:${total.seconds}`)
                              localStorage.setItem("finished", `${total.hours}:${total.minutes}:${total.seconds}`)
                            }
                          }
                          onComplete={() => {
                            var cont = document.querySelector("#container");
                            cont.style.filter = "blur(7px)";
                            let di = new FormData();
                            console.log("quest2: ", questions);

                            di.append(
                              "utente",
                              dataContext?.state?.usuario?.id
                            );
                            di.append(
                              "questions",
                              JSON.stringify(questions)
                            );

                            api
                              .post(
                                `/usuarioexame`,
                                di
                              )
                              .then((res) => {
                                console.log(res);
                              });
                            swal({
                              title: "Tempo Esgotado!",
                              text:
                                "Você poderá consultar o gabarito da prova clicando no botão abaixo!",
                              icon: "warning",
                              button: "Consultar",
                            }).then(() => navigate("/resultado"));
                          }}
                          precision={2}
                          renderer={(props) => (
                            <span>
                              {zeroPad(props.hours)}:{zeroPad(props.minutes)}:
                              {zeroPad(props.seconds)}
                            </span>
                          )}
                          ref={clockRef}
                        />
                      </Heading>
                      <Heading as="h5" size="sm">
                        Duração: {dataContext?.state?.usuario?.duration}
                      </Heading>
                      <Heading as="h5" size="sm">
                        
                        Data: {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                      </Heading>
                    </div>
                  </Flex>
                </Flex>
              </Grid>

              {data.map((da, index) => {
                return (
                  <Grid item lg={12} sm={12} xl={12} xs={12} key={index}>
                    <div>
                      <Flex
                        backgroundColor="#d1d1d1"
                        borderRadius="md"
                        justify="center"
                      >
                        <Heading
                          size="lg"
                          lineHeight="shorter"
                          margin="10px auto"
                        >
                          Grupo {index + 1} - {da[0].nameSupply}
                        </Heading>
                      </Flex>
                      {da.map((item, index) => {
                        return (
                          <Flex
                            backgroundColor="#F0F0F0"
                            borderRadius="md"
                            flexDir="column"
                            align="flex-start"
                            justify="center"
                            padding={10}
                            margin="5px auto"
                          >
                            <FormControl as="fieldset" width="100%">
                              <FormLabel as="legend">
                                {index + 1}. {item.title}
                              </FormLabel>
                              <RadioGroup
                                name={item.id}
                                onChange={(e) => {
                                  questions.forEach((element, index) => {
                                    if (element.id == e.target.name)
                                      questions[index].answer = e.target.value;
                                  });
                                }}
                              >
                                {item.answers &&
                                  item.answers.map((res, index) => {
                                    return (
                                      <Radio
                                        value={res.id}
                                        style={{ borderColor: "#333" }}
                                      >
                                        {res.title}
                                      </Radio>
                                    );
                                  })}
                              </RadioGroup>
                            </FormControl>
                          </Flex>
                        );
                      })}
                    </div>
                  </Grid>
                );
              })}

              <ReactPaginate
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={infoData.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />

              <Button
                bg="#022480"
                color="white"
                _hover={{ backgroundColor: "#01154b" }}
                variant="outline"
                type="submit"
                onClick={handleSubmit}
                mt={4}
                mb={4}
              >
                Submeter
              </Button>
            </Grid>
          </motion.div>
        )}
      </Container>
    </>
  );
}

