composmentis
============

<offline-app>   -- create folder
    change application.conf -- make it false for compression & minification
	index.html  -- DOWNLOAD HTML - http://localhost:9001/ngldemo/myelt/offline/singlepage
	- update /public/ to public/

	- update bootstrap & responsive css

	<public>   --- copy from project
		javascripts
		  - replace /public/ to public/ in app/main.js

		css
		   - update font paths in bootstrap.css
		     replace - /public/bootstrap/less/../../font to ../../font
           - update /public/ to public/ in reader/book1.js & reader/edition.js

		preloaded-views.js - update the template view
		  - change  /public/ to public/

References:
'Font Awesome - http://fortawesome.github.com/Font-Awesome'