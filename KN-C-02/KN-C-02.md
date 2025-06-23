# A 
## Screenshot 
![image](https://github.com/user-attachments/assets/3c3dd38a-a5ea-417c-9273-7b3ee6259334)
![image](https://github.com/user-attachments/assets/68cc157a-2d8f-4a32-9c1e-6d888499d2c1)
![image](https://github.com/user-attachments/assets/e6de341d-f9f0-4a4b-98b1-6c7e715f8e1e)

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
