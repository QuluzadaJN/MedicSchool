import { useDispatch, useSelector } from "react-redux";
import {useLogoutMutation} from "../../api/usersApiSlice";
import {logOut} from "../../store/authSlice";
import { toast } from "react-toastify";

export const useLogout = () => {
    const dispatch = useDispatch();
    const { userInfo1 } = useSelector((state) => state.auth);
    debugger
    const [logOutToApi] = useLogoutMutation();
    const logoutHandler = async () => {
        // console.log(userInfo1);
        try {
            const resp = await logOutToApi(userInfo1.body.email).unwrap();
            // const resp = await logOutToApi(useSelector((state) => state.auth.userInfo1).body.email).unwrap();
            if (resp.status === "OK") {
                dispatch(logOut());
                toast.success(resp.body);
                window.location.reload();
            } else {
                toast.error(resp.body);
            }
        } catch (err) {
            toast.error(err.data?.message || err.error || "Çıxışda xəta baş verdi");
        }
    };
    return logoutHandler;
};

// export default useLogout;
