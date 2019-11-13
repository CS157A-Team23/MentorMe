const bcrypt = require("bcrypt");
const _ = require("lodash");
const db = require("../modules/database");
const { validateID } = require("../modules/validation");
const { validateRating } = require("../models/Rates");
const { validateMent } = require("../models/Mentors");
const { User, validateUser, validateEmail } = require("../models/User");
const { alertNewChat } = require("../modules/socketHandler");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const tokenGen = require("../modules/authtoken");

/**
 * Get user's own information
 * GET request.
 * Provide JWT token
 * Response
 * {
 *      "id": [number],
 *      "first_name": [string],
 *      "last_name": [string],
 *      "email": [string],
 *      "interests": [ {topicid, name}, {}...],
 *      "skills": [{topicid, name, skill}, {}...],
 *      "rating": [float number],
 *      "ratingcount": [number]
 * }
 * */
router.get("/me", auth, async (req, res) => {
  const user = await db.query(
    `SELECT id, first_name, last_name, email 
        FROM user
        WHERE id = ?`,
    {
      replacements: [req.user.id],
      plain: true
    }
  );
  if (!user) return res.status(404).send("user not found");
  await getInterestSkillRating(user);
  res.send(user);
});

/**
 * Get all user mentors and mentees
 * GET Request.
 * Provide JWT token
 * Response.
 * [{id, name, relation}, {},...]
 */
router.get("/mentormentees", auth, async (req, res) => {
  // get mentors to user
  let [mentors, mentees] = await Promise.all([
    db.query(
      `SELECT mentor_id AS id, first_name AS name 
            FROM mentors JOIN user ON mentor_id=user.id
            WHERE mentee_id=? AND mentor_accepted=true AND mentee_accepted=true`,
      { replacements: [req.user.id], type: db.QueryTypes.SELECT }
    ),
    db.query(
      `SELECT mentee_id AS id, first_name AS name
            FROM mentors JOIN user ON mentee_id=user.id
            WHERE mentor_id=? AND mentor_accepted=true AND mentee_accepted=true`,
      { replacements: [req.user.id], type: db.QueryTypes.SELECT }
    )
  ]);
  mentors = mentors.map(mentor => {
    mentor.relation = "mentor";
    return mentor;
  });
  mentees = mentees.map(mentee => {
    mentee.relation = "mentee";
    return mentee;
  });
  res.send([...mentors, ...mentees]);
});

/**
 * Find another user's information by id include interest / skill/ rating
 * GET request.
 * Response
 * {
 *      "id": [number],
 *      "first_name": [string],
 *      "last_name": [string],
 *      "email": [string]
 *      "interests": [ {topicid, name}, {}...],
 *      "skills": [{topicid, name, skill}, {}...],
 *      "rating": [float number],
 *      "ratingcount": [number]
 * }
 * */
