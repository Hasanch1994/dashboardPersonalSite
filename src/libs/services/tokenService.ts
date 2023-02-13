import { loginTypeResponse } from "../../types/respTypes";

class TokenService {
  //   getLocalRefreshToken() {
  //     const user = JSON.parse(localStorage.getItem("user")!);
  //     return user?.refreshToken;
  //   }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user?._accessToken;
  }

  updateLocalAccessToken(token: string) {
    let user = JSON.parse(localStorage.getItem("user")!);
    user._accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user")!);
  }

  setUser(user: loginTypeResponse) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
