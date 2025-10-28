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
  })
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
