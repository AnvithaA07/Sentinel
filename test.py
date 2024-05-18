import requests

url = "https://breachdirectory.p.rapidapi.com/"

querystring = {"func":"auto","term":"rohanpatnaik000@gmail.com"}

headers = {
    "X-RapidAPI-Key": "c3aa5813efmshb52a3ac24939899p172d04jsn735a5b89b8e9",
    "X-RapidAPI-Host": "breachdirectory.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
 