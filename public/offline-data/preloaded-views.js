/**
 * Created with IntelliJ IDEA.
 * User: preeti
 * Date: 5/24/12
 * Time: 6:53 PM
 * To change this template use File | Settings | File Templates.
 */

var preloaderViews =
{
    'ngldemo/index' : '<!-- Top Green section - the Big Hero Unit --><div id="hero" class="container"><!-- Top  Navbar for logo, brand, menu, and language selection --><div class="navbar"><div class="navbar-inner"><div class="container"><a class="btn btn-navbar" data-toggle="collapse"   data-target=".nav-collapse"><!-- This is shown for mobile devices - collapsed icon --><i class="icon-align-justify"></i></a><a class="brand" href="#"><img src="public/images/ngldemo/logo.png" alt="">NGL</a><div class="nav-collapse"><ul class="nav pull-right"><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Language<span>(en)</span><b class="caret"></b></a><ul class="dropdown-menu"><li><a href="?lang=en">English</a></li><li><a href="?lang=ja">Japanease</a></li><li><a href="?lang=ar">Arabic</a></li></ul></li></ul></div><!--/.nav-collapse --></div></div></div><div class="row"><div class="span6"><h1>Online classroom for english learning</h1><p>Looking for a quick and easy way to implement new and exciting ideas in your classroom?</p><p><a class="btn btn-large" href="#/ngldemo/login">New Users <small>(Register)</small></a></p><p><a class="btn btn-large" href="#/ngldemo/login">Returning Users <small>(Sign In)</small></a></p></div><div class="span5 offset1"><div id="carouseltop" class="carousel slide"><!-- Carousel items --><div class="carousel-inner"><div class="item active"><img src="public/images/ngldemo/home/gc.png" alt=""></div><div class="item"><img src="public/images/ngldemo/home/gc.png" alt=""></div></div><!-- Carousel nav --><a class="carousel-control left" href="#carouseltop" data-slide="prev">&lsaquo;</a><a class="carousel-control right" href="#carouseltop" data-slide="next">&rsaquo;</a></div><p><a class="btn btn-large" href="">Take a tour</a></p></div></div></div>  <!-- End of Hero Unit --><!-- Three column, but responsive, product descriptions --><div id="products" class="container"><div class="row"><div class="span4"><img src="public/images/glyphicons/glyphicons_030_pencil.png"><h3>eEnglish</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p></div><div class="span4"><img src="public/images/glyphicons/glyphicons_010_envelope.png"><h3>Grammar Cafe</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p></div><div class="span4"><img src="public/images/glyphicons/glyphicons_039_notes.png"><h3>TOEFL iBT&reg; Online</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p></div></div><div class="row"><div class="span4"><img src="public/images/glyphicons/glyphicons_042_pie_chart.png"><h3>Milestones</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p></div><div class="span4"><img src="public/images/glyphicons/glyphicons_060_compass.png"><h3>World Pass Online</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p></div><div class="span4"><img src="public/images/glyphicons/glyphicons_163_iphone.png"><h3>My FCE</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p></div></div><div class="row"><div class="span4"><img src="public/images/glyphicons/glyphicons_043_group.png"><h3>Visions</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p></div></div></div><div id="support" class="container"><div class="row"><div class="span4"><h2>For Teachers</h2><ul><li>Hundreds of pre-built Heinle online exercises, practice tests, and activities</li><li>Assign activities in a few quick, easy steps</li><li>Consolidate and reinforce classroom learning or for self study</li><li>Track individual student and classroom progress</li><li>Create individual and classroom grade reports</li><li>Save time planning lessons</li></ul></div><div class="span4"><h2>For Students</h2><ul><li>Study outside of the classroom -- anywhere, anytime</li><li>Track progress to see how well skills have been mastered</li><li>Get instant feedback through automatically graded activities</li><li>Work with interactive activities including audio and video</li></ul></div><div class="span4"><h2>About</h2><p>NGL delivers engaging activities to English language learners which reinforce and consolidate the language and skills covered in each Heinle program.</p></div></div><div id="footer" class="row"><div class="span12"><p>Copyright 2012 HEINLE, Cengage Learning</p></div></div></div>',
    'ngldemo/login' : '<!-- Top Green Container--><div id="main-header" class="container"><div class="navbar"><div class="navbar-inner"><div class="container"><a class="btn btn-navbar" data-toggle="collapse"   data-target=".nav-collapse"><!-- This is shown for mobile devices - collapsed icon --><i class="icon-align-justify"></i></a><a class="brand" href="#/ngldemo/index"><img src="public/images/ngldemo/logo.png" alt="">NGL</a><div id="loadingIcon"><img src="public/images/ajax_loader.gif"></div><div class="nav-collapse"><ul class="nav pull-right"><li class="active"><a href="#">Courses</a></li><li><a href="#">Assignments</a></li><li><a href="#">Materials</a></li><li><a href="#">Grades</a></li><li><a href="#">Library</a></li><li class="divider-vertical"></li><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="public/images/glyphicons/glyphicons_003_user.png"><b class="caret"></b></a><ul class="dropdown-menu"><li><a href="?lang=en">Deshbir Singh Dugal (profile)</a></li><li class="divider"></li><li><a href="?lang=en">Change Password</a></li><li><a href="?lang=ja">Preferences</a></li><li><a href="?lang=ar">Sign out</a></li></ul></li><li class="divider-vertical"></li><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Language<span>(en)</span><b class="caret"></b></a><ul class="dropdown-menu"><li><a href="?lang=en">English</a></li><li><a href="?lang=ja">Japanease</a></li><li><a href="?lang=ar">Arabic</a></li></ul></li></ul></div><!--/.nav-collapse --></div></div></div>   <!-- End of Nav bar--></div>  <!-- End of Container --><!-- Top  Navbar for logo, brand, menu, and language selection --><!-- Main Page --><div id="main-body" class="container"><h1 class="ngl-page-header">Log in to your Account</h1><div class="row"><div class="span12"><form class="well loginform" action="#home"  method="post"  accept-charset="utf-8" enctype="application/x-www-form-urlencoded"><label>Enter your credentials</label><fieldset><input type="text" name="username" class="input-xlarge" placeholder="Email" value=""><input type="password" name="password" class="input-xlarge" placeholder="Password"><label class="checkbox"><input type="checkbox" name="remember" > Remember Me</label></fieldset><p><a href="#/ngldemo/home " class="btn btn-large">Log in <small>(submit)</small></a></p></form></div></div></div><!-- Footer --><div id="main-footer" class="container"><div class="row"><div class="span12"><p>Copyright 2012 HEINLE, Cengage Learning</p></div></div></div>',
    'ngldemo/home': '<!-- Top Green Container--><div id="main-header" class="container"><div class="navbar"><div class="navbar-inner"><div class="container"><a class="btn btn-navbar" data-toggle="collapse"   data-target=".nav-collapse"><!-- This is shown for mobile devices - collapsed icon --><i class="icon-align-justify"></i></a><a class="brand" href="#/ngldemo/index"><img src="public/images/ngldemo/logo.png" alt="">NGL</a><div id="loadingIcon"><img src="public/images/ajax_loader.gif"></div><div class="nav-collapse"><ul class="nav pull-right"><li class="active"><a href="#">Courses</a></li><li><a href="#">Assignments</a></li><li><a href="#">Materials</a></li><li><a href="#">Grades</a></li><li><a href="#">Library</a></li><li class="divider-vertical"></li><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="public/images/glyphicons/glyphicons_003_user.png"><b class="caret"></b></a><ul class="dropdown-menu"><li><a href="?lang=en">Deshbir Singh Dugal (profile)</a></li><li class="divider"></li><li><a href="?lang=en">Change Password</a></li><li><a href="?lang=ja">Preferences</a></li><li><a href="?lang=ar">Sign out</a></li></ul></li><li class="divider-vertical"></li><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Language<span>(en)</span><b class="caret"></b></a><ul class="dropdown-menu"><li><a href="?lang=en">English</a></li><li><a href="?lang=ja">Japanease</a></li><li><a href="?lang=ar">Arabic</a></li></ul></li></ul></div><!--/.nav-collapse --></div></div></div>   <!-- End of Nav bar--></div>  <!-- End of Container --><!-- Top  Navbar for logo, brand, menu, and language selection --><!-- Main Page --><div id="main-body" class="container"><h1 class="ngl-page-header">Courses</h1><div class="row"><div class="span8"><div class="accordion" id="courselist"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="courselist" href="#course1"><img src="public/images/glyphicons/glyphicons_153_more_windows.png"><span>Learning English, Part 1</span><small>CNB00321</small></a></div><div id="course1" class="accordion-body collapse in"><div class="accordion-inner"><div class="row-fluid"><div class="span8"><h2>Instructor(s): <strong>John Doe</strong></h2><p><small>1st June 2012 to 31st July 2012</small></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p><a class="btn" href="#/ngldemo/activity">Start Assignments & Tests &gt;&gt;</a></p><a class="btn" href="#/ngldemo/activity">View Gradebook / Progress &gt;&gt;</a></p></div><div class="span4"><h2>Related Materials / books:</h2><ul class="unstyled"><li><a>Pathways Level 1</a></li><li><a>Pathways Level 2</a></li><li><a>Pathways Level 3</a></li><li><a>Pathways Level 4</a></li></ul></div></div></div></div></div><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="courselist" href="#course2"><img src="public/images/glyphicons/glyphicons_153_more_windows.png"><span>Learning English, Part 2</span><small>CNB00322</small></a></div><div id="course2" class="accordion-body collapse"><div class="accordion-inner">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</div></div></div><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="courselist" href="#course3"><img src="public/images/glyphicons/glyphicons_153_more_windows.png"><span>Pronunciation</span><small>CNB00101</small></a></div><div id="course3" class="accordion-body collapse"><div class="accordion-inner">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</div></div></div><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="courselist" href="#course4"><img src="public/images/glyphicons/glyphicons_153_more_windows.png"><span>TOEFL</span><small>TFL0001</small></a></div><div id="course4" class="accordion-body collapse"><div class="accordion-inner">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</div></div></div></div></div><div class="span4"><h2>Add new resources...</h2><ul class="unstyled resources-list"><li>Do you have a new product code packaged as part of your NGL textbook (looks like TLE365-4F9T2MERUYX82)? <a class="btn" href="#">Register product code</a></li><li>Do you have a course key supplied by your teacher (looks like E-Y5RKWWZMPSY55)? <a class="btn" href="#">Register course key</a></li><li>Looking for an existing instructor-led course? <a class="btn" href="#">Enroll into a course</a></li></ul><h2>Related links......</h2><ul class="unstyled"><li><a>...........</a></li><li><a>...........</a></li></ul></div></div><h1 class="ngl-page-header">Dictionaries and Resources</h1><div class="row"><div class="span4 media"><h3>American English</h3><a class="pull-left" href="#"><img src="public/images/ngldemo/dummy_image_type2.png"></a><div class="media-body"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor.</p></div></div><div class="span4 media"><h3>Collins COBUILD</h3><a class="pull-left" href="#"><img src="public/images/ngldemo/dummy_image_type2.png"></a><div class="media-body"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor.</p></div></div></div></div><!-- Footer --><div id="main-footer" class="container"><div class="row"><div class="span12"><p>Copyright 2012 HEINLE, Cengage Learning</p></div></div></div>',
    'ngldemo/activity': '<!-- Top Green Container--><div id="main-header" class="container"> <div class="navbar"> <div class="navbar-inner"> <div class="container"> <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <!-- This is shown for mobile devices - collapsed icon --> <i class="icon-align-justify"></i> </a> <a class="brand" href=" #/ngldemo/index"><img src="public/images/ngldemo/logo.png" alt="">NGL</a> <div id="loadingIcon"> <img src="public/images/ajax_loader.gif"> </div> <div class="nav-collapse"> <ul class="nav pull-right"> <li class="active"><a href="#">Courses</a></li> <li><a href="#">Assignments</a></li> <li><a href="#">Materials</a></li> <li><a href="#">Grades</a></li> <li><a href="#">Library</a></li> <li class="divider-vertical"></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="public/images/glyphicons/glyphicons_003_user.png"><b class="caret"></b></a> <ul class="dropdown-menu"> <li><a href="?lang=en">Deshbir Singh Dugal (profile)</a></li> <li class="divider"></li> <li><a href="?lang=en">Change Password</a></li> <li><a href="?lang=ja">Preferences</a></li> <li><a href="?lang=ar">Sign out</a></li> </ul> </li> <li class="divider-vertical"></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">Language<span>(en)</span><b class="caret"></b></a> <ul class="dropdown-menu"> <li><a href="?lang=en">English</a></li> <li><a href="?lang=ja">Japanease</a></li> <li><a href="?lang=ar">Arabic</a></li> </ul> </li> </ul> </div><!--/.nav-collapse --> </div> </div> </div>   <!-- End of Nav bar--> </div>  <!-- End of Container --> <!-- Main Page --> <div id="main-body" class="container"> <h1 class="ngl-page-header header-no-space">Course Materials</h1> <ul class="breadcrumb"> <li><a href="#">Milestones Level 1</a> <span class="divider">/</span></li> <li><a href="#">Unit 1</a> <span class="divider">/</span></li> <li><a href="#">Lesson A</a> <span class="divider">/</span></li> <li class="active">Drag & Drop, Form a Sentence</li> </ul> <div class="btn-toolbar rightfloat activitytools activitytools-top"> <div class="btn-group"> <a class="btn btn-arrow" href="#"><i class="icon-arrow-left"></i></a> <a class="btn btn-toc" href="#">Table of Contents</a> <a class="btn btn-arrow" href="#"><i class="icon-arrow-right"></i></a> </div> <div class="btn-group"> <a class="btn btn-retake" href="#">Retake</a> </div> <div class="btn-group"> <a class="btn btn-submit" href="#">Submit</a> </div> </div> <div class="clearboth well dark-well"> <h2>Milestones Tracker</h2> <h3><strong>Drag & Drop, Form a Sentence</strong></h3> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante. </p> <div id="engine"></div> <div class="row"> <div id="containerParent" class="span10 offset1"> <div id="containerDiv"></div> </div> </div> <div class="row"> <div class="span10 offset1"> <div class="btn-toolbar activitytools"> <div class="btn-group"> <a class="btn btn-small" href="#">Show Answers</a> </div> <div class="btn-group"> <a class="btn" href="#"> &lt;&lt; </a> <a class="btn" href="#">1 of 10</a> <a class="btn" href="#"> &gt;&gt; </a> </div> </div> </div> </div> </div> <div class="btn-toolbar rightfloat activitytools"> <div class="btn-group btn-group-action"> <a class="btn btn-toc-prev" href="#"><i class="icon-arrow-left"></i></a> <a class="btn btn-toc" href="#">Table of Contents</a> <a class="btn btn-toc-next" href="#"><i class="icon-arrow-right"></i></a> </div> <div class="btn-group btn-group-action"> <a class="btn btn-retake" href="#">Retake</a> </div> <div class="btn-group btn-group-action"> <a class="btn btn-submit" href="#">Submit</a> </div> </div> <div class="clearboth"></div> </div> <div id="main-footer" class="container"> <div class="row"> <div class="span12"> <p>Copyright 2012 HEINLE, Cengage Learning</p></div></div></div>',
    'ngldemo/splash': '<div class="container splash"> <div class="row"> <div class="span12"> <h1>National Geographic Learning (NGL)</h1> <h2>Wireframes - "Looking Ahead" <small>v0.1, June 10th, 2012</small></h2> <h6>Copyright 2012, National Geographic Learning</h6> <p>A conceptual demo for set of working wire-frames representing the National Geographic Learning "looking ahead" strategy. These wire-frames are not meant to imply any particular visual design/approach, instead they demonstrate some of the key technical and functional capabilities of front-end framework.</p> <p>The examples, content, text used across these wire-frames are placeholders only, and have not been validated for accuracy or correct contextual application.</p> <p> <span>Web app options:</span> <a class="btn btn-large" href=" #/ngldemo/index">NGConnect theme<small> (start)</small></a> <a class="btn btn-large" href=" #/ngldemo/index">MyELT theme<small> (start)</small></a> </p> <p> <span>Native app options:</span> <a class="btn btn-large" href=" #/ngldemo/index">Android app<small> (download)</small></a> <a class="btn btn-large" href=" #/ngldemo/index">iOS app<small> (register your device)</small></a> </p> </div> </div> </div>  <!-- End of Splash->'
}