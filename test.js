const request = require('supertest');
const app = require('./app');

describe('POST /transform', () => {
  it('transforms the payload correctly with reference data', async () => {
    const payload = {
      name: '{REF_FIRST_NAME} {REF_LAST_NAME}',
      age: 25,
      address: '{REF_ADDRESS}',
    };
    const referenceData = {
      FIRST_NAME: 'John',
      LAST_NAME: 'Doe',
      ADDRESS: '123 Main St.',
    };
    const expectedTransformedPayload = {
      name: 'John Doe',
      age: 25,
      address: '123 Main St.',
    };

    const res = await request(app)
      .post('/transform')
      .send({ payload, referenceData })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(expectedTransformedPayload);
  });

  it('returns an empty object when given an empty payload and reference data', async () => {
    const payload = {};
    const referenceData = {};
    const expectedTransformedPayload = {};

    const res = await request(app)
      .post('/transform')
      .send({ payload, referenceData })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(expectedTransformedPayload);
  });
});
