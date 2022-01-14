const db = require("./db");
const inquirer = require("inquirer");
// const { viewAllEmployees, addDepartment } = require("./db");
require("console.table");
const VIEW_ALL_EMPLOYEES = "View all Employees";
const ADD_EMPLOYEE = "Add Employee";
const UPDATE_EMPLOYEE_ROLE = "Update Employee Role";
const VIEW_ALL_ROLES = "View All Roles";
const ADD_ROLE = "Add Role";
const VIEW_ALL_DEPARTMENTS = "View All Departments";
const ADD_DEPARTMENT = "Add Department";

// to view info use SELECT * FROM (tables name)
async function init() {
  const { initQuestion } = await inquirer.prompt([
    {
      type: "list",
      name: "initQuestion",
      message: "What would you like to do?",
      choices: [
        VIEW_ALL_EMPLOYEES,
        ADD_EMPLOYEE,
        UPDATE_EMPLOYEE_ROLE,
        VIEW_ALL_ROLES,
        ADD_ROLE,
        VIEW_ALL_DEPARTMENTS,
        ADD_DEPARTMENT,
      ],
    },
  ]);
  switch (initQuestion) {
    case VIEW_ALL_EMPLOYEES:
      await getAllEmployees();
      init();
      break;
    case VIEW_ALL_ROLES:
      console.log("hitting the case");
      await getAllRoles();
      init();
      break;
    case VIEW_ALL_DEPARTMENTS:
      await getAllDepartments();
      init();
      break;
    case ADD_EMPLOYEE:
      await addEmployee();
      init();
      break;
    case ADD_ROLE:
      await addRole();
      init();
      break;
    case ADD_DEPARTMENT:
      await addDept();
      init();
      break;
    case UPDATE_EMPLOYEE_ROLE:
      await editEmployeeRole();
      init();
      break;
  }
}

async function getAllEmployees() {
  const data = await db.viewAllEmployees();
  console.table(data);
}

async function getAllRoles() {
  console.log("Getting Roles");
  const data = await db.viewAllRoles();
  console.table(data);
}

async function getAllDepartments() {
  const data = await db.viewAllDepartments();
  console.table(data);
}

async function editEmployeeRole() {
  const employees = await db.getEmployees();
  const roles = await db.getRoles();
  const employeeChoices = await employees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
  const rolesChoices = await roles.map(({ role_name, id }) => ({
    name: role_name,
    value: id,
  }));
  const { userChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "userChoice",
      message: "Which Employee would you like to update?",
      choices: employeeChoices,
    },
  ]);
  const userChoiceName = await employeeChoices.filter(
    ({ value }) => value === userChoice
  );
  const { userChoiceRole } = await inquirer.prompt([
    {
      type: "list",
      name: "userChoiceRole",
      message: `Which Role would you like to give ${userChoiceName.name}?`,
      choices: rolesChoices,
    },
  ]);
  db.updateEmployeeRole(userChoiceRole, userChoice);
}

async function addDept() {
  const { dept } = await inquirer.prompt([
    {
      type: "input",
      name: "dept",
      message: "What is the name of the department?",
    },
  ]);
  await db.addDepartment(dept);
}

async function addRole() {
  const departments = await db.getDepartments();
  const deptChoices = await departments.map(({ id, department_name }) => ({
    name: department_name,
    value: id,
  }));
  const { name, salary, dept } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the Salary of the role?",
    },
    {
      type: "list",
      name: "dept",
      message: "What is the Employee's role?",
      choices: deptChoices,
    },
  ]);
  await db.addRole(name, salary, dept);
}

async function addEmployee() {
  const roles = await db.getRoles();
  const rolesChoices = await roles.map(({ role_name, id }) => ({
    name: role_name,
    value: id,
  }));
  const employees = await db.getEmployees();
  const employeeChoices = await employees.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id,
    };
  });
  const { firstName, lastName, role, manager } = await inquirer.prompt([
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
      name: "role",
      message: "What is the Employee's role?",
      choices: rolesChoices,
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the Employee's Manager?",
      choices: employeeChoices,
    },
  ]);
  db.addEmployee(firstName, lastName, role, manager);
}

init();
