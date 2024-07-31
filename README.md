# Skymod RAG Project

This project simple PDF Query RAG system. This system should be able to extract information from a given PDF file and answer user questions.

### Prerequisites

- Python 3.8+
- Node.js and npm
- pip (Python package manager)

### Steps

1. **Clone the repository:**
    ```sh
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install Python dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the project backend root directory and add the following content:
      ```plaintext
      HUGGINGFACEHUB_API_TOKEN=' '
      ```
4. **Install frontend dependencies:**
    ```sh
    cd frontend
    npm install
    ```

## Usage

### Starting the Backend

1. **Run the backend server:**
    ```sh
    python3 app.py
    ```

    The backend server will run .

### Starting the Frontend

2. **Run the frontend server:**
    ```sh
    npm start
    ```

    The frontend server will run .

3. **View the project in the browser:**
    Open your browser and navigate to `http://localhost:3000` to upload PDF files and start asking questions.

## Requirements

- **Python Packages:**
  - flask
  - flask-cors
  - python-dotenv
  - PyPDF2
  - langchain
  - langchain-community

- **Node.js Packages:**
  - React
  - ReactDOM

This project uses a RAG system to extract information from PDF files and answer user questions. The backend is built with Flask to handle PDF text extraction and processing, while the frontend is built with React to allow users to ask questions.The LLM and embedding model running on the back side is selected as an example, much better ones can be selected and used.
