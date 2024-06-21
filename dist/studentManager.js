import { Student } from "./student.js";
export class StudentManager {
    studentsMap;
    constructor(initialStudents) {
        this.studentsMap = new Map();
        initialStudents.forEach((s) => {
            this.studentsMap.set(s.id, s);
        });
    }
    // method for adding new student in collection
    addStudent(name) {
        if (name) {
            const currStudent = new Student(name);
            this.studentsMap.set(currStudent.id, currStudent);
        }
    }
    // method for getting student by id
    getStudentById(id) {
        return this.studentsMap.get(id);
    }
    getAllStudents() {
        return [...this.studentsMap.values()];
    }
    removeStudent(id) {
        this.studentsMap.delete(id);
    }
    // method for adding course to student
    enrollCourses(id, ...newCourses) {
        const student = this.getStudentById(id);
        if (student) {
            student.courses = newCourses;
        }
    }
    payStudentFees(id, amount) {
        const student = this.getStudentById(id);
        if (student) {
            student.payFees(amount);
        }
    }
    noOfStudents() {
        return this.studentsMap.size;
    }
}
