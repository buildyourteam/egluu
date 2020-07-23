import React, { useState } from "react";
import {
  useTemporaryApi,
  useProjectListState,
  usePeopleListState,
  useRequest
} from "../../hook";
import { Link } from 'react-router-dom';
import { Layout, ProjectBox, Button } from "../../components";

import Sort from "../../components/List/Sort";

export default function ProjectList() {
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("");
  const [stack, setStack] = useState("");

  const [search, setSearch] = useState("");

  return (
    <Layout>
      <hr />
      <Sort
        role={role}
        setRole={setRole}
        region={region}
        setRegion={setRegion}
        stack={stack}
        setStack={setStack}
        search={search}
        setSearch={setSearch}
      />
      <Link to="/createProject">
        <Button>프로젝트 생성</Button>
      </Link>
      <hr />
      <h1>{role}</h1>
      <h1>{region}</h1>
      <h1>{stack}</h1>
      <h1>{search}</h1>
    </Layout>
  );
}
