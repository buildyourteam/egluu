import React from "react";
import { Alert } from "reactstrap";
import "../Profile.css";
import { useImage } from "../../../../hook/profile/useImage";
import useProfileInfo from "../../../../hook/profile/useProfileInfo";

const ProfileInfo = ({ info, setInfo, imgState, setImgState, userId }) => {
  // 상태변화에 대한 sideEffect에 쓰일 args
  const infoPending = useProfileInfo(setInfo, userId);

  const imgPending = useImage(imgState, setImgState, userId);

  return (
    <div>
      {infoPending ? (
        <p>로딩중...</p>
      ) : (
        <>
          <Alert color="secondary">{info.introduction} </Alert>
          {/* width="100%" 으로 비율유지 
  object-fit="contain" 으로 1/4칸에 딱 맞게 조정 */}
          {imgPending ? (
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
          <h6 className="profile-info-id">{info.userName}</h6>
          <h6>
            Lev. {info.grade} {info.role}
          </h6>
          <h6>area : {info.area}</h6>
          <p>#ReactJs #Javascript</p>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
