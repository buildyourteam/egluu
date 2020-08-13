import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const axios = require("axios");

const useProjectUpdateState = () => {
  const projectDetail = useSelector(state => state.project.projectDetail);
  const [project, setProject] = useState(projectDetail);
  const [img, setImg] = useState(projectDetail.img);
  const fetchPutUpdate = async (projectId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios.put(
      `https://egluuapi.codingnome.dev/projects/${projectId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json"
        }
      }
    );
    return res.data;
  };

  const fetchImg = async (projectId, data) => {
    const token = window.sessionStorage.getItem("accessToken");
    const imgData = new FormData();
    imgData.append("image", data);
    imgData.append("type", "image/jpeg");
    const res = await axios.post(
      `https://egluuapi.codingnome.dev/projects/image/${projectId}`,
      imgData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data;charset=UTF-8",
          Accept: "application/hal+json"
        }
      }
    );
    return res.data;
  };

  const inputProject = e => {
    const name = e.target.name;
    const targetValue = e.target.value;

    setProject(value => {
      return {
        ...value,
        [name]: targetValue
      };
    });
  };
  const inputDate = date => {
    setProject(value => {
      return {
        ...value,
        endDate: date
      };
    });
  };

  const inputImg = data => {
    setImg(data);
  };

  const inputQuestion = (data, index) => {
    setProject(value => {
      const questions = value.questions.map((q, i) => {
        if (index === i) {
          return data;
        } else {
          return q;
        }
      });
      return {
        ...value,
        questions: questions
      };
    });
  };

  const addQuestion = () => {
    setProject(value => {
      const questions = value.questions.concat("");
      return {
        ...value,
        questions: questions
      };
    });
  };
  const deleteQuestion = index => {
    setProject(value => {
      const questions = value.questions.filter((q, i) => i !== index);
      return {
        ...value,
        questions: questions
      };
    });
  };

  const inputProjectMember = e => {
    const name = e.target.name;
    const memberValue = e.target.value;
    setProject(value => {
      return {
        ...value,
        needMember: {
          ...value.needMember,
          [name]: memberValue
        }
      };
    });
  };

  return [
    { project, img },
    {
      fetchPutUpdate,
      inputProject,
      inputImg,
      inputProjectMember,
      fetchImg,
      inputDate,
      inputQuestion,
      addQuestion,
      deleteQuestion
    }
  ];
};

const useProjectUpdateEffect = (
  data,
  fulfilled,
  rejected,
  error,
  UpdateImgApi,
  projectImg,
  projectId
) => {
  const history = useHistory();
  useEffect(() => {
    if (fulfilled) {
      console.log(typeof projectImg);
      if (typeof projectImg !== "string") UpdateImgApi(projectId, projectImg);
      history.push(`/projectDetail/${projectId}`);
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      alert("에러 발생");
      console.log(error);
    }
  }, [rejected]);
};

export { useProjectUpdateState, useProjectUpdateEffect };

const projectApplicantDtoList = [
  {
    userId: "testApplicant1",
    userName: "테스터",
    status: "UNREAD",
    role: "DEVELOPER",
    _links: {
      self: {
        href: "https://api.eskiiimo.com/projects/1/apply/testApplicant1"
      }
    }
  },
  {
    userId: "testApplicant2",
    userName: "테스터",
    status: "UNREAD",
    role: "DEVELOPER",
    _links: {
      self: {
        href: "https://api.eskiiimo.com/projects/1/apply/testApplicant2"
      }
    }
  }
];

const recruitDtoList = [
  {
    userName: "유저01",
    selfDescription: "프로젝트 영입하고 싶습니다.",
    role: "DEVELOPER",
    status: "UNREAD",
    projectId: 11,
    projectName: "project1",
    _links: {
      self: {
        href: "https://api.eskiiimo.com/profile/tester/recruit/11"
      }
    }
  },
  {
    userName: "유저02",
    selfDescription: "프로젝트 영입하고 싶습니다.",
    role: "DEVELOPER",
    status: "UNREAD",
    projectId: 11,
    projectName: "project1",
    _links: {
      self: {
        href: "https://api.eskiiimo.com/profile/tester/recruit/11"
      }
    }
  }
];
