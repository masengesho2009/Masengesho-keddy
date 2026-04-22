// Additional artistic effects
class ArtisticEffects {
    constructor() {
        this.particles = [];
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        // Create floating paint particles
        for(let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                life: Math.random() * 100
            });
        }
    }
    
    animate() {
        const canvas = document.getElementById('artistCanvas');
        if(!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Update and draw particles
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.5;
            
            // Reset particles that go off screen or die
            if(p.x < 0 || p.x > window.innerWidth || p.y < 0 || p.y > window.innerHeight || p.life <= 0) {
                p.x = Math.random() * window.innerWidth;
                p.y = Math.random() * window.innerHeight;
                p.life = 100;
            }
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    new ArtisticEffects();
});