var nwidth = 100;
var fullscreenOn = false;
//var eeSinglepage = false;
var eePageLayout = 0; //0:default. 1:single, 2:double
var eeSmallScreen = false;
var eeCurrentpage = -1;
var eeOverlayCalcBase = 1200;
var eeZoomState = -1;
var eeZoomChangedA = false;
var eeZoomChangedB = false;
var eeImageIconPath = "/public/images/reader/common/image_icon.svg";
var eeVideoIconPath = "/public/images/reader/common/video_icon.svg";
var eeAudioIconPath = "/public/images/reader/common/audio_icon.svg";
var bookHashMap = {
    "book1":"assets/data/book1.json", 
    "book2":"assets/data/book2.json"
};

var totalZoomStates = 9;

var spMinStateIndex = 0;
var spMaxStateIndex = 5;
var dpMinStateIndex = 2;
var dpMaxStateIndex = 8;
var eeDefaultPageSource =  "/public/images/reader/eedition/defaultPage.png";
var eeLastAudioId = "";

var zoomingStateData = [ 
{
    pcwidth:'600px', 
    spfile:'_600.jpg', 
    dpfile:'', 
    zsindex:'0'
},
{
    pcwidth:'720px', 
    spfile:'_720.jpg', 
    dpfile:'', 
    zsindex:'1'
},
{
    pcwidth:'940px', 
    spfile:'_940.jpg', 
    dpfile:'_600.jpg', 
    zsindex:'2'
},
{
    pcwidth:'1200px', 
    spfile:'_1200.jpg', 
    dpfile:'_600.jpg', 
    zsindex:'3'
},
{
    pcwidth:'1500px', 
    spfile:'_1500.jpg', 
    dpfile:'_720.jpg', 
    zsindex:'4'
},
{
    pcwidth:'1800px', 
    spfile:'_1800.jpg', 
    dpfile:'_940.jpg', 
    zsindex:'5'
},
{
    pcwidth:'2400px', 
    spfile:'', 
    dpfile:'_1200.jpg', 
    zsindex:'6'
},
{
    pcwidth:'3000px', 
    spfile:'', 
    dpfile:'_1500.jpg',     
    zsindex:'7'
},
{
    pcwidth:'3600px', 
    spfile:'', 
    dpfile:'_1800.jpg', 
    zsindex:'8'
}
];

function eeGetRequiredOverlayCount()
{
    var retCount = 0;
    if(eeCurrentpage > 0)
    {
        retCount = bookData.pages.page[eeCurrentpage - 1].assetgroupcount;
        
        if(eePageLayout != 1 && eeSmallScreen != true)
        {
            retCount = retCount + bookData.pages.page[eeCurrentpage].assetgroupcount;
        }
    }
    
    
    return retCount;
}

function eeGetAssetGroup(wcid)
{
    var retGroup = null;    
    
    var assetGrpCount = bookData.pages.page[eeCurrentpage - 1].assetgroupcount;
    for(var j = 1; j <= assetGrpCount; j++)
    {
        var tempGroup = bookData.pages.page[eeCurrentpage - 1].assetgroups.assetgroup[j - 1];
        
        if(tempGroup.id == wcid)
        {
            retGroup = tempGroup;
            break;
        }                
    } 
    
    if(retGroup == null)
    {
        if(eePageLayout != 1 && eeSmallScreen != true)
        {
            assetGrpCount = bookData.pages.page[eeCurrentpage].assetgroupcount;
        
            for(var j = 1; j <= assetGrpCount; j++)
            {
                var tempGroup = bookData.pages.page[eeCurrentpage].assetgroups.assetgroup[j - 1];

                if(tempGroup.id == wcid)
                {
                    retGroup = tempGroup;
                    break;
                }                
            } 
        
        }
    }
    
    
    return retGroup;    
}

