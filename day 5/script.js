

$('#form-box').hide()
$('#time-box').hide()
$('#time-btn').hide()
$('#timer').hide()
$('#admin-tabs').hide()
$('#dashboard-box').hide()
$('#signin-box').show()
$('#candidates-box').hide()
$('.vote-btn-main').hide()
$('#signin-box-box').show()
$('#signup-box-box').hide()

$('#l').hide()

const firebaseConfig = {
    apiKey: "AIzaSyCCPqhSYjvCJwylJCFPCyj76aMg0c5m4k8",
    authDomain: "voteme-9bf44.firebaseapp.com",
    projectId: "voteme-9bf44",
    storageBucket: "voteme-9bf44.appspot.com",
    messagingSenderId: "719029467128",
    databaseURL: "https://voteme-9bf44-default-rtdb.firebaseio.com/",
    appId: "1:719029467128:web:39285b5f12717035ea480d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
var user = firebase.auth().currentUser;

console.log(user)
setInterval(() => {
var user = firebase.auth().currentUser;

            var name = $('#usernameview');
            name.empty()
            name.append(` ${user.email}`)
            firebase.database().ref("admin/").on('value', function (data){
        data.forEach(element => {
            if (element.val() == user.email) {
                $('#admin-tabs').show()
                $('#time-btn').show()
            }else{    
                $('#admin-tabs').hide()
                $('#time-btn').hide()
            }
        });
    }); 
}, 2000);

$('#submit-time').click(function (e) {
    e.preventDefault();
    $('#timer').show()
    $('#time-btn').hide()

    var g = $('[name="time"]').val();
    var countDownDate = new Date(g).getTime();
    console.log(countDownDate)

    firebase.database().ref('election/').set({
        time: countDownDate
    })

});
firebase.database().ref('election/').on('value', (data) => {
    console.log(data.val().time)
    var countDownDate = data.val().time
    // Update the count down every 1 second
    if (countDownDate) {
        $('#timer').show()
        $('#time-btn').hide()
        $('.vote-btn-main').show()


        var x = setInterval(function () {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            document.getElementById("demo").innerHTML = days + "d " + hours + "h "
                + minutes + "m " + seconds + "s ";

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                firebase.database().ref('election/').set({null:null})
                document.getElementById("demo").innerHTML = "Election Ended";
                $('.vote-btn-main').hide()
            }

        }, 1000);
    }

})

$('#sign-in-btn').click(function (event) {
    var email = $('[name="email"]').val()
    var password = $('[name="password"]').val()

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            $('#s').hide()

            $('#signin-box').hide()
            $('#candidates-box').show()
            $('#l').show()
            $('#tab').show()
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    $('[name="email"]').val('')
    $('[name="password"]').val('')
});

$('#sign-up-btn').click(function (event) {
    var email = $('[name="remail"]').val()
    var password = $('[name="rpassword"]').val()
    var password1 = $('[name="rpassword1"]').val()
    if (password == password1) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                $('#s').hide()


                $('#signin-box').hide()
                $('#candidates-box').show()
                $('#l').show()
                $('#tab').show()
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
    } else {
        $("#message").append("your password are not the same<br>");
    }

})
$('#Chancellor').empty();
$('#vice-chancellor').empty();
$('#deputy-vice-chancellor').empty();
String.prototype.trimToLength = function(m) {
    return (this.length > m) 
      ? jQuery.trim(this).substring(0, m).split(" ").slice(0, -1).join(" ") 
      : this;
  };
