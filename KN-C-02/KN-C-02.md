# A 
## Screenshot 
![alt text](image.png)
![alt text](image-2.png)
![alt text](image-1.png)

# B 
## Screenshot 
![alt text](image-3.png)

# C 
## Screenshot 

```Teil der Daten löschen```
![alt text](image-5.png)

```Alles löschen``` 
![alt text](image-6.png)

# D 
## Szenarios 
```Szenario 1```
* Eine Band entscheidet sich, ihren Namen zu ändern. Da die Bandnamen in mehreren Tabellen (band_by_member, band_by_genre) gespeichert ist, muss die Änderung konsistent über alle relevanten Datensätze hinweg aktualisiert werden. Dies erfordert, dass man den band_namen welche mit dieser band_id verknüpft sind zu aktualisieren. 

```Szenario 2```
* Ein bestimmtes Bandmitglied wechselt sein primäres Instrument und eventuell das Jahr, in dem diese Änderung stattfand oder in dem es erneut der Band beigetreten ist. Dies erfordert die Aktualisierung von zwei verschiedenen Attributen (mitglied_instrument und mitglied_eintrittsjahr) für ein spezifisches Mitglied innerhalb einer spezifischen Band 

```Szenario 3```
* Aufgrund von Änderungen oder Korrekturen müssen die Dauer und das Erscheinungsdatum für mehrere Songs auf einem bestimmten Album aktualisiert werden. Die Herausforderung hierbei ist, dass wir die Songs nicht direkt über ihre ID's kennne, sonder sie über das Album (album_id) und/oder den Songtitel (song_name) identifizieren müssen.

## Screenshot 
![alt text](image-4.png)
