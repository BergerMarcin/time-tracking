import moment from "moment-timezone";
import configuredPool from "../dbconfig/DBConnector";

/**
 * Code based on:
 * https://github.com/CyberZujo/todo-app
 * https://sequelize.org/master/manual/raw-queries.html
**/

class TasksController {
  static readonly queries = {
    all: "SELECT * FROM tasks",
    current: "SELECT * FROM tasks WHERE start IN (SELECT MAX(start) FROM tasks WHERE finish IS NULL)",
    start: "INSERT INTO tasks VALUES (uuid_generate_v4(), $1 , NOW())",
    stop: "UPDATE tasks SET finish=NOW() WHERE start IN (SELECT MAX(start) FROM tasks WHERE finish IS NULL)",
    setTZ: (tz) => `SET timezone = '${tz}'`
  };
  static readonly dateFormat = 'YYYY-MM-DD HH:mm'

  constructor() {
    console.log('\n\n🔧 🔧 🔧 🔧 🔧 🔧 🔧    TasksController parameters    🔧 🔧 🔧 🔧 🔧 🔧 🔧');
    console.log('TasksController.queries: ', TasksController.queries);
    console.log('TasksController.dateFormat: ', TasksController.dateFormat);
  }

  public static convertUTCtoTZ(tasks: object, timezone: string): object {
    const dateUTCtoTZ = (datetime: string): string => {
      return moment.tz(datetime, timezone).format(TasksController.dateFormat);
    }

    const rowDatesUTCtoTZ = (task: object): object => {
      console.log('row: ', task)
      return {
        ...task,
        // start: task.start ? dateUTCtoTZ(task.start) : null,
        // finish: task.finish ? dateUTCtoTZ(task.finish) : null
      }
    }

    return Array.isArray(tasks) ? tasks.map(task => rowDatesUTCtoTZ(task)) : rowDatesUTCtoTZ(tasks);
  }

  public async all(req, res) {
    console.log('\n\n📖 📖 📖 📖 📖 📖 📖 📖    TasksController.all    📖 📖 📖 📖 📖 📖 📖 📖');
    // TODO: Uncomment when ready for timezone from request/query
    // console.log('Timezone: ', req.data.tz)
    // if (!moment.tz.names().includes(req.data.tz)) {
    //   const errorMsg = 'Wrong request timezone of: ' + req.data.tz
    //   console.error('TasksController.all ERROR: ', errorMsg)
    //   res.status(400).send(errorMsg);
    // }
    // try {
    //   const client = await configuredPool().connect();
    //   // TODO: change to timezone to req.data.tz
    //   await client.query(TasksController.queries.setTZ('Europe/Warsaw'));
    //   const tz = await client.query('SHOW TIMEZONE')
    //   console.log('DB timezone: ', tz.rows)
    //   const {rows} = await client.query(TasksController.queries.all);
    //   const tasks = TasksController.convertUTCtoTZ(rows, 'Europe/Warsaw');
    //   client.release();
    //
    //   res.send(tasks);
    //   console.log('TasksController.all response: ', tasks)
    // } catch (error) {
    //   console.error('TasksController.all ERROR: ', error)
    //   res.status(500).send(error);
    // }
  }
}

export default TasksController;
