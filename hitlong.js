//Original version by Haunter : https://www.onetap.com/members/haunter.36428/
//Link to original thread: https://www.onetap.com/threads/descriptive-ragebot-shot-logs-v4-now-draws-on-screen.16950/

//Updated version with (Health Remaining XXX) by acuthe#0087 - https://www.onetap.com/members/zerodna.31160/
//All credits go to Haunter for the original script!

//Updated version: https://github.com/acuthe/onetapscripts/releases/tag/1.1

var binlib = {};
function dictLength(dict) {
    var count = 0;
    for (_ in dict) {
        count++;
    }
    return count;
}
function createDropdown(name, values, multi) {
    UI[multi ? "AddMultiDropdown" : "AddDropdown"](name, values);

    binlib[name] = { "multi": multi, "values": {} };

    multi && values.reverse();

    var i = 0; for (value in values) {
        var index = multi ? (1 << (values.length - (i + 1))) : i;
        binlib[name].values[index] = values[value];
        i++;
    }
}
function fetchDropdown(name) {
    var selection = (name ? [] : {})
    var bin = UI.GetValue("Misc", name);

    !name && function () { for (dropdown in binlib) selection[dropdown] = fetchDropdown(dropdown) }();

    if (name) {
        !binlib[name].multi && bin == 0 && selection.push(binlib[name].values[0]) && function () { return selection; }();
        for (var i = dictLength(binlib[name].values) - 1; i >= 0; i--) {
            if (!binlib[name].multi && i == 0) continue;

            var index = binlib[name].multi ? (1 << i) : i;
            if (bin - index >= 0) {
                bin -= (index);
                selection.push(binlib[name].values[index]);
            }
        }
    }

    return selection;
}
function returnDescriptiveHitboxName(index) {
    var hitboxName = "";
    switch (index) {
        case 0:
            hitboxName = "Head";
            break;
        case 1:
            hitboxName = "Neck";
            break;
        case 2:
            hitboxName = "Pelvis";
            break;
        case 3:
            hitboxName = "Body";
            break;
        case 4:
            hitboxName = "Thorax";
            break;
        case 5:
            hitboxName = "Chest";
            break;
        case 6:
            hitboxName = "Upper chest";
            break;
        case 7 || 9:
            hitboxName = "Left leg";
            break;
        case 8 || 10:
            hitboxName = "Right Leg";
            break;
        case 11:
            hitboxName = "Left foot";
            break;
        case 12:
            hitboxName = "Right foot";
            break;
        case 13 || 15 || 16:
            hitboxName = "Left hand";
            break;
        case 14 || 17 || 18:
            hitboxName = "Right hand";
            break;
        default:
            hitboxName = "Generic";
    }
    return hitboxName;
}
function returnHitgroup(index) {
    var hitgroupName = "";
    switch (index) {
        case 0:
            hitgroupName = "Generic";
            break;
        case 1:
            hitgroupName = "Head";
            break;
        case 2:
            hitgroupName = "Chest";
            break;
        case 3:
            hitgroupName = "Stomach";
            break;
        case 4:
            hitgroupName = "Left Arm";
            break;
        case 5:
            hitgroupName = "Right Arm";
            break;
        case 6:
            hitgroupName = "Left Leg";
            break;
        case 7:
            hitgroupName = "Right Leg";
            break;
        default:
            hitgroupName = "???"
            break;
    }
    return hitgroupName;
}
function returnExploit(index) {
    var returnVal;
    if (index == 0) {
        returnVal = "False";
    }
    else if (index == 1) {
        returnVal = "Hide shots";
    }
    else {
        returnVal = "doubletap";
    }
    return returnVal;
}
//Using the weapon name given with Event.GetString("weapon")
//Gives weird names so im just throwing the name into this
//Makes me want to vomit but oh well
function returnRealWeaponName(name) {
    var returnVal;
    switch (name) {
        case "knife":
            returnVal = "Knife";
            break;
        case "taser":
            returnVal = "Zeus x27"
            break;
        case "galilar":
            returnVal = "Galil AR";
            break;
        case "ak47":
            returnVal = "AK-47";
            break;
        case "famas":
            returnVal = "FAMAS";
            break;
        case "m4a1":
            returnVal = "M4A1-S/M4A1";
            break;
        case "ssg08":
            returnVal = "SSG 08";
            break;
        case "aug":
            returnVal = "AUG";
            break;
        case "sg556":
            returnVal = "SG 553";
            break;
        case "awp":
            returnVal = "AWP";
            break;
        case "g3sg1":
            returnVal = "G3SG1";
            break;
        case "scar20":
            returnVal = "SCAR-20";
            break;
        case "hegrenade":
            returnVal = "High Explosive Grenade";
            break;
        case "molotov":
            returnVal = "Molotov";
            break;
        case "inferno":
            returnVal = "Incendiary Grenade";
            break;
        case "hkp2000":
            returnVal = "USP-S/P2000";
            break;
        case "glock":
            returnVal = "Glock-18"
            break;
        case "elite":
            returnVal = "Dual Berretas"
            break;
        case "p250":
            returnVal = "P250";
            break;
        case "tec9":
            returnVal = "Tec-9"
            break;
        case "fiveseven":
            returnVal = "Five-Seven/CZ75-Auto";
            break;
        case "deagle":
            returnVal = "Desert Eagle/R8 Revolver";
            break;
        case "nova":
            returnVal = "Nova";
            break;
        case "xm1014":
            returnVal = "XM1014";
            break;
        case "sawedoff":
            returnVal = "Sawed-off";
            break;
        case "m249":
            returnVal = "M249";
            break;
        case "negev":
            returnVal = "Negev";
            break;
        case "mag7":
            returnVal = "MAG-7";
            break;
        case "mac10":
            returnVal = "MAC-10";
            break;
        case "mp7":
            returnVal = "MP7/MP5-SD";
            break;
        case "mp9":
            returnVal = "MP9";
            break;
        case "ump45":
            returnVal = "UMP-45";
            break;
        case "p90":
            returnVal = "P90";
            break;
        case "bizon":
            returnVal = "PP-Bizon";
            break;
        case "decoy":
            returnVal = "Decoy Grenade";
            break;
        case "flashbang":
            returnVal = "Flashbang";
            break;
        case "smokegrenade":
            returnVal = "Smoke Grenade";
            break;
        default:
            returnVal = "???"
            break;
    }
    return returnVal;
}
function checkSafePoint(safepoint) {
    returnVal = "no";
    if (safepoint == 1) {
        returnVal = "Yes";
    }
    else {
        returnVal = "No";
    }
    return returnVal;
}
function getVel(index) {
    var vel = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(Math.pow(vel[0], 2) + Math.pow(vel[1], 2));
}
function damageLogs() {
    simpleColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Log Color")
    if (UI.GetValue("Alternate colors for damage logs")) {
        var hurtColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Damage Done");
        var damColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Damage taken")

    }
    else {
        var hurtColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Log Color");
        var damColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Log Color")
    }

    var optionsSelected = fetchDropdown("Damage log types")
    var hOn = optionsSelected.indexOf("Damage taken")
    var dOn = optionsSelected.indexOf("Damage given")
    //info
    var localPlayerIndex = Entity.GetLocalPlayer();
    var playerName = Entity.GetName(localPlayerIndex);
    var victim = Event.GetInt("userid");
    var victimIndex = Entity.GetEntityFromUserID(victim);
    var victimName = Entity.GetName(victimIndex);
    var attacker = Event.GetInt("attacker");
    var attackerIndex = Entity.GetEntityFromUserID(attacker);
    var attackerName = Entity.GetName(attackerIndex);
    var weaponName = Event.GetString("weapon");
    var weapon = returnRealWeaponName(weaponName);
    var damageDone = Event.GetInt("dmg_health")
	var healthLeft = Event.GetInt("health")
    var hitgroupIndex = Event.GetInt("hitgroup")
    var hitgroup = returnHitgroup(hitgroupIndex)

    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Enable simple log")) {
        Cheat.PrintColor(simpleColor, "[onetap] " + playerName + " hit " + victimName + " for " + damageDone + " in his " + hitgroup + " with " + weapon + " (Health Remaining" + healthLeft + ")" + "\n");
    }

    if (!UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Enable damage logs")) {
        return;
    }
    //Player damage done log
    if (localPlayerIndex == attackerIndex) {
        var hitString;
        switch (weaponName) {
            case "decoy":
                hitString = "" + weapon.toString() + " Hit " + victimName.toString() + " for " + damageDone.toString() + " (Health Remaining " + healthLeft + ")";
                Cheat.PrintColor(hurtColor, "[onetap] " + weapon + " Hit " + victimName + " for " + damageDone + " (Health Remaining " + healthLeft + ")" + "\n");
                return;
            case "flashbang":
                hitString = "" + weapon.toString() + " Hit " + victimName.toString() + " for " + damageDone.toString() + " (Health Remaining " + healthLeft + ")";
                Cheat.PrintColor(hurtColor, "[onetap] " + weapon + " Hit " + victimName + " for " + damageDone + " (Health Remaining " + healthLeft + ")" + "\n");
                return;
            case "smokegrenade":
                hitString = "" + weapon.toString() + " Hit " + victimName.toString() + " for " + damageDone.toString() + " (Health Remaining " + healthLeft + ")";
                Cheat.PrintColor(hurtColor, "[onetap] " + weapon + " Hit " + victimName + " for " + damageDone + " (Health Remaining " + healthLeft + ")" + "\n");
                return;
            default:
                hitString = "hit " + victimName.toString() + " in the " + hitgroup.toString() + " for " + damageDone.toString() + " (Health Remaining " + healthLeft + ")";
                Cheat.PrintColor(hurtColor, "[onetap] " + " Hit " + victimName + " in the " + hitgroup + " for " + damageDone + " (Health Remaining " + healthLeft + ")" + "\n");
        }
        if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen") && dOn != -1) {
            var log = {
                content: hitString,
                type: "hit"
            };
            logs.push(log)
        }
    }
    //damage taken log
    if (victimIndex !== localPlayerIndex) {
        return;
    }
    var logType1 = fetchDropdown("Damage log types");
    var hurt = logType1.indexOf("Damage taken");
    if (hurt == -1) {
        return;
    }
    Cheat.PrintColor(damColor, "[onetap] " + attackerName + " hit you in the " + hitgroup + " for " + damageDone + " with " + weapon + "\n");
    var hurtString = "[onetap] " + attackerName + " hit you in the " + hitgroup + " for " + damageDone + " with " + weapon
    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen") && dOn != -1) {
        var log = {
            content: hurtString,
            type: "dTaken"
        };
        logs.push(log)
    }
}
function printAdvancedHitLog() {
    var logColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Log Color");
    if (!UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Enable advanced log")) {
        return;
    }

    //I absolutely apologize if anyone is looking through this that they have to see this abomination
    var optionsSelected = fetchDropdown("Options")
    var pre = optionsSelected.indexOf("Add prefix")
    var vel = optionsSelected.indexOf("Add velocity")
    var vie = optionsSelected.indexOf("Add viewangles")
    var hit = optionsSelected.indexOf("Add hitchance")
    var saf = optionsSelected.indexOf("Add safe point")
    var exp = optionsSelected.indexOf("Add exploit")

    //information
    var ragebotTarget = Event.GetInt("target_index");
    var ragebotTargetHitbox = Event.GetInt("hitbox");
    var ragebotTargetHitchance = Event.GetInt("hitchance");
    var ragebotTargetSafepoint = Event.GetInt("safepoint");
    var ragebotTargetExploit = Event.GetInt("exploit");
    var targetName = Entity.GetName(ragebotTarget);
    var localPlayerIndex = Entity.GetLocalPlayer();
    var targetEyePos = Entity.GetProp(ragebotTarget, "CCSPlayer", "m_angEyeAngles");
    var targetVelocity = getVel(ragebotTarget)
    var playerVelocity = getVel(localPlayerIndex)

    var stringToPrint;
    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Customize advanced log")) {
        stringToPrint = "Shot at " + targetName + "'s " + returnDescriptiveHitboxName(ragebotTargetHitbox)
        if (pre != -1) {
            stringToPrint = "[onetap] " + stringToPrint
        }
        if (vel != -1) {
            stringToPrint = stringToPrint + " | (Pvel: " + Math.floor(playerVelocity) + " Tvel: " + Math.floor(targetVelocity) + ")"
        }
        if (vie != -1) {
            stringToPrint = stringToPrint + " | Viewangles(" + Math.floor(targetEyePos[0]) + "," + Math.floor(targetEyePos[1]) + "," + Math.floor(targetEyePos[2]) + ")"
        }
        if (hit != -1) {
            stringToPrint = stringToPrint + " | HC: " + ragebotTargetHitchance
        }
        if (saf != -1) {
            stringToPrint = stringToPrint + " | SP: " + checkSafePoint(ragebotTargetSafepoint)
        }
        if (exp != -1) {
            stringToPrint = stringToPrint + " | Exploit: " + returnExploit(ragebotTargetExploit)
        }
        Cheat.PrintColor(logColor, stringToPrint + "\n")
    }
    else {
        Cheat.PrintColor(logColor, "[onetap] Shot at " + targetName + "'s " + returnDescriptiveHitboxName(ragebotTargetHitbox) + " | (Pvel: " + Math.floor(playerVelocity) + " Tvel: " + Math.floor(targetVelocity) + ") | Viewangles(" + Math.floor(targetEyePos[0]) + "," + Math.floor(targetEyePos[1]) + "," + Math.floor(targetEyePos[2]) + ")" + " | HC: " + ragebotTargetHitchance + " | SP: " + checkSafePoint(ragebotTargetSafepoint) + " | Exploit: " + returnExploit(ragebotTargetExploit) + "\n");
        stringToPrint = "[onetap] Shot at " + targetName + "'s " + returnDescriptiveHitboxName(ragebotTargetHitbox) + " | (Pvel: " + Math.floor(playerVelocity) + " Tvel: " + Math.floor(targetVelocity) + ") | Viewangles(" + Math.floor(targetEyePos[0]) + "," + Math.floor(targetEyePos[1]) + "," + Math.floor(targetEyePos[2]) + ")" + " | HC: " + ragebotTargetHitchance + " | SP: " + checkSafePoint(ragebotTargetSafepoint) + " | Exploit: " + returnExploit(ragebotTargetExploit)
    }
    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
        var log = {
            content: stringToPrint,
            type: "rBot"
        };
        logs.push(log)
    }
}
function uiUpdates() {

    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Enable simple log")) {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Log Color", true);
    }
    else if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Enable advanced log")) {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Log Color", true);
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Customize advanced log", true);
    }
    else if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Enable damage logs")) {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Log Color", true);
    }
    else {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Log Color", false);
    }

    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Alternate colors for damage logs")) {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Damage taken", true);
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Damage Done", true);
    }
    else {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Damage taken", false);
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Damage Done", false);
    }

    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Customize advanced log")) {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Options", true);
    }
    else {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Options", false)
    }

    if (UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Enable damage logs")) {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Damage log types", true);
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Alternate colors for damage logs", true);
    }
    else {
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Damage log types", false);
        UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Alternate colors for damage logs", false);
    }
}
var logs = [];
var drawTimer = false;
var drawTime = 0;
var fLoaded = false;
function logTimer() {
    if (!UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
        return;
    }
    if (logs.length > UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Max logs")) {
        logs.shift()
    }
    if (drawTimer == false && logs.length !== 0) {
        drawTime = Globals.Curtime();
        drawTimer = true;
    }

    var delay = UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Log remove time (s)")
    var cTime = Globals.Curtime()

    if (cTime > drawTime + delay + 1) {
        drawTimer = false;
    }
    if (cTime > drawTime + delay) {
        logs.shift();
        drawTimer = false;
    }
}
function onDraw() {
    if (!fLoaded) {
        //Change font here
        font = Render.AddFont("tahoma", 8, 100);
        fLoaded = true;
    }
    if (!UI.GetValue('MISC', 'JAVASCRIPT', 'Script items', "Draw logs on screen")) {
        logs = []
        return;
    }
    var shotColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Log Color")
    var hitColor1 = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Damage Done");
    var damColor = UI.GetColor('MISC', 'JAVASCRIPT', 'Script items', "Damage taken")
    for (i = 0; i < logs.length; i++) {
        if (UI.GetValue("Alternate colors for damage logs")) {
            if (logs[i].type == "rBot") {
                Render.StringCustom(5, i * 13, 0, logs[i].content, shotColor, font);
            }
            else if (logs[i].type == "hit") {
                Render.StringCustom(5, i * 13, 0, logs[i].content, hitColor1, font);
            }
            else if (logs[i].type == "dTaken") {
                Render.StringCustom(5, i * 13, 0, logs[i].content, damColor, font);
            }
        }
        else {
            Render.StringCustom(5, i * 13, 0, logs[i].content, shotColor, font);
        }
    }
}
function onStart() {
    drawTimer = false;
}
function yes() {
    UI.AddLabel("=======Descriptive logs=======");
    UI.AddCheckbox("Enable simple log")
    UI.AddCheckbox("Enable advanced log")
    UI.AddCheckbox("Enable damage logs")
    UI.AddCheckbox("Draw logs on screen")
    UI.AddSliderFloat("Log remove time (s)", 0, 15);
    UI.AddSliderInt("Max logs", 1, 20);
    createDropdown("Damage log types", ["Damage taken", "Damage given"], true);
    UI.AddCheckbox("Customize advanced log")
    createDropdown("Options", ["Add prefix", "Add velocity", "Add viewangles", "Add hitchance", "Add safe point", "Add exploit"], true);
    UI.AddCheckbox("Alternate colors for damage logs")
    UI.AddColorPicker("Log Color")
    UI.AddColorPicker("Damage taken")
    UI.AddColorPicker("Damage Done")

    ///

    UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Log Color", false);
    UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Damage taken", false);
    UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Damage Done", false);
    UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Alternate colors for damage logs", false);
    UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Customize advanced log", false);
    UI.SetEnabled('MISC', 'JAVASCRIPT', 'Script items', "Options", false);

    ///
    Cheat.RegisterCallback("round_start", "onStart")
    Cheat.RegisterCallback("player_hurt", "damageLogs");
    Cheat.RegisterCallback("ragebot_fire", "printAdvancedHitLog");
    Cheat.RegisterCallback("Draw", "logTimer");
    Cheat.RegisterCallback("Draw", "onDraw");
    Cheat.RegisterCallback("Draw", "uiUpdates");

}
yes();