import React from "react";
import { Row, Col, Alert } from "reactstrap";
import "./Profile.css";
import profile from "../icon/baseImg.png";
import { useRequest } from "../../hook";
import { useProfileImgApi } from "../../hook/api/profileApi";
import { useImage } from "../../hook/profile/useImage";

const ProfileInfo = ({ data, userId }) => {
  const { getProfileInfoImg } = useProfileImgApi();
  // img get의 상태변수와 데이터 및 액션 디스패쳐

  const [
    {
      data: resGetImgInfo,
      fulfilled: getImgInfoFulfilled,
      pending: getImgInfoPending,
      rejected: getImgInfoRejected,
      error: getImgInfoError
    },
    { run: getImgInfoApi }
  ] = useRequest(getProfileInfoImg);

  const { imgUrl } = useImage(
    resGetImgInfo,
    getImgInfoFulfilled,
    getImgInfoRejected,
    getImgInfoError,
    getImgInfoApi,
    userId
  );

  return (
    <div>
      <Alert color="secondary">{data.introduction} </Alert>

      {/* width="100%" 으로 비율유지 
object-fit="contain" 으로 1/4칸에 딱 맞게 조정 */}
      {getImgInfoPending ? (
        <p>로딩중...</p>
      ) : (
        <img src={imgUrl} width="100%" object-fit="contain"></img>
      )}

      <h3 className="profile-info-id">inho2736</h3>
      <h6 className="profile-info-id">{data.userName}</h6>
      <h6>
        Lev. {data.grade} {data.role}
      </h6>
      <h6>area : {data.area}</h6>
      <p>#ReactJs #Javascript</p>
    </div>
  );
};

export default ProfileInfo;
