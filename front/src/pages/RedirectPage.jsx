import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const RedirectPage = () => {
    const { short_code } = useParams(); // Captura el código de la URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const VITE_REDIRECTION = import.meta.env.VITE_REDIRECTION; // Asegúrate de que esta variable está bien configurada

    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const response = await fetch(`${VITE_REDIRECTION}/short/${short_code}`);
                
                if (!response.ok) {
                    throw new Error("Shortened URL not found.");
                }

                const data = await response.json();
                console.log("Response Data:", data); // Verifica los datos que recibes
                
                // Aquí se agrega un log adicional para verificar la URL original
                console.log("Original URL:", data.original_url); 

                if (data.original_url) {
                    // Si la URL original está disponible, redirige con window.location.href
                    window.location.href = data.original_url;
                } else {
                    setError("Shortened URL not found.");
                }
            } catch (err) {
                console.error("Error:", err);
                setError("An error occurred while fetching the URL.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchOriginalUrl();
    }, [short_code]);

    return ( 
        <div className="flex flex-col items-center justify-center h-screen text-center">
            {loading ? (
                <p className="text-lg font-semibold">Redirecting...</p>
            ) : error ? ( 
                <p className="text-red-500">{error}</p>
            ) : null}
        </div>
    );
};
