import React from 'react';
import { usePeopleLoading, usePeopleData } from '../hooks';
import { PeopleBox } from '../components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  appbar: {
    margin: '0px',
  },
  select: {
    width: '100%',
    borderColor: '#000000',
  },
  formcontrol: {
    width: '25%',
  },
}));

const PeoplePage = () => {
  const classes = useStyles();
  const [{ loadState }, setLoadState, dispatch] = usePeopleLoading();
  const [
    { peopleState, navState },
    setPeopleState,
    setNavState,
  ] = usePeopleData();
  const handleClickNav = event => {
    setNavState({ ...navState, [event.target.name]: event.target.value });
  };
  console.log(peopleState);
  return (
    <div>
      <AppBar
        position="static"
        color="inherit"
        style={{ boxShadow: 'none', textAlign: 'center' }}
      >
        <Toolbar style={{ textAlign: 'center' }}>
          <Typography variant="h6" align="center" display="inline">
            ESKIMO
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid>
        <FormControl className={classes.formcontrol}>
          <InputLabel shrink={false} id="tagLabel">
            {navState.tag === '' ? '분야' : ''}
          </InputLabel>
          <Select
            className={classes.select}
            labelId="tagLabel"
            id="tag"
            name="tag"
            value={navState.tag}
            onChange={handleClickNav}
            autoWidth
            variant="standard"
            disableUnderline
          >
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Django">Django</MenuItem>
            <MenuItem value="JAVA">JAVA</MenuItem>
            <MenuItem value="React JS">React JS</MenuItem>
            <MenuItem value="Vue JS">Vue JS</MenuItem>
            <MenuItem value="Spring boot">Spring boot</MenuItem>
            <MenuItem value="Ruby on Rails">Ruby on Rails</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl className={classes.formcontrol}>
          <InputLabel shrink={false} id="jobGroupLabel">
            {navState.jobGroup === "" ? "직군" : ""}
          </InputLabel>
          <Select
            className={classes.select}
            labelId="jobGroupLabel"
            id="jobGroup"
            name="jobGroup"
            value={navState.jobGroup}
            onChange={handleClickNav}
            autoWidth
            variant="standard"
            disableUnderline
          >
            <MenuItem value="developer">개발자</MenuItem>
            <MenuItem value="designer">디자이너</MenuItem>
            <MenuItem value="planner">기획자</MenuItem>
            <MenuItem value="etc">기타직군</MenuItem>
          </Select>
        </FormControl> */}
      </Grid>
      <div>{peopleState.length}마리의 User가 있습니다.</div>
      <Grid container>
        {peopleState.map((value, i) => (
          <span
            style={{ margin: '20px' }}
            id={value.name + i}
            onClick={() => (window.location = `/people/${value.userId}`)}
          >
            <PeopleBox state={value} />
          </span>
        ))}
      </Grid>
      <Dialog open={loadState.open}>
        <MuiDialogContent
          style={{
            background: 'white',
            width: '160px',
            minHeight: '80px',
            textAlign: 'center',
          }}
        >
          <MuiCircularProgress style={{ width: '20%', height: '20%' }} />
          <div style={{ marginTop: '12px' }}>{loadState.text}</div>
          <Button
            onClick={() => {
              setLoadState({ ...loadState, open: false });
            }}
          >
            닫기
          </Button>
        </MuiDialogContent>
      </Dialog>
      <footer
        style={{
          backgroundColor: '#eeeeee',
          height: '100px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" align="center" style={{ padding: '10px' }}>
          ESKIMO
        </Typography>
        <Typography variant="h6" align="center">
          문의 : manzi@kakao.com
        </Typography>
      </footer>
    </div>
  );
};

export default PeoplePage;
