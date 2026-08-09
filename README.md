# EMRAAN FM

A free, single-page fan radio concept inspired by minimalist "one-purpose" music sites.

## What it does
- No search box.
- No song picker.
- Press Play and it runs through a fixed Emraan Hashmi song rotation.
- Uses the YouTube IFrame Player API, so this project does **not** download or host copyrighted music files.

## Run locally
Just open `index.html` in a browser.

For best results, serve the folder with any simple static server.

## Free hosting
You can publish this folder on GitHub Pages, Netlify, or Cloudflare Pages using their free static-site tiers.

## Change/add songs
Open `app.js` and add entries to the `songs` array:

{ title: "Song Name", movie: "Movie Name", id: "YOUTUBE_VIDEO_ID" }

Use official/authorized YouTube uploads where possible. Availability can change by country or by the rights holder.

## Important
This is a fan-made website template. It does not grant you rights to the underlying recordings. If you want to redistribute the music files yourself, you need the appropriate licenses.
