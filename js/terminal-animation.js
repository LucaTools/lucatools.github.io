document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.getElementById('terminal-content');
    if (!terminalContent) return;

    const sequence = [
        {
            text: 'luca install realm/swiftlint@0.62.0',
            type: 'command',
            delay: 800
        },
        {
            text: '',
            type: 'output',
            delay: 0
        },
        {
            text: '⬇️ Downloading swiftlint version 0.62.0...',
            type: 'output',
            delay: 800
        },
        {
            text: '📋 Skipping checksum validation for swiftlint version 0.62.0...',
            type: 'output',
            delay: 800
        },
        {
            text: '📦 Unarchiving swiftlint version 0.62.0...',
            type: 'output',
            delay: 800
        },
        {
            text: '💾 Installed swiftlint version 0.62.0 at /Users/alberto/.luca/tools/swiftlint/0.62.0',
            type: 'output',
            delay: 800
        },
        {
            text: '🔗 Created symlink to /Users/alberto/MyProject/.luca/tools/swiftlint',
            type: 'output',
            delay: 800
        },
        {
            text: '🙌 Tool swiftlint version 0.62.0 installed for the current project.',
            type: 'output',
            delay: 1200
        },
        {
            text: '',
            type: 'output',
            delay: 0
        },
        {
            text: '🚀 Tools have been installed for the current project.',
            type: 'success',
            delay: 4000
        },
        {
            text: 'clear',
            type: 'command',
            action: 'clear',
            delay: 500
        },
        {
            text: 'luca install # spec defined in Lucafile',
            type: 'command',
            delay: 1000
        },
        {
            text: '',
            type: 'output',
            delay: 0
        },
        {
            text: '🧠 Detecting tools to install...',
            type: 'output',
            delay: 800
        },
        {
            text: '🏃‍♂️ Installing tools for the current project.',
            type: 'output',
            delay: 800
        },
        {
            text: '',
            type: 'output',
            delay: 0
        },
        {
            text: '⬇️ Downloading Tuist version 4.80.0...',
            type: 'output',
            delay: 800
        },
        {
            text: '📦 Unarchiving Tuist version 4.80.0...',
            type: 'output',
            delay: 800
        },
        {
            text: '💾 Installed Tuist version 4.80.0 at /Users/alberto/.luca/tools/Tuist/4.80.0',
            type: 'output',
            delay: 800
        },
        {
            text: '🔗 Created symlink to /Users/alberto/MyProject/.luca/tools/tuist',
            type: 'output',
            delay: 800
        },
        {
            text: '🙌 Tool Tuist version 4.80.0 installed for the current project.',
            type: 'output',
            delay: 1200
        },
        {
            text: '',
            type: 'output',
            delay: 0
        },
        {
            text: '👀 Tool SwiftLint version 0.62.0 is already installed.',
            type: 'output',
            delay: 800
        },
        {
            text: '🔗 Recreated symlink at /Users/alberto/MyProject/.luca/tools/swiftlint',
            type: 'output',
            delay: 800
        },
        {
            text: '🙌 Tool SwiftLint version 0.62.0 installed for the current project.',
            type: 'output',
            delay: 1200
        },
        {
            text: '',
            type: 'output',
            delay: 0
        },
        {
            text: '🚀 Tools have been installed for the current project',
            type: 'success',
            delay: 4000
        },
        {
            type: 'reset',
            action: 'clear',
            delay: 500
        }
    ];

    let currentStep = 0;
    
    async function typeText(element, text, speed = 50) {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    async function runSequence() {
        if (currentStep >= sequence.length) {
            currentStep = 0;
        }

        const step = sequence[currentStep];

        if (step.action === 'clear') {
            terminalContent.innerHTML = '';
            currentStep++;
            setTimeout(runSequence, step.delay || 500);
            return;
        }

        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        if (step.type === 'command') {
            line.className += ' command-line';
            const prompt = document.createElement('span');
            prompt.className = 'prompt';
            prompt.textContent = '$ ';
            line.appendChild(prompt);
            
            const cmdText = document.createElement('span');
            line.appendChild(cmdText);
            terminalContent.appendChild(line);
            
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;

            await new Promise(resolve => setTimeout(resolve, step.delay));
            await typeText(cmdText, step.text);
        } else {
            line.className += step.type === 'success' ? ' text-green' : '';
            line.textContent = step.text;
            terminalContent.appendChild(line);
            // Scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }

        currentStep++;
        setTimeout(runSequence, step.delay || 500);
    }

    // Start blinking cursor style
    const style = document.createElement('style');
    style.textContent = `
        .terminal-content {
            min-height: 240px;
            padding: 16px;
            font-family: 'JetBrains Mono', monospace;
            font-size: clamp(11px, 2.5vw, 13px);
            line-height: 1.6;
            color: #aaa;
            overflow-y: hidden;
            overflow-x: hidden;
            position: relative;
        }
        .terminal-line {
            margin-bottom: 4px;
            min-height: 1.6em;
        }
        .prompt {
            color: #fff;
            margin-right: 8px;
        }
        .text-green {
            color: #ccc;
        }
        .command-line::after {
            content: '▋';
            display: inline-block;
            vertical-align: bottom;
            animation: blink 1s step-start infinite;
            color: #fff;
            margin-left: 4px;
        }
        /* Only show cursor on the last command line */
        .command-line:not(:last-child)::after {
            display: none;
        }
        @keyframes blink {
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    runSequence();
});
