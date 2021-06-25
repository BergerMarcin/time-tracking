import { Router } from 'express';
import TasksController from '../controllers/TasksController';

/** Code based on https://sequelize.org/master/manual/getting-started.html **/

const router = Router();
const tasksController = new TasksController();

// Working URI (params) and old-fashioned URL (query)
router.get(['/all/:timezone', '/all'], tasksController.all);

// router.get('/current', tasksController.current);
//
// router.get('/start', tasksController.start);
//
// router.get('/stop', tasksController.stop);

export default router;