router.get("/id/:id", async (req, res) => {
  const { error } = validateID(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await db.query(
    `SELECT id, first_name, last_name, email 
        FROM user
        WHERE id = ?`,
    {
      replacements: [req.params.id],
      plain: true
    }
  );
  if (!user) return res.status(404).send("user not found");
  await getInterestSkillRating(user);
  res.send(user);
});

/**
 * Find another user's information by email include interest/ skill
 * GET request.
 * Response
 * {
 *      "id": [number],
 *      "first_name": [string],
 *      "last_name": [string],
 *      "email": [string]
 *      "interests": [ {topicid, name}, {}...],
 *      "skills": [{topicid, name, skill}, {}...],
 *      "rating": [float number],
 *      "ratingcount": [number]
 * }
 * */
router.get("/email/:email", async (req, res) => {
  const { error } = validateEmail(req.params.email);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await db.query(
    `SELECT id, first_name, last_name, email 
        FROM user
        WHERE email = ?`,
    {
      replacements: [req.params.email],
      plain: true
    }
  );
  if (!user) return res.status(404).send("user not found");
  await getInterestSkillRating(user);
  res.send(user);
});

/**
 * Rate another user
 * POST request.
 * {
 *      "rating": [number]
 * }
 * */
router.post("/rate/:id", auth, async (req, res) => {
  let joiResult = validateID(req.params.id);
  if (joiResult.error)
    return res.status(400).send(joiResult.error.details[0].message);
  joiResult = validateRating(req.body);
  if (joiResult.error)
    return res.status(400).send(joiResult.error.details[0].message);
  const user = await db.query(
    `SELECT id, first_name, last_name, email 
        FROM user
        WHERE id = ?`,
    {
      replacements: [req.params.id],
      plain: true
    }
  );
  if (!user) return res.status(404).send("user not found");
  const existRating = await db.query(
    `SELECT * FROM rates WHERE rater_id=? AND ratee_id=?`,
    { replacements: [req.user.id, user.id], plain: true }
  );
  if (existRating) {
    db.query(
      `UPDATE rates SET rating=?
            WHERE rater_id=? AND ratee_id=?`,
      {
        replacements: [req.body.rating, req.user.id, user.id],
        type: db.QueryTypes.UPDATE
      }
    );
    return res.send("Rating update");
  } else {
    db.query(
      `INSERT INTO rates (rating, rater_id, ratee_id)
            VALUES (?,?,?)`,
      {
        replacements: [req.body.rating, req.user.id, user.id],
        type: db.QueryTypes.INSERT
      }
    );
    return res.send("New rating created");
  }
});

/**----------------------------
 * Establish a mentor/mentee
 * POST Request.
 * {"id", "topicid", "asmentor":[boolean]}
 */
router.post("/setrelation", auth, async (req, res) => {
  // need other user, topic,
  const { error } = validateMent(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const { id: targetid, topicid, asmentor } = req.body;
  if (targetid === req.user.id)
    return res.status(400).send("Cannot target self");
  const user = await db.query(
    `SELECT id, first_name, last_name, email 
        FROM user
        WHERE id = ?`,
    {
      replacements: [targetid],
      plain: true
    }
  );
  if (!user) return res.status(404).send("user not found");
  const topic = await db.query(`SELECT * FROM topic WHERE id=?`, {
    replacements: [topicid],
    plain: true
  });
  if (!topic) return res.status(404).send("Topic not found");
  let mentor, mentee, accept;
  if (asmentor) {
    mentor = user.id;
    mentee = req.user.id;
    accept = "mentee_accepted";
  } else {
    mentor = req.user.id;
    mentee = user.id;
    accept = "mentor_accepted";
  }
  const relation = await db.query(
    `SELECT * FROM mentors
        WHERE topic_id=? AND mentor_id=? AND mentee_id=?`,
    { replacements: [topic.id, mentor, mentee], plain: true }
  );
  if (relation) {
    await db.query(
      `UPDATE mentors SET ${accept}=true 
            WHERE topic_id=? AND mentor_id=? AND mentee_id=?`,
      {
        replacements: [topic.id, mentor, mentee],
        type: db.QueryTypes.UPDATE
      }
    );
  } else {
    await db.query(
      `INSERT INTO mentors (topic_id, mentor_id, mentee_id, ${accept})
            VALUES (?,?,?,true)`,
      { replacements: [topic.id, mentor, mentee] }
    );
  }
  res.send("connection sent");
});

/**----------------------------
 * Remove a relation
 * {"id","topicid","asmentor"}
 */
router.post("/removerelation", auth, async (req, res) => {
  const { error } = validateMent(req.body);
  if (error) res.status(400).send(error.details[0].message);
  const { id: targetid, topicid, asmentor } = req.body;
  if (targetid === req.user.id)
    return res.status(400).send("Cannot target self");
  const user = await db.query(
    `SELECT id, first_name, last_name, email 
        FROM user
        WHERE id = ?`,
    {
      replacements: [targetid],
      plain: true
    }
  );
  if (!user) return res.status(404).send("user not found");
  const topic = await db.query(`SELECT * FROM topic WHERE id=?`, {
    replacements: [topicid],
    plain: true
  });
  if (!topic) return res.status(404).send("Topic not found");
  let mentor, mentee;
  if (asmentor) {
    mentor = user.id;
    mentee = req.user.id;
  } else {
    mentor = req.user.id;
    mentee = user.id;
  }
  await db.query(`DELETE FROM mentors WHERE mentor_id=? AND mentee_id=?`, {
    replacements: [mentor, mentee],
    type: db.QueryTypes.DELETE
  });
  res.send("relation deleted");
});

/**
 * Initiate Chat request with another user.
 * POST request.
 * Provide JWT token.
 * Will automatically alert chatbox to update if user is online
 * */
router.post("/:id/chat", auth, async (req, res) => {
  const user = await db.query(
    `SELECT id, first_name, last_name, email FROM user WHERE id = ?`,
    { replacements: [req.params.id], plain: true }
  );
  if (!user) return res.status(404).send("user not found");
  const chat = await db.query(
    `SELECT * FROM chat
        WHERE user1_id=? AND user2_id=? OR user1_id=? AND user2_id=?`,
    {
      replacements: [req.user.id, user.id, user.id, req.user.id],
      plain: true
    }
  );
  if (!chat) {
    const [chatid, success] = await db.query(
      `INSERT INTO chat(user1_id, user2_id)
            VALUES(?,?)`,
      { replacements: [req.user.id, user.id], type: db.QueryTypes.INSERT }
    );
    alertNewChat(req.user.id, chatid, user.first_name);
    alertNewChat(user.id, chatid, req.user.first_name);
    res.send(`Chat established with ${user.first_name}`);
  } else {
    res.send("Chat already exists");
  }
});

/**
 * Register a User:
 * POST Request.
 *  req.body=
 *  {
 *      "first_name": [STRING],
 *      "last_name": [STRING],
 *      "email": [STRING],
 *      "password": [STRING]
 *  }
 * Response.
 * JsonWebToken in header as x-auth-token
 * res.body =
 * {
 *      "id": [NUMBER],
 *      "firstname": [STRING],
 *      "lastname": [STRING]
 * }
 */
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const { first_name, last_name, email } = req.body;
  const existUser = await db.query(`SELECT * FROM user WHERE email=?`, {
    replacements: [email],
    plain: true
  });
  if (existUser) return res.status(400).send("User already registered");
  const [id, meta] = await db.query(
    `INSERT INTO user (first_name, last_name, email, password)
        VALUES(?,?,?,?)`,
    {
      replacements: [first_name, last_name, email, password],
      type: db.QueryTypes.INSERT
    }
  );
  const user = await db.query(
    `SELECT id, first_name, last_name FROM user WHERE id=?`,
    { replacements: [id], plain: true }
  );
  const token = await tokenGen.generateAuthToken(user);
  res.header("x-auth-token", token).send(user);
});

/**
 * Helper function to add a user's interest, skills and rating to the
 * user object.
 */
async function getInterestSkillRating(user) {
  const [interests, skills, rating] = await Promise.all([
    db.query(
      `SELECT topic.id AS topicid, name
        FROM (interests JOIN topic ON topic_id=topic.id)
        WHERE user_id=?`,
      { replacements: [user.id], type: db.QueryTypes.SELECT }
    ),
    db.query(
      `SELECT topic.id AS topicid, name,  skill
        FROM (proficiency JOIN topic ON topic_id=topic.id)
        Where user_id=?`,
      { replacements: [user.id], type: db.QueryTypes.SELECT }
    ),
    db.query(
      `SELECT AVG(rating) AS rating, COUNT(*) AS count
            FROM rates
            WHERE ratee_id=?`,
      { replacements: [user.id], plain: true }
    )
  ]);
  user.interests = interests;
  user.skills = skills;
  user.rating = rating.rating;
  user.ratingcount = rating.count;
}

module.exports = router;
