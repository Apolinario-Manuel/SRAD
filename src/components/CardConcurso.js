/* eslint-disable */
import React, { useState } from "react";
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";
import { Flex, Divider, Button, Icon, IconButton } from "@chakra-ui/core";
import swal from 'sweetalert';
import { Typography } from "@material-ui/core";

const CardConcurso = (props) => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  let ellipsis = props?.ministry?.length > 20 ? "..." : "";
  return (
    <>
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
          {props.name}
        </Typography>
        <Flex>
          <Icon name="copy" marginRight={1} />
          {
            (props?.entidade?.length > 0) ? 
            <Typography variant="body2" color="textSecondary" component="p">
              Entidade: {props?.entidade}
            </Typography>
            :
            <Typography variant="body2" color="textSecondary" component="p">
              Ministério: {props?.ministry?.substr(0,25) + ellipsis}
            </Typography>
          }
        </Flex>
        <Flex>
          <Icon name="edit" marginRight={1} />
          <Typography variant="body2" color="textSecondary" component="p">
            Categorias:  
          </Typography>
        </Flex>
        <Flex>
          <Icon name="calendar" marginRight={1} />
          <Typography variant="body2" color="textSecondary" component="p">
            Data de inicio:  {`${props.data_inicio}`}
          </Typography>
        </Flex>
        <Flex>
          <Icon name="calendar" marginRight={1} />
          <Typography variant="body2" color="textSecondary" component="p">
            Data de término:  {`${props.due_date}`}
          </Typography>
        </Flex>
        <Divider color="f2f3f8" width="100%" margin="10px auto" />
        <Flex>
        <Button
          bg="#022480"
          color="#fff"
          width="150px"
          padding="5px"
          _hover={{ backgroundColor: "#002ead" }}
          onClick={() => {
            localStorage.setItem("roomName", props.nome);
            navigate(`/app/concurso/${props.id}`);
          }}
        >
          Visualizar
        </Button>
        {/* 
        <IconButton 
          isLoading={isLoading}
          aria-label="Delete database" 
          icon="delete"
          variant="outline"
          variantColor="red" 
          ml={1}
          onClick={() => {


            swal({
              title: " Autenticação Necessária",
              text: "Insira a tua password para continuar!",
              icon: "info",
              content: "input",
              button: {
                text: "Continuar",
              },
            })
            .then((value) => {
            if (!value) throw null;

            setIsLoading(true);
            const pass = new FormData();
            pass.append("password", value)

            api.delete(`/concursos/${props.id}`, pass)
            .then((res) => {

                if(res.status == 200)
                {
                  setIsLoading(false)
                  api
                  .get(
                    `/concursos`
                  )
                  .then((response) => {
                    props.delete(response.data);
                    swal({
                      title: `O concurso foi eliminada com sucesso!`,
                      icon: "success",
                      button: "Ok!",
                    })
                  });
                }
                else{
                  return swal({ title: " Password Incorrecta!", icon: "error"})
                }
                
                
            })
            .catch((error) => {
                swal({
                  title: `Não foi possível eliminar o concurso!`,
                  icon: "error",
                  button: "Ok!",
                })
            });
            
              
            })
            .catch(err => {
              if (err) {
                swal("Oh noes!", "Problema de conexão!", "error");
              } else {
                swal.stopLoading();
                swal.close();
              }
            });
            }
          } 
        />
        */}
        </Flex>
        
      </Flex>
    </>
  );
};

export default CardConcurso;
