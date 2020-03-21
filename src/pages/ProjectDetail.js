import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import ReactMarkdown from 'react-markdown/with-html';
import TextField from '@material-ui/core/TextField';
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { format } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { ko } from 'date-fns/locale';
import { useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProjectDetail, setProjectDelete } from '../reducers/Project';
import { ImgInput, Layout } from '../components';
import {
  useProjectDetailLoading,
  useProjectDetailData,
  useLoginCheck,
} from '../hooks';

const axios = require('axios');

const useStyles = makeStyles(theme => ({
  text: {
    color: '#ffffff',
  },
}));

const ProjectPageDetail = () => {
  const classes = useStyles();
  const url = useLocation();
  const token = useLoginCheck();
  const project2 = useSelector(state => state.Project.project);
  const [applyList, setApplyList] = React.useState();
  const [{ loadState }, setLoadState, dispatch] = useProjectDetailLoading();
  const [
    { projectDetailState, open },
    setProjectDetailState,
    setOpen,
  ] = useProjectDetailData();
  const [list, setList] = React.useState(false);
  // 같은 setstate 여러번 쓰면 마지막꺼만 반영되므로
  const handleInput = e => {
    e.persist();
    setProjectDetailState(value => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleInputMember = e => {
    setProjectDetailState({
      ...projectDetailState,
      needMember: {
        ...projectDetailState.needMember,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleAddEndDate = date => {
    if (Date.parse(date) < Date.parse(new Date())) {
      alert('오늘 이전일로 설정 불가');
    } else {
      setProjectDetailState({
        ...projectDetailState,
        endDate: date,
      });
    }
  };

  const handleClickList = async () => {
    setLoadState({ open: true, test: 'loading....' });
    const res = await axios.get(`${project2._links.apply.href}`, {
      headers: { authToken: token },
    });
    console.log(res);
    setApplyList(res.data._embedded.projectApplicantDtoList);
    setList(true);
    setLoadState({ open: false, test: 'loading....' });
  };

  const handleSave = async () => {
    setOpen({ ...open, change: !open.change });
    await dispatch(setProjectDetail(projectDetailState));
  };
  return (
    <div>
      <Layout hasFooter>
        <Button onClick={() => setOpen({ ...open, change: !open.change })}>
          수정하기
        </Button>
        <Button
          onClick={() => {
            dispatch(setProjectDelete());
          }}
        >
          삭제
        </Button>
        <Link to={`${url.pathname}/apply`}>
          <Button>참가신청</Button>
        </Link>

        <Button onClick={handleClickList}>리스트 조회하기</Button>
        {list && (
          <div>
            {applyList.map((value, index) => {
              return (
                <ul>
                  <li>이름 : {value.userName}</li>
                  <li>상태 : {value.status}</li>
                  <li>역할 : {value.role}</li>
                </ul>
              );
            })}
          </div>
        )}
        {open.change ? (
          <div>
            <ImgInput
              state={projectDetailState}
              setState={setProjectDetailState}
            />
            <TextField
              name="projectName"
              value={projectDetailState.projectName}
              onChange={handleInput}
              fullWidth
              label="프로젝트 이름"
            />
            <TextField
              name="teamName"
              value={projectDetailState.teamName}
              onChange={handleInput}
              fullWidth
              label="팀 이름"
            />
            <TextField
              name="description"
              value={projectDetailState.description}
              onChange={handleInput}
              fullWidth
              label="프로젝트 설명"
              multiline
            />
            <ReactMarkdown
              source={projectDetailState.description}
              escapeHtml={false}
            />
            <div>
              개발자 :
              <TextField
                name="developer"
                type="number"
                value={projectDetailState.needMember.developer}
                onChange={handleInputMember}
              />
            </div>
            <div>
              기획자 :
              <TextField
                name="planner"
                type="number"
                value={projectDetailState.needMember.planner}
                onChange={handleInputMember}
              />
            </div>
            <div>
              디자이너 :
              <TextField
                name="designer"
                type="number"
                value={projectDetailState.needMember.designer}
                onChange={handleInputMember}
              />
            </div>
            <div>
              기타 :
              <TextField
                name="etc"
                type="number"
                value={projectDetailState.needMember.etc}
                onChange={handleInputMember}
              />
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
              <MuiDateTimePicker
                name="endDate"
                onChange={handleAddEndDate}
                value={projectDetailState.endDate}
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
            <Button onClick={handleSave}>저장하기</Button>
          </div>
        ) : (
          <div>
            <div style={{ backgroundColor: '#000000', position: 'relative' }}>
              <span>
                {typeof projectDetailState.imgUrl !== 'string' ? (
                  <img
                    src={projectDetailState.imgUrl.url}
                    alt="이미지 에러"
                    align="center"
                    height="30%"
                    width="100%"
                    style={{ display: 'inline', opacity: '0.5', hover: 1 }}
                  />
                ) : (
                  <span>
                    <img
                      src={projectDetailState.imgUrl}
                      alt="이미지 에러"
                      align="center"
                      height="30%"
                      width="100%"
                      style={{ display: 'inline', opacity: '0.5', hover: 1 }}
                    />
                  </span>
                )}
              </span>
              <span
                style={{
                  margin: '5%',
                  position: 'inline',
                  overflow: 'hidden',
                }}
              >
                <Typography variant="h1" className={classes.text}>
                  {projectDetailState.projectName}
                </Typography>
                <Typography variant="h3" className={classes.text}>
                  {projectDetailState.teamName}
                </Typography>
              </span>
            </div>

            <div style={{ margin: '5%', position: 'relative' }}>
              <ReactMarkdown
                source={projectDetailState.description}
                escapeHtml={false}
              />
              <Typography variant="h3">필요 인력</Typography>
              <Typography variant="h6">
                개발 :{' '}
                {projectDetailState.needMember.developer -
                  projectDetailState.currentMember.developer}
              </Typography>
              <Typography variant="h6">
                기획 :{' '}
                {projectDetailState.needMember.planner -
                  projectDetailState.currentMember.planner}
              </Typography>
              <Typography variant="h6">
                디자이너 :{' '}
                {projectDetailState.needMember.designer -
                  projectDetailState.currentMember.designer}
              </Typography>
              <Typography variant="h6">
                기타 :{' '}
                {projectDetailState.needMember.etc -
                  projectDetailState.currentMember.etc}
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
                <MuiDateTimePicker
                  name="endDate"
                  value={projectDetailState.endDate}
                  format="yy년 MM월 dd일 HH시 mm분"
                  placeholder="00년 00월 00일 00시 00분"
                  variant="dialog"
                  disableUnderline
                  disableToolbar={false}
                  hideTabs
                  clearable
                  ampm
                  disabled
                />
              </MuiPickersUtilsProvider>
            </div>
            <Typography variant="h6">
              팀원 현황 ... 데이터 추가후 추가예정
            </Typography>
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
        )}
      </Layout>
    </div>
  );
};

export default ProjectPageDetail;
