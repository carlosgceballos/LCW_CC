// cargar DOM
document.addEventListener('DOMContentLoaded',function(){
  const matrixTam = document.getElementById('MatTam') //obtener refe del formulario

MatTam.addEventListener('submit',function(e){
  e.preventDefault();

  const seleccA = document.getElementById('tamA');
  const seleccB = document.getElementById('tamB');
  const tamanioA = seleccA.value;
  const tamanioB = seleccB.value;

  if(tamanioA === 'Default' || tamanioB === 'Default'){
    alert('Selecciona tamaños para ambas matrices');
    return;
  }
  
  //convertir de texto a num
  const TamA = parseInt(tamanioA);
  const TamB = parseInt(tamanioB);

  alert('Tamaños procesados: Matriz A ' + TamA + 'x' + TamA + ', Matriz B ' + TamB + 'x' + TamB);
  crearMatrices(TamA, TamB); // Pasar ambos tamaños
});

  //evntos para los botones
  document.getElementById('Suma').addEventListener('click', function(){
    ejecutarope('suma');
  });
  document.getElementById('Resta').addEventListener('click',function(){
    ejecutarope('resta');
  });
  document.getElementById('MMAT').addEventListener('click', function(){
    ejecutarope('multiplicacion')
  });
  document.getElementById('MESC').addEventListener('click', function(){
    ejecutarSeleccionando('escalar');
  });
  document.getElementById('TMAT').addEventListener('click',function(){
    ejecutarSeleccionando('transposicion');
  });
  document.getElementById('DET').addEventListener('click',function(){
    ejecutarSeleccionando('determinante');
  });
  document.getElementById('MINV').addEventListener('click', function(){
    ejecutarSeleccionando('inversa');
  });
  document.getElementById('MIDT').addEventListener('click',function(){
    ejecutarSeleccionando('identidad');
  });
  document.getElementById('erase').addEventListener('dblclick', function(){
    clear();
  })
  document.getElementById('random').addEventListener('click', function(){
  randomNumb();
  });

});

function crearMatrices(tamannioA, tamannioB){
  const spaceMat = document.getElementById('SpaceMat')
  spaceMat.innerHTML='';//limpiar el espacio
  
  // Crear Matriz A con su tamaño
  const secMatrizA = document.createElement('div');
  secMatrizA.className = 'MatSecc';
  const titA = document.createElement('h3');
  titA.textContent = 'Matriz A (' + tamannioA + 'x' + tamannioA + ')';
  secMatrizA.appendChild(titA);

  const gridContA = document.createElement('div');
  gridContA.className='GridMat';
  gridContA.style.gridTemplateColumns = 'repeat(' + tamannioA + ', 70px)';

  for (let i = 0; i < tamannioA; i++){
    for(let j = 0; j < tamannioA; j++){
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'matInput';
      input.placeholder='0';
      input.value='';
      input.dataset.fila = i;
      input.dataset.columna = j;
      input.dataset.MAT = 1; // Matriz A
      gridContA.appendChild(input);
    }
  }
  secMatrizA.appendChild(gridContA);
  spaceMat.appendChild(secMatrizA);

  // Crear Matriz B con su tamaño
  const secMatrizB = document.createElement('div');
  secMatrizB.className = 'MatSecc';
  const titB = document.createElement('h3');
  titB.textContent = 'Matriz B (' + tamannioB + 'x' + tamannioB + ')';
  secMatrizB.appendChild(titB);

  const gridContB = document.createElement('div');
  gridContB.className='GridMat';
  gridContB.style.gridTemplateColumns = 'repeat(' + tamannioB + ', 70px)';

  for (let i = 0; i < tamannioB; i++){
    for(let j = 0; j < tamannioB; j++){
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'matInput';
      input.placeholder='0';
      input.value='';
      input.dataset.fila = i;
      input.dataset.columna = j;
      input.dataset.MAT = 2; // Matriz B
      gridContB.appendChild(input);
    }
  }
  secMatrizB.appendChild(gridContB);
  spaceMat.appendChild(secMatrizB);
}

