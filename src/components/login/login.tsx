import { useMutation } from "react-query";
import { loginUserApi } from "../../libs/services/endpoints/operator";
import { useId, useRef, useState } from "react";
import { loginTypeRequest } from "../../types/reqTypes";
import { loginTypeResponse } from "../../types/respTypes";
import tokenService from "../../libs/services/tokenService";
import { useNavigate } from "react-router-dom";
import JButton from "../majors/buttons/Button";
import JInput from "../majors/input/Input";
import JForm from "../majors/form/Form";
import { errorType, msgType } from "../../types/defaultTypes";
import { messages } from "../../messages";
import { passwordChecker, userNameChecker } from "../../validator";
const Login = () => {
  const [loginData, setLoginData] = useState<loginTypeRequest>();
  const [userNameError, setUserNameError] = useState<errorType>({
    status: false,
  });
  const [passwordError, setPasswordError] = useState<errorType>({
    status: false,
  });

  const navigate = useNavigate();
  // const mutation = useMutation({
  //   mutationFn: (formData: loginTypeRequest) => {
  //     return loginUserApi(formData);
  //   },
  //   onSuccess: (data: loginTypeResponse) => {
  //     console.log("in success", data);
  //     if (data) {
  //       //save data received from backend contains access token and userId and userName
  //       if (data._accessToken) {
  //         tokenService.setUser(data);
  //         navigate("/", { replace: true });
  //       } else if (data.msg) {
  //         // userName or password is not correct
  //       }
  //     }
  //   },
  //   onError: (err) => {
  //     console.log(err, "ee");
  //     // show message to client user
  //   },
  // });
  const { mutate, isLoading, isError, error, isIdle, isSuccess } = useMutation(
    loginUserApi,
    {
      onSuccess: (data: loginTypeResponse) => {
        if (data) {
          //save data received from backend contains access token and userId and userName
          if (data._accessToken) {
            tokenService.setUser(data);
            navigate("/", { replace: true });
          } else if (data.msg) {
            // userName or password is not correct
          }
        }
      },
    }
  );

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let userName, password;
    if (loginData && loginData.userName && loginData.password) {
      userName = loginData.userName;
      password = loginData.password;

      const passwordCheck: boolean = passwordChecker(password);
      const userNameCheck: boolean = userNameChecker(userName);

      if (passwordCheck && userNameCheck) {
        // ok all things good and do login
        mutate(loginData);
      } else {
        if (!passwordCheck)
          setPasswordError({ message: messages.passwordError, status: true });
        if (!userNameCheck)
          setUserNameError({ message: messages.userNameError, status: true });
      }
    } else {
      if (!userName)
        setUserNameError({ message: messages.requiredField, status: true });
      if (!password)
        setPasswordError({ message: messages.requiredField, status: true });
    }
  };

  return (
    <main className="flex w-screen h-screen justify-center items-center bg-gradient-to-tr from-gray-100 to-blue-200 dark:bg-gray-900">
      <div className="w-full mx-5 md:mx-0 md:w-2/3 lg:w-1/3 flex flex-col bg-gray-50 border  shadow-lg shadow-gray-200 rounded-lg p-5">
        <h1 className="self-center">Login to dashboard</h1>
        <JForm
          error={{ status: error, message: "test error" }}
          className="gap-y-5 mt-6 flex flex-col"
        >
          <>
            <JInput
              autoFocus
              className="w-full"
              error={userNameError}
              uId={useId()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // check if error is enable then disable

                if (userNameError.status)
                  setUserNameError((preState) => {
                    let cp = { ...preState };
                    cp.status = false;
                    cp.message = "";
                    return cp;
                  });
                setLoginData((prevState) => {
                  // create a copy of state
                  let cp = { ...prevState };
                  cp.userName = e.target.value.trim().toLowerCase();
                  return cp;
                });
              }}
              type="text"
              value={loginData?.userName}
              required={true}
              placeholder={"username"}
            />

            <JInput
              className="w-full"
              error={passwordError}
              uId={useId()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                // check if error is enable then disable
                if (passwordError.status) {
                  setPasswordError((preState) => {
                    let cp = { ...preState };
                    cp.status = false;
                    cp.message = "";
                    return cp;
                  });
                }
                // create a copy of state
                setLoginData((prevState) => {
                  let cp = { ...prevState };
                  cp.password = e.target.value.trim();
                  return cp;
                });
              }}
              type="password"
              value={loginData?.password}
              required={true}
              placeholder={"password"}
            />

            <JButton
              disabled={isLoading}
              loading={isLoading}
              text={"login"}
              onClick={handleLogin}
            />
          </>
        </JForm>
      </div>
    </main>
  );
};

export default Login;
