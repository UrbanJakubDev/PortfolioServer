module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        content: String,
        published: Boolean,
        slug: String,
        tags: String,
        previewImage: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Post = mongoose.model("post", schema);
    return Post;
  };