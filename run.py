import flask
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return "Hello"

@app.route("/post", methods=["GET", "POST"])
@cross_origin(origins=["http://localhost:5500"], methods=["GET", "POST"]) 
def post():
    print("a")
    if request.method == "POST":
        print("d")
        print(request.json["sent"])
        return Response(response=json.dumps({"data":request.json["sent"]}), content_type="application/json")
    else:
        print("s")
        return "No"

if __name__ == "__main__":
    app.run(port=8000, host="0.0.0.0")