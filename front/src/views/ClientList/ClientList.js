import React, { Fragment } from "react";
// import clsx from 'clsx';
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import FaceIcon from "@material-ui/icons/Face";
import TimerIcon from "@material-ui/icons/Timer";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CallIcon from "@material-ui/icons/Call";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import Forward30RoundedIcon from "@material-ui/icons/Forward30Rounded";
import PetsRoundedIcon from "@material-ui/icons/PetsRounded";
import ChildFriendlyRoundedIcon from "@material-ui/icons/ChildFriendlyRounded";

import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
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
    margin: theme.spacing(2)
  },
  content: {
    alignItems: "center",
    display: "flex"
  },
  contentCancel: {
    backgroundColor: theme.palette.error.main,
    color:'white'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 36,
    width: 36
  },
  avatarError: {
    backgroundColor: theme.palette.error.main,
    height: 36,
    width: 36
  },
  btn_cancel: {
    color: theme.palette.error.main
  },
  icon: {
    height: 22,
    width: 22
  },
  difference: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  differenceIcon: {
    color: theme.palette.primary,
    margin: theme.spacing(0.5)
  },
  petIcon: {
    color: theme.palette.success.main
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const ClientList = props => {
  //  const { className, ...rest } = props;

  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  // const [orders] = useState(mockData);

  return (
    <Fragment>
      <div>
        <Typography variant="h4">Lista de Clientes</Typography>
      </div>
      <div>
        <Typography variant="subtitle1">
          San Justo Centro | 25/04/2020 | Laura
        </Typography>
      </div>
    
    {/* ---------------------------------2--------------------------------------------- */}

    <Card
        spacing={2}
        // {...rest}
        className={classes.root}
      >
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                10:00 Hs.
              </Typography>
              <Typography variant="body1">$ 1200</Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <CheckIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                className={classes.title}
                // color="textSecondary"
                gutterBottom
                variant="h4"
              >
                Gonzalez Juan
              </Typography>
              <div className={classes.difference}>
              <ArtTrackIcon className={classes.differenceIcon} />
                <Typography variant="subtitle2">33.441.857</Typography>
              </div>
              <div className={classes.difference}>
                <CallIcon className={classes.differenceIcon} />
                <Typography variant="subtitle2">11-3567-4566</Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.difference}>
                <Avatar className={classes.avatar}>
                  <WhatsAppIcon className={classes.icon} />
                </Avatar>
              </div>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justify="space-between">
            <Grid item>
              <div className={classes.difference}>
                <PetsRoundedIcon className={classes.petIcon} />
                {/* <Forward30RoundedIcon className={classes.petIcon} /> */}
                {/* <ChildFriendlyRoundedIcon className={classes.petIcon} /> */}
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item>
              <div className={classes.difference}>
                <Button variant="outlined" className={classes.btn_cancel}>
                  Cancelar Turno
                </Button>
              </div>
              <Divider orientation="vertical" flexItem />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------------------------------------- */}

      <Card
        spacing={2}
        // {...rest}
        className={classes.root}
      >
        <CardContent className={classes.contentCancel}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                10:30 Hs.
              </Typography>
              <Typography variant="body1">$ 900</Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatarError}>
                <CloseIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                className={classes.title}
                // color="textSecondary"
                gutterBottom
                variant="h4"
              >
                Olivarez Federico
              </Typography>
              <div className={classes.difference}>
              <ArtTrackIcon className={classes.differenceIcon} />
                <Typography variant="subtitle2">33.441.857</Typography>
              </div>
              <div className={classes.difference}>
                <CallIcon className={classes.differenceIcon} />
                <Typography variant="subtitle2">11-3939-3962</Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.difference}>
                <Avatar className={classes.avatar}>
                  <WhatsAppIcon className={classes.icon} />
                </Avatar>
              </div>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justify="space-between">
            <Grid item>
              <div className={classes.difference}>
                <PetsRoundedIcon className={classes.petIcon} />
                <Forward30RoundedIcon className={classes.petIcon} />
                <ChildFriendlyRoundedIcon className={classes.petIcon} />
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item>
              <div className={classes.difference}>
                {/* <Button variant="outlined" className={classes.btn_cancel}>
                  Cancelar Turno
                </Button> */}
                <Typography variant="h6">Motivos Economicos</Typography>
              </div>
              <Divider orientation="vertical" flexItem />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* --------------------------------------------------------------------------------------------- */}

      <Card
        spacing={2}
        // {...rest}
        className={classes.root}
      >
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                10:00 Hs.
              </Typography>
              <Typography variant="body1">$ 900</Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <CheckIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justify="space-between">
            <Grid item>
              <Typography
                className={classes.title}
                // color="textSecondary"
                gutterBottom
                variant="h4"
              >
                Olivarez Federico
              </Typography>
              <div className={classes.difference}>
              <ArtTrackIcon className={classes.differenceIcon} />
                <Typography variant="subtitle2">33.441.857</Typography>
              </div>
              <div className={classes.difference}>
                <CallIcon className={classes.differenceIcon} />
                <Typography variant="subtitle2">11-3939-3962</Typography>
              </div>
            </Grid>
            <Grid item>
              <div className={classes.difference}>
                <Avatar className={classes.avatar}>
                  <WhatsAppIcon className={classes.icon} />
                </Avatar>
              </div>
            </Grid>
          </Grid>
          <Divider />
          <Grid container justify="space-between">
            <Grid item>
              <div className={classes.difference}>
                <PetsRoundedIcon className={classes.petIcon} />
                <Forward30RoundedIcon className={classes.petIcon} />
                <ChildFriendlyRoundedIcon className={classes.petIcon} />
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item>
              <div className={classes.difference}>
                <Button variant="outlined" className={classes.btn_cancel}>
                  Cancelar Turno
                </Button>
              </div>
              <Divider orientation="vertical" flexItem />
            </Grid>
          </Grid>
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

export default ClientList;
