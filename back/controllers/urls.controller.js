import { URL } from "../db/mongodb.js";
import { nanoid } from "nanoid";

// 📌 **Crear una URL corta**
export const shortenURL = async (req, res) => {
    try {
        const { original_url, title } = req.body;

        if (!original_url) {
            return res.status(400).json({ error: "La URL original es requerida" });
        }

        // 📌 Generar un short_code único
        let short_code;
        let exists = true;
        while (exists) {
            short_code = nanoid(6); // Genera un código de 6 caracteres
            exists = await URL.findOne({ short_code });
        }

        // 📌 Guardar en MongoDB
        const newURL = new URL({
            original_url,
            short_code,
            title: title || "Sin título"
        });

        await newURL.save();

        res.status(201).json({
            message: "URL acortada con éxito",
            short_url: `${process.env.BASE_URL}/${short_code}`,
            short_code
        });

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

// 📌 **Obtener todas las URLs**
export const getAllURLs = async (req, res) => {
    try {
        const urls = await URL.find();
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};
