document.addEventListener('DOMContentLoaded', function() {
    const keys = document.querySelectorAll('.key');
    const lastKeyDisplay = document.getElementById('last-key');
    const keyCodeDisplay = document.getElementById('key-code');
    const keyPressedDisplay = document.getElementById('key-pressed');
    const keySound = document.getElementById('keySound');
    
    // Touch support for mobile devices
    keys.forEach(key => {
        // Mouse events
        key.addEventListener('mousedown', handleKeyPress);
        key.addEventListener('mouseup', handleKeyRelease);
        key.addEventListener('mouseleave', handleKeyRelease);
        
        // Touch events
        key.addEventListener('touchstart', function(e) {
            e.preventDefault();
            handleKeyPress.call(this);
        });
        
        key.addEventListener('touchend', function(e) {
            e.preventDefault();
            handleKeyRelease.call(this);
        });
    });
    
    function handleKeyPress() {
        if (this.classList.contains('spacer')) return;
        
        this.classList.add('active');
        playKeySound();
        updateKeyDisplay(this.dataset.key, this.textContent, this.textContent);
    }
    
    function handleKeyRelease() {
        this.classList.remove('active');
    }
    
    // Keyboard events
    document.addEventListener('keydown', function(e) {
        e.preventDefault();
        const keyElement = document.querySelector(`.key[data-key="${e.code}"]`);
        
        if (keyElement) {
            keyElement.classList.add('active');
            playKeySound();
            updateKeyDisplay(e.code, getKeyDisplayText(e), e.key);
        } else {
            // For keys not represented on the visual keyboard
            updateKeyDisplay(e.code, e.code, e.key);
            playKeySound();
        }
    });
    
    document.addEventListener('keyup', function(e) {
        const keyElement = document.querySelector(`.key[data-key="${e.code}"]`);
        if (keyElement) {
            keyElement.classList.remove('active');
        }
    });
    
    function playKeySound() {
        if (keySound) {
            keySound.currentTime = 0;
            keySound.play().catch(e => console.log("Audio play failed:", e));
        }
    }
    
    function updateKeyDisplay(code, text, pressed) {
        if (lastKeyDisplay) lastKeyDisplay.textContent = text;
        if (keyCodeDisplay) keyCodeDisplay.textContent = code;
        if (keyPressedDisplay) keyPressedDisplay.textContent = pressed === ' ' ? 'Space' : pressed;
    }
    
    function getKeyDisplayText(event) {
        if (event.key.length === 1) {
            return event.key;
        }
        return event.key.replace('Arrow', '') + 
               (event.code.includes('Left') ? ' (Left)' : 
                event.code.includes('Right') ? ' (Right)' : '');
    }
});
