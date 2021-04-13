import React, { useState, useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";

const BootstrapInputUI = withStyles((theme) => ({
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

function BootstrapInput(props) {
  return <BootstrapInputUI {...props} />;
}

function InputTemp(props) {
  return <BootstrapInputUI {...props} />;
}

export { BootstrapInput, InputTemp };
