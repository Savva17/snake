



// import Apple from "./Apple.js";
// import Field from "./Field.js";
// import Score from "./Score.js";
// import Snake from "./Snake.js";




class Main {
    constructor() {
        this.field = new Field();
        this.snake = new Snake();
        this.apple = new Apple();
        this.score = new Score(0);


    }

    update() {
        //логика обновления игры
    }

    draw() {
        //логика отрисовки


    }
}


class Field {
    constructor() {
        // отрисовка игрового поля
        this.container = document.querySelector('.container');
        this.amountSquare = 15;// размер поля
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
        // например размер змейки, цвет, начальное позиционирование
        // и другие параметры
        this.nextY;//координаты головы
        this.nextX;//координаты головы
        this.auto; // интервал
        this.time = 500;// начальная скорость змейки
        this.res = 0;//счетчик очков для увеличения скорости змейки
        this.speed = 1; // начальная скорость игры
        this.route = 'up';// начальное направление змейки
        document.querySelector(".x" + 5 + ".y" + 5).classList.add("snake");// начальные координаты змейки
        document.querySelector(".x" + 5 + ".y" + 6).classList.add("snaketail");// начальные координаты тела


        this.arrYX = [[5, 5], [6, 5]]// начальные координаты тела змейки [Y,X]



    }

    death() {
        //логика смерти змейки

        for (this.a = 0; this.a < this.arrYX.length; this.a++) {
            // если координаты головы совпадут с координатами тела змейки
            if (this.nextY === this.arrYX[this.a][0] && this.nextX === this.arrYX[this.a][1]) {
                // останавливается движение и удаляются стили змейки
                this.route = 0;
                document.querySelector('.area').classList.add("end")
                document.querySelector('.game__over').classList.add("active")

                document.querySelector(".snake").classList.remove("snake");
                clearInterval(this.auto)
                for (this.i = 0; this.i < 1 + main.score._score; this.i++) {

                    document.querySelector(".snaketail").classList.remove("snaketail");
                }
                ;
            }
        }
    }

    update() {
        // логика обновления змейки
        // условия увеличения скорости змейки
        if (this.res === 8 && this.time>250) {
            this.time -= 50;
            this.res = 0;
            this.speed++;
            console.log(1)
        } else if(this.res === 10 && this.time>100){
            this.time -= 25;
            this.res = 0;
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
            // удаление головы змейки с поля
            document.querySelector(".snake").classList.remove("snake");

            // добавление змейки на поле по кординатам
            document.querySelector(".x" + this.nextX + ".y" + this.nextY).classList.add("snake");

            // добавление координат головы в массив и удаление предыдущего хвоста на одну клетку
            this.arrYX.unshift([this.y, this.x])

            // удаление стиля хвоста по координатам при движении
            document.querySelector(".x" + this.arrYX.slice(-1)[0][1] + ".y" + this.arrYX.slice(-1)[0][0]).classList.remove("snaketail");

            //  удаление последних координат в массиве. длина массива зависит от сьеденых яблок
            this.arrYX.splice(1 + main.score._score, 2)

            // цикл прорисовки хвоста змейки
            for (this.i = 0; this.i < 1 + main.score._score; this.i++) {

                document.querySelector(".x" + this.arrYX[this.i][1] + ".y" + this.arrYX[this.i][0]).classList.add("snaketail");
            }

        }, this.time)

    }

    control(e, a) {
        // логика управления змейкой
        // обработка кнопок на клавиатуре
        


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

class Apple {
    constructor() {
        //инициализация параметров яблока, начальные координаты
        this.appleX = 2;// начальные координаты яблока
        this.appleY = 2;// начальные координаты яблока
        this.d = 0;
        // добавление яблока на поле
        document.querySelector(".x" + this.appleX + ".y" + this.appleY).classList.add("apple")
        this.n = 1;//проверка сколько раз запускается функция
        this.arrApple = [2, 2]; // создание массива координат яблока
    }
    draw() {
        //отрисовка яблока
        this.appleX = Math.floor(Math.random() * main.field.amountSquare);
        this.appleY = Math.floor(Math.random() * main.field.amountSquare);

        ;

        //добавление координат яблока в массив
        this.arrApple.unshift(this.appleY, this.appleX)

        // удаление предыдущих координат
        this.arrApple.splice(2, 2)

        // сравнение координат яблока и змейки, если координаты равняются, то яблоко выбирается заново
        if (this.appleX !== 0 && this.appleY !== 0) {

            for (this.i = 0; this.i < main.snake.arrYX.length; this.i++) {

                if (main.snake.arrYX[this.i][0] !== this.arrApple[0] && main.snake.arrYX[this.i][1] !== this.arrApple[1] && main.snake.nextY !== this.arrApple[0] && main.snake.nextX !== this.arrApple[1]) {
                    console.log(main.snake.arrYX[this.i][0], main.snake.arrYX[this.i][1])
                    console.log(this.arrApple[0], this.arrApple[1])
                    document.querySelector('.apple').classList.remove('apple')
                    return document.querySelector('.x' + this.appleX + '.y' + this.appleY).classList.add('apple');

                }
            }
            this.draw()
        } else {
            this.draw()
        }

    }

    getPosition(a, b) {

        //получение новой позиции яблока на поле
        if (b == this.appleX && a == this.appleY) {
            main.snake.res++
            main.snake.update()
            // вызов функии новых координат яблока
            this.draw()

            // вызов функции подсчет результата
            main.score.increase()

        }
    }

}

class Score {
    constructor(score) {
        //инициализировать начальное колличество очков
        this._score = score;
        // текущий результат
        this.score = document.querySelector('.result__score')
        // лучший результат
        this.bestScore = document.querySelector('.result__best')
        // скорость игры
        this.speed = document.querySelector('.result__speed')
    }
    draw() {
        //отрисовка блока с очками
        this.score.textContent = `Текущий Счет: ` + this._score;
        this.bestScore.textContent = `Лучший Счет: ` + localStorage.getItem('score');
        this.speed.textContent = `Скорость Игры: ` + main.snake.speed;
    }
    increase() {
        //увеличивать количество очков
        //и перерисовывать табло
        this._score += 1;
        if (this._score > localStorage.getItem('score')) {
            localStorage.setItem('score', this._score)
        }
        this.draw();
    }
    reset() {
        //сброс текущего результата при смерти
        this._score = 0;
        console.log(localStorage.getItem('score'))
        this.bestScore += +localStorage.getItem('score')
        this.draw();
    }
}
let main = new Main();
main.score.draw()
main.apple.draw()


document.addEventListener('keydown', function (e) {
    main.snake.control(e)
})
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

// export default Main;