function eeGetZoomStateForBestFit()
{
    var zoomState = -1;
    
    var winWidth = $(window).width();   
    if(winWidth > 0 && winWidth <= 960)
    {            
        if(winWidth <= 720)
        {                
            zoomState = 0; //pcwidth:600
        } 
        else // 721 to 960
        {                
            zoomState = 1; //pcwidth:720
        }
    }        
    else
    {            
        if(winWidth > 960 && winWidth <= 1200)
        {
            zoomState = 2; //pcwidth:940
        }        
        else
        {
            if(winWidth > 1200 && winWidth < 1600)                
            {
                zoomState = 3; //pcwidth:1200
            }        
            else
            {
                
                if(winWidth >= 1600 && winWidth < 1920)                
                {
                    zoomState = 4;//pcwidth:1500
        
                } 
                else
                { 
                    zoomState = 5; //pcwidth:1800
                }
            }
            zoomState = 3; //pcwidth:1200
        }
    }
    return zoomState;
    
}

function eeUpdateInitialZoomStateAndPageNo()
{    
    if(eeZoomState == -1 && eeCurrentpage == -1)
    {
        eePageLayout = 0;
        eeCurrentpage =  0;        
        
        eeZoomState = eeGetZoomStateForBestFit();                
        
        if($(window).width() < 1024)
        {        
            eeSmallScreen = true;
            $("#book-toolbar").css({
                "bottom" :"95px"
            }); 
        }
        else
        {
            eeSmallScreen = false;
        }
    }   
}

function eeUpdateResizedZoomStateAndPageNo()
{    
    if($(window).width() < 1024)
    {
        if(eeSmallScreen == false)//pagelayout == 0 check not required
        {
            if(eeZoomState > spMaxStateIndex)
            {
                eeZoomState = spMaxStateIndex;
                eeZoomChangedA = true;
                eeZoomChangedB = true;
            //alert("001 solved")
            }
            eeSmallScreen = true; 
            if(eePageLayout == 2 )
            {
                $("#page-layout").removeClass("ee-layout-single");                
            }
            else
            {
                $("#page-layout").removeClass("ee-layout-double");
            }
        }
    }
    else
    {
        if(eeSmallScreen == true)
        {
            if(eeZoomState < dpMinStateIndex)//here additional check may be needed for pagelayout != 1
            {
                eeZoomState = dpMinStateIndex;
                eeZoomChangedA = true;
                eeZoomChangedB = true;
            //alert("002 solved")// may 
            }
            eeSmallScreen = false;
            
            if(eePageLayout == 2 )
            {
                $("#page-layout").addClass("ee-layout-single");
                $("#page-layout").attr("title", "Single page");
            }
            else
            {
                $("#page-layout").addClass("ee-layout-double");
                $("#page-layout").attr("title", "Double page");
            }
            if(eeCurrentpage >= bookData.pagecount)
            {
                    
        }
        }
    }
    eeZoomChangedA = true;
    eeZoomChangedB = true;    
}

function eeCheckAndRemovePreviousAudio()
{
    if(eeLastAudioId != "")
    {
        $('#' + eeLastAudioId).remove();
        eeLastAudioId = "";
    }
}
function eeOverlayIconClicked()
{
    wcid = $(this).attr("wcid");
    wctype = $(this).attr("wctype");
    var assetGrp = eeGetAssetGroup(wcid);
    if(assetGrp != null)
    {
        var assetCount = assetGrp.assetcount;
        
        if(assetGrp.type == "aud")
        {
           
            for(var j = 1; j <= assetCount; j++)
            {
                var assetUrl=assetGrp.assets.asset[j - 1].url;
                var oggSource=assetUrl+'.ogg';
                var mp3Source=assetUrl+'.mp3';        
           
           
                var leftVal = 0;
                var topVal = 0;
                var pagWd = Number($("#eeditionpagedivA").width());
            
                leftVal = Number(assetGrp.xposition)/Number(eeOverlayCalcBase)*pagWd;
                topVal = Number(assetGrp.yposition)/Number(eeOverlayCalcBase)*pagWd + 50;            
            
                if(eeLastAudioId != wcid)
                {
                    if(eeLastAudioId != "")
                    {
                        eeCheckAndRemovePreviousAudio();
                    }
                    eeLastAudioId = wcid;            
            
                    $('#overlays').append('<div id="'+ wcid+'" class="audio1" style="left:' + leftVal + 'px;top:' + topVal + 'px;"><audio  controls="none"><source id="oggSrc" src='+oggSource+'><source id="mp3Src" src='+mp3Source+'></audio></div>');        
                }
            }
        }
        else if(assetGrp.type == "img")
        {
        
            for(var j = 1; j <= assetCount; j++)
            {
                var imageUrl=assetGrp.assets.asset[j - 1].url;
                var imageTitle=assetGrp.assets.asset[j - 1].title;

                assetGrp.assets.asset[j - 1].title = imageTitle;
                assetGrp.assets.asset[j - 1].href = 'imageviewer.html?url='+imageUrl;
            }
        
            $.fancybox(
                assetGrp.assets.asset,
                {
                    'type' : 'iframe'
                }
                );
        }

    }
    else
    {
        alert("Incorret asset group id passed");
    }    
}

