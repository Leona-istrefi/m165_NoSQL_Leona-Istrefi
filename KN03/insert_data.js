const genreId1 = new ObjectId();
const genreId2 = new ObjectId();

const mitgliedId1 = new ObjectId();
const mitgliedId2 = new ObjectId();
const mitgliedId3 = new ObjectId();

const albumId1 = new ObjectId();
const albumId2 = new ObjectId();

const songId1 = new ObjectId();
const songId2 = new ObjectId();
const songId3 = new ObjectId();
const songId4 = new ObjectId();

db.Genre.insertMany([
  { _id: genreId1, name: "Rock" },
  { _id: genreId2, name: "Pop" }
]);

db.Mitglied.insertMany([
  { _id: mitgliedId1, name: "Jesse Rutherford", instrument: "Gesang" },
  { _id: mitgliedId2, name: "Zach Abels", instrument: "Gitarre" },
  { _id: mitgliedId3, name: "Bryan Sammis", instrument: "Schlagzeug" }
]);

db.Album.insertOne({
  _id: albumId1,
  title: "Wiped Out!",
  jahr: 2015,
  genreId: genreId1
});

db.Album.insertOne({
  _id: albumId2,
  title: "The Neighbourhood",
  jahr: 2018,
  genreId: genreId2
});

db.Songs.insertMany([
  {
    _id: songId1,
    title: "Cry Baby",
    dauer: 214,
    albumId: albumId1
  },
  {
    _id: songId2,
    title: "The Beach",
    dauer: 250,
    albumId: albumId1
  },
  {
    _id: songId3,
    title: "Nervous",
    dauer: 247,
    albumId: albumId2
  },
  {
    _id: songId4,
    title: "Reflections",
    dauer: 243,
    albumId: albumId2
  }
]);
