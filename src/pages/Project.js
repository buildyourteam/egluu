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
import { TeamBox } from '../components';
import { useProjectLoading, useProjectData } from '../hooks';

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
            <MenuItem value="앱 서비스">앱 서비스</MenuItem>
            <MenuItem value="웹 서비스">웹 서비스</MenuItem>
            <MenuItem value="AI 서비스">AI 서비스</MenuItem>
            <MenuItem value="블록체인">블록체인</MenuItem>
            <MenuItem value="HW 개발">HW 개발</MenuItem>
            <MenuItem value="시스템 개발">시스템 개발</MenuItem>
            <MenuItem value="기타 개발">기타 개발</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formcontrol}>
          <InputLabel shrink={false} id="jobGroupLabel">
            {navState.jobGroup === '' ? '직군' : ''}
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
        </FormControl>
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
            <MenuItem value="서울">서울</MenuItem>
            <MenuItem value="인천">인천</MenuItem>
            <MenuItem value="경기북부">경기북부</MenuItem>
            <MenuItem value="경기남부">경기남부</MenuItem>
          </Select>
        </FormControl>
        <Button>프로젝트 팀 개설하기 ></Button>
      </Grid>
      <div>{projectState.length}개의 팀이 있습니다.</div>
      <Grid container>
        {projectState.map((value, i) => (
          <span
            style={{ margin: '20px' }}
            id={value.title + i}
            onClick={() => (window.location = `/project/${value.projectId}`)}
          >
            <TeamBox state={value} />
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

export default ProjectPage;
