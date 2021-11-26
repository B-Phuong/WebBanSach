const express = require("express");
const { requireSignin, adminMiddleware, superAdminAndAdminMiddleware } = require("../../common-middleware");
const AdminBillController = require("../../controller/admin/AdminBillController");
const router = express.Router();

router.post(`/order/update`, requireSignin, superAdminAndAdminMiddleware, AdminBillController.updateBill);
router.get(
  `/order/getCustomerOrders`,
  requireSignin,
  superAdminAndAdminMiddleware,
  AdminBillController.getCustomerOrders
);

module.exports = router;