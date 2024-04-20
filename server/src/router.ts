import express from 'express';
export const router = express.Router();

router.get('/employees');
router.post('/employees');
router.put('/employees/:id/');
router.delete('/employees/:id/');
