import request from 'supertest';
import app from '../server.js';
import User from '../models/User.js'; // Your User model

// Mock authentication middleware
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

  it('should add a new address and mark it as most recently used', async () => {
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
    expect(new Date(response.body.addresses[0].lastUsed)).toBeInstanceOf(Date); // Check if lastUsed is set
  });

  it('should update an existing address and mark it as most recently used', async () => {
    const newAddressResponse = await request(app)
      .put('/api/address')
      .send({
        street: '456 New St',
        city: 'New City',
        state: 'New State',
        postalCode: '67890',
        country: 'New Country'
      });

    expect(newAddressResponse.statusCode).toBe(200);
    const updatedUser = newAddressResponse.body;

    // Make sure the address is updated
    expect(updatedUser.addresses[1].street).toBe('456 New St');
    expect(new Date(updatedUser.addresses[1].lastUsed)).toBeInstanceOf(Date); // Check if lastUsed is set
    expect(updatedUser.addresses[0].lastUsed).toBeNull(); // Previous address should no longer be the most recently used
  });

  it('should delete an address', async () => {
    const response = await request(app)
      .delete('/api/address/' + user.addresses[0]._id);

    expect(response.statusCode).toBe(200);
    expect(response.body.addresses.length).toBe(1); // Only one address should remain after deletion
  });

  it('should retrieve the most recently used address', async () => {
    const response = await request(app)
      .get('/api/address/recent');

    expect(response.statusCode).toBe(200);
    expect(response.body.street).toBe('456 New St'); // The last added address should be the most recently used
  });
});
