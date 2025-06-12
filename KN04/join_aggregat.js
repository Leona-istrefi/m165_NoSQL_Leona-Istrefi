print("--- Start der MongoDB Aggregationen ---");

print("\n1. Songs mit langer Dauer und 'remix' Status (ersetzt find() mit UND-Verknüpfung):");
(
  db.Songs.aggregate([
    { $match: { dauer: { $gt: 240 } } },
    { $match: { remix: true } }
  ])
  .forEach(printjson)
);

print("\n2. Mitglieder Übersicht mit Filter, Projektion und Sortierung:");
(
  db.Mitglied.aggregate([
    {
      $match: {
        geburtjahr: { $lt: 2000 },
        aktiv: true
      }
    },
    {
      $project: {
        _id: 0,
        nameDesMitglieds: "$name",
        instrument: 1,
        alterAktuell: { $subtract: [new Date().getFullYear(), "$geburtjahr"] }
      }
    },
    {
      $sort: {
        alterAktuell: 1
      }
    }
  ])
  .forEach(printjson)
);

print("\n3. Gesamtstatistiken über alle Songs (mit $sum):");
(
  db.Songs.aggregate([
    {
      $group: {
        _id: null,
        gesamtAnzahlSongs: { $sum: 1 },
        gesamtDauerSekunden: { $sum: "$dauer" }
      }
    }
  ])
  .forEach(printjson)
);

print("\n4. Song-Kategorie-Statistiken nach 'bewertet' Status (mit $group):");
(
  db.Songs.aggregate([
    {
      $group: {
        _id: "$bewertet",
        anzahlSongsInKategorie: { $sum: 1 },
        durchschnittlicheDauerKategorie: { $avg: "$dauer" },
        songsDetails: { $push: { titel: "$title", dauer: "$dauer" } }
      }
    },
    {
      $sort: {
        _id: 1
      }
    }
  ])
  .forEach(printjson)
);

print("\n5. Durchschnittliche Album-Statistiken pro Genre (mit $lookup und Aggregation):");
(
  db.Album.aggregate([
    {
      $lookup: {
        from: "Genre",
        localField: "genreId",
        foreignField: "_id",
        as: "genreInfo"
      }
    },
    {
      $unwind: "$genreInfo"
    },
    {
      $group: {
        _id: "$genreInfo.name",
        anzahlAlben: { $sum: 1 },
        durchschnittlichesJahr: { $avg: "$jahr" },
        gesamteBonusTracks: { $sum: "$bonusTracks" }
      }
    },
    {
      $project: {
        _id: 0,
        genre: "$_id",
        albenAnzahl: "$anzahlAlben",
        avgJahr: { $round: ["$durchschnittlichesJahr", 0] },
        totalBonusTracks: "$gesamteBonusTracks"
      }
    },
    {
      $sort: {
        albenAnzahl: -1
      }
    }
  ])
  .forEach(printjson)
);

print("\n--- Ende der MongoDB Aggregationen ---");
