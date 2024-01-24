import { client } from "@/lib/apollo-wrapper";
import { logoutUser, setLoading } from "@/store/reducers/userSlice";
import { AppThunk } from "@/store/store";
import { deleteCookie } from "cookies-next";
import { USER_LOGOUT } from "./queries/auth-queries";

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(logoutUser());
    client().mutate({ mutation: USER_LOGOUT });
    deleteCookie("access_token");
    deleteCookie("refresh_token");
  } catch (err) {
    console.error(`Error logout: ${err}`);
  } finally {
    dispatch(setLoading(false));
  }
};