firebase.database().ref('candidates/Chancellor').on('value', (data) => {
    data.forEach((snapsot) => {
        var key = snapsot.key
        var candidate = snapsot.val()
        var user = firebase.auth().currentUser;

        firebase.database().ref('votes/' + candidate.Position + '/' + candidate.name + ' ' + key).on('value', (snapData) => {
            var noofvotes = snapData.numChildren()
            $('tbody').prepend(`
                <tr>
                    <th scope="row">-</th>
                    <td><img src="${candidate.profile_picture}" style="height:50px"></td>
                    <td>${candidate.name}</td>
                    <td>${candidate.age}</td>
                    <td>${candidate.gender}</td>
                    <td>${candidate.nationality}</td>
                    <td>${candidate.state}</td>
                    <td>${candidate.lga}</td>
                    <td>${candidate.Position}</td>
                    <td id="noofvotes">${noofvotes}</td>
                </tr>`);
        })


    })
})
firebase.database().ref('candidates/Vice Chancellor').on('value', (data) => {
    data.forEach((snapsot) => {
        var key = snapsot.key
        var candidate = snapsot.val()
        var user = firebase.auth().currentUser;
        firebase.database().ref('votes/' + candidate.Position + '/' + candidate.name + ' ' + key).on('value', (snapData) => {
            var noofvotes = snapData.numChildren()
            $('tbody').prepend(`
                <tr>
                    <th scope="row">-</th>
                    <td><img src="${candidate.profile_picture}" style="height:50px"></td>
                    <td>${candidate.name}</td>
                    <td>${candidate.age}</td>
                    <td>${candidate.gender}</td>
                    <td>${candidate.nationality}</td>
                    <td>${candidate.state}</td>
                    <td>${candidate.lga}</td>
                    <td>${candidate.Position}</td>
                    <td id="noofvotes">${noofvotes}</td>
                </tr>`);
        })
    });
});
firebase.database().ref('candidates/Deputy Vice Chancellor').on('value', (data) => {
    data.forEach((snapsot) => {
        var key = snapsot.key
        var candidate = snapsot.val()
        var user = firebase.auth().currentUser;
        firebase.database().ref('votes/' + candidate.Position + '/' + candidate.name + ' ' + key).on('value', (snapData) => {
            var noofvotes = snapData.numChildren()
            $('tbody').prepend(`
                <tr>
                    <th scope="row">-</th>
                    <td><img src="${candidate.profile_picture}" style="height:50px"></td>
                    <td>${candidate.name}</td>
                    <td>${candidate.age}</td>
                    <td>${candidate.gender}</td>
                    <td>${candidate.nationality}</td>
                    <td>${candidate.state}</td>
                    <td>${candidate.lga}</td>
                    <td>${candidate.Position}</td>
                    <td id="noofvotes">${noofvotes}</td>
                </tr>`);
        })
    })
})

