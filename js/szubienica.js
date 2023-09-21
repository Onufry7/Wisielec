//Dzwięki gry
var tak = new Audio("sound/yes.wav");
var nie = new Audio("sound/no.wav");
var poczatek = new Audio("sound/start.wav");
var koniec = new Audio("sound/end.wav");
var dzwiek = false; 
//Startowe wartości zmiennych
var jezykGry = "PL";
var liczbaSkuch = 0; 
//Ustawienie hasła
var nrHasla = Math.ceil(Math.random()*hasla.length-1); //Losowanie hasła
var hasloPL = hasla[nrHasla]['PL'].toUpperCase();
var hasloEN = hasla[nrHasla]['EN'].toUpperCase();
var kategoria = ""; //Kategoria hasła
var haslo = ""; //Hasło
var haslo1 = ""; // Wykreskowane hasło
var alfabet = Array();



function generujHaslo()
{
	//Pobiera hasła
	if(jezykGry == "PL") 
	{
		haslo = hasloPL;
		kategoria = hasla[nrHasla]['K1'];
	}
	else if(jezykGry == "EN") 
	{
		haslo = hasloEN
		kategoria = hasla[nrHasla]['K2'];
	}
	
	//Wykreskowanie hasła
	for(i=0; i<haslo.length; i++)
	{
		if(haslo.charAt(i) == " ") haslo1 = haslo1 + " ";
		else if(haslo.charAt(i) == ",") haslo1 = haslo1 + ",";
		else if(haslo.charAt(i) == ".") haslo1 = haslo1 + ".";
		else haslo1 = haslo1 + "_";
	}	

	//Odkreskowanie hasla
	String.prototype.ustawZnak = function(miejsce, znak)
	{
		if(miejsce > this.length-1) return this.toString();
		else return this.substr(0, miejsce) + znak + this.substr(miejsce+1);
	}
}



//Dzwięki gry
function dzwieki()
{
	if(dzwiek == false) 
	{
		dzwiek = true;
		document.getElementById("dzwiek").innerHTML = "&#128266;";
	}
	else
	{
		dzwiek = false;
		document.getElementById("dzwiek").innerHTML = "&#128263;";
	}		
}



//Wypisanie hasla1 i kategorii
function wypiszHaslo()
{
	document.getElementById("kategoria").innerHTML = kategoria;
	document.getElementById("haslo").innerHTML = haslo1;
}



//Sprawdza litery w chaśle
function sprawdz(nr)
{
	var trafiona = false;
	var nrId = "lit" + nr;
	
	//Sprawdza czy trafiliśmy
	for(i=0; i<haslo.length; i++)
	{
		if(haslo.charAt(i) == alfabet[nr])
		{
			haslo1 = haslo1.ustawZnak(i, alfabet[nr]);
			trafiona = true;
		}
	}
	
	//Obsługa trafienia i błedu
	if(trafiona == true)
	{
		document.getElementById(nrId).classList.add("poprawna");
		if(dzwiek == true) tak.play();
		wypiszHaslo();
	}
	else
	{
		liczbaSkuch++; //Skuchy
		var obraz = "img/s"+liczbaSkuch+".png";
		document.getElementById(nrId).classList.add("bledna");
		if(dzwiek == true) nie.play();
		document.getElementById("obrazek").src = obraz;
		document.getElementById("szanse").innerHTML = 9-liczbaSkuch;
	}
	
	//Usunięcie onclicka z wykorzystanego przycisku
	document.getElementById(nrId).removeAttribute("onclick");
	
	//Wygrana
	if(haslo == haslo1) koniecGry(1,poczatek);

	//Przegrana
	if(liczbaSkuch >= 9) koniecGry(0,koniec);
}



function wyswietlAlfabet()
{
	if(jezykGry == "PL") alfabet = alfabetPL;
	else if(jezykGry == "EN") alfabet = alfabetEN;
	var trescDiva = "";
	
	//Generowanie alfabetu
	for(i=0; i<alfabet.length; i++)
	{
		var element = "lit" + i;
		trescDiva = trescDiva + '<div class="litera" id="' + element + '" onclick = "sprawdz(' + i + ')">' + alfabet[i] + '</div>';
	}
	//Wyświetlenie alfabetu
	document.getElementById("alfabet").innerHTML = trescDiva;
}



