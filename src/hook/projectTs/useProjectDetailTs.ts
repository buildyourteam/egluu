import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert, useRequest } from "../";
import { useHistory } from "react-router-dom";
import { loginApi } from "../api";
import { RequestState } from "../useRequest";

const axios = require("axios");

type ProjectDetailType = {
  projectName: string;
  teamName: string;
  endDate: string;
  description: string;
  status: string;
  projectField: string;
  applyCanFile: boolean;
  questions: string[];
introduction: string;
  needMember: {
    developer: number;
    designer: number;
    planner: number;
    etc: number;
  };
  currentMember: {
    developer: number;
    designer: number;
    planner: number;
    etc: number;
  };
  _links: {
    self: {
      href: string;
    };
    apply: {
      href: string;
    };
  };
};

type RecruitDtoListType = {
  userName: string;
  selfDescription: string;
  role: string;
  status: string;
  projectId: number;
  projectName: string;
  _links: {
    self: {
      href: string;
    };
  };
};

type checkType = {
  apply: boolean;
  recruit: boolean;
  reader: boolean;
  applyModal: boolean;
  delete: boolean;
  applyDetail: boolean;
};

// type ApplyTypeTmp = {
//     res: Promise<void>;
//     resApply: {
//         apply: object;
//         recruit: object;
//     }
// }

type pagenationType = {
    apply: number,
    recruit: number,
}

type ApplyType = {
    state: string;
    userName: string;
    role: string;
    _links: string;
    userId: string;
    href: string;
}

type ProjectDetailStateType = {
    project: { 
        getProject: RequestState;
        deleteProject: RequestState;
        project: ProjectDetailType;
        check: checkType;
        apply: ApplyType[];
        recruit: RecruitDtoListType[];
        pagination: pagenationType;
    };
    projectAction: {
    getProjectApi: (projectId: string) => Promise<void>;
      deleteProjectApi: (projectId: string) => Promise<void>;
      inputProject: (e: React.ChangeEvent<HTMLInputElement>) => void;
      checkSwitch: (name: string, checked: boolean) => void;
      inputApply: (e: React.ChangeEvent<HTMLInputElement>) => void;
      inputRecruit: (e: React.ChangeEvent<HTMLInputElement>) => void;
      clickPagination: (name: string, nextPage: number) => void;
      openApply: () => void;
      closeApply: () => void;
      openDelete: () => void;
      closeDelete: () => void;
      openDetailApply: () => void;
      closeDetailApply: () => void;
    },
}

