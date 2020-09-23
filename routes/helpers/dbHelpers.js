
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../../lib/db.js');
const db = new Pool(dbParams);

/// Users

/**
 * Gets a single user from the database given their username.
 * @param {String} username The username of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserId = function (username) {
  return db.query(`SELECT id FROM users
  WHERE users.username = $1;`, [username])
  .then(res => res.rows[0])
}
exports.getUserId = getUserId;


/**
 * Add a new user to the database.
 * @param {{name: string, username: string, password: string, avatar_url}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  console.log("USER dbHELPER" ,user);
  return db.query (`
  INSERT INTO users(name, username, password, avatar_url)
  VALUES ($1, $2, $3, $4)
  RETURNING *`, [user.name, user.username, user.password, user.avatar_url])
  .then(res => res.rows[0])
}
exports.addUser = addUser;



/// Stories


/**
 * Get a single story_rating from the database given their title.
 * @param {string} title The id of the user.
 * @return {Promise<{}>} A promise to the story_rating.
 */
const getRatingsForStory = function(title) {
  return db.query(`SELECT rating FROM ratings
  JOIN stories ON stories.id = story_id
  WHERE stories.title = $1;`, [title])
  .then(res => res.rows[0])
}
exports.getRatingsForStory = getRatingsForStory;


/**
 * Gets the status of a story from the database given their closed status.
 * @param {boolean} closed The status of the story.
 * @return {Promise<{}>} A status of the story.
 */
const getStatusOfAStory = function (closed) {
  return db.query(`SELECT title FROM stories
  WHERE closed = $1;`, [closed])
  .then(res => res.rows[0])
}
exports.getStatusOfAStory = getStatusOfAStory;


/**
 * Return id of the creator of a story
 * @param {string} title The id of the user.
 * @return {Promise<{}>} A promise to the the id of the creator of the sotry.
 */
const getCreatorOfAStory = (title) => {
  return db.query(`SELECT users.id From users
  JOIN stories ON users.id = user_id
  WHERE stories.title LIKE '%$1%'
  LIMIT 1;`, [title] )
  .then(res => res.rows[0])

}
exports.getCreatorOfAStory = getCreatorOfAStory;


/**
 * Adds a new story to the database.
 * @param {{title: string, content: string, created_at: Date, closed: boolean, user_id:integer}} story
 * @return {Promise<{}>} A promise to the story.
 */
const addStory = function(story) {
  return db.query (`
  INSERT INTO stories(title, content, created_at, closed, user_id )
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *`, [story.title, story.content, story.created_at, story.closed, story.user_id])
  .then(res => res.rows[0])
}
exports.addStory = addStory;

/**
 * Adds a new story to the database.
 * @param {{title: string, content: string, created_at: Date, closed: boolean, user_id:integer}} story
 * @return {Promise<{}>} A promise to the story.
 */
const addProspects = function(prospect) {
  if (!getStatusOfAStory) {
  return db.query (`
  INSERT INTO prospects(content, created_at, user_id, story_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *`, [prospect.content, prospect.created_at, prospect.user_id, prospect.story_id])
  .then(res => res.rows[0])
  }
}
exports.addProspects = addProspects;

/**
 * Gets stroies based on userID.
 * @param {number} id The id of the user.
 * @return {Promise<{}>} A promise to a user's stories.
 */

const getStoriesById = (id) => {
  return db.query (`
  SELECT title, content
  FROM stories WHERE user_id = $1`, [id])
  .then(res => res.rows[0])
}
exports.getStoriesById = getStoriesById;


/**
 * Creator of a story can update the story by choosing a contributor's sotry.
 * @param {String} content content from a contributor.
 * @return {Promise<{}>} A promise to update a creator's story.
 */
const updateStory = (options, title) => {
return db.query(`INSERT INTO stories(title, content, user_id)
SELECT $2 ,prospects.content, prospects.user_id FROM  prospects
WHERE prospects.content LIKE '%$1%';`, [options, title])
.then(res => res.rows[0])
}
exports.updateStory = updateStory;


