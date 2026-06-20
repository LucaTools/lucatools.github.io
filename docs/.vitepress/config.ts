import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Luca',
  description: 'Manage tools, agentic skills and tasks your way. On macOS and Linux.',
  appearance: 'dark',
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-6KPB6Y4G0Q' }],
    ['script', {}, "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-6KPB6Y4G0Q');"],
    ['meta', { property: 'og:image', content: 'https://luca.tools/images/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://luca.tools/images/og-image.png' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Luca',
      operatingSystem: 'macOS, Linux',
      applicationCategory: 'DeveloperApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Manage tools, agentic skills and tasks your way. On macOS and Linux.',
      image: 'https://luca.tools/images/luca-logo-alt.svg',
      url: 'https://luca.tools/',
    })],
  ],

  sitemap: {
    hostname: 'https://luca.tools',
  },

  themeConfig: {
    logo: '/images/luca-logo-alt.svg',
    siteTitle: 'Luca',

    nav: [
      { text: 'Docs', link: '/getting-started/installation' },
      { text: 'Manifesto', link: '/manifesto' },
      { text: 'API Reference', link: 'https://luca.tools/Luca/documentation/lucacli/', target: '_blank' },
      { text: 'GitHub', link: 'https://github.com/LucaTools/Luca', target: '_blank' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Quick Start', link: '/getting-started/quick-start' },
        ],
      },
      {
        text: 'Tool Management',
        collapsed: true,
        items: [
          { text: 'Installing Tools', link: '/tools/installing-tools' },
          { text: 'Lucafile: tools', link: '/tools/lucafile-tools' },
          { text: 'Checksums & Security', link: '/tools/checksums-and-security' },
          { text: 'Version Pinning', link: '/tools/version-pinning' },
        ],
      },
      {
        text: 'Skill Management',
        collapsed: true,
        items: [
          { text: 'Installing Skills', link: '/skills/installing-skills' },
          { text: 'Lucafile: skills', link: '/skills/lucafile-skills' },
          { text: 'Global Skills', link: '/skills/global-skills' },
          { text: 'Supported Agents', link: '/skills/supported-agents' },
        ],
      },
      {
        text: 'Pipeline Engine',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/pipelines/overview' },
          { text: 'Pipeline YAML', link: '/pipelines/pipeline-yaml' },
          { text: 'Parameters', link: '/pipelines/parameters' },
          { text: 'Conditional Tasks', link: '/pipelines/conditional-tasks' },
          { text: 'Environment & .env Files', link: '/pipelines/environment-and-env-files' },
          { text: 'Working Directories', link: '/pipelines/working-directories' },
          { text: 'Dry Run', link: '/pipelines/dry-run' },
          { text: 'Params Files', link: '/pipelines/params-files' },
        ],
      },
      {
        text: 'Ecosystem',
        collapsed: true,
        items: [
          { text: 'LucaScripts', link: '/ecosystem/lucascripts' },
          { text: 'GitHub Actions', link: '/ecosystem/github-actions' },
          { text: 'LucaWorkflows', link: '/ecosystem/lucaworkflows' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LucaTools/Luca' },
    ],

    footer: {
      message: 'Released under the Apache 2.0 License.',
    },

    search: {
      provider: 'local',
    },
  },
})
