import {Route, Routes} from 'react-router-dom';
import UserListPage from "../pages/admin/user/UserListPage";
import AddUserPage from "../pages/admin/user/AddUserPage";
import EditUserPage from "../pages/admin/user/EditUserPage";
import {FC} from "react";

type UserRoutePropType = {
    t: (key: any) => any
}

const UserRoutes: FC<UserRoutePropType> = ({t}) => {
    return (
        <Routes>
            <Route index path="/" element={<UserListPage t={t}/>}/>
            <Route path="/add/" element={<AddUserPage t={t}/>}/>
            <Route path="/:userId/edit/" element={<EditUserPage t={t}/>}/>
        </Routes>
    )
}

export default UserRoutes
