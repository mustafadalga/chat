<template>
  <div class="chat container">
    <h2 class="center teal-text">NatureClan Chat</h2>
    <div class="card">
      <div class="card-content">
        <ul class="messages" ref="messages">
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">
              <i class="material-icons">person</i>
              <span>{{message.name}}</span>
            </span>
            <span class="grey-text text-darken-2 message">{{message.content}}</span>
            <span class="grey-text time">{{message.timestamp}}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
      </div>
    </div>
  </div>
</template>


<script>
import NewMessage from "@/components/NewMessage";
import db from "@/firebase/init";
import moment from "moment";
export default {
  name: "Chat",
  props: ["name"],
  components: {
    NewMessage
  },
  data() {
    return {
      messages: [],
      scroolHeight: null
    };
  },
  methods: {},
  created() {
    let ref = db.collection("messages").orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change);
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format("lll")
          });
        }
      });
    });
  },
  updated() {
    var message = this.$refs.messages;
    message.scrollTop = message.scrollHeight;
  }
};
</script>

<style >
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1em;
}
.chat .teal-text .material-icons {
  font-size: 20px;
  float: left;
}
.chat .new-message .material-icons {
  color: #009688;
  position: absolute;
  right: 40px;
  bottom: 40px;
}
.chat .time {
  display: block;
  font-size: 0.8em;
  margin-left: 1.5em;
}
.messages .message{
  font-size: 14px!important;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>