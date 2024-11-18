/**
 * Defines routes related to the Request resource and handles HTTP requests for request-related operations.
 */

const express = require('express');
const router = express.Router();
const RequestModel = require('../models/Request');

// Get all requests
router.get('/', async (_req, res) => {
  try {
    const requests = await RequestModel.findAll();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests', error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching requests' });
  }
});

router.get('/:userEmail', async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const requestsForUser = await RequestModel.findAll({
      where: { userEmail },
    });
    res.status(200).json(requestsForUser);
  } catch (error) {
    console.error('Error fetching requests', error);
    res.status(500).json({
      error: 'An error occurred while fetching requests for user:' + userEmail,
    });
  }
});
module.exports = router;
