import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import Grid from '@material-ui/core/Grid';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import Avatar from '@material-ui/core/Avatar';
import { lineHeight } from '@material-ui/system';
import { Line, Circle } from 'rc-progress';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  card: {
    width: 300,
    heigth: 500,
  },
  cardAction: {
    maxWidth: 300,
    heigth: 180,
    padding: 0,
    margin: 0,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  subtitle: {
    fontSize: 8,
  },
  desc: {
    fontSize: 14,
  },
  developer: {
    color: '#ffffff',
    backgroundColor: '#ff1744',
    fontSize: 12,
    marginRight: 4,
    marginLeft: 4,
  },
  designer: {
    color: '#ffffff',
    backgroundColor: '#ffc107',
    fontSize: 12,
    marginRight: 4,
    marginLeft: 4,
  },
  planner: {
    color: '#ffffff',
    backgroundColor: '#4caf50',
    fontSize: 12,
    marginRight: 4,
    marginLeft: 4,
  },
  cardContent: {
    padding: 5,
  },
  prog: {
    width: '100%',
    '& > * + *': {
      // marginTop: theme.spacing(2),
    },
  },
});

export default function TmpBox(props) {
  const classes = useStyles();
  const { state } = props;
  const nowDay = new Date();
  const remainSum =
    state.needMember.developer +
    state.needMember.planner +
    state.needMember.other +
    state.needMember.designer -
    state.currentMember.developer -
    state.currentMember.planner -
    state.currentMember.other -
    state.currentMember.designer;
  const remainDay = parseInt((state.Dday - nowDay) / (3600 * 60 * 24));
  return (
    <Card className={classes.card}>
      <div>
        <Line percent="100" strokeWidth="4" strokeColor="#2db7f5" />
      </div>
      <CardActions className={classes.cardAction}>
        <img
          src={state.imgUrl}
          alt="11"
          style={{ width: '100%', height: '180px', objectFit: 'cover' }}
        />
      </CardActions>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2">
          {state.projectName}
        </Typography>
        <Grid container spacing={12}>
          <Grid container item xs={6}>
            <Typography
              className={classes.subtitle}
              color="textSecondary"
              gutterBottom
            >
              {state.teamName}
            </Typography>
            <Grid container>
              <PeopleAltSharpIcon />
              <Typography variant="body2">{remainSum}명 남았습니다.</Typography>
            </Grid>
            <Grid container>
              <InsertInvitationIcon />
              <Typography variant="body2">{remainDay}일 남았습니다.</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={6}>
            <LinearProgress variant="determinate" value="50" />
            <Line percent="10" strokeWidth="4" strokeColor="#D3D3D3" />
            <div className={classes.root}>
              <LinearProgress variant="determinate" value="50" />
              <LinearProgress
                variant="determinate"
                value="100"
                color="secondary"
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
