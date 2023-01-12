from flask import Flask,jsonify
from model import Model

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers','Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.route('/<string:ingredients>', methods=['GET'])
def get(ingredients:str):
    m = Model()
    return jsonify({"result":m.recommend(ingredients).tolist()})

if __name__ == "__main__":
    app.run(debug=True,port=5000)