function procesarDatos(){
  const inputs =  document.querySelectorAll('.matInput');//procesarinputs
  //iniciar matrices vacias
  const MATA = [];
  const MATB = [];

  inputs.forEach(input => {
    const fila = parseInt(input.dataset.fila);
    const columna = parseInt(input.dataset.columna);
    const matrizNum = parseInt(input.dataset.MAT);
    const valor = input.value === '' ? 0 : parseFloat(input.value);
    //                 si esta vacio, usa 0, si no esta vacio, convertir el input a numero

    //organizar los inputs en su matriz respectiva
    if(matrizNum === 1){
      if(!MATA[fila]) MATA[fila]=[];
        MATA[fila][columna]=valor;
      }else{
        if(!MATB[fila]) MATB[fila]=[];
        MATB[fila][columna] = valor;
      }
  });
  return{MATA,MATB}
}

//para ejecutar operaciones con las 2 matrices
function ejecutarope(ope){
  const{MATA,MATB}=procesarDatos();
  const SpaceResul = document.getElementById('SpaceResul');

  if(MATA.length===0 || MATB.length===0){
    alert('Las matrices no han sido generadas');
    return;
  }

  SpaceResul.innerHTML=''; //limpiar resultado anterior si no se ha limpiado

  try {
    let resultado;
    let tituOpe;
    
    switch(ope){
      case 'suma':
        resultado=crearMATsum(MATA, MATB);
        tituOpe = 'Suma de matrices'
        break;
        case 'resta':
          resultado=crearMATres(MATA,MATB);
          tituOpe='Resta de matrices'
          break;
          case 'multiplicacion':
            resultado=crearMATmulti(MATA, MATB);
            tituOpe='Multiplicacion de matrices'
            break;

            default:
              throw new Error('Operacion invalida');
            }
            
            const titu = document.createElement('h3');
            titu.className = 'TituResulOpe';
            const textoTit = 'Resultado: '+ope;
            titu.textContent = textoTit;
            SpaceResul.appendChild(titu); //anexamos nuestro elemento al DOM

            mostrarResultado(resultado,tituOpe);
            
            //manejo de error
          } catch (error) {
            alert('Error: '+error.message);
          }
        }
        
        //funcion para ayudarnos a seleccionar matrices en casos especificos
        function seleccionarMAT(){
  const{MATA,MATB}=procesarDatos();

  const seleccion = prompt('Selecciona Matriz:\nA: Matriz A\nB: Matriz B');
  //si el usuario cancela retornar null
  if(seleccion=== null) return null;

  const MatSelected = seleccion.toUpperCase() === 'A' ? MATA: 
  seleccion.toUpperCase() === 'B' ? MATB : null;

  if(!MatSelected){
    alert('Seleccion invalida');
    return null;
  }

  return{
    matriz: MatSelected, nombre: seleccion.toUpperCase()
  };
}

