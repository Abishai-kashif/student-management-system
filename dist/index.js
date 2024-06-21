#! /usr/bin/env node
import { Student } from "./student.js";
import { StudentManager } from "./studentManager.js";
import inquirer from "inquirer";
import chalk from "chalk";
let students = [
    new Student("Abishai Kashif"),
    new Student("Daniyal Nagori"),
    new Student("Zia Khan"),
];
const studentManager = new StudentManager(students);
export var Colors;
(function (Colors) {
    Colors["BEIGE"] = "#FFF5E0";
    Colors["LIGHT_GREEN"] = "#8DECB4";
    Colors["GREEN"] = "#41B06E";
    Colors["NAVY_BLUE"] = "#141E46";
    Colors["LIGHTER_GREEN"] = "#E1F7F5";
    // AQUA_GREEN = "#8DECB4",
})(Colors = Colors || (Colors = {}));
function showStudents() {
    console.clear();
    // welcome message
    console.log(`
	       ${chalk.hex(Colors.LIGHTER_GREEN).bold("=".repeat(38))}
    ${chalk.hex(Colors.LIGHTER_GREEN).bold(`<<<${"=".repeat(5)}>>>`)} ${chalk
        .hex(Colors.LIGHT_GREEN)
        .bold("Welcome to Student Management System")} ${chalk
        .hex(Colors.LIGHTER_GREEN)
        .bold(`<<<${chalk.hex(Colors.LIGHTER_GREEN).bold("=".repeat(5))}>>>`)}
	       ${chalk.hex(Colors.LIGHTER_GREEN).bold("=".repeat(38))}
`);
    // heading indicating two sections 'StudentID' and 'StudentName'
    console.log(`
		${chalk.hex(Colors.LIGHTER_GREEN).bold(`${chalk
        .hex(Colors.NAVY_BLUE)
        .bold("-".repeat(35))}
		   Student ID   ${chalk.hex(Colors.NAVY_BLUE).bold(`|`)}   Student Name
		${chalk.hex(Colors.NAVY_BLUE).bold("-".repeat(35))}`)}
`);
    // showing all the students along with their ID.
    studentManager.getAllStudents().forEach((s) => {
        console.log(`\t\t${s.id}\t\t${chalk.hex(Colors.NAVY_BLUE).bold(":")}   ${s.name.charAt(0).toUpperCase() + s.name.slice(1)}`);
    });
    console.log(chalk.hex(Colors.NAVY_BLUE).bold(`\n\t\t${"-".repeat(35)}\n`));
}
async function promptAdd() {
    console.clear();
    const name = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter name: ",
        },
    ]);
    studentManager.addStudent(name.name);
}
async function promptPayFees() {
    console.clear();
    const studentId = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Enter ID: ",
        },
    ]);
    let currStudent = studentManager.getStudentById(studentId.id);
    if (currStudent) {
        console.clear();
        const amount = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "Enter amount: ",
            },
        ]);
        if (amount.amount <= currStudent.balance) {
            studentManager.payStudentFees(studentId.id, amount.amount);
        }
    }
}
async function promptEnrollCourses() {
    console.clear();
    const studentId = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Enter ID:",
        },
    ]);
    const currStudent = studentManager.getStudentById(studentId.id);
    if (currStudent) {
        console.clear();
        const coursesNames = await inquirer.prompt([
            {
                name: "courses",
                type: "checkbox",
                message: chalk
                    .hex(Colors.LIGHTER_GREEN)
                    .bold(`Hello, ${chalk
                    .hex(Colors.LIGHT_GREEN)
                    .bold(currStudent.name)}. Choose courses: `),
                choices: Object.values(Courses).map((course) => ({
                    name: course,
                    value: course,
                    checked: currStudent.courses.find((stdCourse) => stdCourse === course),
                })),
            },
        ]);
        currStudent.courses = coursesNames.courses;
    }
}
async function promptViewBalance() {
    console.clear();
    const studentId = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Enter ID: ",
        },
    ]);
    const currStudent = studentManager.getStudentById(studentId.id);
    if (currStudent) {
        console.clear();
        currStudent.viewBalance();
        await inquirer.prompt({
            name: "go",
            type: "list",
            message: "Go to Home Page :",
            choices: ["Go"],
        });
    }
}
async function promptShowStatus() {
    console.clear();
    const studentId = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Enter ID: ",
        },
    ]);
    const currStudent = studentManager.getStudentById(studentId.id);
    if (currStudent) {
        console.clear();
        currStudent.showStatus();
        await inquirer.prompt({
            name: "go",
            type: "list",
            message: "Go to Home Page :",
            choices: ["Go"],
        });
    }
}
async function promptRemoveStudent() {
    console.clear();
    const studentId = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Enter ID: ",
        },
    ]);
    studentManager.removeStudent(studentId.id);
}
var Courses;
(function (Courses) {
    Courses["BLOCKCHAIN"] = "Blockchain";
    Courses["ARTIFICIALINTELLIGENCE"] = "Artificial Intelligence";
    Courses["CLOUDCOMPUTING"] = "Cloud Computing";
})(Courses || (Courses = {}));
var Commands;
(function (Commands) {
    Commands["ADD"] = "Add Student";
    Commands["PAYFEES"] = "Pay Student Fees";
    Commands["ENROLLCOURSE"] = "Enroll Course";
    Commands["BALANCE"] = "View Balance";
    Commands["SHOW"] = "Show Status";
    Commands["REMOVE"] = "Remove Student";
    Commands["Exit"] = "Exit";
})(Commands || (Commands = {}));
async function main() {
    showStudents();
    const answer = await inquirer.prompt([
        {
            name: "command",
            type: "list",
            message: chalk.hex(Colors.LIGHT_GREEN).bold("Choose an option"),
            choices: Object.values(Commands).map((command) => command === "Exit" ? chalk.red("Exit") : command),
        },
    ]);
    switch (answer.command) {
        case Commands.ADD:
            await promptAdd();
            main();
            break;
        case Commands.PAYFEES:
            await promptPayFees();
            main();
            break;
        case Commands.ENROLLCOURSE:
            await promptEnrollCourses();
            main();
            break;
        case Commands.BALANCE:
            await promptViewBalance();
            main();
            break;
        case Commands.SHOW:
            await promptShowStatus();
            main();
            break;
        case Commands.REMOVE:
            await promptRemoveStudent();
            main();
            break;
        case Commands.Exit:
            process.exit();
    }
}
main();
