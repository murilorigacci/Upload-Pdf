import express from 'express'
import * as controller from '../controllers/pdfController.js'

const router = express.Router();

router.get('/:id/pdf', controller.relatorioPorId);
router.get('/pdf', controller.relatorioTodos);

export default router;
