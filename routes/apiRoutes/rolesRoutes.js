const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//get all roles
router.get('/roles', (req, res) => {
    const sql = 'SELECT roles.*, departments.name AS departments_name FROM departments LEFT JOIN roles ON roles.department_id = departments.id';

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//add a role
router.post('/roles', ({ body }, res) => {
    const errors = inputCheck(
        body, 
        'title',
        'salary',
        'department_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = 'INSTERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
    const params = [
        body.title,
        body.salary,
        body.department_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

module.exports = router;