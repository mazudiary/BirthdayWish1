// From index.html
function createDecorations() {
    const decorationsContainer = document.getElementById('decorations');
    
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 60 + 20;
        const posX = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 10;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;
        
        decorationsContainer.appendChild(bubble);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createDecorations();
    
    const messageContainer = document.getElementById('messageContainer');
    const initialMessage = document.getElementById('initialMessage');
    const secondMessage = document.getElementById('secondMessage');
    const enterButton = document.getElementById('enterButton');
    const gifContainer = document.getElementById('gifContainer');
    
    messageContainer.addEventListener('click', () => {
        gsap.to(initialMessage, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                initialMessage.classList.add('hidden');
                secondMessage.classList.remove('hidden');
                gsap.fromTo(secondMessage, 
                    {opacity: 0, y: 20},
                    {opacity: 1, y: 0, duration: 0.5}
                );
                
                gsap.to(enterButton, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.3
                });
                
                gsap.to(gifContainer, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.5
                });
            }
        });
        
        createHearts();
    });
    
    enterButton.addEventListener('mouseenter', () => {
        gsap.to(enterButton, {
            scale: 1.05,
            duration: 0.3,
            repeat: 1,
            yoyo: true
        });
    });
    
    function createHearts() {
        const emojis = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                heart.innerHTML = randomEmoji;
                heart.classList.add('heart');
                heart.style.fontSize = `${Math.random() * 20 + 10}px`;
                
                const containerRect = messageContainer.getBoundingClientRect();
                const startX = containerRect.x + Math.random() * containerRect.width;
                const startY = containerRect.y + containerRect.height;
                
                heart.style.left = `${startX}px`;
                heart.style.top = `${startY}px`;
                
                document.body.appendChild(heart);
                
                gsap.to(heart, {
                    y: -150 - Math.random() * 100,
                    x: (Math.random() - 0.5) * 100,
                    opacity: 0,
                    rotation: Math.random() * 90 - 45,
                    duration: 2 + Math.random() * 3,
                    ease: "power1.out",
                    onComplete: () => {
                        heart.remove();
                    }
                });
                
                gsap.to(heart, {
                    scale: 0.5,
                    duration: 2,
                    ease: "power1.in"
                });
            }, i * 100);
        }
    }
    
    enterButton.addEventListener('click', () => {
        window.location.href = "celebration.html";
        
        gsap.to(document.body, {
            backgroundColor: "#ffd6e0",
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
        
        gsap.to(gifContainer, {
            scale: 1.1,
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
        
        createHearts();
    });
    
    gsap.set(enterButton, {opacity: 0, y: 20});
    gsap.set(gifContainer, {opacity: 0, y: 20});
});

// From celebration.html
const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas && starCanvas.getContext('2d');
const fireworksCanvas = document.getElementById('fireworksCanvas');
const fireworksCtx = fireworksCanvas && fireworksCanvas.getContext('2d');
const petalsCanvas = document.getElementById('petalsCanvas');
const petalsCtx = petalsCanvas && petalsCanvas.getContext('2d');
const heartsContainer = document.getElementById('heartsContainer');

function resizeCanvas() {
    if (starCanvas) starCanvas.width = window.innerWidth;
    if (starCanvas) starCanvas.height = window.innerHeight;
    if (fireworksCanvas) fireworksCanvas.width = window.innerWidth;
    if (fireworksCanvas) fireworksCanvas.height = window.innerHeight;
    if (petalsCanvas) petalsCanvas.width = window.innerWidth;
    if (petalsCanvas) petalsCanvas.height = window.innerHeight;
}

if (starCanvas) window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * starCanvas.width;
        this.y = Math.random() * starCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.maxSize = this.size + Math.random() * 2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.glowFactor = Math.random() * 15 + 5;
        this.speed = Math.random() * 0.05 + 0.01;
        this.growing = Math.random() > 0.5;
        this.color = {
            r: 255,
            g: Math.floor(Math.random() * 100) + 155,
            b: Math.floor(Math.random() * 155) + 100
        };
    }
    
    update() {
        if (this.growing) {
            this.size += this.speed;
            if (this.size >= this.maxSize) this.growing = false;
        } else {
            this.size -= this.speed;
            if (this.size <= 0.5) this.growing = true;
        }
        
        if (Math.random() < 0.01) {
            this.color.g = Math.floor(Math.random() * 100) + 155;
            this.color.b = Math.floor(Math.random() * 155) + 100;
        }
        
        if (Math.random() < 0.001) this.reset();
    }
    
    draw() {
        const glow = starCtx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * this.glowFactor
        );
        
        glow.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        starCtx.fillStyle = glow;
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.size * this.glowFactor, 0, Math.PI * 2);
        starCtx.fill();
        
        starCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        starCtx.fill();
    }
}

