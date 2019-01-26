
function loadPage() {

  if (isLogged(true)) {
    replaceString("nameOfuser", sessionStorage.getItem("logado"));
    loggedShowPage();
  }

}
loadPage();

//if(sessionStorage.getItem("firstName") !== null) getUserSession();
document.getElementById("nameOfuser").addEventListener("click", () => {

  if (sessionStorage.getItem("firstName") !== null) getUserSession();

});

function toCheckLogin(idUsername, idPassword) {
  let userEl = document.getElementById(idUsername).value;
  let passwordEl = document.getElementById(idPassword).value;
  let messageError = document.getElementsByClassName("messageError")[0];

  let Users = {
    user1: { username: 'admin', password: '12345678' },
    user2: { username: sessionStorage.getItem("email"), password: sessionStorage.getItem("pass") }
  }

  for (let user in Users) {
    let userBd = Users[user].username;
    let passBd = Users[user].password;

    if (userBd === userEl && passwordEl === passBd) {
      messageError.style.display = "none";
      userEl = (sessionStorage.getItem("firstName") !== null) ? sessionStorage.getItem("firstName") : userEl;
      createSession("logado", userEl);
      let nome = ((sessionStorage.getItem("firstName") !== null) && (sessionStorage.getItem("logado") !== null)) ? (sessionStorage.getItem("firstName")) : (sessionStorage.getItem("logado"));
      replaceString("nameOfuser", nome);
      loggedShowPage();
      return true;
    }
  }

  messageError.style.display = "block";

}

function createSession(key, value) {
  return sessionStorage.setItem(key, value);

}

function loggedShowPage() {
  document.getElementsByTagName("aside")[0].style.display = "none";
  document.getElementById("createAccountMenu").style.display = "none";
  document.getElementById("nameOfuser").classList.remove("hidden");
  document.getElementById("logout").classList.remove("hidden");
}
function toExitloggedPage() {
  document.getElementsByTagName("aside")[0].style.display = "";
  document.getElementById("createAccountMenu").style.display = "";
  document.getElementById("nameOfuser").classList.add("hidden");
  document.getElementById("logout").classList.add("hidden");
  location.reload();
  //reload da página ao fazer o logout
}

function replaceString(elId, newText) {
  let el = document.getElementById("nameOfuser");
  el.innerHTML = "<a>Olá " + newText + "</a>";

}

/* to check if has login*/
function isLogged(loadPage = false) {
  let logado = sessionStorage.getItem("logado");
  if (logado === null) {
    if (!loadPage) alert("You need to login first");
    return false;
  }
  return true;
}

let logout = document.getElementById("logout");
logout.addEventListener("click", function () { toExit(); });
function toExit() {
  sessionStorage.clear();
  toExitloggedPage();
}

/* Function to show and hide pages */
function displayFlow(flow, boxFront = false) {
  let displayShow = document.getElementById(flow);
  let pageHidden = document.getElementsByClassName("page-hidden");
  let mainContainer = document.getElementsByClassName("main-container")[0];
  let boxesHome = mainContainer.getElementsByClassName("page-hidden");

  if (boxFront) {
    var okLogin = isLogged();
    if (okLogin) pageHidden = boxesHome;
    else return false;
  }

  for (var i = 0; i < pageHidden.length; i++) {
    pageHidden[i].removeAttribute("style");
  }
  displayShow.style.display = "block";
}

/* funcao para resumo da encomenda */
function getValues() {
  $("#pizzaType").html($(".pizzaTypeChoise:checked").val());

  $("#pizzaQuantity").html($("#quantity").val());

  $("#toppings").text('');
  var totalToppings = 0;
  $(".toppings:checked").each(function () {
    $("#toppings").append($(this).val() + "<br>");
    totalToppings++;
  });

  if (totalToppings >= 4)
    price = '1.40';
  else
    price = '1.75';

  $("#toppingsPrice").html(price + " € ");

  if (document.getElementById("small").checked) {
    individualPrice = 5;
  }
  if (document.getElementById("medium").checked) {
    individualPrice = 8;
  }
  if (document.getElementById("large").checked) {
    individualPrice = 10;
  }
  individualPrice += (totalToppings * price);

  $("#pizzaPrice").html(individualPrice + " € ");

  var qtd = $("#quantity").val();
  var finalPrice = (individualPrice * qtd);

  $("#total").html(finalPrice + " € ");
}


