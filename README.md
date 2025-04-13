# Pokédex Desktop App

A modern desktop application built with Electron that allows users to browse and search Pokémon data in a beautiful, minimalist interface.

## 🚀 Features

- **Modern UI**: Clean, minimalist design with dark theme
- **Real-time Search**: Direct API integration with the Pokémon API
- **Infinite Scroll**: Smooth loading of Pokémon as you scroll
- **Type Filtering**: Filter Pokémon by their types
- **Sorting Options**: Sort by name or ID in ascending/descending order
- **Responsive Design**: Works seamlessly across different screen sizes
- **Error Handling**: Graceful error messages and loading states

## 🛠️ Tech Stack

- **Electron**: For building cross-platform desktop applications
- **HTML/CSS/JavaScript**: For the frontend interface
- **PokéAPI**: For fetching Pokémon data
- **Electron Forge**: For packaging and distribution

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pokedex-electron.git
cd pokedex-electron
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## 🔧 Building for Production

To create a production build:

```bash
npm run make
```

This will generate installers for Windows, macOS, and Linux in the `out` directory.

## 🔐 Code Signing

The application is signed for Windows using a certificate. To build for production:

1. Create a `.env` file with your certificate password:
```
CERTIFICATE_PASSWORD=your_password_here
```

2. Place your `cert.pfx` file in the root directory

## 🎨 UI Features

- **Dark Theme**: Easy on the eyes with a dark color scheme
- **Custom Scrollbar**: Styled scrollbar for better user experience
- **Loading States**: Visual feedback during data fetching
- **Error Messages**: Clear error messages when things go wrong
- **Responsive Cards**: Pokémon cards that adapt to screen size

## 🔍 Search Functionality

- Real-time search as you type
- Direct API integration
- Debounced search to prevent excessive API calls
- Clear results when search is empty

## 📱 Cross-Platform Support

The application is built to work on:
- Windows
- macOS
- Linux

## 🚀 Publishing

The application is published using GitHub Actions. The workflow:
1. Builds the application
2. Signs the Windows installer
3. Creates a GitHub release
4. Uploads the installers as release assets

## 📝 Learning Journey

This project was developed as a learning experience with Electron, focusing on:
- Desktop application development
- Cross-platform compatibility
- API integration
- Modern UI/UX design
- Code signing and distribution
- GitHub Actions for CI/CD

## 🤝 Contributing

Feel free to submit issues and pull requests. All contributions are welcome!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Electron](https://www.electronjs.org/) for the amazing framework
- [PokéAPI](https://pokeapi.co/) for the Pokémon data
- [Electron Forge](https://www.electronforge.io/) for the build tools
