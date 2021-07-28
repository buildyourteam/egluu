import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Layout,
  DropdownRole,
  CenterModal,
} from "../../components";
import { Link } from "react-router-dom";
import { setProject } from "../../reducers/project";
import {
  useProjectDetailStateTs,
  useProjectDetailEffectTs,
  useInputProjectApplyStateTs,
  useInputProjectApplyEffectTs,
  useViewProjectApplyStateTs,
  useViewProjectApplyEffectTs,
} from "../../hook/projectTs";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

const ReactMarkdown = require("react-markdown");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
  },
  fullDiv: {
    width: "100%",
    minHeight: "36px",
    "&::after": {
      display: "block",
      clear: "both",
      content: '"',
    },
  },
  floatRBtn: {
    float: "right",
  },
  inputGrid: {
    "&::after": {
      clear: "both",
      content: '""',
      display: "block",
    },
  },
  halfDivLeft: {
    padding: "10px 10px 10px 0",
    float: "left",
    width: "50%",
    "& > img": {
      width: "100%",
      height: "100%",
    },
  },
  halfDivRight: {
    padding: "10px",
    float: "right",
    width: "50%",
    "& > h4": {
      color: "gray",
      margin: "0px 0px 30px 0px",
    },
  },
  inputImg: {
    width: "380px",
    height: "380px",
    margin: "auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  fullInput: {
    width: "100%",
  },
  inputLabel: {
    marginTop: "5px",
    marginBottom: "2px",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  delBtn: {
    marginLeft: "20px",
  },
  tag: {
    backgroundColor: "gray",
    borderRadius: "25px",
    width: "auto",
    padding: "5px 10px",
    opacity: "0.7",
    color: "white",
    fontSize: "15px",
  },
  tagCase: {
    padding: "20px 0px 20px 0px",
  },
  intoduction: {
    display: "block",
  },
  applyList: {
    lineHeight: "22px",
    marginRight: "10px",
    display: "inline-block",
  },
}));

