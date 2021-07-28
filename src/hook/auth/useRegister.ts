import { useEffect, useState } from "react";
import { useAlert, useMove } from "..";
import { useRequest } from "../";
import { registerApi } from "../api";

type registerType = {
  userId: string;
  userEmail: string;
  name: string;
  password: string;
};

type RegisterType = {
  loading: boolean;
  register: registerType;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useRegisterEffect(): RegisterType {
  const { alertAction } = useAlert();
  const [registerPromiseState, { run: postRegisterFetch }] = useRequest(
    registerApi().postRegister,
  );
    const [register, setRegister] = useState<registerType>({
      userId: "",
      userEmail: '',
      name: '',
      password: ''
    });

  const onFinish = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Success:", register);
    postRegisterFetch(register);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setRegister((value) => {
      return {
        ...value,
        [e.target.name]: e.target.value,
      };
    });
  };

  useMove(registerPromiseState.fulfilled, "login");

  useEffect(() => {
    if (registerPromiseState.fulfilled) {
      alertAction.open("회원가입을 무사히 마쳤습니다. 로그인 부탁드립니다.");
    }
  }, [registerPromiseState.fulfilled]);

  useEffect(() => {
    if (registerPromiseState.rejected) {
      if (registerPromiseState.error) {
        alertAction.open(registerPromiseState.error.response.data.message);
      }
    }
  }, [registerPromiseState.rejected]);

  return {
    loading: registerPromiseState.pending,
    register,
    onFinish,
    onFinishFailed,
    handleInput,
  };
}
