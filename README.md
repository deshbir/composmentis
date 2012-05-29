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
		                "ngldemo/ngconnect/singlepage/index":"Index",
			            "ngldemo/ngconnect/singlepage/login":"Login",
			            "ngldemo/ngconnect/singlepage/home":"Home",
			            "ngldemo/ngconnect/singlepage/activity":"Activity",
			            "ngldemo/ngconnect/singlepage/splash":"Splash"
		preloaded-models.js

