from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import os
import time

# Setup
app = Flask(__name__)
app.config['SECRET_KEY'] = 'vosw-secret-key'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Configuration
WORKSPACE_DIR = "./workspace_data"
if not os.path.exists(WORKSPACE_DIR):
    os.makedirs(WORKSPACE_DIR)

# --- REST API Endpoints ---

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"status": "online", "system": "VOSW Core v1.0"})

@app.route('/api/files', methods=['GET'])
def list_files():
    """
    Recursively list files in the workspace directory.
    In a real app, use a safe serializer.
    """
    files = []
    for root, dirs, filenames in os.walk(WORKSPACE_DIR):
        for f in filenames:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, WORKSPACE_DIR)
            files.append({
                "name": f,
                "path": f"/{rel_path}",
                "type": "file"
            })
    return jsonify(files)

@app.route('/api/command', methods=['POST'])
def execute_command():
    """
    Endpoint to receive text commands (processed from speech on client or server).
    """
    data = request.json
    command_text = data.get('command', '').lower()
    
    print(f"Received command: {command_text}")
    
    # Mock LLM Processing
    response_msg = f"I heard: '{command_text}'. This is a placeholder response."
    
    if "create file" in command_text:
        # Example safe file operation
        filename = "new_doc.txt" # You would parse this from the command
        with open(os.path.join(WORKSPACE_DIR, filename), 'w') as f:
            f.write("Created via voice command.")
        response_msg = f"Created file {filename}"
        
    return jsonify({
        "message": response_msg,
        "action": "refresh_files"
    })

# --- WebSocket Events (Real-time) ---

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('status', {'msg': 'Connected to VOSW Backend'})

@socketio.on('audio_stream')
def handle_audio(data):
    """
    Receive audio chunks for real-time transcription (Advanced).
    Requires whisper or similar installed locally.
    """
    # TODO: Pass audio chunk to STT engine
    pass

if __name__ == '__main__':
    print("Starting VOSW Backend on port 5000...")
    socketio.run(app, debug=True, port=5000)
