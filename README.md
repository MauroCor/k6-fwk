# K6-ACADEMY

## 1. Instalación

### Linux (Debian/Ubuntu)
```bash
sudo apt update
sudo apt install -y gnupg software-properties-common
wget -q -O - https://dl.k6.io/key.gpg | sudo apt-key add -
echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt update && sudo apt install -y k6
```

### Windows (Chocolatey)
```powershell
choco install k6 -y
```
Si choco no se reconoce en PowerShell, puede ser que Chocolatey no esté instalado o que no esté en el PATH. Prueba lo siguiente:

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Luego volver a ejecutar:
```bash
choco install k6 -y
```

## 2. k6 Cloud Login
```bash
# Obtener API Token desde app.k6.io → Settings → API Tokens
k6 cloud login --token <YOUR_API_TOKEN>
```

## 3. Ejecutar Tests

### Local
```bash
k6 run path/to/test.js
```

### Con k6 Cloud
```bash
k6 cloud run path/to/test.js
```
- `k6 cloud` sube resultados a la plataforma y genera reportes interactivos.

## 4. Principales Executors

- **`constant-vus`**  
  Ejecuta con un número fijo de VUs (Users) durante X segundos.
  | Campo      | Tipo   | Descripción                            |
  | ---------- | ------ | -------------------------------------- |
  | `executor` | string | `"constant-vus"`                       |
  | `vus`      | number | Número fijo de VUs.                    |
  | `duration` | string | Duración total del test (ej. `"30s"`). |

- **`ramping-vus`**  
  Escala VUs de un valor inicial a uno final en un período (ideal para ramp-up/ramp-down).
  | Campo      | Tipo   | Descripción                              |
  | ---------- | ------ | ---------------------------------------- |
  | `executor` | string | `"ramping-vus"`                          |
  | `stages`   | array  | Array de objetos `{ duration, target }`. |

  ```bash
  stages: [
    { duration: '1m', target: 10 },
    { duration: '2m', target: 20 },
    { duration: '1m', target: 0 },
  ]
  ```

- **`shared-iterations`**  
  Ejecuta un total de iteraciones compartidas entre VUs; se detiene cuando se completan todas.
  | Campo        | Tipo   | Descripción                                   |
  | ------------ | ------ | --------------------------------------------- |
  | `executor`   | string | `"shared-iterations"`                         |
  | `iterations` | number | Total de iteraciones a ejecutar.              |
  | `vus`        | number | Número de VUs para compartir las iteraciones. |

- **`per-vu-iterations`**  
  Cada VU ejecuta N iteraciones y luego se detiene.
  | Campo        | Tipo   | Descripción                          |
  | ------------ | ------ | ------------------------------------ |
  | `executor`   | string | `"per-vu-iterations"`                |
  | `vus`        | number | Número de VUs.                       |
  | `iterations` | number | Cantidad de iteraciones por cada VU. |

- **`constant-arrival-rate`**  
  Genera un número fijo de requests/segundo durante X segundos, escalando VUs según necesidad.
  | Campo             | Tipo   | Descripción                                       |
  | ----------------- | ------ | ------------------------------------------------- |
  | `executor`        | string | `"constant-arrival-rate"`                         |
  | `rate`            | number | Requests/segundo a generar.                       |
  | `timeUnit`        | string | Intervalo base de generación, típicamente `"1s"`. |
  | `duration`        | string | Duración total del test.                          |
  | `preAllocatedVUs` | number | VUs iniciales asignados.                          |

- **`ramping-arrival-rate`**  
  Ajusta la tasa de requests/segundo de un valor inicial a uno final en un período.
  | Campo             | Tipo   | Descripción                                       |
  | ----------------- | ------ | ------------------------------------------------- |
  | `executor`        | string | `"ramping-arrival-rate"`                          |
  | `timeUnit`        | string | Intervalo base de generación, típicamente `"1s"`. |
  | `stages`          | array  | Array de objetos `{ duration, target }`           |
  | `preAllocatedVUs` | number | VUs iniciales asignados.                          |

  ```bash
  stages: [
    { duration: '2m', target: 50 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 },
  ]
  ```

---

> Para más detalles de cada executor:  
> https://k6.io/docs/using-k6/scenarios/executors/
