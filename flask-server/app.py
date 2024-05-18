from flask import Flask, render_template, request
import requests
app = Flask(__name__)


@app.route('/search', methods=["POST"])
def index():
    email = request.form.get('email1')
    url = "https://breachdirectory.p.rapidapi.com/"

    querystring = {"func":"auto","term":email}

    headers = {
        "X-RapidAPI-Key": "c3aa5813efmshb52a3ac24939899p172d04jsn735a5b89b8e9",
        "X-RapidAPI-Host": "breachdirectory.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    return response.json()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
 