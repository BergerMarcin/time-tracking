import express from 'express';
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
  };

  constructor() {
    console.log('\n\n🔧 🔧 🔧 🔧 🔧 🔧 🔧    TasksController parameters    🔧 🔧 🔧 🔧 🔧 🔧 🔧');
    console.log('TasksController.queries: ', TasksController.queries);
  }

  public async all(req: express.Request, res: express.Response) {
    console.log('\n\n📖 📖 📖 📖 📖 📖 📖 📖    TasksController.all    📖 📖 📖 📖 📖 📖 📖 📖');
    try {
      // TODO: Implement model querying of sequelize (instead of raw SQL query)
      // @ts-ignore: to apply here TS type checking required change to ORM/sequelize query
      const tasks: TaskAttributes[] = await DBConnector.sequelize.query(TasksController.queries.all.query, { type: TasksController.queries.all.type });
      res.send(tasks);
      console.log('👍 👍 👍 👍    TasksController.all response: ', tasks, '    👍 👍 👍 👍')
    } catch (error) {
      console.error('⛔ ⛔ ⛔ ⛔    TasksController.all ERROR: ', error, '    ⛔ ⛔ ⛔ ⛔')
      res.status(500).send(error);
    }
  }
}

export default TasksController;
