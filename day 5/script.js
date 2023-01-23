

$('#form-box').hide()
$('#admin-tabs').hide()
$('#dashboard-box').hide()
$('#signin-box').show()
$('#candidates-box').hide()

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


$('#sign-in-btn').click(function (event) {
    var email = $('[name="email"]').val()
    var password = $('[name="password"]').val()

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            $('#s').hide()

            $('#admin-tabs').show()

            $('#signin-box').hide()
            $('#candidates-box').show()
            $('#l').show()
            $('#tab').show()
            var user = userCredential.user;
            console.log(user)
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
    console.log(password + password1)
    if (password == password1) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                $('#s').hide()

                $('#admin-tabs').show()

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

firebase.database().ref('candidates/').on('value', (data) => {
    data.forEach((snapsot) => {
        var key = snapsot.key
        var candidate = snapsot.val()
        var user = firebase.auth().currentUser;
            firebase.database().ref('votes/' + candidate.Position + '/' + candidate.name + ' ' + key).on('value', (datas) => {
                var nvote = Object.keys(datas.val()).length
                datas.forEach((snapshot) => {
                });
            $('tbody').prepend(`
                        <th scope="row">1</th>
                        <td><img src="${candidate.profile_picture}" style="height:50px"></td>
                        <td>${candidate.name}</td>
                        <td>${candidate.age}</td>
                        <td>${candidate.gender}</td>
                        <td>${candidate.nationality}</td>
                        <td>${candidate.state}</td>
                        <td>${candidate.lga}</td>
                        <td>${candidate.Position}</td>
                        <td id="noofvotes">${nvote}</td>
                    </tr>`);
            $('#candidates-box').append(`
                    <div class="col-md-4 col mb-2 ">
                        <div class="card " style="width: 18rem;">
                            <img class="card-img-top" src="${candidate.profile_picture}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${candidate.name} - ${candidate.Position}</h5>
                                <p class="card-text">
                                    age: ${candidate.age}; gender: ${candidate.gender}; nationality : ${candidate.nationality}; state :         <td>${candidate.state}</td>; lga: ${candidate.lga};
                                </p>

                                <a href="#" onclick="vote('${key}')" class="btn btn-success"> Vote</a>
                            </div>
                        </div>
                    </div>
                `)
        });
    })
});

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


    firebase.database().ref('candidates/').push({
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

function vote(id) {
    firebase.database().ref('candidates/' + id).once('value').then((snapshot) => {
        var candidate = snapshot.val();
        var candidate_id = snapshot.key;
        var user = firebase.auth().currentUser;
        firebase.database().ref('votes/' + candidate.Position + '/' + candidate.name + ' ' + candidate_id + '/' + user.uid).set({
            voter: user.email,
        })
    });
};
$('#c').click(function (e) {
    e.preventDefault();
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

$('#s').click(function (e) {
    e.preventDefault();
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