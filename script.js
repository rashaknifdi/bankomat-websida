//lista med användare 
const users = [
  { name: "Rasha Knifdi", username: "rasha", pin: "1989", balance: 1000 },
  { name: "Hans-Göran Palmqvist", username: "hans-göran", pin: "1234", balance: 1000 }
];
// variabel för användaren som är inloggad
let currentUser = null;

// Funktion för inloggning
function login() {
   // Hämta inloggningsinfo (användarenamn och pinkod)
  const usernameInput = document.getElementById('username').value;
  const pinInput = document.getElementById('pin').value;

  // Kontrol för användarinformation
  for (let user of users) {
    if (user.username === usernameInput && user.pin === pinInput) {
      currentUser = user; //  Spara inloggad användare
      showMessage(`Välkommen ${user.name}`);// visa meddelande välkommen 
      updateUserDisplay(); //Uppdatera information
      return;
    }
  }

  showMessage("Fel användarnamn eller pinkod!"); //visa felinloggning meddelande
}

// Funktion för att logga ut använadre
function logout() {
  currentUser = null;
  showMessage("Du är utloggad.");
  document.getElementById("user-info").textContent = "";
  document.getElementById('username').value="";
  document.getElementById('pin').value="";

}

// Funktion för att visa saldo
function showBalance() {
  if (!checkLogin()) return;
  showMessage(`Saldo: ${currentUser.balance} kr`);
}


// Funktion för insättning av pengar
function deposit() {
  if (!checkLogin()) return; //Om användaren inte är inloggad avsluta  utan att fortsätta köra resten av koden.
  let amount = getAmount();
  if (amount <= 0) return; //Om bellop mindre än 0 avsluta utan att fortsätta köra resten av koden

  currentUser.balance += amount;
  showMessage(`Insättning lyckades. Nytt saldo: ${currentUser.balance} kr`);
  clearInput();// rensa inputfält
}

 // Funktion för uttag av pengar
function withdraw() {
  if (!checkLogin()) return;
  let amount = getAmount();
  if (amount <= 0) return;

  if (amount > currentUser.balance) {
    showMessage("Otillräckligt saldo.");
    return;
  }

  currentUser.balance -= amount;
  showMessage(`Uttag lyckades. Nytt saldo: ${currentUser.balance} kr`);
  clearInput();
}

// Funktion för att hämta belopp från inputfält
function getAmount() {
  const input = document.getElementById('amount').value;
  let amount = Math.floor(parseFloat(input));
  if (isNaN(amount) || amount < 0) {
    showMessage("Felaktig inmatning!");
    return 0;
  }
  return amount;
}

// Kontrollera om användaren är inloggad
function checkLogin() {
  if (!currentUser) {
    showMessage("Du måste logga in först!");
    return false;
  }
  return true;
}

// Funktion för att visa meddelanden
function showMessage(msg) {
  document.getElementById("message").textContent = msg; // Uppdatera meddelandefält
}

// Funktion för att visa vilken användare som är inloggad
function updateUserDisplay() {
  document.getElementById("user-info").textContent = `Inloggad: ${currentUser.name}`;
}

// Funktion för att rensa beloppsfältet
function clearInput() {
  document.getElementById("amount").value = "";
}

// Funktion för att lägga till siffror i beloppsfältet

function appendNumber(num) {
  const input = document.getElementById("amount");
  input.value += num;
}


