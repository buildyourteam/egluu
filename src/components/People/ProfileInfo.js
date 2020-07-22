import React from "react";
import Badge from "@material-ui/core/Badge";
import { Row, Col, Alert, CardTitle, CardText } from "reactstrap";
import "./Profile.css";
import profile from "../icon/baseImg.png";

const ProfileInfo = ({ data }) => {
  //const [imgModify, setImgModify] = useState(false);
  // const temporaryImageInput = (async) => {

  //   let data = new FormData();
  //   data.append("data", profile);
  //   const res = await axios.post(
  //     `http://34.105.29.115:8080/profile/image/${userId}`,
  //     data,
  //     {
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //         authToken: token
  //       }
  //     }

  //   );
  //   console(res);
  // }

  return (
    <div>
      <Alert color="secondary">{data.introduction} </Alert>

      {/* width="100%" 으로 비율유지 
object-fit="contain" 으로 1/4칸에 딱 맞게 조정 */}
      <Badge
        className="img-modify-badge"
        color="secondary"
        badgeContent={"i"}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        onClick={() => console.log("Badge")}
      >
        <img src={profile} width="100%" object-fit="contain"></img>
      </Badge>

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
