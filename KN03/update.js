const mitgliedId1ToUpdate = new ObjectId("683ec81962a5a14c8dc59f37");
const genreId1Rock = new ObjectId("683ec81962a5a14c8dc59f35");
const genreId2Pop = new ObjectId("683ec81962a5a14c8dc59f36");
const albumId1ToUpdate = new ObjectId("683ec81962a5a14c8dc59f3a");


print("--- Mitglied vor dem Update (ID: " + mitgliedId1ToUpdate + ") ---");
db.Mitglied.find({ _id: mitgliedId1ToUpdate });

db.Mitglied.updateOne(
  { _id: mitgliedId1ToUpdate },
  {
    $set: {
      instrument: "Gesang & Gitarre",
      aktiv: true,
    },
  }
);
printjson(db.Mitglied.find({ _id: mitgliedId1ToUpdate }));
print("\n--- Mitglied nach dem Update ---");
db.Mitglied.find({ _id: mitgliedId1ToUpdate });


print("\n--- Songs vor dem Update (nach Genre des Albums) ---");
db.Songs.aggregate([
  {
    $lookup: {
      from: "Album",
      localField: "albumId",
      foreignField: "_id",
      as: "albumDetails"
    }
  },
  {
    $unwind: "$albumDetails"
  },
  {
    $lookup: {
      from: "Genre",
      localField: "albumDetails.genreId",
      foreignField: "_id",
      as: "genreDetails"
    }
  },
  {
    $unwind: "$genreDetails"
  },
  {
    $match: {
      $or: [
        { "genreDetails.name": "Rock" },
        { "genreDetails.name": "Pop" }
      ]
    }
  }
]);

const albumIdsToUpdate = db.Album.find(
  {
    $or: [{ genreId: genreId1Rock }, { genreId: genreId2Pop }],
  },
  { _id: 1 }
).map(a => a._id);

print("\n--- Update von Songs, deren Album-Genre Rock oder Pop ist ---");
const updateSongsResult = db.Songs.updateMany(
  { albumId: { $in: albumIdsToUpdate } },
  {
    $set: {
      remastered: true,
      letztes_update: new Date(),
    },
  }
);
printjson(updateSongsResult);

print("\n--- Songs nach dem Update (nach Genre des Albums) ---");
db.Songs.aggregate([
  {
    $lookup: {
      from: "Album",
      localField: "albumId",
      foreignField: "_id",
      as: "albumDetails"
    }
  },
  {
    $unwind: "$albumDetails"
  },
  {
    $lookup: {
      from: "Genre",
      localField: "albumDetails.genreId",
      foreignField: "_id",
      as: "genreDetails"
    }
  },
  {
    $unwind: "$genreDetails"
  },
  {
    $match: {
      $or: [
        { "genreDetails.name": "Rock" },
        { "genreDetails.name": "Pop" }
      ]
    }
  }
]);


print("\n--- Album vor dem Replace (Titel: The Neighbourhood) ---");
db.Album.find({ title: "The Neighbourhood" });

db.Album.replaceOne(
  { title: "The Neighbourhood" },
  {
    title: "The Neighbourhood Deluxe",
    jahr: 2019,
    genreId: genreId2Pop,
    deluxe: true,
    bonusTracks: 3
  }
);

print("\n--- Album nach dem Replace (Titel: The Neighbourhood Deluxe) ---");
db.Album.find({ title: "The Neighbourhood Deluxe" });
