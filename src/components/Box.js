/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
  lighten,
  withStyles,
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
import Grid from '@material-ui/core/Grid';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import Avatar from '@material-ui/core/Avatar';
import { lineHeight } from '@material-ui/system';
import CardActionArea from '@material-ui/core/CardActionArea';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  card: {
    width: 400,
    heigth: 400,
  },
  cardAction: {
    maxWidth: 400,
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
  etc: {
    color: '#ffffff',
    backgroundColor: '#BBC3CE',
    fontSize: 12,
    marginRight: 4,
    marginLeft: 4,
  },
  cardContent: {
    padding: 5,
  },
  peopleCard: {
    maxWidth: 180,
    height: 180,
  },
  media: {
    height: 180,
  },
  stack: {
    width: 180,
    height: 180,
  },
  rule: {
    float: 'left',
  },
});

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#ffffff',
      secondary: '#000000',
    },
  },
});

export function TeamBox(props) {
  const classes = useStyles();
  const { state } = props;
  const remainSum =
    state.needMember.developer +
    state.needMember.planner +
    state.needMember.etc +
    state.needMember.designer -
    state.currentMember.developer -
    state.currentMember.planner -
    state.currentMember.etc -
    state.currentMember.designer;

  const developerPercent =
    (state.currentMember.developer / state.needMember.developer) * 100;
  const plannerPercent =
    (state.currentMember.planner / state.needMember.planner) * 100;
  const etcPercent = (state.currentMember.etc / state.needMember.etc) * 100;
  const designerPercent =
    (state.currentMember.designer / state.needMember.designer) * 100;

  const BorderLinearProgress = withStyles({
    root: {
      height: 24,
      borderRadius: 20,
      backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c',
    },
  })(LinearProgress);
  return (
    <Card className={classes.card}>
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
          <Grid container item xs={4}>
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
              <Typography variant="body2">
                {state.dday}일 남았습니다.
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={8}>
            <Grid container spacing={1}>
              {[
                developerPercent,
                designerPercent,
                plannerPercent,
                etcPercent,
              ].map((value, index) => {
                return (
                  <Grid
                    container
                    style={{ margin: '0', padding: '2px' }}
                    item
                    xs={12}
                    spacing={1}
                  >
                    <Grid
                      item
                      xs={4}
                      style={{ margin: '0', padding: '0px 5px' }}
                    >
                      <Typography
                        className={classes.rule}
                        style={{ float: 'right' }}
                      >
                        {index === 0 && '개발자'}
                        {index === 1 && '디자이너'}
                        {index === 2 && '기획자'}
                        {index === 3 && '기타'}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} style={{ margin: '0', padding: '0' }}>
                      <BorderLinearProgress
                        className={classes.margin}
                        variant="determinate"
                        color="secondary"
                        value={value}
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function PeopleBox(props) {
  const classes = useStyles();
  const { state } = props;
  return (
    <Card
      className={classes.peopleCard}
      style={{ backgroundImage: `url(${state.imgUrl})`, backgroundSize: 250 }}
    >
      <CardActionArea>
        <CardContent
          style={{ backgroundColor: 'rgba( 0, 0, 0, 0.5 )' }}
          align="justify"
        >
          <MuiThemeProvider theme={theme}>
            <br />
            <br />
            <br />
            <br />
            <Typography color="textPrimary" align="justify">
              Lev.{state.level}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="textPrimary"
            >
              {state.userName}
            </Typography>
            <Typography
              className={classes.stack}
              variant="body2"
              component="p"
              color="textPrimary"
            >
              {state.stack}
            </Typography>
          </MuiThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
