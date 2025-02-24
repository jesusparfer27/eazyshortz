import mongoose from 'mongoose';
import { mongodbUri } from '../config/mongo.config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB conectado correctamente");
    } catch (error) {
        console.error("Error conectando a MongoDB: ", error);
        process.exit(1);
    }
};

// 📌 **Schema para URL Shortener**
const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i.test(v); // Validación de URL
            },
            message: props => `${props.value} no es una URL válida!`
        }
    },
    short_code: {
        type: String,
        required: true,
        unique: true, // 📌 **Evita códigos duplicados**
        minlength: 6,
        maxlength: 10
    },
    title: {
        type: String,
        default: "Sin título"
    },
    clicks: {
        type: Number,
        default: 0 // 📌 **Opción para contar visitas**
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false, // No es necesario porque ya tenemos `created_at`
    versionKey: false
});

const URL = mongoose.model('URL', urlSchema, 'shortened_urls');

export { connectDB, URL };
