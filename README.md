# 📦 Carga Perfecta

Una **Progressive Web App (PWA)** para encontrar la combinación perfecta de pesos que alcance tu objetivo. Funciona en **web y móvil**, incluso **sin conexión a internet**.

## ✨ Características

- ✅ **Responsive Design** - Funciona perfectamente en web, tablet y móvil
- ✅ **PWA Completa** - Instalable como app nativa
- ✅ **Offline First** - Funciona sin conexión a internet
- ✅ **Dark Mode** - Adaptación automática al tema del dispositivo
- ✅ **Algoritmo Optimizado** - Búsqueda rápida de combinaciones
- ✅ **Exportar Resultados** - Descarga los resultados en CSV
- ✅ **Sin Dependencias** - JavaScript puro, sin frameworks externos

## 🚀 Instalación Rápida

### Opción 1: Usar directamente (Web)
Solo abre la app en tu navegador desde aquí:
👉 https://github.com/margil705-commits/carga-perfecta-

### Opción 2: Instalar como App (PWA)

#### iOS (Safari)
1. Abre la app en Safari
2. Toca el icono "Compartir" (↑)
3. Selecciona "Añadir a pantalla de inicio"
4. ¡Listo! Aparecerá en tu pantalla de inicio

#### Android (Chrome)
1. Abre la app en Chrome
2. Toca el menú (⋮)
3. Selecciona "Instalar app"
4. ¡Listo! Se instalará como una app nativa

#### Escritorio (Cualquier navegador)
1. Abre la app en el navegador
2. Busca el icono de instalación (en la barra de dirección)
3. Haz clic en "Instalar"

## 📖 Cómo Usar

### Paso 1: Ingresa los pesos
```
Ejemplo: 3010,2478,2540,2876,2779,1804,2686,1446,2386,2714,2466,2878,3028
```
Separa los valores con comas (sin espacios)

### Paso 2: Establece el objetivo
```
Ejemplo: 25000
```
Ingresa el peso total que deseas alcanzar

### Paso 3: Configura opciones (opcional)
- **Mínimo de items:** ¿Cuántos items mínimo?
- **Máximo de items:** ¿Cuántos items máximo?

### Paso 4: Haz clic en "🔍 CALCULAR"

### Paso 5: Ve los resultados
La app mostrará:
- ✅ Items seleccionados
- 📊 Total calculado
- 📈 Diferencia con el objetivo
- 🎯 Precisión del resultado

### Paso 6: Descarga los resultados (opcional)
Haz clic en "📥 Descargar CSV" para guardar los resultados

## 🧮 Cómo Funciona

La app utiliza un algoritmo de búsqueda en profundidad (DFS) que:

1. **Genera combinaciones** - Crea todas las combinaciones posibles de pesos
2. **Filtra por rango** - Solo considera combinaciones entre el mínimo y máximo de items
3. **Calcula diferencia** - Compara cada combinación con el objetivo
4. **Retorna la mejor** - Devuelve la combinación más cercana al objetivo

**Complejidad:** O(2^n) en el peor caso, optimizada por:
- Búsqueda ordenada descendente
- Límite de iteraciones (100,000)
- Detención temprana si encuentra solución perfecta

## 📁 Estructura del Proyecto

```
carga-perfecta-/
├── index.html          # Interfaz principal
├── style.css           # Estilos responsive + dark mode
├── app.js              # Lógica de la aplicación
├── sw.js               # Service Worker (offline)
├── manifest.json       # Configuración PWA
├── .gitignore          # Archivos ignorados
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Descripción |
|-----------|-------------|
| **HTML5** | Estructura semántica |
| **CSS3** | Grid, Flexbox, Media Queries, Dark Mode |
| **JavaScript (ES6+)** | Lógica pura sin dependencias |
| **Service Worker** | Funcionalidad offline |
| **Web App Manifest** | Instalación como PWA |

## 📊 Performance

- **Tamaño total:** < 50KB
- **Tiempo de carga:** < 1s (con caché)
- **Offline:** 100% funcional
- **Compatibilidad:** 95%+ navegadores modernos
- **Iteraciones máx:** 100,000 (previene bloqueos)

## 🌐 Compatibilidad

| Navegador | Desktop | Móvil |
|-----------|---------|-------|
| Chrome    | ✅      | ✅    |
| Firefox   | ✅      | ✅    |
| Safari    | ✅      | ✅    |
| Edge      | ✅      | ✅    |
| Opera     | ✅      | ✅    |

## 🔒 Privacidad y Seguridad

- **100% local** - Todo se procesa en tu dispositivo
- **Sin servidores** - No se envía información a ningún lado
- **Sin cookies** - No se almacenan datos personales
- **Código abierto** - Puedes revisar el código fuente
- **Datos de caché** - Solo archivos necesarios para funcionar offline

## 💡 Ejemplos de Uso

### Ejemplo 1: Cargas de camión
- Pesos: 1000, 1500, 2000, 2500, 3000 kg
- Objetivo: 7000 kg
- Resultado: Selecciona las combinaciones que sumen 7000 kg

### Ejemplo 2: Equipaje de viaje
- Pesos: 2, 3, 5, 7, 11, 13, 17 kg
- Objetivo: 25 kg
- Resultado: Encuentra la mejor distribución

### Ejemplo 3: Inventario
- Pesos: 100, 200, 300, 400, 500 unidades
- Objetivo: 1000 unidades
- Resultado: Optimiza tu inventario

## 🐛 Reportar Problemas

Si encuentras un bug o tienes sugerencias:

1. **Abre un issue en GitHub:**
   - Ve a [Issues](https://github.com/margil705-commits/carga-perfecta-/issues)
   - Haz clic en "New issue"
   - Describe el problema con detalles

2. **Incluye información útil:**
   - Navegador y versión
   - Dispositivo (desktop/móvil)
   - Pasos para reproducir el error
   - Capturas de pantalla si es posible

## ✋ Cómo Contribuir

¿Quieres mejorar la app? ¡Adelante!

1. **Fork el repositorio**
2. **Crea una rama:** `git checkout -b feature/mi-mejora`
3. **Haz tus cambios**
4. **Commit:** `git commit -m "feat: descripción de mi mejora"`
5. **Push:** `git push origin feature/mi-mejora`
6. **Abre un Pull Request**

## 📝 Licencia

Este proyecto está disponible bajo licencia **MIT**. Eres libre de:
- ✅ Usar el código
- ✅ Modificarlo
- ✅ Distribuirlo
- ✅ Incluirlo en proyectos comerciales

Ver archivo LICENSE para más detalles.

## 👨‍💻 Autor

**Mar Gil**
- 🐙 GitHub: [@margil705-commits](https://github.com/margil705-commits)
- 📧 Email: margil705@gmail.com

## 📞 Soporte

¿Tienes preguntas o necesitas ayuda?

- 📖 Revisa la sección "Cómo Usar" arriba
- 🐛 Abre un [issue en GitHub](https://github.com/margil705-commits/carga-perfecta-/issues)
- 💬 Puedes dejar un comentario en las discusiones

## 🙏 Agradecimientos

Gracias por usar **Carga Perfecta** 🚀

Si te fue útil, considera darle una ⭐ al repositorio para ayudar a otros a encontrarlo.

---

**v1.0** | Última actualización: 2024 | [Repositorio](https://github.com/margil705-commits/carga-perfecta-)
