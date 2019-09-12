var firebaseConfig = {
    apiKey: "AIzaSyAs0wY8yWEmIaASFYVXB3vzukvQ_9fCCTY",
    authDomain: "trains-4f47d.firebaseapp.com",
    databaseURL: "https://trains-4f47d.firebaseio.com",
    projectId: "trains-4f47d",
    storageBucket: "",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var nextTrain = 0;

$(document).ready(function() {

    $("#add-train").on("click", function(event) {
        event.preventDefault();
        var today = new Date();
        var timeHr = today.getHours();
        var timeMin = today.getMinutes();

        console.log(timeHr + ":" + timeMin);

        

        

        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        var firstTrainHr = $("#hourInput").val().trim();
        var firstTrainMin = $("#minuteInput").val().trim();
        firstTrain = firstTrainHr + ":" + firstTrainMin;
        frequency = $("#frequencyInput").val().trim();

        var nextHr = firstTrainHr;
        var nextMin = firstTrainMin;
        console.log(nextHr);

        while (timeHr > nextHr && timeMin > nextMin) {
            nextMin = nextMin + frequency;
            while (nextMin >= 60) {
                nextMin = nextMin - 60;
                nextHr = Math.floor(nextHr + 1);
                console.log(nextHr + ":" + nextMin);
            }
        }

//was having issues with a zero showing up in front of the number making it a three digit number starting with zero
//tired the code below but it didnt work
        // if (nextMin.length = 3 && nextMin.charAt(0) == 0) {
        //     nextMin.slice(0, 1);
        // } else {
        //     nextTrain = nextHr + ":" + nextMin;
        // }
        

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            nextTrain: nextTrain
        });
    });
    database.ref().on("child_added", function(data) {
        var dv = data.val();

        console.log(dv.trainName);
        console.log(dv.destination);
        console.log(dv.firstTrain);
        console.log(dv.frequency);
        console.log(dv.nextTrain);
        

        var newName = '<td scope="col">' + dv.trainName + '</td>';
        var newDestination = '<td scope="col">' + dv.destination + '</td>';
        var newFirstTrain = '<td scope="col">' + dv.firstTrain + '</td>';
        var newFrequency = '<td scope="col">' + dv.frequency + '</td>';
        var newNextTrain = '<td scope="col">' + dv.nextTrain + '</td>';

        var newestTrain = '<tr>' + newName + newDestination + newFirstTrain + newFrequency + newNextTrain + '<tr>';
        
        $("#newTrain").append(newestTrain);


    });
});