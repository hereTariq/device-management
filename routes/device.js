import { Router } from 'express';
import { getSingleDevice, getDevices, registerDevice, updateDevice, deleteDevice, heartbeat } from '../controllers/devices.js';
import validate from '../middlewares/validate.js';
import { deviceValidation, logValidation } from '../validations/validation.js';
import { createLogEntry, fetchLatestLogs, getLast24HoursLogs } from '../controllers/logs.js';

const deviceRoutes = Router();

deviceRoutes.post('/', validate(deviceValidation), registerDevice);
deviceRoutes.get('/', getDevices);
deviceRoutes.get('/:id', getSingleDevice);
deviceRoutes.patch('/:id', updateDevice);
deviceRoutes.delete('/:id', deleteDevice);
deviceRoutes.post('/:id/heartbeat', heartbeat);
deviceRoutes.post('/:id/logs', validate(logValidation), createLogEntry);
deviceRoutes.get('/:id/logs', fetchLatestLogs);
deviceRoutes.get('/:id/usage', getLast24HoursLogs);

export default deviceRoutes;