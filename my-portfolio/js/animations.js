// Typing Animation
const typedTextSpan = document.getElementById('typed-text');
const roles = ['Developer', 'Designer', 'Creator', 'Problem Solver'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    setTimeout(typeEffect, isDeleting ? 100 : 200);
}

// Start typing animation if element exists
if (typedTextSpan) {
    typeEffect();
}

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-up');
    observer.observe(section);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-up.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card, .skill-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-card:hover, .skill-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);


// Artist Animation - Realistic Drawing Effect
class ArtistAnimation {
    constructor() {
        this.canvas = document.getElementById('artistCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.drawings = [];
        this.currentDrawing = null;
        this.drawingProgress = 0;
        this.isDrawing = true;
        
        // Artist cursor position
        this.artistX = 0;
        this.artistY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.setupEventListeners();
        this.createDrawings();
        this.animate();
    }
    
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
        });
        
        // Mouse move for artist cursor tracking
        this.canvas.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });
    }
    
    createDrawings() {
        // Create multiple drawing elements that will be "drawn" by the artist
        this.drawings = [
            {
                type: 'palette',
                x: 100,
                y: this.height - 150,
                points: [],
                progress: 0
            },
            {
                type: 'brush',
                x: 200,
                y: this.height - 120,
                points: [],
                progress: 0
            },
            {
                type: 'pencil',
                x: 280,
                y: this.height - 130,
                points: [],
                progress: 0
            },
            {
                type: 'abstract',
                x: this.width - 300,
                y: 200,
                points: [],
                progress: 0,
                pathPoints: []
            }
        ];
        
        // Generate drawing points for each element
        this.drawings.forEach(drawing => {
            this.generateDrawingPoints(drawing);
        });
    }
    
    generateDrawingPoints(drawing) {
        switch(drawing.type) {
            case 'palette':
                // Draw palette shape
                drawing.points = this.generatePalettePoints(drawing.x, drawing.y);
                break;
            case 'brush':
                // Draw brush
                drawing.points = this.generateBrushPoints(drawing.x, drawing.y);
                break;
            case 'pencil':
                // Draw pencil
                drawing.points = this.generatePencilPoints(drawing.x, drawing.y);
                break;
            case 'abstract':
                // Draw abstract artistic lines
                drawing.pathPoints = this.generateAbstractPath(drawing.x, drawing.y);
                break;
        }
    }
    
    generatePalettePoints(x, y) {
        const points = [];
        // Palette circle
        for(let i = 0; i <= Math.PI * 2; i += Math.PI / 16) {
            points.push({
                x: x + Math.cos(i) * 40,
                y: y + Math.sin(i) * 40,
                type: 'circle'
            });
        }
        // Paint blobs
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
        colors.forEach((color, index) => {
            const angle = (index / colors.length) * Math.PI * 2;
            points.push({
                x: x + Math.cos(angle) * 35,
                y: y + Math.sin(angle) * 35,
                type: 'blob',
                color: color
            });
        });
        return points;
    }
    
    generateBrushPoints(x, y) {
        const points = [];
        // Brush handle
        for(let i = 0; i < 60; i++) {
            points.push({
                x: x + i * 1.5,
                y: y - 5 + Math.sin(i * 0.3) * 3,
                type: 'line'
            });
        }
        // Brush head
        for(let i = 0; i < 20; i++) {
            points.push({
                x: x + 85 + i * 2,
                y: y - 8 + Math.sin(i * 0.8) * 5,
                type: 'head'
            });
        }
        return points;
    }
    
    generatePencilPoints(x, y) {
        const points = [];
        // Pencil body
        for(let i = 0; i < 50; i++) {
            points.push({
                x: x + i * 2,
                y: y - 3 + Math.sin(i * 0.2) * 2,
                type: 'pencil'
            });
        }
        // Pencil tip
        for(let i = 0; i < 15; i++) {
            points.push({
                x: x + 100 + i * 1.5,
                y: y - 5 + i * 0.8,
                type: 'tip'
            });
        }
        return points;
    }
    
    generateAbstractPath(x, y) {
        const points = [];
        let currentX = x;
        let currentY = y;
        
        // Create a flowing artistic path
        for(let i = 0; i < 100; i++) {
            const angle = Math.sin(i * 0.1) * 2 + Math.cos(i * 0.05) * 1.5;
            currentX += Math.cos(angle) * 8;
            currentY += Math.sin(angle) * 5 + Math.sin(i * 0.2) * 3;
            
            points.push({
                x: currentX,
                y: currentY,
                angle: angle
            });
        }
        return points;
    }
    
    drawArtistHand(x, y, angle = 0) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        
        // Draw hand
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, 15, 20, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = '#f4a261';
        this.ctx.fill();
        this.ctx.strokeStyle = '#e76f51';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        // Draw fingers
        for(let i = -2; i <= 2; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(8, i * 4);
            this.ctx.lineTo(18, i * 4 + 5);
            this.ctx.lineTo(15, i * 4 + 3);
            this.ctx.fillStyle = '#f4a261';
            this.ctx.fill();
        }
        
        // Draw pencil/brush in hand
        this.ctx.beginPath();
        this.ctx.moveTo(10, -5);
        this.ctx.lineTo(30, -8);
        this.ctx.lineTo(32, -12);
        this.ctx.fillStyle = '#8b4513';
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawPalette(x, y, progress) {
        this.ctx.save();
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = 'rgba(0,0,0,0.2)';
        
        // Draw palette base
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 40, 40, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.fill();
        this.ctx.strokeStyle = '#b0b0b0';
        this.ctx.stroke();
        
        // Draw paint blobs
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
        colors.forEach((color, index) => {
            const angle = (index / colors.length) * Math.PI * 2;
            const blobX = x + Math.cos(angle) * 30;
            const blobY = y + Math.sin(angle) * 30;
            
            this.ctx.beginPath();
            this.ctx.ellipse(blobX, blobY, 8, 6, angle, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
        });
        
        this.ctx.restore();
    }
    
    drawBrush(x, y, progress) {
        this.ctx.save();
        
        // Brush handle
        this.ctx.beginPath();
        for(let i = 0; i < 60 * (progress / 100); i++) {
            const currentX = x + i * 1.5;
            const currentY = y - 5 + Math.sin(i * 0.3) * 3;
            if(i === 0) {
                this.ctx.moveTo(currentX, currentY);
            } else {
                this.ctx.lineTo(currentX, currentY);
            }
        }
        this.ctx.strokeStyle = '#8b5a2b';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        
        // Brush head
        this.ctx.beginPath();
        for(let i = 0; i < 20 * (progress / 100); i++) {
            const currentX = x + 85 + i * 2;
            const currentY = y - 8 + Math.sin(i * 0.8) * 5;
            if(i === 0) {
                this.ctx.moveTo(currentX, currentY);
            } else {
                this.ctx.lineTo(currentX, currentY);
            }
        }
        this.ctx.strokeStyle = '#cd7a32';
        this.ctx.lineWidth = 6;
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    drawPencil(x, y, progress) {
        this.ctx.save();
        
        // Pencil body
        this.ctx.beginPath();
        for(let i = 0; i < 50 * (progress / 100); i++) {
            const currentX = x + i * 2;
            const currentY = y - 3 + Math.sin(i * 0.2) * 2;
            if(i === 0) {
                this.ctx.moveTo(currentX, currentY);
            } else {
                this.ctx.lineTo(currentX, currentY);
            }
        }
        this.ctx.strokeStyle = '#d4af37';
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        
        // Pencil tip
        this.ctx.beginPath();
        for(let i = 0; i < 15 * (progress / 100); i++) {
            const currentX = x + 100 + i * 1.5;
            const currentY = y - 5 + i * 0.8;
            if(i === 0) {
                this.ctx.moveTo(currentX, currentY);
            } else {
                this.ctx.lineTo(currentX, currentY);
            }
        }
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    drawAbstractArt(x, y, progress, pathPoints) {
        if(!pathPoints) return;
        
        this.ctx.save();
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = 'rgba(108,92,231,0.3)';
        
        const drawLength = Math.floor(pathPoints.length * (progress / 100));
        
        this.ctx.beginPath();
        for(let i = 0; i < drawLength; i++) {
            const point = pathPoints[i];
            if(i === 0) {
                this.ctx.moveTo(point.x, point.y);
            } else {
                this.ctx.lineTo(point.x, point.y);
            }
        }
        
        // Gradient stroke
        const gradient = this.ctx.createLinearGradient(x, y, pathPoints[drawLength - 1]?.x || x, pathPoints[drawLength - 1]?.y || y);
        gradient.addColorStop(0, '#6c5ce7');
        gradient.addColorStop(1, '#a8e6cf');
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // Add dots along the path
        for(let i = 0; i < drawLength; i += 5) {
            const point = pathPoints[i];
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = '#6c5ce7';
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#f8f9fa');
        gradient.addColorStop(1, '#e9ecef');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw decorative elements
        this.drawDecorativeElements();
        
        // Update drawing progress
        if(this.isDrawing) {
            this.drawingProgress += 0.5;
            if(this.drawingProgress > 100) {
                this.drawingProgress = 0;
                // Cycle through drawings
                this.currentDrawing = (this.currentDrawing + 1) % this.drawings.length;
            }
        }
        
        // Draw each artistic element
        this.drawings.forEach((drawing, index) => {
            let progress = this.drawingProgress;
            if(this.currentDrawing !== null && this.currentDrawing !== index) {
                progress = 100;
            }
            
            switch(drawing.type) {
                case 'palette':
                    this.drawPalette(drawing.x, drawing.y, progress);
                    break;
                case 'brush':
                    this.drawBrush(drawing.x, drawing.y, progress);
                    break;
                case 'pencil':
                    this.drawPencil(drawing.x, drawing.y, progress);
                    break;
                case 'abstract':
                    this.drawAbstractArt(drawing.x, drawing.y, progress, drawing.pathPoints);
                    break;
            }
        });
        
        // Animate artist hand following cursor
        this.artistX += (this.targetX - this.artistX) * 0.1;
        this.artistY += (this.targetY - this.artistY) * 0.1;
        
        // Draw artist hand at cursor position
        const angle = Math.atan2(this.artistY - (this.height / 2), this.artistX - (this.width / 2));
        this.drawArtistHand(this.artistX, this.artistY, angle);
        
        // Draw floating particles (artistic dust)
        this.drawArtisticDust();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawDecorativeElements() {
        // Draw creative splash elements
        for(let i = 0; i < 15; i++) {
            this.ctx.beginPath();
            this.ctx.arc(
                Math.sin(Date.now() * 0.001 + i) * 50 + (this.width * (i / 15)),
                Math.cos(Date.now() * 0.0008 + i) * 30 + (this.height * 0.8),
                2,
                0,
                Math.PI * 2
            );
            this.ctx.fillStyle = `rgba(108, 92, 231, ${0.1 + Math.sin(Date.now() * 0.002 + i) * 0.05})`;
            this.ctx.fill();
        }
    }
    
    drawArtisticDust() {
        const time = Date.now() * 0.002;
        for(let i = 0; i < 50; i++) {
            const x = (Math.sin(time + i) * 50) + (this.width * 0.1) + (i * 20);
            const y = (Math.cos(time * 0.7 + i) * 30) + (this.height * 0.9);
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(108, 92, 231, ${0.3 + Math.sin(time + i) * 0.2})`;
            this.ctx.fill();
        }
    }
}

// Initialize artist animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ArtistAnimation();
});