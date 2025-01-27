import express from "express";

import {
  createApprovalRequest,
  getAllApprovalRequests,
  updateApprovalType,
  deleteApprovalRequest,
} from "../controller/approvalController.js";

const route = express.Router();

route.post("/approval", createApprovalRequest); // Endpoint to create a new approval request
route.get("/approvals", getAllApprovalRequests); // Endpoint to retrieve all approval requests
route.put("/updateApproval", updateApprovalType); // Endpoint to update an approval request by ID
route.delete("/delete/approval/:id", deleteApprovalRequest); // Endpoint to delete an approval request by ID

export default route;
