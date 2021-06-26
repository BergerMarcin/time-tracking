import { Router, Request, Response } from 'express';
import TasksController from '../controllers/TasksController';

/** Code based on https://github.com/CyberZujo/todo-app **/

const router = Router();
const tasksController = new TasksController();

const apiWorking = (req: Request, res: Response) => {
  res.send('API is working');
}

router.get('/', apiWorking);

router.get('/all', tasksController.all);

router.get('/current', tasksController.current);

router.post('/start', tasksController.start);

router.patch('/stop', tasksController.stop);

export default router;
