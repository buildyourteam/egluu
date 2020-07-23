import React from "react";
import { useLocation } from 'react-router-dom';
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
    useProjectDetailState, useProjectDetailEffect, useRequest, useProjectApplyEffect, useProjectRecruitEffect
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

export default function ProjectDetail() {
    const location = useLocation();
    const url = location.pathname.split('/');
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
    const [
        {
            data: resApply,
            fulfilled: getApplyFulfilled,
            pending: getApplyPending,
            rejected: getApplyRejected,
            error: getApplyError
        },
        { run: getApplyApi }
    ] = useRequest(projectAction.fetchGetDetail);
    const [
        {
            data: resRecruit,
            fulfilled: getRecruitFulfilled,
            pending: getRecruitPending,
            rejected: getRecruitRejected,
            error: getRecruitError
        },
        { run: getRequestApi }
    ] = useRequest(projectAction.fetchGetDetail);

    useProjectDetailEffect(
        resApply,
        getApplyFulfilled,
        getApplyRejected,
        getApplyError,
        { getProjectApi, getApplyApi },
        projectAction.setProjectState,
        url[2]
    );

    useProjectApplyEffect(
        resApply,
        getApplyFulfilled,
        getApplyRejected,
        getApplyError,
        projectAction.setApplyState,
        url[2]
    );

    useProjectRecruitEffect(
        resRecruit,
        getRecruitFulfilled,
        getRecruitRejected,
        getRecruitError,
        projectAction.setRecruitState,
        url[2]
    );

    return (
        <Layout>
            {getProjectPending ? (
                <div>로딩중...</div>
            ) : (
                    <div>
                        <img src={tempimg} alt='temp' />
                        {/* <img src={project.url} alt='temp' /> */}
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