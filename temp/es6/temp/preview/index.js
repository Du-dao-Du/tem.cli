var request={ bus: 'index'};
if(location.search){
  var search = location.search.substring(1);
  var param = search.split("&");
  param.forEach(function(e){
    var k_v = e.split("=");
    request[k_v[0]]=k_v[1];
  });
}

const js = document.createElement('script');
js.src = `/entry/${request.bus}.js`;
document.body.appendChild(js);
