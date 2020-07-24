import React from "react";
import { Row, Col, Alert } from "reactstrap";
import "./Profile.css";
import { useInfoApi, useImgApi } from "../../hook/api/profileApi";
import { useRequest } from "../../hook/useRequest";
import { useImage } from "../../hook/profile/useImage";
import useProfileInfo from "../../hook/profile/useProfileInfo";

const ProfileInfo = ({
  // 이미지까지 다하고 필요없으면 모디파이 props는 삭제!

  setModifying,
  infoState,
  setInfoState,
  imgState,
  setImgState,
  userId
}) => {
  // info 정보 get 하는 api
  const { getInfo } = useInfoApi();

  // info get의 상태변수와 데이터 및 액션 디스패쳐
  const [
    {
      data: resGetInfo,
      fulfilled: getInfoFulfilled,
      pending: getInfoPending,
      rejected: getInfoRejected,
      error: getInfoError
    },
    { run: getInfoApi }
  ] = useRequest(getInfo);

  // 상태변화에 대한 sideEffect에 쓰일 args
  useProfileInfo(
    resGetInfo,
    getInfoFulfilled,
    getInfoRejected,
    getInfoError,
    getInfoApi,

    infoState,
    setInfoState,

    userId
  );
  /////////////////////////////////////////////////////////////////////////////////////////

  const { getImg } = useImgApi();
  // img get의 상태변수와 데이터 및 액션 디스패쳐

  const [
    {
      data: resGetImg,
      fulfilled: getImgFulfilled,
      pending: getImgPending,
      rejected: getImgRejected,
      error: getImgError
    },
    { run: getImgApi }
  ] = useRequest(getImg);

  useImage(
    resGetImg,
    getImgFulfilled,
    getImgRejected,
    getImgError,
    getImgApi,

    imgState,
    setImgState,

    userId
  );

  return (
    <div>
      {getInfoPending ? (
        <p>로딩중...</p>
      ) : (
        <>
          <Alert color="secondary">{infoState.introduction} </Alert>
          {/* width="100%" 으로 비율유지 
  object-fit="contain" 으로 1/4칸에 딱 맞게 조정 */}
          {getImgPending ? (
            <p>로딩중...</p>
          ) : (
            <div className="profile-img">
              <img
                src={imgState.imgUrl}
                width="100%"
                object-fit="contain"
              ></img>
            </div>
          )}
          <h3 className="profile-info-id">{userId}</h3>
          <h6 className="profile-info-id">{infoState.userName}</h6>
          <h6>
            Lev. {infoState.grade} {infoState.role}
          </h6>
          <h6>area : {infoState.area}</h6>
          <p>#ReactJs #Javascript</p>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
