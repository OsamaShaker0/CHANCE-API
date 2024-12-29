const express = require('express');
const {
  getChances,
  getChance,
  addChance,
  updateChance,
  deleteChance,
} = require('../controllers/chance');
const { protect, authorize } = require('../middlewares/auth');
const router = express.Router();

router.route('/').get(getChances).post(protect,addChance);
router.route('/:id').get(getChance);

module.exports = router;
//FIXME - do not forget to add authrize to all routes 