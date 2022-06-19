INSERT INTO departments
    (name)
VALUES
    ('Purchasing'),
    ('Engineering'),
    ('Maintenance'),
    ('Marketing');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('President', 7000000, 2),
    ('Vice President', 350000, 2),
    ('Hiring Manager', 200000, 2),
    ('Flunkie', 70000, 2),
    ('President', 5000000, 1),
    ('Vice President', 250000, 1),
    ('Hiring Manager', 100000, 1),
    ('Flunkie', 50000, 1),
    ('President', 2000000, 3),
    ('Vice President', 150000, 3),
    ('Hiring Manager', 100000, 3),
    ('Flunkie', 30000, 3),
    ('President', 10000000, 4),
    ('Vice President', 500000, 4),
    ('Hiring Manager', 900000, 4),
    ('Flunkie', 90000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Bethany', 'Griffin', 1),
    ('Lamar', 'Griffin', 2, 1),
    ('Janine', 'Smith', 3, 1),
    ('Marcelo', 'Tordero', 4, 2),
    ('Daniel', 'Ratcliffe', 4, 2),
    ('Kermit', 'Frog', 5),
    ('Gonzo', 'Wierdo', 6, 6),
    ('Piggy', 'Piggy', 7, 6),
    ('Scooter', 'Frog', 8, 7),
    ('Camilla', 'Chicken', 8, 7),
    ('Big', 'Bird', 9),
    ('Oscar', 'Grouch', 10, 11),
    ('Snuffy', 'Imaginary', 11, 11),
    ('Super', 'Grover', 12, 13),
    ('Sweetums', 'Monster', 13),
    ('Sam', 'Eagle', 14, 15),
    ('Bert', 'Henson', 14, 15),
    ('Ernie', 'Henson', 15, 14),
    ('Bobo', 'Baggins', 16, 14),
    ('Red', 'Fraggle', 16, 14);

