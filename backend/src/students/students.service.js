const Student = require('./students.model');

module.exports.createStudent = async function (student) {
    return Student.create(student);
};

module.exports.getStudent = async function (PAGE_SIZE, PAGE_NUMBER, searchQuery) {
    const query = {};
  
    if (searchQuery) {
      PAGE_NUMBER = 0;
      query.fullName = { $regex: new RegExp(searchQuery, 'i') };
    }
  
    try {
      let total;
      let data;
      if (searchQuery) {
        total = await Student.countDocuments(query);
        data = await Student.find(query);
        if (total === 1) {
          return {
            total: 1,
            data: data,
          };
        } else {
          data = await Student.find(query)
            .limit(PAGE_SIZE)
            .skip(PAGE_SIZE * PAGE_NUMBER);
          total = await Student.countDocuments(query);
        }
      } else {
        total = await Student.countDocuments();
        data = await Student.find({})
          .limit(PAGE_SIZE)
          .skip(PAGE_SIZE * PAGE_NUMBER);
      }
  
      return {
        total: Math.ceil(total / PAGE_SIZE),
        data: data,
      };
    } catch (error) {
      console.error("Error fetching student data:", error);
      return {
        total: 0,
        data: [],
      };
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