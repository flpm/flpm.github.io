---
title: 'Colophon'
subtitle: '(or how I built and update this site)'
date: '2023-08-24'
---

### The technology stack

This site is a React application written in JavaScript and built using the [Next.js](http://nextjs.org) framework. It uses the static generation option, so the HTML is rendered at build time. 

### CSS and Styling

The site design was created using [Tailwind CSS](https://tailwindcss.com).

### Typography

The typeface for the text is [iA Writer Duo](https://github.com/iaolo/iA-Fonts/tree/master/iA%20Writer%20Duo), a beautiful open-source duo-spaced typeface created for the [iA Writer](https://ia.net/) app. You can read more about it on the post [Writing Fonts: A Typographic Christmas](https://ia.net/topics/a-typographic-christmas) in the iA blog.

The typeface for the headings is [Open Sans](https://github.com/googlefonts/opensans), an open-source typeface designed by [Steve Matteson](https://mattesontypographics.com/).

### Coding

I wrote the code using [Visual Studio Code](https://code.visualstudio.com/) on my Linux laptop.

### Content

The content is not part of the JavaScript code, it is written in Markdown files. Most of the content was written using [Obsidian](https://obsidian.md/), an open-source app, from both my laptop (Linux) or my phone (iOS).

### Publishing

The site code and content are stored in a [repository in GitHub](https://github.com/flpm/flpm.github.io/) and hosted in GitHub Pages. The site is built and published using a CI [workflow](https://github.com/flpm/flpm.github.io/blob/main/.github/workflows/deploy.yml) that triggers when the main branch is pushed up.

### Updating the site

I update the site's content directly from my phone, using [Obsidian](https://obsidian.md/) to edit the markdown files and [Textastic](https://www.textasticapp.com/) to make smaller edits to the JavaScript code. I use [Working Copy](https://workingcopyapp.com/), a git client, to push changes up to Github (which triggers the build and deploy workflow).