class Petal {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * petalsCanvas.width;
        this.y = -20;
        this.size = Math.random() * 15 + 8;
        this.speedY = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.color = {
            r: Math.floor(Math.random() * 55) + 200,
            g: Math.floor(Math.random() * 50),
            b: Math.floor(Math.random() * 80) + 50
        };
    }
    
    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) + this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.y > petalsCanvas.height) this.reset();
    }
    
    draw() {
        petalsCtx.save();
        petalsCtx.translate(this.x, this.y);
        petalsCtx.rotate(this.rotation * Math.PI / 180);
        
        petalsCtx.beginPath();
        petalsCtx.moveTo(0, 0);
        petalsCtx.bezierCurveTo(
            this.size / 2, -this.size / 4,
            this.size, -this.size / 2,
            0, -this.size
        );
        petalsCtx.bezierCurveTo(
            -this.size, -this.size / 2,
            -this.size / 2, -this.size / 4,
            0, 0
        );
        
        const gradient = petalsCtx.createLinearGradient(0, 0, 0, -this.size);
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color.r - 30}, ${this.color.g}, ${this.color.b + 20}, ${this.opacity * 0.7})`);
        petalsCtx.fillStyle = gradient;
        petalsCtx.fill();
        
        petalsCtx.restore();
    }
}

class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3 + 1;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.gravity = 0.04;
        this.friction = 0.97;
        this.opacity = 1;
        this.life = Math.random() * 60 + 80;
        this.remainingLife = this.life;
    }
    
    update() {
        this.velocity.y += this.gravity;
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        this.remainingLife--;
        this.opacity = this.remainingLife / this.life;
    }
    
    draw() {
        fireworksCtx.beginPath();
        fireworksCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        fireworksCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        fireworksCtx.fill();
        
        const glow = fireworksCtx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius * 4
        );
        
        glow.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.7})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        fireworksCtx.fillStyle = glow;
        fireworksCtx.beginPath();
        fireworksCtx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        fireworksCtx.fill();
    }
}

class HeartFirework {
    constructor() {
        this.x = Math.random() * fireworksCanvas.width;
        this.y = fireworksCanvas.height;
        this.destination = {
            x: Math.random() * (fireworksCanvas.width * 0.8) + fireworksCanvas.width * 0.1,
            y: Math.random() * (fireworksCanvas.height * 0.5) + fireworksCanvas.height * 0.1
        };
        this.velocity = {
            x: (this.destination.x - this.x) / 100,
            y: (this.destination.y - this.y) / 100
        };
        this.particles = [];
        this.color = {
            r: Math.floor(Math.random() * 55) + 200,
            g: Math.floor(Math.random() * 50),
            b: Math.floor(Math.random() * 80) + 50
        };
        this.trail = [];
        this.exploded = false;
    }
    
    update() {
        if (!this.exploded) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            this.trail.push({x: this.x, y: this.y, opacity: 1});
            
            for (let i = 0; i < this.trail.length; i++) {
                this.trail[i].opacity -= 0.025;
                if (this.trail[i].opacity <= 0) this.trail.splice(i, 1), i--;
            }
            
            const distance = Math.sqrt(
                Math.pow(this.x - this.destination.x, 2) +
                Math.pow(this.y - this.destination.y, 2)
            );
            
            if (distance < 10 || this.y <= this.destination.y) this.explode();
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].remainingLife <= 0) this.particles.splice(i, 1), i--;
            }
        }
    }
    
    explode() {
        this.exploded = true;
        
        const heartPoints = [];
        const totalPoints = 150;
        
        for (let i = 0; i < totalPoints; i++) {
            const angle = (i / totalPoints) * Math.PI * 2;
            const heartX = 16 * Math.pow(Math.sin(angle), 3);
            const heartY = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
            
            heartPoints.push({x: heartX * 3, y: heartY * 3});
        }
        
        for (let i = 0; i < heartPoints.length; i++) {
            const particle = new FireworkParticle(this.x, this.y, this.color);
            particle.velocity.x = heartPoints[i].x * (Math.random() * 0.1 + 0.05);
            particle.velocity.y = heartPoints[i].y * (Math.random() * 0.1 + 0.05);
            this.particles.push(particle);
        }
    }
    
    draw() {
        if (!this.exploded) {
            for (let i = 0; i < this.trail.length; i++) {
                fireworksCtx.beginPath();
                fireworksCtx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2);
                fireworksCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.trail[i].opacity})`;
                fireworksCtx.fill();
            }
            
            fireworksCtx.beginPath();
            fireworksCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            fireworksCtx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
            fireworksCtx.fill();
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        }
    }
}

