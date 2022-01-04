var supertest = require("supertest");
var should = require("should");
const { string } = require("yargs");

var server = supertest.agent("http://localhost:8080");

//get request
describe("SAMPLE unit test",function(){
  
  it("should return home page",function(done){
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

//get unique request
  it("should return all developer list",function(done){
    server
    .get("/developers")
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
 });

  it("should return unique developer using id - 2",function(done){
    server
    .get("/developers/id")
    .send({"id" : 2})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body[0].id.should.equal(2)
      done();
    });
  });

  it("should return unique developer using id - 5",function(done){
    server
    .get("/developers/id")
    .send({"id" : 5})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body[0].id.should.equal(5)
      done();
    });
  });
  

  it("should return unique developer using name - ABC",function(done){
    server
    .get("/developers/name")
    .send({"name" : "ABC"})
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body[0].name.should.equal("ABC")
      done();
    });
  });

    it("should return unique developer using name - YZ",function(done){
    server
    .get("/developers/name")
    .send({"name" : "YZ"})
    .expect("Content-type",/json/)
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      res.body[0].name.should.equal("YZ")
      done();
    });
  });


 it("should create new developer def",function(done){
    server
    .post("/developers")
    .send({name : 'def', projects : "project-e"})
    .expect("Content-type",/json/)
    .expect(201) 
    .end(function(err,res){
      res.status.should.equal(201);
      done();
    });
 });

});