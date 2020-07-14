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
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  search: {
    margin: theme.spacing(1),
    width: "30ch"
  }
}));
export default function Sort({
  role,
  setRole,
  region,
  setRegion,
  stack,
  setStack,
  search,
  setSearch
}) {
  const handleChange = event => {
    if (event.target.name === "role") {
      setRole(event.target.value);
    } else if (event.target.name === "region") {
      setRegion(event.target.value);
    } else {
      setStack(event.target.value);
    }
  };

  const handleChangeSearch = event => {
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
              <MenuItem value="developer">developer</MenuItem>
              <MenuItem value="designer">designer</MenuItem>
              <MenuItem value="director">director</MenuItem>
              <MenuItem value="etc.">etc.</MenuItem>
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
              <MenuItem value="서울">서울</MenuItem>
              <MenuItem value="경기">경기</MenuItem>
              <MenuItem value="부산">부산</MenuItem>
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
        <Grid item xs={6} sm={6}>
          <FormControl variant="outlined" className={classes.search}>
            <InputLabel>Search</InputLabel>
            <OutlinedInput
              value={search}
              onChange={handleChangeSearch}
              label="Search"
            />
          </FormControl>
          <Button>search</Button>
        </Grid>
      </Grid>
    </>
  );
}
