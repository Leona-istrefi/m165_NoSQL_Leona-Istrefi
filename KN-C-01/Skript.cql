CREATE KEYSPACE IF NOT EXISTS band WITH REPLICATION = {
  'class' : 'SimpleStrategy',
  'replication_factor' : 1
};
USE band;

CREATE TABLE IF NOT EXISTS band_by_member (
    band_id UUID,
    band_name VARCHAR,
    band_gruendungsjahr VARCHAR,
    mitglied_id UUID,
    mitglied_name VARCHAR,
    mitglied_instrument VARCHAR,
    mitglied_eintrittsjahr VARCHAR,
    PRIMARY KEY (band_id, mitglied_id)
) WITH CLUSTERING ORDER BY (mitglied_id ASC);

CREATE TABLE IF NOT EXISTS album_by_song (
    album_id UUID,
    album_titel VARCHAR,
    album_erscheinungsjahr VARCHAR,
    song_id UUID,
    song_name VARCHAR,
    song_dauer VARCHAR,
    song_erscheinungsdatum VARCHAR,
    PRIMARY KEY (album_id, song_id)
) WITH CLUSTERING ORDER BY (song_id ASC);

CREATE TABLE IF NOT EXISTS band_by_genre (
    band_id UUID,
    band_name VARCHAR,
    band_gruendungsjahr VARCHAR,
    genre_id UUID,
    genre_name VARCHAR,
    PRIMARY KEY (band_id, genre_id)
) WITH CLUSTERING ORDER BY (genre_id ASC);
