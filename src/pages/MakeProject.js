import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown/with-html';
import TextField from '@material-ui/core/TextField';
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { ko } from 'date-fns/locale';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeProject } from '../reducers/Project';
import { ImgInput } from '../components';
import { useMakeProjectData, useMakeProjectLoading } from '../hooks';

const useStyles = makeStyles(theme => ({
  text: {
    color: '#ffffff',
  },
}));

const MakeProject = () => {
  const classes = useStyles();
  const [{ loadState }, setLoadState, dispatch] = useMakeProjectLoading();
  const [{ MakeprojectState }, setMakeProjectState] = useMakeProjectData();
  // const tempDate = new Date(MakeprojectState.endDay);

  const handleInput = e => {
    e.persist();
    setMakeProjectState({
      ...MakeprojectState,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputMember = e => {
    const data = parseInt(e.target.value);
    setMakeProjectState({
      ...MakeprojectState,
      needMember: {
        ...MakeprojectState.needMember,
        [e.target.name]: data,
      },
    });
  };

  const handleAddEndDate = date => {
    if (Date.parse(date) < Date.parse(new Date())) {
      alert('오늘 이전일로 설정 불가');
    } else {
      setMakeProjectState({
        ...MakeprojectState,
        endDate: date,
      });
    }
  };

  const handleSave = async () => {
    console.log('저장하기');
    await dispatch(makeProject(MakeprojectState));
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
          <Button onClick={handleSave}>저장하기</Button>
          <div>
            <img src="fds" alt="" />
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <ImgInput state={MakeprojectState} setState={setMakeProjectState} />
        <TextField
          name="projectName"
          value={MakeprojectState.projectName}
          onChange={handleInput}
          fullWidth
          label="프로젝트 이름"
        />
        <TextField
          name="teamName"
          value={MakeprojectState.teamName}
          onChange={handleInput}
          fullWidth
          label="팀 이름"
        />
        <TextField
          name="description"
          value={MakeprojectState.description}
          onChange={handleInput}
          fullWidth
          label="프로젝트 설명"
          multiline
        />
        <ReactMarkdown
          source={MakeprojectState.description}
          escapeHtml={false}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
          <MuiDateTimePicker
            name="endDate"
            value={MakeprojectState.endDate}
            onChange={handleAddEndDate}
            format="yy년 MM월 dd일 HH시 mm분"
            placeholder="00년 00월 00일 00시 00분"
            variant="dialog"
            disableUnderline
            disableToolbar={false}
            hideTabs
            clearable
            ampm
          />
        </MuiPickersUtilsProvider>
        <div>
          <FormControl style={{ width: '20vw' }}>
            <InputLabel shrink={false} id="fieldLabel">
              {MakeprojectState.field === '' ? '분야' : ''}
            </InputLabel>
            <Select
              className={classes.select}
              labelId="fieldLabel"
              id="field"
              name="field"
              value={MakeprojectState.field}
              onChange={handleInput}
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
        </div>
        <div>
          개발자 :
          <TextField
            name="developer"
            type="number"
            value={MakeprojectState.needMember.developer}
            onChange={handleInputMember}
          />
        </div>
        <div>
          기획자 :
          <TextField
            name="planner"
            type="number"
            value={MakeprojectState.needMember.planner}
            onChange={handleInputMember}
          />
        </div>
        <div>
          디자이너 :
          <TextField
            name="designer"
            type="number"
            value={MakeprojectState.needMember.designer}
            onChange={handleInputMember}
          />
        </div>
        <div>
          기타 :
          <TextField
            name="etc"
            type="number"
            value={MakeprojectState.needMember.etc}
            onChange={handleInputMember}
          />
        </div>
      </div>
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

export default MakeProject;
