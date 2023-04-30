
-- Add SQL in this file to create the database tables for your API
CREATE TABLE IF NOT EXISTS rates (
  id INTEGER PRIMARY KEY,
  time_stamp TEXT NOT NULL,
  price TEXT NOT NULL,
  spl_day TEXT NOT NULL
);
