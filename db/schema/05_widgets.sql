-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS prospects CASCADE;


CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  rating SMALLINT NOT NULL,
  date_rated DATE DEFAULT Now(),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id)ON DELETE CASCADE

);

CREATE TABLE prospects (
  id SERIAL PRIMARY KEY NOT NULL,
  content TEXT NOT NULL,
  created_at DATE DEFAULT Now(),
  votes INTEGER DEFAULT 0,
  approved INTEGER DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id)ON DELETE CASCADE

);
