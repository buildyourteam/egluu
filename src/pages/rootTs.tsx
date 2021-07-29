import React from "react";
import { Layout, ProjectBox, PeopleBox, Jumbotron } from "../components";
import {
  useProjectListStateTs,
  useDeadlineProjectListEffect,
} from "../hook/projectTs";
import {
  usePeopleListStateTs,
  useWantedPeopleListEffectTs,
} from "../hook/peopleTs";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
      justifyContent: "center",
      display: "flex",
    },
  },
}));

export default function Root() {
  const classes = useStyles();
  const { projectPage, projectAction } = useProjectListStateTs();
  useDeadlineProjectListEffect(projectPage, projectAction);

  const { peoplePage, peopleAction } = usePeopleListStateTs();
  useWantedPeopleListEffectTs(peoplePage, peopleAction);

  return (
    <Layout>
      <div>
        <Jumbotron />
        <Typography variant="h5">마감임박 프로젝트 </Typography>
        <Grid container spacing={3}>
          {projectPage.projectList.map((item, idx) => {
            return (
              <Grid item xs={3} key={idx}>
                <ProjectBox
                  data={item}
                  url={`/projectDetail/${item.projectId}`}
                />
              </Grid>
            );
          })}
        </Grid>
        <div id="pagination_div">
          <Pagination
            className={classes.pagination}
            onChange={(e, page: number) => {
              projectAction.setPage({ ...projectPage.page, number: page });
              projectAction.getDeadLineProjectListApi(page - 1);
            }}
            page={projectPage.page.number + 1}
            count={projectPage.page.totalPages}
          />
        </div>
        <Typography variant="h5">프로젝트를 찾는 사람들</Typography>
        <Grid container spacing={3} >
          {peoplePage.peopleList.map((item, idx) => {
            return (
              <Grid item xs={2} key={idx}>
                <PeopleBox data={item} url={`/profile/${item.userId}`} />
              </Grid>
            );
          })}
        </Grid>
        <div id="pagination_div" style={{ marginTop: "30px" }}>
          <Pagination
            className={classes.pagination}
            onChange={(e, page: number) => {
              projectAction.setPage({ ...projectPage.page, number: page });
              peopleAction.getWantedPeopleList(page - 1);
            }}
            page={peoplePage.page.number + 1}
            count={peoplePage.page.totalPages}
          />
        </div>
      </div>
    </Layout>
  );
}
