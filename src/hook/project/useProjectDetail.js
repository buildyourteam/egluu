import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
const axios = require("axios");

const useProjectDetailState = () => {
    const [project, setProject] = useState(projectDetail);
    const [apply, setApply] = useState(projectApplicantDtoList);
    const [recruit, setRecruit] = useState(recruitDtoList)
    const [check, setCheck] = useState({
        apply: false,
        recruit: false
    })
    const fetchGetDetail = async (projectId) => {
        const res = await axios.get(`https://apis.tracker.delivery/carriers`);
        return res.data;
    };


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

    return [{ project, check, apply, recruit }, { fetchGetDetail, inputProject, setProjectState, checkSwitch, inputApply, setApplyState, setRecruitState, inputRecruit }]
}

const useProjectDetailEffect = (data, fulfilled, rejected, error, fetchDetail, inputDetail, projectId) => {
    useEffect(() => {
        fetchDetail.getProjectApi(projectId);
    }, []);

    useEffect(() => {
        if (fulfilled) {
            // inputDetail(data);
            inputDetail(projectDetail);
            if (true) { // 소유자
                fetchDetail.getApplyApi(projectId);
            }
        }
    }, [fulfilled]);

    useEffect(() => {
        if (rejected) {
            alert('에러 발생');
            console.log(error);
        }
    }, [rejected]);
}

const useProjectApplyEffect = (data, fulfilled, rejected, error, inputState) => {
    useEffect(() => {
        if (fulfilled) {
            // inputDetail(data);
            inputState(projectApplicantDtoList);
        }
    }, [fulfilled]);

    useEffect(() => {
        if (rejected) {
            alert('에러 발생');
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

export { useProjectDetailState, useProjectDetailEffect, useProjectApplyEffect, useProjectRecruitEffect };

const projectDetail = {
    projectName: "Hi project....",
    teamName: "project team2",
    endDate: "2020-04-30T23:59:00",
    description: "need yes 입니다.",
    status: "RECRUTING",
    projectField: "APP",
    applyCanFile: true,
    questions: ["question1", "question2"],
    needMember: {
        developer: 1,
        designer: 4,
        planner: 6,
        etc: 8
    },
    _links: {
        self: {
            href: "https://api.eskiiimo.com/projects/1"
        }
    }
}

const projectApplicantDtoList = [{
    userId: "testApplicant1",
    userName: "테스터",
    status: "UNREAD",
    role: "DEVELOPER",
    _links: {
        self: {
            href: "https://api.eskiiimo.com/projects/1/apply/testApplicant1"
        }
    }
}, {
    userId: "testApplicant2",
    userName: "테스터",
    status: "UNREAD",
    role: "DEVELOPER",
    _links: {
        self: {
            href: "https://api.eskiiimo.com/projects/1/apply/testApplicant2"
        }
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