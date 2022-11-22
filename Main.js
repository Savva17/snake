
class Main {
    constructor() {
        this.field = new Field();
        this.snake = new Snake();
        this.apple = new Apple();
        this.score = new Score();
    }
}


class Field { 
    constructor() {
        // отрисовка игрового поля
        this.container = document.querySelector('.container');
        this.amountSquare = 20;// размер поля
        this.heigth = 1;//начальные координаты поля
        this.width = 1;// начальные координаты поля

        this.container.innerHTML += `<div class="area" style="grid-template:auto/repeat(${this.amountSquare}, 1fr);"></div>`
        this.area = document.querySelector('.area');
        
        // цикл отрисовки поля
        for (let i = 1; i <= this.amountSquare; i++) {

            for (this.width = 1; this.width <= this.amountSquare; this.width++) {

                let square = `<div class="square   x${this.width} y${this.heigth}  " data-x="${this.width}" data-y="${this.heigth}"></div>`;
                this.area.innerHTML += square;
            }
            this.heigth++;
        }


    }

}
class Snake {
    constructor() {
        // инициялизация змейки
        //  начальное позиционирование
        // и другие параметры
        this.end = false; //конец игры при значение true
        this.nextY;//координаты головы
        this.nextX;//координаты головы
        this.auto; // интервал
        this.time = 500;// начальная скорость змейки
        this.speedIncrease = 0;//счетчик очков для увеличения скорости змейки
        this.speed = 1; // начальная скорость игры
        this.route = 'up';// начальное направление змейки
        
    }

    drawStart() {
        // начальные координаты змейки
        document.querySelector(".x" + Math.floor(main.field.amountSquare / 2) + ".y" + Math.floor(main.field.amountSquare / 2)).classList.add("snake");
        // начальные координаты тела
        document.querySelector(".x" + Math.floor(main.field.amountSquare / 2) + ".y" + Math.floor((main.field.amountSquare / 2) + 1)).classList.add("snaketail");

        // массив с начальными координатами
        this.arrYX = [[Math.floor(main.field.amountSquare / 2), Math.floor(main.field.amountSquare / 2)], [Math.floor((main.field.amountSquare / 2) + 1), Math.floor(main.field.amountSquare / 2)]]// начальные координаты тела змейки [Y,X]
    }

    death() {
        //логика смерти змейки
        

        for (this.a = 0; this.a < this.arrYX.length; this.a++) {
            // если координаты головы совпадут с координатами тела змейки
            if (this.nextY === this.arrYX[this.a][0] && this.nextX === this.arrYX[this.a][1]) {
                
                //отключает функцию движения
                this.end = true;
                
                // останавливается движение змейки
                this.route = 0;
                //скрывает поле, табличка конец игры и появляется кнопка насчать заново
                document.querySelector('.area').classList.add("area_clean")
                document.querySelector('.game__over').classList.add("active")
                document.querySelector(".reset").classList.add("end");

                clearInterval(this.auto)
                
            }
        }
    }

