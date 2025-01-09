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
import CreatePatient from "../UI/_organism/Form/CreatePatient";
import UpdatePatient from "../UI/_organism/Form/UpdatePatient";
import UniqueMenu from "../app/dashboard/manual/Menu/UniqueMenu";
import UniqueExchange from "../app/dashboard/manual/Exchange/UniqueExchange";
import SubscriptionUnique from "../app/dashboard/manual/Subscription/SubscriptionUnique";
import QuoteCreate from "../app/dashboard/manual/Quote/QuoteCreate";
import QuoteFicha from "../app/dashboard/manual/Quote/QuoteFicha";
import CustomDashboardTemplate from "../UI/_template/CustomDashboardTemplate";
import CalendarPage from "../app/Calendar";
import Porfolio from "../UI/_organism/Porfolio/Porfolio";
import Setting from "../UI/_organism/Settings/Settings";
import Finanzas from "../app/Finanzas";
import FichaPaciente from "../UI/_organism/FichaPaciente";
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
                path: `/porfolio`,
                element: <DashboardTemplate><Porfolio /></DashboardTemplate>
            },
            {
                path: `/setting`,
                element: <DashboardTemplate><Setting /></DashboardTemplate>
            },
            {
                path: `/calendar`,
                element: <CustomDashboardTemplate><CalendarPage /></CustomDashboardTemplate>
            },
            {
                path: `/finanzas`,
                element: <CustomDashboardTemplate><Finanzas /></CustomDashboardTemplate>
            },
            {
                path: `/dashboard`,
                element: <CustomDashboardTemplate><Dashboard /></CustomDashboardTemplate>
            },

            // MANUALES
            {
                path: `/dashboard/patient/create`,
                element: <DashboardTemplate><CreatePatient /></DashboardTemplate>
            },
            {
                path: `/dashboard/patient/unique/:id`,
                element: <CustomDashboardTemplate><FichaPaciente /></CustomDashboardTemplate>
            },
            {
                path: `/dashboard/quote/create`,
                element: <DashboardTemplate><QuoteCreate /></DashboardTemplate>
            },
            {
                path: `/dashboard/subscription/unique/:id`,
                element: <DashboardTemplate><SubscriptionUnique /></DashboardTemplate>
            },
            {
                path: `/dashboard/quote/unique/:id`,
                element: <DashboardTemplate><QuoteFicha /></DashboardTemplate>
            },
            {
                path: `/dashboard/exchange/create`,
                element: <DashboardTemplate><CreateExchange /></DashboardTemplate>
            },
            {
                path: `/dashboard/exchange/update/:id`,
                element: <DashboardTemplate><UpdateExchange /></DashboardTemplate>
            },
            {
                path: `/dashboard/exchange/unique/:id`,
                element: <DashboardTemplate><UniqueExchange /></DashboardTemplate>
            },
            {
                path: `/dashboard/menu/create`,
                element: <DashboardTemplate><CreateMenu /></DashboardTemplate>
            },
            {
                path: `/dashboard/menu/update/:id`,
                element: <DashboardTemplate><UpdateMenu /></DashboardTemplate>
            },
            {
                path: `/dashboard/menu/unique/:id`,
                element: <DashboardTemplate><UniqueMenu /></DashboardTemplate>
            },

            // ABSTRACTS
            {
                path: `/dashboard/patient/update/:id`,
                element: <DashboardTemplate><UpdatePatient /></DashboardTemplate>
            },
            {
                path: `/dashboard/:crud`,
                element: <DashboardTemplate><AbstractCrud /></DashboardTemplate>
            },
            {
                path: `/dashboard/:crud/unique/:id`,
                element: <DashboardTemplate><AbstractUnique /></DashboardTemplate>
            },
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
