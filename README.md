# Major Sports Events

Major Sports Events is a multilingual landing page for showcasing high-profile sports competitions and embedding live data from [API-Sports](https://dashboard.api-football.com/). The site is published via GitHub Pages and prioritises a clean, professional layout suitable for enterprise partners who need a central hub for international sports calendars.

## Features

- **Enterprise-focused hero** describing the subscription proposition for global sports calendars.
- **Multilingual interface** with translations for English, Portuguese, Spanish, French, Russian, Chinese (Simplified), Hindi, Arabic, Bengali, Italian, and Japanese.
- **Live API-Sports explorer** that lets visitors preview official widgets across sports, languages, themes, and widget types using the provided production API key.
- **Accessible design** with keyboard shortcuts (press `S` to focus the language selector) and responsive layout for desktop and mobile.

## Project structure

```
.
├── CNAME                  # Custom domain for GitHub Pages
├── data/
│   ├── fallback-events.json   # Static calendar data used when live data is unavailable
│   └── sports-config.js       # Widget metadata: sports, languages, widget types, defaults
├── index.html             # Main landing page with embedded styles and scripts
└── netlify/               # Netlify deployment helpers (optional)
```

## Local development

This repository is a static site: there is no build step. Any HTTP server that can serve static files will work for local previews. For example:

```bash
# From the repository root
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

### Editing translations

All text strings live inside the `translations` object in `index.html`. Each locale entry controls the visible copy for the hero, buttons, footer, and widget interface. To add a new language:

1. Duplicate an existing locale object (e.g. `en`).
2. Update the `name` and the translation strings.
3. Append the locale key to the `order` array so it appears in the language selector.

### Configuring the API-Sports explorer

The explorer control uses `data/sports-config.js` to populate the dropdowns. Update this file to:

- Add or remove sports codes supported by API-Sports.
- Adjust available widget types (`leagues`, `fixtures`, `standings`, etc.).
- Map widget and sport labels per language.

The embed requires the official API-Sports widget script (`https://widgets.api-sports.io/2.0.3/widget.js`). Ensure the API key has access to the sports and widget types you expose.

## Deployment

The site is designed for GitHub Pages. Pushing to the default branch will publish the latest version to the domain defined in `CNAME`. If you deploy elsewhere, ensure the root HTML file remains `index.html` and that the widget script can load from API-Sports.

## License

This project inherits the licensing terms of the Major Sports Events organisation. If you intend to reuse parts of the code, please confirm licensing with the project maintainers.
