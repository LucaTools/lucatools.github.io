// Enhanced script to toggle between three styles
document.addEventListener('DOMContentLoaded', function() {
    // Create a style switcher dropdown
    const createStyleSwitcher = () => {
        // Create container
        const switcherContainer = document.createElement('div');
        switcherContainer.className = 'style-switcher';
        switcherContainer.style.position = 'fixed';
        switcherContainer.style.top = '20px';
        switcherContainer.style.right = '20px';
        switcherContainer.style.zIndex = '1000';
        switcherContainer.style.display = 'flex';
        switcherContainer.style.flexDirection = 'column';
        switcherContainer.style.gap = '10px';
        
        // Create style buttons
        const styles = [
            { name: 'Original Light', file: 'style.css', logo: 'logo-alternatives/luca-logo-terminal.svg' },
            { name: 'Dark Mode', file: 'alternative-style.css', logo: 'luca-logo-alt.svg' },
            { name: 'Gradient Style', file: 'gradient-style.css', logo: 'logo-alternatives/luca-logo-terminal.svg' }
        ];
        
        // Get the current stylesheet path to determine active style
        const currentStylesheet = document.querySelector('link[rel="stylesheet"]');
        const currentStylePath = currentStylesheet.getAttribute('href').split('/').pop();
        
        styles.forEach(style => {
            const button = document.createElement('button');
            button.textContent = style.name;
            button.style.padding = '8px 16px';
            button.style.borderRadius = '8px';
            button.style.border = 'none';
            button.style.fontWeight = 'bold';
            button.style.cursor = 'pointer';
            button.style.transition = 'all 0.3s ease';
            
            // Check if this is the active style
            if (currentStylePath === style.file) {
                styleActiveButton(button);
            } else {
                styleInactiveButton(button);
            }
            
            button.onmouseover = function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            };
            
            button.onmouseout = function() {
                this.style.transform = 'translateY(0)';
                if (currentStylePath !== style.file) {
                    this.style.boxShadow = 'none';
                }
            };
            
            button.onclick = function() {
                // Update the stylesheet
                currentStylesheet.setAttribute('href', `css/${style.file}`);
                
                // Update the logo
                const logo = document.querySelector('.logo-image');
                if (logo) {
                    logo.src = `images/${style.logo}`;
                }
                
                // Update button styles
                document.querySelectorAll('.style-switcher button').forEach(btn => {
                    styleInactiveButton(btn);
                });
                styleActiveButton(this);
            };
            
            switcherContainer.appendChild(button);
        });
        
        document.body.appendChild(switcherContainer);
    };
    
    function styleActiveButton(button) {
        // Get computed styles to match current theme
        const computedStyles = getComputedStyle(document.documentElement);
        const primaryColor = computedStyles.getPropertyValue('--primary-color') || '#2563eb';
        
        button.style.backgroundColor = primaryColor;
        button.style.color = 'white';
        button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    }
    
    function styleInactiveButton(button) {
        button.style.backgroundColor = '#f8f9fa';
        button.style.color = '#333';
        button.style.boxShadow = 'none';
    }
    
    // Create the style switcher if it doesn't exist
    if (!document.querySelector('.style-switcher')) {
        createStyleSwitcher();
    }
});

// Function to copy the install command to clipboard
function copyInstallCommand() {
    const installCommand = document.querySelector('.install-command code').textContent;
    navigator.clipboard.writeText(installCommand)
        .then(() => {
            const copyButton = document.querySelector('.copy-button');
            const originalText = copyButton.textContent;
            
            // Change button text to show success
            copyButton.textContent = 'Copied!';
            
            // Reset button text after 2 seconds
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy to clipboard. Please try again.');
        });
}
