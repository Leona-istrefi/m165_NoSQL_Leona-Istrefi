# A 

## Screenshots 
```http://52.0.105.50:9100/metrics```
![image](https://github.com/user-attachments/assets/4e396788-f505-4fa1-b3ee-8845c2d72077)

```http://52.0.105.50:9090``` 
![image](https://github.com/user-attachments/assets/87fabf0e-599c-4bb4-811f-e7bcef76c3ce)

```http://52.0.105.50:3000```
![image](https://github.com/user-attachments/assets/a8eb1f38-c549-4093-b40c-5065cdb0f0cd)

```http://52.0.105.50:3000/metrics``` 
![image](https://github.com/user-attachments/assets/56e54a3e-80bb-4156-8002-d1e0f1ae0325)

# B 

## Begriffe erklären 
### Scrapes
* Scrapes sind der grundlegende Mechanismus, it dem Prometheus Metriken von Exportern sammelt. Prometheus ist ein "Pull"-basiertes System, was bedeutet, dass es selbständig die Daten von den konfigurierten Zielen abruft, anstatt dass die Ziele die Daten an Prometheus "pushen". 

* Jeder Scrape-Vorgang besteht darin, dass Prometheus eine HTTP-Anfrage an einen konfigurierten Endpunkt sendet (üblicherweise /metrics) um die aktuellen Metriken in einem speziellen Textformat zu erhalten. Prometheus parst dann diese Daten und speichert sie in seiner Zeitreihen-Datenbank. 

BEISPIEL:
* In unserem Cloud init gibt es 2 scraoe_configs: 
<pres>- job_name: prometheus
  static_configs:
    - targets: ['localhost:9090']</pres>
Hier konfiguriert Prometheus sich selbst als ein Ziel zum scrapen. Prometheus exponiert seine eigenen internen Metriken auf Port 9090 unter dem Pfad /metrics.Dieser Job sorgt dafür, dass Prometheus seine eigene Leistung überwacht.

<pres>- job_name: node
  static_configs:
    - targets: ['localhost:9100']</pres>
Dieser job ist für das Scrapen des prometheus-node-exporter zuständig. Der Node Exporter ist eine Anwendung, die Metriken über das Betriebssystem und die Hardware eines Servers bereitstellt. Er ist standartmässig auf Port 9100.

### Rules
* Rules in Prometheus sind Konfigurationen, die es Prometheus ermäglichen, neue Zeitreihen aus bestehenden Metriken zu generieren (Recording Rules) oder Warnmeldungen basierend auf bestimmten Bedingungen auszulösen (Alerting Rules). Regeln werden in separaten Dateien definiert, die unter rule_files definiert werden. 

BEISPIEL: 
<pres>- name: custom_rules
  rules:
    - record: node_memory_MemFree_percent
      expr: 100 - (100 * node_memory_MemFree_bytes / node_memory_MemTotal_bytes)
    - record: node_filesystem_free_percent
      expr: 100 * node_filesystem_free_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}</pres>

* ```node_memory_MemFree_percent:```
 Diese Regel berechnet den Prozentsatz des belegten Speichers ```(100 - freier Speicher in Prozent)```. Die Metriken ```node_memory_MemFree_bytes``` und ```node_memory_MemTotal_bytes``` kommen vom Node Exporter. Das Ergebnis dieser Berechnung wird als neue Metrik ```node_memory_MemFree_percent``` gespeichert.
```node_filesystem_free_percent```: Diese Regel berechnet den Prozentsatz des freien Festplattenspeichers für den Mountpoint /. Die Metriken ```node_filesystem_free_bytes``` und ```node_filesystem_size_bytes``` kommen ebenfalls vom Node Exporter. Das Ergebnis wird als ```node_filesystem_free_percent gespeichert.```

<pres>- name: alert_rules
  rules:
    - alert: InstanceDown
      expr: up == 0
      for: 1m
      labels:
        serverity: critical
      annotations:
        summary: "Instance {{ $labels.instance }} down"
        description: "Instance {{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minute."</pres>

* ```InstanceDown:``` Diese Regel löst einen Alarm aus, wenn eine Instanz nicht erreichbar ist.
```expr: up == 0:``` Die Metrik ```up``` wird von Prometheus selbst für jedes Scrape-Ziel generiert. ```up``` ist ```1```, wenn das Ziel erreichbar ist, und ```0,``` wenn es nicht erreichbar ist. Wenn ```up``` für ein Ziel ```0``` ist, wird der Alarm ausgelöst.
```for: 1m:``` Der Alarm wird erst ausgelöst, wenn die Bedingung ```(up == 0)``` für mindestens 1 Minute konstant wahr ist. Dies verhindert "Flapping"-Alarme bei kurzzeitigen Netzwerkausfällen oder Neustarts.
```labels:``` Zusätzliche Labels werden dem Alarm hinzugefügt, hier ```serverity: critical.```
```annotations:``` Zusätzliche Informationen zum Alarm, die im Alertmanager oder in Benachrichtigungen angezeigt werden. ```{{ $labels.instance }}``` und ```{{ $labels.job }}``` sind interne Variablen, die von Prometheus bereitgestellt werden und auf die Labels des betroffenen Ziels zugreifen.

### Eigenen Daten Speichern 
* Um eigene Anwendungsdaten in Prometheus zu speichern, müssen Sie ihre Anwendung "Instrumentieren", dass heisst, sie so anpassen, dass sie Metriken im Prometheus-Format exponiert. 

1. Prometheus Client Library integrieren
* Nutzen Sie eine Prometheus Client Library für Ihre Programmiersprache (z.B. Python, Java, Go). Diese Bibliotheken vereinfachen das Erstellen und Exponieren von Metriken.

2. Metriken definieren und aktualisieren: 
* Dann definiere ich Instanzen von Prometheus-Metriktypen (z.B. Counter für zählende Werte, Gauge für aktuelle Werte, Histogram für Verteilungen) in meinem Code. Ich aktualisiere diese Metriken an den relevanten Stellen in meiner Anwendung; zum Beispiel inkrementiere ich einen Zähler (counter.inc()) bei einer neuen Anfrage oder setze einen aktuellen Wert (gauge.set(value)) bei einer Zustandsänderung.

3. HTTP-Endpunkt bereitstellen: 
* Die Client Library startet normalerweise automatisch einen HTTP-Server, der die Metriken unter dem Pfad /metrics auf einem bestimmten Port (z.B. 8000) zur Verfügung stellt. Ich muss sicherstellen, dass dieser Port von Prometheus erreichbar ist.

4. Prometheus konfigurieren:
* Als Nächstes füge ich in der prometheus.yml unter scrape_configs einen neuen job für meine Anwendung hinzu. Dort gebe ich die targets (IP-Adresse und Port) meiner instrumentierten Anwendung an.

5. Prometheus neu starten/neu laden:
* Zum Schluss starte ich den Prometheus-Server neu oder lade seine Konfiguration neu, damit er beginnt, meine Anwendung zu scrapen und die Daten zu speichern.

### Welche Variabeln 
* In Prometheus werden "Variablen" meist als Labels bezeichnet, die an Metriken hängen, sowie als spezielle Variablen, die ich in Regelausdrücken verwenden kann.

1. Labels aus Scrapes (aus der Prometheus-Konfiguration und vom Exporter):
* job: Das ist der Name des Jobs, wie ich ihn in den scrape_configs in der prometheus.yml definiere (z.B. job="node").
instance: Das ist die Adresse (Host:Port) des gescrapten Ziels, wie ich sie in den targets in der prometheus.yml konfiguriere (z.B. instance="localhost:9100").
Andere Labels von Exportern/Anwendungen: Das sind zusätzliche, spezifische Labels, die direkt vom Exporter oder der von mir instrumentierten Anwendung bereitgestellt werden (z.B. mountpoint="/", device="/dev/sda1" vom Node Exporter oder endpoint="/users" von meiner eigenen Applikation). Diese werden direkt vom /metrics-Endpunkt des Ziels abgerufen.

2. Variablen in Rules (Prometheus-intern):
* $labels: Das ist eine spezielle Variable, die ich in Alerting Rules verwende. Sie enthält ein Objekt aller Labels der aktuell betroffenen Zeitreihe. Diese Labels stammen von den oben genannten Quellen (Prometheus-Konfiguration und Exporter).
Beispiel: Wenn ich {{ $labels.instance }} schreibe, greife ich auf das instance-Label zu.
$value: Dies ist der numerische Wert der PromQL-Abfrage, die den Alarm ausgelöst hat.

### Wie weiss es ob ein System up ist 
* Prometheus generiert die Metrik up basierend auf dem Erfolg seiner Scrape-Vorgänge. Wenn ein Scrape fehlschlägt, ist up 0, und diese Information wird dann von meinen Alerting Rules verwendet, um Alarme auszulösen.
