const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const AdminBillController = require("../../controller/admin/AdminBillController");
const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleware, AdminBillController.updateBill);
router.post(
  `/order/getCustomerOrders`,
  requireSignin,
  adminMiddleware,
  AdminBillController.getCustomerOrders
);

module.exports = router;