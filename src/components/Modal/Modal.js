import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useAlert } from "../../hook";

const CenterModal = (props) => {
  const { modalFlag, close } = props;
  console.log(modalFlag);
  console.log(close);

  return (
    <div>
      <Modal isOpen={modalFlag}>
        <ModalHeader>
          <div
            style={{
              background: "white",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              fontWeight: "bold",
              width: "408px",
            }}
          >
            <div>{props.header}</div>
            <div style={{ float: "right" }}>
              <IconButton
                style={{ width: "30px", height: "30px" }}
                onClick={close}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </ModalHeader>
        {props.children}
        <ModalFooter>{props.footer}</ModalFooter>
      </Modal>
    </div>
  );
};

const AlertModal = (props) => {
  const [alertData, alertAction] = useAlert();

  return (
    <div>
      <Modal isOpen={alertData.isOpen}>
        <ModalHeader>
          <div
            style={{
              background: "white",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              fontWeight: "bold",
              width: "408px",
            }}
          >
            <div>알림</div>
            <div style={{ float: "right" }}>
              <IconButton
                style={{ width: "30px", height: "30px" }}
                onClick={alertAction.close}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </ModalHeader>
        {alertData.sentence}
        {/* <ModalFooter>{props.footer}</ModalFooter> */}
      </Modal>
    </div>
  );
};

export { CenterModal, AlertModal };
