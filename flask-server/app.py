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
from Crypto.Hash import keccak
import urllib.parse
import requests


app = Flask(__name__)
CORS(app, resources={
    "/email": {"origins": "http://localhost:3001"},
    "/domain" : {"origins": "http://localhost:3001"},
    "/password" : {"origins": "http://localhost:3001"}}) 

def keccak_hash(pwd):
    k = keccak.new(digest_bits=512)
    k.update(pwd)
    print(k.hexdigest())
    return k.hexdigest()[:10]

@app.route('/email', methods=["POST"])
def email():
    data = request.get_json()
    email = data.get('email')
    headers = {}
    url ="https://api.xposedornot.com/v1/breach-analytics"
    query = {"email": email}

    response = requests.get(url, headers=headers, params=query)
    breachsummary=[]
    risk = None
    yearwise_details= None
    industry_details= None
    # print(response.json()['ExposedBreaches']['breaches_details'])
    try:
        for breach in response.json()['ExposedBreaches']['breaches_details']:
            breachsummary.append({'domain':breach['breach'],'logo':breach['logo'], 'data':breach['xposed_data'],'date':breach['xposed_date'],'records':breach['xposed_records']})
        
        yearwise_details = response.json()['BreachMetrics']['yearwise_details'][0]
        # industry_details = response.json()['BreachMetrics']['industry'][0]
        # print(industry_details)
    # print(yearwise_details)
        risk = response.json()['BreachMetrics']['risk'][0]['risk_score']
    except:
        pass
    # print(breachsummary)
    return [breachsummary, risk, yearwise_details]


@app.route('/domain', methods=["POST"])
def domain():
    data = request.get_json()
    domain = data.get('domain')
    headers = {}
    url = "https://api.xposedornot.com/v1/breaches"
    query = {"domain": domain}
    breachsummary = []

    response = requests.get(url, headers=headers, params=query)
    try:
        breaches = response.json().get('exposedBreaches', [{}])
        for breach in breaches:
            
            breachsummary.append({
                "fields": ", ".join([str(item) for item in breach.get('exposedData')]),
                "date": breach.get('breachedDate')[:10],
                "records": breach.get('exposedRecords'),
                "description": breach.get('exposureDescription'),
                "logo": breach.get('logo'),
                "url": breach.get('referenceURL') 
            })
    except Exception as e:
        print(f"Error: {e}")
    print(breachsummary)
    return [breachsummary, response.json().get('status')]

@app.route('/password', methods=["POST"])
def password():
    data = request.get_json()
    password = data.get('password')
    breachsummary = []

    pwd_hash = keccak_hash(password.encode())
    koodudal = 'https://passwords.xposedornot.com/api/v1/pass/anon/' + urllib.parse.quote(pwd_hash)
    response = requests.get(koodudal)
    
    try:
        breaches = response.json()['SearchPassAnon']
        breachsummary.append({
            "hash" : breaches['anon'],
            "count" : breaches['count']
        })
    except Exception as e:
        print(f"Error: {e}")
    print(breachsummary)
    return breachsummary
    

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)

 