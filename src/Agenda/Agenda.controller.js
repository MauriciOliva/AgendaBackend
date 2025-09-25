import Agenda from './Agenda.model.js';

export const createAgenda = async (req, res) => {
    try {
        const agenda = req.body;
        const newAgenda = new Agenda(agenda);
        await newAgenda.save();
        res.status(201).send(
            {
                success: true,
                message: 'Agenda created successfully',
                data: newAgenda
            }
        );
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: 'Error creating agenda', 
            error: error.message 
        });
    }
};

export const getAgendas = async (req, res) => {
    try {
        const agendas = await Agenda.find();
        res.status(200).json({ 
            success: true,
            data: agendas 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error fetching agendas', 
            error: error.message 
        });
    }
};

/*FILTRO POR IMPORTANCIO DE VISITA*/
export const getAgendaFiltred = async (req, res) => {
    try {
        const importancia = req.params.importancia;
        const agendas = await Agenda.find({ importanciaVisita: importancia });
        res.status(200).json({ 
            success: true,
            data: agendas 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error fetching filtered agendas', 
            error: error.message 
        });
    }   
};

export const updateAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedAgenda = await Agenda.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedAgenda) {
            return res.status(404).json({ 
                success: false,
                message: 'Agenda not found' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Agenda updated successfully',
            data: updatedAgenda 
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: 'Error updating agenda', 
            error: error.message 
        });
    }
};
export const deleteAgenda = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAgenda = await Agenda.findByIdAndDelete(id);
        if (!deletedAgenda) {
            return res.status(404).json({ 
                success: false,
                message: 'Agenda not found' 
            });
        }
        res.status(200).json({
            success: true,
            message: 'Agenda deleted successfully',
            data: deletedAgenda 
        });
    }
    catch (error) {
        res.status(400).json({ 
            success: false,
            message: 'Error deleting agenda', 
            error: error.message 
        });
    }   
};

export const deleteExpiredVisits = async (req, res) => {
    try {
        const currentDate = new Date();
        
        // Eliminar agendas con fecha de visita anterior a la fecha actual
        const result = await Agenda.deleteMany({ 
            visita: { $lt: currentDate } 
        });
        
        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} expired visits`,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting expired visits',
            error: error.message
        });
    }
};
