# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Contexto del Agente: Catálogo Digital Brunēa

Este documento define las reglas, arquitectura y estándares para el desarrollo del catálogo de Brunēa. El objetivo es construir una plataforma escalable, segura y de alto rendimiento.

## 1. Stack Tecnológico

- **Frontend:** Next.js (App Router) + TypeScript.
- **Estilos:** Tailwind CSS (Diseño responsive y minimalista).
- **Backend/BaaS:** Supabase (PostgreSQL, Auth, Storage).
- **Validación:** Zod (Esquemas de datos estrictos).
- **Despliegue:** Vercel.

## 2. Principios de Desarrollo (Mandatorios)

Todo código generado debe adherirse estrictamente a:

- **SOLID & DRY:** Evitar la duplicación de lógica y asegurar que cada clase/función tenga una única responsabilidad.
- **Escalabilidad:** El sistema debe permitir la transición de "Catálogo" a "E-commerce" sin refactorizaciones masivas (ej. soporte para categorías y subcategorías).
- **Tipado Estricto:** Uso obligatorio de interfaces y tipos de TypeScript para evitar el uso de `any`.
- **Clean Code:** Nombres de variables descriptivos en inglés o español (mantener consistencia), funciones pequeñas y código legible.

## 3. Arquitectura y Estructura de Carpetas

Seguiremos una estructura modular:

- `/app`: Rutas y Server Components.
- `/components/ui`: Componentes atómicos de interfaz (botones, inputs).
- `/components/catalog`: Lógica visual específica del catálogo (cards, filtros).
- `/lib`: Clientes de terceros (Supabase) y utilitarios.
- `/actions`: Server Actions para mutaciones de datos (CRUD de productos).
- `/schemas`: Definiciones de Zod para validaciones de formulario y base de datos.

## 4. Seguridad y Base de Datos

- **Row Level Security (RLS):** Las políticas de Supabase deben configurarse para que solo el rol `authenticated` (Admin) pueda realizar INSERT/UPDATE/DELETE. Los usuarios anónimos solo tienen acceso a SELECT.
- **Server Actions:** Toda interacción de escritura en la base de datos debe ocurrir en el lado del servidor, validando la sesión del usuario antes de ejecutar la operación.
- **Input Sanitization:** Uso obligatorio de Zod para limpiar y validar cualquier entrada del usuario antes de procesarla.

## 5. Especificaciones del Negocio (Brunēa)

- **Localización:** Marca basada en Trujillo, Perú. El formato de moneda es `S/.` (Soles).
- **Flujo de Venta:** El botón "¡La quiero!" debe generar un enlace dinámico a la API de WhatsApp con un mensaje predefinido que incluya el nombre y precio del producto.
- **Optimización de Imágenes:** Uso obligatorio del componente `next/image` para asegurar carga rápida (WebP) y evitar penalizaciones de SEO/Core Web Vitals.

## 6. Instrucciones para la Generación de Código

1. **Prioridad de Server Components:** Utilizar componentes de servidor por defecto para mejorar el SEO y la velocidad de carga.
2. **Manejo de Errores:** Implementar bloques `try/catch` en las Server Actions y mostrar estados de error claros en la UI mediante `error.tsx`.
3. **Estilo Visual:** Seguir una paleta de colores orgánica (Verde oliva, beige, blanco) similar a la identidad visual de la marca proporcionada.

## 7. Esquema de Base de Datos (Supabase)

El modelo de datos es relacional y estricto. La IA debe generar las interfaces de TypeScript basadas exactamente en este esquema:

### Tabla: `categories`

- `id`: UUID (PK)
- `name`: string
- `slug`: string (Unique, para URLs amigables)
- `created_at`: timestamp

### Tabla: `products`

- `id`: UUID (PK)
- `category_id`: UUID (FK -> categories.id. Comportamiento ON DELETE RESTRICT para evitar borrar categorías con productos asignados).
- `name`: string
- `description`: string (Opcional)
- `price`: number (Mapeado desde NUMERIC(10, 2) en BD).
- `image_url`: string (URL apuntando al bucket de Supabase Storage).
- `is_active`: boolean (Usado para ocultar productos sin stock en lugar de eliminarlos).
- `created_at`: timestamp
- `updated_at`: timestamp

**Nota de Seguridad:** Las mutaciones (Server Actions) deben asumir que la base de datos tiene RLS habilitado. No se deben pasar claves de servicio (`service_role` key) al cliente bajo ninguna circunstancia.
