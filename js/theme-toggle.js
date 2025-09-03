// Script to toggle between styles
document.addEventListener('DOMContentLoaded', function() {
    // Check if a toggle button already exists; if not, create one
    if (!document.querySelector('#theme-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.textContent = 'Switch Theme';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '20px';
        toggleBtn.style.right = '20px';
        toggleBtn.style.padding = '8px 16px';
        toggleBtn.style.borderRadius = '4px';
        toggleBtn.style.backgroundColor = 'var(--primary-color)';
        toggleBtn.style.color = 'white';
        toggleBtn.style.border = 'none';
        toggleBtn.style.fontWeight = 'bold';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.zIndex = '1000';
        
        // On hover effect
        toggleBtn.onmouseover = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        };
        
        toggleBtn.onmouseout = function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        };
        
        // Get the current stylesheet link
        const stylesheet = document.querySelector('link[rel="stylesheet"]');
        
        // Toggle the stylesheet when clicked
        toggleBtn.addEventListener('click', function() {
            const currentHref = stylesheet.getAttribute('href');
            
            if (currentHref.includes('alternative-style.css')) {
                stylesheet.setAttribute('href', 'css/style.css');
                toggleBtn.textContent = 'Switch to Dark Theme';
            } else {
                stylesheet.setAttribute('href', 'css/alternative-style.css');
                toggleBtn.textContent = 'Switch to Light Theme';
            }
            
            // Update the logo as well
            const logo = document.querySelector('.logo-image');
            if (logo) {
                if (logo.src.includes('luca-logo-alt.svg')) {
                    logo.src = 'images/luca-logo.svg';
                } else {
                    logo.src = 'images/luca-logo-alt.svg';
                }
            }
        });
        
        document.body.appendChild(toggleBtn);
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
