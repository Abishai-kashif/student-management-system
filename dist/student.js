import { Colors } from "./index.js";
import chalk from "chalk";
class Student {
    static nextId = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = Student.nextId++;
        this.courses = [];
        this.balance = 1000;
    }
    viewBalance() {
        console.log(chalk
            .hex(Colors.LIGHTER_GREEN)
            .bold(`\n\tThe current balance of ${this.name.charAt(0).toUpperCase() + this.name.slice(1)} is: ${this.balance !== 0
            ? chalk
                .hex(Colors.LIGHT_GREEN)
                .bold(this.balance.toFixed(2))
            : chalk.red.bold(this.balance.toFixed(2))}\n\n`));
    }
    payFees(amount) {
        this.balance -= amount;
    }
    showStatus() {
        console.clear();
        console.log(chalk.hex(Colors.GREEN).bold(`
			${chalk.hex(Colors.BEIGE).bold("STUDENT STATUS")}
		       ----------------

		${chalk.hex(Colors.LIGHTER_GREEN).bold("Student ID")}: ${chalk
            .hex(Colors.LIGHTER_GREEN)
            .bold(this.id.toFixed())},
		${chalk.hex(Colors.LIGHTER_GREEN).bold("Student Name")}: ${chalk
            .hex(Colors.LIGHTER_GREEN)
            .bold(this.name)},
		${chalk.hex(Colors.LIGHTER_GREEN).bold("Student Courses")}: ${chalk
            .hex(Colors.LIGHTER_GREEN)
            .bold(this.courses.join(chalk.hex(Colors.GREEN).bold(", ")))},
		${chalk.hex(Colors.LIGHTER_GREEN).bold("Student Balance")}: ${chalk
            .hex(Colors.LIGHTER_GREEN)
            .bold(this.balance.toFixed(2))},
		
		`));
    }
}
export { Student };
