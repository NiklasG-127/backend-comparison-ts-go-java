# backend-comparison-ts-go-java

Dieses Repository enthält die Codebasis für die Bachelorarbeit mit dem Titel **"Vergleich moderner Programmiersprachen für die Backend-Entwicklung – Eine empirische Untersuchung am Beispiel von TypeScript, Go und Java"**.
Ziel ist hierbei eine Performance Evaluation der Programmiersprachen **Java**, **TypeScript** und **Go** im Backend-Umfeld. 

## Tech Stack

- Java (Spring Boot, Maven)
- TypeScript (Express.js)
- Go (net/http)
- Docker, Docker Compose
- Prometheus
- Grafana 
- Grafana-Image-Renderer
- k6

## Repository Struktur
```text
apis/       # Implementierungen der APIs in Java, Go und TypeScript
    
grafana/    # Dashboards zur Visualisierung der Metriken
    
k6/         # k6-Testskripte zur Durchführung der Lasttests
    
prometheus/ # Konfiguration des Prometheus-Monitorings
```

## Voraussetzung
- Docker 
- Docker Compose
- ca. 8-16 GB freier Arbeitsspeicher je nach Testumfang

## Projekt starten
1. Container bauen `docker compose build`
2. Infrastruktur starten `docker compose up prometheus grafana renderer cadvisor`
3. APIs starten `docker compose up java-api go-api ts-api`
4. k6-Test starten `docker compose run --rm -e API=go-api -e TARGET=go k6 run -o experimental-prometheus-rw scripts/soak.js`

## Testarten

Die Performance-Evaluation wird mit k6 durchgeführt. Es werden folgende Testtypen verwendet:

- **Load Test** – Messung der Performance unter normaler Last
- **Spike Test** – Untersuchung des Systemverhaltens bei plötzlichen Lastspitzen
- **Stress Test** – Bestimmung der maximalen Systemkapazität
- **Soak Test** – Analyse der Systemstabilität über einen längeren Zeitraum

## Erklärung des k6-Commands
k6 Commands bestehen aus mehreren Teilen:
- `docker compose run` startet einen neuen Container des `k6`Services.
- `--rm` sorgt dafür, dass der Container nach Beendigung des Tests automatisch gelöscht wird.
- `-e API=go-api` setzt die Umgebungsvariable, die Labels für den Testlauf definiert für z.B. Logging oder Metriken.
- `-e TARGET=go` setzt die Umgebungsvariable, die festlegt welche API getestet wird (hier die Go-API)
- `-e ROUTE=hash`setzt in Stress-/Spike-Tests die Route die getestet wird und kann in Soak-/Load-Tests weggelassen werden. 
- `k6 run` Startet k6 und führt das Testskript aus.
- `-o experimental-prometheus-rw` sorgt dafür, dass die erzeugten k6 Metriken dirket an Prometheus übergeben werden.
- `scripts/soak.js` gibt das auszuführende k6-Testskript an.

## Monitoring

Die während der Tests erzeugten Metriken werden von Prometheus gesammelt und über Grafana visualisiert.

Standardmäßig ist Grafana erreichbar unter:

http://localhost:3000


## Bachelorarbeit

Dieses Repository enthält ausschließlich die Implementierungen und Testumgebung der Untersuchung.  
Die vollständige Analyse der Ergebnisse ist in der zugehörigen Bachelorarbeit dokumentiert.
Die Arbeit wurde im Bachelor-Studiengang Wirtschaftsinformatik an der IU Internationalen Hochschule erstellt.

## License

See the [LICENSE](LICENSE) file for details.
