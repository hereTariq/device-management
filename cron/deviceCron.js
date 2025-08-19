import cron from "node-cron";
import moment from "moment";
import Device from "../models/device.js";

cron.schedule("0 * * * *", async () => {
  try {
    const last24Hours = moment().subtract(24, "hours").toDate();
    const filter = { last_active_at: { $lt: last24Hours }, status: "active" };
    const update = { $set: { status: "Inactive" } };

    const result = await Device.updateMany(filter, update);
    console.log(
      `[CRON] Auto-deactivated ${result.modifiedCount} devices at ${new Date()}`
    );
  } catch (error) {
    console.error("[CRON] Auto-deactivation failed:", error);
  }
});
