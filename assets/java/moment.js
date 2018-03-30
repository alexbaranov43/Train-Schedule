var config = {
    apiKey: "AIzaSyCtrfXBfHYtvolTMOS0y-WFY9Cv2LwhJDY",
    authDomain: "train-schedule-cbf17.firebaseapp.com",
    databaseURL: "https://train-schedule-cbf17.firebaseio.com",
    projectId: "train-schedule-cbf17",
    storageBucket: "train-schedule-cbf17.appspot.com",
    messagingSenderId: "309181181107"
};
firebase.initializeApp(config);


//variable to reference firebase
var database = firebase.database();

//initial values
var train = "";
var destination = "";
var firstTime = "";
var frequency;
var nextTrain = "";
var minAway = 0;
var currentTime = moment();

$("#add-train").on("click", function (event) {
    event.preventDefault()
    var newRow = $("<tr>")
   
    train = $("#trainName").val().trim();
    newRow.append("<td>" +train +"</td>" )
    destination = $("#destination").val().trim();
    newRow.append("<td>"+ destination +"</td>")
    firstTime = $("#firstTrain").val().trim();

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years")

    frequency = parseInt($("#frequency").val().trim());
    newRow.append("<td>"+ frequency +"</td>" ) ;

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes")
    var remainder = diffTime % frequency

    minAway = frequency - remainder;
    var minLeft = moment().add(minAway, "minutes")

    nextTrain = moment(minLeft).format("HH:mm")
    newRow.append("<td>"+ nextTrain +"</td>");
    newRow.append("<td>"+ minAway +"</td>");
    $("#newTrains").append(newRow)


    database.ref().push({
        train: train,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        nextTrain: nextTrain,
        minAway: minAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    })

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
        var sv = snapshot.val();

        
    })

})
