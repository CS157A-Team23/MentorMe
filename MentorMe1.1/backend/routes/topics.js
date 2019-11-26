const express = require("express");
const router = express.Router();
const { validateID } = require("../modules/validation");
const { validateTopic } = require("../models/Topic");
const { validateProficiency } = require("../models/Proficiency");
const db = require("../modules/database");
const auth = require("../middleware/auth");
module.exports = router;

/**
 * Get all Topics
 * GET request.
 * Response
 * [{topicid, name},{}...]
 * */
router.get("/", auth, async (req, res) => {
  let topics = await db.query(`SELECT id AS topicid, name FROM topic`, {
    type: db.QueryTypes.SELECT
  });
  let interests = await db.query(
    `SELECT topic_id FROM interests WHERE user_id=?`,
    { replacements: [req.user.id], type: db.QueryTypes.SELECT }
  );
  interests = interests.map(i => i.topic_id);
  console.log(interests);
  topics = topics.map(t => {
    return {
      topicid: t.topicid,
      name: t.name,
      interested: interests.includes(t.topicid)
    };
  });
  res.send(topics);
});

/**
 * Get all my interested topics
 * GET request.
 * Provide JWT token.
 * Response
 * [{topicid, name},{}...]
 * */
router.get("/myinterests", auth, async (req, res) => {
  const interests = await db.query(
    `SELECT topic.id AS topicid, name 
        FROM topic JOIN (SELECT topic_id FROM interests WHERE user_id=?) ints
        ON topic.id = ints.topic_id `,
    { replacements: [req.user.id], type: db.QueryTypes.SELECT }
  );
  res.send(interests);
});

/**
 * Get all users interested in this topic
 * GET request.
 * Response
 * [{id, first_name, last_name},{}...]
 * */
router.get("/:id/members", async (req, res) => {
  // validate topic
  const { error } = validateID(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);
  // check topic
  const existTopic = await db.query(`SELECT * FROM topic WHERE id=?`, {
    replacements: [req.params.id],
    plain: true
  });
  if (!existTopic) return res.status(404).send("Topic not found");
  // generate interest with skill
  const users = await db.query(
    `SELECT id, first_name, last_name, skill   
        FROM (SELECT user.id AS id, first_name, last_name
              FROM user JOIN interests ON user.id=interests.user_id
              WHERE topic_id=?) ui 
        LEFT JOIN proficiency ON id=user_id AND topic_id=?`,
    { replacements: [existTopic.id, existTopic.id], type: db.QueryTypes.SELECT }
  );
  res.send(users);
});

/**
 * Add my interest to a topic
 * POST request.
 * Provide JWT token.
 * */
router.post("/:id/addinterest", auth, async (req, res) => {
  const { error } = validateID(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);
  const existTopic = await db.query(`SELECT * FROM topic WHERE id=?`, {
    replacements: [req.params.id],
    plain: true
  });
  if (!existTopic) return res.status(404).send("Topic not found");
  const existInterest = await db.query(
    `SELECT * FROM interests WHERE user_id=? AND topic_id=?`,
    { replacements: [req.user.id, existTopic.id], plain: true }
  );
  if (!existInterest) {
    db.query(
      `INSERT INTO interests (user_id, topic_id)
            VALUES (?,?)`,
      {
        replacements: [req.user.id, existTopic.id],
        type: db.QueryTypes.INSERT
      }
    );
    return res.send("New Interest set");
  }
  res.send("Interest already set");
});
/**
 * Remove my interest to a topic
 * POST request.
 * Provide JWT token.
 * */
router.post("/:id/removeinterest", auth, async (req, res) => {
  const { error } = validateID(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);
  const existTopic = await db.query(`SELECT * FROM topic WHERE id=?`, {
    replacements: [req.params.id],
    plain: true
  });
  if (!existTopic) return res.status(404).send("Topic not found");
  const existInterest = await db.query(
    `SELECT * FROM interests WHERE user_id=? AND topic_id=?`,
    { replacements: [req.user.id, existTopic.id], plain: true }
  );
  if (existInterest) {
    db.query(`DELETE FROM interests WHERE user_id=? AND topic_id=?`, {
      replacements: [req.user.id, existTopic.id],
      type: db.QueryTypes.DELETE
    });
    return res.send("Interest deleted");
  }
  res.send("Interest does not exist");
});
/**
 * Set my skill level to a topic
 * POST request.
 * Provide JWT token.
 * {
 *      "skill": [number]
 * }
 * */
router.post("/:id/setskill", auth, async (req, res) => {
  let joiObj = validateID(req.params.id);
  if (joiObj.error)
    return res.status(400).send(joiObj.error.details[0].message);
  joiObj = validateProficiency(req.body);
  if (joiObj.error)
    return res.status(400).send(joiObj.error.details[0].message);
  const existTopic = await db.query(`SELECT * FROM topic WHERE id=?`, {
    replacements: [req.params.id],
    plain: true
  });
  if (!existTopic) return res.status(404).send("Topic not found");
  const existProf = await db.query(
    `SELECT * FROM proficiency WHERE user_id=? AND topic_id=?`,
    { replacements: [req.user.id, existTopic.id], plain: true }
  );
  if (existProf) {
    db.query(
      `UPDATE proficiency SET skill=?
        WHERE user_id=? AND topic_id=?`,
      {
        replacements: [req.body.skill, req.user.id, existTopic.id],
        type: db.QueryTypes.UPDATE
      }
    );
    return res.send("Skill level updated");
  } else {
    db.query(
      `INSERT INTO proficiency (skill, user_id, topic_id)
        VALUES (?,?,?)`,
      {
        replacements: [req.body.skill, req.user.id, existTopic.id],
        type: db.QueryTypes.INSERT
      }
    );
    return res.send("New skill level created");
  }
});
/**
 * Create a new Topic
 * POST request.
 * Provide JWT token.
 * {
 *      "name":[string]
 * }
 * */
router.post("/", auth, async (req, res) => {
  const { name } = req.body;
  const { error } = validateTopic(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const existTopic = await db.query(`SELECT * FROM topic WHERE name=?`, {
    replacements: [name.toLowerCase()],
    plain: true
  });
  if (existTopic) return res.status(400).send("topic already exists");
  const [topicid] = await db.query(`INSERT INTO topic (name) VALUES (?)`, {
    replacements: [name],
    type: db.QueryTypes.INSERT
  });
  const [chatid] = await db.query(`INSERT INTO chat (topic_id) VALUES (?)`, {
    replacements: [topicid],
    type: db.QueryTypes.INSERT
  });
  res.send("Topic created");
});
