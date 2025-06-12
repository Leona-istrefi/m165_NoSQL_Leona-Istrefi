print("\n--- Start der Aggregationen für Unter-Dokumente / Arrays ---");

print("\n6. Einfache Abfrage: Nur Namen der Instrumente von Mitgliedern aus Unterdokumenten ausgeben:");
(
  db.Mitglied.aggregate([
    {
      $unwind: "$instrumente"
    },
    {
      $project: {
        _id: 0,
        mitgliedName: "$name",
        instrumentName: "$instrumente.name"
      }
    }
  ])
  .forEach(printjson)
);

print("\n7. Abfrage: Mitglieder finden, die ein bestimmtes Instrument mit hoher Erfahrung spielen:");
(
  db.Mitglied.aggregate([
    {
      $match: {
        "instrumente.name": "Gitarre",
        "instrumente.erfahrung": "Fortgeschritten"
      }
    },
    {
      $project: {
        _id: 0,
        name: "$name",
        geburtjahr: "$geburtjahr",
        instrumenteDetails: "$instrumente"
      }
    }
  ])
  .forEach(printjson)
);

print("\n8. Verwendung von $unwind zum Verflachen der 'instrumente'-Array-Rückgabe:");
(
  db.Mitglied.aggregate([
    {
      $unwind: "$instrumente"
    },
    {
      $project: {
        _id: 0,
        mitgliedName: "$name",
        gespieltesInstrument: "$instrumente.name",
        erfahrungslevel: "$instrumente.erfahrung"
      }
    },
    {
      $sort: {
        mitgliedName: 1,
        gespieltesInstrument: 1
      }
    }
  ])
  .forEach(printjson)
);

print("\n--- Ende der Aggregationen für Unter-Dokumente / Arrays ---");
