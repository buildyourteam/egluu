import React, { useState } from "react";
import { usePeopleListState, usePeopleListEffect, useRequest } from "../hook";
import PeopleBox from "../components/People/PeopleBox";
import { Row, Col } from "reactstrap";
import { PeopleSort } from "../components/List/Sort";
import Pagination from "@material-ui/lab/Pagination";
import { Layout } from "../components";

export default function PeopleList() {
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [stack, setStack] = useState("");
  const [search, setSearch] = useState("");

  const [peopleList, peopleListAction] = usePeopleListState();
  const [
    {
      data: resPeopleList,
      fulfilled: getPeopleListFulfilled,
      pending: getPeopleListPending,
      rejected: getPeopleListRejected,
      error: getPeopleListError,
    },
    { run: getPeopleListApi },
  ] = useRequest(peopleListAction.getPeopleList);
  usePeopleListEffect(
    resPeopleList,
    getPeopleListFulfilled,
    getPeopleListRejected,
    getPeopleListError,
    getPeopleListApi,
    peopleListAction.setPeopleList,
    peopleListAction.setPage
  );

  return (
    <Layout>
      <hr />
      <PeopleSort
        role={role}
        setRole={setRole}
        region={region}
        setRegion={setRegion}
        stack={stack}
        setStack={setStack}
        search={search}
        setSearch={setSearch}
        getApi={getPeopleListApi}
      />
      <hr />

      <Row xs="12">
        {peopleList.peopleList.length !== 0 &&
          peopleList.peopleList.map((value, index) => {
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
          count={peopleList.page.totalPages}
          onChange={(e, page) => {
            let params = "";
            if (peopleList.role !== "") params += `&role=${peopleList.role}`;
            if (peopleList.region !== "")
              params += `&region=${peopleList.region}`;
            if (peopleList.stack !== "") params += `&stack=${peopleList.stack}`;
            getPeopleListApi(page - 1, params);
          }}
        />
      </div>
    </Layout>
  );
}
