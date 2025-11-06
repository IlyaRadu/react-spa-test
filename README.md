# React SPA with TypeScript and Zustand

This project is a Single Page Application (SPA) built using React, TypeScript, and Zustand. It displays a list of cards, each showing an image and text, with functionality for liking and deleting cards, filtering favorites, and navigating to a detailed card page.

## Project Structure

```
react-spa-test
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
│   ├── react-app-env.d.ts
│   ├── setupTests.ts
│   ├── api
│   │   └── cards.ts
│   ├── components
│   │   ├── Card
│   │   │   ├── Card.tsx
│   │   │   ├── Card.module.css
│   │   │   └── Card.test.tsx
│   │   ├── CardList
│   │   │   ├── CardList.tsx
│   │   │   └── CardList.module.css
│   │   └── Navbar
│   │       ├── Navbar.tsx
│   │       └── Navbar.module.css
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── CardDetail.tsx
│   │   └── NotFound.tsx
│   ├── store
│   │   └── useStore.ts
│   ├── hooks
│   │   └── useFetchCards.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Card Display**: Each card shows an image and text.
- **Like and Delete Functionality**: Users can like or delete cards.
- **Filter Favorites**: Users can filter to view only their favorite cards.
- **Detailed Card Page**: Users can navigate to a detailed view of each card.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd react-spa-test
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Navigate through the application using the Navbar.
- View the list of cards on the Home page.
- Click on a card to view its details.
- Use the like and delete buttons to manage your cards.
- Filter the list to show only favorite cards.

## Technologies Used

- React
- TypeScript
- Zustand
- React Router
- CSS Modules

## License

This project is licensed under the MIT License.