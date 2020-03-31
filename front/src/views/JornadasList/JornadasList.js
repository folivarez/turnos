import React, { Fragment } from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FaceIcon from '@material-ui/icons/Face';
import TimerIcon from '@material-ui/icons/Timer';
// import mockData from './data';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3),
//   },
//   content: {
//     marginTop: theme.spacing(2)
//   },
//   content: {
//     padding: 0
//   },
//   inner: {
//     minWidth: 800
//   },
//   statusContainer: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   status: {
//     marginRight: theme.spacing(2)
//   },
//   actions: {
//     justifyContent: 'flex-end'
//   }
// }));

// const statusColors = {
//   delivered: 'success',
//   pending: 'info', 
//   refunded: 'danger'
// };

const useStyles = makeStyles(theme => ({
  root: {
    // height: '100%',
    margin: theme.spacing(2),

  },
  content: {
    alignItems: 'center',
    display: 'flex',

  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  avatarError: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const JornadasList = props => {
  //  const { className, ...rest } = props;

  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;


  // const [orders] = useState(mockData);

  return (
    <Fragment>
      <div>
        <Typography variant="h3">Lista de Jornadas</Typography>
      </div>

      <Card
        spacing={2}
        // {...rest}
        className={classes.root}
      >
        <CardContent >
          <Grid
            container
            justify="space-between"
          >
            <Grid item >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                25/4/2020 10:00 Hs.
            </Typography>
            <Typography variant="h4">SAN JUSTO CENTRO</Typography>
            </Grid>
            {/* <Grid item>
            <Typography
                className={classes.caption}
                variant="caption"
              >Direccion Parcial: A 100 metros de Edenor - San Justo.</Typography>
            </Grid> */}
            <Grid item>
              <Avatar className={classes.avatar}>
                <CheckIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>

          <div className={classes.difference}>
            <TimerIcon className={classes.differenceIcon} />
            <Typography
              className={classes.caption}
              variant="body1"
            >
              25 personas 1/2 hora.
          </Typography>
          
          </div>

          <div className={classes.difference}>
            <FaceIcon className={classes.differenceIcon} />
            <Typography
              className={classes.caption}
              variant="body1"
            >
              Laura
          </Typography>
          
          </div>
          
        </CardContent>
      </Card>

      <Card
        spacing={2}
        // {...rest}
        className={classes.root}
      >
        <CardContent >
          <Grid
            container
            justify="space-between"
          >
            <Grid item >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                25/4/2020 10:00 Hs.
            </Typography>
            <Typography variant="h4">ITUZAINGO</Typography>
            </Grid>
            {/* <Grid item>
            <Typography
                className={classes.caption}
                variant="caption"
              >Direccion Parcial: A 100 metros de Edenor - San Justo.</Typography>
            </Grid> */}
            <Grid item>
              <Avatar className={classes.avatar}>
                <CheckIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>

          <div className={classes.difference}>
            <TimerIcon className={classes.differenceIcon} />
            <Typography
              className={classes.caption}
              variant="body1"
            >
              15 personas 1/2 hora.
          </Typography>
          
          </div>

          <div className={classes.difference}>
            <FaceIcon className={classes.differenceIcon} />
            <Typography
              className={classes.caption}
              variant="body1"
            >
              Eugenia
          </Typography>
          
          </div>
          
        </CardContent>
      </Card>


      <Card
        spacing={2}
        // {...rest}
        className={classes.root}
      >
        <CardContent >
          <Grid
            container
            justify="space-between"
          >
            <Grid item >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                25/4/2020 10:00 Hs.
            </Typography>
            <Typography variant="h4">FLORENCIO VARELA</Typography>
            </Grid>
            {/* <Grid item>
            <Typography
                className={classes.caption}
                variant="caption"
              >Direccion Parcial: A 100 metros de Edenor - San Justo.</Typography>
            </Grid> */}
            <Grid item>
              <Avatar className={classes.avatarError}>
                <CloseIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>

          <div className={classes.difference}>
            <TimerIcon className={classes.differenceIcon} />
            <Typography
              className={classes.caption}
              variant="body1"
            >
              20 personas 1/2 hora.
          </Typography>
          
          </div>

          <div className={classes.difference}>
            <FaceIcon className={classes.differenceIcon} />
            <Typography
              className={classes.caption}
              variant="body1"
            >
              Rocio
          </Typography>
          
          </div>
          
        </CardContent>
      </Card>



      <Card
        spacing={2}
        // {...rest}
        className={classes.root}
      >
        <CardContent >
          <Grid
            container
            justify="space-between"
          >
            <Grid item >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                25/4/2020 10:00 Hs.
            </Typography>
            <Typography variant="h4">BERAZATEGUI</Typography>
            </Grid>
            {/* <Grid item>
            <Typography
                className={classes.caption}
                variant="caption"
              >Direccion Parcial: A 100 metros de Edenor - San Justo.</Typography>
            </Grid> */}
            <Grid item>
              <Avatar className={classes.avatarError}>
                <CloseIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>

          <div className={classes.difference}>
            <TimerIcon className={classes.differenceIcon} />
            <Typography
              className={classes.caption}
              variant="body1"
            >
              25 personas 1/2 hora.
          </Typography>
          
          </div>

          <div className={classes.difference}>
            <FaceIcon className={classes.differenceIcon} />
            <Typography
              className={classes.caption}
              variant="body1"
            >
              Laura
          </Typography>
          
          </div>
          
        </CardContent>
      </Card>



    </Fragment>


    // <Card
    //   {...rest}
    //   className={clsx(classes.root, className)}
    // >
    //   <CardHeader
    //     action={
    //       <Button
    //         color="primary"
    //         size="small"
    //         variant="outlined"
    //       >
    //         New entry
    //       </Button>
    //     }
    //     title="Jornadas Activas"
    //   />
    //   <Divider />
    //   <CardContent className={classes.content}>
    //     <PerfectScrollbar>
    //       <div className={classes.inner}>
    //         <Table size="small" aria-label="a dense table"  >
    //           <TableHead>
    //             <TableRow>
    //             <TableCell>Status</TableCell>
    //               <TableCell>Localidad</TableCell>
    //               <TableCell sortDirection="desc">
    //               <Tooltip
    //                   enterDelay={300}
    //                   title="Ordenar"
    //                 >
    //                   <TableSortLabel
    //                     active
    //                     direction="desc"
    //                   >
    //                     Fecha
    //                     </TableSortLabel>
    //               </Tooltip>
    //               </TableCell>
    //               <TableCell>Direccion</TableCell>
    //               <TableCell>Direccion Parcial</TableCell>
    //               <TableCell>Precio</TableCell>
    //               <TableCell>Turnos 1/2 hs</TableCell>
    //               <TableCell>Comienza</TableCell>
    //               <TableCell>Vete</TableCell>

    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {orders.map(order => (
    //               <TableRow
    //                 hover
    //                 key={order.status}
    //               >
    //                 <TableCell>
    //                   <div className={classes.statusContainer}>
    //                     <StatusBullet
    //                       className={classes.status}
    //                       color={statusColors[order.status]}
    //                       size="sm"
    //                     />
    //                   </div>
    //                 </TableCell>
    //                 <TableCell>{order.localidad}</TableCell>
    //                 <TableCell>{moment(order.createdAt).format('DD/MM/YYYY HH:mm')}</TableCell>
    //                 <TableCell>{order.direccion}</TableCell>
    //                 <TableCell>{order.direParcial}</TableCell>
    //                 <TableCell>{order.precio}</TableCell>
    //                 <TableCell>{order.turnosCadaMedia}</TableCell>
    //                 <TableCell>{moment(order.createdAt).format('HH:mm')}</TableCell>
    //                 <TableCell>{order.vete}</TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </div>
    //     </PerfectScrollbar>
    //   </CardContent>
    //   <Divider />
    //   <CardActions className={classes.actions}>
    //     <Button
    //       color="primary"
    //       size="small"
    //       variant="text"
    //     >
    //       View all <ArrowRightIcon />
    //     </Button>
    //   </CardActions>
    // </Card>




  );
};

// JornadasList.propTypes = {
//   className: PropTypes.string
// };

export default JornadasList;
