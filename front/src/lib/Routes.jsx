// routes.js

import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import { ErrorPage } from "@/pages/ErrorPage";
import { ShortenPage } from "@/pages/ShortenPage";
import { RedirectPage } from "@/pages/RedirectPage";

// Crear las rutas
const router = createBrowserRouter([
    {
        path: '/', // Ruta raíz que carga la aplicación principal
        element: <App />,
        errorElement: <ErrorPage />, // Página de error por defecto
        children: [
            { index: true, element: <ShortenPage /> }, // Página principal
            { path: '/:short_code', element:<RedirectPage /> }, // Página de productos
        ]
    }
]);

export default router;
