const studentService = require('./students.service');

module.exports.createStudent = async function (req, res) {
    const student = req.body;
    const createstudent = await studentService.createStudent(student);
    return res.status(200).json(createstudent);
};

module.exports.getStudent = async function (req, res) {
    const PAGE_SIZE = 3;
    const PAGE_NUMBER = parseInt(req.query.page || "0");
    const students = await studentService.getStudent(PAGE_SIZE,PAGE_NUMBER);
    return res.json(students);
};

module.exports.getStudentById = async function (req, res) {
    const studentId = req.params.id;
    const student = await studentService.getStudentById(studentId);
    return res.json(student);
  };

module.exports.updateStudentById = async function (req, res) {
    const studentId = req.params.id;
    const updatedstudent = req.body;
    const student = await studentService.updateStudentById(studentId, updatedstudent);
    return res.json(student);
};

module.exports.deleteStudentById = async function (req, res) {
    const studentId = req.params.id;
    const student = await studentService.deleteStudentById(studentId);
    return res.json(student);
};