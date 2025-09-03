// Add CSS to enable logo selector dialog
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for logo selector if not already present
    if (!document.querySelector('#logo-selector-styles')) {
        const style = document.createElement('style');
        style.id = 'logo-selector-styles';
        style.textContent = `
            .logo-selector {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--surface-color);
                padding: 20px;
                border-radius: var(--border-radius);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                z-index: 1001;
                text-align: center;
            }
            
            .logo-options {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                justify-content: center;
                margin: 15px 0;
            }
            
            .logo-options img {
                width: 60px;
                height: 60px;
                border-radius: 8px;
                padding: 8px;
                background: rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .logo-options img:hover {
                transform: scale(1.1);
                background: rgba(16, 185, 129, 0.2);
            }
            
            .logo-options img.active-logo {
                background: rgba(16, 185, 129, 0.4);
                border: 2px solid var(--primary-color);
            }
            
            .logo-selector button {
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                cursor: pointer;
                font-weight: 500;
                margin-top: 10px;
            }
            
            .logo-selector button:hover {
                background: var(--secondary-color);
            }
            
            /* Animation for the logo change */
            .logo-image {
                transition: filter 0.3s ease;
            }
            
            .logo-image:hover {
                filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.6));
            }
        `;
        document.head.appendChild(style);
    }
});

// Enhanced logo animation
function animateLogo() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    
    // Create a subtle pulsating glow effect
    const keyframes = [
        { filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))' },
        { filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))' },
        { filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))' }
    ];
    
    const options = {
        duration: 4000,
        iterations: Infinity
    };
    
    const logoImage = logo.querySelector('.logo-image');
    if (logoImage) {
        logoImage.animate(keyframes, options);
    }
}

// Call this function when the page is loaded
window.addEventListener('load', animateLogo);
