import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useRequest } from "..";
import { loginApi } from "../api";
import { RequestState } from "../useRequest";

const axios = require("axios");

type ApplyStateType = {
  answers: string[];
  introduction: string;
  role: string;
  questions: string[];
  userName: string;
  status: string;
};

type ApplyInputType = {
  apply: ApplyStateType;
  applied: boolean;
  getApply: RequestState;
  putApply: RequestState;
  postApply: RequestState;
};

type ApplyInputActionType = {
  getApplyApi: (apiLink: string) => Promise<void>;
  postApplyApi: (data: object, apiLink: string) => Promise<void>;
  putApplyApi: (data: any, apiLink: string) => Promise<void>;
  setApply: Dispatch<SetStateAction<ApplyStateType>>;
  inputAnswer: (a: string, i: number) => void;
  inputApply: (name: string, data: string[] | string) => void;
  selectRole: (data: string) => void;
  setApplied: Dispatch<SetStateAction<boolean>>;
};

type ApplyType = {
  getApply: RequestState;
  putApply: RequestState;
  deleteApply: RequestState;
  apply: ApplyStateType;
};

type ApplyActionType = {
  getApplyApi: (api: string) => Promise<void>;
  putApplyApi: (api: string) => Promise<void>;
  deleteApplyApi: (api: string) => Promise<void>;
  setApply: Dispatch<SetStateAction<ApplyStateType>>;
};

type ProjectApplyType = {
  applyDetail: ApplyType;
  applyDetailAction: ApplyActionType;
};

export const useInputProjectApplyStateTs = () => {
  const [apply, setApply] = useState<ApplyStateType>(projectApply);
  const [applied, setApplied] = useState<boolean>(false);
  const fetchGetApply = async (apiLink: string): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    const id = window.sessionStorage.getItem("id");
    let res = await axios
      .get(`${apiLink}/${id}`, {
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
            .get(`${apiLink}/${id}`, {
              headers: {
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
    return res.data;
  };

  const fetchPostApply = async (
    data: object,
    apiLink: string,
  ): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    console.log(apiLink);
    await axios
      .post(apiLink, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error: any) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();
          await axios
            .post(apiLink, data, {
              headers: {
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
  };

  const fetchPutApply = async (data: any, apiLink: string): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    await axios
      .put(apiLink, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error: any) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();

          await axios
            .put(apiLink, data, {
              headers: {
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
  };

  const [getApply, { run: getApplyApi }] = useRequest(fetchGetApply);
  const [putApply, { run: putApplyApi }] = useRequest(fetchPutApply);
  const [postApply, { run: postApplyApi }] = useRequest(fetchPostApply);

  const inputApply = (name: string, data: string[] | string) => {
    setApply((value: any) => {
      return {
        ...value,
        [name]: data,
      };
    });
  };

  const inputAnswer = (a: string, i: number) => {
    const inputAnswer = apply.answers.map((value, index) => {
      if (i === index) {
        return a;
      } else {
        return value;
      }
    });
    setApply((value: any) => {
      return {
        ...value,
        answers: inputAnswer,
      };
    });
  };

  const selectRole = (data: string) => {
    setApply((value) => {
      return {
        ...value,
        role: data,
      };
    });
  };

  return {
    apply: { apply, applied, getApply, putApply, postApply },
    applyAction: {
      postApplyApi,
      putApplyApi,
      getApplyApi,
      setApply,
      inputAnswer,
      inputApply,
      selectRole,
      setApplied,
    },
  };
};

export const useInputProjectApplyEffectTs = (
  apply: ApplyInputType,
  applyAction: ApplyInputActionType,
  questions: string[],
  detailGet: boolean,
  apiLink: string,
  afterAction: () => void,
) => {

  useEffect(() => {
    const defaultAns = new Array(questions.length);
    defaultAns.fill("");
    applyAction.inputApply("answers", defaultAns);
  }, [questions]);

  useEffect(() => {
    if (detailGet) {
      applyAction.getApplyApi(apiLink);
    }
  }, [detailGet]);

  useEffect(() => {
    if (apply.getApply.fulfilled) {
      applyAction.setApply(apply.getApply.data);
      if (apply.apply.answers.length !== 0) {
        applyAction.setApplied(true);
      }
    }
  }, [apply.getApply.fulfilled]);

  useEffect(() => {
    if (apply.putApply.fulfilled) {
      const id = window.sessionStorage.getItem("id");
      afterAction();
    }
  }, [apply.putApply.fulfilled]);

  useEffect(() => {
    if (apply.postApply.fulfilled) {
      const id = window.sessionStorage.getItem("id");
      afterAction();
    }
  }, [apply.postApply.fulfilled]);

};

export const useViewProjectApplyStateTs = (): ProjectApplyType => {
  const [apply, setApply] = useState<ApplyStateType>(projectApply);

  const fetchGetApply = async (api: string): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    const id = window.sessionStorage.getItem("id");
    let res = await axios
      .get(`${api}`, {
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
            .get(`${api}`, {
              headers: {
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
    return res.data;
  };

  const fetchPutApply = async (api: string): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    await axios
      .put(
        api,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/hal+json",
          },
        },
      )
      .catch(async (error: any) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();

          await axios
            .put(api, {
              headers: {
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
  };

  const fetchDeleteApply = async (api: string): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    await axios
      .delete(api, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error: any) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();

          await axios
            .delete(api, {
              headers: {
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
  };

  const [getApply, { run: getApplyApi }] = useRequest(fetchGetApply);
  const [putApply, { run: putApplyApi }] = useRequest(fetchPutApply);
  const [deleteApply, { run: deleteApplyApi }] = useRequest(fetchDeleteApply);

  return {
    applyDetail: { getApply, putApply, deleteApply, apply },
    applyDetailAction: {
      deleteApplyApi,
      getApplyApi,
      putApplyApi,
      setApply,
    },
  };
};

export const useViewProjectApplyEffectTs = (
  apply: ApplyType,
  applyAction: ApplyActionType,
  open: boolean,
  applyLink: string,
  applySet: Dispatch<SetStateAction<ApplyType[]>>,
  userId: string,
  close: () => void,
) => {
  const history = useHistory();
  useEffect(() => {
    if (open) {
      applyAction.getApplyApi(applyLink);
    }
  }, [open]);

  useEffect(() => {
    if (apply.getApply.fulfilled) {
      applyAction.setApply(apply.getApply.data);
    }
  }, [apply.getApply.fulfilled]);

  useEffect(() => {
    if (apply.putApply.fulfilled) {
      applySet((value) => {
        const filterData = value.map((apply) => {
          if (apply.apply.userName === userId) {
            return {
              ...apply,
              state: "ACCEPT",
            };
          } else {
            return apply;
          }
        });
        return filterData;
      });
      close();
    }
  }, [apply.putApply.fulfilled]);

  useEffect(() => {
    if (apply.deleteApply.fulfilled) {
      applySet((value: any) => {
        const filterData = value.map((apply: any) => {
          if (apply.apply.userId === userId) {
            return {
              ...apply,
              state: "REJECT",
            };
          }``
        });
        return filterData;
      });
      close();
    }
  }, [apply.deleteApply.fulfilled]);
};

const projectApply = {
  answers: [],
  introduction: "",
  role: "",
  questions: [],
  userName: "",
  status: "",
};
