import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const RedirectPage = () => {
    const { short_code } = useParams(); // Captura el código de la URL
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const VITE_REDIRECTION = import.meta.env.VITE_REDIRECTION


    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                console.log(`Fetching from: ${VITE_REDIRECTION}/${short_code}`); // <-- Verificar URL
                
                const response = await fetch(`${VITE_REDIRECTION}/${short_code}`);
                const data = await response.json();
    
                console.log("Response Data:", data); // <-- Verificar datos recibidos
    
                if (response.ok && data.original_url) {
                    window.location.href = data.original_url;
                } else {
                    setError("Shortened URL not found.");
                }
            } catch (err) {
                setError("An error occurred while fetching the URL.");
            }
            setLoading(false);
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
