const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

//get all departments
router.get('departments', (req, res) => {
    const sql = 'SELECT * from departments';

    db.query(sql, (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message});
        return;
        }
        res.json({
        message: 'success',
        data: rows
        });
    });
});

//add a department
router.post('/departments', ({body}, res) => {
    const errors = inputCheck(body, 'name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = 'INSTERT INTO departments (name) VALUES (?)';
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

//update a department
router.put('/departments/:id', (req, res) => {
    const errors = inputCheck(req.body, 'name');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
      }
    
      const sql = `UPDATE departments SET name = ? WHERE id = ?`;
      const params = [req.body.name, req.params.id];
    
      db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
          res.json({
            message: 'Department not found'
          });
        } else {
          res.json({
            message: 'success',
            data: req.body,
            changes: result.affectedRows
          });
        }
      });
});

module.exports = router;