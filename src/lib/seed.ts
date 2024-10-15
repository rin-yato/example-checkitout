import { db } from "./db";

// reset the database
db.exec(`
DROP TABLE IF EXISTS students;
`);

// create a student table
db.exec(`
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  paid INTEGER NOT NULL DEFAULT 0
);
`);

// insert some students
db.exec(`
INSERT INTO students (name, phone, address) VALUES
('Thean', '012345678', 'Sichuan'),
('Ave', '098765432', 'Bassac Lane'),
('Misery', '088776655', 'Siem Reap'),
('Yato', '011223344', 'Phnom Penh');
`);

console.log("🌱 Seeding completed! ✅");
