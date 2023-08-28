import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import Head from "./components/Head";
import EVSPageLoader from "./components/EVSPageLoader";
import LoadingBar, {LoadingBarRef} from "react-top-loading-bar";
import {Navigate, Route, Routes} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {lazy, Suspense, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {fetchGlobal} from "./store/reducers/globalSlice";
import {ToastContainer} from "react-toastify";

const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const EditProfilePage = lazy(() => import("./pages/admin/user/EditProfilePage"));
const NotFoundPage = lazy(() => import("./pages/404"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const UserRoutes = lazy(() => import("./routes/UserRoutes"));
const RoleRoutes = lazy(() => import("./routes/RoleRoutes"));

const App = () => {
    const {isLoading, lang} = useSelector(fetchGlobal);

    const inputRef = useRef<LoadingBarRef>(null)
    const {t, i18n} = useTranslation()

    useEffect(() => {
        if (isLoading) {
            inputRef.current?.continuousStart()
        } else {
            inputRef.current?.complete()
        }

    }, [isLoading])

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, []);

    return (
        <>
            <LoadingBar color='#f11946' ref={inputRef}/>
            <ToastContainer/>
            <Suspense fallback={<EVSPageLoader/>}>
                <Head t={t}/>
                <Routes>
                    <Route element={<PublicRoutes/>}>
                        <Route path="/" element={<Navigate to='/login'/>}/>
                        <Route path="/login" element={<LoginPage t={t}/>}/>
                        <Route path="/forgot-password" element={<ForgotPasswordPage t={t}/>}/>
                        <Route path="/change-password" element={<ChangePasswordPage t={t}/>}/>
                        <Route path="*" element={<Navigate to='/404'/>}/>
                    </Route>
                    <Route element={<PrivateRoutes/>}>
                        <Route>
                            <Route path="/admin/" element={<Navigate to='/admin/dashboard'/>}/>
                            <Route path="/admin/dashboard" element={<DashboardPage t={t}/>}/>

                            <Route path="/admin/edit-profile" element={<EditProfilePage t={t}/>}/>
                            <Route path="/admin/user/*" element={<UserRoutes t={t}/>}/>
                            <Route path="/admin/role/*" element={<RoleRoutes t={t}/>}/>

                            <Route path="/admin/*" element={<Navigate to='/404'/>}/>
                        </Route>
                    </Route>
                    <Route path="/404" element={<NotFoundPage t={t}/>}/>
                </Routes>
            </Suspense>
        </>
    )
}

export default App
