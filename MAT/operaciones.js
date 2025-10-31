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
            //multiplicacion
            break;
            default:
              throw new Error('Operacion invalida');
            }
            
            const titu = document.createElement('h3');
            const textoTit = 'Resultado - '+ope;
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

        //resultado
        //tituloOpe
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

            //resultado
            //tituloOpe
            break;
            
            case 'inversa':
              const seleccMATinv = seleccionarMAT();
              if(!seleccMATinv) return;

              //resultado
              //titulo ope
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
    alert('Error: '+error.mensaje)
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
    ValorElem.textContent='Valor '+resultado.toFixed(4);
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
