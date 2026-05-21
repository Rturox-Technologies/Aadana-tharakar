# ============================================================
# Stage 1: Build — Maven + JDK 21
# ============================================================
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /build

# Cache dependency resolution layer separately from source changes
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and compile/package
COPY src ./src
RUN mvn clean package -DskipTests -B

# ============================================================
# Stage 2: Run — Minimal JRE 21 (Jammy)
# ============================================================
FROM eclipse-temurin:21-jre-jammy AS runtime

LABEL maintainer="Aadana Tharakar <support@aadanatharakar.com>"
LABEL description="Aadana Tharakar (ஆதனத் தரகர்) — Tamil Nadu Real Estate Platform Backend"

# Security: run as non-root user
RUN groupadd --system nilaamnai && useradd --system --gid nilaamnai nilaamnai

WORKDIR /app

# Copy packaged JAR from build stage
COPY --from=build /build/target/*.jar app.jar

# Give ownership to non-root user
RUN chown nilaamnai:nilaamnai /app/app.jar

USER nilaamnai

# Expose Spring Boot port
EXPOSE 8080

# Health check: wait 30s before first probe, 15s interval
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/api/v1/health || exit 1

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
