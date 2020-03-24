import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { TeamBox, Layout } from '../components';
import { useProjectLoading, useProjectData } from '../hooks';
import { getProjectCardList } from '../reducers/Project';

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

const ProjectPage = () => {
  const classes = useStyles();
  const [{ loadState }, setLoadState, dispatch] = useProjectLoading();
  const [
    { projectState, navState },
    setProjectState,
    setNavState,
  ] = useProjectData();
  const handleClickNav = event => {
    setNavState({ ...navState, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <Layout hasFooter>
        <Grid>
          <div>
            <FormControl className={classes.formcontrol}>
              <InputLabel shrink={false} id="fieldLabel">
                {navState.field === '' ? '분야' : ''}
              </InputLabel>
              <Select
                className={classes.select}
                labelId="fieldLabel"
                id="field"
                name="field"
                value={navState.field}
                onChange={handleClickNav}
                autoWidth
                variant="standard"
                disableUnderline
              >
                <MenuItem value="APP">앱 서비스</MenuItem>
                <MenuItem value="WEB">웹 서비스</MenuItem>
                <MenuItem value="AI">AI 서비스</MenuItem>
                <MenuItem value="BLOCKCHAIN">블록체인</MenuItem>
                <MenuItem value="HW">HW 개발</MenuItem>
                <MenuItem value="SYSTEM">시스템 개발</MenuItem>
                <MenuItem value="ETC">기타 개발</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formcontrol}>
              <InputLabel shrink={false} id="jobGroupLabel">
                {navState.occupation === '' ? '직군' : ''}
              </InputLabel>
              <Select
                className={classes.select}
                labelId="jobGroupLabel"
                id="occupation"
                name="occupation"
                value={navState.occupation}
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
            </FormControl>
            {/*
          <FormControl className={classes.formcontrol}>
            <InputLabel shrink={false} id="areaLabel">
              {navState.area === '' ? '지역' : ''}
            </InputLabel>
            <Select
              className={classes.select}
              labelId="areaLabel"
              id="area"
              name="area"
              value={navState.area}
              onChange={handleClickNav}
              autoWidth
              variant="standard"
              disableUnderline
            >
              <MenuItem value="SEOUL">서울</MenuItem>
              <MenuItem value="INCHEON">인천</MenuItem>
              <MenuItem value="NGYEONGI">경기북부</MenuItem>
              <MenuItem value="SGYEONGI">경기남부</MenuItem>
            </Select>
          </FormControl>
          */}
            <Button onClick={() => dispatch(getProjectCardList(navState))}>
              검색
            </Button>
          </div>
          <Link to="/makeproject" style={{ textDecoration: 'none' }}>
            <Button>프로젝트 팀 개설하기 ></Button>
          </Link>
        </Grid>
        <div>{projectState.length}개의 팀이 있습니다.</div>
        {projectState.length > 0 && (
          <Grid container>
            {projectState.map((value, i) => (
              <Link
                to={`/projects/${value.projectId}`}
                style={{ textDecoration: 'none' }}
              >
                <span
                  style={{ margin: '20px', cursor: 'pointer' }}
                  id={value.title + i}
                >
                  <TeamBox state={value} />
                </span>
              </Link>
            ))}
          </Grid>
        )}
        {projectState.length === 0 && (
          <Typography variant="subtitle1" align="center" color="error">
            찾는 항목이 존재하지 않습니다.
          </Typography>
        )}
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

export default ProjectPage;
