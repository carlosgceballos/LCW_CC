// cargar DOM
document.addEventListener('DOMContentLoaded',function(){
  const matrixTam = document.getElementById('MatTam') //obtener refe del formulario

  MatTam.addEventListener('submit',function(e){

    const selecc= document.getElementById('tam');
    const tamanioSelec= selecc.value;

    if(tamanioSelec==='Default'){ //alerta de error en tamanio
      alert('Selecciona un tamaño');
      return
    }
    const TamSelec=parseInt(tamanioSelec); //convertir de texto a numero
    alert('Tamaño procesado');
    crearMatrices(TamSelec);
  });



});

function crearMatrices(tamannio){
  const spaceMat = document.getElementById('SpaceMat')
  spaceMat.innerHTML=''; //limpiar automaticamente las matrices anteriores
  
  for(let matrizNum =1; matrizNum<=2;matrizNum++){
    //contenedor de las matrices
    const secMatriz = document.createElement('div');
    secMatriz.className = 'MatSecc';
    //titulo de la matriz (a o b)
    const tit = document.createElement('h3');
    const textMatriz = 'Matriz ' + (matrizNum === 1 ? 'A' : 'B') + ' (' + tamannio + 'x' + tamannio + ')';
    tit.textContent=textMatriz;
    secMatriz.appendChild(tit);  

    //grid para los inputs
    const gridCont = document.createElement('div');
    gridCont.className='GridMat';
    gridCont.style.gridTemplateColumns = 'repeat(' + tamannio + ', 70px)';

    for (let i = 0; i<tamannio;i++){
      for(let j = 0; j<tamannio; j++){
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'matInput';
      input.placeholder='0';
      input.value='';

      //guardando los lugares de celda
      input.dataset.fila = i;
      input.dataset.columna = j;
      input.dataset.MAT = matrizNum;

      gridCont.appendChild(input);
      }
    }
    secMatriz.appendChild(gridCont);
    spaceMat.appendChild(secMatriz);
  }
}

function procesarDatos(){
  const inputs =  document.querySelectorAll('.matInput');//procesarinputs
  //iniciar matrices vacias
  const MATA = [];
  const MATB = [];

  inputs.forEach(input => {
    const fila = parseInt(input.dataset.fila);
    const columna = parseInt(input.dataset.columna);
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

  const titu = document.createElement('h3');
  const textoTit = 'Resultado - '+ope;
  titu.textContent = textoTit;
  SpaceResul.appendChild(titu); //anexamos nuestro elemento al DOM

  try {
    let resultado;

    switch(ope){
      case 'suma':
        //suma de matrices
        break;
        case 'resta':
          //resta de matrices
          break;
          case 'multiplicacion':
            //multiplicacion
            break;
            default:
              throw new Error('Operacion invalida');
    }

    //mostar resultado 

    //manejo de error
  } catch (error) {
    const DivError = document.createElement('div');
    DivError.className='MensajeError';
    DivError.textContent = 'Error: '+Error.mensaje;
    SpaceResul.appendChild(DivError);
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
  if(MATA === 0){
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
          if(!seleccMATesc) return;

          //resultado
          //tituloOpe
          break;

          case 'determinante':
            const seleccMATdet = seleccionarMAT();
            if(!seleccMATdet) return;

            //resultado
            //tituloOpe
    }
  } catch (error) {
    
  }
}