// import React, { useState } from "react";
// import { usePeopleListState, usePeopleListEffect } from "../hook";
// import PeopleBox from "../components/People/PeopleBox";
// import { Row, Col } from "reactstrap";
// import { PeopleSort } from "../components/List/Sort";
// import Pagination from "@material-ui/lab/Pagination";
// import { Layout } from "../components";

// export default function PeopleList() {
//   const [peopleList, peopleListAction] = usePeopleListState();
//   const { getPeopleListFetch } = usePeopleListEffect(
//     peopleListAction.setPeopleListRenew,
//     peopleListAction.setPage,
//   );

//   return (
//     <Layout>
//       <hr />
//       <PeopleSort
//         role={peopleList.role}
//         setRole={peopleList.setRole}
//         grade={peopleList.grade}
//         setGrade={peopleList.setGrade}
//         region={peopleList.region}
//         setRegion={peopleList.setRegion}
//         search={peopleList.search}
//         setSearch={peopleList.setSearch}
//         getApi={getPeopleListApi}
//       />
//       <hr />

//       <Row xs="12">
//         {peopleList.peopleList.length !== 0 &&
//           peopleList.peopleList.map((value, index) => {
//             return (
//               <Col xs="2" key={index}>
//                 <PeopleBox url={`/profile/${value.userId}`} data={value} />
//               </Col>
//             );
//           })}
//       </Row>
//       <div id="pagination_div">
//         <Pagination
//           id="pagination"
//           count={peopleList.page.totalPages}
//           onChange={(e, page) => {
//             let params = "";
//             if (peopleList.role !== "") params += `&role=${peopleList.role}`;
//             if (peopleList.grade !== "") params += `&grade=${peopleList.grade}`;
//             if (peopleList.region !== "")
//               params += `&region=${peopleList.region}`;
//             getPeopleListFetch(page - 1, params);
//           }}
//         />
//       </div>
//     </Layout>
//   );
// }
