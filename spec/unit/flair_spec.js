// npm test spec/unit/flair_spec.js

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Post", ()=>{
	beforeEach((done)=>{

		this.topic;
		this.post;
    this.flair;
		sequelize.sync({force:true}).then((res)=>{


			Topic.create({
				title:"Expeditions to Alpha Centauri",
				description: "A compilation of reports from a recent visit to the star system."
			})
			.then((topic)=>{
				this.topic = topic;

				Post.create({
					title:"My first visit to Proxima Centauri b",
					body:"I saw some rocks.",

					topicId: this.topic.id
				})
				.then((post)=>{
					this.post = post;

          Flair.create({
            name:"My first visit Flair",
            color:"Blue",

            topicId: this.topic.id,
            postId:this.post.id
          })
          .then((flair)=>{
            this.flair = flair;
            done();
          })
				});
			})
			.catch((err)=> {
				console.log(err);
				done();
			});
		});
	});

	describe("#create()",()=>{

		it("should create a flair object with a name, color, and assigned topic/post", (done)=>{

  		  Flair.create({
  		  	name: "My flair",
         	color: "Yellow",
         	topicId: this.topic.id,
          postId: this.post.id
       	  })
       	  .then((flair)=>{

       	  	expect(flair.name).toBe("My flair");
       	  	expect(flair.color).toBe("Yellow");
       	  	done();
       	  })
       	  .catch((err)=>{
       	  	console.log(err);
       	  	done();
       	  });
		});

		it("should not create a flair with missing color, ", (done) => {
          Flair.create({
           name: "Flair without title"
          })
     	   .then((flair) => {

      		// the code in this block will not be evaluated since the validation error
      		// will skip it. Instead, we'll catch the error in the catch block below
      		// and set the expectations there

       		done();

     	  })
     		.catch((err) => {

      		 expect(err.message).toContain("Flair.color cannot be null");
      		 expect(err.message).toContain("Flair.topicId cannot be null");
           expect(err.message).toContain("Flair.postId cannot be null");
       		 done();

     	})
   		});
	})

  describe("#setFlair()", () => {

     it("should associate a flair with a post and a topic", (done) => {

       Post.create({
         title: "New Flair",
         body: "Yellow Post",
         topicId:this.topic.id
       })
       .then((newPost) => {

         expect(this.flair.postId).toBe(this.post.id);

         this.flair.setPost(newPost)
         .then((flair) => {

           expect(flair.postId).toBe(newPost.id);
           done();

         });
       })
     });

   });


	describe("#getFlair()", () => {

     it("should return the associated post", (done) => {

       this.flair.getPost()
       .then((associatedPost) => {
         expect(associatedPost.title).toBe("My first visit to Proxima Centauri b");
         done();
       });

     });

   });

});
