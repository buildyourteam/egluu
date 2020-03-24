import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import { PeopleBox, Layout } from '../components';
import { usePeopleLoading, usePeopleData } from '../hooks';
import { getFindPeople } from '../reducers/People';

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
  return (
    <div>
      <Layout hasFooter>
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
          <FormControl className={classes.formcontrol}>
            <InputLabel shrink={false} id="sort">
              {navState.sort === '' ? '검색 조건' : ''}
            </InputLabel>
            <Select
              className={classes.select}
              labelId="sort"
              id="sort"
              name="sort"
              value={navState.sort}
              onChange={handleClickNav}
              autoWidth
              variant="standard"
              disableUnderline
            >
              <MenuItem value="user_name">이름</MenuItem>
              <MenuItem value="level">레벨</MenuItem>
              <MenuItem value="stack">기술 스택</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formcontrol}>
            <InputLabel shrink={false} id="level">
              {navState.level === '' ? '레벨' : ''}
            </InputLabel>
            <Select
              className={classes.select}
              labelId="level"
              id="level"
              name="level"
              value={navState.level}
              onChange={handleClickNav}
              autoWidth
              variant="standard"
              disableUnderline
            >
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formcontrol}>
            <InputLabel shrink={false} id="role">
              {navState.role === '' ? '담당' : ''}
            </InputLabel>
            <Select
              className={classes.select}
              labelId="role"
              id="role"
              name="role"
              value={navState.role}
              onChange={handleClickNav}
              autoWidth
              variant="standard"
              disableUnderline
            >
              <MenuItem value="LEADER">프로젝트장</MenuItem>
              <MenuItem value="TEAMMATE">팀원</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formcontrol}>
            <InputLabel shrink={false} id="area">
              {navState.area === '' ? '지역' : ''}
            </InputLabel>
            <Select
              className={classes.select}
              labelId="area"
              id="area"
              name="area"
              value={navState.area}
              onChange={handleClickNav}
              autoWidth
              variant="standard"
              disableUnderline
            >
              <MenuItem value="LEADER">프로젝트장</MenuItem>
              <MenuItem value="TEAMMATE">팀원</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => dispatch(getFindPeople(navState))}>
            검색
          </Button>
        </Grid>
        <div>{peopleState.length}마리의 User가 있습니다.</div>
        <Grid container>
          {peopleState.map((value, i) => (
            <Link
              to={`/profile/${value.userId}`}
              style={{ textDecoration: 'none' }}
            >
              <span style={{ margin: '20px' }} id={value.name + i}>
                <PeopleBox state={value} />
              </span>
            </Link>
          ))}
        </Grid>
      </Layout>
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
    </div>
  );
};

export default PeoplePage;