function eeCreateRequiredOverlays()
{
    var requiredOLCount = eeGetRequiredOverlayCount();
    
    var existingOLCount = $('#overlays').children(".overlay").length;
    
    if(existingOLCount > requiredOLCount)
    {
        for(var j = existingOLCount; j > requiredOLCount; j--)
        {
            $('#' + olid).unbind('click', eeOverlayIconClicked); 
            $('#overlays'+j).remove();
            existingOLCount = existingOLCount - 1;
        }            
    }
    else if(existingOLCount < requiredOLCount)
    {
        for(j = existingOLCount + 1; j <= requiredOLCount; j++)
        {
            var olid = "overlays" + j;
            
            $('#overlays').append('<div id=\"' + olid + '\" class="overlay"><img class="overlay-img" src="/public/images/reader/common/image_icon.svg"/></div>');
            $('#' + olid).bind('click', eeOverlayIconClicked);                
        }
    }
}

function eeUpdateOverlaysData()
{
    var requiredOLCount = eeGetRequiredOverlayCount();
    if(eeCurrentpage > 0)
    {    
        var onFirstpage = bookData.pages.page[eeCurrentpage - 1].assetgroupcount;
        for(var j = 1; j <= requiredOLCount; j++)
        {
            var olid = "#overlays" + j;           
            var wctype = "vid";
            var wcid = "vid";
            var imgPath = eeVideoIconPath;            
                
            if(j<= onFirstpage)
            {
                wcid = bookData.pages.page[eeCurrentpage - 1].assetgroups.assetgroup[j - 1].id;
                wctype = bookData.pages.page[eeCurrentpage - 1].assetgroups.assetgroup[j - 1].type;
            }
            else
            {
                wcid = bookData.pages.page[eeCurrentpage].assetgroups.assetgroup[j - onFirstpage - 1].id;
                wctype = bookData.pages.page[eeCurrentpage].assetgroups.assetgroup[j - onFirstpage - 1].type;
            }             
           
            if(wctype == "aud")
            {
                imgPath = eeAudioIconPath;                
            }
            else if(wctype == "img")
            {
                imgPath = eeImageIconPath;
            }
            else if(wctype == "vid")
            {
                imgPath = eeVideoIconPath;
            }  
            
            $(olid).attr("wcid", wcid);  
            $(olid).attr("wctype", wctype);  
            
            $(olid).children('img').attr("src", imgPath); 
            
        } 
    }
}

