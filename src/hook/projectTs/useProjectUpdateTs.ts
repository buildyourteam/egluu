import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
    designer: number;
    planner: number;
    etc: number;
  };
};

type updateStateType = {
    project: CreateProject;
    img: any;
    updateProject: RequestState;
    updateImg: RequestState;
  }

type updateActionType = {
    UpdateProjectApi: (projectId: string, data: any) => Promise<void>;
    UpdateImgApi: (projectId: string, data: any) => Promise<void>;
    inputProject: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setImg: Dispatch<SetStateAction<any>>;
    inputProjectMember: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputDate: (date: any) => void;
    inputQuestion: (data: string, index: number) => void;
    addQuestion: () => void;
    deleteQuestion: (index: number) => void;
    inputField: (data: string) => void;
  }

type UpdateType = {
  updateState: updateStateType;
  updateAction: updateActionType;
};

const useProjectUpdateStateTs = (): UpdateType => {
  const projectDetail = useSelector(
    (state: any) => state.project.projectDetail,
  );
  const [project, setProject] = useState<CreateProject>(projectDetail);
  const [img, setImg] = useState<any>(projectDetail.img);

  const fetchPutUpdate = async (
    projectId: string,
    data: any,
  ): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    let res = await axios
      .put(`${process.env.REACT_APP_BASE_URL}projects/${projectId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error: any) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();

          res = await axios
            .put(
              `${process.env.REACT_APP_BASE_URL}projects/${projectId}`,
              data,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json;charset=UTF-8",
                  Accept: "application/hal+json",
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

  const fetchImg = async (projectId: string, data: any): Promise<void> => {
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

  const [updateProject, { run: UpdateProjectApi }] = useRequest(fetchPutUpdate);
  const [updateImg, { run: UpdateImgApi }] = useRequest(fetchImg);

  const inputProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const targetValue = e.target.value;

    setProject((value) => {
      return {
        ...value,
        [name]: targetValue,
      };
    });
  };

  const inputDate = (date: string) => {
    setProject((value) => {
      return {
        ...value,
        endDate: date,
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

  const inputProjectMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const memberValue = e.target.value;
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

    const inputField = (data: string) => {
      setProject((value) => {
        return {
          ...value,
          projectField: data,
        };
      });
    };

  return {
    updateState: { project, img, updateProject, updateImg },
    updateAction: {
      UpdateProjectApi,
      UpdateImgApi,
      inputProject,
      setImg,
      inputProjectMember,
      inputDate,
      inputQuestion,
      addQuestion,
      deleteQuestion,
      inputField,
    },
  };
};

const useProjectUpdateEffectTs = (
  updateState: updateStateType,
  updateAction: updateActionType,
  projectId: string,
) => {
  const history = useHistory();
   const { alertAction} = useAlert();
  const originImg = useSelector(
    (state: any) => state.project.projectDetail.img,
  );  
  useEffect(() => {
    if (updateState.updateProject.fulfilled) {
      console.log(typeof updateState.img);
      console.log(updateState.img);
      if (updateState.img.length === originImg)
        updateAction.UpdateImgApi(projectId, updateState.img);
      else history.push(`/projectDetail/${projectId}`);
    }
  }, [updateState.updateProject.fulfilled]);

  useEffect(() => {
    if (updateState.updateProject.rejected) {
        alertAction.open(updateState.updateProject.error.response.data.message);
      console.log(updateState.updateProject.error);
    }
  }, [updateState.updateProject.rejected]);
};

export { useProjectUpdateStateTs, useProjectUpdateEffectTs };
