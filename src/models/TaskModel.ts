import {Sequelize, Model, DataTypes, Optional, UUIDV4} from "sequelize";

/** Code based on https://sequelize.org/master/manual/typescript.html **/

// These are all the attributes in the Task model
interface TaskAttributes {
  id: string;
  name: string;
  start: Date;
  finish: Date | null;
}

// Optional multiple attributes (`id`, `finish`) in `Task.build` and `Task.create` calls
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'finish'> {
}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public start: Date;   // Decided not make it readonly for future develop project - like adding `change start time end-point`
  public finish: Date | null;
}

const taskModelInit = (sequelize: Sequelize) => {
  console.log('\n\n🔧 🔧 🔧 🔧 🔧 🔧 🔧    Task ORM Model initialising    🔧 🔧 🔧 🔧 🔧 🔧 🔧');
  const result = Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,   // acc. docs `Sequelize.UUIDV4` (but Sequelize class was required to type that function parameter `sequelize`)
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(255),
        allowNull: false
      },
      start: {
        type: new DataTypes.DATE,
        allowNull: false
      },
      finish: {
        type: new DataTypes.DATE,
        allowNull: true
      },
    },
    {
      tableName: "tasks",
      sequelize // passing the `sequelize` instance is required
    });
  console.log('👍 👍 👍 👍    Initialised ORM model: ', result, '    👍 👍 👍 👍')
}

export default taskModelInit;
