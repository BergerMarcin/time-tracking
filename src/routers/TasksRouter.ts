import { Router } from 'express';
import TasksController from '../controllers/TasksController';

/** Code based on https://github.com/CyberZujo/todo-app **/

const router = Router();
const tasksController = new TasksController();

router.get('/all/', tasksController.all);

router.get('/current', tasksController.current);

router.post('/start', tasksController.start);

router.patch('/stop', tasksController.stop);

export default router;
