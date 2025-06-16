# A 

## Screenshot der Abfrage 
![image](https://github.com/user-attachments/assets/4ed70f3e-2417-49d4-bdbc-2c5f9309b367)


# B 

## Erklärung der Statements 
`Match (n)`
Stichwort um ein Suchmuster im Graphne anzeigen. Es sagt Neo4j, dass es nach Knoten oder Beziehungen suchen soll. 

* (n): Dies definiert einen Knoten 

`Optional Match (n) - [r] -> (m)`
* Optional Match: hiermit wird immer versucht ein Muster zu finden. Beim Normalen Match würde es scheitern, hier wird weitergesucht. 
* (n): referenziert auf den Knoten 
* -[r]->: Definiert eine Beziehung (Kante)
* (m): Definiert einen weiteren Knoten

`Return n,r,m`
* Return: Das Schlüsselwort welches angibt, welche Ereignisse zurückgegeben werden sollen 
* n: Liefert alle gefundenen Knoten 
* r: optional der ausgehenden Beziehungen 
* m: und die verbundeden Endknoten 


## Beschreibung der 4 Szenarien 
`Szenario 1`
Ich möchte gerne alle Bnads finden, die der Genre "Rock" zugeordnet sind und schon seit mindestens 15 Jahren existieren. Ebenfalls sollen alle Mitglieder aufgelistet werden die seit mindestens 10 Jahren in der Band sin. 

<pre> MATCH (b:Band)-[:IST_IM_GENRE]->(g:Genre {name: 'Rock'})
WHERE b.gruendungsjahr <= 2010 
MATCH (b)-[:HAT_MITGLIED]->(m:Mitglied)
WHERE m.eintrittsjahr <= 2015 
RETURN b.name AS Bandname, b.gruendungsjahr AS Gründungsjahr,
       collect(DISTINCT {Mitglied: m.name, Instrument: m.instrument, Eintrittsjahr: m.eintrittsjahr}) AS LangjährigeMitglieder
ORDER BY Bandname;
</pre> 

`Szenario 2`
Ich möchte alle Alben finden, die im Zeitraum der 2000er Jahre veröffentlich wurden und mindestens einen Song enthalten der kürzer als 3 minuten ist. Ich möchte den Albumnamen, Das Erscheinungsjahr und die Namen der kurzen Songs sehen. 

<pre>MATCH (a:Album)-[:ENTHAELT_SONG]->(s:Song)
WHERE a.erscheinungsjahr >= 2000 AND a.erscheinungsjahr 
RETURN a.titel AS Albumtitel, a.erscheinungsjahr AS Erscheinungsjahr,
       collect(DISTINCT {Songname: s.name, Dauer: s.dauer}) AS KurzeSongs
ORDER BY Albumtitel;
</pre>

`Szenario 3`
Ich möchte alle Bands sehen, welche mindestens 2 verschiedene Genres haben. Für diese Bands möchte ich ebenfalls alle veröffentlichten Alben sehen, welche nach 2010 erschienen sind. Ich möchte den Bandname, Anzahl Genres und Titel der Alben sehen. 

<pre>
MATCH (b:Band)-[:IST_IM_GENRE]->(g:Genre)
WITH b, count(g) AS AnzahlGenres
WHERE AnzahlGenres >= 2 
MATCH (b)-[:VEROEFFENTLICHT_ALBUM]->(a:Album)
WHERE a.erscheinungsjahr > 2010
RETURN b.name AS Bandname, AnzahlGenres, collect(a.titel) AS NeuereAlben
ORDER BY Bandname;
</pre>

`Szenario 4`
Ich möchte alle Mitglieder identifizieren, die an Alben mitgewirkt haben, welche von Bands veröffentlicht wurden, die dem Genre "Rock" zugeordnet sind. Ich möchte den Namen des Mitglieder, deren Instrument und die Namen der Alben sehen.

<pre>MATCH (m:Mitglied)<-[:HAT_MITGLIED]-(b:Band)-[:VEROEFFENTLICHT_ALBUM]->(a:Album)
MATCH (b)-[:IST_IM_GENRE]->(g:Genre {name: 'Rock'})
RETURN m.name AS Musikername, m.instrument AS Instrument, collect(DISTINCT a.titel) AS RockAlbumTitel
ORDER BY Musikername;
</pre>

## Screenshot der Abfrage 

### Szenario 1 
![image](https://github.com/user-attachments/assets/4e6dd02f-7111-4a01-97d1-8624210eeb1e)
![image](https://github.com/user-attachments/assets/7f3ce89c-1c9d-45de-94f8-2b2ad43b2c14)

### Szenario 2 
![image](https://github.com/user-attachments/assets/b7dc30c1-dfee-4c79-a5d8-86b6b4d25a9d)

### Szenario 3 
![image](https://github.com/user-attachments/assets/48d4aea4-dd65-47b0-a0cc-53434509fdba)

### Szenario 4 
![image](https://github.com/user-attachments/assets/6c4c32d1-2dba-45b7-ae99-44e5c0537976)

# C 

## Statement ohne Detach 
Dieses Statement sollte versuchen den Knoten zu löschen, da dieser jedoch eine Beziehung hat wird es nicht gehen. 

<pre>MATCH (b:Band {name: 'Leona'})
DELETE b;</pre>

## Statement mit Detach 
Dasselbe Statement, nur das dieses noch Detach dazu hat. 

<pre>MATCH (b:Band {name: 'Leona'})
DETACH DELETE b;</pre> 

## Screentshot ohne Detach 
![image](https://github.com/user-attachments/assets/2a160af8-5ab2-4a91-bc91-6a644fec2b6f)

## Screenshot mit Detach 
![image](https://github.com/user-attachments/assets/efd4f058-eba2-49bd-850b-70d3c6c6cabc)
# D 

## Beschreibung der 3 Szenarien 

`Szenario 1`
Leo, Ein Bandmitglied von der Band Leona, entscheidet sich dazu sein Instrument von Gitarre zu Synthesizer zu ändern. Die Band beschliesst ebenfalls ihr Gründungsjahr offiziell auf 2002 zu korrigieren. Ebenfalls werden sie das Genre POP annehmen. 

<pre>MATCH (b:Band {name: 'Leona'})
MATCH (m:Mitglied {name: 'Leo'})
MATCH (b)-[r:IST_IM_GENRE]->(g:Genre {name: 'Pop'})
SET b.gruendungsjahr = 2002,
    m.instrument = 'Synthesizer', 
    r.seit = date('2004-01-01')
RETURN b.name, b.gruendungsjahr, m.name, m.instrument, g.name, r.seit;</pre>

`Szenario 2`
Das Album "World" wird neu gemacht und die Titel "Hi" und "no Thanks" werden in ihrer Länge angepasst. Da es neu herauskommt mit den kürzeren Versionen der Lieder, erhält es ein neues erscheinungsjahr. 

<pre>MATCH (a:Album {titel: 'World'})
SET a.erscheinungsjahr = 2024 // Aktualisiert das Erscheinungsjahr des Albums
WITH a
MATCH (a)-[:ENTHAELT_SONG]->(s:Song)
WHERE s.name IN ['Hi', 'No Thanks']
SET s.dauer = CASE
                WHEN s.name = 'Hi' THEN 220 
                WHEN s.name = 'No Thanks' THEN 200 
              END,
    s.erscheinungsdatum = date('2024-05-01') 
RETURN a.titel, a.erscheinungsjahr, collect({Songname: s.name, NeueDauer: s.dauer, NeuesErscheinungsdatum: s.erscheinungsdatum}) AS AktualisierteSongs;</pre>

`Szenario 3`
Alle Bands die vor 2005 gegründet worde sind und dem Genre "Rock" angehören, werden zu dem Genre "blues" umgeändert. Die Beziehung zu "Blues" soll das Gründungsjahr wiederspiegeln. 

<pre>MATCH (b:Band)-[:IST_IM_GENRE]->(g_rock:Genre {name: 'Rock'})
WHERE b.gruendungsjahr < 2005
MATCH (g_blues:Genre {name: 'Blues'}) 
MERGE (b)-[r:IST_IM_GENRE]->(g_blues)
ON CREATE SET r.seit = date(toString(b.gruendungsjahr) + '-01-01') 
ON MATCH SET r.seit = date(toString(b.gruendungsjahr) + '-01-01') 
RETURN b.name AS Bandname, b.gruendungsjahr AS Gründungsjahr, 'Blues' AS Genre, r.seit AS BluesSeitDatum;</pre>

## Screenshot der Szenarien 

### Szenario 1 
![image](https://github.com/user-attachments/assets/3f09b0ac-aa0c-4808-9461-d0b390b74b47)

### Szenario 2 
![image](https://github.com/user-attachments/assets/ca127053-7b59-46d2-9065-cbf9fdf278e3)

### Szenario 3 
![image](https://github.com/user-attachments/assets/0bd77f57-5b35-410d-8022-3359c713b537)

# E 

## Erklärung zum Anwendungsfall + Cypher Statements dazu 
`WITH`
Es dient als Übergabepunkt in den Cypher-Abfragen. Es nimmt Zwischenergebnise aus einem vorherigen Schirrt, kann diese Filtern und reicht sie dann an den nächsten Teil der Abfrage weiter. 

Beispiel: 
* Ich möchte alle Bands finden, deren Alben insgesamt mehr als 2 Songs enthalten, und dann möchte ich für diese Bands die Mitglieder zählen. 

<pre>MATCH (b:Band)-[:VEROEFFENTLICHT_ALBUM]->(a:Album)-[:ENTHAELT_SONG]->(s:Song)
WITH b, count(s) AS totalSongs
WHERE totalSongs > 2
MATCH (b)-[:HAT_MITGLIED]->(m:Mitglied)
RETURN b.name AS Bandname, totalSongs, count(m) AS AnzahlMitglieder
ORDER BY totalSongs DESC;</pre>

`UNWIND`
UNWIND wandelt eine Liste (ein Array) in individuelle Zeilen um. Jeder Eintrag in der Liste wird zu einer Seperaten Zeile im Abfragekontext. 

Beispiel: 
* Ich habe eine Liste von Musikern und ihren Neuen Instrumenten und möchte diese Updates in einer einzigen Abfrage auf die Entsprechenden mitglied-Knoten anwenden. 

<pre>WITH [
    {name: 'Leo', newInstrument: 'Gitarre-Upgrade'},
    {name: 'Luca', newInstrument: 'Gesang & Loops'}
] AS memberUpdates

UNWIND memberUpdates AS updateItem

MATCH (m:Mitglied {name: updateItem.name})
SET m.instrument = updateItem.newInstrument
RETURN m.name AS Mitgliedname, m.instrument AS NeuesInstrument;</pre>
