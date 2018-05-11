// npm test spec/unit/flair_spec.js

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require('../../src/db/models').Flair;

describe("Flair", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        Flair.create({
          name: "Travel",
          color: 'blue',
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

// I'm not actually creating an object, I'm just tagging an object, so I don't think I need this.
//  describe("#create()", () => {
//    it("should create a flair object with a name and color", (done) => {
//      Flair.create({
//        title: "Rank your favorite politicians",
//        color: 'red',
//        topicId: this.topic.id
//      })
//      .then((flair) => {
//        expect(flair.title).toBe("Rank your favorite politicians");
//        expect(flair.color).toBe('red');
//        done();
//      })
//      .catch((err) => {
//        console.log(err);
//        done();
//      });
//    });
//    it('should not create a flair object with missing name or color', (done) => {
//      Flair.create({
//        name: 'Pros of Cryosleep during the long journey'
//      })
//      .then((flair) => {
      // the code in this block will not be evaluated since the validation error
      // will skip it. Instead, we'll catch the error in the catch block below
      // and set the expectations there
//      done();
//      })
//      .catch((err) => {
//        expect(err.message).toContain("Flair.name cannot be null");
//        expect(err.message).toContain("Flair.color cannot be null");
//        done();
//      })
//    });
//  });

  describe("#setTopic()", () => {
    it("should associate a topic and a flair together", (done) => {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic) => {
        expect(this.flair.topicId).toBe(this.topic.id);
        this.flair.setTopic(newFlair)
        .then((flair) => {
          expect(flair.topicId).toBe(newTopic.id);
          done();
        });
      })
    });
  });

});
