const express = require("express");
const { requireSignin, adminMiddleware, superAdminAndAdminMiddleware, superAdminMiddleware } = require("../../common-middleware");
const AdminBillController = require("../../controller/admin/AdminBillController");
const router = express.Router();

router.post(`/order/update`, requireSignin, superAdminMiddleware, AdminBillController.updateBill);
router.post(
  `/order/getCustomerOrders`,
  requireSignin,
  superAdminMiddleware,
  AdminBillController.getCustomerOrders
);

module.exports = router;