function koniecGry(wynik, melodia)
{
	
	//Przygotowuje i wyświetla komunikat na koniec gry
	var jeszczeRaz = (jezykGry == "EN") ? "TRY AGAIN ?" : "JESZCZE RAZ ?";
	var dobreHaslo = (jezykGry == "EN") ? "The correct password:" : "Prawidłowe hasło:";
	
	switch(wynik)
	{
		case 1: wynik = (jezykGry == "EN") ? "You Win!" : "Wygrywasz!"; break;
		case 0: wynik = (jezykGry == "EN") ? "You Lose!" : "Przegrywasz!"; break;
	}

	var hasla = '<p id="pl-haslo">'+hasloPL+'</p><p id="en-haslo">'+hasloEN+'</p>';
	var odNowa = '<span class="reset" id="nowa">'+jeszczeRaz+'</span>';
	
	document.getElementById("alfabet").className = "koniecGry";
	document.getElementById("alfabet").innerHTML ="<p>"+wynik+"<br>"+dobreHaslo+"</p>"+hasla+odNowa;
	
	//Dodaje obsługe kliknięcia przycisku "jeszcze raz"
	document.getElementById("nowa").addEventListener("click", function(){location.reload();}); 
	
	//Odtwarza dzwięk dla końca gry
	if(dzwiek == true) melodia.play(); 
	
	//Ukkrycie przycisku "nowa gra"
	document.getElementById("reset").style.visibility = "hidden";
}



function przygotujPlansze()
{
	//Załadowanie grafiki
	document.getElementById("grafika").innerHTML = '<img src="img/s0.png" alt="" id="obrazek">';
	
	//Ustawia komunikaty menu
	var reset = (jezykGry == "EN") ? "NEW GAME" : "NOWA GRA";
	var szanse = (jezykGry == "EN") ? "Left over chances." : "Pozostałe szanse.";
	var info = (jezykGry == "EN") ? "Try to guess the password before the flower fades." : "Spróbuj odgadnąć hasło zanim kwiatek zwiędnie.";
	var dzwiek = (jezykGry == "EN") ? "Sounds game" : "Dzwięki gry.";
	
	//Ustawienie elementów menu gry
	document.getElementById("szanse").innerHTML = 9;
	document.getElementById("reset").innerHTML = reset;
	document.getElementById("tSzanse").setAttribute("data-tooltip", szanse);
	document.getElementById("tInfo").setAttribute("data-tooltip", info);
	document.getElementById("tDzwiek").setAttribute("data-tooltip", dzwiek);
	document.getElementById("info").style.visibility = "visible";
	document.getElementById("menu").style.visibility = "visible";
}



function rozpocznij()
{
	przygotujPlansze();
	generujHaslo();
	wypiszHaslo();
	wyswietlAlfabet();
}



function start()
{
	//Początkowe elementy gry - wybór języka 
	document.getElementById("kategoria").innerHTML = 'Wybierz język / Choose language<br>';
	document.getElementById("kategoria").innerHTML += '<img src="img/pl.png" alt="PL" id="PL" class="jezyk">';
	document.getElementById("kategoria").innerHTML += '<img src="img/en.png" alt="EN" id="EN" class="jezyk">';
	
	//Obsługa kliknięć przycisków: "nowa gra" i "dzwięki gry"
	document.getElementById("reset").addEventListener("click", function(){location.reload();});
	document.getElementById("dzwiek").addEventListener("click", dzwieki);
	
	//Zapisanie wybranego języka
	document.getElementById("EN").addEventListener("click", function() {jezykGry = 'EN';});
	document.getElementById("PL").addEventListener("click", function() {jezykGry = 'PL';});
	
	//Rozpoczęcie gry
	document.getElementById("EN").addEventListener("click", rozpocznij);
	document.getElementById("PL").addEventListener("click", rozpocznij);
}



//Uruchomienie skryptu przy starcie
window.onload = start;