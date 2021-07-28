import React, { useState } from "react";
import { Card, CardTitle, CardText, Row, Col, Badge } from "reactstrap";
import DetailModal from "./DetailModal";
const InvitationBox = ({ data, userId }) => {
  const [detailModal, setDetailModal] = useState(false);
  const detailModalToggle = () => {
    setDetailModal(!detailModal);
  };

  return (
    <>
      <div>
        <Card body onClick={detailModalToggle}>
          <Row xs="4">
            <Col xs="8">
              <CardTitle>{data.projectName}</CardTitle>
            </Col>

            <Col>
              <Badge color="info" pill>
                {data.role}
              </Badge>
            </Col>
          </Row>
          <Row xs="4">
            <Col xs="9">
              <CardText>{data.introduction}</CardText>
            </Col>

            <Col>
              <CardText>{data.userName}</CardText>
            </Col>
          </Row>
        </Card>
      </div>
      <div>
        {detailModal && (
          <DetailModal
            pid={data.projectId}
            userId={userId}
            modal={detailModal}
            toggle={detailModalToggle}
          />
        )}
      </div>
    </>
  );
};

export default InvitationBox;