//funcion para operacion de 1 sola matriz
function ejecutarSeleccionando(ope){
  const{MATA,MATB}=procesarDatos();
  const SpaceResul= document.getElementById('SpaceResul');

  //verificar que se generaron las matrices
  if(MATA.length === 0){
    alert('Necesitas generar las matrices');
    return;
  }

  try {
    // variables para titulo y resultado
    let resultado;
    let tituloOpe;

    switch(ope){
      case 'escalar':
        const seleccMATesc = seleccionarMAT();
        if(!seleccMATesc) return;
        const escalar = prompt('Ingresa el valor escalar:');
        if(escalar === null) return;
        if(isNaN(escalar)){
          throw new Error('Debe introducir un numero');
        }
        resultado=crearMATesca(seleccMATesc.matriz,escalar)
        tituloOpe="Multiplicacion de Matriz x Escalar"
        break;
        
        case 'transposicion':
          const seleccMATtrans = seleccionarMAT();
          if(!seleccMATtrans) return;

          resultado= crearMATtrans(seleccMATtrans.matriz);
          tituloOpe='Transposicion (Matriz '+seleccMATtrans.nombre+')';
          break;

          case 'determinante':
            const seleccMATdet = seleccionarMAT();
            if(!seleccMATdet) return;

            resultado=crearMATdet(seleccMATdet.matriz);
            tituloOpe='Determinante'
            //tituloOpe
            break;
            
            case 'inversa':
              const seleccMATinv = seleccionarMAT();
              if(!seleccMATinv) return;

              // Calcular MAT inversa
              resultado = crearMATinv(seleccMATinv.matriz);
                
              // Verificar que A × A⁻¹ = I
              const verificacion = verificarMATinv(seleccMATinv.matriz, resultado);
              
              if(!verificacion){
                throw new Error('Error en cálculo: la verificación A x A⁻¹ = I falló');
              }
              
              tituloOpe = 'Matriz Inversa (Matriz ' + seleccMATinv.nombre + '⁻¹)';  
              break;

              case 'identidad':
                const selectTam = prompt('Selecciona el tamaño de la matriz identidad:')
                if(selectTam === null)return;

                const tamanio = parseInt(selectTam);

                if(isNaN(tamanio)){
                  alert('Debes ser un numero (2-10)');
                  return;
                }

                if(tamanio<2 || tamanio >10){
                  alert('El tamaño debe ser entre 2 y 10');
                  return;
                }

                resultado=crearMatIDT(tamanio);
                tituloOpe='Matriz identidad('+tamanio+'x'+tamanio+')';
                //titulo ope
                break;

                default:
                  throw new Error('Operacion invalida');
                }

                mostrarResultado(resultado, tituloOpe);
              
              } catch (error) {
                alert('Error: '+error.message)
  }
}

function mostrarResultado(resultado, titulo){
  const SpaceResul = document.getElementById('SpaceResul');
  const contResul = document.createElement('div');
  contResul.className = 'ResulCont';

  const tituloElem = document.createElement('h3');
  tituloElem.className = 'TituloResul';
  tituloElem.textContent = titulo;
  contResul.appendChild(tituloElem);

  if(typeof resultado === 'number'){
    //para el determinante con 4 decimales
    const ValorElem = document.createElement('div');
    ValorElem.className= 'ValorResul';
    ValorElem.textContent='Valor: '+resultado.toFixed(4);
    contResul.appendChild(ValorElem);

  }else{
    //para las matrices
    const MATResultado = document.createElement('div');
    MATResultado.className = 'ResultadoMAT';
    MATResultado.style.gridTemplateColumns = 'repeat('+resultado[0].length+', 70px)';

    for(let i = 0; i <resultado.length;i++){
      for(let j=0; j<resultado[i].length;j++){
        const input = document.createElement('input');
        input.type = 'text';
        input.className = "ResultadoInput";

        const valor = resultado[i][j];
        if(Number.isInteger(valor)){
          input.value = valor;
        }else{
          input.value = valor.toFixed(4);
        }
        input.readOnly=true;
        MATResultado.appendChild(input);
      }
    }
    contResul.appendChild(MATResultado);
  }
  SpaceResul.appendChild(contResul);
}

function crearMatIDT(tamanio){
  const identidad = [];
  for(let i = 0; i < tamanio; i++){
    identidad[i]=[];
    for(let j = 0; j<tamanio;j++){
      identidad[i][j]= i === j ? 1 : 0;
    }
  }
  return identidad;
}

function clear(){
  const spaceMat = document.getElementById('SpaceMat');
  spaceMat.innerHTML='';

  const SpaceResul = document.getElementById('SpaceResul');
  SpaceResul.innerHTML='';

  alert('Limpieza completada');
}

