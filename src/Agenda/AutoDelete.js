import Agenda from './Agenda.model.js';
import cron from 'node-cron';

export const deleteExpiredAgendas = async () => {
    try {
        const currentDate = new Date();
        const result = await Agenda.deleteMany({ 
            visita: { $lt: currentDate } 
        });
        console.log(`Deleted ${result.deletedCount} expired visits`);
        return result;
    } catch (error) {
        console.error('Error deleting expired visits:', error);
        throw error;
    }
};

export const scheduleCleanup = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running daily cleanup of expired visits...');
        await deleteExpiredAgendas();
    });
    console.log('Scheduled cleanup task: daily at midnight');
};