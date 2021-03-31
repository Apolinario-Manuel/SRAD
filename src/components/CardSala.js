import React, { useState } from "react";
import api from '../services/api';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Flex, Divider, Button, Icon, IconButton } from "@chakra-ui/core";
import swal from 'sweetalert';
import { Typography } from "@material-ui/core";

const CardSala = (props) => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const {id} = useParams();

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
          {props.nome} {" " + props.number}
        </Typography>
        <Flex>
          <Icon name="copy" marginRight={1} />
          <Typography variant="body2" color="textSecondary" component="p">
            Limite de Candidatos:{props.qt}
          </Typography>
        </Flex>
        <Flex>
          <Icon name="copy" marginRight={1} />
          <Typography variant="body2" color="textSecondary" component="p">
            Quantidade de Candidatos:{props.qtcandi}
          </Typography>
        </Flex>
        <Flex>
          <Icon name="time" marginRight={1} />
          <Typography variant="body2" color="textSecondary" component="p">
            Duração:{props.time}
          </Typography>
        </Flex>
        <Flex>
          <Icon name="time" marginRight={1} />
          <Typography variant="body2" color="textSecondary" component="p">
            Localização:{props.location}
          </Typography>
        </Flex>
        <Flex>
          <Icon name="calendar" marginRight={1} />
          <Typography variant="body2" color="textSecondary" component="p">
            Data: {props.hour}
          </Typography>
        </Flex>
        <Divider color="f2f3f8" width="100%" margin="10px auto" />
        <Flex>
        <Button
          bg="#022480"
          color="#fff"
          padding="5px 100px"
          isDisabled={localStorage.getItem(
            "distribuited"
          ) == 0 ? true : false}
          _hover={{ backgroundColor: "#002ead" }}
          onClick={() => {
            localStorage.setItem("roomName", props.nome);
            navigate(`/app/sala/${props.id}`);
          }}
        >
          Visualizar
        </Button>
        <IconButton 
          isLoading={isLoading}
          aria-label="Delete database" 
          icon="delete"
          isDisabled={localStorage.getItem(
            "distribuited"
          ) == 0 ? false : true}
          variant="outline"
          variantColor="red" 
          ml={1}
          onClick={() => {
            setIsLoading(true)
            api.delete(`/salas/${props.id}`)
              .then((res) => {
                  setIsLoading(false)
                  api
                  .get(
                    `/salas/${id}`
                  )
                  .then((response) => {
                    props.delete(response.data);
                    swal({
                      title: `A Sala foi eliminada com sucesso!`,
                      icon: "success",
                      button: "Ok!",
                    })
                  });
                  
              })
              .catch((error) => {
                  swal({
                    title: `Não foi possível eliminar a sala!`,
                    icon: "error",
                    button: "Ok!",
                  })
              });
            }
          } 
        />
        </Flex>
        
      </Flex>
    </>
  );
};

export default CardSala;
