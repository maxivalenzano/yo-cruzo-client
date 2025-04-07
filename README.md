# Yo Cruzo - Puente en Conexión

<p align="center">
  <img src="./assets/icon.png" alt="Yo Cruzo Logo" width="200"/>
</p>

## 🌉 Descripción del Proyecto

**Yo Cruzo** es una aplicación móvil diseñada específicamente para facilitar el transporte compartido entre las ciudades de Resistencia (Chaco) y Corrientes (Corrientes), separadas por el puente General Manuel Belgrano. La plataforma permite a conductores publicar sus viajes planificados y a pasajeros unirse a estos viajes, compartiendo gastos y reduciendo el impacto ambiental.

El nombre "Yo Cruzo" hace referencia al acto de cruzar el puente que conecta estas dos ciudades, una actividad cotidiana para muchos habitantes de la región.

## 🚀 Características Principales

### Para Pasajeros

- Búsqueda de viajes por destino, fecha y hora
- Reserva de asientos en viajes disponibles
- Sistema de chat en tiempo real con conductores
- Notificaciones push para actualizaciones de viajes
- Historial de viajes y reservas

### Para Conductores

- Publicación de viajes con detalles de ruta, hora y asientos disponibles
- Gestión de solicitudes de pasajeros
- Administración de vehículos personales
- Sistema de valoraciones y reseñas

## 💻 Tecnologías Utilizadas

### Frontend

- **React Native**: Framework principal para desarrollo cross-platform
- **Expo**: Plataforma para agilizar el desarrollo de aplicaciones React Native
- **Redux**: Gestión del estado global de la aplicación
- **React Navigation**: Sistema de navegación (Drawer y Stack)
- **React Hook Form**: Manejo y validación de formularios
- **Socket.IO Client**: Comunicación en tiempo real para chat
- **Dayjs**: Manipulación de fechas y horas

### Backend e Infraestructura

- **Firebase**:
  - Autenticación de usuarios
  - Cloud Storage para almacenamiento de imágenes
- **Expo Notifications**: Sistema de notificaciones push
- **Google Maps API**: Geolocalización y búsqueda de direcciones
- **Hermes JS Engine**: Motor JavaScript optimizado para React Native

## 📱 Capturas de Pantalla

[Aquí irían capturas de pantalla de la aplicación]

## 🧩 Estructura del Proyecto

```
yo-cruzo-client/
├── assets/                # Recursos estáticos (imágenes, fuentes)
├── src/
│   ├── components/        # Componentes de la aplicación
│   │   ├── Commons/       # Componentes comunes reutilizables
│   │   ├── Controls/      # Componentes de control (DatePicker, etc.)
│   │   ├── Chat/          # Componentes relacionados con el chat
│   │   ├── Profile/       # Componentes del perfil de usuario
│   │   ├── SearchTrips/   # Componentes de búsqueda de viajes
│   │   ├── Trips/         # Componentes de gestión de viajes
│   ├── constants/         # Constantes de la aplicación
│   ├── helpers/           # Funciones auxiliares
│   ├── hooks/             # Hooks personalizados
│   ├── navigations/       # Configuración de navegación
│   ├── redux/             # Estado global con Redux
│   │   ├── actions/       # Acciones de Redux
│   │   ├── reducers/      # Reducers de Redux
│   ├── services/          # Servicios de API, notificaciones, etc.
```

## 🔄 Flujo de Trabajo Principal

### Pasajeros

1. El usuario inicia sesión o se registra
2. Selecciona rol "Pasajero" en el menú lateral
3. Busca viajes en la pantalla principal (SearchTripPage)
4. Visualiza los resultados de la búsqueda
5. Selecciona un viaje y solicita unirse
6. Chatea con el conductor para coordinar detalles

### Conductores

1. El usuario inicia sesión o se registra
2. Selecciona rol "Conductor" en el menú lateral
3. Crea un nuevo viaje o gestiona los existentes
4. Acepta o rechaza solicitudes de pasajeros
5. Coordina detalles a través del chat integrado

## 📋 Modelos Principales

### Usuario

- Información personal (nombre, email, teléfono)
- Sistema de roles (conductor/pasajero)
- Calificaciones y reseñas
- Historial de viajes

### Viaje

- Origen y destino
- Fecha y hora de partida
- Asientos disponibles
- Precio por asiento
- Estado (pendiente, en proceso, completado)

### Vehículo

- Información del auto (modelo, color, matrícula)
- Capacidad de pasajeros

## ⚙️ Instalación y Configuración

```bash
# Clonar el repositorio
git clone https://github.com/ottosilva/yo-cruzo-client.git

# Instalar dependencias
cd yo-cruzo-client
npm install

# Configurar variables de entorno
# (Crear archivo .env basado en .env.example)

# Iniciar en modo desarrollo
npm start
```

### Requisitos

- Node.js 14+
- Expo CLI
- Cuenta de Firebase
- API Key de Google Maps

## 🚧 Estado del Proyecto

La aplicación se encuentra actualmente en versión 1.0.8, disponible en Google Play Store (canal alpha) y en continuo desarrollo para incorporar nuevas funcionalidades y mejorar la experiencia de usuario.

## 🚀 Despliegue de la Aplicación

### Tecnologías y Herramientas de Despliegue

- **Expo EAS (Expo Application Services)**: Sistema de build y despliegue para aplicaciones Expo
- **Firebase Cloud Messaging**: Para sistema de notificaciones push
- **Google Play Console**: Portal de administración para publicaciones en Google Play
- **Google Cloud Platform**: Para APIs de Google Maps y Firebase