var cvoted = false
var vcvoted = false
var dvcvoted = false
setInterval(() => {
    cvoted = false
    vcvoted = false
    dvcvoted = false
    
$('#Chancellor').empty()
$('#vice-chancellor').empty()
$('#deputy-vice-chancellor').empty()
firebase.database().ref('candidates/Chancellor/').on('value', (data) => {
    data.forEach((snapsot) => {
        var key = snapsot.key
        var candidate = snapsot.val()
        var user = firebase.auth().currentUser;

        firebase.database().ref('voter/' + user.uid + '/' + candidate.Position).on('value', function (snapshot) {

            if (snapshot.val().candidate_id) {
                cvoted = true
            } else {
                cvoted = false
            }
        });
        $('#Chancellor').append(`
                        <div class="col-md-4 col mb-2 ">
                            <div class="card " style="width: 18rem;">
                                <img class="card-img-top" src="${candidate.profile_picture}" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${candidate.name} - ${candidate.Position}</h5>
                                    <p class="card-text" >
                                        age: ${candidate.age}; gender: ${candidate.gender}; nationality : ${candidate.nationality}; state :         <td>${candidate.state}</td>; lga: ${candidate.lga};
                                    </p>
                                 <a href="#" onclick="votechancellor('${key}')" class="vote-btn-chancellor btn btn-success vote-btn-main ${cvoted&&'disabled'}" > Vote</a>
                                </div>
                            </div>
                        </div>
                    `);

    });
})
firebase.database().ref('candidates/Vice Chancellor/').on('value', (data) => {
    data.forEach((snapsot) => {
        var key = snapsot.key
        var candidate = snapsot.val()
        var user = firebase.auth().currentUser;
        firebase.database().ref('voter/' + user.uid + '/' + candidate.Position).on('value', function (snapshot) {
            console.log(snapshot.val().candidate_id)
            if (snapshot.val().candidate_id) {
                vcvoted = true
            } else {
                vcvoted = false
            }
        });
        $('#vice-chancellor').append(`
                            <div class="col-md-4 col mb-2 ">
                                <div class="card " style="width: 18rem;">
                                    <img class="card-img-top" src="${candidate.profile_picture}" alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">${candidate.name} - ${candidate.Position}</h5>
                                        <p class="card-text">
                                            age: ${candidate.age}; gender: ${candidate.gender}; nationality : ${candidate.nationality}; state :         <td>${candidate.state}</td>; lga: ${candidate.lga};
                                        </p>
        
                                        <a href="#" onclick="votevicechancellor('${key}')" class=" vote-btn-vicechancellor btn btn-success vote-btn-main ${vcvoted&&'disabled'}" > Vote</a>
                                    </div>
                                </div>
                            </div>
                        `)
    });
})
firebase.database().ref('candidates/Deputy Vice Chancellor/').on('value', (data) => {
    data.forEach((snapsot) => {
        var key = snapsot.key
        var candidate = snapsot.val()
        var user = firebase.auth().currentUser;

        firebase.database().ref('voter/' + user.uid + '/' + candidate.Position).on('value', function (snapshot) {
            if (snapshot.val().candidate_id) {
                dvcvoted = true
            } else {
                dvcvoted = false
            }
        });

        $('#deputy-vice-chancellor').append(`
                                <div class="col-md-4 col mb-2 ">
                                    <div class="card " style="width: 18rem;">
                                        <img class="card-img-top" src="${candidate.profile_picture}" alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">${candidate.name} - ${candidate.Position}</h5>
                                            <p class="card-text">
                                                age: ${candidate.age}; gender: ${candidate.gender}; nationality : ${candidate.nationality}; state :         <td>${candidate.state}</td>; lga: ${candidate.lga};
                                            </p>
            
                                            <a href="#" onclick="votedeputyvicechancellor('${key}')"  class=" vote-btn-deputyvicechancellor btn btn-success vote-btn-main ${dvcvoted&&'disabled'}" > Vote</a>
                                        </div>
                                    </div>
                                </div>
                            `)
    });
})

}, 2000);


$('#submitRegistere').click(function (event) {
    event.preventDefault()
    var link = $('[name="link"]').val()
    var name = $('[name="name"]').val()
    var age = $('[name="age"]').val()
    var gender = $('[name="gender"]').val()
    var nationality = $('[name="nationality"]').val()
    var state = $('[name="state"]').val()
    var lga = $('[name="lga"]').val()
    var Position = $('[name="Position"]').val()


    firebase.database().ref('candidates/' + Position).push({
        profile_picture: link,
        name: name,
        age: age,
        gender: gender,
        nationality: nationality,
        state: state,
        lga: lga,
        Position: Position,
    });
    $('[name="link"]').val('')
    $('[name="name"]').val('')
    $('[name="age"]').val('')
    $('[name="gender"]').val('')
    $('[name="nationality"]').val('')
    $('[name="state"]').val('')
    $('[name="lga"]').val('')
    $('[name="Position"]').val('')
    $('#registermessage').append('Registration Success');
})


function votechancellor(id) {
    firebase.database().ref('candidates/Chancellor/' + id).on('value', function (snapshot) {
        var candidate = snapshot.val();
        var candidate_id = snapshot.key;
        var user = firebase.auth().currentUser;
        firebase.database().ref('voter/' + user.uid + '/' + candidate.Position).set({
            candidate: candidate,
            candidate_id: candidate_id
        })
        $(`.vote-btn-chancellor`).addClass('disabled');


        firebase.database().ref('votes/' + candidate.Position + '/' + candidate.name + ' ' + candidate_id + '/' + user.uid).set({
            voter: user.email,
        })
    });
};

