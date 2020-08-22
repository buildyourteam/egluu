import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import refreshToken from "../auth/refreshToken";
const axios = require("axios");

const useProjectDetailState = () => {
  const history = useHistory();
  const [project, setProject] = useState(projectDetail);
  const [apply, setApply] = useState([]);
  const [recruit, setRecruit] = useState(recruitDtoList);
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
    const token = window.sessionStorage.getItem("accessToken");
    let resApply;
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
      });
    const id = window.sessionStorage.getItem("id");
    if (res.data.memberList[0].userName === id) {
      resApply = await axios
        .get(res.data._links.apply.href, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/hal+json",
          },
        })
        .then((value) => {
          setApplyState(value.data._embedded.projectApplicantDtoList);
        })
        .catch(async (error) => {
          if (error.response.data.error === "007") {
            token = await refreshToken();
            resApply = await axios.get(res.data._links.apply.href, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            });
          } else {
            throw error;
          }
        });
    }
    res = res.data;
    return { res, resApply };
  };

  const fetchDeleteProject = async (projectId) => {
    const token = window.sessionStorage.getItem("accessToken");
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
          await axios.delete(
            `${process.env.REACT_APP_BASE_URL}projects/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/hal+json",
              },
            }
          );
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
  useEffect(() => {
    fetchDetail(projectId);
  }, []);

  useEffect(() => {
    if (fulfilled) {
      projectAction.setProjectState(data.res);
      const id = window.sessionStorage.getItem("id");
      if (data.res.memberList[0]._links.self.href === `/profile/${id}`) {
        projectAction.checkSwitch("reader", true);
        if (data.resApply !== undefined)
          projectAction.setApplyState(data.resApply);
      }
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      // alert('에러 발생');
      // if (error.response.error === 101) {
      //     console.log('지원자 없음');
      //     projectAction.setApplyState([])
      // }
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
  useEffect(() => {
    if (fulfilled) {
      // inputDetail(data);
      inputState(recruitDtoList);
    }
  }, [fulfilled]);

  useEffect(() => {
    if (rejected) {
      alert("에러 발생");
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
