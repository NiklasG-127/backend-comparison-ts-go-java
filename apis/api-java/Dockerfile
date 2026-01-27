FROM maven:3.9-eclipse-temurin-25 AS build
WORKDIR /app

COPY pom.xml .

RUN mvn -q -e -DskipTests dependency:go-offline

COPY . .
RUN mvn -q -DskipTests package

FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "/app/app.jar"]