export default function ProjectDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = useStyles();
  const url = location.pathname.split("/");
  const projectId = url[2];
  const { project, projectAction } = useProjectDetailStateTs();

  useProjectDetailEffectTs(project, projectAction, url[2]);

  const handleClickUpdate = () => {
    const updateProject = {
      img: [`${process.env.REACT_APP_BASE_URL}projects/image/${url[2]}`],
      ...project.project,
    };
    dispatch(setProject(updateProject));
  };

  const needList = [
    {
      title: "개발자",
      number: project.project.currentMember.developer,
    },
    {
      title: "디자이너",
      number: project.project.currentMember.designer,
    },
    {
      title: "기획자",
      number: project.project.currentMember.planner,
    },
    {
      title: "기타",
      number: project.project.currentMember.etc,
    },
  ];

  const allList = [
    {
      title: "개발자",
      number: project.project.needMember.developer,
    },
    {
      title: "디자이너",
      number: project.project.needMember.designer,
    },
    {
      title: "기획자",
      number: project.project.needMember.planner,
    },
    {
      title: "기타",
      number: project.project.needMember.etc,
    },
  ];

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.fullDiv}>
          {project.check.reader ? (
            <div className={classes.floatRBtn}>
              <Link to={`/projectUpdate/${url[2]}`}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickUpdate}
                >
                  수정하기
                </Button>
              </Link>
              <Button
                onClick={projectAction.openDelete}
                className={classes.delBtn}
                color="secondary"
                variant="contained"
              >
                삭제하기
              </Button>
              <CenterModal
                header="삭제하기"
                modalFlag={project.check.delete}
                close={projectAction.closeDelete}
                footer={
                  <div className={classes.fullDiv}>
                    <div className={classes.floatRBtn}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          projectAction.deleteProjectApi(projectId)
                        }
                      >
                        삭제하기
                      </Button>
                    </div>
                  </div>
                }
              >
                <div style={{ height: "12px" }} />
                <Typography variant="h3">정말로 삭제하시겠습니까?</Typography>
                <div style={{ height: "12px" }} />
              </CenterModal>
            </div>
          ) : (
            <div className={classes.floatRBtn}>
              <Button
                variant="contained"
                color="primary"
                onClick={projectAction.openApply}
              >
                지원서
              </Button>
              <CenterModal
                header="지원하기"
                modalFlag={project.check.applyModal}
                close={projectAction.closeApply}
              >
                <ApplyProject
                  questions={project.project.questions}
                  projectId={projectId}
                  apiLink={project.project._links.apply.href}
                  detailGet={project.getProject.fulfilled}
                  close={projectAction.closeApply}
                />
              </CenterModal>
            </div>
          )}
        </div>
        <div className={classes.inputGrid}>
          <div className={classes.halfDivLeft}>
            <img
              id="cover"
              src={`${process.env.REACT_APP_BASE_URL}projects/image/${url[2]}`}
              alt="temp"
            />
          </div>
          <div className={classes.halfDivRight}>
            <div>
              <span id="tag">{project.project.projectField}</span>
            </div>
            <Typography variant="h3">{project.project.projectName}</Typography>
            <Typography variant="h4">{project.project.teamName}</Typography>
            <Typography variant="h5">
              마감일 : {project.project.endDate}
            </Typography>
            <div>
              <div className={classes.halfDivLeft}>
                <List
                  component="nav"
                  subheader={
                    <ListSubheader component="div">모집 중 인원</ListSubheader>
                  }
                >
                  {needList.map((item, idx) => {
                    return (
                      <ListItem
                        key={item.title}
                        disabled={project.getProject.pending}
                      >
                        <ListItemText
                          primary={item.title}
                          secondary={`${item.number}명`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
              <div className={classes.halfDivRight}>
                <List
                  component="nav"
                  subheader={
                    <ListSubheader component="div">전체 인원</ListSubheader>
                  }
                >
                  {allList.map((item, idx) => {
                    return (
                      <ListItem
                        key={item.title}
                        disabled={project.getProject.pending}
                      >
                        <ListItemText
                          primary={item.title}
                          secondary={`${item.number}명`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>
          </div>
        </div>
        <Typography variant="h5">소개</Typography>
        <ReactMarkdown
          source={project.project.introduction}
          className={classes.intoduction}
        />
        {project.check.reader && (
          <div>
            <div>
              <Typography variant="body1" className={classes.applyList}>
                지원자 목록
              </Typography>
              <Switch
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  checked: boolean,
                ) => projectAction.checkSwitch("apply", checked)}
              />
              {project.check.apply &&
                (project.apply.length === 0 ? (
                  <div>지원자가 없습니다 </div>
                ) : (
                  <div>
                    <List
                      component="nav"
                      style={{
                        backgroundColor:
                          project.apply[project.pagination.apply].state ===
                          "REJECT"
                            ? "#eeeeee"
                            : project.apply[project.pagination.apply].state ===
                              "ACCEPT"
                            ? "rgb(212, 237, 218, 0.3)"
                            : "#ffffff",
                      }}
                      subheader={
                        <ListSubheader component="div">지원 현황</ListSubheader>
                      }
                    >
                      {project.apply.map((item, idx) => {
                        return (
                          <ListItem button key={item.userName}>
                            <ListItemText primary={item.role} />
                            <ListItemText primary="Inbox" />
                          </ListItem>
                        );
                      })}
                    </List>
                    <Button onClick={projectAction.openDetailApply}>
                      상세보기
                    </Button>
                    <Button
                      disabled={project.pagination.apply === 0}
                      onClick={() => projectAction.clickPagination("apply", -1)}
                    >
                      이전
                    </Button>
                    <Button
                      disabled={
                        project.apply.length - project.pagination.apply < 2
                      }
                      onClick={() => projectAction.clickPagination("apply", 1)}
                    >
                      다음
                    </Button>
                    <CenterModal
                      header="지원자 상세 정보"
                      modalFlag={project.check.applyDetail}
                      close={projectAction.closeDetailApply}
                    >
                      <ViewProjectApply
                        open={project.check.applyDetail}
                        close={projectAction.closeDetailApply}
                        applyLink={
                          project.apply[project.pagination.apply]._links.self
                            .href
                        }
                        applySet={projectAction.setApply}
                        userId={project.apply[project.pagination.apply].userId}
                        setPagination={() =>
                          projectAction.clickPagination("apply", 0)
                        }
                      />
                    </CenterModal>
                  </div>
                ))}
            </div>
            <div style={{ marginTop: "10px" }}>
              <Typography
                variant="body1"
                className={classes.applyList}
                style={{
                  lineHeight: "22px",
                  marginRight: "10px",
                  display: "inline-block",
                }}
              >
                요청 목록
              </Typography>
              <Switch
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  checked: boolean,
                ) => projectAction.checkSwitch("recruit", checked)}
              />
              {project.check.recruit &&
                (project.recruit.length === 0 ? (
                  <div>요청이 없습니다 </div>
                ) : (
                  <div>
                    <List
                      component="nav"
                      style={{
                        backgroundColor:
                          project.apply[project.pagination.apply].state ===
                          "REJECT"
                            ? "#eeeeee"
                            : project.apply[project.pagination.apply].state ===
                              "ACCEPT"
                            ? "rgb(212, 237, 218, 0.3)"
                            : "#ffffff",
                      }}
                      subheader={
                        <ListSubheader component="div">지원 상태</ListSubheader>
                      }
                    >
                      {project.recruit.map((item, idx) => {
                        return (
                          <ListItem button key={item.userName}>
                            <ListItemText primary={item.userName} />
                            <ListItemText
                              primary="역할"
                              secondary={item.role}
                            />
                            <ListItemText
                              primary="역할"
                              secondary={item.introduction}
                            />
                            <ListItemText
                              primary="역할"
                              secondary={item.state}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                    <Button
                      disabled={project.pagination.recruit === 0}
                      onClick={() =>
                        projectAction.clickPagination("recruit", -1)
                      }
                    >
                      이전
                    </Button>
                    <Button
                      disabled={
                        project.recruit.length - project.pagination.recruit < 2
                      }
                      onClick={() =>
                        projectAction.clickPagination("recruit", 1)
                      }
                    >
                      다음
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

const ApplyProject = (props: any) => {
  const { questions, projectId, apiLink, detailGet, close } = props;
  const { apply, applyAction } = useInputProjectApplyStateTs();
  useInputProjectApplyEffectTs(
    apply,
    applyAction,
    questions,
    detailGet,
    apiLink,
    close,
  );

  return (
    <div id="drawer_root">
      <div style={{ height: "12px" }} />
      {apply.apply.answers.map((a, i) => (
        <div>
          <label htmlFor={`q${i}`} style={{ fontSize: "15px" }}>
            {i + 1}번 질문 : {questions[i]}
          </label>
          <Input
            id={`q${i}`}
            placeholder="answer"
            name="answer"
            onChange={(e) => applyAction.inputAnswer(e.target.value, i)}
            value={a}
          />
        </div>
      ))}
      <label
        htmlFor="introduction"
        style={{ marginBottom: "0px", marginTop: "15px", fontSize: "16px" }}
      >
        자기 소개
      </label>
      <TextField
        id="introduction"
        name="introduction"
        placeholder="자기소개"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          applyAction.inputApply(e.target.name, e.target.value)
        }
        value={apply.apply.introduction}
        rows={4}
        multiline
      />
      <DropdownRole
        style={{ width: "100%", marginTop: "12px" }}
        dropdownCaret="역할 선택"
        action={applyAction.selectRole}
        pick={apply.apply.role}
      />
      <div className="full_div" style={{ marginTop: "12px" }}>
        <div id="button">
          {apply.applied ? (
            <Button
              color="primary"
              variant="contained"
              disabled={apply.putApply.pending}
              onClick={() => {
                applyAction.putApplyApi(
                  {
                    answers: apply.apply.answers,
                    introduction: apply.apply.introduction,
                    role: apply.apply.role,
                  },
                  apiLink,
                );
              }}
            >
              수정하기
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              disabled={apply.postApply.pending}
              onClick={() => {
                applyAction.postApplyApi(
                  {
                    answers: apply.apply.answers,
                    introduction: apply.apply.introduction,
                    role: apply.apply.role,
                  },
                  apiLink,
                );
              }}
            >
              지원하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const ViewProjectApply = (props: any) => {
  const { open, close, applyLink, applySet, userId, setPagination } = props;
  const { applyDetail, applyDetailAction } = useViewProjectApplyStateTs();

  useViewProjectApplyEffectTs(
    applyDetail,
    applyDetailAction,
    open,
    applyLink,
    applySet,
    userId,
    close,
  );
  return (
    <div id="drawer_root">
      <div style={{ height: "12px" }} />
      {applyDetail.apply.answers.map((a: string, i: number) => (
        <div>
          <Typography variant="h5">
            {" "}
            {i + 1}번 질문 : {applyDetail.apply.questions[i]}
          </Typography>
          <Typography variant="h5">{a}</Typography>
          <div style={{ height: "12px" }} />
        </div>
      ))}
      <label htmlFor="exampleEmail" style={{ marginBottom: "0px" }}>
        자기 소개
      </label>
      <Typography variant="h5">{applyDetail.apply.introduction}</Typography>
      <div style={{ height: "12px" }} />
      <Typography variant="h5">지원 분야 : {applyDetail.apply.role}</Typography>
      <div style={{ height: "12px" }} />
      <div className="full_div">
        <div id="button">
          <Button
            onClick={() => {
              applyDetailAction.putApplyApi(applyLink);
            }}
          >
            수락
          </Button>
          <Button
            onClick={() => {
              applyDetailAction.deleteApplyApi(applyLink);
            }}
          >
            거절
          </Button>
        </div>
      </div>
      <div style={{ height: "12px" }} />
    </div>
  );
};
