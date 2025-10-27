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
  })
})