process.env.NODE_ENV = "test";
const supertest = require("supertest");
const { response } = require("../../index");
const app = require("../../index");
  const mongoose = require('mongoose');
// read data for global
const inputData = require("./inputdata");
const { deleteOne } = require("../../model/role");
const { disconnect } = require("mongoose");


let token;
describe("Role API's Testing : ", () => {
  beforeAll(async () => {
    await supertest(app)
      .post("/api/login")
      .send(inputData.defaultUser)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        token = response._body.data.token;
       
      });
      
  });


  afterAll(async () => {
    await mongoose.disconnect(); 
  });

 

  describe("GET /api/getRoles", () => {
    test("it should get all the roles", async () => {
      await supertest(app)
        .get("/api/getRoles")
        .set({ Authorization: `Bearer ${token}` })
        .then((response) => {
          expect(response.statusCode).toBe(200);
         
        });
      
    });
  });

  describe("POST /api/getRoleById/:id", () => {
    test("it should get Role details by id", async () => {
      await supertest(app)
        .post("/api/getRoleById/" + inputData.id)
        .set({ Authorization: `Bearer ${token}` })
        .then((response) => {
          expect(response.statusCode).toBe(200);
         
        });
    });
  });

  describe("POST /api/createRole", () => {
    test("Create New Role", async () => {
      await supertest(app)
        .post("/api/createRole")
        .send(inputData.roleDetails)
        .set({ Authorization: `Bearer ${token}` })
        .then((response) => {
          if (response._body["message"] === "Role already exists") {
            expect(response.statusCode).toBe(401);
            expect(response._body["message"]).toEqual("Role already exists");
           
          } else {
            expect(response.statusCode).toBe(200);
            expect(response._body["message"]).toEqual(
              "Role created successfully"
            );
           
          }
        });
    });
  });

  describe("PUT /api/updateRole/:id", () => {
    test("Role Updated by role id", async () => {
      await supertest(app)
        .put("/api/updateRole/" + inputData.id)
        .send(inputData.updateRole)
        .set({ Authorization: `Bearer ${token}` })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response._body["message"]).toEqual("Role update successfully");
          
        });
    });
  });

  describe("PUT /api/deleteRole/:id ", () => {
    test("Delete Role by id api", async () => {
      await supertest(app)
        .put("/api/deleteRole/" + inputData.deleteId)
        .set({ Authorization: `Bearer ${token}` })
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response._body["message"]).toEqual("Role delete successfully");
           
        });
    });
  });
});
