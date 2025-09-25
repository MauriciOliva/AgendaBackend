// app.js - VERSIÓN CORREGIDA
'use strict'

import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import agendaRoutes from "../src/Agenda/Agenda.routes.js"
import rutasHealth from "../src/Agenda/rutas.healt.js"
import { scheduleCleanup } from "../src/Agenda/AutoDelete.js"

const config = (app) => {
    // ✅ CONFIGURACIÓN CORRECTA DE CORS
    const corsOptions = {
        origin: [
            'https://seguimiento-cia.vercel.app', 
            'http://seguimiento-cia-back.vercel.app',
            'http://localhost:5173',              
            'http://localhost:3605'               
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
}

const routes = (app) => {
    app.use('/api/v1/agenda', agendaRoutes);
    app.use('/health', rutasHealth);
    
    // ✅ Ruta de prueba para verificar CORS
    app.get('/api/test-cors', (req, res) => {
        res.json({ 
            message: 'CORS funciona correctamente', 
            timestamp: new Date(),
            allowedOrigins: [
                'https://seguimiento-cia.vercel.app',
                'http://seguimiento-cia-back.vercel.app',
                'http://localhost:5173',
                'http://localhost:3000'
            ]
        });
    });
}

export const initServer = () => {
    const app = express();
    try {
        config(app);
        routes(app);
        scheduleCleanup(); 
        app.listen(process.env.PORT);
        console.log(`Server listening on port ${process.env.PORT}`);
    } catch (error) {
        console.log('server error: ', error);
    }
}