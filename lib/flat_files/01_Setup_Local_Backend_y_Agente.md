# Setup Local - Backend Core y Agente de Observabilidad (NovaPay)

Este documento detalla los pasos para levantar el entorno de desarrollo local para el core transaccional de NovaPay y nuestro agente de monitoreo interno.

## 1. Core Transaccional (Go)
Nuestro backend principal maneja la concurrencia de pagos y está escrito en Go.
- **Repositorio:** `github.com/novapay-sv/core-tx`
- **Requisitos:** Go 1.22+, Docker & Docker Compose.
- **Pasos:**
  1. Clonar el repositorio: `git clone git@github.com:novapay-sv/core-tx.git`
  2. Levantar la base de datos: Ejecutar `docker-compose up -d` para iniciar la instancia local de MongoDB (puerto 27017).
  3. Instalar dependencias: `go mod download`
  4. Ejecutar el servidor: `go run cmd/server/main.go`. El servidor se levantará en `localhost:8080`.

## 2. Agente de Observabilidad (eBPF)
Para no sobrecargar los servicios con logs innecesarios, usamos un agente custom basado en eBPF para capturar métricas de red y latencia directamente desde el kernel.
- **Repositorio:** `github.com/novapay-sv/net-observer-ebpf`
- **Importante:** Dado que eBPF interactúa con el kernel de Linux, este agente *no* correrá nativamente en macOS o Windows. 
- **Setup local:** Debes usar el entorno provisto en Vagrant o ejecutarlo dentro de un contenedor Docker privilegiado (`docker run --privileged`).
- **Comando de inicio:** `sudo ./bin/observer-agent --config local.yaml`.
