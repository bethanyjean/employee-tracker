const db = require('./db/connection');
const cTable = require('console.table');
var inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});

const promptUser =  () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
            default: 0
        }
    ])
};

function viewEmployees() {
  db.query(
    `SELECT employee1.first_name, employee1.last_name, 
    roles.title AS title, 
    roles.salary AS salary,
    departments.name AS department_name,
    CONCAT(manager.first_name, ' ', manager.last_name) as manager
    FROM employees employee1
    LEFT JOIN roles 
    ON employee1.role_id = roles.id
    JOIN departments 
    ON roles.department_id = departments.id
    JOIN employees manager
    ON manager.id = employee1.manager_id`, function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      prompt();
    });
}

function promptHandler(request) {
  console.log(request)
  switch (request) {
    case 'View All Employees':
      viewEmployees();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'Update Employee Role':
      updateEmployeeRole();
      break;
    case 'View All Roles':
      viewAllRoles();
      break;
    case 'Add Role':
      addRole();
      break;
    case 'View All Departments':
      viewAllDepartments();
      break;
    case 'Add Department':
      addDepartment();
      break;
    case 'Quit':
  };
}

function prompt() {
    promptUser()
    .then(userData => {
        promptHandler(userData.request)
    })
    .catch((error) => {
      console.log(error)
    })
};

prompt();