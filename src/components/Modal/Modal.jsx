import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { useAlert } from "../../hook";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    "&::after": {
      display: "block",
      clear: "both",
      content: '""',
    },
  },
  headerText: { float: "left", lineHeight: "30px" },
  headerBtn: { float: "right" },
  closeBtn: {
    width: "30px",
    height: "30px",
  },
}));

const CenterModal = (props) => {
  const { modalFlag, close } = props;
  const classes = useStyles();

  return (
    <Modal
      open={modalFlag}
      onClose={close}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <div className={classes.header}>
          <div className={classes.headerText}>{props.header}</div>
          <div className={classes.headerBtn}>
            <IconButton className={classes.closeBtn} onClick={close}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div>{props.children}</div>
        <div>{props.footer}</div>
      </div>
    </Modal>
  );
};

const AlertModal = (props) => {
  const { alertState, alertAction } = useAlert();
  const classes = useStyles();

  return (
    <Modal
      open={alertState.isOpen}
      onClose={alertAction.close}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <div className={classes.header}>
          <div className={classes.headerText}>알림</div>
          <div className={classes.headerBtn}>
            <IconButton
              className={classes.closeBtn}
              onClick={alertAction.close}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div>{alertState.sentence}</div>
      </div>
    </Modal>
  );
};

export { CenterModal, AlertModal };
