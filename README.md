composmentis
============

<offline-app>   -- create folder
	index.html  -- DOWNLOAD HTML - http://host:port/ngldemo/myelt/offline/splash
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
			            "ngldemo/index":"Index",
          			    "ngldemo/login":"Login",
			            "ngldemo/home":"Home",
			            "ngldemo/activity":"Activity",
			            "ngldemo/splash":"Splash"
		preloaded-models.js

