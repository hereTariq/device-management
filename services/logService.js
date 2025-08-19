import mongoose from "mongoose";
import moment from "moment";
import LogModel from "../models/logs.js";
import Device from "../models/device.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createLogEntryService = async (deviceId, logData) => {
  if (!deviceId) throw new ErrorHandler(400, "Device Id is required.");

  const device = await Device.findOne({ is_deleted: false, _id: deviceId });
  if (!device) throw new ErrorHandler(404, "Device does not exist.");

  logData.device_id = deviceId;
  return await LogModel.create(logData);
};

export const fetchLatestLogsService = async (deviceId, limit = 10) => {
  if (!deviceId) throw new ErrorHandler(400, "Device Id is required.");

  return await LogModel.find({ device_id: deviceId }).sort({ timestamp: -1 }).limit(limit);
};

function handleRange(range) {
  const match = range.match(/^(\d+)([smhdwMy])$/);
  // s=seconds, m=minutes, h=hours, d=days, w=weeks, M=months, y=years
  let fromDate;
  if (match) {
    const amount = parseInt(match[1], 10);
    const unit = match[2];
    fromDate = moment().subtract(amount, unit).toDate();
  } else {
    fromDate = moment().subtract(24, "hours").toDate();
  }
  return fromDate;
}

export const getLogsInRangeService = async (deviceId, range = "24h") => {
  if (!deviceId) throw new ErrorHandler(400, "Device Id is required.");

  const fromDate = handleRange(range);
  const dynamicFieldName = `total_units_last_${range}`;

  const logs = await LogModel.aggregate([
    {
      $match: {
        device_id: new mongoose.Types.ObjectId(deviceId),
        timestamp: { $gte: fromDate },
      },
    },
    {
      $group: {
        _id: "$device_id",
        [dynamicFieldName]: { $sum: "$value" },
      },
    },
    {
      $project: {
        _id: 0,
        device_id: "$_id",
        [dynamicFieldName]: 1,
      },
    },
  ]);

  return logs;
};