function crearMATtrans(MAT){
  const resultado=[];
  //intercambiamos las filas por columnas
  for(let i=0; i<MAT[0].length; i++){
    resultado[i]=[];
    for(let j=0;j<MAT.length;j++){
      resultado[i][j]=MAT[j][i];
    }
  }
  return resultado;
}

function crearMATsum(MATA, MATB){
  if(MATA.length !== MATB.length || MATA[0].length !== MATB[0].length){
    //filas o columnas
    throw new Error('Las matrices no tienen las mismas dimensiones');
  }

  const resultado=[];
  //sumamos elemto por elemento
  for(let i=0; i<MATA.length;i++){
    resultado[i]=[];
    for(let j = 0; j<MATA[i].length;j++){
      resultado[i][j]=MATA[i][j]+MATB[i][j];
    }
  }
  return resultado;
}

function crearMATres(MATA, MATB){
  if(MATA.length !== MATB.length || MATA[0].length !== MATB[0].length){
    throw new Error('Las matrices no tienen las mismas dimensiones');
  }

  const resultado=[];
  for(let i=0; i<MATA.length;i++){
    resultado[i]=[];
    for(let j = 0; j<MATA[i].length;j++){
      resultado[i][j]=MATA[i][j]-MATB[i][j];
    }
  }
  return resultado;
}

function crearMATmulti(MATA, MATB){
  //validar columna A = filas B
  if(MATA[0].length !== MATB.length){
    throw new Error('Las columnas de A deben ser igual a las filas de B');
  }

  const resultado = [];
  //producto punto
  for(let i=0; i<MATA.length;i++){
    resultado[i]=[];
    for(j=0;j<MATB[0].length;j++){
      let suma=0;
      for(let k = 0; k<MATA[0].length;k++){
        suma+= MATA[i][k]*MATB[k][j];
      }
      resultado[i][j]=suma;
    }
  }
  return resultado;
}

function crearMATesca(MAT,escalar){
  const resultado = [];
  //multiplicacion por el escalar cada elemento
  for(let i=0; i<MAT.length; i++){
    resultado[i]=[];
    for(let j=0; j<MAT[i].length;j++){
      resultado[i][j]=MAT[i][j]*escalar;
    }
  }
  return resultado;
}

function randomNumb(){
  console.log('Funcion Random ejecutada')
  const inputs = document.querySelectorAll('.matInput');
  console.log('Inputs checkk')
  if(inputs.length === 0){
    alert('Matrices no generadas');
    return;
  }

  inputs.forEach(input =>{
    const randomNumber = Math.floor(Math.random() * 21)-10;
    console.log('Asignando',randomNumb, 'a input');
    input.value = randomNumber; 
  })
}

function determinanteGauss(MAT){
  const x = MAT.length;
  let det = 1;
  const MATTemp = [];

  //copia de la matriz
  for(let i = 0; i<x; i++){
    MATTemp[i]=[];
    for(let j=0;j<x;j++){
      MATTemp[i][j]=MAT[i][j];
    }
  }

  console.log('MTemporal creada', MATTemp);

  for(let i =0;i<x;i++){
    console.log('Iteracion' +i);
    console.log('Det parcial: '+det);
    let pivot = i;
    for(let j=i+1; j<x; j++){
      if(Math.abs(MATTemp[j][i]) >Math.abs(MATTemp[pivot][i])){
        pivot=j;
      }
    }

  if(pivot!==i){
    const temp = MATTemp[i];
    MATTemp[i]=MATTemp[pivot];
    MATTemp[pivot]=temp
    det *= -1;
    console.log('cambio de determinante'+det)
  }
  if(Math.abs(MATTemp[i][i])<0.000001){
    return 0;
  }

  det *= MATTemp [i][i];

  for(let j=i+1;j<x;j++){
    const factor = MATTemp[j][i]/MATTemp[i][i];
    for(let k = i; k< x; k++){
      MATTemp[j][k] -= factor * MATTemp[i][k];
    }
  }
}
console.log('fin');
return det;
}

