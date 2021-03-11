module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        img: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Image = mongoose.model("images", schema);
    return Image;
  };