class Firework {
    constructor() {
        this.x = Math.random() * fireworksCanvas.width;
        this.y = fireworksCanvas.height;
        this.destination = {
            x: Math.random() * fireworksCanvas.width,
            y: Math.random() * (fireworksCanvas.height * 0.6)
        };
        this.velocity = {
            x: (this.destination.x - this.x) / 100,
            y: (this.destination.y - this.y) / 100
        };
        this.particles = [];
        this.color = {
            r: Math.floor(Math.random() * 200) + 55,
            g: Math.floor(Math.random() * 200) + 55,
            b: Math.floor(Math.random() * 255)
        };
        this.trail = [];
        this.exploded = false;
    }
    
    update() {
        if (!this.exploded) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            
            this.trail.push({x: this.x, y: this.y, opacity: 1});
            
            for (let i = 0; i < this.trail.length; i++) {
                this.trail[i].opacity -= 0.025;
                if (this.trail[i].opacity <= 0) this.trail.splice(i, 1), i--;
            }
            
            const distance = Math.sqrt(
                Math.pow(this.x - this.destination.x, 2) +
                Math.pow(this.y - this.destination.y, 2)
            );
            
            if (distance < 10 || this.y <= this.destination.y) this.explode();
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
                if (this.particles[i].remainingLife <= 0) this.particles.splice(i, 1), i--;
            }
        }
    }
    
    explode() {
        this.exploded = true;
        const particleCount = Math.floor(Math.random() * 50) + 80;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new FireworkParticle(this.x, this.y, this.color));
        }
    }
    
    draw() {
        if (!this.exploded) {
            for (let i = 0; i < this.trail.length; i++) {
                fireworksCtx.beginPath();
                fireworksCtx.arc(this.trail[i].x, this.trail[i].y, 2, 0, Math.PI * 2);
                fireworksCtx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.trail[i].opacity})`;
                fireworksCtx.fill();
            }
            
            fireworksCtx.beginPath();
            fireworksCtx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            fireworksCtx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
            fireworksCtx.fill();
        } else {
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        }
    }
}

const stars = starCanvas ? Array(200).fill().map(() => new Star()) : [];
const petals = petalsCanvas ? Array(50).fill().map(() => new Petal()) : [];
const fireworks = fireworksCanvas ? [] : [];
let fireworksInterval, heartFireworksInterval;

function addFirework() {
    if (Math.random() < 0.3) fireworks.push(new HeartFirework());
    else fireworks.push(new Firework());
}

function addFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 90 + 5}%`;
    heart.style.top = `${Math.random() * 90 + 5}%`;
    heart.innerHTML = `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  fill="rgba(255, ${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 0.4 + 0.6})"/>
        </svg>
    `;
    heartsContainer.appendChild(heart);
    
    gsap.to(heart, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
        onComplete: () => {
            gsap.to(heart, {
                y: -100 - Math.random() * 100,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                rotation: Math.random() * 60 - 30,
                scale: 0.5,
                duration: 4 + Math.random() * 4,
                ease: "power1.out",
                onComplete: () => heart.remove()
            });
        }
    });
}

function animateStars() {
    if (starCtx) {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        stars.forEach(star => { star.update(); star.draw(); });
        requestAnimationFrame(animateStars);
    }
}

function animatePetals() {
    if (petalsCtx) {
        petalsCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
        petals.forEach(petal => { petal.update(); petal.draw(); });
        requestAnimationFrame(animatePetals);
    }
}

function animateFireworks() {
    if (fireworksCtx) {
        fireworksCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        
        for (let i = 0; i < fireworks.length; i++) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].exploded && fireworks[i].particles.length === 0) fireworks.splice(i, 1), i--;
        }
        
        requestAnimationFrame(animateFireworks);
    }
}

function startFireworks() {
    fireworksInterval = setInterval(addFirework, 500);
    setTimeout(() => clearInterval(fireworksInterval), 5000);
    
    heartFireworksInterval = setInterval(addFloatingHeart, 300);
    setTimeout(() => clearInterval(heartFireworksInterval), 4000);
}

