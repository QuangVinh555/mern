const express = require('express');
const router = express.Router();
const postController = require('../controller/PostController');
const veryfiToken = require('../middleware/auth');

router.post('/create', veryfiToken, postController.create);
router.put('/:id', veryfiToken, postController.update);
router.delete('/:id', veryfiToken, postController.delete);
router.get('/',veryfiToken, postController.get);

module.exports = router;