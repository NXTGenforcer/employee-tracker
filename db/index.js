const connection = require("./connection");

module.exports = {
  viewAllEmployees() {
    return connection.query("SELECT * FROM EMPLOYEE");
  },
  viewAllRoles() {
    return connection.query("SELECT * FROM ROLE");
  },
  viewAllDepartments() {
    return connection.query("SELECT * FROM ROLE");
  },
  addRole() {
    return connection.query("INSERT INTO ROLE(role_name, salary)");
  },
  addDepartment() {
    return connection.query("INSERT INTO DEPARTMENT(department_name)");
  },
  addEmployee() {
    return connection.query(
      "INSERT INTO EMPLOYEE(first_name, last_name, role_id, manager_id)"
    );
  },
};
