function getUrlParamObj(url) {
  url = url.split('?');
  if (url.length <= 1) return {};
  const re = {};
  const params = url[1].split('&');
  for (const param of params) {
    const temp = param.split('=');
    if (temp[0].trim()) re[temp[0]] = temp[1];
  }
  return re;
}

console.log(getUrlParamObj('http://localhost:8000/#/report/boarddesigner?searchText='));
