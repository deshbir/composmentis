/**
 * Created with IntelliJ IDEA.
 * User: preeti
 * Date: 5/24/12
 * Time: 6:53 PM
 * To change this template use File | Settings | File Templates.
 */

var preloaderViews =  {
    "ngldemo/myelt/singlepage/index":'<!-- Top Green section - the Big Hero Unit --> <div id="hero" class="container"> <!-- Top  Navbar for logo, brand, menu, and language selection --> <div class="navbar"> <div class="navbar-inner"> <div class="container"> <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <!-- This is shown for mobile devices - collapsed icon --> <i class="icon-align-justify"></i> </a> <a class="brand" title="Return to NGL Wireframe options" href="#"><img src="public/images/ngldemo/placeholder_ng_logo.png" alt="MyELT logo"><span>MyELT</span></a> <div class="nav-collapse"> <ul class="nav pull-right"> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img alt="User Menu and Options" src="public/images/glyphicons/glyphicons_003_user.png" alt="User Preferences Menu"><b class="caret"></b></a> <ul class="dropdown-menu"> <li><a href="#"> (Profile)</a></li> <li class="divider"></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Switch to online mode</a></li> </ul> </li> </ul> </div><!--/.nav-collapse --> </div> </div> </div> <div class="row"> <div class="span6"> <h1>Online classroom for english learning</h1> <p>Looking for a quick and easy way to implement new and exciting ideas in your classroom?</p> <p><a class="btn btn-large" href=" #/ngldemo/myelt/singlepage/home">My Courses <small>(John Doe)</small></a></p> <p><a class="btn btn-large" href=" #/ngldemo/myelt/singlepage/activity">Resume Assignment <small>(Milestones)</small></a></p> </div> <div class="span5 offset1"> <div id="carouseltop" class="carousel slide"> <!-- Carousel items --> <div class="carousel-inner"> <div class="item active"> <img src="public/images/ngldemo/placeholder_459_254.gif" alt="Milestones"> </div> <div class="item"> <img src="public/images/ngldemo/placeholder_459_254.gif" alt="Pathways"> </div> </div> <!-- Carousel nav --> <a class="carousel-control left" href="#carouseltop" data-slide="prev">&lsaquo;</a> <a class="carousel-control right" href="#carouseltop" data-slide="next">&rsaquo;</a> </div> <p><a class="btn btn-large" rel="tooltip" data-original-title="Not active in demo" href="#">Take a tour</a></p> </div> </div> </div>  <!-- End of Hero Unit --> <!-- Three column, but responsive, product descriptions --> <div id="products" class="container"> <div class="row"> <div class="span4"> <h2><img alt="eEnglish product icon" src="public/images/glyphicons/glyphicons_030_pencil.png">eEnglish</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> <div class="span4"> <h2><img alt="Grammar Cafe product icon" src="public/images/glyphicons/glyphicons_010_envelope.png">Grammar Cafe</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> <div class="span4"> <img alt="TOEFL iBT product logo" src="public/images/glyphicons/glyphicons_039_notes.png"> <h2>TOEFL iBT&reg; Online</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> </div> <div class="row"> <div class="span4"> <h2><img alt="Milestones product icon" src="public/images/glyphicons/glyphicons_042_pie_chart.png">Milestones</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> <div class="span4"> <h2><img alt="World Pass Online product icon" src="public/images/glyphicons/glyphicons_060_compass.png">World Pass Online</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> <div class="span4"> <h2><img alt="World Pass Online product icon" src="public/images/glyphicons/glyphicons_060_compass.png">My FCE</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> </div> </div> <div id="support" class="container"> <div class="row"> <div class="span4"> <h2>For Teachers</h2> <ul> <li>Hundreds of pre-built NGL online exercises, practice tests, and activities</li> <li>Assign activities in a few quick, easy steps</li> <li>Consolidate and reinforce classroom learning or for self study</li> <li>Track individual student and classroom progress</li> <li>Create individual and classroom grade reports</li> <li>Save time planning lessons</li> </ul> </div> <div class="span4"> <h2>For Students</h2> <ul> <li>Study outside of the classroom -- anywhere, anytime</li> <li>Track progress to see how well skills have been mastered</li> <li>Get instant feedback through automatically graded activities</li> <li>Work with interactive activities including audio and video</li> </ul> </div> <div class="span4"> <h2>About</h2> <p>National Geographic Learning, part of Cengage Learning, is a provider of high quality educational materials for the K-12, higher education, adult education and ELT markets.</p> </div> </div> <div id="footer" class="row"> <div class="span12"> <p>Copyright 2012 National Geographic Learning, Cengage Learning</p> </div> </div> </div>',
    "ngldemo/myelt/singlepage/home":'<!-- Top Green Container--> <div id="main-header" class="container"> <div class="navbar"> <div class="navbar-inner"> <div class="container"> <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <!-- This is shown for mobile devices - collapsed icon --> <i class="icon-align-justify"></i> </a> <a class="brand" href=" #/ngldemo/myelt/singlepage/index"> <img src="public/images/ngldemo/placeholder_ng_logo.png" alt="MyELT logo"><span>MyELT</span> </a> <div id="loadingIcon"> <img src="public/images/ajax_loader.gif"> </div> <div class="nav-collapse"> <ul class="nav pull-right"> <li class="active"><a href= #/ngldemo/myelt/singlepage/home>Courses</a></li> <li class=""><a href= #/ngldemo/myelt/singlepage/activity>Assignments</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Materials</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Grades</a></li> <li class="divider-vertical"></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img alt="User Menu and Options"  src="public/images/glyphicons/glyphicons_003_user.png"><b class="caret"></b></a> <ul class="dropdown-menu"> <li><a href="#"> (Profile)</a></li> <li class="divider"></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Switch to online mode</a></li> </ul> </li> </ul> </div><!--/.nav-collapse --> </div> </div> </div>   <!-- End of Nav bar--> </div>  <!-- End of Container --> <!-- Top  Navbar for logo, brand, menu, and language selection --> <!-- Main Page --> <div id="main-body" class="container"> <h1 class="ngl-page-header">Courses</h1> <div class="row"> <div class="span8"> <div class="accordion" id="courselist"> <div class="accordion-group"> <div class="accordion-heading"> <a class="accordion-toggle" data-toggle="collapse" data-parent="courselist" href="#course1"> <img alt="" src="public/images/glyphicons/glyphicons_153_more_windows.png"> <span>Learning English, Part 1</span> <small>CNB00321</small> </a> </div> <div id="course1" class="accordion-body collapse in"> <div class="accordion-inner"> <div class="row-fluid"> <div class="span8"> <h2>Instructor(s): <strong>John Doe</strong></h2> <p><small>1st June 2012 to 31st July 2012</small></p> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> <a class="btn" href=" #/ngldemo/myelt/singlepage/activity">Start Assignments / Tests &gt;&gt;</a></p> <a class="btn" rel="tooltip" data-original-title="Not active in demo" href="#">View Gradebook / Progress &gt;&gt;</a></p> </div> <div class="span4"> <h2>Related Materials / books:</h2> <ul class="unstyled"> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Pathways Level 1</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Pathways Level 2</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Pathways Level 3</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Pathways Level 4</a></li> </ul> </div> </div> </div> </div> </div> <div class="accordion-group"> <div class="accordion-heading"> <a class="accordion-toggle" data-toggle="collapse" data-parent="courselist" href="#course2"> <img alt="" src="public/images/glyphicons/glyphicons_153_more_windows.png"> <span>Learning English, Part 2</span> <small>CNB00322</small> </a> </div> <div id="course2" class="accordion-body collapse"> <div class="accordion-inner"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante. </div> </div> </div> <div class="accordion-group"> <div class="accordion-heading"> <a class="accordion-toggle" data-toggle="collapse" data-parent="courselist" href="#course3"> <img alt="" src="public/images/glyphicons/glyphicons_153_more_windows.png"> <span>Pronunciation</span> <small>CNB00101</small> </a> </div> <div id="course3" class="accordion-body collapse"> <div class="accordion-inner"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante. </div> </div> </div> <div class="accordion-group"> <div class="accordion-heading"> <a class="accordion-toggle" data-toggle="collapse" data-parent="courselist" href="#course4"> <img alt=""  src="public/images/glyphicons/glyphicons_153_more_windows.png"> <span>TOEFL</span> <small>TFL0001</small> </a> </div> <div id="course4" class="accordion-body collapse"> <div class="accordion-inner"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante. </div> </div> </div> </div> </div> <div class="span4"> <h2>Add new resources...</h2> <ul class="unstyled resources-list"> <li>Do you have a new product code packaged as part of your NGL textbook (looks like TLE365-4F9T2MERUYX82)? <a class="btn" rel="tooltip" data-original-title="Not active in demo" href="#">Register product code</a></li> <li>Do you have a course key supplied by your teacher (looks like E-Y5RKWWZMPSY55)? <a class="btn" rel="tooltip" data-original-title="Not active in demo" href="#">Register course key</a></li> <li>Looking for an existing instructor-led course? <a class="btn" rel="tooltip" data-original-title="Not active in demo" href="#">Enroll into a course</a></li> </ul> <h2>Related links...</h2> <ul > <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Lorem ipsum dolor sit amet, consectetur</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Lorem ipsum dolor sit amet, consectetur</a></li> </ul> </div> </div> <h1 class="ngl-page-header">Dictionaries</h1> <div class="row"> <div class="span6 media"> <h3>American English</h3> <a class="pull-left" rel="tooltip" data-original-title="Not active in demo" href="#"><img src="public/images/ngldemo/placeholder_148_120.png" alt="American English Dictionary"></a> <div class="media-body"> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor.</p> </div> </div> <div class="span6 media"> <h3>Collins COBUILD</h3> <a class="pull-left" rel="tooltip" data-original-title="Not active in demo" href="#"><img src="public/images/ngldemo/placeholder_148_120.png" alt="Collin COBUILD Dictionary"></a> <div class="media-body"> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor.</p> </div> </div> </div> </div> <!-- Footer --> <div id="main-footer" class="container"> <div class="row"> <div class="span12"> <p>Copyright 2012 National Geographic Learning, Cengage Learning</p> </div> </div> </div>',
    "ngldemo/myelt/singlepage/activity":'<!-- Top Green Container--> <div id="main-header" class="container"> <div class="navbar"> <div class="navbar-inner"> <div class="container"> <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <!-- This is shown for mobile devices - collapsed icon --> <i class="icon-align-justify"></i> </a> <a class="brand" href=" #/ngldemo/myelt/singlepage/index"> <img src="public/images/ngldemo/placeholder_ng_logo.png" alt="MyELT logo"><span>MyELT</span> </a> <div id="loadingIcon"> <img src="public/images/ajax_loader.gif"> </div> <div class="nav-collapse"> <ul class="nav pull-right"> <li class=""><a href= #/ngldemo/myelt/singlepage/home>Courses</a></li> <li class="active"><a href= #/ngldemo/myelt/singlepage/activity>Assignments</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Materials</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Grades</a></li> <li class="divider-vertical"></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img alt="User Menu and Options"  src="public/images/glyphicons/glyphicons_003_user.png"><b class="caret"></b></a> <ul class="dropdown-menu"> <li><a href="#"> (Profile)</a></li> <li class="divider"></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Switch to online mode</a></li> </ul> </li> </ul> </div><!--/.nav-collapse --> </div> </div> </div>   <!-- End of Nav bar--> </div>  <!-- End of Container --> <!-- Main Page --> <div id="main-body" class="container"> <h1 class="ngl-page-header header-no-space">Course Materials</h1> <ul class="breadcrumb"> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Milestones Level 1</a> <span class="divider">/</span></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Unit 1</a> <span class="divider">/</span></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Lesson A</a> <span class="divider">/</span></li> <li class="active">Drag & Drop, Form a Sentence</li> </ul> <div class="btn-toolbar rightfloat activitytools activitytools-top"> <div class="btn-group"> <a class="btn btn-arrow" rel="tooltip" data-original-title="Not active in demo" href="#">&lt;</a> <a class="btn btn-toc" rel="tooltip" data-original-title="Not active in demo" href="#">Table of Contents</a> <a class="btn btn-arrow" rel="tooltip" data-original-title="Not active in demo" href="#">&gt;</a> </div> <div class="btn-group"> <a class="btn btn-retake">Retake</a> </div> <div class="btn-group"> <a class="btn btn-submit">Submit</a> </div> </div> <div class="clearboth well dark-well"> <h2>Milestones Tracker</h2> <h3><strong>Drag & Drop, Form a Sentence</strong></h3> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante. </p> <div id="engine"></div> <div class="row"> <div id="containerParent" class="span10 offset1"> <div id="containerDiv"></div> </div> </div> <div class="row"> <div class="span10 offset1"> <div class="btn-toolbar activitytools"> <div class="btn-group"> <a class="btn btn-small" rel="tooltip" data-original-title="Not active in demo" href="#">Show Answers</a> </div> <div class="btn-group"> <a class="btn btn-prev"> &lt;&lt; </a> <a class="btn">1 of 10</a> <a class="btn btn-next"> &gt;&gt; </a> </div> </div> </div> </div> </div> <div class="btn-toolbar rightfloat activitytools"> <div class="btn-group btn-group-action"> <a class="btn btn-toc-prev" rel="tooltip" data-original-title="Not active in demo" href="#">&lt;</a> <a class="btn btn-toc" rel="tooltip" data-original-title="Not active in demo" href="#">Table of Contents</a> <a class="btn btn-toc-next" rel="tooltip" data-original-title="Not active in demo" href="#">&gt;</a> </div> <div class="btn-group btn-group-action"> <a class="btn btn-retake">Retake</a> </div> <div class="btn-group btn-group-action"> <a class="btn btn-submit">Submit</a> </div> </div> <div class="clearboth"></div> </div> <div id="main-footer" class="container"> <div class="row"> <div class="span12"> <p>Copyright 2012 National Geographic Learning, Cengage Learning</p> </div> </div> </div>',

    "ngldemo/ngconnect/singlepage/index":'<!-- Top Green section - the Big Hero Unit --> <div id="hero" class="container"> <!-- Top  Navbar for logo, brand, menu, and language selection --> <div class="navbar"> <div class="navbar-inner"> <div class="container"> <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <!-- This is shown for mobile devices - collapsed icon --> <i class="icon-align-justify"></i> </a> <a class="brand" title="Return to NGL Wireframe options" href="#"> <img src="public/images/ngldemo/placeholder_ng_logo.png" alt="myNGConnect logo"><span>myNGConnect</span> </a> <div class="nav-collapse"> <ul class="nav pull-right"> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img alt="User Menu and Options" src="public/images/glyphicons/glyphicons_003_user.png"><b class="caret"></b></a> <ul class="dropdown-menu"> <li><a href="#"> (Profile)</a></li> <li class="divider"></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Switch to online mode</a></li> </ul> </li> </ul> </div><!--/.nav-collapse --> </div> </div> </div> <div class="row"> <div class="span8"> <h1>Welcome to myNGConnect!</h1> <p>One-stop portal for online materials available with your favorite National Geographic School Publishing instructional programs.</p> <p><a class="btn btn-large" rel="tooltip" data-original-title="Not active in demo" href="#">Take a tour</a></p> </div> <div class="span4 large-home-buttons"> <p><a class="btn" href=" #/ngldemo/ngconnect/singlepage/home"><i class="icon-home"></i><span>Science Home<small>(John Doe)</small></span></a></p> <p><a class="btn" href=" #/ngldemo/ngconnect/singlepage/reader"><i class="icon-bookmark"></i><span>Start Reading <small>(Earth Science)</small></span></a></p> </div> </div> </div>  <!-- End of Hero Unit --> <!-- Three column, but responsive, product descriptions --> <div id="products" class="container"> <div class="row"> <div class="span4"> <h2><img alt="Reach product icon" src="public/images/glyphicons/glyphicons_080_retweet.png">Reach</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> <div class="span4"> <img alt="Reach for Reading product icon" src="public/images/glyphicons/glyphicons_081_refresh.png"> <h2>Reach for Reading</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> <div class="span4"> <h2><img alt="Science product icon" src="public/images/glyphicons/glyphicons_320_filter.png">Science</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> </div> <div class="row"> <div class="span4"> <h2><img alt="World Cultures & Goegraphy product icon" src="public/images/glyphicons/glyphicons_340_globe.png">World Cultures and Geography</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> <div class="span4"> <h2><img alt="Our World product icon" src="public/images/glyphicons/glyphicons_242_google_maps.png">Our World</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> <div class="span4"> <h2><img alt="Comprehension Coach product icon" src="public/images/glyphicons/glyphicons_077_headset.png">Comprehension Coach</h2> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Aenean volutpat velit lectus, non lacinia ante.</p> </div> </div> </div> <div id="support" class="container"> <div class="row"> <div class="span4"> <h2>For Teachers</h2> <ul> <li>Hundreds of pre-built NGL online exercises, practice tests, and activities</li> <li>Assign activities in a few quick, easy steps</li> <li>Consolidate and reinforce classroom learning or for self study</li> <li>Track individual student and classroom progress</li> <li>Create individual and classroom grade reports</li> <li>Save time planning lessons</li> </ul> </div> <div class="span4"> <h2>For Students</h2> <ul> <li>Study outside of the classroom -- anywhere, anytime</li> <li>Track progress to see how well skills have been mastered</li> <li>Get instant feedback through automatically graded activities</li> <li>Work with interactive activities including audio and video</li> </ul> </div> <div class="span4"> <h2>About</h2> <p>National Geographic Learning, part of Cengage Learning, is a provider of high quality educational materials for the K-12, higher education, adult education and ELT markets.</p> </div> </div> <div id="footer" class="row"> <div class="span12"> <p>Copyright 2012 National Geographic Learning, Cengage Learning</p> </div> </div> </div>',
    "ngldemo/ngconnect/singlepage/home":'<!-- Top Green Container--> <div id="main-header" class="container"> <div class="navbar"> <div class="navbar-inner"> <div class="container"> <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <!-- This is shown for mobile devices - collapsed icon --> <i class="icon-align-justify"></i> </a> <a class="brand" href=" #/ngldemo/ngconnect/singlepage/index"> <img src="public/images/ngldemo/placeholder_ng_logo.png" alt="myNGConnect logo"><span>myNGConnect</span> </a> <div id="loadingIcon"> <img src="public/images/ajax_loader.gif"> </div> <div class="nav-collapse"> <ul class="nav pull-right"> <li class="active"><a href= #/ngldemo/ngconnect/singlepage/home>Home</a></li> <li class=""><a href= #/ngldemo/ngconnect/singlepage/reader>Books</a></li> <li class=""><a rel="tooltip" data-original-title="Not active in demo" href="#">Library</a></li> <li class="divider-vertical"></li> <li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img alt="User Menu and Options"  src="public/images/glyphicons/glyphicons_003_user.png"><b class="caret"></b></a> <ul class="dropdown-menu"> <li><a href="#"> (Profile)</a></li> <li class="divider"></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Switch to online mode</a></li> </ul> </li> </ul> </div><!--/.nav-collapse --> </div> </div> </div>   <!-- End of Nav bar--> </div>  <!-- End of Container --> <!-- Top  Navbar for logo, brand, menu, and language selection --> <!-- Main Page --> <div id="main-body" class="container"> <h1 class="ngl-page-header reader-book-heading"><small>NATIONAL GEOGRAPHIC</small><strong>Science</strong></h1> <div class="row"> <div class="span7 ngl-book-carousel"> <div id="carouseltop" class="carousel slide"> <!-- Carousel items --> <div class="carousel-inner"> <div class="item active"> <img src="public/images/ngldemo/placeholder_730_480_1.gif" alt="Big Ideas Book - Earth Science"> </div> <div class="item"> <img src="public/images/ngldemo/placeholder_730_480_2.gif" alt="Big Ideas Book - Physical Science"> </div> <div class="item"> <img src="public/images/ngldemo/placeholder_730_480_3.gif" alt="Big Ideas Book - Life Science"> </div> </div> <!-- Carousel nav --> <a class="carousel-control left" href="#carouseltop" data-slide="prev">&lsaquo;</a> <a class="carousel-control right" href="#carouseltop" data-slide="next">&rsaquo;</a> </div> <p> <a class="btn" href=" #/ngldemo/ngconnect/singlepage/reader"><i class="icon-book"></i>Start Reading <small>(Earth Science)</small></a> </p> </div> <div class="span5 large-button-icons"> <p><a class="btn" rel="tooltip" data-original-title="Not active in demo" href="#"><i class="icon-facetime-video"></i>Digital Library <small>(Lorem ipsum dolor sit amet, consectetur)</small></a></p> <p><a class="btn" rel="tooltip" data-original-title="Not active in demo" href="#"><i class="icon-th"></i>Games <small>(Lorem ipsum dolor sit amet, consectetur)</small></a></p> <p><a class="btn" rel="tooltip" data-original-title="Not active in demo"  href="#"><i class="icon-cog"></i>Student Resources <small>(Lorem ipsum dolor sit amet, consectetur)</small></a></p> <p><a class="btn" rel="tooltip" data-original-title="Not active in demo" href="#"><i class="icon-th-list"></i>My Assignments <small>(Lorem ipsum dolor sit amet, consectetur)</small></a></p> <h2>Related links...</h2> <ul > <li><a  rel="tooltip" data-original-title="Not active in demo" href="#">Lorem ipsum dolor sit amet, consectetur</a></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Lorem ipsum dolor sit amet, consectetur</a></li> </ul> </div> </div> <h1 class="ngl-page-header">Student Tools</h1> <div class="row"> <div class="span6 media"> <h3>National Geographic KIDS</h3> <a class="pull-left" rel="tooltip" data-original-title="Not active in demo" href="#"><img src="public/images/ngldemo/placeholder_148_120.png" alt="National Geographic KIDS"></a> <div class="media-body"> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor.</p> </div> </div> <div class="span6 media"> <h3>National Geographic Explorer</h3> <a class="pull-left" rel="tooltip" data-original-title="Not active in demo" href="#"><img src="public/images/ngldemo/placeholder_148_120.png" alt="National Geographic Explorer"></a> <div class="media-body"> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in diam sit amet sapien pharetra auctor.</p> </div> </div> </div> </div> <!-- Footer --> <div id="main-footer" class="container"> <div class="row"> <div class="span12"> <p>Copyright 2012 National Geographic Learning, Cengage Learning</p> </div> </div> </div>',
    "ngldemo/ngconnect/singlepage/reader":'<!-- Top Green Container--> <div class="navbar navbar-reader navbar-fixed-top"> <div class="navbar-inner"> <div class="container-fluid"> <a class="btn btn-navbar " data-toggle="collapse" data-target=".nav-collapse"> <!-- This is shown for mobile devices - collapsed icon --> <i class="icon-align-justify"></i> </a> <a class="brand" href=" #/ngldemo/ngconnect/singlepage/index"> <h2><i class="icon-book"></i> Science</h2> <h3>Earth Science - Unit 1</h3> </a> <div class="nav-collapse"> <ul class="nav pull-right"> <li class=""><a href= #/ngldemo/ngconnect/singlepage/home>Home</a></li> <li class="active"><a href= #/ngldemo/ngconnect/singlepage/reader>Books</a></li> <li class=""><a rel="tooltip" data-original-title="Not active in demo" href="#">Library</a></li> <li class="divider-vertical pull-right"></li> <li class="dropdown pull-right"> <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img alt="User Menu and Options" src="public/images/glyphicons/glyphicons_003_user.png"><b class="caret"></b></a> <ul class="dropdown-menu"> <li><a href="#"> (Profile)</a></li> <li class="divider"></li> <li><a rel="tooltip" data-original-title="Not active in demo" href="#">Switch to online mode</a></li> </ul> </li> </ul> </div><!--/.nav-collapse --> </div> </div> </div>   <!-- End of Nav bar--> <!-- Main Page --> <section id="pagecontent"> <div id="eedition-container"> <div id="eeditionpagedivA" class="eeditionpagediv"> <img id="eeditionpageA" src="public/images/reader/eedition/defaultPage.png" alt="Page A"/> </div> <div id="eeditionpagedivB" class="eeditionpagediv"> <img id="eeditionpageB" src="public/images/reader/eedition/defaultPage.png" alt="Page B"/> </div> </div> <div id="ee-overlays"> </div> <div id="ee-book-toolbar" class="ee-book-toolbar-wrapper"> <div class="ee-book-toolbar"> <div class="ee-tool-row1"> <div id="ee-currentPage" class="ee-nav" align="center">1-1 / 12</div> </div> <div class="ee-tool-row2"> <div id="prevPageEdition" class="ee-prev" title="Previous page"></div> <div id="nextPageEdition" class="ee-next" title="Next page"></div> </div> <div class="ee-tool-row3"> <div id="zoomInEdition" class="ee-zoomin" title="Zoom In"></div> <div id="zoomOutEdition" class="ee-zoomout" title="Zoom Out"></div> </div> <div class="ee-tool-row4"> <div id="ee-page-layout" class="ee-layout-single" title="Switch to single page view"></div> </div> <div class="ee-tool-row5"> <div id="ee-fullscreenEdition" class="ee-enter_fullscreen" title="Enter Fullscreen"></div> </div> </div> </div> </section> <div id="main-footer" class="container-fluid footer-reader"> <div class="row-fluid"> <div class="span12"> <p>Copyright 2012 National Geographic Learning, Cengage Learning</p> </div> </div> </div>'
}
