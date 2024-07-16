import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { userInfo } = useSelector((state) => state.auth);;

    return (
        userInfo?.status === 'OK' ? <Outlet /> : <Navigate to="/" replace />
    )
}
export default RequireAuth