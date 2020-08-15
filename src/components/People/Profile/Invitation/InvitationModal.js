import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useInvitationEffect } from "../../../../hook/profile/useInvitation";
import InvitationBox from "./InvitationBox";
import "./Invitation.css";

const InvitationModal = ({ modal, toggle, userId }) => {
  const { pending, invitationList, noList } = useInvitationEffect(userId);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}> Invitations </ModalHeader>
        <ModalBody>
          {pending ? (
            <div>로딩중...</div>
          ) : noList.isError ? (
            <div>{noList.errorMessage}</div>
          ) : (
            <div className="invitation_list">
              {invitationList.map((invitation, index) => {
                return (
                  <InvitationBox
                    key={index}
                    data={invitation}
                    userId={userId}
                  />
                );
              })}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default InvitationModal;
