import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
const axios = require("axios");

const useProjectCreateState = () => {
    const [project, setProject] = useState(projectDetail);
    const [img, setImg] = useState('');
    const fetchPostCreate = async (projectId) => {
        const res = await axios.get(`https://apis.tracker.delivery/carriers`);
        return res.data;
    };

    const inputProject = (e) => {
        const name = e.target.name;
        const targetValue = e.target.value;
        console.log(name)
        console.log(targetValue)

        setProject(value => {
            return {
                ...value,
                [name]: targetValue
            }
        });
    }
    const inputImg = (data) => {
        setImg(data);
    }

    const inputProjectMember = e => {
        const name = e.target.name;
        const memberValue = e.target.value;
        setProject(value => {
            return {
                ...value,
                needMember: {
                    ...value.needMember,
                    [name]: [memberValue]
                }
            }
        })
    }

    return [{ project, img }, { fetchPostCreate, inputProject, inputImg, inputProjectMember }]
}

const useProjectCreateEffect = (data, fulfilled, rejected, error, createProjectApi, project) => {

    useEffect(() => {
        if (fulfilled) {
            createProjectApi(project);
        }
    }, [fulfilled]);

    useEffect(() => {
        if (rejected) {
            alert('에러 발생');
            console.log(error);
        }
    }, [rejected]);
}


export { useProjectCreateState, useProjectCreateEffect };

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