import { useState, useEffect } from "react";
import { useRequest } from "../useRequest";
import { invitationListApi } from "../api";
import { invitationDetailApi } from "../api";

export const useInvitationEffect = (userId) => {
  const [invitationList, setInvitationList] = useState([]);
  const [noList, setNoList] = useState({ isError: false, errorMessage: "" });

  const noticeNoList = (message) => {
    setNoList({
      isError: true,
      errorMessage: message,
    });
  };

  const { getInvitationList } = invitationListApi();

  const [
    { data, error, pending, fulfilled, rejected },
    { run: getInvitationListApi },
  ] = useRequest(getInvitationList);

  useEffect(() => {
    getInvitationListApi(userId);
  }, []);

  useEffect(() => {
    if (fulfilled) {
      // 데이터가 있을 때
      if ("_embedded" in data) {
        setInvitationList(data._embedded.recruitDtoList);
      }
      // 데이터가 없을 때
      else {
        noticeNoList("초대 요청이 없습니다.");
      }
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      if (error && error.response.data.error === "105") {
        console.log("rej");
        noticeNoList(error.response.data.message);
      }
    }
  }, [rejected]);

  return { pending, invitationList, noList };
};

export const useInvitationDetailEffect = (userId, pid, toggleNested) => {
  const [invitaionDetail, setInvitaionDetail] = useState({
    userName: "",
    introduction: "",
    role: "",
    projectName: "",
    state: "",
  });
  const [activityName, setActivityName] = useState("");

  const handleAccept = () => {
    putInvitationAcceptApi(userId, pid);
  };

  const handleReject = () => {
    deleteInvitationRejectApi(userId, pid);
  };

  const {
    getInvitationDetail,
    putInvitationAccept,
    deleteInvitationReject,
  } = invitationDetailApi();

  const [
    { data, error, pending, fulfilled, rejected },
    { run: getInvitationDetailApi },
  ] = useRequest(getInvitationDetail);

  const [
    {
      data: putData,
      error: putError,
      pending: putPending,
      fulfilled: putFulfilled,
      reject: putRejected,
    },
    { run: putInvitationAcceptApi },
  ] = useRequest(putInvitationAccept);

  const [
    {
      data: deleteData,
      error: deleteError,
      pending: deletePending,
      fulfilled: deleteFulfilled,
      reject: deleteRejected,
    },
    { run: deleteInvitationRejectApi },
  ] = useRequest(deleteInvitationReject);

  useEffect(() => {
    getInvitationDetailApi(userId, pid);
  }, []);

  useEffect(() => {
    if (fulfilled) {
      setInvitaionDetail({
        userName: data.userName,
        introduction: data.introduction,
        projectName: data.projectName,
        role: data.role,
        state: data.state,
      });
    }
  }, [fulfilled]);

  useEffect(() => {
    if (putFulfilled) {
      setActivityName("수락");
      toggleNested();
    }
  }, [putFulfilled]);

  useEffect(() => {
    if (deleteFulfilled) {
      setActivityName("거절");
      toggleNested();
    }
  }, [deleteFulfilled]);

  return [
    {
      invitaionDetail,
      activityName,
    },
    {
      handleAccept,
      handleReject,
    },
  ];
};
