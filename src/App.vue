<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
var axios = require("axios");
export default {
  mounted() {
    //   alert("App mounted");
      // setInterval(() => this.get_messages(), 10000);
  },

  data() {
    return {};
  },
  methods: {
    get_messages() {
      console.log("hello");
      // var request = new XMLHttpRequest();
      // request.onreadystatechange = function() {
      //   if (request.readyState == 4 && request.status == 200) {
      //     var obj = JSON.parse(this.responseText);
      //     for (var result of obj.result) {
      //       let message = result.message.text;
      //        let from = result.message.from.id;
      //       console.log(from);
      //       let update_id = result.update_id;
      //       this.clear_message(message, from, update_id);
      //     }
      //   }
      // };
      let url =
        "https://api.telegram.org/bot1490325444:AAHcvXdS2ag2RXumvFQ8ssPWE0x5XhNvkq8/getUpdates";
      // request.open("GET", url, true);
      // request.send();
      axios.get(url).then((result) => {
        var obj = result.data;
        for (var objResult of obj.result) {
          let message = objResult.message.text;
          let from = objResult.message.from.id;
          console.log(from);
          let update_id = objResult.update_id;
          this.clear_message(message, from, update_id);
        }
      });
    },

    clear_message(message, from, update_id){
      var request = new XMLHttpRequest();
      
					console.log(from);
					update_id++;
					console.log(update_id);
					var final_url = "https://api.telegram.org/bot1490325444:AAHcvXdS2ag2RXumvFQ8ssPWE0x5XhNvkq8/getUpdates?offset=" + update_id;
					console.log(final_url);
					request.open("POST", final_url, true);
					request.send();
					
					if (message == "/start"){
						this.introduction(from)
					}
					
					else if (message == "/getuserid"){
						   this.get_userid(from);
					} else {
							let userid = message.split(":");
							if (userid == message || String(userid[0]).length <= 7 || isNaN(userid[0]) ){
								this.no_userid(from)
							} else{ 
							this.user_know(from);
							this.reply_messages(userid[1], userid[0], from);
							this.format_messages (userid[0], from);	
							}
						}
			},

    no_userid(from) {
      var request = new XMLHttpRequest();
      console.log(from);
      var final_url =
        "./database/reply_userid.php?from=" + from;
      console.log(final_url);
      request.open("POST", final_url, true);
      request.send();
    },

    user_know(from) {
      var request = new XMLHttpRequest();
      console.log(from);
      var final_url = "./database/telegram3.php?from=" + from;
      console.log(final_url);
      request.open("POST", final_url, true);
      request.send();
    },

    get_userid(from) {
      var request = new XMLHttpRequest();
      console.log(from);
      var final_url = "./database/get_userid.php?from=" + from;
      console.log(final_url);
      request.open("POST", final_url, true);
      request.send();
    },

    introduction(from) {
      var request = new XMLHttpRequest();
      console.log(from);
      var final_url = "./database/introduction.php?from=" + from;
      console.log(final_url);
      request.open("POST", final_url, true);
      request.send();
    },

    format_messages(to, from) {
      var request = new XMLHttpRequest();
      console.log(from);
      var final_url =
        "./database/telegram_format.php?from=" + from + "&to=" + to;
      console.log(final_url);
      request.open("POST", final_url, true);
      request.send();
    },

    reply_messages(message, to, from) {
      var request = new XMLHttpRequest();
      console.log(from);
      var final_url =
        "./database/telegram2.php?message=" +
        message +
        "&from=" +
        from +
        "&to=" +
        to;
      console.log(final_url);
      request.open("POST", final_url, true);
      request.send();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");
body::-webkit-scrollbar {
  display: none;
}
#app {
  font-family: Montserrat, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  scroll-behavior: smooth;

  button {
    &:focus {
      outline: unset;
    }
  }
  #brand {
    font-size: 2rem;
    font-weight: bold;
    color: #d2fdff;
    font-style: italic;
  }
  .spinner-center{
    margin: 18% auto 0%;
    
  }
}
@media only screen and (max-width: 426px) {
  #app #brand {
    font-size: 1.5rem;
  }
}
</style>
