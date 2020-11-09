function getData(url, cfunction) {
  var request = new XMLHttpRequest();
  //   var comp = this; //reference to this component because in the onreadystatechange can have only one this which is referencing the request
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // alert("status 200");

      cfunction(this.responseText);
    }
  };
  request.open("GET", url, true);
  request.send();
}

export default getData;

