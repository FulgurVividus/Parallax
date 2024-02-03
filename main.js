class Text { // text animation
    constructor(obj) {
        this.text = document.querySelector(obj.text);
        this.fullText = this.text.innerHTML; // storing the text
        this.text.innerHTML = '';
        this.str();
    }
    str(k = 0) {
        this.text.innerHTML += this.fullText[k];
        k++;
        if (k < this.fullText.length) {
            setTimeout(() => {
                this.str(k); // calling the function, if k isnot put it'll always give 0
            }, 200);
        }
    }
};

const text = new Text({
    text: '.header__title',
});


class Parallax { // header animation
    constructor(obj) {
        this.clouds = document.querySelectorAll(obj.clouds);
        this.extraEl = document.querySelector(obj.extraEl);
        this.background = document.querySelector(obj.background);

        window.addEventListener('scroll', () => { // event for scroll
            this.moveElements(); // calling the function
        });
    }
    moveElements() {
        this.clouds.forEach(cloud => { // getting each cloud seperately
            const speed = cloud.getAttribute('data-speed');
            cloud.style = `transform:translateX(${window.scrollY * speed}px)`;
        });
        // boat animation
        this.extraEl.style = `transform:translateX(${window.scrollY * .9}px)`;
    }
};

const parallax = new Parallax({ // the object with keys and values(classes)
    clouds: '.header__cloud',
    extraEl: '.header__boat'
});


class Balls { // flying balls animation
    constructor(obj) {
        this.balls = document.querySelectorAll(obj.balls);
        
        window.addEventListener('mousemove', (e) => {
            this.moveItems(e);
        });
    }
    moveItems(e) {
        this.balls.forEach(ball => {
            const speed = ball.getAttribute('data-speed');
            const x = (window.innerWidth - e.pageX * speed) / 50;
            const y = (window.innerWidth - e.pageY * speed) / 100;
            
            ball.style = `transform:translate(${x}px,${y}px);`; 
        });
    }
};

const balls = new Balls({
    balls: '.parallax__ball',
});


// bubble effect
const createCursor = (x, y) => {
    const cursor = document.createElement('div'); // creating div for cursor
    cursor.className = 'cursor'; // giving class name

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    return cursor;
};

const removeCursorFromDom = (cursor) => { // function for removing cursor
    const timeout = setTimeout(() => {
        cursor.remove();
        clearTimeout(timeout); // to cancel the setTimeout
    }, 1000); // schedule its removal after a 1000mls delay
};

window.addEventListener('click', (e) => {
    const cursor = createCursor(e.pageX, e.pageY);
    document.body.append(cursor); // adding to body of HTML
    removeCursorFromDom(cursor); // calling removing cursor function
});


class Scroll { // animation for black-cards
    constructor(obj){
        this.section = document.querySelector(obj.section);
        
        window.addEventListener('scroll', () => {
            this.fadeAnimation(this.section);
        });
    }
    fadeAnimation(section){
        const cards = section.querySelectorAll('.fade-right');
        cards.forEach(card => {
            const speed = card.getAttribute('data-speed');
            card.style.transition = `${speed}ms`;
            
            if(window.scrollY >= (section.offsetTop - section.offsetHeight * 2)){
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
};

const scroll = new Scroll({ // instance for Scroll Class
    section: '.about',
});

const scroll1 = new Scroll({ // buttom cards
    section: '.scroll',
});


class Timer{ // animation for cards with numbers
    constructor(obj){
        this.timerNums = document.querySelectorAll(obj.timerNums);
        this.timerSection = document.querySelector(obj.timerSection);
        this.state = true;
        
        window.addEventListener('scroll', () => {
            this.scrollTimer();
        });
    }
    scrollTimer(){
        if(this.state){
            if(window.scrollY >= (this.timerSection.offsetTop - this.timerSection.offsetHeight * 2)){
                this.timerSet();
                this.state = false; // fires the function only once
            }
        }
    }
    timerSet(){
        this.timerNums.forEach(item => {
            const count = item.getAttribute('data-num');
            item.innerHTML = 0; // to start from 0
            
            function timer(k = 0){
                item.innerHTML = k;
                k++;
                
                if(k <= count){
                    setTimeout(() => {
                        timer(k);
                    }, 5);
                }
            }
            timer(); // call the func after we built it
        });
    }
};

const timer = new Timer({ // instance for Timer class
    timerNums: '.timer__num',
    timerSection: '.timer',
});


class Bubble{ // animation for bubble
    constructor(obj){
        this.bubble = document.querySelectorAll(obj.bubble);
        
        this.bubble.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                this.bubbleShow(e, item);
            })
        });
    }
    bubbleShow(e, item){
        const x = e.pageX - item.offsetLeft;
        const y = e.pageY - item.offsetTop;
        
        const span = item.querySelector('span');
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
    }
};

const bubble = new Bubble({ // instance for Bubble Class
    bubble: '.timer__btn',
});


class Rotate3D {
    constructor(obj){
        this.cards = document.querySelectorAll(obj.cards);
        this.cards.forEach((card) => { // to get each card
            card.addEventListener('mousemove', (e) => {this.rotate(e, card)});
            card.addEventListener('mouseout', () => {this.rotateNone(card)}); // calling function for initial position when cursor's out
        });
    }
    rotate(e, card){ // method for card animation
        const cardItem = card.querySelector('.card__item');
        const halfHeight = cardItem.offsetHeight / 2; // to get the center of card
        cardItem.style.transform = `rotateX(${(halfHeight - e.offsetY) / 10}deg) rotateY(${-(halfHeight - e.offsetX) / 10}deg)`;
    }
    rotateNone(card){ // method for initial position of a card
        const cardItem = card.querySelector('.card__item');
        cardItem.style.transform = '';
    }
};

const rotate3d = new Rotate3D({
    cards: '.card',
});