const useProjectDetailStateTs = (): ProjectDetailStateType => {
  const history = useHistory();
  const [project, setProject] = useState<ProjectDetailType>(projectDetail);
  const [apply, setApply] = useState<ApplyType[]>([]);
  const [recruit, setRecruit] = useState<RecruitDtoListType[]>(recruitDtoList);
  //   const [alertData, alertAction] = useAlert();
  const [check, setCheck] = useState<checkType>({
    apply: true,
    recruit: false,
    reader: false,
    applyModal: false,
    delete: false,
    applyDetail: false,
  });
  const [pagination, setPagination] = useState<pagenationType>({
    apply: 0,
    recruit: 0,
  });
  const [teamReader, setTeamReader] = useState(false);
  const fetchGetDetail = async (projectId: string): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    let resApply = {
      apply: {},
      recruit: {},
    };
    let res = await axios
      .get(`${process.env.REACT_APP_BASE_URL}projects/${projectId}`)
      .catch(async (error: any) => {
        if (error.response.data.error === "007") {
          token = await loginApi().refreshToken();
          res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}projects/${projectId}`,
          );
        } else {
          throw error;
        }
      })
      .catch((error: any) => {
        throw error;
      });
    const id = window.sessionStorage.getItem("id");
    if (res.data.memberList[0]._links.self.href === `/profile/${id}`) {
      token = await loginApi().refreshToken();

      await axios
        .get(res.data._links.apply.href, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/hal+json",
          },
        })
        .then((value: any) => {
          try {
            setApply(value.data._embedded.projectApplicantDtoList);
          } catch {
            setApply([]);
          }
        })
        .catch(async (error: any) => {
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
          },
        )
        .then((value: any) => {
          try {
            setRecruit(value.data._embedded.recruitDtoList);
          } catch {
            setRecruit([]);
          }
        })
        .catch((error: any) => {
          throw error;
        });
    }
    res = res.data;
    return { res, resApply };
  };

  const fetchDeleteProject = async (projectId: string): Promise<void> => {
    let token = window.sessionStorage.getItem("accessToken");
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}projects/${projectId}`, {
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
            .delete(`${process.env.REACT_APP_BASE_URL}projects/${projectId}`, {
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
    // history.push("/projects");
  };

  const [getProject, { run: getProjectApi }] = useRequest(fetchGetDetail);

  const [deleteProject, { run: deleteProjectApi }] = useRequest(
    fetchDeleteProject,
  );

  //   const fetchPutApply = async (userId: string) => {
  //     let token = window.sessionStorage.getItem("accessToken");
  //     token = await loginApi().refreshToken();
  //     await axios
  //       .put(project._links.apply.href, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json;charset=UTF-8",
  //           Accept: "application/hal+json",
  //         },
  //       })
  //       .then(() => {
  //         const deleteMember = apply.filter((member) => member.userId !== userId);
  //         setApply(deleteMember);
  //       })
  //       .catch(async (error: any) => {
  //         throw error;
  //       });
  //   };

  const inputProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

    const checkSwitch = (name: string, checked: boolean) => {
    setCheck((value) => {
      return {
        ...value,
        [name]: checked,
      };
    });
  };

  const inputApply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecruit((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  const inputRecruit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApply((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clickPagination = (name: string, nextPage: number) => {
    setPagination((value: any) => {
      const count = value[name] + nextPage;
      return {
        ...value,
        [name]: count,
      };
    });
  };

  const openApply = () => {
    setCheck((value) => {
      return {
        ...value,
        applyModal: true,
      };
    });
  };

  const closeApply = () => {
    setCheck((value) => {
      return {
        ...value,
        applyModal: false,
      };
    });
  };

  const openDetailApply = () => {
    setCheck((value) => {
      return {
        ...value,
        applyDetail: true,
      };
    });
  };

  const closeDetailApply = () => {
    setCheck((value) => {
      return {
        ...value,
        applyDetail: false,
      };
    });
  };

  const openDelete = () => {
    setCheck((value) => {
      return {
        ...value,
        delete: true,
      };
    });
  };

  const closeDelete = () => {
    setCheck((value) => {
      return {
        ...value,
        delete: false,
      };
    });
  };

  return {
    project: {
      getProject,
      deleteProject,
      project,
      check,
      apply,
      recruit,
      pagination,
    },
    projectAction: {
      getProjectApi,
      deleteProjectApi,
      inputProject,
      checkSwitch,
      inputApply,
      inputRecruit,
      clickPagination,
      openApply,
      closeApply,
      openDelete,
      closeDelete,
      openDetailApply,
      closeDetailApply,
    },
  };
};

// const useProjectDetailEffect = (
//   data,
//   fulfilled,
//   rejected,
//   error,
//   fetchDetail,
//   projectAction,
//   projectId,
// ) => {
// //   const [alertData, alertAction] = useAlert();

//   useEffect(() => {
//     fetchDetail(projectId);
//   }, []);

//   useEffect(() => {
//     if (fulfilled) {
//       projectAction.setProjectState(data.res);
//       const id = window.sessionStorage.getItem("id");
//       if (data.res.memberList[0]._links.self.href === `/profile/${id}`) {
//         projectAction.checkSwitch("reader", true);
//       }
//     }
//   }, [fulfilled]);

//   useEffect(() => {
//     if (rejected) {
//       console.log(error.response);
//     //   alertAction.open(error.response.data.message);
//     }
//   }, [rejected]);
// };

// const useProjectRecruitEffect = (
//   data,
//   fulfilled,
//   rejected,
//   error,
//   inputState,
// ) => {
// //   const [alertData, alertAction] = useAlert();

//   useEffect(() => {
//     if (fulfilled) {
//       // inputDetail(data);
//       inputState(recruitDtoList);
//     }
//   }, [fulfilled]);

//   useEffect(() => {
//     if (rejected) {
//     //   alertAction.open(error.response.data.message);
//       console.log(error);
//     }
//   }, [rejected]);
// };

export {
  useProjectDetailStateTs,
//   useProjectDetailEffect,
//   useProjectRecruitEffect,
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
  introduction: "",
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
    userName: "",
    selfDescription: "",
    role: "",
    status: "",
    projectId: 0,
    projectName: "",
    _links: {
      self: {
        href: "",
      },
    },
  },
];
