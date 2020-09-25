-- Users table seeds here (Example)
INSERT INTO users (name, username, password, avatar_url)
VALUES ('Alice','alice sue', 'password1' ,'/images/av1.png'),
('Bob', 'BobSmith', 'password','/images/av2.png'),
('Sam', 'samSmith', 'password2', '/images/av3.png'),
('Tony', 'tonySmith', 'password3','/images/av4.png');

INSERT INTO stories (title, content, closed, user_id)
VALUES ('Jack’s story', 'Jack’s mother can make paper animals come to life. In the beginning, Jack loves them and spends hours with his mom. But as soon as he grows up he stops talking to her since she is unable to converse in English.', true, 1),
('Timmy Willie', 'Timmie Willie is a country mouse who is accidentally transported to a city in a vegetable basket. ', true, 2),
('The Real 1%', 'Our society would be better much better off if we killed the worst 1% every year.. At least it is what they thought. Today is the hundredth anniversary of the 1% election, and the notion of the “worst” is getting really tricky.', false, 3),
('The Forties','In the year 2145, I live in a world where every single habitant of the Earth has their DNA carefully genetically designed for something to help the community. But I despises what I was created for and I cannot tell anyone.. This has never happened before.', false, 4),
('The greatest argument', 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort..', false, 4);
