import 'regenerator-runtime/runtime';
import supertest from 'supertest';
import app from '../dist/app.js';
import JobPost from '../dist/models/jobPost.js';
import mongoose from 'mongoose';

const mockPost = {
  coverImage: 'https://images.unsplash.com/photo-1645491225475-615a05fefba6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
  companyLogo: 'https://uploads-ssl.webflow.com/5ff85e689c9dec9849abfe26/601044f709326633bc68bfa8_Logo%20white.svg',
  companyName: 'GRIMP',
  title: 'Full Stack Developer',
  contractType: 'permanent',
  localization: 'Nantes',
  publishedAt: '22/02/2022'
};

// database on/off
// ------------------------------------------
beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/myDB",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});
// ------------------------------------------

describe('api tests on /jobPost', () => {

  describe('POST /jobPost', () => {
    test("POST /jobPost", async () => {
      const data = mockPost;
    
      await supertest(app).post("/jobPost")
        .send(data)
        .expect(201)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBeTruthy();
          expect(response.body.coverImage).toBe(data.coverImage);
          expect(response.body.companyLogo).toBe(data.companyLogo);
          expect(response.body.title).toBe(data.title);
          expect(response.body.contractType).toBe(data.contractType);
          expect(response.body.localization).toBe(data.localization);
          expect(response.body.publishedAt).toBe(data.publishedAt);
    
          // Check data in the database
          const post = await JobPost.findOne({ _id: response.body._id });
          expect(response.body._id).toBeTruthy();
          expect(response.body.coverImage).toBe(data.coverImage);
          expect(response.body.companyLogo).toBe(data.companyLogo);
          expect(response.body.title).toBe(data.title);
          expect(response.body.contractType).toBe(data.contractType);
          expect(response.body.localization).toBe(data.localization);
          expect(response.body.publishedAt).toBe(data.publishedAt);

          // Test with wrong data passed
          expect(post.title).not.toBe('RandomfName');
        });
    });
  })

  describe('READ ALL post', () => {
    test("GET /jobPost", async () => {
      const post = await JobPost.create(mockPost);
      await supertest(app).get('/jobPost')
        .expect(200)
        .then((response) => {
          // Check type and length
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
    
          // Check data
          expect(response.body[0]._id).toBe(post.id);
          expect(response.body[0].coverImage).toBe(data.coverImage);
          expect(response.body[0].companyLogo).toBe(data.companyLogo);
          expect(response.body[0].title).toBe(data.title);
          expect(response.body[0].contractType).toBe(data.contractType);
          expect(response.body[0].localization).toBe(data.localization);
          expect(response.body[0].publishedAt).toBe(data.publishedAt);;
        });
    });
  });

  describe('READ ONE post', () => {
    test("GET /jobPost/:postId", async () => {
      const post = await JobPost.create(mockPost);
    
      await supertest(app).get("/jobPost/" + post.id)
        .expect(200)
        .then((response) => {
          expect(response.body._id).toBe(post.id);
          expect(response.body.coverImage).toBe(data.coverImage);
          expect(response.body.companyLogo).toBe(data.companyLogo);
          expect(response.body.title).toBe(data.title);
          expect(response.body.contractType).toBe(data.contractType);
          expect(response.body.localization).toBe(data.localization);
          expect(response.body.publishedAt).toBe(data.publishedAt);;
        });
    });
  });

  describe('UPDATE ALL in post', () => {
    test("PATCH /jobPost/:postId", async () => {
      const post = await JobPost.create(mockPost);
    
      const data = { title: "New title", content: "dolor sit amet" };
    
      await supertest(app).patch("/jobPost/" + post.id)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBe(post.id);
          expect(response.body.fName).toBe(data.fName);
          expect(response.body.lName).toBe(data.lName);
    
          // Check the data in the database
          const newPost = await JobPost.findOne({ _id: response.body._id });
          expect(newPost).toBeTruthy();
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
        });
    });
  });

  describe('UPDATE ONE in jobPost', () => {
    test("PATCH /jobPost/:postId", async () => {
      const post = await JobPost.create(mockPost);
    
      const data = { title: "New title", content: "dolor sit amet" };
    
      await supertest(app).put("/jobPost/" + post.id)
        .send(data)
        .expect(200)
        .then(async (response) => {
          // Check the response
          expect(response.body._id).toBe(post.id);
          expect(response.body.title).toBe(data.title);
          expect(response.body.content).toBe(data.content);
    
          // Check the data in the database
          const newPost = await JobPost.findOne({ _id: response.body._id });
          expect(newPost).toBeTruthy();
          expect(newPost.title).toBe(data.title);
          expect(newPost.content).toBe(data.content);
        });
    });
  });

  describe('DELETE ONE post', () => {
    test("DELETE /jobPost/:postId", async () => {
      const post = await JobPost.create(mockPost);
    
      await supertest(app)
        .delete("/jobPost/" + post.id)
        .expect(204)
        .then(async () => {
          expect(await post.findOne({ _id: post.id })).toBeFalsy();
        });
    });
  });
})