function toggleFatura() {
  $(".fatura-data").toggle();
}

function goBack() {
  window.history.back();
}


/* Create account in session storage */
document.getElementById("btnCreateAccount").addEventListener("click", () => {
  let formCreate = document.getElementById("frm");
  if (validaForm(frm)){
    if (userManagement()) {
      alert("Account created!");
     
      let name = frm.firstName.value;
      createSession("logado", name);
      replaceString("nameOfuser", name);
      loggedShowPage();
    }
    displayFlow("home");
    document.getElementById("page1").style.display = 'block';
  }
});

/* fill in the fields with the user data */
document.getElementById("fatura").addEventListener("click", () => {
  if (sessionStorage.getItem("firstName") !== null) {
    let nameClient = sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName");
    document.getElementById("nameFat").value = nameClient;
    document.getElementById("addressFat").value = sessionStorage.getItem("address");
    document.getElementById("nifFat").value = sessionStorage.getItem("nif");
  }
});

function userManagement(edit = null) {
  let classEdit = (edit === null) ? ("") : ("Edit");

  let user = {
    firstName: document.getElementById("firstName" + classEdit).value,
    lastName: document.getElementById("lastName" + classEdit).value,
    email: document.getElementById("email" + classEdit).value,
    pass: document.getElementById("pass" + classEdit).value,
    phone: document.getElementById("phone" + classEdit).value,
    country: document.getElementById("country" + classEdit).value,
    nif: document.getElementById("nif" + classEdit).value,
    address: document.getElementById("address" + classEdit).value
  }
  for (var value in user) {
    createSession(value, user[value]);
  }
  return true;
}

function getUserSession() {

  let user = {
    firstName: sessionStorage.getItem("firstName"),
    lastName: sessionStorage.getItem("lastName"),
    email: sessionStorage.getItem("email"),
    pass: sessionStorage.getItem("pass"),
    phone: sessionStorage.getItem("phone"),
    country: sessionStorage.getItem("country"),
    nif: sessionStorage.getItem("nif"),
    address: sessionStorage.getItem("address")
  }

  function userFields(user) {
    if (user === "" || user === null)
      return false;

    for (let key in user) {
      document.getElementById(key + "Edit").value = user[key];

    }
    userManagement(true);
  }
  return userFields(user);

}

function signInForm(iduser, idpass) {
  var test = toCheckLogin(iduser, idpass);
  let text = "There was a problem: your email or password are incorrect";

  if (test)
    location.reload();

  else
    document.getElementById("invalidSign").innerHTML = text;
  invalidSign.style.display = "block";
}

function valthisform() {
  if (!$('input[name=checkbox]:checked').length > 0) {
    alert("Selecione pelo menos um ingrediente!");
    return false;
  }
  else if ($('input[name=checkbox]:checked').length > 5) {
    alert("Selecione no máximo 5 ingredientes!");
    return false;
  }
  else
    return true;
}

/*validação formulario
/constante (regex) para validar letras apenas*/

