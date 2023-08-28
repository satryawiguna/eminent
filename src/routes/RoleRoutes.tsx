import {Route, Routes} from 'react-router-dom';
import RoleListPage from "../pages/admin/role/RoleListPage";
import AddRolePage from "../pages/admin/role/AddRolePage";
import EditRolePage from "../pages/admin/role/EditRolePage";
import {FC} from "react";

type RoleRoutePropType = {
    t: (key: any) => any
}

const RoleRoutes: FC<RoleRoutePropType> = ({t}) => {
    return (
        <Routes>
            <Route index path="/" element={<RoleListPage t={t}/>}/>
            <Route path="/add/" element={<AddRolePage t={t}/>}/>
            <Route path="/:id/edit/" element={<EditRolePage t={t}/>}/>
        </Routes>
    )
}

export default RoleRoutes
