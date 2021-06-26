import express from 'express';
import {QueryTypes} from 'sequelize';
import DBConnector from "../DBConnector";
import moment from "moment-timezone";
import { TaskAttributes, TaskCreationAttributes } from "../models/TaskModel";

/**
 * Code based on:
 * https://github.com/CyberZujo/todo-app
 * https://sequelize.org/master/manual/raw-queries.html
**/

class TasksController {
  static readonly queries = {
    all: {
      query: "SELECT * FROM tasks",
      type: QueryTypes.SELECT
    },
    current: {
      query: "SELECT * FROM tasks WHERE start IN (SELECT MAX(start) FROM tasks WHERE finish IS NULL)",
      type: QueryTypes.SELECT
    },
    start: {
      query: "INSERT INTO tasks VALUES (uuid_generate_v4(), $1 , NOW())",
      type: QueryTypes.INSERT
    },
    stop: {
      query: "UPDATE tasks SET finish=NOW() WHERE start IN (SELECT MAX(start) FROM tasks WHERE finish IS NULL)",
      type: QueryTypes.UPDATE
    },
    setTZ: (tz: string): string => `SET timezone = '${tz}'`
  };

  static readonly dateFormat = 'YYYY-MM-DD HH:mm'

  constructor() {
    console.log('\n\n🔧 🔧 🔧 🔧 🔧 🔧 🔧    TasksController parameters    🔧 🔧 🔧 🔧 🔧 🔧 🔧');
    console.log('TasksController.queries: ', TasksController.queries);
    console.log('TasksController.dateFormat: ', TasksController.dateFormat);
  }

  public static parseReqParam (req: express.Request, paramName: string): string {
    if (req.params[paramName] && typeof req.params[paramName] === "string") return req.params[paramName]
    // @ts-ignore: verified if string
    if (req.query[paramName] && typeof req.query[paramName] === "string") return req.query[paramName]
    return ''
  }

  public static parseCheckTZ (timezone: string): string {
    if (!timezone) return ''
    const tz = timezone.replace('_', '/').trim().toLowerCase()
    console.log('parseCheckTZ. tz: ', tz)
    if (!moment.tz.names().map(n => n.toLowerCase()).includes(tz)) return ''
    return tz;
  }

  public static tasksDateUTCtoTZ(tasks: object, timezone: string): object {
    const dateUTCtoTZ = (datetime: string): string => {
      return moment.tz(datetime, timezone).format(TasksController.dateFormat);
    }

    const taskDatesUTCtoTZ = (task: any): any => {
      return {
        ...task,
        start: dateUTCtoTZ(task.start),
        finish: task.finish ? dateUTCtoTZ(task.finish) : null
      }
    }

    return Array.isArray(tasks) ? tasks.map(task => taskDatesUTCtoTZ(task)) : taskDatesUTCtoTZ(tasks);
  }

  public async all(req: express.Request, res: express.Response) {
    console.log('\n\n📖 📖 📖 📖 📖 📖 📖 📖    TasksController.all    📖 📖 📖 📖 📖 📖 📖 📖');
    const requestTZ: string = TasksController.parseCheckTZ(TasksController.parseReqParam(req, 'timezone'));
    if (!requestTZ) {
      const errorMsg = 'Wrong request timezone of: ' + req.params.timezone
      console.error('⛔ ⛔ ⛔ ⛔    TasksController.all ERROR: ', errorMsg, '    ⛔ ⛔ ⛔ ⛔')
      res.status(400).send(errorMsg);
      return;
    }
    console.log('Request timezone: ', requestTZ)
    try {
      await DBConnector.sequelize.query(TasksController.queries.setTZ(requestTZ));
      const [dbTZ, metadata] = await DBConnector.sequelize.query('SHOW TIMEZONE')
      console.log("Set DB's timezone: ", dbTZ);
      let tasks: any = await DBConnector.sequelize.query(TasksController.queries.all.query, { type: TasksController.queries.all.type });
      tasks = TasksController.tasksDateUTCtoTZ(tasks, requestTZ);
      res.send(tasks);
      console.log('👍 👍 👍 👍    TasksController.all response: ', tasks, '    👍 👍 👍 👍')
    } catch (error) {
      console.error('⛔ ⛔ ⛔ ⛔    TasksController.all ERROR: ', error, '    ⛔ ⛔ ⛔ ⛔')
      res.status(500).send(error);
    }
  }
}

export default TasksController;
