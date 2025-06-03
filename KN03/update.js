print("Mitglied vor dem Update ");
db.Mitglied.find({ _id: ObjectId("665bf87114e4a46b708e394a") });

db.Mitglied.updateOne(
  { _id: ObjectId("665bf87114e4a46b708e394a") },
  {
    $set: {
      instrument: "Gitarre & Background Gesang",
      aktiv: true,
    },
  }
);

print("\n Mitglied nach dem Update -");
db.Mitglied.find({ _id: ObjectId("665bf87114e4a46b708e394a") });


print("\Songs vor dem Update ");
db.Songs.find({
  $or: [{ dauer: { $gt: 240 } }, { title: "Cry Baby" }],
});

db.Songs.updateMany(
  {
    $or: [{ dauer: { $gt: 240 } }, { title: "Cry Baby" }],
  },
  {
    $set: {
      remix: true,
      bewertet: true,
    },
  }
);

print("\n Songs nach dem Update ");
db.Songs.find({
  $or: [{ dauer: { $gt: 240 } }, { title: "Cry Baby" }],
});


print("\n Album vor dem Update ");
db.Album.find({ title: "The Neighbourhood" });

db.Album.replaceOne(
  { title: "The Neighbourhood" },
  {
    title: "The Neighbourhood Deluxe",
    jahr: 2019,
    genreId: ObjectId("665bf87114e4a46b708e393a"),
    deluxe: true,
    bonusTracks: 3,
  }
);

print("\n Album nach dem Update ");
db.Album.find({ title: "The Neighbourhood Deluxe" });
