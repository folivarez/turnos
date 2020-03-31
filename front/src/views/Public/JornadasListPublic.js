import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import moment from "moment-timezone";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2)
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center"
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const JornadasListPublic = props => {
  const classes = useStyles();
  const [listaJornadas, updateListaJornadas] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const response = await axios.get("http://localhost/v1/public");
      console.log(response.data.jornadas);
      updateListaJornadas(response.data.jornadas);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <Grid container>
          
        {listaJornadas.map(jornada => (
            
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            key={jornada._id}
          >
            <Card
              spacing={2}
              // {...rest}
              className={classes.root}
            >
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="h4">{jornada.localidad}</Typography>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      {moment(jornada.hora_prox_turno).format("D/M/YYYY HH:mm")}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default JornadasListPublic;
