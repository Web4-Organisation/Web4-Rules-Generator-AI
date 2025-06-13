# Web4 Community Guidelines

Web4 Community Guidelines is a Next.js application, powered by [Linkspreed](https://linkspreed.com), that leverages the Gemini API via Genkit to generate draft community rule sets for [Web4](https://web4.one) communities. Administrators can select predefined tags or provide a custom prompt to describe their community, and the AI will generate a tailored set of guidelines. These rules can then be reviewed, edited, and exported as a Markdown file, ready for use in GitHub repositories or other platforms.

## Features

-   **AI-Powered Rule Generation**: Utilizes the Gemini API to create contextually relevant community rules.
-   **Tag-Based Generation**: Select from a list of predefined community type tags (e.g., "Gaming", "Professional", "Family Friendly") to guide rule creation.
-   **Prompt-Based Generation ("Inspire Me")**: Describe your community in a custom prompt for more tailored rule sets.
-   **Rule Customization**: An integrated editor allows for easy review and modification of AI-generated rules.
-   **Markdown Export**: Download the finalized rules as a `.md` file, formatted for easy inclusion in GitHub READMEs or other documentation.
-   **Responsive Design**: Clean, intuitive interface built with ShadCN UI and Tailwind CSS, ensuring a seamless experience across devices.
-   **Light & Dark Mode**: Themed for both light and dark preferences.

## Technology Stack

-   **Frontend**: Next.js (App Router), React, TypeScript
-   **Styling**: Tailwind CSS, ShadCN UI
-   **AI Integration**: Genkit, Google Gemini API
-   **State Management**: React Hooks (useState, useEffect)
-   **Icons**: Lucide React

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/web4-community-guidelines.git # (You might need to update this if your repo name changed)
    cd web4-community-guidelines
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Using yarn:
    ```bash
    yarn install
    ```
    Using pnpm:
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Google AI API key:
    ```env
    GOOGLE_API_KEY=your_gemini_api_key_here
    ```
    You can obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

1.  **Start the Genkit development server:**
    This server handles the AI flow executions.
    ```bash
    npm run genkit:dev
    ```
    Or, to watch for changes in AI flows:
    ```bash
    npm run genkit:watch
    ```
    Genkit usually runs on port 4000 by default.

2.  **Start the Next.js development server:**
    This serves the frontend application.
    ```bash
    npm run dev
    ```
    The Next.js app will typically run on port 9002 (as per `package.json` script) or another available port. Open your browser and navigate to `http://localhost:9002`.

## Usage

1.  **Navigate to the homepage.**
2.  **Choose your generation method:**
    *   **Generate with Tags**: Select one or more predefined tags that best describe your community.
    *   **Inspire Me (Custom Prompt)**: Write a description of your community or the type of rules you're looking for.
3.  **Click the "Generate Rules" / "Generate Guidelines" button.**
4.  **Review and Edit**: The AI-generated rules will appear in the text editor. You can modify them as needed.
5.  **Export Rules**:
    *   Click "Copy Guidelines" to copy the text to your clipboard.
    *   Click "Download as Markdown" to save the rules as a `.md` file. This file will include a basic structure suitable for a community's README.

## AI Configuration

The AI logic is managed by Genkit and is located in the `src/ai/flows` directory.
-   `generate-community-rules-from-tags.ts`: Handles rule generation based on selected tags.
-   `generate-community-rules-from-prompt.ts`: Handles rule generation based on a custom text prompt.

These flows interact with the Gemini API. Ensure your `GOOGLE_API_KEY` is correctly set up in `.env.local`.

## Deployment

This Next.js application is configured for Firebase App Hosting (see `apphosting.yaml`). You can deploy it to Firebase or any other platform that supports Next.js applications.

For Firebase App Hosting:
1. Ensure you have the Firebase CLI installed and configured.
2. Initialize Firebase in your project if you haven't already: `firebase init apphosting`
3. Deploy your application: `firebase deploy --only apphosting`

For other platforms (Vercel, Netlify, etc.), follow their specific deployment guides for Next.js applications.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a PullRequest

## License

Distributed under the MIT License. See `LICENSE` for more information (if a LICENSE file is added).
This project does not currently include a LICENSE file. You may add one if desired.

---

Happy Web4 community building!
