import { Student } from "./student.js";

export class StudentManager {
	protected studentsMap: Map<number, Student>;

	constructor(initialStudents: Student[]) {
		this.studentsMap = new Map<number, Student>();

		initialStudents.forEach((s) => {
			this.studentsMap.set(s.id, s);
		});
	}

	// method for adding new student in collection
	addStudent(name: string) {
		if (name) {
			const currStudent = new Student(name);
			this.studentsMap.set(currStudent.id, currStudent);
		}
	}

	// method for getting student by id
	getStudentById(id: number): Student | undefined {
		return this.studentsMap.get(id);
	}

	getAllStudents(): Student[] {
		return [...this.studentsMap.values()];
	}

	removeStudent(id: number): void {
		this.studentsMap.delete(id);
	}

	// method for adding course to student
	enrollCourses(id: number, ...newCourses: string[]) {
		const student = this.getStudentById(id);
		if (student) {
			student.courses = newCourses;
		}
	}

	payStudentFees(id: number, amount: number) {
		const student = this.getStudentById(id);
		if (student) {
			student.payFees(amount);
		}
	}

	noOfStudents(): number {
		return this.studentsMap.size;
	}
}
