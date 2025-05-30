document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key');
    const lastKeyDisplay = document.getElementById('last-key');
    const keyCodeDisplay = document.getElementById('key-code');
    const keySound = document.getElementById('keySound');
    
    // Highlight key on click
    keys.forEach(key => {
        key.addEventListener('mousedown', function() {
            this.classList.add('active');
            playKeySound();
            updateKeyDisplay(this.dataset.key, this.textContent);
        });
        
        key.addEventListener('mouseup', function() {
            this.classList.remove('active');
        });
        
        key.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
    
    // Highlight key on keyboard press
    document.addEventListener('keydown', function(e) {
        e.preventDefault();
        const keyElement = document.querySelector(`.key[data-key="${e.code}"]`);
        
        if (keyElement) {
            keyElement.classList.add('active');
            playKeySound();
            updateKeyDisplay(e.code, getKeyDisplayText(e));
        }
    });
    
    document.addEventListener('keyup', function(e) {
        const keyElement = document.querySelector(`.key[data-key="${e.code}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    });
    
    function playKeySound() {
        keySound.currentTime = 0;
        keySound.play();
    }
    
    function updateKeyDisplay(code, text) {
        lastKeyDisplay.textContent = text;
        keyCodeDisplay.textContent = code;
    }
    
    function getKeyDisplayText(event) {
        if (event.key.length === 1) {
            return event.key;
        }
        return event.key.replace('Arrow', '') + (event.code.includes('Left') ? ' (Left)' : 
               event.code.includes('Right') ? ' (Right)' : '');
    }
});