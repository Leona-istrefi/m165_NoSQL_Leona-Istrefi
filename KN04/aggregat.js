print("\n1. Mitglieder mit Gitarre UND 'Zach' im Namen – mit zwei $match:");
db.Mitglied.aggregate([
  { $match: { instrument: "Gitarre" } },
  { $match: { name: { $regex: /Zach/i } } }
]).forEach(printjson);

print("\n2. Songs mit Dauer > 200, nur Titel und Dauer anzeigen, sortiert nach Dauer:");
db.Songs.aggregate([
  { $match: { dauer: { $gt: 200 } } },
  { $project: { _id: 0, title: 1, dauer: 1 } },
  { $sort: { dauer: -1 } }
]).forEach(printjson);

print("\n3. Gesamtdauer aller Songs:");
db.Songs.aggregate([
  {
    $group: {
      _id: null,
      totalDuration: { $sum: "$dauer" }
    }
  }
]).forEach(printjson);

print("\n4. Anzahl Songs pro Album:");
db.Songs.aggregate([
  {
    $group: {
      _id: "$albumId", 
      songCount: { $sum: 1 }
    }
  }
]).forEach(printjson);