function votevicechancellor(id) {
    firebase.database().ref('candidates/Vice Chancellor/' + id).on('value', function (snapshot) {
        var candidate = snapshot.val();
        var candidate_id = snapshot.key;
        var user = firebase.auth().currentUser;
        firebase.database().ref('voter/' + user.uid + '/' + candidate.Position).set({
            candidate: candidate,
            candidate_id: candidate_id
        })
        $(`.vote-btn-vicechancellor`).addClass('disabled');


        firebase.database().ref('votes/' + candidate.Position + '/' + candidate.name + ' ' + candidate_id + '/' + user.uid).set({
            voter: user.email,
        })
    });
};


function votedeputyvicechancellor(id) {
    firebase.database().ref('candidates/Deputy Vice Chancellor/' + id).on('value', function (snapshot) {
        var candidate = snapshot.val();
        var candidate_id = snapshot.key;
        var user = firebase.auth().currentUser;
        firebase.database().ref('voter/' + user.uid + '/' + candidate.Position).set({
            candidate: candidate,
            candidate_id: candidate_id
        })

        $(`.vote-btn-deputyvicechancellor`).addClass('disabled');

        firebase.database().ref('votes/' + candidate.Position + '/' + candidate.name + ' ' + candidate_id + '/' + user.uid).set({
            voter: user.email,
        })
    });
};


$('#c').click(function (e) {
    e.preventDefault();
    $('#time-box').hide();
    document.getElementById('c').style.fontWeight = "bold"
    document.getElementById('c').style.color = 'green'
    document.getElementById('s').style.color = 'black'
    document.getElementById('d').style.color = 'black'
    document.getElementById('f').style.color = 'black'
    $('#candidates-box').show()
    $('#form-box').hide()
    $('#signin-box').hide()
    $('#dashboard-box').hide()
});

$('#f').click(function (e) {
    e.preventDefault();
    $('#time-box').hide();
    document.getElementById('f').style.fontWeight = "bold"
    document.getElementById('f').style.color = 'green'
    document.getElementById('s').style.color = 'black'
    document.getElementById('d').style.color = 'black'
    document.getElementById('c').style.color = 'black'
    $('#form-box').show()
    $('#dashboard-box').hide()
    $('#signin-box').hide()
    $('#candidates-box').hide()
});

$('#d').click(function (e) {
    e.preventDefault();
    $('#time-box').hide();
    document.getElementById('d').style.fontWeight = "bold"
    document.getElementById('d').style.color = 'green'
    document.getElementById('s').style.color = 'black'
    document.getElementById('f').style.color = 'black'
    document.getElementById('c').style.color = 'black'
    $('#dashboard-box').show()
    $('#form-box').hide()
    $('#candidates-box').hide()
    $('#signin-box').hide()
});

$('#time-btn').click(function (e) {
    e.preventDefault();
    $('#dashboard-box').hide()
    $('#signin-box').hide()
    $('#time-box').show()
    $('#form-box').hide()
    $('#candidates-box').hide()
});

$('#s').click(function (e) {
    e.preventDefault();
    $('#time-box').hide();
    document.getElementById('s').style.fontWeight = "bold"
    document.getElementById('s').style.color = 'green'
    document.getElementById('d').style.color = 'black'
    document.getElementById('f').style.color = 'black'
    document.getElementById('c').style.color = 'black'
    $('#dashboard-box').hide()
    $('#signin-box').show()
    $('#form-box').hide()
    $('#candidates-box').hide()
});
$('#signup-box-btn').click(function (e) {
    e.preventDefault();
    $('#time-box').hide();
    document.getElementById('signup-box-btn').style.fontWeight = "bold"
    document.getElementById('signup-box-btn').style.color = 'green'
    document.getElementById('signin-box-btn').style.fontSize = '0.8em'
    document.getElementById('signin-box-btn').style.color = 'black'
    $('#signup-box-box').show()
    $('#signin-box-box').hide()
});

$('#signin-box-btn').click(function (e) {
    e.preventDefault();
    document.getElementById('signin-box-btn').style.fontWeight = "bold"
    document.getElementById('signin-box-btn').style.color = 'green'
    document.getElementById('signup-box-btn').style.fontSize = '0.8em'
    document.getElementById('signup-box-btn').style.color = 'black'
    $('#signup-box-box').hide()
    $('#signin-box-box').show()
});