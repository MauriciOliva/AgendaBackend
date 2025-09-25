import { Router } from "express";
import { getAgendas, createAgenda, getAgendaFiltred, updateAgenda, deleteAgenda, deleteExpiredVisits } from "./Agenda.controller.js";

const router = Router();

router.post('/create', createAgenda);
router.get('/', getAgendas);
router.get('/filtro/:importancia', getAgendaFiltred);
router.put('/update/:id', updateAgenda);
router.delete('/delete/:id', deleteAgenda);
router.delete('/delete-expired', deleteExpiredVisits);

export default router;