function eeUpdateOverlaysPosition()
{
    var requiredOLCount = eeGetRequiredOverlayCount();
    if(eeCurrentpage > 0)
    {
        var className = "overlay overlay-dp-";
        if(eePageLayout == 1 || eeSmallScreen == true)
        {
            className = "overlay overlay-sp-";
        }
        var onFirstpage = bookData.pages.page[eeCurrentpage - 1].assetgroupcount;
        for(var j = 1; j <= requiredOLCount; j++)
        {
            var olid = "#overlays" + j;
                
            var leftVal = 0;
            var topVal = 0;
            var pagWd = Number($("#eeditionpagedivA").width());
            if(j <= onFirstpage)
            {            
           
                leftVal = Number(bookData.pages.page[eeCurrentpage - 1].assetgroups.assetgroup[j - 1].xposition)/Number(eeOverlayCalcBase)*pagWd;
                topVal = Number(bookData.pages.page[eeCurrentpage - 1].assetgroups.assetgroup[j - 1].yposition)/Number(eeOverlayCalcBase)*pagWd;
            }
            else
            {
                leftVal = Number(bookData.pages.page[eeCurrentpage].assetgroups.assetgroup[j - onFirstpage - 1].xposition)/Number(eeOverlayCalcBase)*pagWd + Number(pagWd);
                topVal = Number(bookData.pages.page[eeCurrentpage].assetgroups.assetgroup[j - onFirstpage - 1].yposition)/Number(eeOverlayCalcBase)*pagWd;            
            }
        
            $(olid).css({
                "left" : leftVal + "px",
                "top": topVal + "px"
            }); 
            
            $(olid).attr("class", className + eeZoomState);            
        } 
    }
}

function eeRepositionOverlays()
{
    $("#overlays").css({
        "top" : $("#eedition-container").position().top,
        "left" : $("#eedition-container").position().left,
        "width" : $("#eedition-container").width(),
        "height" : $("#eedition-container").height()
    });   
}

function updateImageSource()
{
    var leftPageImage = "";
    var rightPageImage = "";
    if(eePageLayout == 1 || eeSmallScreen == true)
    {
        if(zoomingStateData[eeZoomState].spfile != "")
        {
            if(eeCurrentpage > 0)
            {
                leftPageImage =  bookData.pages.page[eeCurrentpage - 1].url + zoomingStateData[eeZoomState].spfile;
                if(eeCurrentpage < bookData.pagecount)
                {
                    rightPageImage = bookData.pages.page[eeCurrentpage].url + zoomingStateData[eeZoomState].spfile;       
                }
                else
                {
                    rightPageImage = eeDefaultPageSource;
                }
            }
            else
            {
                leftPageImage =  bookData.coverpage.url + zoomingStateData[eeZoomState].spfile;
                rightPageImage = eeDefaultPageSource;
            }
        }
        else
        {
            alert("Alert issue - 001: Change Zoom State");
        }
    }
    else
    {        
        if(zoomingStateData[eeZoomState].dpfile != "")
        {
            if(eeCurrentpage > 0)
            {
                leftPageImage = bookData.pages.page[eeCurrentpage - 1].url + zoomingStateData[eeZoomState].dpfile;        
                if(eeCurrentpage < bookData.pagecount)
                {
                    rightPageImage = bookData.pages.page[eeCurrentpage].url + zoomingStateData[eeZoomState].dpfile;        
                }
                else
                {
                    rightPageImage = eeDefaultPageSource;
                }
            }
            else
            {
                leftPageImage = eeDefaultPageSource;
                rightPageImage =  bookData.coverpage.url + zoomingStateData[eeZoomState].dpfile;                
            }
        }
        else
        {
            alert("Alert issue - 002: Change Zoom State");
        }
    }    
    
    if(leftPageImage != "" && $("#eeditionpageA").attr("src") != leftPageImage)
    {
        if(eeZoomChangedA == false)
        {            
            //$("#eeditionpageA").attr("src", eeDefaultPageSource);
            $('#eeditionpageA').hideLoading();        
            $('#eeditionpageA').showLoading();        
        }
        $("#eeditionpageA").  attr("src", leftPageImage);
		
		/*
		$("#eeditionpageA").fadeOut('slow', function() {
				$(this).attr("src", leftPageImage);
				$(this).fadeIn('slow');
		});*/
		
    }
        
    if(rightPageImage != "" && $("#eeditionpageB").attr("src") != rightPageImage)
    {
        if(eeZoomChangedB == false)
        {            
            if(eePageLayout != 1 && eeSmallScreen != true)
            {
            
                $('#eeditionpageB').hideLoading();
                $('#eeditionpageB').showLoading();
            }   
        }
        $("#eeditionpageB").attr("src", rightPageImage);
		
		/*
		$("#eeditionpageB").fadeOut('slow', function() {
				$(this).attr("src", leftPageImage);
				$(this).fadeIn('slow');
		});*/
		
    }        
       
}

