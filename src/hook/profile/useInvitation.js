import { useState, useEffect } from "react";
import { useRequest } from "../useRequest";
import { useInvitationListApi } from "../api/profileApi";
import { useInvitationDetailApi } from "../api/profileApi";

export const useInvitationEffect = userId => {
  const [invitationList, setInvitationList] = useState([]);
  const [noList, setNoList] = useState({ isError: false, errorMessage: "" });

  const noticeNoList = message => {
    setNoList({
      isError: true,
      errorMessage: message
    });
  };

  const { getInvitationList } = useInvitationListApi();

  const [
    { data, error, pending, fulfilled, rejected },
    { run: getInvitationListApi }
  ] = useRequest(getInvitationList);

  useEffect(() => {
    getInvitationListApi(userId);
  }, []);

  useEffect(() => {
    if (fulfilled) {
      console.log(data._embedded.recruitDtoList);
      setInvitationList(data._embedded.recruitDtoList);
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

export const useInvitationDetailEffect = (userId, pid) => {
  const [invitaionDetail, setInvitaionDetail] = useState({
    userName: "",
    introduction: "",
    role: "",
    projectName: ""
  });
  const {
    getInvitationDetail,
    putInvitationAccept,
    deleteInvitationReject
  } = useInvitationDetailApi();

  const [
    { data, error, pending, fulfilled, rejected },
    { run: getInvitationDetailApi }
  ] = useRequest(getInvitationDetail);

  const [
    { putData, putError, putPending, putFulfilled, putRejected },
    { run: putInvitationAcceptApi }
  ] = useRequest(putInvitationAccept);

  const [
    { deleteData, deleteError, deletePending, deleteFulfilled, deleteRejected },
    { run: deleteInvitationRejectApi }
  ] = useRequest(deleteInvitationReject);

  useEffect(() => {
    getInvitationDetailApi(userId, pid);
  }, []);

  useEffect(() => {
    if (fulfilled) {
      console.log(data);
      setInvitaionDetail({
        userName: data.userName,
        introduction: data.introduction,
        projectName: data.projectName,
        role: data.role
      });
    }
  }, [fulfilled]);

  return { invitaionDetail, putInvitationAcceptApi, deleteInvitationRejectApi };
};
