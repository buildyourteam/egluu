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
  CardText
} from "reactstrap";
import { useInvitationDetailEffect } from "../../../../hook/profile/useInvitation";

const DetailModal = ({ pid, userId, modal, toggle }) => {
  const [acceptModal, setAcceptModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const [closeAcceptAll, setCloseAcceptAll] = useState(false);
  const [closeRejectAll, setCloseRejectAll] = useState(false);

  const acceptToggleNested = () => {
    setAcceptModal(!acceptModal);
    setCloseAcceptAll(false);
  };

  const rejectToggleNested = () => {
    setRejectModal(!rejectModal);
    setCloseRejectAll(false);
  };

  const toggleAcceptAll = () => {
    setAcceptModal(!acceptModal);
    setCloseAcceptAll(true);
  };

  const toggleRejectAll = () => {
    setRejectModal(!rejectModal);
    setCloseRejectAll(true);
  };

  const handleAccept = () => {
    putInvitationAcceptApi(userId, pid);
  };

  const handleReject = () => {
    deleteInvitationRejectApi(userId, pid);
  };
  const {
    invitaionDetail,
    putInvitationAcceptApi,
    deleteInvitationRejectApi
  } = useInvitationDetailEffect(userId, pid, toggleAcceptAll);
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
          <Button color="primary" onClick={acceptToggleNested}>
            Accept
          </Button>

          {/* accept modal */}
          {acceptModal && (
            <>
              <Modal
                isOpen={acceptModal}
                toggle={acceptToggleNested}
                onClosed={closeAcceptAll ? toggle : undefined}
              >
                <ModalHeader>Nested Modal title</ModalHeader>
                <ModalBody>프로젝트 영입을 수락하시겠습니까?</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={acceptToggleNested}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={handleAccept}>
                    Confirm
                  </Button>
                </ModalFooter>
              </Modal>
            </>
          )}
          <Button color="danger" onClick={rejectToggleNested}>
            Reject
          </Button>
          {/* Rejact Modal */}
          <Modal
            isOpen={rejectModal}
            toggle={rejectToggleNested}
            onClosed={closeRejectAll ? toggle : undefined}
          >
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>프로젝트 영입을 거절하겠습니까?</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={rejectToggleNested}>
                Cancel
              </Button>
              <Button color="primary" onClick={toggleRejectAll}>
                Confirm
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
