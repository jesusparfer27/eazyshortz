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
                return /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i.test(v);
            },
            message: props => `${props.value} no es una URL válida!`
        }
    },
    short_code: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 10,
        default: () => nanoid(7)  // ✅ Genera un código aleatorio de 7 caracteres
    },
    title: {
        type: String,
        default: "Sin título"
    },
    clicks: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false,
    versionKey: false
});

const URL = mongoose.model('URL', urlSchema, 'links');

export { connectDB, URL };