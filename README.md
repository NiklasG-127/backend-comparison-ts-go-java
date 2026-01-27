# backend-comparison-ts-go-java

Dieses Repository stellt die Codebasis für die Bachelorarbeit mit dem Titel "Vergleich moderner Programmiersprachen für die Backend-Entwicklung – Eine empirische Untersuchung am Beispiel von TypeScript, Go und Java" dar.
Ziel ist hierbei eine Performance Evaluation der Programmiersprachen Java, TypeScript und Go im Backend-Umfeld. 


## Tech Stack
– Java (Spring Boot, Maven)

– Typescript (Express.js)

– Go (net/http)

– Docker, Docker Compose

– Prometheus

– Grafana 

– k6

## Repository Struktur
```text
apis/       # Beinhaltet die Implementierungen der APIs in Java/Go/TS
    
grafana/    # Beinhaltet die Dashboards für die Visualisierung der Statistiken
    
k6/         # Beinhaltet die k6-Testscripts, welche die Tests durchführen
    
prometheus/ # Beinhaltet das Monitoring mit Prometheus
```


