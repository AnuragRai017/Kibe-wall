# 🖼️ Anime Wallpaper Finder 🌸

![Anime Wallpaper Banner](https://wallhaven.cc/images/layout/logo.png)

## ✨ Project Overview

A beautiful, modern Next.js application for discovering and downloading high-quality anime wallpapers. This app uses the Wallhaven API to provide a vast collection of anime-themed wallpapers for your desktop and mobile devices.

## 🚀 Features

- 🔍 Search for wallpapers by keywords, tags, or categories
- 🏷️ Browse wallpapers by popular tags
- 💾 Download wallpapers in various resolutions
- 🌈 Filter by color, resolution, and other parameters
- 🔄 Infinite scrolling for seamless browsing experience
- 📱 Fully responsive design for all devices
- ⚡ Lightning-fast performance with Next.js 15

## 🛠️ Technologies Used

- **Frontend**: React 19, Next.js 15.2.2
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **UI Components**: Radix UI
- **Icons**: Lucide React & React Icons
- **API Integration**: Wallhaven API

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/anime-wallpaper-finder.git
cd anime-wallpaper-finder

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗️ Build

```bash
# Create a production build
npm run build
# or
yarn build

# Start the production server
npm run start
# or
yarn start
```

## 🧪 Project Structure

```
anime-wallpaper-finder/
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API Routes
│   │   │   └── wallhaven/ # Wallhaven API Integration
│   │   ├── page.tsx       # Home Page
│   │   └── layout.tsx     # Root Layout
│   ├── components/        # React Components
│   │   └── WallpaperGrid.tsx  # Main wallpaper display component
│   └── ...
├── public/                # Static Assets
├── next.config.ts         # Next.js Configuration
└── ...
```

## 🌐 API Routes

The application includes several API routes for interacting with the Wallhaven API:

- `/api/wallhaven` - Search for wallpapers
- `/api/wallhaven/tag/[id]` - Get wallpapers by tag ID
- `/api/wallhaven/wallpaper/[id]` - Get a specific wallpaper by ID

## 🎨 Customization

You can easily customize the application by:

1. Modifying the theme in `src/app/globals.css`
2. Adding new components in the `src/components` directory
3. Extending API functionality in the `src/app/api` directory

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Wallhaven API](https://wallhaven.cc/help/api) for providing the wallpaper data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components

## 📸 Screenshots

![Home Page](https://via.placeholder.com/800x450.png?text=Home+Page)
![Wallpaper Detail](https://via.placeholder.com/800x450.png?text=Wallpaper+Detail)
![Search Results](https://via.placeholder.com/800x450.png?text=Search+Results)

---

Created with ❤️ by [Your Name]
