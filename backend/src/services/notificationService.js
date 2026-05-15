const Notification = require("../models/Notification");

const createNotification = async ({ user, message, type = "info" }) => {
  return await Notification.create({
    user,
    message,
    type
  });
};

module.exports = { createNotification };