import React from "react";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PeopleAltSharpIcon from "@material-ui/icons/PeopleAltSharp";
import Grid from "@material-ui/core/Grid";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import LinearProgress from "@material-ui/core/LinearProgress";
const useStyles = makeStyles({
  card: {
    width: 300,
    heigth: 500
  },
  cardAction: {
    maxWidth: 300,
    heigth: 180,
    padding: 0,
    margin: 0
  },
  subtitle: {
    fontSize: 8
  },
  cardContent: {
    padding: 4
  },
  rule: {
    fontSize: 9,
    width: 35
  }
});

export default function TeamBox(props) {
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
  const developerPercent =
    (state.currentMember.developer / state.needMember.developer) * 100;
  const plannerPercent =
    (state.currentMember.planner / state.needMember.deveplannerloper) * 100;
  const otherPercent =
    (state.currentMember.other / state.needMember.other) * 100;
  const designerPercent =
    (state.currentMember.designer / state.needMember.designer) * 100;

  const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: lighten("#ff6c5c", 0.5)
    },
    bar: {
      borderRadius: 20,
      backgroundColor: "#ff6c5c"
    }
  })(LinearProgress);
  return (
    <Card className={classes.card}>
      <CardActions className={classes.cardAction}>
        <img
          src={state.imgUrl}
          alt="11"
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
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
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={1}>
                <React.Fragment>
                  <Grid item xs={4}>
                    <Typography className={classes.rule}>개발자</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <BorderLinearProgress
                      className={classes.margin}
                      variant="determinate"
                      color="secondary"
                      value={developerPercent}
                    />
                  </Grid>
                </React.Fragment>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <React.Fragment>
                  <Grid item xs={4}>
                    <Typography className={classes.rule}>디자이너</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <BorderLinearProgress
                      className={classes.margin}
                      variant="determinate"
                      color="secondary"
                      value={designerPercent}
                    />
                  </Grid>
                </React.Fragment>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <React.Fragment>
                  <Grid item xs={4}>
                    <Typography className={classes.rule}>기획자</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <BorderLinearProgress
                      className={classes.margin}
                      variant="determinate"
                      color="secondary"
                      value={plannerPercent}
                    />
                  </Grid>
                </React.Fragment>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <React.Fragment>
                  <Grid item xs={4}>
                    <Typography className={classes.rule}>기타</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <BorderLinearProgress
                      className={classes.margin}
                      variant="determinate"
                      color="secondary"
                      value={otherPercent}
                    />
                  </Grid>
                </React.Fragment>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
