import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Badge,
  Card,
  CardText,
} from "reactstrap";
import { useInvitationDetailEffect } from "../../../../hook/profile/useInvitation";

const DetailModal = ({ pid, userId, modal, toggle }) => {
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const [
    { invitaionDetail, activityName },
    { handleAccept, handleReject },
  ] = useInvitationDetailEffect(userId, pid, toggleNested);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{invitaionDetail.projectName}</ModalHeader>

        <ModalBody>
          <Row xs="2">
            <Col>
              <div>
                <Badge color="info" pill>
                  {invitaionDetail.role}
                </Badge>
              </div>
            </Col>
            <Col>
              <p> status : {invitaionDetail.state}</p>
            </Col>
          </Row>

          <Card body style={{ height: "200px" }}>
            <CardText>{invitaionDetail.introduction}</CardText>
          </Card>
          <div> {invitaionDetail.userName}</div>
        </ModalBody>
        <ModalFooter>
          {invitaionDetail.state === "READ" && (
            <>
              <Button color="primary" onClick={handleAccept}>
                Accept
              </Button>
              <Button color="danger" onClick={handleReject}>
                Reject
              </Button>
            </>
          )}

          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>{activityName}이 완료되었습니다.</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleAll}>
                All Done
              </Button>
            </ModalFooter>
          </Modal>

          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DetailModal;
