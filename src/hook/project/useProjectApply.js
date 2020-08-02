import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
const axios = require("axios");

export const useProjectApplyState = () => {
  const [apply, setApply] = useState(projectApply);

  const fetchPostApply = async (data, projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
    const res = await axios
      .post(
        `https://egluuapi.codingnome.dev/projects/${projectId}/apply`,
        data,
        {
          headers: {
            authtoken: token,
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/hal+json",
          },
        }
      )
      .then("지원완료");
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

  return [{ apply }, { fetchPostApply, inputAnswer, inputApply, selectRole }];
};

export const useProjectApplyEffect = (questions, apply, applyAction) => {
  useEffect(() => {
    const defaultAnaswer = questions.map(() => {
      return "";
    });
    applyAction.inputApply("answers", defaultAnaswer);
  }, [questions]);
  return "";
};

const projectApply = {
  userName: null,
  state: null,
  questions: null,
  answers: [],
  introduction: "",
  role: "",
};
