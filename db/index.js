const connection = require("./connection");

module.exports = {
  viewAllEmployees() {
    return connection.query(
      "SELECT employee.id AS id, employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.role_name AS Title, role.salary AS Salary, department.department_name AS Department, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id"
    );
  },
  getEmployees() {
    return connection.query("SELECT * FROM employee");
  },
  viewAllRoles() {
    return connection.query(
      "SELECT role.role_name AS Role, role.salary AS Salary, department.department_name AS Department FROM role LEFT JOIN department ON role.department_id = department.id"
    );
  },
  getRoles() {
    return connection.query("SELECT * FROM role");
  },
  viewAllDepartments() {
    return connection.query(
      "SELECT department.department_name AS Departments FROM department"
    );
  },
  getDepartments() {
    return connection.query("SELECT * FROM department");
  },
  addRole(role_name, salary, dept) {
    return connection.query(
      "INSERT INTO role (role_name, salary, department_id) VALUES (?, ?, ?)",
      [role_name, salary, dept]
    );
  },
  addDepartment(department_name) {
    return connection.query(
      "INSERT INTO department (department_name) VALUES(?)",
      [department_name]
    );
  },
  addEmployee(first_name, last_name, role_id, manager_id) {
    return connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",
      [first_name, last_name, role_id, manager_id]
    );
  },
  updateEmployeeRole(role_id, employee_id) {
    return connection.query(
      "UPDATE employee SET employee.role_id = ? WHERE employee.id = ?",
      [role_id, employee_id]
    );
  },
};
