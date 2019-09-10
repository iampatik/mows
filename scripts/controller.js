//for broker
var btnConnect = document.getElementById('connect');
var btnDisconnect = document.getElementById('disconnect');
var btnStatus = document.getElementById('status');

//for publishing
var btnPublish = document.getElementById('publish');
var pubTopic = document.getElementById('pubTopic');
var pubPayload = document.getElementById('pubPayload');

//subscribing
var subTopic = document.getElementById('subTopic');
var btnSubscribe = document.getElementById('btnSubscribe');
var btnUnsubscribe = document.getElementById('btnUnsubscribe');

// basic functionalities

btnConnect.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Connecting..");
  client = mqtt.connect(document.getElementById('address').value)
  console.log(document.getElementById('address').value);

  client.on("connect", function () {
    console.log("Successfully connected");
    btnStatus.disabled = false;
    btnDisconnect.disabled = false;
    btnConnect.disabled = true;
    btnStatus.setAttribute('value', 'Connected successfully!')
    btnStatus.setAttribute('class', 'btn btn-success')
  })

  client.on("message", function (topic, payload) {
    console.log('on message')
    console.log("Received { topic: " + topic + "; payload: " + payload + " }");
    let tbl = document.getElementById('pubReceiver');
    let tbody2 = document.getElementById('tbReceive');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgPayload = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(topic));
    msgPayload.appendChild(document.createTextNode(payload));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgPayload);
    tr.appendChild(msgTime);
    tbody2.appendChild(tr);
    console.log(tbl)
  })

  btnDisconnect.addEventListener("click", function (e) {
    client.end();
    btnStatus.disabled = true;
    btnDisconnect.disabled = true;
    btnConnect.disabled = false;
    console.log('Disconnected');
    btnStatus.setAttribute('value', 'Disconnected successfully!')
    btnStatus.setAttribute('class', 'btn btn-warning')
  })

  btnPublish.addEventListener("click", function (e) {
    e.preventDefault();
    client.publish(document.getElementById('pubTopic').value, document.getElementById('pubPayload').value)
    console.log("Published { topic: " + document.getElementById('pubTopic').value
      + "; payload: " + document.getElementById('pubPayload').value + " }");
    let tbl = document.getElementById('pubReceiver');
    let tbody = document.getElementById('tbPublish');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgPayload = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(document.getElementById('pubTopic').value));
    msgPayload.appendChild(document.createTextNode(document.getElementById('pubPayload').value));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgPayload);
    tr.appendChild(msgTime);
    tbody.appendChild(tr);
    tbl.appendChild(tbody);
    // console.log(document.getElementById('pub-topic').value);
    // console.log(document.getElementById('pub-payload').value);
  })

  btnSubscribe.addEventListener("click", function (e) {
    // console.log("subscribe");
    // client.subscribe("mqtt/demo");
    e.preventDefault();
    client.subscribe(document.getElementById('subTopic').value);
    console.log("Subscribe { topic: " + document.getElementById('subTopic').value + " }");
    let tbl = document.getElementById('topicReceiver');
    let tbody = document.getElementById('tbSub');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(document.getElementById('subTopic').value));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgTime);
    tbody.appendChild(tr);
    tbl.appendChild(tbody);
    btnUnsubscribe.disabled = false;
    btnSubscribe.disabled = true;
  })

  btnUnsubscribe.addEventListener("click", function (e) {
    client.unsubscribe(document.getElementById('subTopic').value);
    console.log("Unsubscribe { topic: " + document.getElementById('subTopic').value + " }");
    btnUnsubscribe.disabled = true;
    btnSubscribe.disabled = false;
  })

})


// basic functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo")


// //for broker
// var btnConnect = document.getElementById('connect');
// var btnDisconnect = document.getElementById('disconnect');
// var broker = document.getElementById('address');
// var btnStatus = document.getElementById('status');

// //for publishing
// var btnPublish = document.getElementById('publish');
// var pubTopic = document.getElementById('pubTopic');
// var pubPayload = document.getElementById('pubPayload');

// //subscribing
// var subTopic = document.getElementById('subTopic');
// var btnSubscribe = document.getElementById('btnSubscribe');
// var btnUnsubscribe = document.getElementById('btnUnsubscribe');


