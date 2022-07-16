const db = require('./db/connection');
const cTable = require('console.table');
var inquirer = require('inquirer');
const mysql = require('mysql2');
const { unsubscribe } = require('./routes/apiRoutes/departmentsRoutes');

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

const promptUpdateRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Please enter the id of the employee'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Please enter the new role for the employee'
    }
  ])
}

const promptAddDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please enter the name for the department',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a name');
          return false;
        }
      }
    }
  ])
}

const promptAddRole = ( => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Please enter the title for the role',
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log('Please enter a title');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Please enter the id for the department',
      validate: department_idInput => {
        if (department_idInput) {
          return true;
        } else {
          console.log('Please enter an integer for the department id');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Please enter the salary for this role',
      validate: salaryInput => {
        if (salaryInput) {
          return true;
        } else {
          console.log('Please enter an salary for this role');
          return false;
        }
      }
    }
  ])
})

const promptEmployee = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: "Enter the employee's first name",
      validate: first_nameInput => {
        if (first_nameInput) {
          return true;
        } else {
          console.log('Please enter a first name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: "Enter the employee's last name",
      validate: last_nameInput => {
        if (last_nameInput) {
          return true;
        } else {
          console.log('Please enter a last name');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'role_id',
      message: "Enter the employee's role id",
      validate: role_idInput => {
        if (role_idInput) {
          return true;
        } else {
          console.log('Please enter an integer for the role id');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Please enter the id of the manager'
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

function viewAllRoles() {
  db.query(
    'SELECT roles.*, departments.name AS departments_name FROM departments LEFT JOIN roles ON roles.department_id = departments.id', function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      prompt();
    });
}

function viewAllDepartments() {
  db.query(
    'SELECT * from departments', function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      prompt();
    });
}

function promptAddRoleHandler(userData) {
  const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
    const params = [
        userData.title,
        userData.salary,
        userData.department_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log("You successfully added the role of" + userData.title);
        prompt();
    });
}

function promptEmployeeHandler(userData) {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [
    userData.first_name,
    userData.last_name,
    userData.role_id,
    userData.manager_id
  ];
  db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log(userData.last_name + " was successfully added");
    prompt();
});
}

function promptUpdateRoleHandler(userData) {
  const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
  const params = [userData.role_id, userData.employee_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      throw err;
    } else if (!result.affectedRows) {
      console.log('employee not found');
    } else {
      console.log(userData.employee_id + "has been updated");
    }
    prompt();
  });
}

function promptAddDepartmentHandler(userData) {
  const sql = 'INSERT INTO departments (name) VALUES (?)';
  const params = [userData.name];
  db.query(sql, params, (err, result) => {
      if (err) throw err;
      console.log("You have successfully added " + userData.name)
      prompt();
  });
}

function addRole() {
  promptAddRole()
    .then(userData => {
      promptAddRoleHandler(userData)
    })
    .catch((error) => {
      console.log(error)
    })
}

function addDepartment() {
  promptAddDepartment()
  .then(userData => {
    promptAddDepartmentHandler(userData)
  })
  .catch((error) => {
    console.log(error)
  })
}

function addEmployee() {
  promptEmployee()
    .then(userData => {
        promptEmployeeHandler(userData)
    })
    .catch((error) => {
      console.log(error)
    })
}

function updateEmployeeRole() {
  promptUpdateRole()
    .then(userData => {
      promptUpdateRoleHandler(userData)
})
  .catch((error) => {
    console.log(error)
  })
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
      process.exit();
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