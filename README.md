# Simulador de areas - 2D

Aplicacion web interactiva con para calcular, administrar, ordenar y transformar areas de diferentes figuras geometricas y formas personalizadas

## Que hace?
* **renderizado dinamico:** muestra la tabla de figuras en tiempo real desde un array y calcula el area total acumulada automaticamente
* **agregar figuras:** mete figuras individuales  (circulos, cuadrados, rectangulares) donde permite ingresar sus medidas o areas personalizadas, y trae botones para cargar conjuntos de areas
* **visualizacion y filtros:** botones para ordenar la lista ascendente o descendente por area, y buscadores para encontrar elementos por id o por un valor de area exacto y ademas conserva el ultimo estado en que se guardo
* **edicion y eliminacion:** borra la primera, la ultima, borra por indice exacto, reemplaza el area de una figura o cambia las unidades entre centimetros cuadrados (cm^2) y metros cuadrados (m^2)
* **mensajes de alerta visual:** toda interaccion (aviso de errores y confirmaciones) se muestra directo en la interfaz por secciones

## estructura del proyecto
```text
/
├── index.html         # estructura de la pagina
├── styles/
│       └── style.css      # los estilos y
└── js/
        └── main.js        # la logica, clases, funciones y eventos
```