### Configuración del Entorno de Desarrollo

1. **Prerrequisitos**:

   - Node.js 14+ y npm/yarn
   - Expo CLI instalado globalmente
   - Cuenta de Expo (expo.dev)
   - Cuenta de Google Play Console (para publicaciones)
   - Proyecto en Firebase
   - Clave de API de Google Maps

2. **Archivos de Configuración**:
   - `app.json`: Configuración principal de Expo
   - `eas.json`: Configuración de perfiles de build de EAS
   - `google-services.json`: Configuración de Firebase para Android
   - `yo-cruzo-app.json`: Cuenta de servicio para Google Play Console

### Desarrollo y Pruebas Locales

```bash
# Instalar dependencias
yarn install

# Iniciar el proyecto con Expo Go (limpiando cache)
npx expo start -c --go

# Desarrollo con cliente específico para la plataforma
npm run android
```

Durante el desarrollo, se puede utilizar Expo Go en dispositivos físicos escaneando el QR generado para ver los cambios en tiempo real.

### Integración con Servicios de Google

#### Google Maps Platform

La aplicación utiliza dos APIs principales de Google Maps:

1. **Places Autocomplete API**: Para la búsqueda de lugares y direcciones

   - Implementado en `CustomGooglePlacesAutocomplete.jsx`
   - Configurado con restricción geográfica para Argentina
   - Parámetros de ubicación centrados en la región del puente (-27.464197, -58.887473)

2. **Distance Matrix API**: Para calcular distancias y tiempos de viaje
   - Implementado en `distanceHelpers.js`
   - Utilizado para calcular precios estimados de viaje basado en distancia

#### Configuración de Firebase para Notificaciones

1. **Instalación de dependencias**:

   ```bash
   expo install @react-native-firebase/app @react-native-firebase/messaging expo-notifications
   ```

2. **Configuración en `app.json`**:

   - `googleServicesFile`: Apuntando al archivo de configuración
   - Permisos necesarios para notificaciones en Android
   - Habilitación de la API de notificaciones con `"expo.android.useNextNotificationsApi": true`

3. **Implementación**:
   - Registro del dispositivo en Firebase al iniciar sesión
   - Generación de token de dispositivo para recibir notificaciones
   - Manejo de notificaciones en primer y segundo plano

### Proceso de Build con EAS

EAS Build es el sistema oficial de Expo para generar archivos de aplicación nativos. En `eas.json` se definen tres perfiles:

1. **Development**: Para pruebas con cliente de desarrollo

   ```bash
   eas build --platform android --profile development
   ```

2. **Preview**: Para distribución interna de pruebas

   ```bash
   eas build --platform android --profile preview
   ```

3. **Production**: Para envío a Google Play Store
   ```bash
   eas build --platform android --profile production
   ```

El comando para generar el build de producción:

```bash
npx expo prebuild --clean  # Limpia y regenera los archivos nativos
eas build --platform android --profile production  # Genera el bundle para producción
```

### Publicación en Google Play Store

1. **Configuración inicial en Google Play Console**:

   - Crear aplicación en Google Play Console
   - Completar ficha de la tienda, clasificación de contenido y precio
   - Configurar cuenta de facturación

2. **Envío de la aplicación**:

   ```bash
   eas submit --platform android --latest --non-interactive
   ```

   Este comando utiliza la cuenta de servicio (`yo-cruzo-app.json`) para autenticarse con Google Play y envía automáticamente el último build generado al track "alpha" especificado en `eas.json`.

3. **Promoción entre tracks**:
   - Alpha → Beta → Producción (desde Google Play Console)
   - Cada cambio de track permite ampliar gradualmente la base de usuarios

### Actualizaciones OTA (Over The Air)

Expo permite actualizar JavaScript y recursos sin enviar una nueva versión a la tienda:

```bash
eas update --branch production --auto --platform android -m "custom message"
```

Este comando:

- `--branch production`: Define el canal de actualización
- `--auto`: Incrementa automáticamente la versión
- `-m`: Añade un mensaje descriptivo del cambio

Las actualizaciones OTA solo sirven para cambios que no requieran modificaciones en código nativo o nuevos permisos.

### Ciclo Completo de Despliegue

1. Desarrollo y pruebas con Expo Go
2. Generación de prebuild limpio
3. Build de producción con EAS
4. Envío a Google Play Store (track alpha)
5. Pruebas en grupo cerrado
6. Promoción a producción
7. Mantenimiento mediante actualizaciones OTA

## 🔑 Seguridad de Claves y Tokens

> **Importante**: Las claves de API, archivos de servicio y tokens deben mantenerse seguros y no compartirse en repositorios públicos. Los archivos incluidos en este repositorio son ejemplos y deben ser reemplazados por tus propias credenciales en implementaciones reales.

## 🧪 Testing y Validación

Antes de cada envío a producción se recomienda:

1. Pruebas de todas las funcionalidades principales
2. Validación de inicio de sesión y registro
3. Verificación del sistema de notificaciones push
4. Comprobación del cálculo de rutas y precios
5. Revisión del rendimiento en dispositivos de gama baja

## 👥 Desarrollado por

- **UTN FRRe - Proyecto Final - Grupo 1**
- **Email**: maxivalenzano@gmail.com
- **GitHub**: [github.com/ottosilva](https://github.com/ottosilva)

---

<p align="center">
  Yo Cruzo - Conectando ciudades, compartiendo caminos.
</p>
