-- Users table seeds here (Example)
INSERT INTO users (name, username, password, avatar_url)
VALUES ('Alice','alice sue', 'password1' ,'/images/av1.png'),
('Bob', 'BobSmith', 'password','/images/av2.png'),
('Sam', 'samSmith', 'password2', '/images/av3.png'),
('Tony', 'tonySmith', 'password3','/images/av4.png');

INSERT INTO stories (title, content, closed, user_id)
VALUES ('Breez', 'beautiful weather', true, 1),
('weather', 'nice weather', true, 2),
('hot', 'hot weather', true, 3),
('cold', 'cold weather', true, 4),
('nice', 'warm weather', false, 4);
