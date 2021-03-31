import React, { useState, useContext } from 'react';
import { CircularProgress } from "@chakra-ui/core";
import { AppContext } from '../login/hooks/context';
import api from "../../services/api";
import {
  Grid,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import CardProva from "../../components/CardProva";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CategoryList = () => {
  const classes = useStyles();
  const [data2, setData2] = React.useState([]);
  const { data: dataContext } = useContext(AppContext);

  React.useEffect(() => {
    api
      .get(
        `/categorias/${dataContext?.state?.usuario?.contest}`
      )
      .then((response) => {
        //  console.log(response.data);
        if(response.status == 200){
          console.log(response);
          setData2(response.data);
          localStorage.setItem(
            "idContestCategory",
            response.data[0].idContestCategory
          );
          localStorage.setItem(
            "distribuited",
            response.data[0].distribuited
          );
        }
      });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Category"
    >
      <Container maxWidth={false}>
              <Grid container spacing={2}>
                  { data2.length == 0 ?
                      (
                        <Grid 
                          item 
                          container
                          direction="row"
                          justify="center"
                          alignItems="center" 
                          lg={12}
                        >
                          <CircularProgress isIndeterminate size="70px" thickness={0.1} />
                        </Grid>
                      )
                      :
                        data2.map((da) => (
                        <Grid item lg={4} sm={6} xl={3} xs={12} >
                          <CardProva 
                            id={da.idContestCategory} 
                            nome={da.name} 
                            cand={da.candidates} 
                            rooms={da.room}
                            contest={da.contest}
                            quest={da.numberOfQuestions}
                            vacancies={da.vacancies}
                            distribuited={da.distribuited}
                            />
                        </Grid>
                      ))
                  }
                
              </Grid>
      </Container>
    </Page>
  );
};

export default CategoryList;
