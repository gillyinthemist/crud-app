import express from 'express';
import { createEmployee, getEmployees } from './controllers/controllers';
export const router = express.Router();

router.post('/employees', createEmployee);
router.get('/employees', getEmployees);
// router.put('/employees/:id', updateEmployee);
// router.delete('/employees/:id', deleteEmployee);
