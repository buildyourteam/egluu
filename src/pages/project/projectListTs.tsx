import React from "react";
import { Layout, ProjectBox } from "../../components";
import { ProjectSort } from "../../components/List/Sort";
// import { Alert, List, Pagination, Typography } from "antd";
import {
  useProjectListStateTs,
  useProjectListEffectTs,
} from "../../hook/projectTs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
      justifyContent: "center",
      display: "flex",
    },
  },
}));

export default function ProjectListPage() {
  const classes = useStyles();
  const { projectPage, projectAction } = useProjectListStateTs();
  useProjectListEffectTs(projectPage, projectAction);
  const isToken = useSelector((state: any) => state.login.isToken);

  return (
    <Layout>
      <div>
        <ProjectSort
          role={projectPage.role}
          setRole={projectAction.setRole}
          region={projectPage.region}
          setRegion={projectAction.setRegion}
          stack={projectPage.stack}
          setStack={projectAction.setStack}
          search={projectPage.search}
          setSearch={projectAction.setSearch}
          getApi={projectAction.getProjectListApi}
        />
        {isToken && (
          <Link to="/createProject">
            <Alert severity="info">
              프로젝트 생성을 원하신다면 여기를 눌러주세요.
            </Alert>
          </Link>
        )}

        <Typography variant="h5">모집 진행 중 프로젝트 </Typography>
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
        <div>
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
      </div>
    </Layout>
  );
}
