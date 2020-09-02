
let listDo = [];
let listReadyDo = [];



if (localStorage.getItem('do') != undefined) {
  listDo = JSON.parse(localStorage.getItem('do'));
  outDo()
}
if (localStorage.getItem('readyDo') != undefined) {
  listReadyDo = JSON.parse(localStorage.getItem('readyDo'));
  outReadyDo();
}



// Добавление дела
document.getElementById('clicElem').onclick = function() {
  let elem = document.getElementById('inp').value;
  if (elem == '') {
    alert('Введена пустая строка');
  }
  else {
    document.getElementById('inp').value = '';
    let objDo = {};
    objDo.do = elem;
    objDo.check = false;
    let i = listDo.length;
    listDo[i] = objDo;
    outDo();
    localStorage.setItem('do', JSON.stringify(listDo));
  }

}

// Завершение всех дел
document.getElementById('finishDo').onclick = function() {
  for (index = 0; index < listDo.length; index++) {
    let textDo = listDo[index].do;
    let objDo = {};
    objDo.do = textDo;
    objDo.check = true;
    let i = listReadyDo.length;
    listReadyDo[i] = objDo;
  }
  listDo = [];
  outDo();
  outReadyDo();
  localStorage.clear();
  localStorage.setItem('readyDo', JSON.stringify(listReadyDo));
}

// Очистка списка завершонных дел
document.getElementById('finishReadyDo').onclick = function() {
  listReadyDo = [];
  outDo();
  outReadyDo();
  localStorage.clear();
  localStorage.setItem('do', JSON.stringify(listDo));
}

// Удаление дела
document.getElementById('clecDo').onclick = function() {
  let dellDo = document.getElementById('inp').value;
  if (dellDo == '') {
    alert('Введена пустая строка');
  }
  else {
    let arr = listDo.filter(item => item.do != dellDo);
    listDo = [];
    listDo = arr;
    localStorage.clear();
    localStorage.setItem('do', JSON.stringify(listDo));
  }
}



// Функция выполнения дела
function readyDo() {
  let elem = document.getElementsByClassName('flagNoReadyDo');
  for (i = 0; i < elem.length; i++) {
    if (elem[i].checked == true) {
      let objDo = listDo.splice(i, 1)[0];
      let textDo = objDo.do;
      objDo = {};
      objDo.do = textDo;
      objDo.check = true;
      let ind = listReadyDo.length;
      listReadyDo[ind] = objDo;
      outDo();
      outReadyDo();
      localStorage.clear();
      localStorage.setItem('readyDo', JSON.stringify(listReadyDo));
      localStorage.setItem('do', JSON.stringify(listDo));

      break;
    }
  }
}

// функция возвращения дела в список не готовых
function noReadyDo() {
  let elem = document.getElementsByClassName('flagReadyDo');
  for (i = 0; i < elem.length; i++) {
    if (elem[i].checked == false) {
      objDo = listReadyDo.splice(i, 1)[0];
      let textDo = objDo.do;
      objDo = {};
      objDo.do = textDo;
      objDo.check = false;
      let ind = listDo.length;
      listDo[ind] = objDo;
      outDo();
      outReadyDo();
      localStorage.clear();
      localStorage.setItem('readyDo', JSON.stringify(listReadyDo));
      localStorage.setItem('do', JSON.stringify(listDo));

      break;
    }
  }
}


// Функция выводящяя не выполненые дела
function outDo() {
  let showDo = '';
  for (let key in listDo) {
    showDo += '<label><input title="Нажми для завершения дела" type="checkbox" class="flagNoReadyDo" onclick="readyDo()">';
    showDo += listDo[key].do + '<br></label>';
  }

  document.getElementById('showDo').innerHTML = showDo;
}

// Функия вывода готовых дела
function outReadyDo() {
  let showReadyDo = '';
  for (let key in listReadyDo) {
    showReadyDo += '<label><input title="Нажми для возвращения дела дела" type="checkbox" checked class="flagReadyDo" onclick="noReadyDo()">';
    showReadyDo += listReadyDo[key].do + '<br></label>';
  }

  document.getElementById('showReadyDo').innerHTML = showReadyDo;
}
