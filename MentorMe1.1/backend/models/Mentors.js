const Sequelize = require("sequelize");
const { Topic } = require("./Topic");
const db = require("../modules/database");

const Mentors = db.define("mentors", {
    mentee_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    mentor_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    topic_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Topic,
            key: "id"
        }
    }
});

exports.Mentors = Mentors;