function updateImageLayout()
{    
    if(eePageLayout == 1 || eeSmallScreen == true)
    {      
        if($("#eeditionpagedivA").hasClass("eeditionpagedivFirst") == false)
        {
            $("#eeditionpagedivA").addClass("eeditionpagedivFirst");
        }
        if($("#eeditionpagedivB").hasClass("eeditionpagedivSecond") == false)
        {
            $("#eeditionpagedivB").addClass("eeditionpagedivSecond");
        }      
    }
    else
    {
        if($("#eeditionpagedivA").hasClass("eeditionpagedivFirst"))
        {
            $("#eeditionpagedivA").removeClass("eeditionpagedivFirst");
        }
        
        if($("#eeditionpagedivB").hasClass("eeditionpagedivSecond"))
        {
            $("#eeditionpagedivB").removeClass("eeditionpagedivSecond");
        }    
    }
    
    $("#pagecontent").css({
        "width" : zoomingStateData[eeZoomState].pcwidth
    }); 
}

function updatePageNavigator()
{
    if(eeCurrentpage > 0)
    {
        if(eePageLayout == 1 || eeSmallScreen == true)
        {
            $("#currentPage").html(eeCurrentpage + " of " + bookData.pagecount);
        }
        else
        {
            if(eeCurrentpage < bookData.pagecount)
            {
                $("#currentPage").html(eeCurrentpage+ " - " + (eeCurrentpage + 1)+ "<span class='font-color-page-count'> of " + bookData.pagecount + "</span>");// + "/" + bookData.pagecount);
            }
            else
            {
                $("#currentPage").html(eeCurrentpage + " of " + bookData.pagecount);
            }
        } 
    }
    else
    {
        $("#currentPage").html("Cover");
    }
}


function eeCheckAndUpdateZoomButtons()
{
    if(eePageLayout == 1 || eeSmallScreen == true)
    {
        if(eeZoomState >= spMaxStateIndex)
        {
            $("#fullscreenEdition").attr("wcdisabled", "true");
            $("#zoomInEdition").attr("wcdisabled", "true");
        }
        else
        {
            $("#zoomInEdition").removeAttr("wcdisabled");
        }
        
        if(eeZoomState > spMinStateIndex)
        {
            $("#zoomOutEdition").removeAttr("wcdisabled");
        }
        else
        {
            $("#zoomOutEdition").attr("wcdisabled", "true");
        }
    }
    else
    {        
        if(eeZoomState >= dpMinStateIndex && eeZoomState < dpMaxStateIndex)
        {
            $("#zoomInEdition").removeAttr("wcdisabled");        
        }
        else
        {
            $("#zoomInEdition").attr("wcdisabled", "true");
        }
        
        if(eeZoomState > dpMinStateIndex)
        {
            $("#zoomOutEdition").removeAttr("wcdisabled");
        }
        else
        {
            $("#zoomOutEdition").attr("wcdisabled", "true");
        }
    } 
}

function eeCheckAndUpdateNavigatonButtons()
{
    if(eeCurrentpage > 0)
    {
        $("#prevPageEdition").removeAttr("wcdisabled");
        if(eePageLayout == 1 || eeSmallScreen == true)
        {
            
            if(eeCurrentpage >= bookData.pagecount)
            {
                eeCurrentpage = bookData.pagecount;
                $("#nextPageEdition").attr("wcdisabled", "true");
            }
            else
            {  
                $("#nextPageEdition").removeAttr("wcdisabled");
            }
        }
        else
        {            
            if(eeCurrentpage == bookData.pagecount || eeCurrentpage == bookData.pagecount - 1)
            {  
                $("#nextPageEdition").attr("wcdisabled", "true");
            }
            else
            { 
                $("#nextPageEdition").removeAttr("wcdisabled");
            }
        }
    }
    else
    {
        $("#prevPageEdition").attr("wcdisabled", "true");
    }
}

