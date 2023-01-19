import request from 'supertest';
import { server as app } from '../app';

//to test manually with remote POSTGRES server
jest.setTimeout(30000);
describe('todoList test', () => {
  beforeAll(async () => {
    console.log('Start Jest!');
  });
  afterAll(() => {
    app.close();
  });
  it(`Created 2 task lists with 3 tasks in each and give Read, Create Grants to EgorDeveroper, Update, Delete Grants to AnotherUser,
        operations of each user corresponding to the grants they've got and operations when CREATE and DELETE grants are taken off`, async () => {
    //New user registration
    const { body: { data: { token } } } = await request(app).post('/registration').send({ login: 'AnotherUser2', password: '12341234' }).expect(200);

    //Create 2 new task lists for new user AnotherUser2
    const responses = await Promise.all([
      request(app).post('/task_list').send({ name: 'AnotherUser2_task_list' }).set('token', token).expect(200),
      request(app).post('/task_list').send({ name: 'AnotherUser2_task_list2' }).set('token', token).expect(200),
    ]);

    expect({id: responses[0].body.data.id, name: 'AnotherUser2_task_list'}).toEqual(responses[0].body.data);
    expect({id: responses[1].body.data.id, name: 'AnotherUser2_task_list2'}).toEqual(responses[1].body.data);

    // Create 3 new tasks for each task list of AnotherUser2
    for (let i = 1; i < 4; i++) {
      await Promise.all([
        request(app)
          .post(`/task_list/${responses[0].body.data.id}/task`)
          .send({ name: `AnotherUser2_task_list_task${i}` })
          .set('token', token)
          .expect(200),
        request(app)
          .post(`/task_list/${responses[1].body.data.id}/task`)
          .send({ name: `AnotherUser2_task_list2_task${i}` })
          .set('token', token)
          .expect(200),
      ]);
    }

    // Give grants for EgorDeveloper(Read, Create for first task list)
    // and AnotherUser(Update, Delete for second task list) users
    await Promise.all([
      request(app)
        .get(`/task_list/${responses[0].body.data.id}/grant?user_id=1&grant=read`)
        .set('token', token)
        .expect(200),
      request(app)
        .get(`/task_list/${responses[1].body.data.id}/grant?user_id=1&grant=read`)
        .set('token', token)
        .expect(200),
      request(app)
        .get(`/task_list/${responses[0].body.data.id}/grant?user_id=1&grant=create`)
        .set('token', token)
        .expect(200),
      request(app)
        .get(`/task_list/${responses[1].body.data.id}/grant?user_id=2&grant=update`)
        .set('token', token)
        .expect(200),
      request(app)
        .get(`/task_list/${responses[1].body.data.id}/grant?user_id=2&grant=delete`)
        .set('token', token)
        .expect(200),
    ]);

    // Login in 2 already made user accounts
    const [
      { body: { data: { token: token2 } } },
      { body: { data: { token: token3 } } },
    ] = await Promise.all([
      request(app).post('/login').send({ login: 'EgorDeveloper', password: '12341234' }).expect(200),
      request(app).post('/login').send({ login: 'AnotherUser', password: '12341234' }).expect(200),
    ]);

    //Get the taskList data before changes
    const [
      { body: { data: taskListBefore } },
      { body: { data: taskList2Before } },
    ] = await Promise.all([
      request(app).get(`/task_list/${responses[0].body.data.id}`).set('token', token2).expect(200),
      request(app).get(`/task_list/${responses[1].body.data.id}`).set('token', token2).expect(200),
    ]);

    //Get changing results
    const [
      { body: { data: createdTask } },
      { body: { data: readedTask } },
      { body: { data: updatedTask } },
      { body: { data: deletedTask } },
    ] = await Promise.all([
      request(app)
        .post(`/task_list/${responses[0].body.data.id}/task`)
        .send({ name: `AnotherUser2_task_list_task_created_by_EgorDeveloper` })
        .set('token', token2)
        .expect(200),
      request(app)
        .get(`/task_list/${responses[0].body.data.id}/task/${taskListBefore.tasks[0].id}`)
        .set('token', token2)
        .expect(200),
      request(app)
        .put(`/task_list/${responses[1].body.data.id}/task/${taskList2Before.tasks[0].id}`)
        .send({ name: `AnotherUser2_task_list2_task_updated_by_AnotherUser` })
        .set('token', token3)
        .expect(200),
      request(app)
        .delete(`/task_list/${responses[1].body.data.id}/task/${taskList2Before.tasks[1].id}`)
        .set('token', token3)
        .expect(200),
    ]);

    //Get the taskList data after changes
    const [
      { body: { data: taskListAfter } },
      { body: { data: taskList2After } },
    ] = await Promise.all([
      request(app).get(`/task_list/${responses[0].body.data.id}`).set('token', token2).expect(200),
      request(app).get(`/task_list/${responses[1].body.data.id}`).set('token', token2).expect(200),
    ]);

    //Test
    expect(taskListAfter).toHaveProperty('tasks');
    expect(taskList2After).toHaveProperty('tasks');
    expect(taskListAfter.tasks).toHaveLength(4);
    expect(taskList2After.tasks).toHaveLength(2);
    expect(taskListAfter.tasks).toContainEqual(createdTask);
    expect(taskListAfter.tasks).toContainEqual(readedTask);
    expect(taskList2After.tasks).toContainEqual(updatedTask);
    expect(taskList2After.tasks).not.toContainEqual(deletedTask);

    //Take off grants for EgorDeveloper(Create for first task list) and AnotherUser(Delete for second task list) users
    await Promise.all([
      request(app)
        .get(`/task_list/${responses[0].body.data.id}/grant?user_id=1&grant=create&take_off=true`)
        .set('token', token)
        .expect(200),
      request(app)
        .get(`/task_list/${responses[1].body.data.id}/grant?user_id=2&grant=delete&take_off=true`)
        .set('token', token)
        .expect(200),
    ]);

    //Get changing results
    const [
      { body: { error: createdError } },
      { body: { data: readedTaskAgain } },
      { body: { data: updatedTaskAgain } },
      { body: { error: deletedError } },
    ] = await Promise.all([
      request(app)
        .post(`/task_list/${responses[0].body.data.id}/task`)
        .send({ name: `AnotherUser2_task_list_task_created_by_EgorDeveloper_Again` })
        .set('token', token2)
        .expect(403),
      request(app)
        .get(`/task_list/${responses[0].body.data.id}/task/${taskListAfter.tasks[0].id}`)
        .set('token', token2)
        .expect(200),
      request(app)
        .put(`/task_list/${responses[1].body.data.id}/task/${taskList2After.tasks[0].id}`)
        .send({ name: `AnotherUser2_task_list2_task_updated_by_AnotherUser_Again` })
        .set('token', token3)
        .expect(200),
      request(app)
        .delete(`/task_list/${responses[1].body.data.id}/task/${taskList2After.tasks[1].id}`)
        .set('token', token3)
        .expect(403),
    ]);

    //Get the taskList data after changes
    const [
      { body: { data: taskListAfterAgain } },
      { body: { data: taskList2AfterAgain } },
    ] = await Promise.all([
      request(app).get(`/task_list/${responses[0].body.data.id}`).set('token', token2).expect(200),
      request(app).get(`/task_list/${responses[1].body.data.id}`).set('token', token2).expect(200),
    ]);

    // Test
    expect(taskListAfterAgain).toHaveProperty('tasks');
    expect(taskList2AfterAgain).toHaveProperty('tasks');
    expect(taskListAfterAgain.tasks).toHaveLength(4);
    expect(taskList2AfterAgain.tasks).toHaveLength(2);
    expect(createdError).toBe('No Create Grant or task list doesnt exist');
    expect(deletedError).toBe('No Delete Grant or task list doesnt exist');
    expect(taskListAfterAgain.tasks).not.toContainEqual({
      id: taskListAfterAgain.tasks[taskListAfterAgain.tasks.length - 1].id + 1,
      name: 'AnotherUser2_task_list_task_created_by_EgorDeveloper_Again',
      task_list_id: responses[0].body.data.id,
    });
    expect(taskList2AfterAgain.tasks).toContainEqual(taskList2After.tasks[1]);
    expect(taskListAfterAgain.tasks).toContainEqual(readedTaskAgain);
    expect(taskList2AfterAgain.tasks).toContainEqual(updatedTaskAgain);
  });
});
