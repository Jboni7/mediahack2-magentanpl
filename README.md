
# VisioJobs

> **Sistema inteligente de monitoreo y agregación de información en tiempo real.**  
> _El produtco no es un sistema genérico de alertas de noticias electorales es más una estación de trabajo personalizada de inteligencia electoral para periodistas._


 <img width="787" height="597" alt="image" src="https://github.com/user-attachments/assets/3ad5840f-c441-4d6d-ab8b-acb4ca22ccaf" />

Cuando un profesional de los medios recibe una alerta, puede abrir la aplicación y acceder a un panel de control adaptado a sus necesidades de monitoreo, donde las noticias y novedades electorales relevantes aparecen organizadas, resumidas y jerarquizadas, con enlaces a sus fuentes oficiales originales.

# Concepto clave

**VisioJob = Qué + Dónde + Cuándo + Relevancia**

Por ejemplo:

> **VisioJob: _“Monitorear la actividad electoral que afecte a los sectores del norte de Quito durante el periodo de campaña”_**
>
> **Qué**: Actividad de candidatos, eventos de campaña, resoluciones electorales 
> **Dónde**: Pichincha → Quito → Sectores del norte
> **Cuándo**: 15 de agosto – 15 de septiembre
> **Relevancia**: Candidatos específicos, partidos, palabras clave o tipos de eventos

A continuación, el sistema vigila continuamente la aparición de novedades que coincidan con estos criterios y las presenta al periodista para ayudarle a continuar con sus investigaciones.

# Flujo del producto

>**Crear VisioJob
> ↓
> Definir la actividad electoral
> ↓
> Definir el alcance geográfico
> ↓
> Definir el periodo de tiempo
> ↓
> Definir relevancia / entidades / palabras clave
> ↓
> La IA monitorea e interpreta continuamente la información del CNE
> ↓
> Se detecta actividad relevante
> ↓
> Notificación en tiempo real en la aplicación
> ↓
> Abrir el panel de control de VisioJob
> ↓
> Leer las novedades priorizadas y resumidas
> ↓
> Verificar con la fuente original del CNE**

Esto hace que el producto se aleje de ser un sistema genérico de alertas de noticias electorales y se convierta más bien en una estación de trabajo personalizada de inteligencia electoral para periodistas. 

> En esencia, VisioJob le indica al sistema: 

> **_“Esta es la historia electoral que estoy siguiendo. Mantente atento a ella por mí”._**  
> y 
> **_"Ayudame a condujir investigaciones electorales al tiempo"_**

## 🚀 ¿Qué es VisioJobs?

**VisioJobs** 
La plataforma es un **panel de monitoreo electoral impulsado por inteligencia artificial, diseñado para profesionales de los medios y organizaciones periodísticas.** Permite a los usuarios crear tareas de monitoreo altamente específicas, denominadas «VisioJobs», que definen con exactitud qué actividad electoral desean monitorear, dónde quieren hacerlo y durante qué período.

El sistema utiliza  **Inteligencia Artificial (NLP)**  para escanear automáticamente sitios web oficiales y portales de interés, detectar nuevas publicaciones, verificar su autenticidad y generar resúmenes en lenguaje natural. Gracias a sus  **filtros inteligentes 'VisioJobs'**, el usuario solo recibe correos sobre lo que le interesa: su ubicación, tipo de oportunidad, palabras clave específicas o sectores industriales.

## ✨ Características Principales

-   🤖  **Extracción con IA:**  Un agente inteligente escanea las fuentes web detectando actualizaciones y resumiendo documentos complejos en textos fáciles de leer.
-   🎯  **Filtrado Personalizado:**  El usuario configura preferencias por ubicación, sector, tipo de evento o palabras clave.
-   📧  **Notificaciones Automatizadas:**  Correos electrónicos enviados al instante (o en resumen diario/semanal) cuando hay novedades relevantes.
-   🔒  **Verificación de Fuente:**  La IA evalúa la confianza de la información para evitar rumores o datos no oficiales.
-   📊  **Historial y Transparencia:**  Registro completo de todo lo recibido con enlaces directos a la fuente original.

## 🛠️ Arquitectura y Tecnologías

**Backend**
Python / FastAPI
Lógica de negocio, gestión de usuarios y orquestación.

**IA & NLP**
LLM (ej. Qwen, Llama)
Procasamiento de lenguaje natural para resumen y clasificación.

**Web Scraping**
BeautifulSoup / Scrapy
Extracción de datos de fuentes web respetando términos de uso.

**Base de Datos**
PostgreSQL
Almacenamiento de usuarios, filtros, contenido y logs.

**Email**
SMTP / SendGrid
Envío de notificaciones estructuradas.

**Scheduler**
Celery / APScheduler
Tareas programadas para verificar actualizaciones periódicamente.

## 📋 Estructura del Proyecto

```
visiojobs/
├── backend/                # Lógica principal
│   ├── api/                # Endpoints REST
│   ├── core/               # Configuración y seguridad
│   ├── models/             # Modelos de datos (SQLAlchemy)
│   ├── services/
│   │   ├── scraper.py      # Lógica de extracción de fuentes
│   │   ├── ai_processor.py # Procesamiento con IA
│   │   └── email_service.py # Envío de correos
│   └── main.py
├── database/
│   ├── schema.sql          # Diseño de la base de datos
│   └── migrations/         # Migraciones de base de datos
├── scripts/                # Scripts de utilidad y tests
├── tests/                  # Pruebas unitarias
├── .env.example            # Variables de entorno
├── requirements.txt        # Dependencias de Python
└── README.md
```

## ⚙️ Configuración y Uso

### 1. Prerrequisitos
-   Python 3.9+
-   PostgreSQL 12+
-   Cuenta de correo SMTP o servicio de emails (SendGrid, Mailgun, etc.)
-   API Key del proveedor de IA seleccionado

### 2. Instalación
```
# Clonar el repositorio
git clone https://github.com/tu-usuario/visiojobs.git
cd visiojobs

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales (DB_URL, AI_API_KEY, SMTP_CONFIG)
```

### 3. Migración de Base de Datos
```
psql -U postgres -d visiojobs_db -f database/schema.sql
```

### 4. Ejecución

```
# Iniciar el servidor y el worker de IA
python backend/main.py
```

## 📝 Flujo de Trabajo

1.  **Escaneo:**  El sistema verifica las fuentes web cada  `X`  minutos.
2.  **Extracción:**  Detecta nuevos artículos, ofertas o actualizaciones.
3.  **Análisis IA:**
    -   Clasifica el contenido (Oferta, Noticia, Alerta, etc.).
    -   Genera un resumen en lenguaje natural.
    -   Verifica la autenticidad.
4.  **Filtrado:**  Compara el contenido con los filtros de los usuarios activos.
5.  **Entrega:**  Envía el correo correspondiente o lo agrega al resumen diario.


## 📄 Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo  LICENSE  para más detalles.

## ⚠️ Descargo de Responsabilidad
Este proyecto es una herramienta de  **información ciudadana y profesional**.

-   No está afiliado, respaldado ni autorizado por ninguna entidad gubernamental o privada específica (salvo aclaración en el código).
-   La información se extrae de fuentes públicas y se procesa con fines informativos.
-   El uso de la herramienta debe respetar los términos de servicio de los sitios web monitoreados y las leyes de protección de datos.


