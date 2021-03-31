import React, { useContext, useState, useRef } from "react";
import insignia from "../../img/insignia.png";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Countdown, { zeroPad } from "react-countdown-now";
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
import { Container, Grid, makeStyles } from "@material-ui/core";
import { AppContext } from "../login/hooks/context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function ResultProva(props) {
  const { data: dataContext } = useContext(AppContext);

  const [show, setShow] = useState(false);

  const [resultado, setResultado] = React.useState({});
  const [data, setData] = React.useState([]);

  const clockRef = useRef();
  const handlePause =() => clockRef.current.pause();


  React.useEffect(() => {
    //setUser(auth.getCurrentUser())
    api
      .get(
        `/mostrarresultado/${dataContext?.state?.usuario?.id}`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log("res:", response.data);
        setResultado(response.data.resultado);
        setData(response.data.supplies);

        //setTime(response.data["exam_details"].duration);
      });
  }, []);


  return (
    <>
      <Container style={{ maxWidth: "65%" }} id="container">
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
              <Divider borderColor="black.200" width="85%" margin="20px auto" />
              <Grid container justify="center" alignContent="center">
                <Grid item lg={6} sm={12} xl={12} xs={12}>
                  <Flex flexDir="column" align="flex-start" ml={10}>
                    <Heading as="h5" size="sm">
                      Nome: {dataContext?.state?.usuario?.name}
                    </Heading>
                    <Heading as="h5" size="sm">
                      Categoria: {dataContext?.state?.usuario?.category}
                    </Heading>
                    <Heading as="h5" size="sm">
                      Pontuação: {resultado?.notaFinal}/20
                    </Heading>
                    <Heading as="h5" size="sm">
                        Tempo:{" "}
                        <Countdown
                          date={Date.now() + 180000 }
                          
                          onComplete={() => {
                            
                            swal({
                              title: "Tempo Esgotado!",
                              text:
                                "O tempo de visualização terminou!",
                              icon: "warning",
                              button: "Ok!"
                            })

                            dataContext.setState(null)
                            
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
                        
                  </Flex>
                </Grid>
                <Grid item lg={6} sm={12} xl={12} xs={12}>
                  <Flex flexDir="column" align="flex-start" ml={65}>
                    <Heading as="h5" size="sm">
                      Tempo: {localStorage.getItem("finished")}
                    </Heading>
                    <Heading as="h5" size="sm" fontC>
                      <span
                        style={{
                          color: "#009407",
                        }}
                      >
                        Respostas certas:{resultado?.totalCertas}
                      </span>
                    </Heading>
                    <Heading as="h5" size="sm">
                      <span
                        style={{
                          color: "#ff7d7d",
                        }}
                      >
                        Respostas erradas:{resultado?.totalErradas}
                      </span>
                    </Heading>
                    <Heading as="h5" size="sm">
                      Não Respondidas: {resultado?.totalNulas}
                    </Heading>
                  </Flex>
                </Grid>
              </Grid>
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
                    <Heading size="lg" lineHeight="shorter" margin="10px auto">
                      Grupo {index + 1} - {da[0].supplyName}
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
                            {index + 1}. {item.questions.question[0].title}
                          </FormLabel>
                          <RadioGroup defaultValue={item.answer}>
                            {item.questions.answers &&
                              item.questions.answers.map((res, index) => {
                                return (
                                  <Radio
                                    isDisabled
                                    value={res.id}
                                    width="100%"
                                    fontColor="#fff"
                                    bg={
                                      item.answer == res.id &&
                                      res.state == "Certa"
                                        ? "#009407"
                                        : item.answer == res.id &&
                                          res.state == "Errada"
                                        ? "#ff7d7d"
                                        : res.state == "Certa"
                                        ? "#009407"
                                        : ""
                                    }
                                  >
                                    <Flex justify="space-between" width={800}>
                                      <Heading as="h5" size="sm">
                                        <span
                                          style={{
                                            color: "black",
                                            fontColor: "black",
                                          }}
                                        >
                                          {res?.title}
                                        </span>
                                      </Heading>

                                      {item?.answer == res?.id ? (
                                        <Heading
                                          as="h5"
                                          size="sm"
                                          color={
                                            item?.stateAnswer == "Certa"
                                              ? "green"
                                              : "red"
                                          }
                                        >
                                          {item?.stateAnswer}
                                        </Heading>
                                      ) : (
                                        ""
                                      )}
                                    </Flex>
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

          <Button
            bg="#022480"
            color="white"
            _hover={{ backgroundColor: "#01154b" }}
            variant="outline"
            type="submit"
            onClick={() =>
              swal({
                title: "A sua prova foi submetida!",
                icon: "warning",
                button: "OK!",
              }).then(() => dataContext?.setState(null))
            }
            mt={4}
            mb={4}
          >
            Sair
          </Button>
        </Grid>
      </Container>
    </>
  );
}