function updatePageContent()
{
    eeCheckAndRemovePreviousAudio();
    
    eeCheckAndUpdateZoomButtons();
    
    eeCheckAndUpdateNavigatonButtons();
    
    updateImageLayout();
    
    updateImageSource(); 
    
    updateImageLayout();
    
    updatePageNavigator();
    
    eeCreateRequiredOverlays();
    
    eeRepositionOverlays();
    
    if(eeCurrentpage > 0)
    {
        eeUpdateOverlaysData();    
        eeUpdateOverlaysPosition(); 
    }
    
//checkAndUpdateExtenders();
    
}



function eeFullscreenClicked()
{
    var fullDir = '';
    if($("#fullscreenEdition").hasClass('enter_fullscreen'))
    {
        fullDir = 'enter';
    }
    else if($("#fullscreenEdition").hasClass('exit_fullscreen'))
    {
        fullDir = 'exit';
    }
    
    if(fullDir == 'enter')
    {        
        $("#fullscreenEdition").addClass('exit_fullscreen');
        $("#fullscreenEdition").removeClass('enter_fullscreen');
        $("#fullscreenEdition").attr("title", "Exit Fullscreen");       
        fullscreenOn = true;
    }
    else if(fullDir == 'exit')
    {        
        $("#fullscreenEdition").addClass('enter_fullscreen');
        $("#fullscreenEdition").removeClass('exit_fullscreen');
        $("#fullscreenEdition").attr("title", "Enter Fullscreen");
        fullscreenOn = false;
    }
    
    eeZoomState = eeGetZoomStateForBestFit();
    
    updatePageContent();
}

function eeZoomButtonClicked(zoomDir)
{   
    if(zoomDir == 'in')
    {
        $("#book-toolbar").removeAttr('style');        

        if(eeZoomState < totalZoomStates)
        {
            if(eePageLayout != 1 && eeSmallScreen != true) // it is double 
            {
                if(eeZoomState < dpMaxStateIndex)
                {
                    eeZoomState++;
                    eeZoomChangedA = true;
                    eeZoomChangedB = true;
                }
            }
            else // it is single
            {
                if(eeZoomState < spMaxStateIndex)
                {
                    eeZoomState++;
                    eeZoomChangedA = true;
                    eeZoomChangedB = true;
                }
            }
            
        }        
    }
    else if(zoomDir == 'out')
    {
        if(eeZoomState > 0)
        {
            if(eePageLayout != 1 && eeSmallScreen != true)
            {
                if(eeZoomState==3)
                {
                    var setBottom = $("#eeditionpagedivB").position().top + $("#eeditionpagedivB").height() - $("#book-toolbar").height() - 170;
                    $("#book-toolbar").css({
                        "top" : setBottom
                    });  
                }
            }
            if(eePageLayout != 1 && eeSmallScreen != true) // it is double 
            {
                if(eeZoomState > dpMinStateIndex)
                {
                    eeZoomState--;
                    eeZoomChangedA = true;
                    eeZoomChangedB = true;
                }
            }
            else // it is single
            {
                if(eeZoomState > spMinStateIndex)
                {
                    eeZoomState--;
                    eeZoomChangedA = true;
                    eeZoomChangedB = true;
                }
            }
        }
    }
    updatePageContent();
}

function eeNavigateNext(changeBy)
{    
    var bApplied = false;
    if(eeCurrentpage + changeBy > 0)
    {
        if(eeCurrentpage + changeBy < bookData.pagecount)
        {
            eeCurrentpage = eeCurrentpage + changeBy;
            bApplied = true;
        }
        else
        {
            eeCurrentpage = bookData.pagecount;
            bApplied = true;        
        }
    }
    else
    {
        eeCurrentpage = 0;
        bApplied = true;    
    }    
    
    return bApplied;
}

