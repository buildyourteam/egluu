import React from "react";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Row,
    Col,
    Progress
} from "reactstrap";
import {
    useProjectDetailState, useProjectDetailEffect, useRequest, useProjectRecruitEffect
} from "../../hook";
import {
    Button,
    Layout,
    Jumbotron,
    SubtitleHeader,
    ProjectBox,
    PeopleBox,
    IOSSwitch,
    AntSwitch
} from "../../components";
import "../main.css";
import tempimg from '../../components/icon/move.gif';
import { Typography, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, FormControlLabel } from '@material-ui/core';
import {
    DateTimePicker as MuiDateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ko } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { setProject } from '../../reducers/project';

export default function ProjectDetail() {
    const dispatch = useDispatch();
    const location = useLocation();
    const url = location.pathname.split('/');
    const projectId = url[2];
    const [project, projectAction] = useProjectDetailState();
    const [
        {
            data: resProject,
            fulfilled: getProjectFulfilled,
            pending: getProjectPending,
            rejected: getProjectRejected,
            error: getProjectError
        },
        { run: getProjectApi }
    ] = useRequest(projectAction.fetchGetDetail);

    useProjectDetailEffect(
        resProject,
        getProjectFulfilled,
        getProjectRejected,
        getProjectError,
        getProjectApi,
        projectAction,
        url[2]
    );

    const handleClickUpdate = () => {
        const updateProject = {
            img: [`http://34.105.29.115:8080/projects/image/${url[2]}`],
            ...project.project
        }
        dispatch(setProject(updateProject));
    }

    const handleClickDelete = () => {
        projectAction.fetchDeleteProject(projectId);
    }

    return (
        <Layout>
            {getProjectPending ? (
                <div>로딩중...</div>
            ) : (
                    <div>
                        <Link to={`/projectUpdate/${url[2]}`}>
                            <Button onClick={handleClickUpdate}>수정하기</Button>
                        </Link>
                        <Button onClick={handleClickDelete}>삭제하기</Button>
                        <br />
                        <img height={200} width={200} src={`http://34.105.29.115:8080/projects/image/${url[2]}`} alt='temp' />
                        <Typography>{project.project.projectName}</Typography>
                        <Typography>{project.project.teamName}</Typography>
                        <Typography>종료일 : {project.project.endDate}</Typography>
                        <Typography>{project.project.description}</Typography>
                        <Typography>개발 분야 : {project.project.projectField}</Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText
                                    primary='현재 인원'
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`개발자 : ${project.project.currentMember.developer}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`디자이너 : ${project.project.currentMember.designer}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`기획자 : ${project.project.currentMember.planner}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`기타 : ${project.project.currentMember.etc}`}
                                />
                            </ListItem>
                        </List>
                        <List dense>
                            <ListItem>
                                <ListItemText
                                    primary='모집 인원'
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`개발자 : ${project.project.needMember.developer}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`디자이너 : ${project.project.needMember.designer}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`기획자 : ${project.project.needMember.planner}`}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`기타 : ${project.project.needMember.etc}`}
                                />
                            </ListItem>
                        </List>
                        <FormControlLabel
                            style={{ margin: '0px -20px 0px 0px', padding: '0px' }}
                            control={
                                <IOSSwitch
                                    name='apply'
                                    checked={project.check.apply}
                                    onChange={projectAction.checkSwitch}
                                    value="apply"
                                />
                            }
                        />
                        {project.check.apply && (
                            project.apply.length === 0 ? <div>
                                지원자가 없습니다 </div> :
                                project.apply.map(value => (
                                    <List dense>
                                        <ListItem>
                                            <ListItemText
                                                primary={`이름 : ${value.userName}`}
                                                secondary='Secondary text'
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={`역할 : ${value.role}`}
                                                secondary='Secondary text'
                                            />
                                        </ListItem>
                                        <Button>상세보기</Button>
                                    </List>
                                ))
                        )}
                        <br />
                        <FormControlLabel
                            style={{ margin: '0px -20px 0px 0px', padding: '0px' }}
                            control={
                                <IOSSwitch
                                    name='recruit'
                                    checked={project.check.recruit}
                                    onChange={projectAction.checkSwitch}
                                    value="recruit"
                                />
                            }
                        />
                        {project.check.recruit && (
                            project.recruit.map(value => (
                                <List dense>
                                    <ListItem>
                                        <ListItemText
                                            primary={`이름 : ${value.userName}`}
                                            secondary='Secondary text'
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={`역할 : ${value.role}`}
                                            secondary='Secondary text'
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={`자기소개 : ${value.selfDescription}`}
                                            secondary='Secondary text'
                                        />
                                    </ListItem>
                                </List>
                            ))
                        )}
                    </div>
                )
            }
        </Layout >
    );
}

{/* <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
<MuiDateTimePicker
    name="endDate"
    value={project.endDate}
    onChange={setStartDate}
    format="yy.MM.dd HH:mm"
    placeholder="종료일"
    variant="dialog"
    disableUnderline
    disableToolbar={false}
    hideTabs
    clearable
    ampm
    style={{
        borderLeft: '1px solid #cdcecd',
    }}
/>
</MuiPickersUtilsProvider> */}