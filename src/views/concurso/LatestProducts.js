/* eslint-disable */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import api from '../../services/api';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Button, Flex, IconButton } from "@chakra-ui/core";

const dados = [
  {
    id: uuid(),
    name: 'Apolinário Manuel',
    imageUrl: '/static/images/avatars/avatar_1.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Bento Júlio',
    imageUrl: '/static/images/avatars/avatar_2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Vanilson Ribeiro',
    imageUrl: '/static/images/avatars/avatar_3.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Levy Muxinda',
    imageUrl: '/static/images/avatars/avatar_4.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'Xavier Cabeto',
    imageUrl: '/static/images/avatars/avatar_5.png',
    updatedAt: moment().subtract(5, 'hours')
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, ...rest }) => {

  const [data, setData] = React.useState([])
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
      api
      .get(
        `/jurisporconcurso/${id}`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        setData(response.data);
      });
  }, []);

  const classes = useStyles();
  const [products] = useState(dados);

  const handleClickOpen = () => {
    api
      .get(
        `/juris`
      )
      .then((response) => {
        //  console.log(response.data);
        console.log(response);
        if(response.status == 200 && !response.warning){
          setCategoria(response.data);
          setOpen(true);
        }
        else
        swal({
          title: `Não foi possível associar categoria!`,
          icon: "error",
          button: "Ok!",
        });
      });
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Júris"
      />
      <Divider />
      <List>
        { (data.length > 0) ? 
        
        data?.map((item, i) => (
          <ListItem
            divider={i < item.length - 1}
            key={item.id}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={dados[i].imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              //secondary={`Updated ${product.updatedAt.fromNow()}`}
            />
            <IconButton 
              isLoading={isLoading}
              aria-label="Delete database" 
              icon="delete"
              variant="outline"
              variantColor="red" 
              ml={1}
              onClick={() => {
                console.log("mm")
                /*setIsLoading(true)
                api.delete(`/concursos/${props.id}`)
                  .then((res) => {
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
                      
                  })
                  .catch((error) => {
                      swal({
                        title: `Não foi possível eliminar o concurso!`,
                        icon: "error",
                        button: "Ok!",
                      })
                  });
                }*/
              } }
            />
          </ListItem>
        ))

        :

        <ListItemText
          style={{textAlign:"center"}}
          primary="Nenhum Júri foi associado à este concurso"
        />
      }
      </List>
      <Divider />
      <Flex>
        {/*<Button
          onClick={handleClickOpen}
          border="1px solid #022480"
          bg="white"
          color="rgb(44, 56, 126);"
          padding="5px 30px"
          textAlign="center"
          margin="20px auto 0px 16px"
          _hover={{ backgroundColor: '#022480', color: '#fff' }}
        >
          Associar Júri
        </Button>*/}
      </Flex>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

export default LatestProducts;
