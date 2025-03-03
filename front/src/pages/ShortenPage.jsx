import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from "lucide-react"; // Ícono de carga opcional

export const ShortenPage = () => {
    const [url, setUrl] = useState("") // Estado para la URL ingresada
    const [title, setTitle] = useState("") // Estado para el título
    const [error, setError] = useState("") // Estado para errores
    const [shortUrl, setShortUrl] = useState("") // URL acortada
    const [loading, setLoading] = useState(false) // Estado de carga

    const VITE_FULL_HOST = import.meta.env.VITE_FULL_HOST
    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

    const validateUrl = (url) => {
        const urlPattern = new RegExp(
            "^(https?:\\/\\/)?" + 
            "((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|" + 
            "localhost|" +
            "(([0-9]{1,3}\\.){3}[0-9]{1,3}))" + 
            "(\\:[0-9]{1,5})?" + 
            "(\\/.*)?$", "i"
        );
        return urlPattern.test(url);
    }

    const shortUrlHandler = async () => {
        if (!url.trim()) {  
            setError("Please enter a valid URL.");
            return;
        }
    
        if (!validateUrl(url)) {
            setError("Invalid URL format.");
            return;
        }
    
        setError("");
        setLoading(true);
    
        try {
            const response = await fetch(`${VITE_FULL_HOST}/shorten`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    original_url: url, 
                    title: title || "Custom Title"
                }),
            });
    
            const data = await response.json();
            console.log("Server response:", data); // 🔍 Para verificar qué responde el servidor
    
            if (response.ok) {
                // 🔥 Construimos la URL corta usando el short_code
                const baseShortUrl = `${VITE_BASE_URL}`;
                setShortUrl(`${baseShortUrl}${data.short_code}`);
    
                setUrl("");
                setTitle("");
            } else {
                setError(data.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error shortening URL:", error);
            setError("Failed to shorten the URL.");
        }
    
        setLoading(false);
    };
    

    // 🔥 Nueva función para limpiar los inputs y estados
    // const handleClear = () => {
    //     setUrl(""); 
    //     setTitle(""); 
    //     setError(""); 
    //     setShortUrl(""); 
    // };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen px-4">
            <Card className="w-full max-w-xs md:max-w-md lg:max-w-lg bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                        Shorten URL
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                        Insert the long URL and a title below
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                    <Input 
                        placeholder="Enter a title..." 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} 
                        dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white 
                        bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500`}
                    />

                    <Input 
                        placeholder="Enter your URL..." 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} 
                        dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white 
                        bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500`}
                    />
                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    {shortUrl && (
                        <p className="text-green-500 text-sm">
                            Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">{shortUrl}</a>
                        </p>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col md:flex-row md:justify-between items-center mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Example: https://google.com
                    </p>

                    {/* ✅ Botón "Clear" corregido */}
                    {/* <Button 
                        onClick={handleClear} 
                        disabled={loading} 
                        className="mt-3 md:mt-0 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-all"
                    >
                        Clear
                    </Button> */}

                    <Button 
                        onClick={shortUrlHandler} 
                        disabled={loading} 
                        className="mt-3 md:mt-0 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Shorten"}
                    </Button>
                </CardFooter>
            </Card>
        </section>
    )
}
