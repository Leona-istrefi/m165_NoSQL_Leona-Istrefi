const mitgliedId3 = new ObjectId("665bfa4e7e4a4a5f3bcbf005");
const songId1 = new ObjectId("665bfa4e7e4a4a5f3bcbf008");
const songId3 = new ObjectId("665bfa4e7e4a4a5f3bcbf00a");


db.Mitglied.deleteOne({ _id: mitgliedId3 });


db.Songs.deleteMany({
  $or: [
    { _id: songId1 },
    { _id: songId3 }
  ]
});
