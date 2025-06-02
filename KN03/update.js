db.Mitglied.updateOne(
  { _id: ObjectId("665bf87114e4a46b708e394a") },
  {
    $set: {
      instrument: "Gitarre & Background Gesang",
      aktiv: true
    }
  }
);

db.Songs.updateMany(
  {
    $or: [
      { dauer: { $gt: 240 } },
      { title: "Cry Baby" }
    ]
  },
  {
    $set: {
      remix: true,
      bewertet: true
    }
  }
);

db.Album.replaceOne(
  { title: "The Neighbourhood" },
  {
    title: "The Neighbourhood Deluxe",
    jahr: 2019,
    genreId: ObjectId("665bf87114e4a46b708e393a"),
    deluxe: true,
    bonusTracks: 3
  }
);
