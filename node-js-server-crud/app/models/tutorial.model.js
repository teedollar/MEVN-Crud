module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );

/* In case of frontend with id column instead of _id*/
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });


/* Ends */
  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};