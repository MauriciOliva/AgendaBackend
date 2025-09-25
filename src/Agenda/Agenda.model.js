import { Schema , model } from 'mongoose';

const agendaSchema = new Schema(
    {
        nombreEmpresa: { 
            type: String, 
            required: true 
        },
        contactoEmpresa: { 
            type: String, 
            required: true 
        },
        telefonoEmpresa: { 
            type: String, 
            required: true 
        },
        correoEmpresa: { 
            type: String, 
            required: true 
        },
        dedicacionEmpresa: { 
            type: String, 
            required: true 
        },
        sistemaManjado: { 
            type: String, 
            required: true 
        },
        tamañoEmpresa: { 
            type: String, 
            required: true , 
            enum:['Pequeña', 'Mediana', 'Grande']
        },
        desafiosEmpresa: { 
            type: String, 
            required: true
        },
        puntosCriticos: { 
            type: String, 
            required: true
        },
        objetivosEmpresa: { 
            type: String, 
            required: true
        },
        comportamientoCompra: { 
            type: String, 
            required: true
        },
        visita: { 
            type: Date, 
            required: true,
            default: Date.now
        },
        importanciaVisita: { 
            type: String, 
            required: true ,
            enum:['Alta', 'Media', 'Baja']
        },
        proximaVisita: {
            type: Date,
            required: false
        },
        notificaciones: {
            enviada3DiasAntes: { type: Boolean, default: false },
            enviada1DiaAntes: { type: Boolean, default: false },
            enviadaDiaMismo: { type: Boolean, default: false }
        },  
        estado: { 
            type: [String], 
            required: true ,
            enum:['Acepto visita','Reagendar Visita','Volver a llamar','Enviar Correo','Cliente Interesado','Fecha de seguimiento','Cotizacion Enviada','Cierre de Venta'],
        }
    }, 
    { 
        timestamps: true 
    }
);

export default model('Agenda', agendaSchema);