# Sistema de Reservación de Citas Médicas

Aplicación web desarrollada con Angular y Formularios Reactivos para la gestión e integración de citas médicas en un entorno clínico.

## Integrantes del Equipo y Roles

| Nombre | Rol | Responsabilidad Principal |
| :--- | :--- | :--- |
| **Diego** | Scrum Master / Coordinador | Configuración inicial, repositorio, rama develop, integraciones. |
| **Mario** | Desarrollador de Formulario | Construcción del FormGroup, campos reactivos y mensajes de error. |
| **Ángel** | Desarrollador de Listado | Renderizado de tabla de citas, acciones de edición/eliminación y filtros. |
| **Brayan** | Desarrollador de Lógica y Validaciones | Expresiones regulares (DPI, Teléfono), validación de horarios y fechas. |
| **Marlon** | QA / Diseño y Documentación | Estilos externos, ejecución de pruebas, recolección de evidencias y README. |

## Estrategia de Ramas

Se utilizó un flujo de trabajo basado en GitFlow simplificado:
* `main`: Producción (únicamente recibe merge final desde `develop`).
* `develop`: Integración continua de funcionalidades.
* `feature/formulario`: Trabajo individual de Mario.
* `feature/listado`: Trabajo individual de Ángel.
* `feature/validaciones-logica`: Trabajo individual de Brayan.
* `feature/estilos-pruebas`: Trabajo individual de Marlon.

## Instrucciones de Ejecución

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITO>
   cd reservacion-citas-medicas