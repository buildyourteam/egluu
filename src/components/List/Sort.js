import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  search: {
    margin: theme.spacing(1),
    width: "30ch",
  },
}));
export function ProjectSort({
  role,
  setRole,
  region,
  setRegion,
  stack,
  setStack,
  search,
  setSearch,
  getApi,
}) {
  const handleChange = (event) => {
    if (event.target.name === "role") {
      setRole(event.target.value);
    } else if (event.target.name === "region") {
      setRegion(event.target.value);
    } else {
      setStack(event.target.value);
    }
  };

  const getPage = async (role, region, stack) => {
    let params = "";
    if (role !== "") params += `&role=${role}`;
    if (region !== "") params += `&region=${region}`;
    if (stack !== "") params += `&stack=${stack}`;
    await getApi(0, params);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={2}>
          <FormControl className={classes.formControl}>
            <Select
              name="role"
              value={role}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                역할
              </MenuItem>
              <MenuItem value="DEVELOPER">developer</MenuItem>
              <MenuItem value="DESIGNER">designer</MenuItem>
              <MenuItem value="PLANNER">director</MenuItem>
              <MenuItem value="ETC">etc.</MenuItem>
            </Select>
            <FormHelperText>role</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={2}>
          <FormControl className={classes.formControl}>
            <Select
              name="region"
              value={region}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                지역
              </MenuItem>
              <MenuItem value="Seoul">서울</MenuItem>
              <MenuItem value="Gunggi">경기</MenuItem>
              <MenuItem value="Busan">부산</MenuItem>
            </Select>
            <FormHelperText>region</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={2}>
          <FormControl className={classes.formControl}>
            <Select
              name="stack"
              value={stack}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                기술스택
              </MenuItem>
              <MenuItem value="ReactJS">ReactJS</MenuItem>
              <MenuItem value="SPRINGBOOT">SPRINGBOOT</MenuItem>
              <MenuItem value="PHP">PHP</MenuItem>
            </Select>
            <FormHelperText>stack</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={5} style={{ display: "flex" }}>
          <FormControl
            style={{ width: "100%" }}
            variant="outlined"
            className={classes.search}
          >
            <InputLabel>Search</InputLabel>
            <OutlinedInput
              value={search}
              onChange={handleChangeSearch}
              label="Search"
            />
          </FormControl>
        </Grid>
        <Grid item xs={1} style={{ display: "flex" }}>
          <Button
            style={{ height: "auto" }}
            onClick={() => getPage(role, region, stack)}
          >
            search
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export function PeopleSort({
  role,
  setRole,
  region,
  setRegion,
  grade,
  setGrade,
  search,
  setSearch,
  getApi,
}) {
  const handleChange = (event) => {
    if (event.target.name === "role") {
      setRole(event.target.value);
    } else if (event.target.name === "region") {
      setRegion(event.target.value);
    } else {
      setGrade(event.target.value);
    }
  };

  const getPage = async (role, region, grade) => {
    let params = "";
    if (role !== "") params += `&role=${role}`;
    if (region !== "") params += `&region=${region}`;
    if (grade !== "") params += `&grade=${grade}`;
    await getApi(0, params);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={2}>
          <FormControl className={classes.formControl}>
            <Select
              name="role"
              value={role}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                역할
              </MenuItem>
              <MenuItem value="LEADER">leader</MenuItem>
              <MenuItem value="DEVELOPER">developer</MenuItem>
              <MenuItem value="DESIGNER">designer</MenuItem>
              <MenuItem value="PLANNER">director</MenuItem>
              <MenuItem value="ETC">etc.</MenuItem>
            </Select>
            <FormHelperText>role</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={2}>
          <FormControl className={classes.formControl}>
            <Select
              name="grade"
              value={grade}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                레벨
              </MenuItem>
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
            <FormHelperText>grade</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={2}>
          <FormControl className={classes.formControl}>
            <Select
              name="region"
              value={region}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled>
                지역
              </MenuItem>
              <MenuItem value="SEOUL">서울</MenuItem>
              <MenuItem value="GYEONGGI">경기</MenuItem>
              <MenuItem value="Busan">부산</MenuItem>
            </Select>
            <FormHelperText>region</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={5} style={{ display: "flex" }}>
          <FormControl
            variant="outlined"
            style={{ width: "100%" }}
            className={classes.search}
          >
            <InputLabel>Search</InputLabel>
            <OutlinedInput
              value={search}
              onChange={handleChangeSearch}
              label="Search"
            />
          </FormControl>
        </Grid>
        <Grid item xs={1} style={{ display: "flex" }}>
          <Button onClick={() => getPage(role, region, grade)}>search</Button>
        </Grid>
      </Grid>
    </>
  );
}
