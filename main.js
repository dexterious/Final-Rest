var resources=200;
var resourceGeneration=0;
var news="";
var progress=0;

//{amount:0 name:"Sample" baseCost:10 Unlock:0};
var Forage={
	name:"Forage",
	Unlock:0,
	button:'bForage',
	timer:'tForage',
	label:"lForage"
};
var uFire={
	amount:0,
	name:"Fire",
	baseCost:3,
	coolDown:1,
	Unlock:0,
	button:'bFire',
	label:'lFire',
	cost:'cFire',
	timer:'tFire'
};
var uShelter={
	amount:0,
	name:"Shelter",
	baseCost:10,
	coolDown:1,
	Unlock:0,
	button:'bShelter',
	label:'lShelter',
	cost:'cShelter',
	timer:'tShelter'
};
var uDwelling={
	amount:0,
	name:"Dwelling",
	baseCost:50,
	coolDown:1,
	Unlock:0,
	button:'bDwelling',
	label:'lDwelling',
	cost:'cDwelling',
	timer:'tDwelling'
};
var uStorehouse={
	amount:0,
	name:"Storehouse",
	baseCost:100,
	coolDown:1,
	Unlock:0,
	button:'bStorehouse',
	label:'lStorehouse',
	cost:'cStorehouse',
	timer:'tStorehouse'
};

upgradeWell={
	name:"Well",
	amount:0,
	baseCost:10,
	coolDown:30,
	unlock:0,
	button:"bWell",
	label:"lWell",
	cost:"cWell",
	timer:"tWell"

};

/*var upgradeGeneric={
	name:"",
	amount:0,
	baseCost:,
	coolDown:,
	unlock:,
	button:"bGeneric",
	label:"lGeneric",
	cost:"cGeneric",
	timer:"tGeneric"

}*/

var memories=[
	["It begins...","Poopbuttfarts"],
	["Ach1","Fava text"]
];

var units=[
	["Shelter",10,10,10,0]
]

function startFunction(){
	sendnews("It's dark, and raining...");
	window.setTimeout(function(){
		document.getElementById(Forage.button).style.display="block";
		document.getElementById('bWell').style.display="block";

		for(i=1;i<100;i++){
			var feels=document.createElement("div");
			feels.className="memory";
			feels.innerHTML=i +". ???";
			feels.id="memory" + i;
			document.getElementById("achievements").appendChild(feels);
		}
	}, 1000);
	
}

window.setInterval(function(){
	resources=resources-.1*uFire.amount+1*uShelter.amount+3*uDwelling.amount+10*uStorehouse.amount;
	document.getElementById("resources").innerHTML = "Resources: " + Math.round(resources);
	updateProgress();
}, 1000);

function updateProgress(){
	if(resources>10 && progress==0){
		document.getElementById(uFire.button).style.display="block";
		//sendnews("It's cold out here...");
		progress++;
	}
	if (uFire.amount>2 && progress==1){
		document.getElementById(uShelter.button).style.display="block";
		document.getElementById(upgradeWell.button).style.display="block";
		sendnews("A wanderer joins you at the fire");
		resources=resources+15;
		updateResources();
		sendAchievement(0);
		progress++;
	}
	if(uShelter.amount==1 && progress==2){
		document.getElementById(uShelter.button).style.display="block";
		sendnews("They look hungry...<br>A stranger comes, with her child");
		document.getElementById(Forage.label).innerHTML="Hunt";
		sendAchievement(1);
		progress++;
	}
	if(uShelter.amount>5 && progress==3){
		document.getElementById(uDwelling.button).style.display="block";
		sendnews("This place is as good as any...<br>They say there's a stream nearby<br>Some more wanderers arrive");
		progress++;
	}
	if(uDwelling.amount>1 && progress==4){
		document.getElementById(uStorehouse.button).style.display="block";
		sendnews("This place is as good as any...<br>They say there's a stream nearby<br>Some more wanderers arrive");
		progress++;
	}
	if(uStorehouse.amount>2 && progress==5){
		document.getElementById(uStorehouse.button).style.display="block";
		sendnews("This place is as good as any...<br>They say there's a stream nearby<br>Some more wanderers arrive");
		progress++;
	}

}

function buildingProgress(unit){

	if(unit.amount=5){sendachievement()}

}

function newUnit(unit){
	var unitPane=document.getElementById("unitPane");
	var unitButton=document.createElement("button");
	var chld=document.createElement("a");

	chld.newEventHandler("click", buyGeneric(unit));
	unitButton.appendChild(chld);

	chld=document.createElement("div");
	//chld.className="timer";
	chld.idName=unit.idt;
	unitButton.appendChild(chld);

	chld=document.createElement("div");
	//chld.className=



}

function updateResources(){
	document.getElementById("resources").innerHTML = "Resources: " + Math.round(resources);
	//maybe I can add in some gfx when I'm better at this
}

function cdButton(unit, seconds){
	document.getElementById(unit.button).style.color="lightgray";
	document.getElementById(unit.timer).style.transition=String(seconds)+"s";
	document.getElementById(unit.timer).style.width="100%";
	window.setTimeout(function(){enableButton(unit)}, 1000*seconds);
}

function enableButton(unit){
	document.getElementById(unit.button).style.color="black";
	document.getElementById(unit.timer).style.transition="none";
	document.getElementById(unit.timer).style.width="0%";
}

