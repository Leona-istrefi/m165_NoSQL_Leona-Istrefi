const mitgliedId1ToDelete = new ObjectId("683ec75bd71f24dcd7c59f37");
const songId1ToDelete = new ObjectId("683ec75cd71f24dcd7c59f3c");
const songId2ToDelete = new ObjectId("683ec75cd71f24dcd7c59f3d");

db.Mitglied.deleteOne({ _id: mitgliedId1ToDelete });

db.Songs.deleteMany({
  $or: [{ _id: songId1ToDelete }, { _id: songId2ToDelete }],
});
