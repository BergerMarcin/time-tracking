import express, { Router } from 'express';
import TasksController from '../controllers/TasksController';

const router = Router();
const tasksController = new TasksController();

router.get('/all', tasksController.all);

// router.get('/current', tasksController.current);
//
// router.get('/start', tasksController.start);
//
// router.get('/stop', tasksController.stop);

export default router;
