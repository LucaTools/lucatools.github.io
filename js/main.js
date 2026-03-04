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

const CLIPBOARD_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Inject copy buttons into all pre elements inside cards
    document.querySelectorAll('.card:not(.no-copy) pre').forEach(pre => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const btn = document.createElement('button');
        btn.className = 'btn-code-copy';
        btn.title = 'Copy to clipboard';
        btn.innerHTML = CLIPBOARD_ICON;
        wrapper.appendChild(btn);

        btn.addEventListener('click', () => {
            const text = pre.querySelector('code') ? pre.querySelector('code').textContent : pre.textContent;
            navigator.clipboard.writeText(text);
            btn.innerHTML = CHECK_ICON;
            btn.style.color = '#10b981';
            btn.style.borderColor = '#10b981';
            btn.style.background = 'rgba(16, 185, 129, 0.15)';
            setTimeout(() => {
                btn.innerHTML = CLIPBOARD_ICON;
                btn.style.color = '';
                btn.style.borderColor = '';
                btn.style.background = '';
            }, 2000);
        });
    });

    // Add animation for features on scroll
    const features = document.querySelectorAll('.feature');
    
    if ('IntersectionObserver' in window) {
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        features.forEach(feature => {
            feature.style.opacity = 0;
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            featureObserver.observe(feature);
        });
    }
});
