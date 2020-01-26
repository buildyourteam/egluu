import React from 'react';
import { useLoading, useDefaultData } from '../hooks';
import { ImgSlide, TeamBox } from '../components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { getDefault } from '../reducers/Default';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    appbar: {
      margin: '0px',
    }
  }));

const BasicPage = () => {
    const classes = useStyles();
    const [{loadState}, setLoadState, dispatch] = useLoading();
    const [{hotProjectState}, setHotProjectState] = useDefaultData();
    const tempImgList = ['http://mblogthumb2.phinf.naver.net/MjAxNzAzMTFfMjMz/MDAxNDg5MjAwMjk1MjUw.sZECfaiA1Hts6WmY3sYxdGV_x0jj8BtmafjUujZMiLIg.utoHLXP9CkM7bzpHxSfMGE3kM3fKNv7xWvR5bp8LOYIg.JPEG.happyfamily502/L.A._Lakers_Team_Logo_Image.jpg?type=w2', 'https://i.pinimg.com/originals/72/1a/8b/721a8bd73983160aa979575c9d65a085.jpg', 'https://i.ytimg.com/vi/OG_aWAmeKCc/maxresdefault.jpg'];
    
    const handleClick = () => {
        dispatch(getDefault(loadState));
        setLoadState({...loadState, open: true});
    }
    return (
        <div>
            <AppBar position="static" color="inherit" >
                <Toolbar style={{textAlign: "center"}}>
                    <Typography variant="h6" align='center' display="inline">
                        Portfolio
                    </Typography>
                </Toolbar>
            </AppBar>
            <ImgSlide imgList={tempImgList} />
            <Button onClick={handleClick}>
            모집 마감이 임박한 팀 >
            </Button>
            <Grid container>
            {hotProjectState.map((value, i) => (
                <span style={{margin: '20px'}} id={value.title + i}>
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
                    <Button onClick={()=>{setLoadState({...loadState, open:false})}} >
                        닫기
                    </Button>
                </MuiDialogContent>
            </Dialog>
            <footer style={{backgroundColor: "#eeeeee", height: '100px', textAlign: "center"}}>
                <Typography variant="h4" align="center" style={{padding: '10px'}}>
                    공모전 팀빌딩은 '팀빌딩'
                </Typography> 
                <Typography variant="h6" align="center">
                    문의 : manzi@kakao.com
                </Typography> 
            </footer>
        </div>
    );
}

export default BasicPage;
