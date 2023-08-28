import AuthLayout from "../components/layouts/AuthLayout";
import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";
import {fetchAuth} from "../store/reducers/authSlice";

const PublicRoutes = () => {
    const {isLogged} = useSelector(fetchAuth)

    return !isLogged ? (
        <AuthLayout>
            <Outlet/>
        </AuthLayout>
    ) : (
        <Navigate
            to={{
                pathname: '/admin/dashboard'
            }}
            replace
        />
    )
}

export default PublicRoutes
