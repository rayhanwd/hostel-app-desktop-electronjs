const Student = require('./students.model');

module.exports.createStudent = async function (student) {
    return Student.create(student);
};

module.exports.getStudent = async function (PAGE_SIZE,PAGE_NUMBER) {
    const total = await Student.countDocuments({});
    const students = await Student.find({}).limit(PAGE_SIZE)
        .skip(PAGE_SIZE * PAGE_NUMBER);
    return {
        total: Math.ceil(total / PAGE_SIZE),
        students: students
    }
};
module.exports.getStudentById = async function (studentId) {
    return Student.findById(studentId);
};

module.exports.updateStudentById = async function (studentId, updatedstudent) {
    return Student.findByIdAndUpdate(studentId, updatedstudent, { new: true });
};

module.exports.deleteStudentById = async function (studentId) {
    return Student.findByIdAndDelete(studentId);
};