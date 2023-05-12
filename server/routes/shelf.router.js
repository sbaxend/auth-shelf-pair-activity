const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    let queryText = `SELECT * FROM "item"`;
    pool.query(queryText).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403)
  }

});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    let itemToAdd = req.body;
    console.log(itemToAdd);
    let queryText = 'INSERT INTO "item" ("description", "image_url", "user_id") VALUES ($1, $2, $3);';
    pool.query(queryText, [itemToAdd.description, itemToAdd.image_url, req.user.id])
      .then(result => {
        res.sendStatus(200);
      }).catch(error => {
        console.log(`Error in post: ${error}`);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403)
  }
  // endpoint functionality
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
  if (req.isAuthenticated()) {
    const queryText = 'DELETE FROM "item" WHERE "id" = $1'
    pool.query(queryText, [req.params.id]).then(() => { res.sendStatus(200) }).catch((err) => {
      console.log('Error completing DELETE item query', err);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403)
  }
});

module.exports = router;
