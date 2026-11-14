# Paradise Nursery — React Shopping Cart

A responsive houseplant storefront built with **React**, **Vite**, **Redux Toolkit**, and **React Router**. The project contains a landing page, a grouped plant catalogue, and a shopping cart with quantity controls and order totals.

## Features

- Three pages: Home, Plants, and Cart (client-side hash routing for GitHub Pages compatibility).
- Eighteen houseplants grouped into three categories, with six unique plants in each category.
- Product cards with local SVG thumbnails, descriptions, prices, and Add to Cart buttons.
- Add buttons change to **Added to Cart** and become disabled while that plant is in the cart.
- Redux Toolkit cart state with `addItem`, `removeItem`, and `updateQuantity` reducers.
- Cart item quantity controls, line subtotals, total plant count, order total, and remove actions.
- Cart contents persist in browser local storage across refreshes.
- Responsive layout for desktop, tablet, and mobile screens.
- GitHub Actions workflow to build and deploy the site to GitHub Pages.

## Run locally

You need Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Publish to a public GitHub repository

1. Create a **public** repository on GitHub, for example `Paradise-Nursery`.
2. Extract this ZIP file on your computer.
3. Open a terminal in the extracted `Paradise-Nursery` folder and run:

   ```bash
   git init
   git add .
   git commit -m "Build Paradise Nursery shopping cart app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/Paradise-Nursery.git
   git push -u origin main
   ```

4. On GitHub, open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.
5. The workflow in `.github/workflows/deploy.yml` will build and deploy the application after a push to `main`. The live URL will appear in the repository's **Settings → Pages** section and in the workflow deployment summary.

The app uses `HashRouter` and relative Vite asset paths so it can run from a GitHub Pages project URL without server-side route rewrites.

## Assessment file links

After pushing the repository, use the following public URLs in the assessment. Replace `YOUR-USERNAME` with your GitHub username and keep the repository and branch names consistent with your upload.

```text
https://github.com/YOUR-USERNAME/Paradise-Nursery/blob/main/README.md
https://github.com/YOUR-USERNAME/Paradise-Nursery/blob/main/src/AboutUs.jsx
https://github.com/YOUR-USERNAME/Paradise-Nursery/blob/main/src/App.css
https://github.com/YOUR-USERNAME/Paradise-Nursery/blob/main/src/App.jsx
https://github.com/YOUR-USERNAME/Paradise-Nursery/blob/main/src/CartSlice.jsx
https://github.com/YOUR-USERNAME/Paradise-Nursery/blob/main/src/ProductList.jsx
https://github.com/YOUR-USERNAME/Paradise-Nursery/blob/main/src/CartItem.jsx
```

## Project structure

```text
Paradise-Nursery/
├── .github/workflows/deploy.yml
├── public/images/              # Local plant illustration thumbnails
├── src/
│   ├── assets/nursery-hero.svg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── PlantCard.jsx
│   ├── data/plants.js
│   ├── AboutUs.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── CartItem.jsx
│   ├── CartSlice.jsx
│   ├── ProductList.jsx
│   ├── main.jsx
│   └── store.js
├── index.html
├── package.json
└── vite.config.js
```

## Before submitting

Run the app locally, test all three pages, add and remove plants, change quantities, refresh to confirm cart persistence, and verify the public GitHub file URLs and deployed site. Review and adapt the implementation so you understand every part and comply with your course's academic-integrity and AI-use rules.
