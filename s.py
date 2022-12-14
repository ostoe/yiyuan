from flask import Flask, render_template, request, make_response
import json
# from werkzeug.routing import  BaseConverter
 
# class RegexConverter(BaseConverter):
#     def __init__(self,url_map,*items):
#         super(RegexConverter,self).__init__(url_map)
#         self.regex=items[0]

app = Flask(__name__)
# app.debug = True
# app.url_map.converters['regex'] = RegexConverter
 
 
@app.route('/', methods=['POST', 'GET'])
def main():
    return render_template('test_inputs.html')
 
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>', methods=['POST'])
def calc(path):
    print(request.json)
    data = [
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "1钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "2",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "外科",
                "wardCode": "2",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
                "yang_2_ying": 1,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "3钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            }
        ]
    try:
        resp = make_response(data)
        resp.headers['Content-Type'] = 'application/json'
        return resp
    except Exception as e:
        print(e)
        return '{"status":"500"}'

@app.route('/doctor/*', methods=['POST'])
def calc1():
    print(request.json)
    data = [
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "1钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "2",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "外科",
                "wardCode": "2",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "2钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            },
            {
                "pi": "91057266",
                "pv": "13925630",
                "patientName": "3钱新华",
                "deptCode": "1",
                "areaName": "总院",
                "ruyuandate": "2021-01-01",
                "deptName": "呼吸内科",
                "wardCode": "1",
                "wardName": "一病区",
                "doctorCode": "31",
                "doctorName": "李楠",
                "ky": 999,
                "hs": 999,
            }
        ]
    try:
        resp = make_response(data)
        resp.headers['Content-Type'] = 'application/json'
        return resp
    except Exception as e:
        print(e)
        return '{"status":"500"}'
 
if __name__ == '__main__':
    app.run(port="8081")