    update() {
        // логика обновления змейки
        // условия увеличения скорости змейки this.speedIncrease при наборе 5 очков скорость увеличивается
        if (this.speedIncrease === 4 && this.time>250) {
            this.time -= 50;
            this.speedIncrease = 0;
            this.speed++;
        } else if(this.speedIncrease === 8 && this.time>100){
            this.time -= 25;
            this.speedIncrease = 0;
            this.speed++;

        }
    }
    draw() {
        
        // логика отрисовки змейки    
        this.auto = setInterval(() => {
            if (this.route === 'up') {
                this.x = +document.querySelector(".snake").dataset.x;
                this.y = +document.querySelector(".snake").dataset.y;
                this.nextY = this.y === 1 ? main.field.amountSquare : this.y - 1;
                this.nextX = this.x
                main.apple.getPosition(this.nextY, this.nextX)

            } else if (this.route === 'down') {
                this.x = +document.querySelector(".snake").dataset.x;
                this.y = +document.querySelector(".snake").dataset.y;
                this.nextY = this.y === main.field.amountSquare ? 1 : this.y + 1;
                this.nextX = this.x;
                main.apple.getPosition(this.nextY, this.nextX)

            } else if (this.route === 'right') {
                this.x = +document.querySelector(".snake").dataset.x;
                this.y = +document.querySelector(".snake").dataset.y;
                this.nextY = this.y;
                this.nextX = this.x === main.field.amountSquare ? 1 : this.x + 1
                main.apple.getPosition(this.nextY, this.nextX)

            } else if (this.route === 'left') {

                this.x = +document.querySelector(".snake").dataset.x;
                this.y = +document.querySelector(".snake").dataset.y;
                this.nextY = this.y;
                this.nextX = this.x === 1 ? main.field.amountSquare : this.x - 1;
                main.apple.getPosition(this.nextY, this.nextX)
            }
            this.death()
            // удаление головы змейки с поля при движении
            document.querySelector(".snake").classList.remove("snake");

            // добавление головы змейки на поле по кординатам
            document.querySelector(".x" + this.nextX + ".y" + this.nextY).classList.add("snake");

            // добавление координат головы в массив и удаление предыдущего хвоста на одну клетку
            this.arrYX.unshift([this.y, this.x])

            // удаление стиля хвоста по координатам при движении
            document.querySelector(".x" + this.arrYX.slice(-1)[0][1] + ".y" + this.arrYX.slice(-1)[0][0]).classList.remove("snaketail");

            //  удаление последних координат в массиве. длина массива зависит от сьеденых яблок
            this.arrYX.splice(1 + main.score.score, 2)

            // цикл прорисовки хвоста змейки
            for (this.i = 0; this.i < 1 + main.score.score; this.i++) {

                document.querySelector(".x" + this.arrYX[this.i][1] + ".y" + this.arrYX[this.i][0]).classList.add("snaketail");
            }

        }, this.time)

    }

    control(e, a) {
        // логика управления змейкой
        // обработка кнопок на клавиатуре
        
        // если небыло клика на поле то движения змейки не будет
        if(this.end === false && start !== true){
            
            if (e.code === 'ArrowUp' && this.route !== 'down') {
                this.route = 'up'
                clearInterval(this.auto)
                this.draw(this.route)


            } else if (e.code === 'ArrowDown' && this.route !== 'up') {
                this.route = 'down'
                clearInterval(this.auto)
                this.draw(this.route)


            } else if (e.code === 'ArrowRight' && this.route !== 'left') {
                this.route = 'right'
                clearInterval(this.auto)
                this.draw(this.route)


            } else if (e.code === 'ArrowLeft' && this.route !== 'right') {
                this.route = 'left'
                clearInterval(this.auto)
                this.draw(this.route)

            }
        }
    }

}

class Apple {
    constructor() {
        //инициализация параметров яблока, начальные координаты
        this.appleX = 2;// начальные координаты яблока
        this.appleY = 2;// начальные координаты яблока
        this.d = 0;
       

        this.n = 1;//проверка сколько раз запускается функция
        this.arrApple = [2, 2]; // создание массива координат яблока
    }
    appleStart(){
        // добавление яблока на поле по случайным координатам при запуске игры
        this.appleX = Math.floor(Math.random() * main.field.amountSquare);
        this.appleY = Math.floor(Math.random() * main.field.amountSquare);

        document.querySelector(".x" + this.appleX + ".y" + this.appleY).classList.add("apple")
    }


