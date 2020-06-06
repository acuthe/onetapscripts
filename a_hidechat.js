//Hide chat script requested by Laura, made by acuthe#0086
//Good for getting rid of annoying trash talkers
UI.AddCheckbox("Hide chat | Requested by Laura")

var mgenm = ["Misc", "GENERAL", "Miscellaneous"]
var scritem = ["Misc", "JAVASCRIPT", "Script items"]
UI.SetValue(mgenm, "Hidden cvars", true)

function hc()
{
	if(UI.GetValue(scritem, "Hide chat | Requested by Laura", true)) {
		Cheat.ExecuteCommand("cl_chatfilters 0");
	}else{
		Cheat.ExecuteCommand("cl_chatfilters 63");
	}
}
function main() {
	Cheat.RegisterCallback("draw", "hc");
	Global.RegisterCallback( "FrameStageNotify", "hc" );
}
main();