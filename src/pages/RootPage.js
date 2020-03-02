/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MuiCircularProgress from '@material-ui/core/CircularProgress';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { ImgSlide, PeopleBox, TeamBox, Layout } from '../components';
import { useLoading, useDefaultData, useDefaultPeopleData } from '../hooks';

const useStyles = makeStyles(theme => ({
  appbar: {
    margin: '0px',
  },
}));

const BasicPage = () => {
  const classes = useStyles();
  const [{ loadState }, setLoadState] = useLoading();
  const { projectCard } = useSelector(state => state.Project);
  const { peopleCard } = useSelector(state => state.People);
  useDefaultData();
  const tempImgList = [
    'http://mblogthumb2.phinf.naver.net/MjAxNzAzMTFfMjMz/MDAxNDg5MjAwMjk1MjUw.sZECfaiA1Hts6WmY3sYxdGV_x0jj8BtmafjUujZMiLIg.utoHLXP9CkM7bzpHxSfMGE3kM3fKNv7xWvR5bp8LOYIg.JPEG.happyfamily502/L.A._Lakers_Team_Logo_Image.jpg?type=w2',
    'https://i.pinimg.com/originals/72/1a/8b/721a8bd73983160aa979575c9d65a085.jpg',
    'https://i.ytimg.com/vi/OG_aWAmeKCc/maxresdefault.jpg',
  ];

  const handleClick = i => {
    setLoadState({ ...loadState, open: true });
  };

  const handleClickProject = value => {
    const link = value._links.self.href;
    window.location = `${link}`;
  };

  const handleClickPeople = value => {
    const link = value._links.self.href;
    window.location = `${link}`;
  };
  return (
    <div>
      <Layout hasFooter>
        <ImgSlide imgList={tempImgList} />
        <div style={{ paddingLeft: '2vw', paddingRight: '2vw' }}>
          <Button style={{ fontSize: '30px' }} onClick={handleClick}>
            모집 마감이 임박한 팀 >
          </Button>
          <Grid container>
            {projectCard.map((value, i) => (
              <span
                onClick={() => handleClickProject(value)}
                style={{ margin: '20px', cursor: 'pointer' }}
                id={value.title + i}
              >
                <TeamBox state={value} />
              </span>
            ))}
          </Grid>
          <Grid container>
            {peopleCard.map((value, i) => (
              <span
                onClick={() => handleClickPeople(value)}
                style={{ margin: '10px' }}
                id={value.name + i}
              >
                <PeopleBox state={value} />
              </span>
            ))}
          </Grid>
        </div>
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
      </Layout>
    </div>
  );
};

export default BasicPage;
