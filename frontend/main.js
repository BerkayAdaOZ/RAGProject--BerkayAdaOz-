const { useState } = React;

function App() {
    const [files, setFiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const handleRemoveFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleProcessFiles = async () => {
        setProcessing(true);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('pdfs', file);
        });

        try {
            const response = await fetch('http://127.0.0.1:5000/process', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (result.status === 'processed') {
                alert('Files processed successfully');
            }
        } catch (error) {
            console.error('Error processing files:', error);
        } finally {
            setProcessing(false);
        }
    };

    const handleSendMessage = async () => {
        if (currentMessage.trim()) {
            const userMessage = currentMessage;
            setMessages([...messages, { text: userMessage, user: true }]);
            setCurrentMessage("");

            try {
                const response = await fetch('http://127.0.0.1:5000/query', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question: userMessage }),
                });
                const result = await response.json();
                setMessages([...messages, { text: userMessage, user: true }, { text: result.answer, user: false }]);
            } catch (error) {
                console.error('Error querying:', error);
            }
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Your documents</h2>
                <p>Upload your PDFs here and click on 'Process Button'</p>
                <div className="upload-area">
                    <input type="file" id="fileInput" multiple onChange={handleFileChange} style={{ display: 'none' }} />
                    <label htmlFor="fileInput">Drag and drop files here</label>
                    <label htmlFor="fileInput" className="browse-btn">Browse files</label>
                </div>
                <div className="file-list">
                    {files.map((file, index) => (
                        <div className="file-item" key={index}>
                            <span>{file.name}</span>
                            <button className="remove-btn" onClick={() => handleRemoveFile(index)}>×</button>
                        </div>
                    ))}
                </div>
                <button className="process-btn" onClick={handleProcessFiles} disabled={processing}>
                    {processing ? 'Processing...' : 'Process'}
                </button>
            </div>
            <div className="chat-area">
                <h2>Chat with SKYMOD RAG <img src="logo.png" alt="Logo" /></h2>
                <div className="chat-output">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.user ? 'user-message' : 'bot-message'}`}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input 
                        type="text" 
                        placeholder="Ask a question about your documents:" 
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage() : null}
                    />
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));