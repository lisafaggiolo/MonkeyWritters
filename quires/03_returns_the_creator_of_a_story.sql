SELECT users.name From users
JOIN stories ON users.id = user_id
WHERE stories.title LIKE '%weather%'
LIMIT 1;
