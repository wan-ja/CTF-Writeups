from flask import Flask, render_template, request, jsonify, abort
import os
import random


app = Flask(__name__)
app.secret_key = os.urandom(32)

FLAG = open('flag.txt', 'r').read().strip()

flag_doc_id = random.randint(100, 999)

documents = {
    flag_doc_id: {
        'title': 'Confidential Report - Access Restricted',
        'content': f'This is a confidential internal document.\n\nDocument ID: {flag_doc_id}\nClassification: TOP SECRET\n\n<!-- FLAG: {FLAG} -->\n\nThis document contains sensitive information and should only be accessed by authorized personnel.',
        'classification': 'confidential',
        'author': 'System Administrator'
    }
}

for i in range(1000):
    if i not in documents:
        uid = random.randint(0, 9)
        documents[i] = {
            'title': f'Document #{i:03d}',
            'content': f'This is document number {i}.\n\nContent: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDocument ID: {i}\nCreated: 2025-01-{(i % 28) + 1:02d}\nAuthor: User{uid}',
            'classification': 'public' if random.randint(0, 2) == 0 else 'internal',
            'author': f'User{uid}'
        }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/share')
def share():
    return render_template('share.html')

@app.route('/doc/<int:doc_id>')
def view_document(doc_id):
    referer = request.headers.get('Referer', '')
    user_level = request.headers.get('X-User', 'guest')

    if doc_id < 0 or doc_id >= 1000:
        abort(404)
    
    if doc_id not in documents:
        abort(404)
    
    document = documents[doc_id]

    if '/share' not in referer:
        return render_template('error.html', 
            message="Access denied. Documents can only be accessed from the share page."), 403
    
    if document['classification'] == 'confidential':
        if user_level != 'admin':
            return render_template('error.html', 
                message="Insufficient privileges. Administrator access required."), 403
    
    elif document['classification'] == 'internal':
        if user_level == 'guest':
            return render_template('error.html', 
                message="Internal documents require user authentication."), 401
    
    return render_template('document.html', doc=document, doc_id=doc_id)

@app.route('/api/docs')
def list_docs():
    SHOW_COUNT = 15
    user_level = request.headers.get('X-User', 'guest')
    visible_docs = []
    
    for doc_id, doc in documents.items():
        if doc['classification'] == 'public':
            visible_docs.append({'id': doc_id, 'title': doc['title'], 'classification': doc['classification']})
        elif doc['classification'] == 'internal' and user_level != 'guest':
            visible_docs.append({'id': doc_id, 'title': doc['title'], 'classification': doc['classification']})
        elif doc['classification'] == 'confidential' and user_level == 'admin':
            visible_docs.append({'id': doc_id, 'title': doc['title'], 'classification': doc['classification']})
        if len(visible_docs) >= SHOW_COUNT:
            break
    
    return jsonify(visible_docs)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)