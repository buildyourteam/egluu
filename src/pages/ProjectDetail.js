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
import { useProjectDetailLoading, useProjectDetailData } from '../hooks';
import { ImgInput } from '../components';
import { setProjectDetail } from '../reducers/Project';

const useStyles = makeStyles(theme => ({
  text: {
    color: '#ffffff',
  },
}));

const ProjectPageDetail = () => {
  const classes = useStyles();
  const [{ loadState }, setLoadState, dispatch] = useProjectDetailLoading();
  const [
    { projectDetailState, open },
    setProjectDetailState,
    setOpen,
  ] = useProjectDetailData();
  const tempDate = new Date(projectDetailState.Dday);

  const handleInput = e => {
    e.persist();
    setProjectDetailState({
      ...projectDetailState,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputMember = e => {
    setProjectDetailState({
      ...projectDetailState,
      needMember: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSave = async () => {
    setOpen({ ...open, change: !open.change });
    await dispatch(setProjectDetail(projectDetailState));
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
          <Button onClick={() => setOpen({ ...open, change: !open.change })}>
            수정하기
          </Button>
          <div>
            <img src="fds" alt="" />
          </div>
        </Toolbar>
      </AppBar>
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
            name="projectDescription"
            value={projectDetailState.projectDescription}
            onChange={handleInput}
            fullWidth
            label="프로젝트 설명"
            multiline
          />
          <ReactMarkdown
            source={projectDetailState.projectDescription}
            escapeHtml={false}
          />
          <div>
            개발자 :
            <TextField
              name="projectDescription"
              type="number"
              value={projectDetailState.needMember.developer}
              onChange={handleInputMember}
            />
          </div>
          <div>
            기획자 :
            <TextField
              name="projectDescription"
              type="number"
              value={projectDetailState.needMember.planner}
              onChange={handleInputMember}
            />
          </div>
          <div>
            디자이너 :
            <TextField
              name="projectDescription"
              type="number"
              value={projectDetailState.needMember.designer}
              onChange={handleInputMember}
            />
          </div>
          <div>
            기타 :
            <TextField
              name="projectDescription"
              type="number"
              value={projectDetailState.needMember.other}
              onChange={handleInputMember}
            />
          </div>
          <Button onClick={handleSave}>저장하기</Button>
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: '#000000', position: 'relative' }}>
            <div>
              {typeof projectDetailState.imgUrl !== 'string' ? (
                <img
                  src={projectDetailState.imgUrl.url}
                  alt="이미지 에러"
                  align="center"
                  height="30%"
                  width="100%"
                  style={{ display: 'block', opacity: '0.5', hover: 1 }}
                />
              ) : (
                <div>
                  <img
                    src={projectDetailState.imgUrl}
                    alt="이미지 에러"
                    align="center"
                    height="30%"
                    width="100%"
                    style={{ display: 'block', opacity: '0.5', hover: 1 }}
                  />
                </div>
              )}
            </div>
          </div>
          <div style={{ margin: '5%', position: 'relative', top: '-30vh' }}>
            <Typography variant="h1" className={classes.text}>
              {projectDetailState.projectName}
            </Typography>
            <Typography variant="h3" className={classes.text}>
              {projectDetailState.teamName}
            </Typography>
          </div>
          <div style={{ margin: '5%', position: 'relative', top: '-30vh' }}>
            <ReactMarkdown
              source={projectDetailState.projectDescription}
              escapeHtml={false}
            />
            <Typography variant="h3">팀원 현황</Typography>
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
              {projectDetailState.needMember.other -
                projectDetailState.currentMember.other}
            </Typography>
            <Typography variant="h6">
              마감 일 :{' '}
              {`${tempDate.getFullYear()}년${tempDate.getMonth()}${1}월${tempDate.getDate()}일`}
            </Typography>
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

export default ProjectPageDetail;
