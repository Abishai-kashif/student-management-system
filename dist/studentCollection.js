import { Student } from "./student.js";
export class StudentCollection {
    mapStudents = new Map();
    constructor(students) {
        students.forEach((student) => this.mapStudents.set(student.id, student));
    }
    addStudent(name, age, courses = "Artificial Intelligence") {
        const currStudent = new Student(name, age);
        this.mapStudents.set(currStudent.id, currStudent);
        return currStudent.id;
    }
    // method for showing all students
    showAllStudents() {
        for (const student of this.mapStudents.values()) {
            student.printDetails();
        }
    }
    getStudentById(id) {
        return this.mapStudents.get(id);
    }
}
