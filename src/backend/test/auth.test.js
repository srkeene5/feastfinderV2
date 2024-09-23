import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js'; // Ensure this path is correct
import User from '../models/User.js'; // Ensure this path is correct
import { expect } from 'chai';
import 'dotenv/config';

describe('Auth Routes', function() {
  before(async function() {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  after(async function() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /api/auth/register', function() {
    it('should register a new user', async function() {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'JohnDoe',
          email: 'john.doe@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('token');
    });

    it('should not register an existing user', async function() {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'JaneDoe',
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'JaneDoe',
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('msg', 'User already exists');
    });
  });

  describe('POST /api/auth/login', function() {
    before(async function() {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'JaneDoe',
          email: 'jane.doe@example.com',
          password: 'password123'
        });
    });

    it('should log in a user and return a token', async function() {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
    });

    it('should not log in a user with invalid credentials', async function() {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'jane.doe@example.com',
          password: 'wrongpassword'
        });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('msg', 'Invalid credentials');
    });
  });

  describe('GET /api/auth/protected', function() {
    let token;

    before(async function() {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      token = res.body.token;
    });

    it('should return user details', async function() {
      const res = await request(app)
        .get('/api/auth/protected')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('username', 'JaneDoe');
      expect(res.body).to.not.have.property('password');
    });

    it('should return 401 for invalid token', async function() {
      const res = await request(app)
        .get('/api/auth/protected')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('msg', 'Token is not valid');
    });
  });
});