/*if I want to have different cost functions for each unit
I can add them. Or, if they're the same, just add a unit 
input to the function*/
function buyGeneric(uGeneric){
	if (document.getElementById(uGeneric.timer).style.width==""||document.getElementById(uGeneric.timer).style.width=="0%"){
		if(resources >= Math.floor(uGeneric.baseCost * Math.pow(1.1,uGeneric.amount))){
			uGeneric.amount++;//add unit
			resources = resources - Math.floor(uGeneric.baseCost * Math.pow(1.1,uGeneric.amount));
			updateResources();//remove resources
			cdButton(uGeneric,uGeneric.coolDown);//cool down button
			sendnews("You constructed a " + uGeneric.name)//give some feedback
		};
	};
    document.getElementById(uGeneric.cost).innerHTML=Math.floor(uGeneric.baseCost * Math.pow(1.1,uGeneric.amount));
	document.getElementById(uGeneric.label).innerHTML=uGeneric.amount;//update the number

}

/*I'll*/
function buyUpgrade(upgrade){
	if (document.getElementById(upgrade.timer).style.width==""||document.getElementById(upgrade.timer).style.width=="0%"){
		if(resources >= Math.floor(upgrade.baseCost * Math.pow(1.1,upgrade.amount))){
			upgrade.amount++;//add unit
			resources = resources - Math.floor(upgrade.baseCost * Math.pow(1.1,upgrade.amount));
			updateResources();//remove resources
			cdButton(upgrade,upgrade.coolDown);//cool down button
			sendnews("You constructed a " + upgrade.name)//give some feedback
		};
	};
    document.getElementById(uGeneric.cost).innerHTML=Math.floor(uGeneric.baseCost * Math.pow(1.1,uGeneric.amount));
	document.getElementById(uGeneric.label).innerHTML=uGeneric.amount;//update the number
}

function buttoncd(idb, idt, seconds){
	var b=document.getElementById(idb);
	var t=document.getElementById(idt);
	b.style.color="lightgray";
	t.style.transition=String(seconds)+"s";
	t.style.width="100%";
	window.setTimeout(function(){enablebutton(idb, idt)}, 1000*seconds);
};

function enablebutton(idb, idt){
	var b=document.getElementById(idb);
	var t=document.getElementById(idt);
	b.style.color="black";
	t.style.transition="none";
	t.style.width="0%";
};

function sendnews(news){
	
	document.getElementById("newsfeed").innerHTML = news+"<br>"+String(document.getElementById("newsfeed").innerHTML);
	
};

function sendAchievement(memoryNum){

	var ach = document.createElement("div");
	ach.className="notification";
	ach.innerHTML="<b>"+memories[memoryNum][0]+"</b><br><i>"+memories[memoryNum][1]+"</i>";

	document.getElementById("memory"+(memoryNum+1)).innerHTML=(memoryNum+1)+". <b>"+memories[memoryNum][0]+":</b> <i>"+memories[memoryNum][1]+"</i>";

	document.getElementById('notificationsWindow').appendChild(ach);
	var px=(ach.parentNode.childNodes.length)*100
	document.getElementById('notificationsWindow').style.height=px +"px";

	window.setTimeout(function(){
			ach.style.transition="2s";
			ach.style.opacity="0";
			window.setTimeout(function(){
				document.getElementById('notificationsWindow').style.height=(ach.parentNode.childNodes.length-1)*100 +"px";
				ach.parentNode.removeChild(ach);
			},2000)
	},5000)
}

function forage(){
	if (document.getElementById(Forage.button).style.color==""||document.getElementById(Forage.button).style.color=="black"){
		resources=resources+4;
		updateResources();
		cdButton(Forage,1);
		sendnews("You find some branches...");
	};
};

function changeMenu(menu){
	document.getElementById('map').style.left="-100%";
	document.getElementById('journal').style.left="-100%";
	document.getElementById('upgrades').style.left="-100%";
	document.getElementById('options').style.left="-100%";
	document.getElementById('achievements').style.left="-100%";
	document.getElementById(menu).style.left="-100%";
}

function showMap(){
	document.getElementById('map').style.left="0px";
	document.getElementById('journal').style.left="-100%";
	document.getElementById('upgrades').style.left="-100%";
	document.getElementById('options').style.left="-100%";
	document.getElementById('achievements').style.left="-100%";
}
function showJournal(){
	document.getElementById('map').style.left="-100%";
	document.getElementById('journal').style.left="0px";
	document.getElementById('upgrades').style.left="-100%";
	document.getElementById('options').style.left="-100%";
	document.getElementById('achievements').style.left="-100%";
}
function showUpgrades(){
	document.getElementById('map').style.left="-100%";
	document.getElementById('journal').style.left="-100%";
	document.getElementById('upgrades').style.left="0px";
	document.getElementById('options').style.left="-100%";
	document.getElementById('achievements').style.left="-100%";
}
function showOptions(){
	document.getElementById('map').style.left="-100%";
	document.getElementById('journal').style.left="-100%";
	document.getElementById('upgrades').style.left="-100%";
	document.getElementById('options').style.left="0px";
	document.getElementById('achievements').style.left="-100%";
}
function showAchievements(){
	document.getElementById('map').style.left="-100%";
	document.getElementById('journal').style.left="-100%";
	document.getElementById('upgrades').style.left="-100%";
	document.getElementById('options').style.left="-100%";
	document.getElementById('achievements').style.left="0px";
}








