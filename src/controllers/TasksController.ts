import { Request, Response } from 'express';
import {QueryTypes} from 'sequelize';
import DBConnector from "../DBConnector";
import { TaskAttributes, TaskCreationAttributes } from "../models/TaskModel";

/**
 * Code based on:
 * https://github.com/CyberZujo/todo-app
 * https://sequelize.org/master/manual/raw-queries.html
 **/

class TasksController {
  // TODO: Implement model querying of sequelize (instead of raw SQL query)
  static readonly queries = {
    all: {
      query: "SELECT * FROM tasks",
      type: "SELECT"
    },
    current: {
      query: "SELECT * FROM tasks WHERE start IN (SELECT MAX(start) FROM tasks WHERE finish IS NULL)",
      type: "SELECT"
    },
    start: {
      preQuery: "stop",
      query: "INSERT INTO tasks VALUES (uuid_generate_v4(), $1 , NOW()) RETURNING *",
      type: "INSERT"
    },
    stop: {
      // That query works even in following cases: empty DB (important when using together with start), many not finished tasks, all tasks finished
      query: "UPDATE tasks SET finish=NOW() WHERE start IN (SELECT MAX(start) FROM tasks WHERE finish IS NULL) RETURNING *",
      type: "UPDATE"
    },
  };

  constructor() {
    console.log('\n\n🔧 🔧 🔧 🔧 🔧 🔧 🔧    TasksController parameters    🔧 🔧 🔧 🔧 🔧 🔧 🔧');
    console.log('TasksController.queries: ', TasksController.queries);
  }

  static introLog (type: string) {
    console.log(`\n\n📖 📖 📖 📖 📖 📖 📖 📖    TasksController.${type}    📖 📖 📖 📖 📖 📖 📖 📖`);
  }

  static async queryHandler(type: string, req: Request, res: Response, queryParams?: any[]) {
    try {
      // do things before main query (in case start new task not finished task should be stopped)
      let preResult;
      // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
      if (TasksController.queries[type].preQuery && TasksController.queries[TasksController.queries[type].preQuery]) {
        try {
          // TODO: Implement model querying of sequelize (instead of raw SQL query)
          // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
          const preQuery: object = TasksController.queries[TasksController.queries[type].preQuery]
          // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
          preResult = await DBConnector.sequelize.query(preQuery.query, { type: QueryTypes[preQuery.type] });
          // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
          console.log(`👍 👍    TasksController.${type} pre-query ${TasksController.queries[type].preQuery} result: `, preResult, '    👍 👍')
        } catch (error: unknown) {
          console.error(`⛔ ⛔ ⛔ ⛔    TasksController.${type} ERROR: `, error, '    ⛔ ⛔ ⛔ ⛔')
          res.status(500).send(error);
          return;
        }
      }
      // TODO: Implement model querying of sequelize (instead of raw SQL query)
      // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
      const result: TaskAttributes[] = await DBConnector.sequelize.query(TasksController.queries[type].query, { type: QueryTypes[TasksController.queries[type].type], bind: queryParams });
      let payload;
      switch (type) {
        case 'all':
          payload = result;
          break;
        case 'current':
          payload = result.length > 0 ? result[0] : {};
          break;
        case 'start':
          payload = {
            // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
            finished: (preResult[0] && preResult[0].length > 0) ? preResult[0][0] : {},
            // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
            started: (result[0] && result[0].length > 0) ? result[0][0] : {}
          };
          break;
        case 'stop':
          // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
          payload = (result[0] && result[0].length > 0) ? result[0][0] : {};
          break;
      }
      res.send(payload);
      console.log(`👍 👍 👍 👍    TasksController.${type} response payload: `, payload, '    👍 👍 👍 👍')
    } catch (error: unknown) {
      console.error(`⛔ ⛔ ⛔ ⛔    TasksController.${type} ERROR: `, error, '    ⛔ ⛔ ⛔ ⛔')
      res.status(500).send(error);
    }
  }

  public async all(req: Request, res: Response) {
    TasksController.introLog('all');
    await TasksController.queryHandler('all', req, res);
  }

  public async current(req: Request, res: Response) {
    TasksController.introLog('current');
    await TasksController.queryHandler('current', req, res);
  }

  public async start(req: Request, res: Response) {
    TasksController.introLog('start');
    console.log('Request body: ', req.body);
    if (!req.body.name) {
      const errorMsg = `No name of new task`;
      console.error(`⛔ ⛔ ⛔ ⛔    TasksController.start ERROR: `, errorMsg, '    ⛔ ⛔ ⛔ ⛔');
      res.status(400).send(errorMsg);
      return
    }
    await TasksController.queryHandler('start', req, res, [req.body.name]);
  }

  public async stop(req: Request, res: Response) {
    TasksController.introLog('stop');
    await TasksController.queryHandler('stop', req, res);
  }
}

export default TasksController;
