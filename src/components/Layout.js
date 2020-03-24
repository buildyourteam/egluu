import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import { Link } from 'react-router-dom';
import { DirectionDrawer } from '.';

const Layout = ({ bg, children, hasFooter }) => {
  const id = window.sessionStorage.getItem('id');
  const profilePage = `/profile/${id}`;
  return (
    <div bg={bg}>
      <header style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', paddingTop: '10px' }}>
          <DirectionDrawer direct="left" title="메뉴">
            <Divider />
            <List>
              <ListItemText>
                <Typography>페이지 이동</Typography>
              </ListItemText>
              <Link
                to={profilePage}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <ListItem button key="마이페이지">
                  <ListItemIcon>
                    <SentimentSatisfiedAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="마이페이지" />
                </ListItem>
              </Link>
              <Link
                to="/project"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <ListItem button key="프로젝트">
                  <ListItemIcon>
                    <AssignmentIndIcon />
                  </ListItemIcon>
                  <ListItemText primary="프로젝트" />
                </ListItem>
              </Link>
              <Link
                to="/people"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <ListItem button key="피플">
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="피플" />
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <ListItemText>
                <Typography>내 프로젝트 관리</Typography>
              </ListItemText>
              {[].map((
                text,
                index, // 뭐를 넣을지는 토론 이후 결정
              ) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </DirectionDrawer>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              display="inline"
              style={{ align: 'center', cursor: 'pointer' }}
            >
              에스키모
            </Typography>
          </Link>
          <Link to="/auth/login" style={{ textDecoration: 'none' }}>
            <Button style={{ fontSize: '10px', align: 'right' }}>Login</Button>
          </Link>
        </div>
      </header>
      <main>{children}</main>
      {hasFooter && (
        <footer
          style={{
            backgroundColor: '#eeeeee',
            height: '100px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" align="center" style={{ padding: '10px' }}>
            공모전 팀빌딩은 '팀빌딩'
          </Typography>
          <Typography variant="h6" align="center">
            문의 : manzi@kakao.com
          </Typography>
        </footer>
      )}
    </div>
  );
};

export default Layout;
