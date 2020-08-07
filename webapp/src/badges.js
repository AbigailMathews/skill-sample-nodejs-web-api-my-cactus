const { init } = require("./selector");

/**
 * TODO make this do something in the future.
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

const BADGE_ART_DIR = "./assets/source-art/badges/";
const NEW_BADGE_BG = BADGE_ART_DIR + "Pete_Background-Badge.png";
const ALL_BADGE_BG = BADGE_ART_DIR + "Pete_Background-All.png";

const backFromTheBrink = document.getElementById("backFromTheBrink");
const earlyBird = document.getElementById("earlyBird");
const greenThumb = document.getElementById("greenThumb");
const helicopterParent = document.getElementById("helicopterParent");
const newParent = document.getElementById("newParent");
const nightOwl = document.getElementById("nightOwl");

module.exports = {
    refreshBadges(badgeData) {
        if(oldBadgeObj === null) {
            //First time loading badges
        } else {
            //DO our comparison.
            if(badgeData.helicopterParent != oldBadgeObj.helicopterParent) {
                this.updateBadge(helicopterParent, badgeData.helicopterParent)
            }
        }
        oldBadgeObj = badgeData;
    },
    showNewBadge(){
        // fullScreenNewBadgeOverlay.
        fullScreenNewBadgeOverlay.style.display = "block";
        //TODO kick off a timer to hide
    },
    showBadges() {
        fullScreenBadgeOverlay.style.display = "block";
        //TODO Kick off timer to hide
    },
    hideBadges() {

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