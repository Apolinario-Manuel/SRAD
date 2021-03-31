/* eslint-disable */
import React from "react";
import {Link, useParams} from "react-router-dom";
import { Flex, Divider, Button, IconButton} from "@chakra-ui/core";
import { Typography } from "@material-ui/core";
import api from '../services/api';
import swal from 'sweetalert';

const CardProva = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();

  return (
    <>
      <Flex
        height="100%"
        border="1px solid #e7e5e5"
        backgroundColor="#fff"
        borderRadius="md"
        flexDir="column"
        align="flex-start"
        textDecoration="none"
        padding={10}
        onClick={()=> {
          if(props.notClick){
            return ""
          }else{
            localStorage.setItem("categoria", props.nome);
            localStorage.setItem("totalCat", props.quest);
            localStorage.setItem("totalCand", props.cand);
            localStorage.setItem("distribuited", props.distribuited);
          }
        }}
        as={Link} variant="outline" to={ props.notClick ? "": `/app/categoria/${props.id}` }
      >
        <Typography gutterBottom variant="h5">
            {props.nome}
        </Typography>
        <Divider
          borderColor="black.200"
          width="85%"
        />
        <Typography variant="body2" color="textSecondary" component="p">
          Concurso: {props.contest}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Candidato(s): {props.cand}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Sala(s): {props.rooms}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Total Pergunta(s): {props.quest}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Total Vaga(s): {props.vacancies}
        </Typography>
        {
          props.notClick ?

          <Flex>
          <IconButton 
            isLoading={isLoading}
            aria-label="Delete database" 
            icon="delete"
            variant="outline"
            variantColor="red" 
            mt={2}
            onClick={() => {
              setIsLoading(true)
              api.delete(`/categoriasconcurso/${props.id}`)
                .then((res) => {
                    setIsLoading(false)
                    api
                    .get(
                      `/categorias/${id}`
                    )
                    .then((response) => {
                      props.delete(response.data);
                      swal({
                        title: `A Categoria foi eliminada com sucesso!`,
                        icon: "success",
                        button: "Ok!",
                      })
                    });
                    
                })
                .catch((error) => {
                    swal({
                      title: `Não foi possível eliminar a categoria!`,
                      icon: "error",
                      button: "Ok!",
                    })
                });
              }
            } 
          />
        </Flex>

          :
          ""
        }
        
      </Flex>
    </>
  );
};

export default CardProva;
