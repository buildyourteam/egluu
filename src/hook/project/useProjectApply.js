import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginApi } from "../api";

const axios = require("axios");

export const useProjectApplyState = (api) => {
  const [apply, setApply] = useState(projectApply);
  const [applied, setApplied] = useState(false);
  const fetchGetApply = async () => {
    const token = window.sessionStorage.getItem("accessToken");
    const id = window.sessionStorage.getItem("id");
    let res = await axios
      .get(`${api}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await loginApi.refreshToken();
          res = await axios
            .get(`${api}/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            })
            .catch((error) => {
              throw error;
            });
        } else {
          throw error;
        }
      });
    return res.data;
  };

  const fetchPostApply = async (data, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    await axios
      .post(api, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await loginApi.refreshToken();

          await axios
            .post(api, data, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            })
            .catch((error) => {
              throw error;
            });
        } else {
          throw error;
        }
      });
  };

  const fetchPutApply = async (data, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    await axios
      .put(api, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await loginApi.refreshToken();

          await axios
            .put(api, data, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            })
            .catch((error) => {
              throw error;
            });
        } else {
          throw error;
        }
      });
  };

  const inputApply = (name, data) => {
    setApply((value, index) => {
      return {
        ...value,
        [name]: data,
      };
    });
  };

  const inputAnswer = (a, i) => {
    const inputAnswer = apply.answers.map((value, index) => {
      if (i === index) {
        return a;
      } else {
        return value;
      }
    });
    setApply((value, index) => {
      return {
        ...value,
        answers: inputAnswer,
      };
    });
  };

  const selectRole = (data) => {
    setApply((value) => {
      return {
        ...value,
        role: data,
      };
    });
  };

  return [
    { apply, applied },
    {
      fetchPostApply,
      inputAnswer,
      setApply,
      inputApply,
      selectRole,
      fetchGetApply,
      fetchPutApply,
      setApplied,
    },
  ];
};

export const useProjectApplyEffect = (
  questions,
  getApply,
  apply,
  applyAction,
  applyRes,
  applyGetRes,
  applyPutRes,
  detailGet,
  applyLink,
  afterAction,
) => {
  const history = useHistory();
  useEffect(() => {
    const defaultAnaswer = questions.map(() => {
      return "";
    });
    applyAction.inputApply("answers", defaultAnaswer);
  }, [questions]);

  useEffect(() => {
    if (detailGet && applyLink !== "") {
      getApply();
    }
  }, [detailGet, applyLink]);

  useEffect(() => {
    if (applyGetRes.fulfilled) {
      applyAction.setApply(applyGetRes.data);
      if (apply.answer !== "") {
        applyAction.setApplied(true);
      }
    }
  }, [applyGetRes.fulfilled]);

  useEffect(() => {
    if (applyRes.fulfilled) {
      const id = window.sessionStorage.getItem("id");
      afterAction();
    }
  }, [applyRes.fulfilled]);
  useEffect(() => {
    if (applyPutRes.fulfilled) {
      const id = window.sessionStorage.getItem("id");
      afterAction();
    }
  }, [applyPutRes.fulfilled]);
  return "";
};

export const useProjectDetailApplyState = (api) => {
  const [apply, setApply] = useState(projectApply);

  const fetchGetApply = async () => {
    const token = window.sessionStorage.getItem("accessToken");
    const id = window.sessionStorage.getItem("id");
    let res = await axios
      .get(`${api}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await loginApi.refreshToken();

          res = await axios
            .get(`${api}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            })
            .catch((error) => {
              throw error;
            });
        } else {
          throw error;
        }
      });
    return res.data;
  };

  const fetchPutApply = async () => {
    const token = window.sessionStorage.getItem("accessToken");
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
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await loginApi.refreshToken();

          await axios
            .put(api, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            })
            .catch((error) => {
              throw error;
            });
        } else {
          throw error;
        }
      });
  };

  const fetchDeleteApply = async () => {
    const token = window.sessionStorage.getItem("accessToken");
    await axios
      .delete(api, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await loginApi.refreshToken();

          await axios
            .delete(api, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            })
            .catch((error) => {
              throw error;
            });
        } else {
          throw error;
        }
      });
  };

  return [
    { apply },
    {
      fetchDeleteApply,
      setApply,
      fetchGetApply,
      fetchPutApply,
    },
  ];
};

export const useProjectDetailApplyEffect = (
  open,
  getApply,
  apply,
  applyGetRes,
  applyPutRes,
  applyDeleteRes,
  applySet,
  userId,
  close,
  applyAction,
) => {
  const history = useHistory();
  useEffect(() => {
    if (open) {
      getApply();
    }
  }, [open]);

  useEffect(() => {
    if (applyGetRes.fulfilled) {
      applyAction.setApply(applyGetRes.data);
    }
  }, [applyGetRes.fulfilled]);

  useEffect(() => {
    if (applyPutRes.fulfilled) {
      applySet((value) => {
        const filterData = value.map((apply) => {
          if (apply.userId === userId) {
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
  }, [applyPutRes.fulfilled]);

  useEffect(() => {
    if (applyDeleteRes.fulfilled) {
      applySet((value) => {
        const filterData = value.map((apply) => {
          if (apply.userId === userId) {
            return {
              ...apply,
              state: "REJECT",
            };
          }
        });
        return filterData;
      });
      close();
    }
  }, [applyDeleteRes.fulfilled]);
};

const projectApply = {
  answers: [],
  introduction: "",
  role: "",
};
