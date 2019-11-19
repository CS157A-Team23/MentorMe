const db = require("../modules/database");
const { validateMent } = require("../models/Mentors");
const { alertNewChat } = require("../modules/socketHandler");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

/**----------------------------
 * Get pending relations
 * GET Request.
 * Response.
 * [{"id", "firstname", "lastname", "topicid", "topicname" "asmentor"}, {}...]
 */
router.get("/pending", auth, async (req, res) => {
  const rels = await db.query(
    `SELECT user.id AS id, first_name, last_name, topic_id AS topicid, mentee_id=? AS asmentor
        FROM mentors, user
        WHERE (mentor_id=? AND mentor_accepted=false AND user.id=mentee_id) OR (mentee_id=? AND mentee_accepted=false AND user.id=mentor_id);`,
    {
      replacements: [req.user.id, req.user.id, req.user.id],
      type: db.QueryTypes.SELECT
    }
  );
  res.send(rels);
});

/**----------------------------
 * Establish a mentor/mentee
 * POST Request.
 * {"id", "topicid", "asmentor":[boolean]}
 */
router.post("/set", auth, async (req, res) => {
  // need other user, topic,
  const { error } = validateMent(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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
  let relation = await db.query(
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
  // create chat if sucessful relation set and relation established
  relation = await db.query(
    `SELECT * FROM mentors
          WHERE topic_id=? AND mentor_id=? AND mentee_id=?`,
    { replacements: [topic.id, mentor, mentee], plain: true }
  );

  if (
    !relation.chat_id &&
    relation.mentor_accepted &&
    relation.mentee_accepted
  ) {
    let chat = await db.query(
      `SELECT * FROM chat
          WHERE user1_id=? AND user2_id=? OR user1_id=? AND user2_id=?`,
      {
        replacements: [
          relation.mentor_id,
          relation.mentee_id,
          relation.mentee_id,
          relation.mentor_id
        ],
        plain: true
      }
    );
    if (!chat) {
      const [chatid, success] = await db.query(
        `INSERT INTO chat(user1_id, user2_id)
                VALUES(?,?)`,
        {
          replacements: [relation.mentor_id, relation.mentee_id],
          type: db.QueryTypes.INSERT
        }
      );
      alertNewChat(req.user.id, chatid, user.first_name);
      alertNewChat(user.id, chatid, req.user.first_name);
      chat = { id: chatid };
    }
    await db.query(
      `UPDATE mentors SET chat_id=? 
              WHERE topic_id=? AND mentor_id=? AND mentee_id=?`,
      {
        replacements: [chat.id, topic.id, mentor, mentee],
        type: db.QueryTypes.UPDATE
      }
    );
  }
  res.send("connection sent");
});

/**----------------------------
 * Remove a relation
 * {"id","topicid","asmentor"}
 */
router.post("/refuse", auth, async (req, res) => {
  const { error } = validateMent(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { id: targetid, topicid, asmentor } = req.body;
  if (targetid === req.user.id)
    return res.status(400).send("Cannot target self");
  let mentor, mentee;
  if (asmentor) {
    mentor = targetid;
    mentee = req.user.id;
  } else {
    mentor = req.user.id;
    mentee = target;
  }
  await db.query(
    `DELETE FROM mentors 
       WHERE topic_id=? AND mentor_id=? AND mentee_id=?`,
    {
      replacements: [topicid, mentor, mentee],
      type: db.QueryTypes.DELETE
    }
  );
  res.send("relation deleted");
});

module.exports = router;
