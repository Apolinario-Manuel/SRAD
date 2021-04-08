import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const Blog = () => {
  const classes = useStyles();

  return (
    <Page
    className={classes.root}
    title="Blog"
  >
    <Container maxWidth={false}>
      
      <Box mt={3}>
        <Results />
      </Box>
    </Container>
  </Page>
  );
};

export default Blog;
