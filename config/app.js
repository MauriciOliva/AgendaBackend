'use strict'

import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import agendaRoutes from "../src/Agenda/Agenda.routes.js"
import rutasHealth from "../src/Agenda/rutas.healt.js"
import { scheduleCleanup } from "../src/Agenda/AutoDelete.js"
import { limiter } from "../middleware/rate.limit.js"
import { createDefaultUser } from "../src/Auth/auth.controller.js"
import AuthRouter from "../src/Auth/auth.routes.js"

const config = (app) => {
    const corsOptions = {
        origin: [
            'https://agenda-six-ecru.vercel.app',  // Tu frontend CORRECTO
            'https://agenda-backend-silk.vercel.app', 
            'http://localhost:5173'              
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true,
        optionsSuccessStatus: 200
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(limiter);
}

const routes = (app) => {
    app.use('/api/v1/agenda', agendaRoutes);
    app.use('/health', rutasHealth);
    app.use('/api/v1/auth', AuthRouter);
    
    // Ruta de prueba para verificar que el servidor funciona
    app.get('/api/test', (req, res) => {
        res.json({ 
            message: 'Servidor funcionando correctamente',
            timestamp: new Date().toISOString()
        });
    });
}

export const initServer = async() => {
    const app = express();
    try {
        config(app);
        routes(app);
        scheduleCleanup(); 
        await createDefaultUser();
        app.listen(process.env.PORT);
        console.log(`🚀 Server listening on port ${process.env.PORT}`);
    } catch (error) {
        console.log('❌ Server error: ', error);
    }
}