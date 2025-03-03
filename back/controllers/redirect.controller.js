export const redirectURL = async (req, res) => {
    try {
        const { short_code } = req.params;
        console.log("Short code recibido:", short_code); // <-- Verifica si llega el short_code

        const urlDoc = await URL.findOne({ short_code });
        if (!urlDoc) {
            console.log("No se encontró la URL"); 
            return res.status(404).json({ error: "URL no encontrada" });
        }

        console.log("Redirigiendo a:", urlDoc.original_url);
        res.json({ original_url: urlDoc.original_url });

    } catch (error) {
        console.error("Error en el backend:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};
