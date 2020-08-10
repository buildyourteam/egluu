import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const axios = require("axios");

export const useProjectApplyState = (api) => {
  const [apply, setApply] = useState(projectApply);

  const fetchGetApply = async () => {
    const token = window.sessionStorage.getItem("accessToken");
    await axios.get(api, {
      headers: {
        authtoken: token,
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/hal+json",
      },
    });
  };

  const fetchPostApply = async (data, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    await axios.post(api, data, {
      headers: {
        authtoken: token,
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/hal+json",
      },
    });
  };

  const fetchPutApply = async (data, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    await axios.put(api, data, {
      headers: {
        authtoken: token,
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/hal+json",
      },
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
    { apply },
    {
      fetchPostApply,
      inputAnswer,
      inputApply,
      selectRole,
      fetchGetApply,
      fetchPutApply,
    },
  ];
};

export const useProjectApplyEffect = (
  questions,
  apply,
  applyAction,
  applyRes,
  applyGetRes,
  applyPutRes,
  applyApi
) => {
  const history = useHistory();
  console.log(applyRes);
  useEffect(() => {
    const defaultAnaswer = questions.map(() => {
      return "";
    });
    applyAction.inputApply("answers", defaultAnaswer);
  }, [questions]);

  useEffect(() => {
    if (applyApi !== "") {
      applyAction.fetchGetApply();
    }
  }, [applyApi]);

  useEffect(() => {
    if (applyRes.fulfilled) {
      const id = window.sessionStorage.getItem("id");
      history.push(`/profile/${id}`);
    }
  }, [applyRes.fulfilled]);
  useEffect(() => {
    if (applyPutRes.fulfilled) {
      const id = window.sessionStorage.getItem("id");
      history.push(`/profile/${id}`);
    }
  }, [applyPutRes.fulfilled]);
  return "";
};

const projectApply = {
  answers: [],
  introduction: "",
  role: "",
};
