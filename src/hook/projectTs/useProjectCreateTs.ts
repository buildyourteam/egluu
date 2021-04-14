import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginApi } from "../api";
import { useAlert, useRequest } from "../";
import { RequestState } from "../useRequest";

const axios = require("axios");

type CreateProject = {
  projectName: string;
  teamName: string;
  endDate: string;
  introduction: string;
  state: any;
  projectField: string;
  applyCanFile: boolean;
  questions: string[];
  needMember: {
    developer: number;
    designer:  number;
    planner: number;
    etc: number;
  },
}

type CreateStateType = {
    project: CreateProject;
    createProject: RequestState;
    createImg: RequestState;
    img: string;
}

type CreateActionType = {
    createProjectApi: (data: CreateProject) => Promise<void>;
    createImgApi: (projectId: string, data: string) => Promise<void>;
    inputProject: (name: string, targetValue: string) => void;
    inputDate: (date: any) => void;
    inputImg: (data: string) => void;
    inputField: (data: string) => void;
    inputQuestion: (data: string, index: number) => void;
    addQuestion: () => void;
    deleteQuestion: (index: number) => void;
    inputProjectMember: (name: string, memberValue: string) => void;
}

type CreateType = {
    createState: CreateStateType;
    createAction: CreateActionType;
}

const useProjectCreateStateTS = (): CreateType => {
  const [project, setProject] = useState<CreateProject>(projectDetail);
  const [img, setImg] = useState<string>("");

  const fetchPostCreate = async (data: CreateProject): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    let res = await axios
      .post(`${process.env.REACT_APP_BASE_URL}projects`, data, {
        headers: {
          "Access-Control-Expose-Headers": "Location",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error: any) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();
          res = await axios
            .post(`${process.env.REACT_APP_BASE_URL}projects`, data, {
              headers: {
                "Access-Control-Expose-Headers": "Location",
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            })
            .catch((error: any) => {
              throw error;
            });
        } else {
          throw error;
        }
      });
    return res;
  };

  const fetchImg = async (projectId: string, data: string): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    const imgData = new FormData();
    imgData.append("image", data);
    imgData.append("type", "image/jpeg");
    let res = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}projects/image/${projectId}`,
        imgData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data;charset=UTF-8",
            Accept: "application/hal+json",
            "Access-Control-Expose-Headers": "*",
          },
        },
      )
      .catch(async (error: any) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();

          res = await axios
            .post(
              `${process.env.REACT_APP_BASE_URL}projects/image/${projectId}`,
              imgData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data;charset=UTF-8",
                  Accept: "application/hal+json",
                  "Access-Control-Expose-Headers": "*",
                },
              },
            )
            .catch((error: any) => {
              throw error;
            });
        } else {
          throw error;
        }
      });
    return res.data;
  };

    const [
        createProject,
        { run: createProjectApi },
    ] = useRequest(fetchPostCreate);
    const [
        createImg,
        { run: createImgApi },
    ] = useRequest(fetchImg);

  const inputProject = (name: string, targetValue: string) => {
    setProject((value) => {
      return {
        ...value,
        [name]: targetValue,
      };
    });
  };
  
  const inputDate = (date: any) => {
    setProject((value) => {
      return {
        ...value,
        endDate: date,
      };
    });
  };

  const inputImg = (data: string) => {
    setImg(data);
  };

  const inputField = (data: string) => {
    setProject((value) => {
      return {
        ...value,
        projectField: data,
      };
    });
  };

  const inputQuestion = (data: string, index: number) => {
    setProject((value) => {
      const questions = value.questions.map((q, i) => {
        if (index === i) {
          return data;
        } else {
          return q;
        }
      });
      return {
        ...value,
        questions: questions,
      };
    });
  };

  const addQuestion = () => {
    setProject((value) => {
      const questions = value.questions.concat("");
      return {
        ...value,
        questions: questions,
      };
    });
  };

  const deleteQuestion = (index: number) => {
    setProject((value) => {
      const questions = value.questions.filter((q, i) => i !== index);
      return {
        ...value,
        questions: questions,
      };
    });
  };

  const inputProjectMember = (name: string, memberValue: string): void => {
    setProject((value) => {
      return {
        ...value,
        needMember: {
          ...value.needMember,
          [name]: memberValue,
        },
      };
    });
  };

  const createState: CreateStateType = {
    project,
    createProject,
    createImg,
    img,
  };
  const createAction: CreateActionType = {
    createProjectApi,
    createImgApi,
    inputProject,
    inputImg,
    inputProjectMember,
    inputDate,
    inputQuestion,
    addQuestion,
    deleteQuestion,
    inputField,
  };

  return { createState, createAction }
};

const useProjectCreateEffectTs = (
  createState: CreateStateType,
  createAction: CreateActionType,
) => {
    const { alertAction } = useAlert();

  useEffect(() => {
    if (createState.createProject.fulfilled) {
      const projectId = createState.createProject.data.headers.location.split(
        "/",
      );
      createAction.createImgApi(projectId[4], createState.img);
    }
  }, [createState.createProject.fulfilled]);

  useEffect(() => {
    if (createState.createProject.rejected) {
      alertAction.open(createState.createProject.error.response.data.message);
      console.log(createState.createProject.error);
    }
  }, [createState.createProject.rejected]);
};

export { useProjectCreateStateTS, useProjectCreateEffectTs };

const projectDetail = {
  projectName: "",
  teamName: "",
  endDate: "2020-10-30T23:59:00",
  introduction: "",
  state: null,
  projectField: "",
  applyCanFile: true,
  questions: [""],
  needMember: {
    developer: 0,
    designer: 0,
    planner: 0,
    etc: 0,
  },
};

// const projectApplicantDtoList = [
//   {
//     userId: "testApplicant1",
//     userName: "테스터",
//     status: "UNREAD",
//     role: "DEVELOPER",
//     _links: {
//       self: {
//         href: "https://api.eskiiimo.com/projects/1/apply/testApplicant1",
//       },
//     },
//   },
//   {
//     userId: "testApplicant2",
//     userName: "테스터",
//     status: "UNREAD",
//     role: "DEVELOPER",
//     _links: {
//       self: {
//         href: "https://api.eskiiimo.com/projects/1/apply/testApplicant2",
//       },
//     },
//   },
// ];

// const recruitDtoList = [
//   {
//     userName: "유저01",
//     selfDescription: "프로젝트 영입하고 싶습니다.",
//     role: "DEVELOPER",
//     status: "UNREAD",
//     projectId: 11,
//     projectName: "project1",
//     _links: {
//       self: {
//         href: "https://api.eskiiimo.com/profile/tester/recruit/11",
//       },
//     },
//   },
//   {
//     userName: "유저02",
//     selfDescription: "프로젝트 영입하고 싶습니다.",
//     role: "DEVELOPER",
//     status: "UNREAD",
//     projectId: 11,
//     projectName: "project1",
//     _links: {
//       self: {
//         href: "https://api.eskiiimo.com/profile/tester/recruit/11",
//       },
//     },
//   },
// ];
