import request from 'supertest';
import app from '../server.js'; // Assuming your express app is exported from server.js
import User from '../models/User.js'; // Your User model

// Mock authentication middleware if necessary
jest.mock('../middleware/auth.js', () => ({
  auth: (req, res, next) => {
    req.user = 'mockedUserId'; // Mock user ID
    next();
  }
}));

describe('Preferences API', () => {
  let user;

  // Set up a user in the database before running tests
  beforeAll(async () => {
    user = new User({
      _id: 'mockedUserId',
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
      dietaryPreferences: []
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany(); // Clean up after tests
  });

  it('should add dietary preferences', async () => {
    const response = await request(app)
      .put('/api/preferences')
      .send({ preferences: ['vegetarian', 'vegan'] });

    expect(response.statusCode).toBe(200);
    expect(response.body.dietaryPreferences).toContain('vegetarian');
    expect(response.body.dietaryPreferences).toContain('vegan');
  });

  it('should update dietary preferences', async () => {
    const response = await request(app)
      .put('/api/preferences/update')
      .send({ preferences: ['gluten-free', 'dairy-free'] });

    expect(response.statusCode).toBe(200);
    expect(response.body.dietaryPreferences).toEqual(['gluten-free', 'dairy-free']);
  });

  it('should delete a specific dietary preference', async () => {
    const response = await request(app)
      .delete('/api/preferences/gluten-free');

    expect(response.statusCode).toBe(200);
    expect(response.body.dietaryPreferences).not.toContain('gluten-free');
  });
});