// btnConnect.addEventListener('click', function (e) {
//   e.preventDefault();
//   //client
//   var client = mqtt.connect(broker.value)
//   // client.subscribe("mqtt/demox")

//   btnSubscribe.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log("mqtt/" + subTopic.value)
//     client.subscribe("mqtt/" + subTopic.value);
//     btnUnsubscribe.disabled = false;
//     btnSubscribe.disabled = true;
//   })

//   btnUnsubscribe.addEventListener('click', function (e) {
//     e.preventDefault();
//     client.unsubscribe("mqtt/" + subTopic.value);
//     btnUnsubscribe.disabled = true;
//     btnSubscribe.disabled = false;
//     console.log("Unsubscribed to mqtt/" + subTopic.value)
//   })

//   client.on("connect", function () {
//     console.log("Successfully connected");
//     btnStatus.disabled = false;
//     btnDisconnect.disabled = false;
//     btnConnect.disabled = true;
//     btnStatus.setAttribute('value', 'Successfully Connected!')
//     btnStatus.setAttribute('class', 'btn btn-success')
//     btnStatus.disabled = true;
//   });


//   //btnDisconnect
//   btnDisconnect.addEventListener('click', function () {
//     client.end();
//     btnStatus.disabled = true;
//     btnDisconnect.disabled = true;
//     btnConnect.disabled = false;
//     console.log('Disconnected');
//     btnStatus.setAttribute('value', 'Disconnected!')
//     btnStatus.setAttribute('class', 'btn btn-warning')
//   });


//   client.on("message", function (topic, payload) {
//     let finalTopic = topic.slice(5);
//     console.log([finalTopic, payload].join(": "));
//     let tbl = document.getElementById('receiver');
//     let tbody = document.getElementById('tbReceive');
//     let tr = document.createElement('tr');
//     let msgTopic = document.createElement('td');
//     let msgPayload = document.createElement('td');
//     let msgTime = document.createElement('td');
//     msgTopic.appendChild(document.createTextNode(finalTopic));
//     msgPayload.appendChild(document.createTextNode(payload));
//     msgTime.appendChild(document.createTextNode(moment().format('llll')));
//     tr.appendChild(msgTopic);
//     tr.appendChild(msgPayload);
//     tr.appendChild(msgTime);
//     tbody.appendChild(tr);
//     tbl.appendChild(tbody);
//   })

//   client.on("message", function (topic, payload){
//     console.log([finalTopic, payload].join(": "));
//     let tbl = document.getElementById('publishReceiver');
//     let tbody = document.getElementById('tbPublish');
//     let tr = document.createElement('tr');
//     let msgTopic = document.createElement('td');
//     let msgPayload = document.createElement('td');
//     let msgTime = document.createElement('td');
//     msgTopic.appendChild(document.createTextNode(finalTopic));
//     msgPayload.appendChild(document.createTextNode(payload));
//     msgTime.appendChild(document.createTextNode(moment().format('llll')));
//     tr.appendChild(msgTopic);
//     tr.appendChild(msgPayload);
//     tr.appendChild(msgTime);
//     tbody.appendChild(tr);
//     tbl.appendChild(tbody);

// })

//   // client.publish("mqtt/demox", "hello world!")

//   btnPublish.addEventListener('click', function (e) {
//     e.preventDefault();
//     client.publish("mqtt/" + pubTopic.value, pubPayload.value)
//   })
// });




// // client.on("connect", function(){
// //     console.log("Successfully connected");
// // })

// // client.on("message", function (topic, payload) {
// //   console.log([topic, payload].join(": "));
// //   client.end();
// // })

// //client.publish("mqtt/demo", "hello world!");

// // // advance functionalities
// // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// // client.subscribe("mqtt/demo", function (err){
// //   if (err){
// //     console.log(err);
// //   } else {
// //     console.log("subscribed")
// //   }
// // })

// // client.on("connect", function(){
// //     console.log("Successfully connected");
// // })

// // client.on("message", function (topic, payload) {
// //   console.log([topic, payload].join(": "));
// //   client.end();
// // })

// // client.publish("mqtt/demo", "hello world!", function(err){
// //   if (err){
// //     console.log(err)
// //   } else {
// //     console.log("published")
// //   }
// // })


