import React, { useState } from "react";
import PeopleBox from "../components/People/PeopleBox";
import { Row, Col } from "reactstrap";
import { PeopleSort } from "../components/List/Sort";
import Pagination from "@material-ui/lab/Pagination";
import { Layout } from "../components";
import {
  usePeopleListStateTs,
  useWantedPeopleListEffectTs,
} from "../hook/peopleTs";

export default function PeopleList() {
  const { peoplePage, peopleAction } = usePeopleListStateTs();
  useWantedPeopleListEffectTs(peoplePage, peopleAction);

  return (
    <Layout>
      <hr />
      <PeopleSort
        role={peoplePage.role}
        setRole={peoplePage.setRole}
        grade={peoplePage.grade}
        setGrade={peoplePage.setGrade}
        region={peoplePage.region}
        setRegion={peoplePage.setRegion}
        search={peoplePage.search}
        setSearch={peoplePage.setSearch}
        getApi={peopleAction.getPeopleListFetch}
      />
      <hr />

      <Row xs="12">
        {peoplePage.peopleList.length !== 0 &&
          peoplePage.peopleList.map((value, index) => {
            return (
              <Col xs="2" key={index}>
                <PeopleBox url={`/profile/${value.userId}`} data={value} />
              </Col>
            );
          })}
      </Row>
      <div id="pagination_div">
        <Pagination
          id="pagination"
          count={peoplePage.page.totalPages}
          onChange={(e, page) => {
            let params = "";
            if (peoplePage.role !== "") params += `&role=${peoplePage.role}`;
            if (peoplePage.grade !== "") params += `&grade=${peoplePage.grade}`;
            if (peoplePage.region !== "")
              params += `&region=${peoplePage.region}`;
            peopleAction.getPeopleListFetch(page - 1, params);
          }}
        />
      </div>
    </Layout>
  );
}
