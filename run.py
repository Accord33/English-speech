import flask
from flask import Flask, request, Response, render_template
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return "Hello"

@app.route("/get", methods=["GET", "POST"])
@cross_origin(origins=["http://localhost:9090"], methods=["GET", "POST"]) 
def get():
    text = request.args.get("text")
    num = request.args.get("num")
    print(text, num)
    return "Successfull"
        

if __name__ == "__main__":
    app.run(port=8000, host="0.0.0.0", debug=True)