const letters = /^[A-Za-z]+$/;
//constante para validar o email
const emailRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const passRegex = /^(?=.*[0-9])(?=.*[.!$%#])(?=.*[a-z])[a-zA-Z0-9.!$%#]{8,}$/;
const phoneRegex = /^[0-9]*$/;

function checkPassword() {
  let passField = document.getElementById("pass");
  let textPass = passField.value;
  let regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$!%#.?])[A-Za-z\\d$.!%#]{8,}$");

  if (regex.test(textPass))
    return true;

  else
    return false;
}

function validaForm(frm) {

  let valFunctions = new Array();
  valFunctions['firstName'] = valName();
  valFunctions['lastName'] = valLastName();
  valFunctions['email'] = valEmail();
  valFunctions['pass'] = valPass();
  valFunctions['repass'] = valRePass();
  valFunctions['phone'] = valPhone();
  valFunctions['nif'] = valNif();
  valFunctions['address'] = valAddress();


  var message = "";

  for (let i = 0; i < Object.keys(valFunctions).length; i++) {
    if (valFunctions[Object.keys(valFunctions)[i]] === false)//testar o valor se é verdadeiro ou falso
    { 
      let key = Object.keys(valFunctions)[i];//apenas a chave

      let field = document.getElementById(key);
      field.className += " fielderror";
      field.autofocus;
      message += messages[i] + "<br>";
      invalidCreate.style.display = "block";
    $("#invalidCreate").html(message);
      return false;
    }
  }
  
  invalidCreate.style.display = "none";
  return true;
}
var messages = [];

function valName() {
  if (frm.firstName.value.lenght < 2 || (!frm.firstName.value.match(letters))) {
    messages[0] = "Invalid name";
    return false;
  }
  else
    return true;
}

function valLastName() {
  if (frm.lastName.value == "" || frm.lastName.value == null || frm.lastName.value.lenght < 3
    || (!frm.lastName.value.match(letters))) {
    messages[1] = "Invalid last name";
    return false;
  }
  else
    return true;
}

function valEmail() {
  if (!frm.email.value.match(emailRegex)) {
    messages[2] = "Invalid email";
    return false;
  }
  else
    return true;
}
function valPass() {
  if (!checkPassword()) {
    messages[3] = "Password must contain: (8 characters min) (<= 1 lowercase, 1 digit, 1 special character)";
    return false;
  }
  else return true;
}

function valRePass() {
  if (document.getElementById("pass").value !== document.getElementById("repass").value ||
    frm.repass.value == "" || frm.repass.value == null) {
    messages[4] = "Password must match in both fields";
    return false;
  }
  else
    return true;
}

function valPhone() {
  if (frm.phone.value == "" || frm.phone.value == null || frm.phone.value.lenght < 3
    || (!frm.phone.value.match(phoneRegex))) {
    messages[5] = "Invalid phone number";
    return false;
  }
  else
    return true;
}

function valNif() {
  let nif = document.getElementById("nif").value;
  if (nif.length == 9) {
    added = ((nif[7] * 2) + (nif[6] * 3) + (nif[5] * 4) + (nif[4] * 5) + (nif[3] * 6) + (nif[2] * 7) + (nif[1] * 8) + (nif[0] * 9));
    mod = added % 11;
    if (mod == 0 || mod == 1) {
      control = 0;
    } else {
      control = 11 - mod;
    }

    if (nif[8] == control) {
      return true;
    } else {
      messages[6] = "Insert valid vat number";
      return false;
    }
  } else {
    messages[6] = "Insert valid vat number";
    return false;
  }
}
function valAddress() {
  if (frm.address.value.lenght == 0 || frm.address.value == "" || frm.address.value == null) {
    messages[7] = "Insert valid address";
    return false;
  }
  else
    return true;
}

/* Edit account in session storage */
document.getElementById("btnEditAccount").addEventListener("click", () => {
  let frmEdit = document.getElementById("frmEdit");

    if (userManagement()) {
      alert("Account edited!");
   
     sessionStorage.clear();
      let name = (sessionStorage.getItem("firstNameEdit") !== null) ? sessionStorage.getItem("firstNameEdit") :frmEdit.firstNameEdit.value;
      createSession("logado", name);
      replaceString("nameOfuser", name);
      loggedShowPage();
    }
    displayFlow("home");
    document.getElementById("page1").style.display = 'block';

});


