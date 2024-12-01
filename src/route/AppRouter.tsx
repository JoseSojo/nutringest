import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ModalProvider } from "../_context/ModalContext";
import Login from "../app/Login";
import Register from "../app/Register";
import ProtectRoute from "./ProtectRoute";
import Dashboard from "../app/Dashboard";
import NotProtectRoute from "./NotProtectRoute";
import DashboardTemplate from "../UI/_template/DashboardTemplate";
import ProfilePage from "../app/profile/ProfilePage";
import PublicPage from "../app/public/PublicPage";
import AbstractCrud from "../app/dashboard/abstract/AbstractCrud";
import AbstractUnique from "../app/dashboard/abstract/AbstractUnique";
import CreateExchange from "../app/dashboard/manual/Exchange/CreateExchange";
import UpdateExchange from "../app/dashboard/manual/Exchange/UpdateExchange";
import CreateMenu from "../app/dashboard/manual/Menu/CreateMenu";
import UpdateMenu from "../app/dashboard/manual/Menu/UpdateMenu";
// import UpdateMenu from "../app/dashboard/manual/Menu/UpdateMenu";

const router = createBrowserRouter([
    {
        path: `/`,
        element: <PublicPage />
    }, {
        path: ``,
        element: <NotProtectRoute />,
        children: [
            {
                path: `/login`,
                element: <Login />
            }, {
                path: `/register`,
                element: <Register />
            }
        ]
    }, {
        path: `/`,
        element: <ProtectRoute />,
        children: [
            {
                path: `/profile`,
                element: <DashboardTemplate><ProfilePage /></DashboardTemplate>
            },
            {
                path: `/dashboard`,
                element: <DashboardTemplate><Dashboard /></DashboardTemplate>
            },
            {
                path: `/dashboard/:crud`,
                element: <DashboardTemplate><AbstractCrud /></DashboardTemplate>
            },
            {
                path: `/dashboard/:crud/unique/:id`,
                element: <DashboardTemplate><AbstractUnique /></DashboardTemplate>
            },
            // MANUALES
            {
                path: `/dashboard/exchange/create`,
                element: <DashboardTemplate><CreateExchange /></DashboardTemplate>
            },
            {
                path: `/dashboard/exchange/update/:id`,
                element: <DashboardTemplate><UpdateExchange /></DashboardTemplate>
            },
            {
                path: `/dashboard/menu/create`,
                element: <DashboardTemplate><CreateMenu /></DashboardTemplate>
            },
            {
                path: `/dashboard/menu/update/:id`,
                element: <DashboardTemplate><UpdateMenu /></DashboardTemplate>
            }
        ]
    }
]);

export default function AppRouter () {

    // const modal = useModal();

    return (
        <>
            <ModalProvider>
                <RouterProvider router={router} />
            </ModalProvider>
        </>
    )
}