function crearMATdet(MAT){
  const n = MAT.length;

  if(n == 2){
    return MAT[0][0]*MAT[1][1]-MAT[0][1]*MAT[1][0];
  }
  if(n === 3){
    return MAT[0][0] * (MAT[1][1] * MAT[2][2] - MAT[1][2] * MAT[2][1]) 
    - MAT[0][1] * (MAT[1][0] * MAT[2][2] - MAT[1][2] * MAT[2][0]) 
    + MAT[0][2] * (MAT[1][0] * MAT[2][1] - MAT[1][1] * MAT[2][0]);
  }
  console.log('corriendo Gauss');
  return determinanteGauss(MAT);
}

// Función para calcular matriz inversa usando Gauss-Jordan
function crearMATinv(MAT){
  // Validar que la MAT sea cuadrada
  if(MAT.length !== MAT[0].length){
    throw new Error('La matriz debe ser cuadrada para calcular la inversa');
  }
  
  const n = MAT.length;
  
  // Verificar que el determinante no sea cero
  const det = crearMATdet(MAT);
  if(Math.abs(det) < 0.000001){
    throw new Error('La matriz no tiene inversa (determinante = 0)');
  }
  
  // Crear MAT aumentada [A | I]
  const aumentada = [];
  for(let i = 0; i < n; i++){
    aumentada[i] = [];
    for(let j = 0; j < n; j++){
      aumentada[i][j] = MAT[i][j];
    }
    for(let j = 0; j < n; j++){
      aumentada[i][j + n] = (i === j) ? 1 : 0;
    }
  }
  
  // Aplicar eliminación de Gauss-Jordan
  for(let i = 0; i < n; i++){
    // Encontrar pivote máximo
    let pivot = i;
    for(let j = i + 1; j < n; j++){
      if(Math.abs(aumentada[j][i]) > Math.abs(aumentada[pivot][i])){
        pivot = j;
      }
    }
    
    // Intercambiar filas si es necesario
    if(pivot !== i){
      const temp = aumentada[i];
      aumentada[i] = aumentada[pivot];
      aumentada[pivot] = temp;
    }
    
    // Hacer el pivote igual a 1
    const pivotVal = aumentada[i][i];
    if(Math.abs(pivotVal) < 0.000001){
      throw new Error('La matriz no tiene inversa (pivote cero)');
    }
    
    for(let j = 0; j < 2 * n; j++){
      aumentada[i][j] /= pivotVal;
    }
    
    // Hacer ceros en la columna del pivote
    for(let j = 0; j < n; j++){
      if(j !== i){
        const factor = aumentada[j][i];
        for(let k = 0; k < 2 * n; k++){
          aumentada[j][k] -= factor * aumentada[i][k];
        }
      }
    }
  }
  
  // Extraer la MAT inversa
  const inversa = [];
  for(let i = 0; i < n; i++){
    inversa[i] = [];
    for(let j = 0; j < n; j++){
      inversa[i][j] = aumentada[i][j + n];
    }
  }
  
  return inversa;
}

// Función para verificar que A × A⁻¹ = I
function verificarMATinv(MAToriginal, MATinversa){
  const n = MAToriginal.length;
  const identidad = [];
  
  // Calcular A × A⁻¹
  for(let i = 0; i < n; i++){
    identidad[i] = [];
    for(let j = 0; j < n; j++){
      let suma = 0;
      for(let k = 0; k < n; k++){
        suma += MAToriginal[i][k] * MATinversa[k][j];
      }
      identidad[i][j] = suma;
    }
  }
  
  // Verificar que sea aproximadamente la MAT identidad
  for(let i = 0; i < n; i++){
    for(let j = 0; j < n; j++){
      const valorEsperado = (i === j) ? 1 : 0;
      if(Math.abs(identidad[i][j] - valorEsperado) > 0.0001){
        return false;
      }
    }
  }
  return true;
}