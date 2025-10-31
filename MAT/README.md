Calculadora de Matrices - README

Una calculadora de matrices interactiva y fácil de usar que te permite realizar operaciones matemáticas con 
matrices directamente en tu navegador. Perfecta para estudiantes de matemáticas, ingeniería o cualquier persona que trabaje con álgebra lineal.

Características

**Operaciones con Dos Matrices:**
- **Suma** - Suma dos matrices del mismo tamaño
- **Resta** - Resta dos matrices del mismo tamaño  
- **Multiplicación** - Multiplica matrices compatibles

**Operaciones con Una Matriz:**
- **Multiplicación Escalar** - Multiplica una matriz por un número
- **Transposición** - Intercambia filas por columnas
- **Determinante** - Calcula el determinante de matrices 2x2, 3x3 y mayores
- **Matriz Inversa** - Encuentra la inversa de matrices cuadradas
- **Matriz Identidad** - Genera matrices identidad de cualquier tamaño

 **Herramientas Adicionales**
-  **Botón Random** - Llena automáticamente las matrices con números aleatorios
-  **Botón Clear** - Limpia todas las matrices y resultados (doble click)

### Cómo Usar

### Realizar Operaciones
- **Operaciones binarias**: Haz clic en Suma, Resta o Multiplicación MAT
- **Operaciones unarias**: 
  - Selecciona la operación deseada
  - El sistema te pedirá que elijas Matriz A o B
  - Sigue las instrucciones adicionales si es necesario

### Ver Resultados
- Los resultados aparecen en la sección inferior
- Para matrices: se muestra en formato de cuadrícula
- Para determinantes: se muestra el valor numérico
- Los resultados tienen 4 decimales de precisión

## Estructura del Proyecto

├── matrices.html      
├── style.css          
├── operaciones.js     
└── IMG/
    ├──  random.png    
    └──  erase.png      

- Usa Grid para crear las matrices de forma dinámica
- Los botones están organizados en una "caja de herramientas"

# Explicación Detallada de las Operaciones Matriciales

### **Suma de Matrices**
La función `crearMATsum` realiza la suma elemento por elemento. Primero, verifica que `MATA` y `MATB` tengan las mismas dimensiones mediante validaciones de `MATA.length` y `MATA[0].length`. Si pasan la validación, recorre cada posición `[i][j]` usando bucles y calcula `MATA[i][j] + MATB[i][j]`. El resultado se almacena en una nueva matriz que retorna la función.

### **Resta de Matrices**  
La función `crearMATres` funciona de manera similar a la suma, pero en lugar de sumar, resta los elementos correspondientes.

### **Multiplicación de Matrices**
La función `crearMATmulti` implementa el algoritmo de multiplicación estándar. Primero valida que las columnas de `MATA` (`MATA[0].length`) igualen las filas de `MATB` (`MATB.length`). Luego usa tres bucles: el externo recorre las filas de `MATA`, el medio recorre las columnas de `MATB`, y el interno realiza el producto punto sumando `MATA[i][k] * MATB[k][j]`. La variable `suma` acumula el resultado para cada celda de la matriz resultante.

### **Multiplicación por Escalar**
La función `crearMATesca` toma la `MAT` original y el parámetro `escalar`. Mediante bucles anidados, recorre cada elemento `MAT[i][j]` y lo multiplica por el `escalar`. Esta operación se aplica uniformemente a toda la matriz, modificando la magnitud pero no la estructura de los datos.

### **Transposición de Matriz**
La función `crearMATtrans` reorganiza la matriz intercambiando índices. El bucle externo itera sobre las columnas originales (`MAT[0].length`) y el interno sobre las filas (`MAT.length`). Asigna `MAT[j][i]` a `resultado[i][j]`, efectivamente volteando la matriz sobre su diagonal principal.

### **Determinante de Matriz**
El sistema utiliza dos funciones: `crearMATdet` para el cálculo principal y `determinanteGauss` para matrices grandes. Para matrices 2×2 y 3×3, `crearMATdet` aplica fórmulas directas. Para matrices mayores, llama a `determinanteGauss` que implementa eliminación gaussiana con pivoteo, trabajando sobre una copia `MATTemp` de la matriz original y ajustando el signo del determinante `det` durante los intercambios de filas.

### **Matriz Inversa**
La función `crearMATinv` implementa el algoritmo de Gauss-Jordan. Primero verifica que la matriz sea cuadrada y que su determinante (calculado con `crearMATdet`) no sea cero. Luego crea una matriz aumentada `aumentada` combinando la matriz original con la identidad. Mediante operaciones de fila que incluyen pivoteo y eliminación, transforma la mitad izquierda en la matriz identidad, convirtiendo la mitad derecha en la inversa. Finalmente, `verificarMATinv` valida el resultado multiplicando la matriz original por la inversa calculada y verificando que se aproxime a la identidad.

### **Matriz Identidad**
La función `crearMatIDT` genera matrices identidad de tamaño especificado. Usa bucles anidados donde asigna `1` cuando los índices `i` y `j` son iguales (diagonal principal) y `0` en cualquier otra posición. El parámetro `tamanio` controla las dimensiones de la matriz resultante.

