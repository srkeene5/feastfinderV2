import request from 'supertest';
import app from '../server.js';
import User from '../models/User.js'; // Your User model

jest.mock('../middleware/auth.js', () => ({
  auth: (req, res, next) => {
    req.user = 'mockedUserId'; // Mock user ID
    next();
  }
}));

describe('Address API', () => {
  let user;

  // Set up a user in the database before running tests
  beforeAll(async () => {
    user = new User({
      _id: 'mockedUserId',
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
      addresses: []
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany(); // Clean up after tests
  });

  it('should add a new address', async () => {
    const response = await request(app)
      .put('/api/address')
      .send({
        street: '123 Main St',
        city: 'Sample City',
        state: 'Sample State',
        postalCode: '12345',
        country: 'Sample Country'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.addresses.length).toBe(1);
    expect(response.body.addresses[0].street).toBe('123 Main St');
  });

  it('should update an existing address', async () => {
    const response = await request(app)
      .put('/api/address/' + user.addresses[0]._id)
      .send({
        street: '456 New St',
        city: 'New City',
        state: 'New State',
        postalCode: '67890',
        country: 'New Country'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.addresses[0].street).toBe('456 New St');
  });

  it('should delete an address', async () => {
    const response = await request(app)
      .delete('/api/address/' + user.addresses[0]._id);

    expect(response.statusCode).toBe(200);
    expect(response.body.addresses.length).toBe(0);
  });
});
