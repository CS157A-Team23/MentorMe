const db = require("../modules/database");
const { Chat } = require("../models/Chat");
const { Chatlog } = require("../models/Chatlog");
const { Mentors } = require("../models/Mentors");
const { Proficiency } = require("../models/Proficiency");
const { Rates } = require("../models/Rates");
const { Topic } = require("../models/Topic");
const { User } = require("../models/User");

// Proficiency
User.belongsToMany(Topic, {
    as: "Skill",
    through: Proficiency,
    foreignKey: "user_id",
    onDelete: "CASCADE"
});
Topic.belongsToMany(User, {
    as: "Experts",
    through: Proficiency,
    foreignKey: "topic_id",
    onDelete: "CASCADE"
});

// interest
User.belongsToMany(Topic, {
    as: "Hobby",
    through: "Interests",
    foreignKey: "user_id",
    onDelete: "CASCADE"
});
Topic.belongsToMany(User, {
    as: "Hobbyist",
    through: "Interests",
    foreignKey: "topic_id",
    onDelete: "CASCADE"
});

// Chat
Topic.hasOne(Chat);
Chat.belongsTo(Topic);

// Chatlog
User.hasMany(Chatlog, { onDelete: "CASCADE" });
Chatlog.belongsTo(User, { onDelete: "CASCADE" });
Chat.hasMany(Chatlog, { onDelete: "CASCADE" });
Chatlog.belongsTo(Chat, { onDelete: "CASCADE" });

// Mentor relation
User.belongsToMany(User, {
    as: "Mentor",
    through: Mentors,
    foreignKey: "mentor_id",
    onDelete: "CASCADE"
});
User.belongsToMany(User, {
    as: "Mentee",
    through: Mentors,
    foreignKey: "mentee_id",
    onDelete: "CASCADE"
});

// rates
User.belongsToMany(User, {
    as: "Rater",
    through: Rates,
    foreignKey: "rater_id",
    onDelete: "CASCADE"
});
User.belongsToMany(User, {
    as: "Ratee",
    through: Rates,
    foreignKey: "ratee_id",
    onDelete: "CASCADE"
});

module.exports = function() {
    db.authenticate()
        .then(() => console.log("database connected"))
        .catch(err => console.log("Error:" + err));

    db.sync({ logging: false })
        .then(() => console.log("All models synced to tables"))
        .catch(err => console.log("Issue syncing models:" + err));
};
