import React from 'react';
import { useProjectDetailLoading, useProjectDetailData } from '../hooks';
import { TeamBox } from '../components';
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
import ReactMarkdown from 'react-markdown/with-html';

const useStyles = makeStyles(theme => ({
    appbar: {
      margin: '0px',
    },
    select: {
        width: '100%',
        borderColor: '#000000'
    },
    formcontrol: {
        width: "25%"
    }
  }));

const ProjectPageDetail = () => {
    const classes = useStyles();
    const [{loadState}, setLoadState, dispatch] = useProjectDetailLoading();
    const [{projectDetailState}, setProjectDetailState] = useProjectDetailData();

    return (
        <div>
            <AppBar position="static" color="inherit" style={{boxShadow: "none", textAlign: "center"}}>
                <Toolbar style={{textAlign: "center"}}>
                    <Typography variant="h6" align='center' display="inline">
                        ESKIMO
                    </Typography>
                </Toolbar>
            </AppBar>
            {console.log(projectDetailState)}
            <img src={projectDetailState.imgUrl} width='100%' height='30%' alt="대표 이미지" />
            <div style={{height: '-10%'}}>
                <Typography variant="h1">
                    {projectDetailState.projectName}
                </Typography>
                <Typography variant="h6">
                    {projectDetailState.teamName}
                </Typography>
            </div>
            <ReactMarkdown
            source={projectDetailState.projectDescription}
            escapeHtml={false}
            />
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
                    <Button onClick={()=>{setLoadState({...loadState, open:false})}} >
                        닫기
                    </Button>
                </MuiDialogContent>
            </Dialog>
            <footer style={{backgroundColor: "#eeeeee", height: '100px', textAlign: "center"}}>
                <Typography variant="h4" align="center" style={{padding: '10px'}}>
                    ESKIMO
                </Typography> 
                <Typography variant="h6" align="center">
                    문의 : manzi@kakao.com
                </Typography> 
            </footer>
        </div>
    );
}

export default ProjectPageDetail;
