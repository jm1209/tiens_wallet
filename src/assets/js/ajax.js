import axios from 'axios';
import md5 from 'js-md5';
import $ from 'jquery';

// export const interfaceUrl = "http://172.16.0.241:8081/tiens-console/";
export const interfaceUrl = "http://221.239.72.121:8080/tiens-console/";

export default function ajax(url, data, callback) {
  url = interfaceUrl + 'get/' + url;

  let nonce = getMandomChar(10);
  let timestamp = new Date($.ajax({async: false}).getResponseHeader("Date")).getTime();

  axios({
    method: 'post',
    url: url,
    headers: {
      'X-Token': sessionStorage.getItem('token'),
      'X-Signe': addMd5(data, timestamp, nonce),
      'X-Language': '1',
      'timestamp': timestamp,
      'nonce': nonce,
      'Content-Type': 'application/json',
    },
    data: data
  }).then((response) => {
    var d = response.data;
    if (d.code == '0') {
      callback(d);
    } else if (d.code == '20001') {
      callback(d);
    } else if (d.code == '30002' || d.code == '30001') {
      this.$router.push({path: '/login'});
    }else if (d.code == '30003') {
      callback(d);
    }
  }).catch((e) => {
    console.log(e)
  });
}

function addMd5(data, timestamp, nonce) {
  var key = "_TIANSHI#9q6w3e#!";
  return md5(md5(JSON.stringify(data) + timestamp + nonce) + key)
}

const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function getMandomChar(n) {
  let res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}
