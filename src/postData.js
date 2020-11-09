function postData(url, cfunction) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // alert("status 200");

      cfunction(this.responseText);
    }
  };
  request.open("POST", url, true);
  request.send();
}

export default postData;
