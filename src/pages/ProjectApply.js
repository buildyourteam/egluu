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
import { useSelector, useDispatch } from 'react-redux';
import { setProjectDetail, setProjectDelete } from '../reducers/Project';
import { ImgInput, Layout } from '../components';
import { useProjectDetailLoading, useProjectDetailData } from '../hooks';

const useStyles = makeStyles(theme => ({
  text: {
    color: '#ffffff',
  },
}));

const ProjectApply = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { project } = useSelector(state => state.Project);
  const project = { question: ['1번질문', '2번질문'] };
  const [inputState, setInputState] = React.useState({
    userName: null,
    status: null,
    question: null,
    answers: project.question.map(value => {
      return '';
    }),
    role: '',
    selfDescription: '',
  });

  // 같은 setstate 여러번 쓰면 마지막꺼만 반영되므로
  const handleInputAnswer = (e, index) => {
    e.persist();
    const data = inputState.answers.map((value, i) => {
      if (index === i) {
        return e.target.value;
      }
      return value;
    });
    setInputState(value => {
      return {
        ...value,
        answer: data,
      };
    });
  };

  const handleInputString = e => {
    e.persist();
    setInputState(value => {
      return {
        ...value,
        [e.target.name]: [e.target.value],
      };
    });
  };

  const handleSave = async () => {
    // setOpen({ ...open, change: !open.change });
    // await dispatch(setProjectDetail(projectDetailState));
  };

  return (
    <div>
      <Layout hasFooter>
        <div>
          {project.question.map((value, index) => {
            return (
              <div>
                <Typography>
                  {index}번째 질문 : {value}
                </Typography>
                <TextField
                  key={value}
                  name="question"
                  value={inputState[index]}
                  onChange={e => handleInputAnswer(e, index)}
                  fullWidth
                  label={`${index}번 답변`}
                />
              </div>
            );
          })}
          <TextField
            name="role"
            value={inputState.role}
            onChange={handleInputString}
            fullWidth
            label="지원할 역할"
          />
          <TextField
            name="selfDescription"
            value={inputState.selfDescription}
            onChange={handleInputString}
            fullWidth
            label="자기소개"
          />
          <Button onClick={handleSave}>지원하기</Button>
        </div>
      </Layout>
    </div>
  );
};

export default ProjectApply;