    draw() {
        // добавление яблока на поле по случайным координатам
        this.appleX = Math.floor(Math.random() * main.field.amountSquare);
        this.appleY = Math.floor(Math.random() * main.field.amountSquare);

        //добавление координат яблока в массив
        this.arrApple.unshift(this.appleY, this.appleX)

        // удаление предыдущих координат
        this.arrApple.splice(2, 2)

        // сравнение координат яблока и змейки, если координаты равняются, то яблоко выбирается заново
        if (this.appleX !== 0 && this.appleY !== 0) {

            for (this.i = 0; this.i < main.snake.arrYX.length; this.i++) {

                if (main.snake.arrYX[this.i][0] !== this.arrApple[0] && main.snake.arrYX[this.i][1] !== this.arrApple[1] &&
                    main.snake.nextY !== this.arrApple[0] && main.snake.nextX !== this.arrApple[1]) {
                    
                    document.querySelector('.apple').classList.remove('apple')
                    return document.querySelector('.x' + this.appleX + '.y' + this.appleY).classList.add('apple');

                }
            }
            this.draw()
        } else {
            this.draw()
        }

    }

    getPosition(snakeHeadY, snakeHeadX) {

        //получение новой позиции яблока на поле, 
        //если координаты головы равняются координатам змейки
        if (snakeHeadX == this.appleX && snakeHeadY == this.appleY) {
            main.snake.speedIncrease++
            main.snake.update()
            // вызов функии новых координат яблока
            this.draw()

            // вызов функции подсчет результата и передача на сколько увеличить счет(1)
            main.score.increase(1)

        }
    }

}

class Score {
    constructor() {
        //инициализировать начальное колличество очков
        
        // текущий результат
        this.scoreDisplay = document.querySelector('.result__score')
        // лучший результат
        this.bestScore = document.querySelector('.result__best')
        // скорость игры
        this.speed = document.querySelector('.result__speed')
    }
    #score = 0;
    get score(){
        return this.#score
    }
    set score(value){
        if(value < 0) throw new Error('счет не может уменьшаться')
        this.#score = value
    }


    draw() {
        //отрисовка блока с очками
        this.scoreDisplay.textContent = `Текущий Счет: ` +  this.score;
        

        //если в localStorage нет данных то в поле лучший результат прописывается ноль
        if (localStorage.getItem('score') === null) {
            this.bestScore.textContent = `Лучший Счет: ` + 0;
        } else{
            this.bestScore.textContent = `Лучший Счет: ` + localStorage.getItem('score');
        }
        //отображение скорости игры
        this.speed.textContent = `Скорость Игры: ` + main.snake.speed;
    }
    increase(num) {
        //увеличивать количество очков
        //и перерисовывать табло
        if(num !== 1) throw new Error('счет увеличивается только на 1')
        this.score += num;
        if (this.score > localStorage.getItem('score')) {
            localStorage.setItem('score', this.score)
        }
        this.draw();
    }
    reset() {
        //сброс текущего результата при смерти
        this.score = 0;
        this.bestScore += +localStorage.getItem('score')
        this.draw();
    }
}
let main = new Main();
main.score.draw()

//стрелки на клавиатуре
document.addEventListener('keydown', function (e) {
    main.snake.control(e)
})

// кнопка начать аново
let reset = document.querySelector('.reset')
reset.addEventListener('click', function () {
    location.reload();
})

// кнопки на экране для мобильной версии
let buttonUp = document.querySelector('.up');
let buttonDown = document.querySelector('.down');
let buttonRight = document.querySelector('.right');
let buttonLeft = document.querySelector('.left');

buttonUp.addEventListener('click', function (e) {
    e.code = 'ArrowUp'
    main.snake.control(e)
})
buttonDown.addEventListener('click', function (e) {
    e.code = 'ArrowDown'
    main.snake.control(e)
})
buttonRight.addEventListener('click', function (e) {
    e.code = 'ArrowRight'
    main.snake.control(e)
})
buttonLeft.addEventListener('click', function (e) {
    e.code = 'ArrowLeft'
    main.snake.control(e)
})

//запуск игры при клике на поле
let start = true //запус только один раз
main.field.container.addEventListener('click', function (e) {
    
    if(start){
                // скрытие надписи о начале игры

        document.querySelector('.start__game').classList.add("active__game")
        // передача кода клавиши для запуска движение
        main.snake.control(e)
        e.code = 'ArrowUp'
        // отрисовка первой позиции яблока
        main.apple.appleStart()
        // отрисовка змейки
        main.snake.drawStart()
        start = false
    }
})