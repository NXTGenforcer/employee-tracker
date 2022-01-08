const db = require("./db");
const inquirer = require("inquirer");
const { viewAllEmployees, addDepartment } = require("./db");
const connection = require("./db/connection");
require("console.table");

// to view info use SELECT * FROM (tables name)
async function init() {
  const { initQuestion } = await inquirer.prompt([
    {
      type: "list",
      name: "initQuestion",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
      ],
    },
  ]);
  switch (initQuestion) {
    case "View all Employees":
      getAllEmployees();
      break;
    case "View all Roles":
      getAllRoles();
      break;
    case "View all Departments":
      getAllDepartments();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Add Role":
      addRole();
      break;
    case "addDepartment":
      addDepartment();
      break;
  }
  init();
}

async function getAllEmployees() {
  const data = await db.viewAllEmployees();
  console.table(data);
}

async function getAllRoles() {
  const data = await db.viewAllRoles();
  console.table(data);
}

async function getAllDepartments() {
  const data = await db.viewAllDepartments();
  console.table(data);
}

async function editEmployee() {
  const employees = await db.viewAllEmployees();
  const roles = await db.viewAllRoles();
  const employeeChoices = await employees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
  const roles = await roles.map(({ role_name, id }) => ({
    name: role_name,
    value: id,
  }));
  const { userChoice } = inquirer.prompt([
    {
      type: "list",
      name: "userChoice",
      message: "Which Employee would you like to update?",
      choices: employeeChoices,
    },
  ]);
  const userChoiceName = employeeChoices.filter(
    ({ value }) => value !== userChoice
  );
  console.log(userChoiceName);
  const { userChoiceRole } = inquirer.prompt([
    {
      type: "list",
      name: "userChoiceRole",
      message: `Which Role would you like to give ${userChoiceName.name}?`,
      choices: employeesChoices,
    },
  ]);
  employee.role_id = userChoiceRole;
}

async function addDepartment() {
  const { userChoice } = inquirer.prompt([
    {
      type: "input",
      name: "userChoice",
      message: "What is the name of the department?",
    },
  ]);
  await db.addDepartment(userChoice);
}

async function addRole() {
  const { userChoice } = inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the name of the role?",
    },
  ]);
  await db.addRole(userChoice.name, userChoice.salary);
}

async function addEmployee() {
  const departments = await db.viewAllDepartments();
  const filteredRoles = departments.filter(({ id }) => id !== userChoice);
  const { userChoice } = inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the Employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the Employee's last name?",
    },
    {
      type: "list",
      name: "department",
      message: "What is the Employee's department?",
      choices: [departments],
    },
    {
      type: "list",
      name: "role",
      message: "What is the Employee's role?",
      choices: [filteredRoles],
    },
  ]);
  db.addEmployee(
    userChoice.firstName,
    userChoice.lastName,
    userChoice.department,
    userChoice.role
  );
}
