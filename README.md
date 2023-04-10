# My Movie and Series Streaming Availability App

A simple Remix application that fetches and displays movie and series streaming availability information using the [Streaming Availability API](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability) on RapidAPI.

I am using the free version of the API, which limits the number of requests to 100 per day.

It also returns me only 8 results per request, that's why all the movies and series aren't loaded at once. But I instead prefetch them

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Browse and search for movies and series
- View streaming availability for multiple platforms
- Clean and responsive user interface

## Requirements

- Node.js 14.x or higher
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repository.git
cd your-repository
```

2. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

3. Create a `.env.local` file in the root directory of the project and add your RapidAPI key:

```bash
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
```

## Usage

1. Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Contributing

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Create a new branch for your feature or bugfix.
4. Make your changes and commit them to your branch.
5. Push your changes to your fork on GitHub.
6. Create a pull request on the original repository.
