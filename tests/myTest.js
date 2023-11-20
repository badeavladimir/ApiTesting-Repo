const pactum = require('pactum');
const request = pactum.request;

request.setDefaultTimeout(20000);
request.setBaseUrl('http://localhost:8887')

it('get all employees test', async () => {
  await pactum.spec()
    .get('/api/v1/employees')
    .expectStatus(200);
});

it('create employee test', async () => {
    const postRequestBody = {
      "dob": "1966-01-22",
      "email": "boole@yahoo.com",
      "firstName": "Juu",
      "id": 0,
      "lastName": "Kee"
    }

    await pactum.spec()
      .post('/api/v1/employees')
      .withJson(postRequestBody)
      .expectStatus(201);
  });

it('return employee ID', async () => {
    const postRequestBody = {
      "dob": "1976-01-24",
      "email": "rb@gmail.com",
      "firstName": "Ralphie",
      "id": 2,
      "lastName": "Bean"
    }

    await pactum.spec()
      .get('/api/v1/employees/2')
      .withJson(postRequestBody)
      .expectStatus(404);
});

it('update employee ID', async () => {
  const postRequestBody = {
    "dob": "1999-01-01",
    "email": "vladaddada@bambooozle.de",
    "firstName": "Keeke",
    "id": 1,
    "lastName": "Buzzo"
  }

  await pactum.spec()
    .put('/api/v1/employees/1')
    .withJson(postRequestBody)
    .expectStatus(400);
});

it('delete employee by ID', async () => {
  await pactum.spec()
    .delete('/api/v1/employees/2')
    .expectStatus(404);
});

it('simulate internal server error', async () => {
  await pactum.spec()
    .get('/api/v1/simulate/server/error')
    .expectStatus(500);
});

it('Simulate endpoint that returns a JWT token use admin for both username and password', async () => {
  const postRequestBody = {
    "password": "admin",
    "username": "admin"
  }

  await pactum.spec()
    .post('/api/v1/simulate/token')
    .withJson(postRequestBody)
    .expectStatus(200);
});