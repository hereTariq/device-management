import httpStatus from "http-status";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import {
  registerDeviceService,
  getDevicesService,
  getSingleDeviceService,
  updateDeviceService,
  deleteDeviceService,
  heartbeatService,
} from "../services/deviceService.js";

export const registerDevice = catchAsyncError(async (req, res) => {
  const device = await registerDeviceService(req.body, req.user);
  res.status(httpStatus.CREATED).json({ success: true, device });
});

export const getDevices = catchAsyncError(async (req, res) => {
  const devices = await getDevicesService(req.query, req.user);
  res.status(httpStatus.OK).json({ success: true, devices });
});

export const getSingleDevice = catchAsyncError(async (req, res) => {
  const device = await getSingleDeviceService(req.params.id);
  res.status(httpStatus.OK).json({ success: true, device });
});

export const updateDevice = catchAsyncError(async (req, res) => {
  const device = await updateDeviceService(req.params.id, req.body, req.user);
  res.status(httpStatus.OK).json({ success: true, device });
});

export const deleteDevice = catchAsyncError(async (req, res) => {
  await deleteDeviceService(req.params.id, req.user);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Device deleted successfully.",
  });
});

export const heartbeat = catchAsyncError(async (req, res) => {
  const device = await heartbeatService(req.params.id, req.user);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Device heartbeat recorded.",
    last_active_at: device.last_active_at,
  });
});
