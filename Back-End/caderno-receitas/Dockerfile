# Estágio de Build
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
# Copia TUDO (incluindo a pasta Wallet) para dentro da imagem de build
COPY . .
RUN mvn clean package -DskipTests

# Estágio Final
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copia apenas o .jar do estágio anterior
COPY --from=build /app/target/*.jar app.jar
# Copia a pasta Wallet do estágio anterior para o destino correto
COPY --from=build /app/Wallet /opt/oracle/wallet

EXPOSE 8080
ENTRYPOINT ["java", "-Doracle.net.tns_admin=/opt/oracle/wallet", "-jar", "app.jar"]