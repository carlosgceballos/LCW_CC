document.addEventListener('DOMContentLoaded',function(){
  const matrixTam = document.getElementById('MatTam')

  MatTam.addEventListener('submit',function(e){

    const selecc= document.getElementById('tam');
    const tamanioSelec= selecc.value;

    if(tamanioSelec==='Default'){
      alert('Selecciona un tamaño');
      return
    }
    const TamSelec=parseInt(tamanioSelec);
    alert('Tamaño procesado');
    crearMatrices(TamSelec);
  })
});

function crearMatrices(tamannio){
  const spaceMat = document.getElementById('SpaceMat')
  spaceMat.innerHTML='';
  
  for(let matrizNum =1; matrizNum<=2;matrizNum++){
    const secMatriz = document.createElement('div');
    secMatriz.className = 'MatSecc';
    const tit = document.createElement('h3');
    const textMatriz = 'Matriz ' + (matrizNum === 1 ? 'A' : 'B') + ' (' + tamannio + 'x' + tamannio + ')';
    tit.textContent=textMatriz;
    secMatriz.appendChild(tit);  

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
