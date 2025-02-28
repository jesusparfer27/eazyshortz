import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import { ErrorPage } from "@/pages/ErrorPage";
import { ShortenPage } from "@/pages/ShortenPage";
import { RedirectPage } from "@/pages/RedirectPage";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <ShortenPage /> }
        ]
    },
    { path: '/:short_code', element: <RedirectPage /> } // Ahora está al mismo nivel que "/"
]);

export default router;