if (starCanvas) {
    window.addEventListener('load', () => {
        animateStars();
        animatePetals();
        animateFireworks();
        startFireworks();
        
        const birthdayText = document.querySelector('.birthday-text');
        const text = birthdayText.textContent;
        birthdayText.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const letter = document.createElement('span');
            letter.textContent = text[i];
            letter.className = 'letter';
            birthdayText.appendChild(letter);
        }
        
        setTimeout(() => {
            birthdayText.style.opacity = 1;
            
            const letters = document.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                gsap.to(letter, {
                    opacity: 1,
                    y: 0,
                    delay: 3 + index * 0.1,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });
            });
            
            gsap.to(birthdayText, {
                textShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 123, 172, 0.4)",
                delay: 3 + text.length * 0.1 + 0.3,
                duration: 1.5
            });
            
            const celebrateBtn = document.getElementById('celebrateBtn');
            gsap.to(celebrateBtn, {
                opacity: 1,
                scale: 1,
                delay: 3 + text.length * 0.1 + 1,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
            
            let hoverEffect = 0;
            celebrateBtn.addEventListener('mouseenter', () => {
                hoverEffect = (hoverEffect + 1) % 3;
                switch(hoverEffect) {
                    case 0:
                        gsap.to(celebrateBtn, {
                            boxShadow: "0 7px 25px rgba(255, 123, 172, 0.8), 0 0 40px rgba(255, 123, 172, 0.6)",
                            duration: 0.4
                        });
                        break;
                    case 1:
                        gsap.to(celebrateBtn, {
                            y: -10,
                            duration: 0.4,
                            yoyo: true,
                            repeat: 1,
                            ease: "power2.inOut"
                        });
                        break;
                    case 2:
                        gsap.to(celebrateBtn, {
                            scale: 1.1,
                            duration: 0.4,
                            ease: "power1.out"
                        });
                        break;
                }
            });
            
            celebrateBtn.addEventListener('mouseleave', () => {
                gsap.to(celebrateBtn, {
                    boxShadow: "0 5px 15px rgba(255, 123, 172, 0.4), 0 0 20px rgba(255, 123, 172, 0.2)",
                    y: 0,
                    scale: 1,
                    duration: 0.4
                });
            });
            
            const nextPageBtn = document.getElementById('nextPageBtn');
            nextPageBtn.addEventListener('click', () => {
                window.location.href = 'cake.html';
            });
            
            gsap.to(nextPageBtn, {
                opacity: 1,
                delay: 3 + text.length * 0.1 + 1.5,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)"
            });
            
            celebrateBtn.addEventListener('click', () => {
                gsap.to(celebrateBtn, {
                    scale: 0.95,
                    duration: 0.1,
                    onComplete: () => {
                        startFireworks();
                        gsap.to(celebrateBtn, {
                            scale: 1,
                            duration: 0.5,
                            ease: "elastic.out(1, 0.3)"
                        });
                    }
                });
            });
        }, 3000);
    });
}

// From cake.html
const cake = document.querySelector('.cake-container');
const candle = document.querySelector('.candle');
const flame = document.querySelector('.flame');
let isClicked = false;

const ribbonColors = [
    'linear-gradient(45deg, #FF9ECD, #FF71B6)',
    'linear-gradient(45deg, #FFB7E0, #FF8AC7)',
    'linear-gradient(45deg, #FFC4E6, #FFA3D4)',
    'linear-gradient(45deg, #E0C3FC, #BDE0FE)',
    'linear-gradient(45deg, #FFCAD4, #FFD1E3)',
    'linear-gradient(45deg, #B5EAD7, #C7F9CC)',
    'linear-gradient(45deg, #FF9AA2, #FFB7B2)',
    'linear-gradient(45deg, #FFDAC1, #FFE5D9)'
];

function createRibbon() {
    const ribbon = document.createElement('div');
    ribbon.className = 'ribbon';
    ribbon.style.left = `${Math.random() * window.innerWidth}px`;
    ribbon.style.background = ribbonColors[Math.floor(Math.random() * ribbonColors.length)];
    document.body.appendChild(ribbon);

    ribbon.addEventListener('animationend', () => ribbon.remove());
}

function startCelebration() {
    if (isClicked) return;
    isClicked = true;

    gsap.to(candle, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power2.out",
        onComplete: () => candle.remove()
    });

    const ribbonInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createRibbon(), i * 100);
        }
    }, 200);

    setTimeout(() => {
        const nextButton = document.querySelector('.next-page-button');
        nextButton.classList.add('show');
    }, 2000);

    setTimeout(() => clearInterval(ribbonInterval), 5000);
}

