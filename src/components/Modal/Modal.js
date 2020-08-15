import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const CenterModal = (props) => {
  const { modalFlag, close } = props;

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

export default CenterModal;
