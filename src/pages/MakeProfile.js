import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ReactMarkdown from "react-markdown/with-html";
import TextField from "@material-ui/core/TextField";
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { ko } from "date-fns/locale";
import { useMakeProfileData, useMakeProfileLoading } from "../hooks";
import { ImgInput } from "../components";
import { makeProfile } from "../reducers/People";

const useStyles = makeStyles(theme => ({
  text: {
    color: "#ffffff"
  }
}));

const MakeProfile = () => {
  const classes = useStyles();
  const [{ loadState }, setLoadState, dispatch] = useMakeProfileLoading();
  const [{ makeProfileState }, setMakeProfileState] = useMakeProfileData();
  // const tempDate = new Date(MakeprojectState.endDay);

  const handleInput = e => {
    e.persist();
    setMakeProfileState({
      ...makeProfileState,
      [e.target.name]: e.target.value
    });
  };

  //   const handleInputMember = e => {
  //     setMakeProjectState({
  //       ...MakeprojectState,
  //       needMember: {
  //         [e.target.name]: e.target.value
  //       }
  //     });
  //   };

  //   const handleAddEndDate = date => {
  //     if (Date.parse(date) < Date.parse(new Date())) {
  //       alert("오늘 이전일로 설정 불가");
  //     } else {
  //       setMakeProjectState({
  //         ...MakeprojectState,
  //         endDate: date
  //       });
  //     }
  //   };

  const handleSave = async () => {
    console.log("저장하기");
    await dispatch(makeProfile(makeProfileState));
  };

  return (
    <div>
      <AppBar
        position="static"
        color="inherit"
        style={{ boxShadow: "none", textAlign: "center" }}
      >
        <Toolbar style={{ textAlign: "center" }}>
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
        <ImgInput state={makeProfileState} setState={setMakeProfileState} />
        <TextField
          name="userName"
          value={makeProfileState.userName}
          onChange={handleInput}
          fullWidth
          label="사용자 이름"
        />
        <TextField
          name="role"
          value={makeProfileState.role}
          onChange={handleInput}
          fullWidth
          label="역할"
        />
        <TextField
          name="stack"
          value={makeProfileState.stack}
          onChange={handleInput}
          fullWidth
          label="기술스택"
        />
        <TextField
          name="contact"
          value={makeProfileState.contact}
          onChange={handleInput}
          fullWidth
          label="연락처"
        />
        <TextField
          name="area"
          value={makeProfileState.area}
          onChange={handleInput}
          fullWidth
          label="활동 지역"
        />
        <TextField
          name="description"
          value={makeProfileState.description}
          onChange={handleInput}
          fullWidth
          label="자기소개"
          multiline
        />
        <ReactMarkdown
          source={makeProfileState.description}
          escapeHtml={false}
        />
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
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
        </MuiPickersUtilsProvider> */}
      </div>
      <footer
        style={{
          backgroundColor: "#eeeeee",
          height: "100px",
          textAlign: "center"
        }}
      >
        <Typography variant="h4" align="center" style={{ padding: "10px" }}>
          ESKIMO
        </Typography>
        <Typography variant="h6" align="center">
          문의 : manzi@kakao.com
        </Typography>
      </footer>
    </div>
  );
};

export default MakeProfile;
