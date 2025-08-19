import Device from "../models/device.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerDeviceService = async (deviceData, user) => {
  deviceData.owner_id = user.sub;
  deviceData.last_active_at = deviceData.status === "active" ? new Date() : null;
  return await Device.create(deviceData);
};

export const getDevicesService = async (query, user) => {
  const filter = {};
  const { type, status } = query;

  if (type) filter.type = type;
  if (status) filter.status = status;
  if (user.role !== "admin") filter.owner_id = user.sub;

  return await Device.find(filter).populate({
    path: "owner_id",
    select: "name email",
  });
};

export const getSingleDeviceService = async (deviceId) => {
  if (!deviceId) throw new ErrorHandler(400, "Device Id is required.");
  return await Device.findById(deviceId).populate({
    path: "owner_id",
    select: "name email",
  });
};

export const updateDeviceService = async (deviceId, updateData, user) => {
  if (!deviceId) throw new ErrorHandler(400, "Device Id is required.");

  const filter = { _id: deviceId };
  if (user.role !== "admin") filter.owner_id = user.sub;

  return await Device.findOneAndUpdate(filter, updateData, { new: true });
};

export const deleteDeviceService = async (deviceId, user) => {
  if (!deviceId) throw new ErrorHandler(400, "Device Id is required.");

  const filter = { _id: deviceId };
  if (user.role !== "admin") filter.owner_id = user.sub;

  const update = { is_deleted: true, deleted_at: new Date() };
  return await Device.findOneAndUpdate(filter, update, { new: true });
};

export const heartbeatService = async (deviceId, user) => {
  if (!deviceId) throw new ErrorHandler(400, "Device Id is required.");

  const filter = { _id: deviceId };
  if (user.role !== "admin") filter.owner_id = user.sub;

  const update = { last_active_at: new Date(), status: "active" };
  return await Device.findOneAndUpdate(filter, update, { new: true });
};
