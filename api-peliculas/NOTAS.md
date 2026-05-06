# NOTAS.md

## 1. ¿Por qué es mejor tener el controlador separado de las rutas?

Porque separa responsabilidades:

- Las rutas solo definen las URLs (qué endpoint existe)
- Los controladores contienen la lógica (qué hace cada endpoint)

Esto hace el código más limpio, organizado y fácil de mantener.

Además, permite reutilizar lógica y facilita trabajar en equipo sin pisarse el código.

---

## 2. Si mañana quisieras cambiar los datos en memoria por una base de datos PostgreSQL, ¿en qué archivo harías el cambio principalmente?

Principalmente en:

👉 `src/data/peliculas.js`

Porque ese archivo actúa como capa de acceso a datos (DB layer).

Los controladores no deberían cambiar mucho, ya que solo llaman a funciones como:

- getAll()
- getById()
- create()

Solo cambiaría la implementación interna de esas funciones para que en vez de usar arrays en memoria, usen consultas a PostgreSQL.

---

## 3. ¿Qué pasaría si en el router tuvieras /:id antes que /:id/resenas?

Express interpreta las rutas en orden, así que:

- `/:id` capturaría también `/1/resenas`
- Entonces nunca llegaría a la ruta `/resenas`

Resultado:

👉 `/api/peliculas/1/resenas` sería interpretado como:

- id = "1"
- y "resenas" se ignoraría o causaría error

Por eso siempre deben ir primero las rutas más específicas:

✔ `/api/peliculas/:id/resenas`
✔ luego `/api/peliculas/:id`
