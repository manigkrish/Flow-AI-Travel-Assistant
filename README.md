# Flow - AI Travel Assistant


## Project Overview

Flow is a React Native travel assistant application built with Expo that utilizes OpenAI's API for intelligent trip planning conversations. The app allows users to chat with an AI assistant to plan trips, get recommendations, and make travel arrangements. The minimalist design focuses on smooth conversation flow and readable interface.

## Design Approach

The design follows a clean, modern aesthetic with clear visual hierarchy:

- Black Loading Screen: Simple "Flow" branding with white text on black background
- Light-themed Home Screen: List of conversations with descriptive summaries and timestamps
- Interactive Chat Interface: Chat bubbles with tails that visually distinguish between user (black) and AI (light gray) messages
- Guided Conversation Flow: Structured initial conversation that helps users get started with their travel planning

The UI was implemented based on Figma designs.

## Technologies Used

- React Native with Expo
- React Navigation for screen transitions
- AsyncStorage for local data persistence
- Axios for API calls
- OpenAI API integration for conversation generation and summarization

# Getting Started

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator/Android Emulator or physical device

## Installation

- Clone the repository

```bash
git clone https://github.com/your-username/flow-app.git
```

- Install dependencies

```bash
npm install
# or
yarn install
```

1. Add your OpenAI API key

- Note: The API key in the repository is set to "API_KEY" for security

- Start the Expo development server

```bash
npx expo start
```

- Run on simulator/emulator or scan the QR code with the Expo Go app on your device

## Project Structure

```javascript
/flow-app
  /app
    index.js            # App entry point
  /src
    /components
      ChatBubble.js     # Chat message bubble with styling
      ChatInput.js      # Text input for sending messages
      ChatHeader.js     # Header with back button
      ConversationCard.js # Card for conversation list items
    /screens
      LoadingScreen.js  # Initial loading screen with "Flow" logo
      HomeScreen.js     # Conversation list screen
      ChatScreen.js     # Chat interface
    /services
      openai.js         # OpenAI API integration
      storage.js        # AsyncStorage data management
    /utils
      dateHelper.js     # Date formatting utilities

```

## Features

- Conversation History: Saved conversations with AI-generated summaries
- Real-Time Responses: Simulated typing indicators for natural conversation feel
- Guided Trip Planning: Structured conversation flow for travel planning
- Responsive Design: Works on various screen sizes and orientations
- Persistent Storage: Conversation history saved between app sessions

## Design Decisions & Trade-offs

### Design Decisions

- Chat Bubble Implementation: Custom-built chat bubbles with tails to create a more authentic messaging experience rather than using third-party libraries for better design control.
- Loading Screen: Used a simple, branded loading screen to establish the app's identity and provide visual feedback during initial loading.
- Message Summarization: AI-powered conversation summarization to create concise titles for the conversation history, making it easier for users to locate past interactions.
- Typing Indicators: Added simulated typing indicators to create a more natural chatbot experience.

### Trade-offs

- OpenAI API Usage: Used mock responses for some interactions to limit API calls during development. In a production environment, all responses would come from the API.
- Local Storage: Used AsyncStorage for simplicity instead of a more robust database solution. For scaling, a proper backend database would be necessary.
- Error Handling: Implemented basic error handling for API calls. A production app would need more comprehensive error handling and recovery mechanisms.
- Mock Data: Some responses are hardcoded for the initial conversation flow to ensure a consistent user experience. This creates a more guided initial interaction but less flexibility.

## Future Improvements

- User authentication and profile management
- Integration with travel booking APIs
- Offline support and data syncing
- Advanced trip recommendation engine
- Trip itinerary export functionality
- Location-based suggestions
