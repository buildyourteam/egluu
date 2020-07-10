import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTemporary } from "../../reducers/temporary";
const axios = require("axios");

export function useProjectListState(data, fulfilled, pending, rejected, error, getApi) {
    const [projectList, setProjectList] = useState(staticProjectData);

    useEffect(() => {
        // if (fulfilled) setProjectList(data);
        if (fulfilled) setProjectList(staticProjectData);// 임시데이터 
    }, [fulfilled]);

    useEffect(() => {
        getApi();
    }, []);

    useEffect(() => {
        if (rejected) {
            if (error) {
                alert(error);
                console.log(error)
            }
        }
    }, [rejected]);

    const listRefresh = () => {
        getApi();
    };

    return [projectList, { listRefresh }];
}

export function useProjectSaveEffect(data, fulfilled, rejected, error, posApi) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (fulfilled) {
            alert('전송 성공!');
            dispatch(setTemporary(data));
        }
    }, [fulfilled]);

    useEffect(() => {
        if (rejected) {
            if (error) {
                alert(error.response);
                console.log(error)
            }
        }
    }, [rejected])
}


const staticProjectData = [
    {
        projectId: 16,
        projectName: "project0",
        teamName: "project team0",
        endDate: "2020-03-30T23:59:00",
        description: "need zero 입니다.",
        dday: 5,
        status: "RECRUTING",
        projectField: null,
        currentMember: {
            developer: 2,
            designer: 1,
            planner: 1,
            etc: 2
        },
        needMember: {
            developer: 2,
            designer: 2,
            planner: 3,
            etc: 4
        },
        leaderId: null
    },
    {
        projectId: 16,
        projectName: "project0",
        teamName: "project team0",
        endDate: "2020-03-30T23:59:00",
        description: "need zero 입니다.",
        dday: 5,
        status: "RECRUTING",
        projectField: null,
        currentMember: {
            developer: 2,
            designer: 1,
            planner: 1,
            etc: 2
        },
        needMember: {
            developer: 2,
            designer: 2,
            planner: 3,
            etc: 4
        },
        leaderId: null
    },
    {
        projectId: 16,
        projectName: "project0",
        teamName: "project team0",
        endDate: "2020-03-30T23:59:00",
        description: "need zero 입니다.",
        dday: 5,
        status: "RECRUTING",
        projectField: null,
        currentMember: {
            developer: 2,
            designer: 1,
            planner: 1,
            etc: 2
        },
        needMember: {
            developer: 2,
            designer: 2,
            planner: 3,
            etc: 4
        },
        leaderId: null
    },
    {
        projectId: 16,
        projectName: "project0",
        teamName: "project team0",
        endDate: "2020-03-30T23:59:00",
        description: "need zero 입니다.",
        dday: 5,
        status: "RECRUTING",
        projectField: null,
        currentMember: {
            developer: 2,
            designer: 1,
            planner: 1,
            etc: 2
        },
        needMember: {
            developer: 2,
            designer: 2,
            planner: 3,
            etc: 4
        },
        leaderId: null
    }
];


const staticPeopleData = [
    {
        userId: "testUser1",
        userName: "User1",
        stacks: ["SPRINGBOOT", "ReactJS"],
        area: "Seoul",
        level: 1,
        _links: {
            self: {
                href: "/profile/testUser1"
            },
            profileImage: {
                href: "https://api.eskiiimo.com/profile/image/testUser1"
            }
        }
    },
    {
        userId: "testUser4",
        userName: "User4",
        stacks: ["SPRINGBOOT"],
        area: "Seoul",
        level: 1,
        _links: {
            self: {
                href: "/profile/testUser4"
            },
            profileImage: {
                href: "https://api.eskiiimo.com/profile/image/testUser4"
            }
        }
    },
    {
        userId: "testUser7",
        userName: "User7",
        stacks: ["SPRINGBOOT"],
        area: "Seoul",
        level: 6,
        _links: {
            self: {
                href: "/profile/testUser7"
            },
            profileImage: {
                href: "https://api.eskiiimo.com/profile/image/testUser7"
            }
        }
    },
    {
        userId: "testUser7",
        userName: "User7",
        stacks: ["SPRINGBOOT"],
        area: "Seoul",
        level: 1,
        _links: {
            self: {
                href: "/profile/testUser7"
            },
            profileImage: {
                href: "https://api.eskiiimo.com/profile/image/testUser7"
            }
        }
    },
    {
        userId: "testUser7",
        userName: "User7",
        stacks: ["SPRINGBOOT"],
        area: "Seoul",
        level: 1,
        _links: {
            self: {
                href: "/profile/testUser7"
            },
            profileImage: {
                href: "https://api.eskiiimo.com/profile/image/testUser7"
            }
        }
    },
    {
        userId: "testUser7",
        userName: "User7",
        stacks: ["SPRINGBOOT"],
        area: "Seoul",
        level: 1,
        _links: {
            self: {
                href: "/profile/testUser7"
            },
            profileImage: {
                href: "https://api.eskiiimo.com/profile/image/testUser7"
            }
        }
    }
];
