/**
 * TODO make this a GUI MAnager since it is essentially juggling parts of the HUD and canvas.
 * Badges object from backend has the form:
"unlockedBadges": {
    "latest": "",
    "waterUnits": [],
    "earlyBird": false,
    "nightOwl": false,
    "durations": {
        "1": false,
        "3": false,
        "7": false,
        "14": false,
        "30": false,
        "90": false,
        "180": false,
        "365": false
    },
    "helicopterParent": false
}
 * 
 */

var oldBadgeObj = null;
var badgeButtonElement = document.getElementById("badgeButton");
var fullScreenBadgeOverlay = document.getElementById("allBadges");
var fullScreenNewBadgeOverlay = document.getElementById("newBadge"); // This scrolls. TODO fix it.
var canvas = document.getElementById("webGLCanvas");

const BADGE_ART_DIR = "./assets/source-art/badges/";
const NEW_BADGE_BG = BADGE_ART_DIR + "Pete_Background-Badge.png";
const ALL_BADGE_BG = BADGE_ART_DIR + "Pete_Background-All.png";


const backFromTheBrink = document.getElementById("backFromTheBrink");
const earlyBird = document.getElementById("earlyBird");
const greenThumb = document.getElementById("greenThumb");
const helicopterParent = document.getElementById("helicopterParent");
const newParent = document.getElementById("newParent");
const nightOwl = document.getElementById("nightOwl");

const badgeFiles = {
    helicopterParent: {fileName: "Pete_Badge-BackFromTheBrink.png", domElement: helicopterParent},
    earlyBird: {fileName: "Pete_Badge-EarlyBird.png", domElement: earlyBird},
    nightOwl: {fileName: "Pete_Badge-NightOwl.png", domElement: nightOwl}
}

module.exports = {
    refreshBadges(badgeData) {
        if(oldBadgeObj === null) {
            //First time loading badges
        } else {
            //DO our comparison.
            for (const [key, value] of Object.entries(badgeFiles)) {
                //if a badge changed, show it.
                if(badgeData[key] != oldBadgeObj[key]) {
                    this.updateBadge(value.domElement, badgeData[key]);
                    if(badgeData[key]) {
                        this.showNewBadge(value.fileName);
                    }
                }
            }
        }
        oldBadgeObj = badgeData;
    },
    showNewBadge(badgeFileName) { // TODO debug this. not working correctly.
        fullScreenNewBadgeOverlay.style.display = "block";
        canvas.style.display = "none";
        fullScreenBadgeOverlay.style.display = "none";
        const newBadgeImg = document.create('img');
        newBadgeImg.src = BADGE_ART_DIR + badgeFileName;
        fullScreenNewBadgeOverlay.appendChild(newBadgeImg);

        window.setTimeout(function() {
            console.log("remove child");
            newBadgeImg.parentNode.removeChild(newBadgeImg);
            this.showBadges();
        }, 7000);
    },
    showBadges() {
        fullScreenNewBadgeOverlay.style.display = "none";
        fullScreenBadgeOverlay.style.display = "block";
        canvas.style.display = "none";

        window.setTimeout(this.hideBadges, 8000);
    },
    hideBadges() {
        fullScreenBadgeOverlay.style.display = "none";
        fullScreenNewBadgeOverlay.style.display = "none";
        canvas.style.display = "inline";
    },
    updateBadge(badgeReference, value) {
        if(value) {
            console.log(badgeReference.src);
            badgeReference.src = badgeReference.src.replace("Off", "On");
        } else {
            console.log(badgeReference.src);
            badgeReference.src = badgeReference.src.replace("On", "Off");
        }
    }
}