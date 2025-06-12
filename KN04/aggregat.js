print("1. Songs mit langer Dauer und 'remix' Status (mit separaten $match Stages):");
(
  db.Songs.aggregate([
    { $match: { dauer: { $gt: 240 } } },
    { $match: { remix: true } }
  ])
  .forEach(printjson)
);

print("\n2. Mitglieder Performance Übersicht:");
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
        mitgliedName: "$name",
        rolle: "$instrument",
        mitgliedMetriken: {
          alter: { $subtract: [new Date().getFullYear(), "$geburtjahr"] }
        }
      }
    },
    {
      $sort: {
        "mitgliedMetriken.alter": 1
      }
    }
  ])
  .forEach(printjson)
);

print("\n3. Gesamtstatistiken über alle Songs:");
(
  db.Songs.aggregate([
    {
      $group: {
        _id: null,
        gesamtAnzahlSongs: { $sum: 1 },
        gesamtDauerSekunden: { $sum: "$dauer" },
        durchschnittDauerSekunden: { $avg: "$dauer" }
      }
    }
  ])
  .forEach(printjson)
);

print("\n4. Song-Kategorie-Statistiken nach 'bewertet' Status:");
(
  db.Songs.aggregate([
    {
      $group: {
        _id: "$bewertet",
        anzahlSongsInKategorie: { $sum: 1 },
        durchschnittlicheDauerKategorie: { $avg: "$dauer" },
        songsInKategorie: {
          $push: {
            titel: "$title",
            dauer: "$dauer"
          }
        }
      }
    },
    {
      $sort: {
        durchschnittlicheDauerKategorie: -1
      }
    }
  ])
  .forEach(printjson)
);

print("\n5. Durchschnittliche Album-Statistiken pro Genre:");
(
  db.Album.aggregate([
    {
      $group: {
        _id: "$genreId",
        anzahlAlben: { $sum: 1 },
        durchschnittlichesJahr: { $avg: "$jahr" },
        gesamteBonusTracks: { $sum: "$bonusTracks" }
      }
    },
    {
      $lookup: {
        from: "Genre",
        localField: "_id",
        foreignField: "_id",
        as: "genreInfo"
      }
    },
    {
      $project: {
        _id: 0,
        genreName: { $arrayElemAt: ["$genreInfo.name", 0] },
        statistiken: {
          albenAnzahl: "$anzahlAlben",
          durchschnittlichesJahr: { $round: ["$durchschnittlichesJahr", 0] },
          gesamtBonusTracks: "$gesamteBonusTracks"
        }
      }
    },
    {
      $sort: {
        "statistiken.albenAnzahl": -1
      }
    }
  ])
  .forEach(printjson)
);
