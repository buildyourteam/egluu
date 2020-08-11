import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
const axios = require("axios");

const useProjectDetailState = () => {
    const history = useHistory();
    const [project, setProject] = useState(projectDetail);
    const [apply, setApply] = useState([]);
    const [recruit, setRecruit] = useState(recruitDtoList)
    const [check, setCheck] = useState({
        apply: false,
        recruit: false
    })
    const fetchGetDetail = async (projectId) => {
        const token = window.sessionStorage.getItem("accessToken");
        console.log(token)
        let resApply
        let res = await axios.get(`http://34.105.29.115:8080/projects/${projectId}`);
        res = res.data;
        console.log(res._links.apply)
        if (res._links.apply) {
            resApply = await axios.get(res._links.apply.href, {
                headers: {
                    'authtoken': token,
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/hal+json'
                }
            }).then((resData) => {
                resApply = resData.data;
            }).catch(error => {
                if (error.response.error === 101) {
                    console.log('지원자 없음');
                    resApply = [];
                }
            });
        }
        return { res, resApply }
    }

    const fetchDeleteProject = async (projectId) => {
        const token = window.sessionStorage.getItem("accessToken");
        await axios.delete(`http://34.105.29.115:8080/projects/${projectId}`, {
            headers: {
                'authtoken': token,
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/hal+json'
            }
        });
        history.push('/projects');
    }

    const setProjectState = (data) => {
        setProject(data);
    }

    const inputProject = (e) => {

        setProject(value => {
            return {
                ...value,
                [e.target.name]: e.target.value
            }
        });
    }

    const setApplyState = (data) => {
        setApply(data)
    }

    const inputApply = (e) => {
        setRecruit(value => {
            return {
                ...value,
                [e.target.name]: e.target.value
            }
        })
    }

    const setRecruitState = (data) => {
        setRecruit(data);
    }

    const inputRecruit = (e) => {
        setApply(value => {
            return {
                ...value,
                [e.target.name]: e.target.value
            }
        })
    }
    const checkSwitch = (e) => {
        const name = e.target.name;
        const checked = e.target.checked
        setCheck(value => {
            return {
                ...value,
                [name]: checked
            }
        })
    }

    return [{ project, check, apply, recruit }, { fetchGetDetail, inputProject, setProjectState, checkSwitch, inputApply, setApplyState, setRecruitState, inputRecruit, fetchDeleteProject }]
}

const useProjectDetailEffect = (data, fulfilled, rejected, error, fetchDetail, projectAction, projectId) => {
    useEffect(() => {
        fetchDetail(projectId);
    }, []);

    useEffect(() => {
        if (fulfilled) {
            console.log(data)
            projectAction.setProjectState(data.res);
            if (data.resApply !== undefined) {
                projectAction.setApplyState(data.resApply)
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
}

const useProjectRecruitEffect = (data, fulfilled, rejected, error, inputState) => {
    useEffect(() => {
        if (fulfilled) {
            // inputDetail(data);
            inputState(recruitDtoList);
        }
    }, [fulfilled]);

    useEffect(() => {
        if (rejected) {
            alert('에러 발생');
            console.log(error);
        }
    }, [rejected]);
}

export { useProjectDetailState, useProjectDetailEffect, useProjectRecruitEffect };

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
        etc: 0
    },
    currentMember: {
        developer: 0,
        designer: 0,
        planner: 0,
        etc: 0
    },
    _links: {
        self: {
            href: ""
        }
    }
}

const projectApplicantDtoList = [{
    userId: "",
    userName: "",
    status: "",
    role: "",
    _links: {
        self: {
            href: ""
        },
    }
}]

const recruitDtoList = [{
    userName: "유저01",
    selfDescription: "프로젝트 영입하고 싶습니다.",
    role: "DEVELOPER",
    status: "UNREAD",
    projectId: 11,
    projectName: "project1",
    _links: {
        self: {
            href: "https://api.eskiiimo.com/profile/tester/recruit/11"
        }
    }
}, {
    userName: "유저02",
    selfDescription: "프로젝트 영입하고 싶습니다.",
    role: "DEVELOPER",
    status: "UNREAD",
    projectId: 11,
    projectName: "project1",
    _links: {
        self: {
            href: "https://api.eskiiimo.com/profile/tester/recruit/11"
        }
    }
}]