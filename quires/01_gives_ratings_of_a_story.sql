SELECT rating FROM ratings
JOIN stories ON stories.id = story_id
WHERE stories.title = 'Breez';
