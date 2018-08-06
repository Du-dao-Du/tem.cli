console.log('index');
const request = {bus: 'index'};
const {location} = window;
if (location.search) {
  const search = location.search.substring(1);
  const param = search.split('&');
  param.forEach(function(e) {
    const kv = e.split('=');
    request[kv[0]]=kv[1];
  });
}
