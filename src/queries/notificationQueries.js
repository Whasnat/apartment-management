// src/queries/notificationQueries.js

// Insert a notification
const insertNotification = `
    INSERT INTO notifications (user_id, message)
    VALUES ($1, $2)
    RETURNING id, message, created_at;
`;

module.exports = {
    insertNotification,
};