function eeCheckAndShowPreviousPage()
{
    if($("#prevPageEdition").attr("wcdisabled") != 'true')
    {
        if(eePageLayout == 1 || eeSmallScreen == true)
        {
            eeNavigateNext(-1);            
        }
        else
        {
            eeNavigateNext(-2);  
        }
        updatePageContent();  
    }
}
function eeCheckAndShowNextPage()
{
    if($("#nextPageEdition").attr("wcdisabled") != 'true')
    {
        if(eeCurrentpage > 0)
        {
            if(eePageLayout == 1 || eeSmallScreen == true)
            {
                eeNavigateNext(1);            
            }
            else
            {
                eeNavigateNext(2);  
            }
        }
        else
        {
            eeCurrentpage = 1;
        }
        updatePageContent();
    }
}


function eeCheckAndChangePageLayout()
{
    if(eeSmallScreen == true)
    {
    //Do nothing as no option in small layout - will never happen        
    }
    else
    {
        if(eePageLayout == 0 || eePageLayout == 2)
        {
            eePageLayout = 1;
            $("#page-layout").removeClass("ee-layout-single");
            $("#page-layout").addClass("ee-layout-double");
            $("#page-layout").attr("title", "Double page");
            
        }
        else
        {
            eePageLayout = 2; 
            
            $("#page-layout").removeClass("ee-layout-double");
            $("#page-layout").addClass("ee-layout-single");
            $("#page-layout").attr("title", "Single page");
            
        }
        updatePageContent();
    }
}

function eeAddNavigationEventHandlers()
{
    $("#page-layout").click(function(){
        eeCheckAndChangePageLayout();        
    })
    
    $("#nextPageEdition").click(function(){
        eeCheckAndShowNextPage();        
    })
    
    $("#prevPageEdition").click(function(){
        eeCheckAndShowPreviousPage();
    })
        
    $("#eedition-container").touchwipe({
        wipeLeft: function() {  
            eeCheckAndShowNextPage();
        },
        wipeRight: function() {
            eeCheckAndShowPreviousPage();
        },     
        min_move_x: 10,
        min_move_y: 10,
        preventDefaultEvents: false
    });
    
    $("#overlays").touchwipe({
        wipeLeft: function() {  
            eeCheckAndShowNextPage();
        },
        wipeRight: function() {
            eeCheckAndShowPreviousPage();
        },     
        min_move_x: 10,
        min_move_y: 10,
        preventDefaultEvents: false
    });
    
    
}


function resizeEeditionpage()
{
    eeUpdateResizedZoomStateAndPageNo();
    
    updatePageContent();    
}

function eeAddPageLoadingHandlers()
{
    $('#eeditionpageA').load(function() {
        eeZoomChangedA = false;
        $('#eeditionpageA').hideLoading();
                
    });
      
    $('#eeditionpageB').load(function() {
        eeZoomChangedB = false;
        $('#eeditionpageB').hideLoading();
                
    }); 
}

function eeAddZoomEventHandlers()
{
    $('#zoomOutEdition').bind({
        click: function(){
            if($(this).attr("wcdisabled") != 'true')
            {
                eeZoomButtonClicked('out');
            }
        } 
    });
    
    $('#zoomInEdition').bind({
        click: function(){
            if($(this).attr("wcdisabled") != 'true')
            {
                eeZoomButtonClicked('in');
            }
        } 
    });
    
    $('#fullscreenEdition').bind({
        click: function(){
            eeFullscreenClicked();
        } 
    }); 
}


function eeAddResizeEventHandlers()
{
    $(window).resize( function() {    
        //        resizeMenubar();
        resizeEeditionpage();
    });
}

function domreadyEeditionpage()
{
    eeAddResizeEventHandlers();
    
    eeAddPageLoadingHandlers();
    
    eeAddZoomEventHandlers();     
    
    eeAddNavigationEventHandlers();    
            
    eeUpdateInitialZoomStateAndPageNo();     
    
    updatePageContent();    
}

function eeDefaultLoadAction()
{    

    $(document).ready(function() {        
        
        eeUpdateInitialZoomStateAndPageNo();
        updateImageLayout();
        
        domreadyEeditionpage();
    });    
}

eeDefaultLoadAction();

