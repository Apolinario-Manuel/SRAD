import React from "react"
import api from '../../../services/api'
import { useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Budget from "../../../components/Budget"
import LatestOrders from "../../../components/LatestOrders"

import PropTypes from "prop-types"

import {
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton
} from "@material-ui/core"

import {
  FilterNone as FilterNoneIcon,
  Close as CloseIcon
} from "@material-ui/icons"

import QuestionsTab from "./QuestionsTab"


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
    justifySelf: "center",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    alignContent: "space-between",
    alignItems: "center",
  },
}));

function QuestionView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const { id } = useParams();

  const [formDeatils, setFormDetails] = React.useState({});
  const [openOfAlert, setOpenOfAlert] = React.useState(false);

  React.useEffect(() => {
    api
      .get(`/dadosutente/${id}`)
      .then((response) => {
        //  console.log(response.data);
        console.log("res:", response.data);
        setData(response.data);

        //setTime(response.data["exam_details"].duration);
      });
  }, []);


  const clipToClipboard = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/s/" + formDeatils._id
    );
    handleClickOfAlert();
    handleClose();
  };

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };

  const handleCloseOfAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenOfAlert(false);
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const datas = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: "Masculino",
        type: "bar",
        data: [7, 14, 16, 9, 15, 17, 20],
        fill: false,
        fontColor: "#fff",
        borderColor: "#290212",
        backgroundColor: "#0066ff",
        pointBorderColor: "#0066ff",
        pointBackgroundColor: "#0066ff",
        pointHoverBackgroundColor: "#0066ff",
        pointHoverBorderColor: "#0066ff",
        yAxisID: "y-axis-2",
      },
      {
        type: "bar",
        label: "Femenino",
        data: [5, 7, 20, 8, 10, 13, 5],
        fill: false,
        backgroundColor: "#ff4d4d",
        borderColor: "#ff4d4d",
        hoverBackgroundColor: "#ff4d4d",
        hoverBorderColor: "#ff4d4d",
        yAxisID: "y-axis-1",
      },
    ],
  };

  return (
    <div>
      {true ? (
        <div>
          <div className={classes.root}>
            <AppBar
              position="static"
              style={{ backgroundColor: "#F0F0F0" }}
              elevation={0}
            >
              <Toolbar className={classes.toolbar}>

                <Tabs
                  className={classes.title}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Perguntas" />
                  <Tab label="Estatística" />
                </Tabs>
              </Toolbar>
            </AppBar>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Copy and share link."}
              </DialogTitle>
              <DialogContent>
                <Paper className={classes.paper}>
                  <Grid
                    container
                    alignContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="body1">
                        {window.location.origin + "/s/" + formDeatils._id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        className={classes.button}
                        aria-label="Add"
                        size="medium"
                        onClick={clipToClipboard}
                      >
                        <FilterNoneIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
                

                <DialogContentText id="alert-dialog-description"></DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={openOfAlert}
              autoHideDuration={3000}
              onClose={handleCloseOfAlert}
              message="Copied to clipboard"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseOfAlert}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>

          <div>
            <TabPanel value={value} index={0}>
              <QuestionsTab formData={formDeatils} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div style={{ marginTop: "20px" }}>
                <Container style={{ maxWidth: "86.5%" }}>
                  <Grid container spacing={3}>
                    <Grid item lg={8} md={12} xl={9} xs={12}>
                      <LatestOrders
                        data={datas}
                        label={["10-15", "20-23", "24-26", "27-30"]}
                      />
                    </Grid>
                    <Grid item lg={4} md={6} xl={3} xs={12}>
                      <Budget
                        aprovados={10}
                        reprovados={15}
                        candidatos={25}
                        data={{
                          labels: ["Aprovados", "Reprovados"],
                          datasets: [
                            {
                              data: [10, 15],
                              backgroundColor: ["#0066ff", "#ff4d4d"],
                              hoverBackgroundColor: ["#0066ff", "#ff4d4d"],
                            },
                          ],
                        }}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </div>
            </TabPanel>
          </div>
        </div>
      ) : (
        <p>you're not the owner of the form</p>
      )}
    </div>
  );
}

export default QuestionView;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

