import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const axios = require("axios");

export const useProjectApplyState = (api) => {
  const [apply, setApply] = useState(projectApply);
  const [applied, setApplied] = useState(false);
  const fetchGetApply = async () => {
    const token = window.sessionStorage.getItem("accessToken");
    const id = window.sessionStorage.getItem("id");
    const res = await axios.get(`${api}/${id}`, {
      headers: {
        authtoken: token,
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/hal+json",
      },
    });
    return res.data;
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
  applyLink
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
