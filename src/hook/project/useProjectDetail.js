import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "../";
import { useHistory } from "react-router-dom";
import refreshToken from "../auth/refreshToken";

const axios = require("axios");

const useProjectDetailState = () => {
  const history = useHistory();
  const [project, setProject] = useState(projectDetail);
  const [apply, setApply] = useState([]);
  const [recruit, setRecruit] = useState(recruitDtoList);
  const [alertData, alertAction] = useAlert();
  const [check, setCheck] = useState({
    apply: true,
    recruit: false,
    reader: false,
    applyModal: false,
    delete: false,
  });
  const [pagination, setPagination] = useState({
    apply: 0,
    recruit: 0,
  });
  const [teamReader, setTeamReader] = useState(false);
  const fetchGetDetail = async (projectId) => {
    let token = window.sessionStorage.getItem("accessToken");
    let resApply = {
      apply: {},
      recruit: {},
    };
    let res = await axios
      .get(`${process.env.REACT_APP_BASE_URL}projects/${projectId}`)
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await refreshToken();
          res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}projects/${projectId}`
          );
        } else {
          throw error;
        }
      })
      .catch((error) => {
        throw error;
      });
    const id = window.sessionStorage.getItem("id");
    if (res.data.memberList[0]._links.self.href === `/profile/${id}`) {
      token = await refreshToken();
      await axios
        .get(res.data._links.apply.href, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/hal+json",
          },
        })
        .then((value) => {
          try {
            setApplyState(value.data._embedded.projectApplicantDtoList);
          } catch {
            setApplyState([]);
          }
        })
        .catch(async (error) => {
          throw error;
        });
      await axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/projects/${projectId}/recruits`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/hal+json",
            },
          }
        )
        .then((value) => {
          try {
            setRecruitState(value.data._embedded.recruitDtoList);
          } catch {
            setRecruitState([]);
          }
        })
        .catch((error) => {
          throw error;
        });
    }
    res = res.data;
    return { res, resApply };
  };

  const fetchDeleteProject = async (projectId) => {
    let token = window.sessionStorage.getItem("accessToken");
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/hal+json",
        },
      })
      .catch(async (error) => {
        if (error.response.data.error === "007") {
          token = await refreshToken();
          await axios
            .delete(`${process.env.REACT_APP_BASE_URL}projects/${projectId}`, {
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
    history.push("/projects");
  };

  const setProjectState = (data) => {
    setProject(data);
  };

  const inputProject = (e) => {
    setProject((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  const setApplyState = (data) => {
    setApply(data);
  };

  const inputApply = (e) => {
    setRecruit((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  const setRecruitState = (data) => {
    setRecruit(data);
  };

  const inputRecruit = (e) => {
    setApply((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };
  const checkSwitch = (name, checked) => {
    setCheck((value) => {
      return {
        ...value,
        [name]: checked,
      };
    });
  };

  const clickPagination = (name, nextPage) => {
    setPagination((value) => {
      const count = value[name] + nextPage;
      return {
        ...value,
        [name]: count,
      };
    });
  };

  const openApply = (e) => {
    setCheck((value) => {
      return {
        ...value,
        applyModal: true,
      };
    });
  };

  const closeApply = (e) => {
    setCheck((value) => {
      return {
        ...value,
        applyModal: false,
      };
    });
  };

  const openDelete = (e) => {
    setCheck((value) => {
      return {
        ...value,
        delete: true,
      };
    });
  };

  const closeDelete = (e) => {
    setCheck((value) => {
      return {
        ...value,
        delete: false,
      };
    });
  };

  return [
    { project, check, apply, recruit, pagination },
    {
      fetchGetDetail,
      inputProject,
      setProjectState,
      checkSwitch,
      inputApply,
      setApplyState,
      setRecruitState,
      inputRecruit,
      fetchDeleteProject,
      clickPagination,
      openApply,
      closeApply,
      openDelete,
      closeDelete,
    },
  ];
};

const useProjectDetailEffect = (
  data,
  fulfilled,
  rejected,
  error,
  fetchDetail,
  projectAction,
  projectId
) => {
  const [alertData, alertAction] = useAlert();

  useEffect(() => {
    fetchDetail(projectId);
  }, []);

  useEffect(() => {
    if (fulfilled) {
      projectAction.setProjectState(data.res);
      const id = window.sessionStorage.getItem("id");
      if (data.res.memberList[0]._links.self.href === `/profile/${id}`) {
        projectAction.checkSwitch("reader", true);
      }
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      console.log(error.response);
      alertAction.open(error.response.data.message);

      console.log(error);
    }
  }, [rejected]);
};

const useProjectRecruitEffect = (
  data,
  fulfilled,
  rejected,
  error,
  inputState
) => {
  const [alertData, alertAction] = useAlert();

  useEffect(() => {
    if (fulfilled) {
      // inputDetail(data);
      inputState(recruitDtoList);
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      alertAction.open(error.response.data.message);
      console.log(error);
    }
  }, [rejected]);
};

export {
  useProjectDetailState,
  useProjectDetailEffect,
  useProjectRecruitEffect,
};

const projectDetail = {
  projectName: "",
  teamName: "",
  endDate: "",
  description: "",
  status: "",
  projectField: "",
  applyCanFile: true,
  questions: [],
  needMember: {
    developer: 0,
    designer: 0,
    planner: 0,
    etc: 0,
  },
  currentMember: {
    developer: 0,
    designer: 0,
    planner: 0,
    etc: 0,
  },
  _links: {
    self: {
      href: "",
    },
    apply: {
      href: "",
    },
  },
};

const projectApplicantDtoList = [
  {
    userId: "",
    userName: "",
    status: "",
    role: "",
    _links: {
      self: {
        href: "",
      },
    },
  },
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
        href: "https://api.eskiiimo.com/profile/tester/recruit/11",
      },
    },
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
        href: "https://api.eskiiimo.com/profile/tester/recruit/11",
      },
    },
  },
];
