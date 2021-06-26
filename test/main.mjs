import assert from 'assert';
import faker from 'faker';
import {http} from './http.mjs';


/** -------------- COMMON PARAMETERS ------------- **/

let CURRENT_TASK;

const setCurrentTask = (task) => {
  CURRENT_TASK = task;
}


/** -------------- COMMON FUNCTIONS ------------- **/

const startTask = async () => {
  const name = faker.lorem.sentence().substr(0, 255);
  return await http.post('/start', {name});
}

const checkTaskPropertyComposition = (task) => {
  assert.ok(task.hasOwnProperty('id'));
  assert.ok(task.hasOwnProperty('name'));
  assert.ok(task.hasOwnProperty('start'));
  assert.ok(task.hasOwnProperty('finish'));
}

const checkTaskPropertyValues = (task, referenceTask) => {
  assert.ok(task.id === referenceTask.id);
  assert.ok(task.name === referenceTask.name);
  assert.ok(task.start === referenceTask.start);
}


/** -------------- API end-points TESTS ------------- **/

it('API is working', async () => {
  const res = await http.get('/');

  assert.strictEqual(res.status, 200);
  assert.ok(res.data === 'API is working');
});

it('All task can be get', async () => {
  const res = await http.get('/all')

  assert.strictEqual(res.status, 200);
  assert.ok(Array.isArray(res.data));
});

it('START end-point test: new-task could be started; new-task has proper properties and name and is not-finished; previous-current-task is finished', async () => {
  setCurrentTask((await startTask()).data.started);

  const allTasksBefore = (await http.get('/all')).data;
  const name = faker.lorem.sentence().substr(0, 255);
  const startTaskResponse = await http.post('/start', {name});
  const allTasksAfter = (await http.get('/all')).data;

  // regular check of started/created task
  assert.strictEqual(startTaskResponse.status, 200);
  // all tasks count + 1
  assert.ok(allTasksBefore.length + 1 === allTasksAfter.length);
  // finished-task data are OK
  checkTaskPropertyComposition(startTaskResponse.data.finished);
  checkTaskPropertyValues(startTaskResponse.data.finished, CURRENT_TASK);
  assert.ok(startTaskResponse.data.finished.finish !== null);
  // started-task data are OK
  checkTaskPropertyComposition(startTaskResponse.data.started);
  assert.ok(startTaskResponse.data.started.name === name);
  assert.ok(startTaskResponse.data.started.finish === null);

  // double-check if start-end-point finishes previous/before current task
  assert.ok(allTasksAfter.filter(t => t.id === CURRENT_TASK.id)[0].finish !== null);
});

it('CURRENT end-point test: current task could read; current-task has proper properties and is not-finished', async () => {
  setCurrentTask((await startTask()).data.started);

  const currentTaskResponse = await http.get('/current');

  assert.strictEqual(currentTaskResponse.status, 200);
  checkTaskPropertyComposition(currentTaskResponse.data);
  checkTaskPropertyValues(currentTaskResponse.data, CURRENT_TASK);
  assert.ok(currentTaskResponse.data.finish === null);
});

it('STOP end-point test: current task could stop; stop-task has proper properties acc. previous-current-task; stop-task is finished', async () => {
  setCurrentTask((await startTask()).data.started);

  const allTasksBefore = (await http.get('/all')).data;
  const stopTaskResponse = await http.patch('/stop');
  const allTasksAfter = (await http.get('/all')).data;

  // regular check of stopped task
  assert.strictEqual(stopTaskResponse.status, 200);
  // all tasks count constant
  assert.ok(allTasksBefore.length === allTasksAfter.length);
  // stopped-task data are OK
  checkTaskPropertyComposition(stopTaskResponse.data);
  checkTaskPropertyValues(stopTaskResponse.data, CURRENT_TASK);
  assert.ok(stopTaskResponse.data.finish !== null);
});
