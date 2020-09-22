-- Users table seeds here (Example)
INSERT INTO users (name, username, password, avatar_url)
VALUES ('Alice','alice sue', 'password1' ,'pic'),
('Bob', 'BobSmith', 'password','pic'),
('Sam', 'samSmith', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u', 'pic'),
('Tony', 'tonySmith', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u','pic');

INSERT INTO stories (title, content, closed, user_id)
VALUES ('Breez', 'beautiful weather', true, 1),
('weather', 'nice weather', true, 2),
('hot', 'hot weather', true, 3),
('cold', 'cold weather', true, 4),
('nice', 'warm weather', false, 4);
