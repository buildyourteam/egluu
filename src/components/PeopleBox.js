import React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles({
  card: {
    maxWidth: 180,
    height: 180
  },
  media: {
    height: 180
  },
  stack: {
    width: 180,
    height: 180
  }
});
const theme = createMuiTheme({
  palette: {
    text: {
      primary: "#ffffff",
      secondary: "#000000"
    }
  }
});
export default function PeopleBox(props) {
  const classes = useStyles();
  const { state } = props;
  return (
    <Card
      className={classes.card}
      style={{ backgroundImage: `url(${state.imgUrl})`, backgroundSize: 250 }}
    >
      <CardActionArea>
        <CardContent
          style={{ backgroundColor: "rgba( 0, 0, 0, 0.5 )" }}
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
              {state.name}
            </Typography>
            <Typography
              className={classes.stack}
              variant="body2"
              component="p"
              color="textPrimary"
            >
              {state.tag.map((value, i) => (
                <span>#{value} </span>
              ))}
            </Typography>
          </MuiThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
