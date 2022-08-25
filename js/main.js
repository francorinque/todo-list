const $form = document.querySelector('.form'),
$input = document.querySelector('.input'),
$ul = document.querySelector('.ul'),
$borrarTodo = document.querySelector('.borrarTodo')


// array tareas
let listaDeTareas = JSON.parse(localStorage.getItem('tareas'))  || [];


// funcion inicial.
const init = () =>{
  $form.addEventListener('submit', todoList);
  // llamo a laas funciones por cada recarga de la pagina para saber si hay tareas, que la renderize, y si hay tareas el boton aparece. de lo contrario no hay nada.
  renderTareas(listaDeTareas);
  saveLocalStorage(listaDeTareas);
  btnBorrarTodo(listaDeTareas);

  $borrarTodo.addEventListener('click',sinTareas);
  $ul.addEventListener('click',borrarTarea);
};

init();




function todoList(e){
  e.preventDefault();

  let tareaUser = $input.value;

  if(!tareaUser.length){
    alert('No ingresaste nada, no se permite agregar tareas VACIAS.');
    return;
  } else if(listaDeTareas.some(tarea => tarea.name === tareaUser)){
    alert('Ya hay una tarea con ese nombre')
    return;
  }

  // subo los datos del input al array
  listaDeTareas.push({ name: tareaUser, tareaId: listaDeTareas.length + 1});
  // reinicio el input value
  $input.value = '';

  // por cada submit creo la tarea (li)
  crearTareas(listaDeTareas);
  // por cada submit renderizo la tarea (li)
  renderTareas(listaDeTareas);
  // guardo todo el array en el localstorage
  saveLocalStorage(listaDeTareas);
  // por cada submit hay una tarea nueva, entonces el boton tiene que aparecer.
  btnBorrarTodo(listaDeTareas);
}


// creo la funcion que crea el 'html'
function crearTareas(tarea){
  return `<li>${tarea.name}<img src="./imagenes/delete.svg" data-id=${tarea.tareaId} class='delete-btn'></li>`
}


// funcion que mapea el html
function renderTareas(arrayTareas){
 $ul.innerHTML = arrayTareas.map(tarea => crearTareas(tarea)).join('');
}

// guardamos en el localstorage
function saveLocalStorage(arrayTareas){
  localStorage.setItem('tareas',JSON.stringify(arrayTareas))
}


// borrar tareas
function sinTareas(){
  listaDeTareas = [];
  renderTareas(listaDeTareas);
  saveLocalStorage(listaDeTareas);
  btnBorrarTodo(listaDeTareas);
}


// ocultar boton de borrar todo 
function btnBorrarTodo(arreglo){
  if(!arreglo.length) {
    $borrarTodo.classList.add('hide');
  } else {
    $borrarTodo.classList.remove('hide');
  }
};


//  borrar tearea individual
function borrarTarea(e){
  if(!e.target.classList.contains('delete-btn')) return;
  const filtrarId = Number(e.target.dataset.id);
  listaDeTareas = listaDeTareas.filter(tarea => tarea.tareaId !== filtrarId);
  renderTareas(listaDeTareas);
  saveLocalStorage(listaDeTareas);
}