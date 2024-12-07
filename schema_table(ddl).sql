CREATE TABLE membership (
  id SERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  password TEXT NOT NULL,
  fileName_image TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true
)