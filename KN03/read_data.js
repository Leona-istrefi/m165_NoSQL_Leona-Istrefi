print("\nGenres: Rock oder Pop");
db.Genre
  .find(
    { $or: [{ name: "Rock" }, { name: "Pop" }] },
    { _id: 0, name: 1 }
  )
  .forEach(printjson);

print("\nMitglieder mit 'ss' im Namen:");
db.Mitglied
  .find(
    { name: { $regex: /ss/i } },
    { _id: 1, name: 1, instrument: 1 }
  )
  .forEach(printjson);

print("\nMitglieder mit Gitarre UND Zach im Namen:");
db.Mitglied
  .find({
    $and: [
      { instrument: "Gitarre" },
      { name: { $regex: /Zach/i } }
    ]
  })
  .forEach(printjson);

print("\nAlben veröffentlicht nach dem 01.01.2016:");
db.Album
  .find(
    { released: { $gt: new Date("2016-01-01") } },
    { title: 1, released: 1 }
  )
  .forEach(printjson);

print("\nSongs mit Dauer > 245 oder Titel 'Cry Baby':");
db.Songs
  .find(
    {
      $or: [
        { dauer: { $gt: 245 } },
        { title: "Cry Baby" }
      ]
    }
  )
  .forEach(printjson);

print("\nAlle Songs mit _id:");
db.Songs
  .find(
    {},
    { _id: 1, title: 1, dauer: 1 }
  )
  .forEach(printjson);

print("\nSongs ohne _id (nur Titel & Dauer):");
db.Songs
  .find(
    {},
    { _id: 0, title: 1, dauer: 1 }
  )
  .forEach(printjson);
