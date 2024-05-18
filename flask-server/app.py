# from flask import Flask, render_template, request
# import requests
# app = Flask(__name__)

# @app.route('/search', methods=["POST"])
# def index():
#     email = request.form.get('email1')
#     url = "https://leakcheck.io/api/public"

#     querystring = {"check" : email}

#     headers = {}

#     response = requests.get(url, headers=headers, params=querystring)

#     return response.json()

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=8000, debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={"/search": {"origins": "http://localhost:3001"}}) 

@app.route('/search', methods=["POST"])
def index():
    data = request.get_json()
    email = data.get('email')
    headers = {}
    url ="https://api.xposedornot.com/v1/breach-analytics"
    query = {"email": email}

    response = requests.get(url, headers=headers, params=query)
    breachsummary=[]
    # print(response.json()['ExposedBreaches']['breaches_details'])
    for breach in response.json()['ExposedBreaches']['breaches_details']:
        breachsummary.append({'domain':breach['domain'],'logo':breach['logo'], 'data':breach['xposed_data'],'date':breach['xposed_date'],'records':breach['xposed_records']})
    # yearwise_details = response.json()['BreachMetrics']['yearwise_details'][0]
    # print(yearwise_details)
    print(breachsummary)
    return breachsummary

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)

 