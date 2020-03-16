import Amplify, { Auth } from "aws-amplify";
import aws_exports from "../aws-exports";

Amplify.configure(aws_exports);

export const userLoginRequest = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "LOADING_USER" });
      const res = await Auth.signIn(email, password);
      dispatch({ type: "GET_USER_DATA", userData: res.attributes });
    } catch (e) {
      dispatch({ type: "FAIL_LOGIN", error: e });
    }
  };
};

export function getCurrentUserSession() {
  return async (dispatch: any) => {
    try {
      const res = await Auth.currentSession()
      if (res.isValid()) {
        const idToken = res.getIdToken()
        dispatch({type: "GET_USER_DATA", userData: {
          sub: idToken.payload.sub,
          name: idToken.payload.name,
          email: idToken.payload.email
        }})
      }
    } catch (e) {
      console.log("auth check: ", e.message)
    }
  };
}

export function logout() {
  return async (dispatch: any) => {
    await Auth.signOut()
    dispatch({type: "USER_LOGOUT"})
  }
}