composmentis
============

<offline-app>   -- create folder
	index.html  -- DOWNLOAD HTML - http://localhost:9001/ngldemo/myelt/offline/singlepage
	- update /public/ to public/
    - set global_offline_mode (script tag) to 1   === AUTO
##    - change .less to .css   === AUTO
##    - include cordova    === AUTO

	<public>   --- copy from project
		javascripts
		  - update /public/ to public/ in app/main.js
##		   - update /public/ to public/ in activity-engine/container.js  === FIX
		content
		css
		images

	<offline-data>  -- create folder

		preloaded-views.js - new file
		                "ngldemo/myelt/singlepage/index":"Index",
		                "ngldemo/myelt/singlepage/authenticate" ?

			            "ngldemo/myelt/singlepage/login":"Login",
			            "ngldemo/myelt/singlepage/logout":"Login",

			            "ngldemo/myelt/singlepage/home":"Home",
			            "ngldemo/myelt/singlepage/activity":"Activity",
			            "ngldemo/myelt/singlepage/splash":"Splash"
		preloaded-models.js


References:
'Font Awesome - http://fortawesome.github.com/Font-Awesome'


1. Index.html - manual
2. main.js - launch of index
	Chnage in

	$('#backbone_container').fadeOut(0, function() {
                    $(this).html(template);
                    $(this).fadeIn(400);
         });
3. Preloaded.js - change offline to singlepage
4. reader.css - chnage public/ to ../
5. remove gs and update bootstrap & responsive css