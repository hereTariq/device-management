import httpStatus from "http-status";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import {
  createLogEntryService,
  fetchLatestLogsService,
  getLogsInRangeService,
} from "../services/logService.js";

export const createLogEntry = catchAsyncError(async (req, res) => {
  await createLogEntryService(req.params.id, req.body);
  res.status(httpStatus.CREATED).json({ success: true, message: "Log created successfully." });
});

export const fetchLatestLogs = catchAsyncError(async (req, res) => {
  const logs = await fetchLatestLogsService(req.params.id, req.query?.limit);
  res.status(httpStatus.OK).json({ success: true, logs });
});

export const getLast24HoursLogs = catchAsyncError(async (req, res) => {
  const logs = await getLogsInRangeService(req.params.id, req.query.range || "24h");
  res.status(httpStatus.OK).json({ success: true, logs });
});