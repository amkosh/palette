let cont = document.getElementById('container');
let result = document.getElementById('result');
let r = document.getElementById('red');
let g = document.getElementById('green');
let b = document.getElementById('blue');

//Добавляем считывание действий
cont.addEventListener('mousedown', changeColor);
result.addEventListener('click', changeResColor);


//Получаем нужный цвет в RGB формате с учетом блока
function getColor (color, value) {
    switch(color) {
        case 'red': return 'rgb(' + value + ',0,0)';
        break;
        case 'green': return 'rgb(0,' + value + ',0)';
        break;
        case 'blue': return 'rgb(0,0,' + value + ')';
        break;
    }
}

//Меняем цвет, увеличиваем значение счетчика
function changeColor (event) {
    if(event.target.innerText >= 255){
        event.target.innerText = 0;
    } else {
        event.target.innerText++;
    }
    let color = getColor(event.target.id, event.target.innerText);
    event.target.style.background = color;
    resultUpdate();
}

//Обновляем цвет блока с результатом смешивания
function resultUpdate(){
    result.style.background = 'rgb(' + r.innerText + ',' + g.innerText + ',' + b.innerText +')';
}

//Генерируем цвет блока с результатом
function changeResColor () {
    let red = Math.ceil(Math.random() * 255);
    let green = Math.ceil(Math.random() * 255);
    let blue = Math.ceil(Math.random() * 255);
    let color = 'rgb(' + red + ',' + green + ',' + blue + ')';
    result.style.background = color;

    //Обновляем значения блоков в соответстви со сгенерированным цветом
    r.innerText = red;
    r.style.background = 'rgb(' + red + ',0,0)';
    g.innerText = green;
    g.style.background = 'rgb(0,' + green + ',0)';
    b.innerText = blue;
    b.style.background = 'rgb(0,0,' + blue + ')';
}