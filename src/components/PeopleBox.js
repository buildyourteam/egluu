// import React from 'react';
// import PropTypes from 'prop-types';
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import PeopleAltSharpIcon from '@material-ui/icons/PeopleAltSharp';
// import Grid from '@material-ui/core/Grid';
// import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
// import Avatar from '@material-ui/core/Avatar';
// import { lineHeight } from '@material-ui/system';

// const useStyles = makeStyles({
//     card: {
//       width: 250,
//       heigth: 130
//     },
//     cardAction: {
//       maxWidth: 250,
//       heigth: 100,
//       padding: 0,
//       margin: 0
//     },
//     bullet: {
//       display: 'inline-block',
//       margin: '0 2px',
//       transform: 'scale(0.8)',
//     },
//     subtitle: {
//       fontSize: 8,
//     },
//     desc: {
//       fontSize: 14,
//     },
//     developer: {
//       color: '#ffffff',
//       backgroundColor: '#ff1744',
//       fontSize: 12,
//       marginRight: 4,
//       marginLeft: 4
//     },
//     designer: {
//       color: '#ffffff',
//       backgroundColor: '#ffc107',
//       fontSize: 12,
//       marginRight: 4,
//       marginLeft: 4
//     },
//     planner: {
//       color: '#ffffff',
//       backgroundColor: '#4caf50',
//       fontSize: 12,
//       marginRight: 4,
//       marginLeft: 4
//     },
//     cardContent: {
//       padding: 5
//     }
//   });



// export default function PeopleBox(props) {
//     const classes = useStyles();
//     const {state} = props
//     return (
//     <Card className={classes.card}>
//         <CardActions className={classes.cardAction}>
//             <img src={state.img} alt="11" style={{width: "100%", height: "180px", objectFit: 'cover', opacity: 0.5}}/>
                
//         </CardActions>
//         <CardContent className={classes.cardContent}>
//             <Typography variant="h5" component="h2">
//             {state.title}
//             </Typography>
//             <Grid container spacing={12}>
//                 <Grid container item xs={6}>
//                     <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
//                     {state.people}
//                     </Typography>
                    
//                 </Grid>
                
//             </Grid>
//         </CardContent>
//     </Card>
//     );
//   }
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 235,    
  },
  media: {
    height: 140,
  },
  stack: {
      width: 235
  }
});

export default function PeopleBox(props) {
  const classes = useStyles();
  const {state} = props
  return (
    <Card className={classes.card} style={{backgroundImage: `url(${state.img})`, backgroundSize: 250, opacity:0.5}}>
      <CardActionArea>
        
        <CardContent>            
            <Typography gutterBottom variant="h5" component="h2">
                {state.name}
            </Typography>
            
            <Typography className={classes.stack} variant="body2" color="textSecondary" component="p">
                {/* Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica */}
                {state.stack.map((value, i) => (                
                    <span>#{value} </span>                
                ))}
            </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}