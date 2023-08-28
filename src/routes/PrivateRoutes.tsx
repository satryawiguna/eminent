import AdminLayout from "../components/layouts/AdminLayout";
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {fetchAuth} from "../store/reducers/authSlice";
import {useSelector} from "react-redux";

const PrivateRoutes = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const token = queryParams.get('token')

    const {isLogged} = useSelector(fetchAuth)

    return isLogged ? (
        <AdminLayout>
            <Outlet/>
        </AdminLayout>
    ) : (
        <Navigate
            to={{
                pathname: `/login`,
                search: token ? `?token=${token}` : ``
            }}
            replace
        />
    )
}

export default PrivateRoutes