if (cake) cake.addEventListener('click', startCelebration);

document.querySelector('.next-page-button')?.addEventListener('click', () => {
    window.location.href = 'card.html';
});


// Audio management across celebration.html, cake.html, and card.html
document.addEventListener('DOMContentLoaded', () => {
    const bgAudio = document.getElementById('backgroundMusic');
    const wishAudio = document.getElementById('wishMusic'); // Only exists in cake.html
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

   // console.log(`Current page: ${currentPage}`);

    // Background music logic (celebration.html, cake.html, card.html)
    if (bgAudio) {
        const bgMusicSrc = './assets/music/bgmusic.mp3';
       // console.log(`Background audio element found on ${currentPage}`);

        // Load playback state from localStorage
        const isPlaying = localStorage.getItem('audioPlaying') === 'true';
        const currentTime = parseFloat(localStorage.getItem('audioTime')) || 0;

        // Set initial state
        bgAudio.src = bgMusicSrc;
        bgAudio.currentTime = currentTime;
        bgAudio.volume = 0.5; // Optional: Adjust volume

        // Start or resume playback
        if (currentPage === 'celebration.html' && !isPlaying) {
            console.log('Starting bgmusic on celebration.html for the first time');
            bgAudio.play().catch(error => {
               // console.log('Autoplay prevented on celebration.html:', error);
                document.body.addEventListener('click', () => {
                  //  console.log('Starting bgmusic on user click');
                    bgAudio.play();
                }, { once: true });
            });
            localStorage.setItem('audioPlaying', 'true');
        } else if (currentPage !== 'index.html') {
            // Resume or start on cake.html and card.html
           // console.log(`Attempting to resume bgmusic on ${currentPage}`);
            bgAudio.play().catch(error => {
                // console.log(`Autoplay prevented on ${currentPage}:`, error);
                document.body.addEventListener('click', () => {
                    // console.log(`Resuming bgmusic on ${currentPage} after user click`);
                    bgAudio.play();
                }, { once: true });
            });
            localStorage.setItem('audioPlaying', 'true');
        }

        // Update localStorage with current time
        bgAudio.addEventListener('timeupdate', () => {
            localStorage.setItem('audioTime', bgAudio.currentTime);
        });

        // Save state before leaving page
        window.addEventListener('beforeunload', () => {
           // console.log(`Saving state before leaving ${currentPage}: isPlaying=${!bgAudio.paused}, time=${bgAudio.currentTime}`);
            localStorage.setItem('audioPlaying', !bgAudio.paused);
            localStorage.setItem('audioTime', bgAudio.currentTime);
        });
    } else {
       // console.log('No background audio element found (likely index.html)');
    }

    // Wish music logic (specific to cake.html)
    if (wishAudio) {
        const cake = document.querySelector('.cake-container');
        wishAudio.volume = 0.7; // Optional: Adjust volume

        cake.addEventListener('click', () => {
            // console.log('Cake clicked on cake.html');
            if (bgAudio && !bgAudio.paused) {
               // console.log('Pausing bgmusic for wish music');
                bgAudio.pause();
                localStorage.setItem('audioTime', bgAudio.currentTime);
                localStorage.setItem('audioPlaying', 'false');
            }

            wishAudio.play().catch(error => console.log('Error playing wish music:', error));

            // Resume background music after wish music ends
            wishAudio.addEventListener('ended', () => {
                // console.log('Wish music ended, resuming bgmusic');
                if (bgAudio) {
                    bgAudio.currentTime = parseFloat(localStorage.getItem('audioTime')) || 0;
                    bgAudio.play().catch(error => console.log('Error resuming bg music:', error));
                    localStorage.setItem('audioPlaying', 'true');
                }
            }, { once: true });
        });
    }

    // Navigation buttons
    document.querySelectorAll('button').forEach(button => {
        if (button.id === 'nextPageBtn' || button.className.includes('next-page-button') || button.id === 'enterButton') {
            button.addEventListener('click', () => {
                if (bgAudio) {
                   // console.log(`Navigation button clicked on ${currentPage}, saving audio state`);
                    localStorage.setItem('audioPlaying', !bgAudio.paused);
                    localStorage.setItem('audioTime', bgAudio.currentTime);
                }
            });
        }
    });
});