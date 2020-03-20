const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const studentRouter = require("./api/modules/student/student.router");
const teacherRouter = require("./api/modules/teacher/teacher.router");
const lessionRouter = require("./api/modules/lession/lession.router");
const subjectRouter = require("./api/modules/subject/subject.router");
const moongoose = require("mongoose");
const config = require("./config");
moongoose.connect(config.mongoConnectString, { useNewUrlParser: true });

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/lession", lessionRouter);
app.use("/api/subject", subjectRouter);
app.use("/", express.static("client"));

var server = app.listen(port, function() {
  console.log(`Server run at localhost:${port}`);
});
