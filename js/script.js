//Контейнер для срабатывания нажатий и блоки RGB + результат
let container = document.getElementById('container');
let result = document.getElementById('result');
let canvas = document.getElementById('drawning');
let red = document.getElementById('red');
let green = document.getElementById('green');
let blue = document.getElementById('blue');

//Listener нажатия/отжатия кнопок
container.addEventListener('mousedown', trigger);
container.addEventListener('mouseup', trigger);
result.addEventListener('click', randomColor);

container.addEventListener('touchstart', triggerTouch);
container.addEventListener('touchend', triggerTouch);

//Состояния (нажатие, +/-, текущий блок)
let isPress = false;
let sign = true;
let current = null;

//Счетчик итераций
let iteration = 1;

//Переключение состояний нажатий мыши
function trigger (event) {
    if(event.which == 1) {
        current = event.target;
        isPress = !isPress;
        sign = true;
    } else if (event.which == 3) {
        current = event.target;
        isPress = !isPress;
        sign = false;
    }
    iteration = 1;
    console.log(event.target);
}

function triggerTouch (event) {
    current = event.target;
    isPress = !isPress;
    iteration = 1;
    console.log(event.target);
}

//Интервальное обновление
setInterval(function func() {
        //Проверка выбора блока
        if(current){
            //Множитель
            let mult = 1;

            //Проверка кол-ва итераций, увеличение множителя
            if(iteration > 10){
                mult = 11;
            }

            //Увеличение значений с учетом множителя
            if(isPress && sign){
                current.innerText = Number(current.innerText) + (1 * mult);
                
                if(current.innerText > 255){
                    current.innerText = 0;
                }

                colorChange();
                document.getElementById('hex').innerText = rgb2hex(result.style.background).toUpperCase();

            } else if (isPress && !sign){
                current.innerText = Number(current.innerText) - (1 * mult);

                if (current.innerText < 0){
                    current.innerText = 255;
                }
                
                colorChange();
                document.getElementById('hex').innerText = rgb2hex(result.style.background).toUpperCase();
            }

            //Счетчик итераций
            iteration++;
        }
    }, 100
);

//Определение цвета блока
function colorChange(){
    switch (current.id){
        case 'red': current.style.background = 'rgb(' + current.innerText + ',0,0)';
        break;
        case 'green': current.style.background = 'rgb(0,' + current.innerText + ',0)';
        break;
        case 'blue': current.style.background = 'rgb(0,0,' + current.innerText + ')';
        break;
    }

    //Обновление блока смешивания цветов
    result.style.background = 'rgb(' + red.innerText + ',' + green.innerText + ',' + blue.innerText + ')';
}

//Генерация произвольного цвета и обновление блоков
function randomColor () {
    red.innerText = Math.ceil(Math.random()*255);
    red.style.background = 'rgb(' + red.innerText + ',0,0)';
    green.innerText = Math.ceil(Math.random()*255);
    green.style.background = 'rgb(0,' + green.innerText + ',0)';
    blue.innerText = Math.ceil(Math.random()*255);
    blue.style.background = 'rgb(0,0,' + blue.innerText + ')';
    result.style.background = 'rgb(' + red.innerText + ',' + green.innerText + ',' + blue.innerText + ')';
    document.getElementById('hex').innerText = rgb2hex(result.style.background).toUpperCase();
}

//Запрет срабатывания контекстного меню
if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function () {
        window.event.returnValue = false;
    });
}

//Перевод в 16-е значение
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

//Рисование
function draw() {
    let dot = document.createElement('p');
    dot.style.background = result.style.background;
    canvas.appendChild(dot);
}