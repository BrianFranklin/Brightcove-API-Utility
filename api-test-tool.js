var api_tool = new function () {
	this.categories = ["video", "playlist"];
	this.method = null;
	this.mode = "v";
	this.ret = "";
	this.store = {
		"token": ""
	};
	this.fields_video = ["name", "id", "referenceId", "accountId", "shortDescription", "longDescription", "FLVURL", "renditions", "creationDate", "publishedDate", "lastModifiedDate", "startDate", "endDate", "linkURL", "linkText", "tags", "videoStillURL", "thumbnailURL", "length", "economics", "cuePoints", "playsTotal", "playsTrailingWeek", "FLVFullLength", "videoFullLength"];
	this.fields_playlist = ["id", "referenceId", "accountId", "name", "shortDescription", "videoIds", "videos", "playlistType", "thumbnailURL"];
	this.parameters_video = ["token", "output", "page_size", "page_number", "sort_by", "sort_order", "fields", "get_item_count", "video_id", "reference_id", "video_ids", "reference_ids", "user_id", "campaign_id", "text", "and_tags", "or_tags", "video_fields", "from_date", "filter", "custom_fields", "media_delivery"];
	this.parameters_playlist = ["token", "output", "page_size", "page_number", "sort_by", "sort_order", "fields", "get_item_count", "playlist_id", "reference_id", "playlist_ids", "reference_ids", "player_id", "playlist_fields", "video_fields", "custom_fields", "media_delivery"];
	this.options_video = [
		{
			"method": "find_all_videos",
			"required": [0],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 20, 21],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_video_by_id",
			"required": [0, 8],
			"optional": [1, 6, 17, 20, 21],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_related_videos",
			"required": [0],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 20, 21],
			"exclusive": [8, 9],
			"inclusive": []
		},
		{
			"method": "find_videos_by_ids",
			"required": [0, 10],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 20, 21],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_video_by_reference_id",
			"required": [0, 9],
			"optional": [1, 6, 17, 20, 21],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_videos_by_reference_ids",
			"required": [0, 11],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 20, 21],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_videos_by_user_id",
			"required": [0, 12],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 20, 21],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_videos_by_campaign_id",
			"required": [0, 13],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 20, 21],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_videos_by_text",
			"required": [0, 14],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 20, 21],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_videos_by_tags",
			"required": [0],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 20, 21],
			"exclusive": [15, 16],
			"inclusive": []
		},
		{
			"method": "find_modified_videos",
			"required": [0, 18],
			"optional": [1, 2, 3, 4, 5, 6, 7, 17, 18, 20, 21],
			"exclusive": [],
			"inclusive": []
		}
	];
	this.options_playlist = [
		{
			"method": "find_all_playlists",
			"required": [0],
			"optional": [1, 2, 3, 4, 5, 6, 7, 13, 14, 15, 16],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_playlist_by_id",
			"required": [0, 8],
			"optional": [1, 6, 13, 14, 15, 16],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_playlists_by_ids",
			"required": [0, 10],
			"optional": [1, 2, 3, 4, 5, 6, 7, 13, 14, 15, 16],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_playlist_by_reference_id",
			"required": [0, 9],
			"optional": [1, 6, 13, 14, 15, 16],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_playlists_by_reference_ids",
			"required": [0, 11],
			"optional": [1, 2, 3, 4, 5, 6, 7, 13, 14, 15, 16],
			"exclusive": [],
			"inclusive": []
		},
		{
			"method": "find_playlists_for_player_id",
			"required": [0, 12],
			"optional": [1, 2, 3, 4, 5, 6, 7, 13, 14, 15, 16],
			"exclusive": [],
			"inclusive": []
		}
	];
	this.tips_video = [
		{ "title": "API READ TOKEN", "tip": "Tokens are required to access the API." },
		{ "title": "OUTPUT FORMAT", "tip": "Valid values are <i>json</i> and <i>mrss</i>. Specifying <i>json</i> will result in a <a href='http://json.org' target='_blank'>Javascript notated object</a> being returned. The <i>mrss</i> format will result in a media rss feed. If nothing is specified, <i>json</i> is assumed." },
		{ "title": "PAGE SIZE", "tip": "The page size can be any number up to 100. This parameter affects the number of videos returned by an API call, and when used with <i>page_number</i>, it will affect the offset of the first returned result." },
		{ "title": "PAGE NUMBER", "tip": "The page number can be any number that falls within the total number of videos divided by the <i>page_size</i> value. For instance, 100 videos will have 5 total pages when a <i>page_size</i> of 20 is specified." },
		{ "title": "SORT BY", "tip": "The <i>sort_by</i> parameter allows for you to specify which attribute of a video to sort the results on. Valid values include <i>PUBLISH_DATE</i>, <i>CREATION_DATE</i>, <i>MODIFIED_DATE</i>, <i>PLAYS_TOTAL</i>, and <i>PLAYS_TRAILING_WEEK</i>." },
		{ "title": "SORT ORDER", "tip": "The order applied to the <i>sort_by</i> parameter. Valid values are either <i>ASC</i> or <i>DESC</i>." },
		{ "title": "OBJECT FIELDS", "tip": "By default, a number of attributes are returned as part of the video DTO. The API allows for these to be modified to suit your needs, so simply check the fields you require and they will be included in the resulting object. Valid values are listed for ease of use." },
		{ "title": "TOTAL ITEM COUNT", "tip": "Sometimes it helps to know exactly how many videos exist, even if you're only fetching a few of them. By setting <i>get_item_count</i> to true, the total video count matching the specified parameters will be included in the API return object. If set to false, -1 is returned." },
		{ "title": "VIDEO ID", "tip": "Videos in the Brightcove system have unique 64 bit integer identifiers. Video IDs can be found in the returned video objects of any call which includes the <i>id</i> field. Identifiers can also be found in the Brightcove console." },
		{ "title": "REFERENCE ID", "tip": "Reference IDs are unique values, specified by you, to make identification of videos easier. These values can be set in the Brightcove console or via the write API." },
		{ "title": "VIDEO ID SET", "tip": "Some methods make use of more than one video ID. When this is the case, those IDs are specified as a comma-separated set. For instance, <i>7220004001,7218020001,7223593001</i> would execute the API call on the three specified videos." },
		{ "title": "REFERENCE ID SET", "tip": "Like video IDs, sometimes you need to request a set of videos by multiple reference IDs. When this is the case, simply use a comma-separated set of reference IDs: <i>apple_juice,eggyweggs,bacon</i>" },
		{ "title": "USER ID", "tip": "Videos uploaded through the CGM module will contain a unique user ID that can be used to retrieve videos." },
		{ "title": "CAMPAIGN ID", "tip": "Videos uploaded through the CGM module will also contain a campaign ID that can be used to determine which campaign the upload originated from." },
		{ "title": "TEXT", "tip": "Videos can be found by searching for specified text values. The text field simply takes a string which is then matched against video properties." },
		{ "title": "REQUIRE ALL TAGS", "tip": "Using <i>and_tags</i> requires that all tags specified exist on the returned videos. This is a stricter tag match than that of <i>or_tags</i>. When more than one tag is specified, use a comma-separated set: tag_one,tag_two,tag_three" },
		{ "title": "REQUIRE ANY TAGS", "tip": "When you need to find videos containing any of a number of tags, <i>or_tags</i> is the way to go. Like <i>and_tags</i>, this parameter takes one or more tags and matches videos against them. In this case, however, videos will be returned if they match any number of the given tags, rather than requiring that it match them all." }
	];
	this.tips_playlist = [
		{ "title": "API READ TOKEN", "tip": "Tokens are required to access the API." },
		{ "title": "OUTPUT FORMAT", "tip": "Valid values are <i>json</i> and <i>mrss</i>. Specifying <i>json</i> will result in a <a href='http://json.org' target='_blank'>Javascript notated object</a> being returned. The <i>mrss</i> format will result in a media rss feed. If nothing is specified, <i>json</i> is assumed." },
		{ "title": "PAGE SIZE", "tip": "The page size can be any number up to 100. This parameter affects the number of playlists returned by an API call, and when used with <i>page_number</i>, it will affect the offset of the first returned result." },
		{ "title": "PAGE NUMBER", "tip": "The page number can be any number that falls within the total number of playlists divided by the <i>page_size</i> value. For instance, 100 playlists will have 5 total pages when a <i>page_size</i> of 20 is specified." },
		{ "title": "SORT BY", "tip": "The <i>sort_by</i> parameter allows for you to specify which attribute of a playlist to sort the results on. Valid values include <i>PUBLISH_DATE</i>, <i>CREATION_DATE</i>, and <i>MODIFIED_DATE</i>." },
		{ "title": "SORT ORDER", "tip": "The order applied to the <i>sort_by</i> parameter. Valid values are either <i>ASC</i> or <i>DESC</i>." },
		{ "title": "OBJECT FIELDS", "tip": "By default, a number of attributes are returned as part of the playlist DTO. The API allows for these to be modified to suit your needs, so simply check the fields you require and they will be included in the resulting object. Valid values are listed for ease of use." },
		{ "title": "TOTAL ITEM COUNT", "tip": "Sometimes it helps to know exactly how many playlists exist, even if you're only fetching a few of them. By setting <i>get_item_count</i> to true, the total playlist count matching the specified parameters will be included in the API return object. If set to false, -1 is returned." },
		{ "title": "PLAYLIST ID", "tip": "Playlists in the Brightcove system have unique 64 bit integer identifiers. Playlist IDs can be found in the returned playlist objects of any call which includes the <i>id</i> field. Identifiers can also be found in the Brightcove console." },
		{ "title": "REFERENCE ID", "tip": "Reference IDs are unique values, specified by you, to make identification of playlists easier. These values can be set in the Brightcove console or via the write API." },
		{ "title": "PLAYLIST ID SET", "tip": "Some methods make use of more than one playlist ID. When this is the case, those IDs are specified as a comma-separated set. For instance, <i>7220004001,7218020001,7223593001</i> would execute the API call on the three specified playlists." },
		{ "title": "REFERENCE ID SET", "tip": "Like playlist IDs, sometimes you need to request a set of playlists by multiple reference IDs. When this is the case, simply use a comma-separated set of reference IDs: <i>apple_juice,eggyweggs,bacon</i>" },
		{ "title": "PLAYER ID", "tip": "Playlists are sometimes assigned to players, such as with a tabbed video player. When you have a player ID, it is possible to select the assigned playlists by specifying it." }
	];

	this.init = function () {
		document.write("<select id='api_tool_methods' onchange='api_tool.builder();'>");
		document.write("<option>VIDEO</option>");
		
		for (var i = 0; i < this.options_video.length; i++) {
			document.write("<option value='" + this.options_video[i].method + "'>" + this.options_video[i].method + "</option>");
		}
		
		document.write("<option></option><option>PLAYLIST</option>");
		
		for (var i = 0; i < this.options_playlist.length; i++) {
			document.write("<option value='" + this.options_playlist[i].method + "'>" + this.options_playlist[i].method + "</option>");
		}
		
		document.write("</select>");
	}

	this.builder = function () {
		var s = document.getElementById("api_tool_methods").value;
		var m = (s.indexOf("video") > 0) ? "v" : "p";
		
		api_tool.test(m, s);
		api_tool.make();
		
		return false;
	}

	this.test = function (v, s) {
		api_tool.method = s;
		api_tool.mode = v;
		
		if (v == "v") {
			for (var i = 0; i < api_tool.options_video.length; i++) {
				if (api_tool.options_video[i].method == s) {
					document.getElementById("api_tool_pie").innerHTML = "";
					document.getElementById("api_tool_pie").innerHTML += "<h2>Required</h2>";

					for (var j = 0; j < api_tool.options_video[i].required.length; j++) {
						var z = api_tool.parameters_video[api_tool.options_video[i].required[j]];
						
						if (z == "token") {
							v = api_tool.store.token;
						} else {
							v = "";
						}
						
						var q = "<span onclick='api_tool.raw(false, \"tip\", \"" + z + "\")'>" + z + "</span>";
						
						document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><input class='text' onblur='api_tool.make();' type='text' name='" + z + "' value='" + v + "' />" + q + ": </div>";
					}

					if (api_tool.options_video[i].exclusive.length > 0) {
						document.getElementById("api_tool_pie").innerHTML += "<h2>Choose Only One</h2>";
					}
					
					for (var j = 0; j < api_tool.options_video[i].exclusive.length; j++) {
						z = api_tool.parameters_video[api_tool.options_video[i].exclusive[j]];
						var q = "<span onclick='api_tool.raw(false, \"tip\", \"" + z + "\")'>" + z + "</span>";
						
						document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><input class='text' onblur='api_tool.make();' type='text' name='" + z + "' />" + q + ": </div>";
					}

					if (api_tool.options_video[i].inclusive.length > 0) {
						document.getElementById("api_tool_pie").innerHTML += "<h2>Choose At Least One</h2>";
					}
					
					for (var j = 0; j < api_tool.options_video[i].inclusive.length; j++) {
						z = api_tool.parameters_video[api_tool.options_video[i].inclusive[j]];
						var q = "<span onclick='api_tool.raw(false, \"tip\", \"" + z + "\")'>" + z + "</span>";
						
						document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><input class='text' onblur='api_tool.make();' type='text' name='" + z + "' />" + q + ": </div>";
					}

					document.getElementById("api_tool_pie").innerHTML += "<h2>Optional</h2>";

					for (var j = 0; j < api_tool.options_video[i].optional.length; j++) {
						z = api_tool.parameters_video[api_tool.options_video[i].optional[j]];
						var q = "<span onclick='api_tool.raw(false, \"tip\", \"" + z + "\")'>" + z + "</span>";
						
						if (z == "fields") {
							var x = "<h2><span onclick='api_tool.raw(false, \"tip\", \"fields\")'>Fields</span></h2>";
							x += "<div id='api_tool_fields'><input class='text' style='display:none;' type='text' name='fields' value='hi!' />";
							
							for (var k = 0; k < api_tool.fields_video.length; k++) {
								x += "<div class='api_tool_field_row'><input type='checkbox' onclick='api_tool.make();' name='" + api_tool.fields_video[k] + "' />" + api_tool.fields_video[k] + ": </div>";
							}
							
							x += "</div>";
							
							document.getElementById("api_tool_juice").innerHTML = x;
						} else if (z == "get_item_count") {
							document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><select onchange='api_tool.make();' id='api_tool_" + z + "'><option value='true'>True</option><option value='false'>False</option></select>" + q + ": </div>";
						} else if (z == "output") {
							document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><select onchange='api_tool.make();' id='api_tool_" + z + "'><option value='json'>JSON</option><option value='mrss'>MRSS</option></select>" + q + ": </div>";
						} else {
							document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><input class='text' onblur='api_tool.make();' type='text' name='" + z + "' />" + q + ": </div>";
						}
					}
				}
			}
		} else {
			for (var i = 0; i < api_tool.options_playlist.length; i++) {
				if (api_tool.options_playlist[i].method == s) {
					document.getElementById("api_tool_pie").innerHTML = "";
					document.getElementById("api_tool_pie").innerHTML += "<h2>Required</h2>";

					for (var j = 0; j < api_tool.options_playlist[i].required.length; j++) {
						var z = api_tool.parameters_playlist[api_tool.options_playlist[i].required[j]];
						
						if (z == "token") {
							v = api_tool.store.token;
						} else {
							v = "";
						}
						
						var q = "<span onclick='api_tool.raw(false, \"tip\", \"" + z + "\")'>" + z + "</span>";
						
						document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><input class='text' onblur='api_tool.make();' type='text' name='" + z + "' value='" + v + "' />" + q + ": </div>";
					}

					if (api_tool.options_playlist[i].exclusive.length > 0) {
						document.getElementById("api_tool_pie").innerHTML += "<h2>Choose Only One</h2>";
					}
					
					for (var j = 0; j < api_tool.options_playlist[i].exclusive.length; j++) {
						z = api_tool.parameters_playlist[api_tool.options_playlist[i].exclusive[j]];
						var q = "<span onclick='api_tool.raw(false, \"tip\", \"" + z + "\")'>" + z + "</span>";
						
						document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><input class='text' onblur='api_tool.make();' type='text' name='" + z + "' />" + q + ": </div>";
					}

					if (api_tool.options_playlist[i].inclusive.length > 0) {
						document.getElementById("api_tool_pie").innerHTML += "<h2>Choose At Least One</h2>";
					}
					
					for (var j = 0; j < api_tool.options_playlist[i].inclusive.length; j++) {
						z = api_tool.parameters_playlist[api_tool.options_playlist[i].inclusive[j]];
						var q = "<span onclick='api_tool.raw(false, \"tip\", \"" + z + "\")'>" + z + "</span>";
						
						document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><input class='text' onblur='api_tool.make();' type='text' name='" + z + "' />" + q + ": </div>";
					}

					document.getElementById("api_tool_pie").innerHTML += "<h2>Optional</h2>";

					for (var j = 0; j < api_tool.options_playlist[i].optional.length; j++) {
						z = api_tool.parameters_playlist[api_tool.options_playlist[i].optional[j]];
						var q = "<span onclick='api_tool.raw(false, \"tip\", \"" + z + "\")'>" + z + "</span>";
						
						if (z == "fields") {
							var x = "<h2><span onclick='api_tool.raw(false, \"tip\", \"fields\")'>Fields</span></h2>";
							x += "<div id='api_tool_fields'><input class='text' style='display:none;' type='text' name='fields' value='hi!' />";
							
							for (var k = 0; k < api_tool.fields_playlist.length; k++) {
								x += "<div class='api_tool_field_row'><input type='checkbox' onclick='api_tool.make();' name='" + api_tool.fields_playlist[k] + "' />" + api_tool.fields_playlist[k] + ": </div>";
							}
							
							x += "</div>";
							
							document.getElementById("api_tool_juice").innerHTML = x;
						} else if (z == "get_item_count") {
							document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><select onchange='api_tool.make();' id='api_tool_" + z + "'><option value='true'>True</option><option value='false'>False</option></select>" + q + ": </div>";
						} else if (z == "output") {
							document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><select onchange='api_tool.make();' id='api_tool_" + z + "'><option value='json'>JSON</option><option value='mrss'>MRSS</option></select>" + q + ": </div>";
						} else {
							document.getElementById("api_tool_pie").innerHTML += "<div class='api_tool_row'><input class='text' onblur='api_tool.make();' type='text' name='" + z + "' />" + q + ": </div>";
						}
					}
				}
			}
		}
	}

	this.make = function () {
		var u = "";
		var s = document.getElementById("api_tool_wrapper").getElementsByTagName("input");

		if ("v" == "\v") {
			for (var i in s) {
				if ((s[i].getAttribute("type") == "text") && (s[i].value.length > 0) && (s[i].id != "api_tool_cake")) {
					if (s[i].getAttribute("name") == "fields") {
						var z = "";
						var f = document.getElementsByTagName("input");
						
						for (var l in f) {
							if ((f[l].getAttribute("type") == "checkbox") && (f[l].checked)) {
								z += f[l].getAttribute("name") + ",";
							}
						}

						z = z.substr(0, (z.length - 1));

						if (z.length > 0) {
							u += s[i].getAttribute("name") + "=" + z + "&";
						}
					} else {
						u += s[i].getAttribute("name") + "=" + s[i].value + "&";
						
						if (s[i].getAttribute("name") == "token") {
							api_tool.store.token = s[i].value;
						}
					}
				}
			}
		} else {
			for (var i = 0; i < s.length; i++) {
				if ((s[i].getAttribute("type") == "text") && (s[i].value.length > 0) && (s[i].id != "api_tool_cake")) {
					if (s[i].getAttribute("name") == "fields") {
						var z = "";
						var f = document.getElementsByTagName("input");
						
						for (var l = 0; l < f.length; l++) {
							if ((f[l].getAttribute("type") == "checkbox") && (f[l].checked)) {
								z += f[l].getAttribute("name") + ",";
							}
						}

						z = z.substr(0, (z.length - 1));

						if (z.length > 0) {
							u += s[i].getAttribute("name") + "=" + escape(z) + "&";
						}
					} else {
						u += s[i].getAttribute("name") + "=" + escape(s[i].value) + "&";
						
						if (s[i].getAttribute("name") == "token") {
							api_tool.store.token = s[i].value;
						}
					}
				}
			}
		}

		if (document.getElementById("api_tool_get_item_count") != undefined) {
			var c = document.getElementById("api_tool_get_item_count").value || false;
			c = (c == "true") ? "&get_item_count=true" : "";
		} else {
			var c = "";
		}

		var j = document.getElementById("api_tool_output").value;
		api_tool.store.output = j;
		j = (j == "mrss") ? "&output=mrss" : "";

		var v = "http://api.brightcove.com/services/library?command=" + api_tool.method + "&" + u.substr(0, (u.length - 1)) + c + j;
		
		document.getElementById("api_tool_cake").value = v;
		
		if (api_tool.store.output != "json") {
			api_tool.raw(true);
			
			document.getElementById("api_tool_berries").src = v;
			document.getElementById("api_tool_cookies").innerHTML = "";
			
			return;
		} else {
			api_tool.raw(false, "formatted");
		}
		
		api_tool.inject(v);
	}

	this.inject = function (s) {
		var n = document.createElement("script");
		n.setAttribute("src", s + "&callback=api_tool.handler");
		n.setAttribute("type", "text/javascript");
		
		document.getElementsByTagName("head")[0].appendChild(n);
	};

	this.handler = function (s) {
		api_tool.ret = "";
		api_tool.handle(s);
		
		document.getElementById("api_tool_ice_cream").innerHTML = api_tool.ret;
		document.getElementById("api_tool_cookies").innerHTML = JSON.stringify(s, null, "<span></span>");
	}

	this.handle = function (s, z) {
		z = z || 10;
		
		for (var v in s) {
			if ((typeof s[v] != "string") && (typeof s[v] != "number") && (s[v] != null)) {
				j = "<div class='api_tool_state'>&ndash;</div>";
				
				api_tool.ret += "<div class='api_tool_nest-" + z + "' onclick='api_tool.click(this); return false;'>" + j + v + ":</div><div class='api_tool_collapse'>";
				api_tool.handle(s[v], z + 20);
				api_tool.ret += "</div>";
			} else {
				api_tool.ret += "<div class='api_tool_nest-" + z + "'>" + v + ": " + s[v] + "</div>";
			}
		}
	}

	this.click = function (s) {
		if (s.nextSibling.className == "api_tool_collapse") {
			if (s.nextSibling.style.display == "none") {
				s.nextSibling.style.display = "block";
				
				s.getElementsByTagName("div")[0].innerHTML = "&ndash;";
			} else {
				s.nextSibling.style.display = "none";
				
				s.getElementsByTagName("div")[0].innerHTML = "+";
			}
		}
	}

	this.collapse_all = function () {
		var d = document.getElementsByTagName("div");
		
		for (var i = 0; i < d.length; i++) {
			if (d[i].className == "api_tool_collapse") {
				d[i].style.display = "none";
			}
		}
	}

	this.expand_all = function () {
		var d = document.getElementsByTagName("div");
		
		for (var i = 0; i < d.length; i++) {
			if (d[i].className == "api_tool_collapse") {
				d[i].style.display = "block";
			}
		}
	}

	this.raw = function (v, x, q) {
		v = v || false;
		x = x || "raw";
		q = q || false;
		
		var m = document.getElementById("api_tool_right");
		var r = document.getElementById("api_tool_cookies");
		var f = document.getElementById("api_tool_ice_cream");
		var s = document.getElementById("api_tool_steak");
		var b = document.getElementById("api_tool_berries");
		var c = document.getElementById("api_tool_cookbook");
		
		if (v) {
			m.style.display = "block";
			r.style.display = "none";
			f.style.display = "none";
			c.style.display = "none";
			b.style.display = "block";
		} else if (x == "tip") {
			m.style.display = "none";
			r.style.display = "none";
			f.style.display = "none";
			b.style.display = "none";
			c.style.display = "block";

			if (api_tool.mode == "v") {
				for (var i = 0; i < api_tool.parameters_video.length; i++) {
					if (api_tool.parameters_video[i] == q) {
						c.innerHTML = "<h2>" + api_tool.tips_video[i].title + "</h2><div class='api_tool_row'>" + api_tool.tips_video[i].tip + "</div>";
					}
				}
			} else {
				for (var i = 0; i < api_tool.parameters_playlist.length; i++) {
					if (api_tool.parameters_playlist[i] == q) {
						c.innerHTML = "<h2>" + api_tool.tips_playlist[i].title + "</h2><div class='api_tool_row'>" + api_tool.tips_playlist[i].tip + "</div>";
					}
				}
			}

			s.innerHTML = "back";
		} else if ((r.style.display == "none") && (x == "raw")) {
			m.style.display = "block";
			r.style.display = "block";
			f.style.display = "none";
			b.style.display = "none";
			c.style.display = "none";
			
			s.innerHTML = "formatted";
		} else {
			m.style.display = "block";
			c.style.display = "none";
			r.style.display = "none";
			b.style.display = "none";
			f.style.display = "block";
			
			s.innerHTML = "raw";
		}
	}
}();