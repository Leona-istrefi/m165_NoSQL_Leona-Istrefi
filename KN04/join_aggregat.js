print("\n1. Alben mit den enthaltenen Songs:");
db.Album.aggregate([
  {
    $lookup: {
      from: "Songs",
      localField: "_id",
      foreignField: "albumId",
      as: "songs"
    }
  },
  {
    $project: {
      _id: 0,
      title: 1,
      released: 1,
      "songs.title": 1,
      "songs.dauer": 1
    }
  }
]).forEach(printjson);


print("\n2. Alben mit durchschnittlicher Songdauer (nur Alben mit Songs):");
db.Album.aggregate([
  {
    $lookup: {
      from: "Songs",
      localField: "_id",
      foreignField: "albumId",
      as: "songs"
    }
  },
  {
    $match: {
      "songs.0": { $exists: true }
    }
  },
  {
    $project: {
      title: 1,
      released: 1,
      durchschnitt: { $avg: "$songs.dauer" }
    }
  },
  {
    $sort: { durchschnitt: -1 }
  }
]).forEach(printjson);
