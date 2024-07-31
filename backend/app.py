from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from utils import get_pdf_text, get_text_chunks, get_vectorstore, get_conversation_chain

load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

conversation_chain = None

@app.route('/process', methods=['POST'])
def process():
    global conversation_chain
    pdf_files = request.files.getlist("pdfs")
    raw_text = get_pdf_text(pdf_files)
    text_chunks = get_text_chunks(raw_text)
    vectorstore = get_vectorstore(text_chunks)
    conversation_chain = get_conversation_chain(vectorstore)
    return jsonify({"status": "processed"})

@app.route('/query', methods=['POST'])
def query():
    global conversation_chain
    user_question = request.json.get('question')
    response = conversation_chain({"question": user_question})
    return jsonify({'answer': response['chat_history'][-1].content})

if __name__ == '__main__':
    app.run(debug=True)