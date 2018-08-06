import axios from 'axios';
import md5 from 'js-md5';

// export const interfaceUrl = "http://172.16.0.241:8081/tiens-console/";
export const interfaceUrl = "http://221.239.72.121:8080/tiens-console/";

export default function ajax(url, data, callback) {
  url = interfaceUrl + url;
  axios({
    method: 'post',
    url: url,
    headers: {
      'X-Token': sessionStorage.getItem('token'),
      'X-Signe': addMd5(data),
      'X-Language': '1',
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
      this.$router.push({path:'/login'});
    }
  }).catch((e) => {
    console.log(e)
  });
}

function addMd5(data) {
  var key = "_TIANSHI#9q6w3e#!";
  return md5(md5(JSON.stringify(data)) + key)
}
