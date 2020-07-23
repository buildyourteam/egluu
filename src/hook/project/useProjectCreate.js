import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
const axios = require("axios");

const useProjectCreateState = () => {
    const [project, setProject] = useState(projectDetail);
    const [img, setImg] = useState('');
    const fetchPostCreate = async (data) => {
        const token = window.sessionStorage.getItem("accessToken");
        console.log(token)
        const res = await axios.post(`http://34.105.29.115:8080/projects`, data, {
            headers: {
                'authtoken': token,
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/hal+json'
            }
        });
        return res.data;
    };

    const fetchImg = async (projectId, data) => {
        const token = window.sessionStorage.getItem("accessToken");
        headers = {
            'Content-Type': 'multipart/form-data;charset=UTF-8',
            'Accept': 'application/hal+json',
            'authtoken': token
        }
        files = {
            'image': data,
        }

        const res = await axios.post(`http://34.105.29.115:8080/projects/image/${projectId}`, {
            headers: headers
        }, files);
        return res.data;
    }

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

    return [{ project, img }, { fetchPostCreate, inputProject, inputImg, inputProjectMember, fetchImg }]
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
    projectName: "",
    teamName: "",
    endDate: "2020-04-30T23:59:00",
    description: "",
    status: null,
    projectField: "",
    applyCanFile: true,
    questions: ['123', '234'],
    needMember: {
        developer: 0,
        designer: 0,
        planner: 0,
        etc: 0
    },
    memberList: null
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