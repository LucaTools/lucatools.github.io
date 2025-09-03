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

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
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
