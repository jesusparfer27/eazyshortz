// 📌 **Redirigir a la URL original**
export const redirectURL = async (req, res) => {
    try {
        const { short_code } = req.params;

        const urlDoc = await URL.findOne({ short_code });

        if (!urlDoc) {
            return res.status(404).json({ error: "URL no encontrada" });
        }

        // 📌 Incrementar contador de clics
        urlDoc.clicks += 1;
        await urlDoc.save();

        res.redirect(urlDoc.original_url);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};