var eReaderJS = {

    initHardVars: function()
    {
        this.eeImageIconPath = "/public/images/reader/eedition/overlays/image_icon";
        this.eeVideoIconPath = "/public/images/reader/eedition/overlays/video_icon";
        this.eeAudioIconPath = "/public/images/reader/eedition/overlays/audio_icon";
        this.eeVideoIconPathPostfix = {
            "default": ".svg",
            "hover"  : "-hover.svg"
        };
        
        this.eeDefaultPageSource =  "/public/images/reader/eedition/defaultPage.png";
    },
    
    
   
   
    initZoomSatesVars:function()
    {
        this.eeZoomState = -1;
        this.totalZoomStates = 9;

        this.spMinStateIndex = 0;
        this.spMaxStateIndex = 5;
        this.dpMinStateIndex = 2;
        this.dpMaxStateIndex = 8;
        this.eeBestFitStartState = 3;

        this.zoomingStateData = [ 
        {
            readerwidth:600,
            pcwidth:'600px', 
            spfile:'_600.jpg', 
            dpfile:'', 
            zsindex:'0'
        },
        {
            readerwidth:720,
            pcwidth:'720px', 
            spfile:'_720.jpg', 
            dpfile:'', 
            zsindex:'1'
        },
        {
            readerwidth:940,
            pcwidth:'940px', 
            spfile:'_940.jpg', 
            dpfile:'_470.jpg', 
            zsindex:'2'
        },
        {
            readerwidth:1200,
            pcwidth:'1200px', 
            spfile:'_1200.jpg', 
            dpfile:'_600.jpg', 
            zsindex:'3'
        },
        {
            readerwidth:1500,
            pcwidth:'1500px', 
            spfile:'_1500.jpg', 
            dpfile:'_720.jpg', 
            zsindex:'4'
        },
        {
            readerwidth:1800,
            pcwidth:'1800px', 
            spfile:'_1800.jpg', 
            dpfile:'_940.jpg', 
            zsindex:'5'
        },
        {
            readerwidth:2400,
            pcwidth:'2400px', 
            spfile:'', 
            dpfile:'_1200.jpg', 
            zsindex:'6'
        },
        {
            readerwidth:3000,
            pcwidth:'3000px', 
            spfile:'', 
            dpfile:'_1500.jpg',     
            zsindex:'7'
        },
        {
            readerwidth:3600,
            pcwidth:'3600px', 
            spfile:'', 
            dpfile:'_1800.jpg', 
            zsindex:'8'
        }
        ];
    },
    
    eeUpdateZoomStateData:function()
    {
        
        if(this.eeMimimumImages)        
        { 
            //out 470 720, 1200, 1800  -- can be deleted.
            // in 600 940, 1500
            this.zoomingStateData[0].spfile = '_600.jpg';
            this.zoomingStateData[0].dpfile = '';
            
            this.zoomingStateData[1].spfile = '_940.jpg';
            this.zoomingStateData[1].dpfile = '';
            
            this.zoomingStateData[2].spfile = '_940.jpg';
            this.zoomingStateData[2].dpfile = '_600.jpg';
            
            this.zoomingStateData[3].spfile = '_1500.jpg';
            this.zoomingStateData[3].dpfile = '_600.jpg';
            
            this.zoomingStateData[4].spfile = '_1500.jpg';
            this.zoomingStateData[4].dpfile = '_940.jpg';
            
            this.zoomingStateData[5].spfile = '';
            this.zoomingStateData[5].dpfile = '_940.jpg';            
                        
            this.zoomingStateData[6].spfile = '';
            this.zoomingStateData[6].dpfile = '_1500.jpg';
            
            this.zoomingStateData[7].spfile = '';
            this.zoomingStateData[7].dpfile = '_1500.jpg';
            
            this.zoomingStateData[8].spfile = '';
            this.zoomingStateData[8].dspfile = '';
            
            this.totalZoomStates = 8;
            
            this.spMinStateIndex = 0;
            this.spMaxStateIndex = 4;
            this.dpMinStateIndex = 2;
            this.dpMaxStateIndex = 7;
        }
    /*
        if(this.eeMinimumZoomStates)
        {
            this.totalZoomStates = 8;
            
            this.spMinStateIndex = 0;
            this.spMaxStateIndex = 4;
            this.dpMinStateIndex = 2;
            this.dpMaxStateIndex = 7;           
        }
        */
            
    }, 
    
    initIntermediateVars: function()
    {
        this.eeZoomChangedA = false;
        this.eeZoomChangedB = false;        
        this.eeLastAudioId = "";
        this.eePageALastSource = "";
        this.eePageBLastSource = "";
        this.eeIsSecondpageAg = false;
        this.tabEventAdded = false;
        
    },
    
    initCalcBaseVars: function()
    {
        this.eeOverlayCalcBase = 1200;
        this.eeViewPortMargin = 0;
        this.eeSmallScreenLimit = 1024;        
    },
    
    initPreferencesVars: function()
    {
        this.fullscreenOn = false;
        this.eePageLayout = 0; //0:default. 1:single, 2:double
        this.eeSmallScreen = false;
        this.eeMimimumImages = false;
        this.eeSingleAudio = false;
        //this.eeMinimumZoomStates = false;
        this.eeImageViewerEnabled = true;
    },    
    

    checkAndUpdateExtenders:function()
    {
/*        
        var headerWidth = $("#globalheader").width();
        var pcWidth = $("#pagecontent").width();
        
        if(headerWidth < pcWidth)
        {
            var newWidth = pcWidth - headerWidth;        
            $(".zoomExtenders").css({
                "width": newWidth            
            });
            if(this.fullscreenOn == false)
            {
                $(".zoomExtenders").css({
                    "display": "block"            
                });
            }
        
            $("#commonFooterExtender").css({
                "height": $("#globalfooter").height()           
            });
        
            $("#commonFooterExtender").css({
                "top": $("#globalfooter").position().top           
            });
        }
        else            
        {
            $(".zoomExtenders").css({
                "width": "0"            
            });
            $(".zoomExtenders").css({
                "display": "none"            
            });
        }
*/
    /*
        var pcWidth = $("#pagecontent").width();    
        var defHeaderWidth = window.innerWidth; 
    
        if(pcWidth > defHeaderWidth)
        {
            $("#globalheader").css({
                "width": pcWidth            
            });
            $("#globalfooter").css({
                "width": pcWidth            
            });
        }
        else
        {
            $("#globalheader").css({
                "width": "100%"            
            });
        
            $("#globalfooter").css({
                "width": "100%"            
            });
        } 
        
        if(defHeaderWidth  < pcWidth)
        {
            var newWidth = pcWidth - defHeaderWidth ;        
        
            $(".zoomExtenders").css({
                "width": newWidth            
            });
            if(fullscreenOn == false)
            {
                $(".zoomExtenders").css({
                    "display": "block"            
                });
            }
        
            $("#commonFooterExtender").css({
                "height": $("#globalfooter").height()           
            });
        
            $("#commonFooterExtender").css({
                "top": $("#globalfooter").position().top           
            });
        }
        else            
        {
            $(".zoomExtenders").css({
                "width": "0"            
            });
            $(".zoomExtenders").css({
                "display": "none"            
            });
        }*/
    },
    
    eeGetRequiredOverlayCount:function()
    {
        var retCount = 0;
        if(this.eeCurrentpage > 0)
        {
            retCount = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroupcount;
        
            if(this.eePageLayout != 1 && this.eeSmallScreen != true && this.eeCurrentpage < this.bookData.pagecount)
            {
                retCount = retCount + this.bookData.pages.page[this.eeCurrentpage].assetgroupcount;
            }
        }    
        return retCount;
    },

    eeGetAssetGroup:function(wcid)
    {
        var retGroup = null;    
    
        var assetGrpCount = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroupcount;
        for(var j = 1; j <= assetGrpCount; j++)
        {
            var tempGroup = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroups.assetgroup[j - 1];
        
            if(tempGroup.id == wcid)
            {
                retGroup = tempGroup;
                this.eeIsSecondpageAg = false;
                break;
            }                
        } 
    
        if(retGroup == null)
        {
            if(this.eePageLayout != 1 && this.eeSmallScreen != true)
            {
                assetGrpCount = this.bookData.pages.page[this.eeCurrentpage].assetgroupcount;
        
                for(var j = 1; j <= assetGrpCount; j++)
                {
                    var tempGroup = this.bookData.pages.page[this.eeCurrentpage].assetgroups.assetgroup[j - 1];

                    if(tempGroup.id == wcid)
                    {
                        retGroup = tempGroup;
                        this.eeIsSecondpageAg = true;
                        break;
                    }                
                } 
        
            }
        }   
    
        return retGroup;    
    },

    eeGetZoomStateForBestFit:function()
    {
        var winWidth = $(window).width();
        
        var zoomState = this.eeBestFitStartState;
        
        for(var j = zoomState; j >= 0; j--)
        {            
            if(this.zoomingStateData[j].readerwidth < winWidth)
            {
                zoomState = j;                 
                break;
            }
        }
        return zoomState;    
    },

    eeUpdateInitialZoomStateAndPageNo:function ()
    {    
        if(this.eeZoomState == -1)// && this.eeCurrentpage == -1)
        {
            this.eePageLayout = 0;
            //this.eeCurrentpage =  0;        
        
            this.eeZoomState = this.eeGetZoomStateForBestFit();                
       
            if($(window).width() < this.eeSmallScreenLimit - this.eeViewPortMargin)
            {        
                this.eeSmallScreen = true;
            }
            else
            {
                this.eeSmallScreen = false;
            }
        }   
    },

    eeUpdateResizedZoomStateAndPageNo:function ()
    {    
        if($(window).width() < this.eeSmallScreenLimit - this.eeViewPortMargin)
        {
            if(this.eeSmallScreen == false)//pagelayout == 0 check not required
            {
                if(this.eeZoomState > this.spMaxStateIndex)
                {
                    this.eeZoomState = this.spMaxStateIndex;
                    this.eeZoomChangedA = true;
                    this.eeZoomChangedB = true;
                //alert("001 solved")
                }
                this.eeSmallScreen = true; 
                $("#ee-page-layout").removeClass("ee-layout-double");
                $("#ee-page-layout").removeClass("ee-layout-single");
            }
        }
        else
        {
            if(this.eeSmallScreen == true)
            {
                if(this.eeCurrentpage % 2 == 0)
                {
                    this.eeCurrentpage--;
                }
                if(this.eeZoomState < this.dpMinStateIndex)//here additional check may be needed for pagelayout != 1
                {
                    this.eeZoomState = this.dpMinStateIndex;
                    this.eeZoomChangedA = true;
                    this.eeZoomChangedB = true;
                //alert("002 solved")// may 
                }
                this.eeSmallScreen = false;
            
                if(this.eePageLayout == 1 )
                {
                    $("#ee-page-layout").addClass("ee-layout-double");
                    $("#ee-page-layout").attr('title','Switch to double page view');
                }
                else
                {
                    $("#ee-page-layout").addClass("ee-layout-single");
                    $("#ee-page-layout").attr('title','Switch to single page view');                    
                }
                if(this.eeCurrentpage >= this.bookData.pagecount)
                {
                    
            }
            }
        }
    this.eeZoomChangedA = true;
    this.eeZoomChangedB = true;    
    },

    eeCheckAndRemovePreviousAudio: function()
    {
        if(this.eeLastAudioId != "")
        {
            this.eeAudio.pause();
            this.eeOverlays.removeChild(this.eeAudio);
            this.eeLastAudioId = "";
        }
    },

    eeOverlayIconClicked:function (wcid, wctype)
    {        
        if(this.eeLastAudioId == wcid)
        {
            this.eeCheckAndRemovePreviousAudio();
            return;
        }
        
        var assetGrp = this.eeGetAssetGroup(wcid);
        if(assetGrp != null)
        {            
            var assetCount = assetGrp.assetcount;
        
            if(assetGrp.type == "aud")
            {                    
                if(this.eeAudio == undefined)
                {
                    this.eeOverlays = document.getElementById('ee-overlays');
                    this.eeAudio = document.createElement('audio');
                    this.eeAudio.autoplay = true;                            
                    this.eeAudio.controls = true;
                }
                    
                var leftVal = 0;
                var topVal = 0;
                var pagWd = Number($("#eeditionpagedivA").width());    
                   
                var assetUrl=assetGrp.assets.asset[0].url;
                
                if(this.eeSingleAudio == true)
                {
                    assetUrl = "/public/audio/book1/sci_bib_4_es_1_rwm_001";
                }                   
                    
                if(this.eePageLayout != 1 && this.eeSmallScreen != true &&  this.eeIsSecondpageAg == true)
                {                        
                    leftVal = Number(assetGrp.xposition)/Number(this.eeOverlayCalcBase)*pagWd +  + Number(pagWd);;
                }
                else
                {
                    leftVal = Number(assetGrp.xposition)/Number(this.eeOverlayCalcBase)*pagWd;
                }
                    
                topVal = Number(assetGrp.yposition)/Number(this.eeOverlayCalcBase)*pagWd - 35;
                    
                var styleVal = "position:absolute;left:" + leftVal + "px;top:" + topVal + "px;";
                if(this.eeAudio.canPlayType('audio/ogg') == "probably")
                {
                    this.eeAudio.src = assetUrl+'.ogg';
                    this.eeOverlays.appendChild(this.eeAudio);
                    this.eeLastAudioId = wcid;
                    //position
                    this.eeAudio.setAttribute("style",styleVal);
                    this.eeAudio.play();
                }                
                else if(this.eeAudio.canPlayType('audio/mpeg') == "probably")
                {
                    this.eeAudio.src = assetUrl+'.mp3';
                    this.eeOverlays.appendChild(this.eeAudio);
                    this.eeLastAudioId = wcid;
                    //position
                    this.eeAudio.setAttribute("style",styleVal);
                    this.eeAudio.play();
                }
                if(this.eeAudio.canPlayType('audio/ogg') == "maybe")
                {
                    this.eeAudio.src = assetUrl+'.ogg';
                    this.eeOverlays.appendChild(this.eeAudio);
                    this.eeLastAudioId = wcid;
                    //position
                    this.eeAudio.setAttribute("style",styleVal);
                    this.eeAudio.play();
                }                
                else if(this.eeAudio.canPlayType('audio/mpeg') == "maybe")
                {
                    this.eeAudio.src = assetUrl+'.mp3';
                    this.eeOverlays.appendChild(this.eeAudio);
                    this.eeLastAudioId = wcid;
                    //position
                    this.eeAudio.setAttribute("style",styleVal);
                    this.eeAudio.play();
                }                
                else
                {
                    alert("MP3 and OGG Audio files are not suported by your browser");
                }                    
                
            }        
            else if(assetGrp.type == "img")
            {
                this.eeCheckAndRemovePreviousAudio();
        
                if(this.eeImageViewerEnabled)
                {
                    for(var j = 1; j <= assetCount; j++)
                    {
                        var imageUrl=assetGrp.assets.asset[j - 1].url;
                        var imageTitle=assetGrp.assets.asset[j - 1].title;

                        assetGrp.assets.asset[j - 1].caption = imageTitle;
                        assetGrp.assets.asset[j - 1].title = imageTitle;
                        assetGrp.assets.asset[j - 1].href = 'imageviewer.html?url='+imageUrl;
                    }
        
                    if(this.eeSmallScreen == false)//pagelayout == 0 check not required
                    {
                        $.fancybox(
                            assetGrp.assets.asset,
                            {
                                'type' : 'iframe'
                            }
                            );
                    }
                    else
                    {
                        this.showPhotoSwipe(window, window.Code.PhotoSwipe, assetGrp.assets.asset)
                    }
                }
            }
            else
            {
                this.eeCheckAndRemovePreviousAudio();
            }
        }
        else
        {
            alert("Incorret asset group id passed");
        }    
    },


    showPhotoSwipe:function(window, PhotoSwipe, assetArray)
    {		
        var
        options = {
            preventHide: false,
            getImageSource: function(obj){
                return obj.url;
            },
            getImageCaption: function(obj){
                return obj.caption;
            }
        },
        instance = PhotoSwipe.attach( 
            assetArray, 
            options 
            );
					
        instance.show(0);			
        
    },
    
    eeAddOverLayIcon:function(olid)
    {
        $('#ee-overlays').append('<div id=\"' + olid + '\" class="ee-overlay"><img class="ee-overlay-img" src="/public/images/reader/eedition/overlays/image_icon.svg"/></div>');
        $('#' + olid).click(function(){
            wcid = $(this).attr("wcid");
            wctype = $(this).attr("wctype");
            eReaderJS.eeOverlayIconClicked(wcid, wctype);        
        })        
        $('#' + olid).css({
            "display" : "none"
        });
    },


    eeRemoveOverLayIcon:function(olid)
    {      
        $('#' + olid).unbind("click");
        //this.eeUnbindOverLayIcon(olid)
        //$('#' + olid).unbind('click', eReaderJS.eeOverlayIconClicked); 
        $('#' + olid).remove();
        $('#' + olid).unbind("click");
    },
    
    eeCreateRequiredOverlays:function ()
    {
        var requiredOLCount = this.eeGetRequiredOverlayCount();
    
        var existingOLCount = $('#ee-overlays').children(".ee-overlay").length;
    
        if(existingOLCount > requiredOLCount)
        {
            for(var j = existingOLCount; j > requiredOLCount; j--)
            {
                this.eeRemoveOverLayIcon("ee-overlays" + j);                
            }            
        }
        else if(existingOLCount < requiredOLCount)
        {            
            for(j = existingOLCount + 1; j <= requiredOLCount; j++)
            {               
                this.eeAddOverLayIcon("ee-overlays" + j);                
            }
        }
    },
    
    eeUpdateOverlaysData:function ()
    {
        var requiredOLCount = this.eeGetRequiredOverlayCount();
        if(this.eeCurrentpage > 0)
        {    
            var onFirstpage = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroupcount;
            for(var j = 1; j <= requiredOLCount; j++)
            {
                var olid = "#ee-overlays" + j;           
                var wctype = "vid";
                var wcid = "vid";
                var imgPath = this.eeVideoIconPath;            
                
                if(j<= onFirstpage)
                {
                    wcid = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroups.assetgroup[j - 1].id;
                    wctype = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroups.assetgroup[j - 1].type;
                }
                else
                {
                    wcid = this.bookData.pages.page[this.eeCurrentpage].assetgroups.assetgroup[j - onFirstpage - 1].id;
                    wctype = this.bookData.pages.page[this.eeCurrentpage].assetgroups.assetgroup[j - onFirstpage - 1].type;
                }             
           
                if(wctype == "aud")
                {
                    imgPath = this.eeAudioIconPath;                
                }
                else if(wctype == "img")
                {
                    imgPath = this.eeImageIconPath;
                }
                else if(wctype == "vid")
                {
                    imgPath = this.eeVideoIconPath;
                }  
            
                $(olid).attr("wcid", wcid);  
                $(olid).attr("wctype", wctype);  
                
                $(olid).children('img').attr("src", imgPath + this.eeVideoIconPathPostfix['default']); 
                $(olid).children('img').attr("presrc", imgPath);
            
            } 
        }
    },

    eeUpdateOverlaysPosition:function ()
    {
        var requiredOLCount = this.eeGetRequiredOverlayCount();
        if(this.eeCurrentpage > 0)
        {
            var className = "ee-overlay ee-overlay-dp-";
            if(this.eePageLayout == 1 || this.eeSmallScreen == true)
            {
                className = "ee-overlay ee-overlay-sp-";
            }
            var onFirstpage = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroupcount;
            for(var j = 1; j <= requiredOLCount; j++)
            {
                var olid = "#ee-overlays" + j;
                
                var leftVal = 0;
                var topVal = 0;
                var pagWd = Number($("#eeditionpagedivA").width());
                if(j <= onFirstpage)
                {            
           
                    leftVal = Number(this.bookData.pages.page[this.eeCurrentpage - 1].assetgroups.assetgroup[j - 1].xposition)/Number(this.eeOverlayCalcBase)*pagWd;
                    topVal = Number(this.bookData.pages.page[this.eeCurrentpage - 1].assetgroups.assetgroup[j - 1].yposition)/Number(this.eeOverlayCalcBase)*pagWd;
                }
                else
                {
                    leftVal = Number(this.bookData.pages.page[this.eeCurrentpage].assetgroups.assetgroup[j - onFirstpage - 1].xposition)/Number(this.eeOverlayCalcBase)*pagWd + Number(pagWd);
                    topVal = Number(this.bookData.pages.page[this.eeCurrentpage].assetgroups.assetgroup[j - onFirstpage - 1].yposition)/Number(this.eeOverlayCalcBase)*pagWd;            
                }
        
                $(olid).css({
                    "left" : leftVal + "px",
                    "top": topVal + "px"
                }); 
            
                $(olid).attr("class", className + this.eeZoomState);            
            } 
        }
    },

    eeRepositionOverlays:function ()
    {
        $("#ee-overlays").css({
            "top" : $("#eedition-container").position().top,
            "left" : $("#eedition-container").position().left,
            "width" : $("#eedition-container").width(),
            "height" : $("#eedition-container").height()
        });   
    },
    
    showOverlayIconsPageA:function (bShow)
    {        
        if(this.eeCurrentpage > 0)
        {    
            var onFirstpage = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroupcount;
            for(var j = 1; j <= onFirstpage; j++)
            {
                var olid = "#ee-overlays" + j;
                if(bShow)
                {
                    $(olid).css({
                        "display" : "block"
                    });  
                }
                else
                {
                    $(olid).css({
                        "display" : "none"
                    });  
                }
            } 
        }
    },
    
    showOverlayIconsPageB:function (bShow)
    {
        var requiredOLCount = this.eeGetRequiredOverlayCount();
        if(this.eeCurrentpage > 0)
        {    
            var onFirstpage = this.bookData.pages.page[this.eeCurrentpage - 1].assetgroupcount;
            for(var j = onFirstpage + 1; j <= requiredOLCount; j++)
            {
                var olid = "#ee-overlays" + j;
                if(bShow)
                {
                    $(olid).css({
                        "display" : "block"
                    });  
                }
                else
                {
                    $(olid).css({
                        "display" : "none"
                    });  
                }
            } 
        }
    },

    updateImageSource:function ()
    {
        
        var leftPageImage = "";
        var rightPageImage = "";
        if(this.eePageLayout == 1 || this.eeSmallScreen == true)
        {
            if(this.zoomingStateData[this.eeZoomState].spfile != "")
            {
                if(this.eeCurrentpage > 0)
                {
                    leftPageImage =  this.bookData.pages.page[this.eeCurrentpage - 1].url + this.zoomingStateData[this.eeZoomState].spfile;
                    if(this.eeCurrentpage < this.bookData.pagecount)
                    {
                        rightPageImage = this.bookData.pages.page[this.eeCurrentpage].url + this.zoomingStateData[this.eeZoomState].spfile;       
                    }
                    else
                    {
                        rightPageImage = this.eeDefaultPageSource;
                    }
                }
                else
                {
                    leftPageImage =  this.bookData.coverpage.url + this.zoomingStateData[this.eeZoomState].spfile;
                    rightPageImage = this.eeDefaultPageSource;
                }
            }
            else
            {
                alert("Alert issue - 001: Change Zoom State");
            }
        }
        else
        {   
            
            if(this.zoomingStateData[this.eeZoomState].dpfile != "")
            {
                if(this.eeCurrentpage > 0)
                {
                    leftPageImage = this.bookData.pages.page[this.eeCurrentpage - 1].url + this.zoomingStateData[this.eeZoomState].dpfile;        
                    if(this.eeCurrentpage < this.bookData.pagecount)
                    {
                        rightPageImage = this.bookData.pages.page[this.eeCurrentpage].url + this.zoomingStateData[this.eeZoomState].dpfile;        
                    }
                    else
                    {
                        rightPageImage = this.eeDefaultPageSource;
                    }
                }
                else
                {
                    leftPageImage = this.eeDefaultPageSource;
                    rightPageImage =  this.bookData.coverpage.url + this.zoomingStateData[this.eeZoomState].dpfile;                
                }
            }
            else
            {
                alert("Alert issue - 002: Change Zoom State");
            }
        }    
    
        if(leftPageImage != "" && $("#eeditionpageA").attr("src") != leftPageImage)
        {
            if(this.eeZoomChangedA == false)
            {            
                //$("#eeditionpageA").attr("src", eeDefaultPageSource);
                $('#eeditionpageA').hideLoading();        
                $('#eeditionpageA').showLoading();
                this.showOverlayIconsPageA(false);
            }
            this.eePageALastSource = leftPageImage;
            $("#eeditionpageA").attr("src", leftPageImage);
        }
        
        if(rightPageImage != "" && $("#eeditionpageB").attr("src") != rightPageImage)
        {
            if(this.eeZoomChangedB == false)
            {
                //$("#eeditionpageB").attr("src", eeDefaultPageSource);
            
                if(this.eePageLayout != 1 && this.eeSmallScreen != true)
                {
            
                    $('#eeditionpageB').hideLoading();
                    $('#eeditionpageB').showLoading();
                    this.showOverlayIconsPageB(false);
                }   
            }
            this.eePageBLastSource = rightPageImage;
            $("#eeditionpageB").attr("src", rightPageImage);
        }        
       
    },

    updateImageLayout:function ()
    {    
        if(this.eePageLayout == 1 || this.eeSmallScreen == true)
        {      
            if($("#eeditionpagedivA").hasClass("eeditionpagedivFirst") == false)
            {
                $("#eeditionpagedivA").addClass("eeditionpagedivFirst");
            }
            if($("#eeditionpagedivB").hasClass("eeditionpagedivSecond") == false)
            {
                $("#eeditionpagedivB").addClass("eeditionpagedivSecond");
            }
            
            if(this.eeSmallScreen == true)
            {
                $("#ee-page-layout").removeClass("ee-layout-single");
                $("#ee-page-layout").removeClass("ee-layout-double");
            }
            else if(this.eePageLayout == 1) 
            {
                $("#ee-page-layout").removeClass("ee-layout-single");
                $("#ee-page-layout").addClass("ee-layout-double");
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
            
            $("#ee-page-layout").removeClass("ee-layout-double");
            $("#ee-page-layout").addClass("ee-layout-single");            
        }
    
        $("#pagecontent").css({
            "width" : this.zoomingStateData[this.eeZoomState].pcwidth
        }); 
    },

    updatePageNavigator:function ()
    {
        var navText = "Cover";
        if(this.eeCurrentpage > 0)
        {
            if(this.eePageLayout == 1 || this.eeSmallScreen == true)
            {
                navText = this.bookData.pages.page[this.eeCurrentpage - 1].pagelabel + " of " + this.bookData.pagecountlabel;               
            }
            else
            {
                if(this.eeCurrentpage < this.bookData.pagecount)
                {
                    navText = this.bookData.pages.page[this.eeCurrentpage - 1].pagelabel + " - " + this.bookData.pages.page[this.eeCurrentpage].pagelabel + "<span class='font-color-page-count'> of " + this.bookData.pagecountlabel + "</span>";
                    
                }
                else
                {
                    navText = this.bookData.pages.page[this.eeCurrentpage - 1].pagelabel + " of " + this.bookData.pagecountlabel;
                }
            } 
        }
        
        $("#ee-currentPage").html(navText);
    },


    eeCheckAndUpdateZoomButtons:function ()
    {
        if(this.eePageLayout == 1 || this.eeSmallScreen == true)
        {
            if(this.eeZoomState >= this.spMaxStateIndex)
            {
                $("#ee-fullscreenEdition").attr("wcdisabled", "true");
                $("#zoomInEdition").attr("wcdisabled", "true");
                $("#zoomInEdition").addClass('ee-disable-state');
            }
            else
            {
                $("#zoomInEdition").removeAttr("wcdisabled");
                $("#zoomInEdition").removeClass("ee-disable-state");
            }
        
            if(this.eeZoomState > this.spMinStateIndex) //0,1,2,3,4,5
            {
                $("#zoomOutEdition").removeAttr("wcdisabled");
                $("#zoomOutEdition").removeClass('ee-disable-state');
            }
            else
            {
                $("#zoomOutEdition").attr("wcdisabled", "true");
                $("#zoomOutEdition").addClass('ee-disable-state');
            }
        }
        else
        {        
            if(this.eeZoomState >= this.dpMinStateIndex && this.eeZoomState < this.dpMaxStateIndex)
            {
                $("#zoomInEdition").removeAttr("wcdisabled");   
                $("#zoomInEdition").removeClass("ee-disable-state");
            }
            else
            {
                $("#zoomInEdition").attr("wcdisabled", "true");
                $("#zoomInEdition").addClass('ee-disable-state');
            }
        
            if(this.eeZoomState > this.dpMinStateIndex)
            {
                $("#zoomOutEdition").removeAttr("wcdisabled");
                $("#zoomOutEdition").removeClass("ee-disable-state");
            }
            else
            {
                $("#zoomOutEdition").attr("wcdisabled", "true");
                $("#zoomOutEdition").addClass('ee-disable-state');
            }
        } 
    },

    eeCheckAndUpdateNavigatonButtons:function ()
    {
        if(this.eeCurrentpage > 0)
        {
            $("#prevPageEdition").removeAttr("wcdisabled");
            if(this.eePageLayout == 1 || this.eeSmallScreen == true)
            {
            
                if(this.eeCurrentpage >= this.bookData.pagecount)
                {
                    this.eeCurrentpage = this.bookData.pagecount;
                    $("#nextPageEdition").attr("wcdisabled", "true");
                }
                else
                {  
                    $("#nextPageEdition").removeAttr("wcdisabled");
                }
            }
            else
            {            
                if(this.eeCurrentpage == this.bookData.pagecount || this.eeCurrentpage == this.bookData.pagecount - 1)
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
    },
    
    eeGetOverlays:function ()
    {
        var overlaysContainer = document.getElementById('ee-overlays');
        var totalOverlays = overlaysContainer.childNodes.length;
        for(var i=1; i<totalOverlays; i++)
        {
            $('#'+overlaysContainer.childNodes[i].id).mouseover(function() {
                var imgTag = this.childNodes[0];
                var originalPath = imgTag.getAttribute("presrc");
                imgTag.src = originalPath + eReaderJS.eeVideoIconPathPostfix['hover'];
            });
            
            $('#'+overlaysContainer.childNodes[i].id).mouseleave(function() {
                var imgTag = this.childNodes[0];
                var originalPath = imgTag.getAttribute("presrc");
                imgTag.src = originalPath + eReaderJS.eeVideoIconPathPostfix['default'];
            });
        }
    },

    updatePageContent:function ()
    {
        this.eeCheckAndRemovePreviousAudio();
    
        this.eeCheckAndUpdateZoomButtons();
    
        this.eeCheckAndUpdateNavigatonButtons();
    
        this.updateImageLayout();
    
        this.updateImageSource(); 
    
        this.updateImageLayout();
    
        this.updatePageNavigator();
    
        this.eeCreateRequiredOverlays();
        
        this.eeRepositionOverlays();
    
        if(this.eeCurrentpage > 0)
        {
            this.eeUpdateOverlaysData();    
            this.eeUpdateOverlaysPosition(); 
        }
    
        this.checkAndUpdateExtenders();
        
        this.eeToolBarFadeIn();
    
    },

    
    eeAddScrollHandler:function ()
    {
        $('#ee-book-toolbar').css('bottom', "0px");
        /*
        if($(window).height() + $(document).scrollTop() < $("#globalfooter").position().top)
        {
            if($(window).height() >= $(document).height())
            {
                $('#ee-book-toolbar').css('bottom', ($(document).scrollTop() + $(window).height() - $("#globalfooter").position().top + 5)+"px");
            }
            else
            {
                $('#ee-book-toolbar').css('bottom', "0px");
            }
        }
        else
        {
            if($('#globalfooter').css('display') == 'block')
            {
                $('#ee-book-toolbar').css('bottom', ($(document).scrollTop() + $(window).height() - $("#globalfooter").position().top + 5)+"px");
            }
            else
            {
                $('#ee-book-toolbar').css('bottom', "0px");
            }
        }
        */
    
    //        if($(window).width() <= 1024)
    //        {
    //            $('#ee-book-toolbar > div').addClass('ee-book-toolbar-visible');
    //        }
    //        else
    //        {
    //            $('#ee-book-toolbar > div').removeClass('ee-book-toolbar-visible');
    //        }
    },


    eeFullscreenClicked:function ()
    {
        var fullDir = '';
        if($("#ee-fullscreenEdition").hasClass('ee-enter_fullscreen'))
        {
            fullDir = 'enter';
        }
        else if($("#ee-fullscreenEdition").hasClass('ee-exit_fullscreen'))
        {
            fullDir = 'exit';
        }
    
        if(fullDir == 'enter')
        {
/*            
            $("#globalheader").css({
                "display" : 'none'
            });
        
            $("#globalmenu").css({
                "display" : 'none'
            });
        
            $("#globalfooter").css({
                "display" : 'none'
            });
        
            $(".zoomExtenders").css({
                "display" : 'none'
            });
*/
            $("#ee-fullscreenEdition").addClass('ee-exit_fullscreen');
            $("#ee-fullscreenEdition").removeClass('ee-enter_fullscreen');
            $("#ee-fullscreenEdition").attr("title", "Exit Fullscreen");       
            fullscreenOn = true;
        }
        else if(fullDir == 'exit')
        {
/*            
            $("#globalheader").css({
                "display" : 'block'
            });
        
            $("#globalmenu").css({
                "display" : 'block'
            });
        
            $("#globalfooter").css({
                "display" : 'block'
            });
        
            $(".zoomExtenders").css({
                "display" : 'block'
            });
*/            
            $("#ee-fullscreenEdition").addClass('ee-enter_fullscreen');
            $("#ee-fullscreenEdition").removeClass('ee-exit_fullscreen');
            $("#ee-fullscreenEdition").attr("title", "Enter Fullscreen");
            fullscreenOn = false;
        }
    
        this.eeZoomState = this.eeGetZoomStateForBestFit();
    
        this.updatePageContent();
        this.setInitialToolbarPosition();
        this.eeAddScrollHandler();
    },

    eeZoomButtonClicked: function (zoomDir)
    {   
        //alert("SmallScreen:" + this.eeSmallScreen + "  PageLayout:" + this.eePageLayout + "  ZoomState:" + this.eeZoomState);
        
        if(zoomDir == 'in')
        {
            $("#ee-book-toolbar").removeAttr('style');
        

            if(this.eeZoomState < this.totalZoomStates)
            {
                if(this.eePageLayout != 1 && this.eeSmallScreen != true) // it is double 
                {
                    if(this.eeZoomState < this.dpMaxStateIndex)
                    {
                        this.eeZoomState++;
                        this.eeZoomChangedA = true;
                        this.eeZoomChangedB = true;
                    }
                }
                else // it is single
                {
                    if(this.eeZoomState < this.spMaxStateIndex)
                    {
                        this.eeZoomState++;
                        this.eeZoomChangedA = true;
                        this.eeZoomChangedB = true;
                    }
                }
            
            }        
        }
        else if(zoomDir == 'out')
        {
            if(this.eeZoomState > 0)
            {                
                if(this.eePageLayout != 1 && this.eeSmallScreen != true) // it is double 
                {
                    if(this.eeZoomState > this.dpMinStateIndex)
                    {
                        this.eeZoomState--;
                        this.eeZoomChangedA = true;
                        this.eeZoomChangedB = true;
                    }
                }
                else // it is single
                {
                    if(this.eeZoomState > this.spMinStateIndex)
                    {
                        this.eeZoomState--;
                        this.eeZoomChangedA = true;
                        this.eeZoomChangedB = true;
                    }
                }
            }
        }
        this.updatePageContent();
        this.eeAddScrollHandler();
        
        //alert("SmallScreen:" + this.eeSmallScreen + "  PageLayout:" + this.eePageLayout + "  ZoomState:" + this.eeZoomState);
    },

    eeNavigateNext:function (changeBy)
    {    
        var bApplied = false;
        if(this.eeCurrentpage + changeBy > 0)
        {
            if(this.eeCurrentpage + changeBy < this.bookData.pagecount)
            {
                this.eeCurrentpage = this.eeCurrentpage + changeBy;
                bApplied = true;
            }
            else
            {
                this.eeCurrentpage = this.bookData.pagecount;
                bApplied = true;        
            }
        }
        else
        {
            this.eeCurrentpage = 0;
            bApplied = true;    
        }    
    
        return bApplied;
    },

    eeCheckAndShowPreviousPage:function ()
    {
        if($("#prevPageEdition").attr("wcdisabled") != 'true')
        {
            if(this.eePageLayout == 1 || this.eeSmallScreen == true)
            {
                this.eeNavigateNext(-1);            
            }
            else
            {
                this.eeNavigateNext(-2);  
            }
            this.updatePageContent();
            this.eeGetOverlays();
        }
    },
    
    eeCheckAndShowNextPage:function ()
    {
        if($("#nextPageEdition").attr("wcdisabled") != 'true')
        {
            if(this.eeCurrentpage > 0)
            {
                if(this.eePageLayout == 1 || this.eeSmallScreen == true)
                {
                    this.eeNavigateNext(1);            
                }
                else
                {
                    this.eeNavigateNext(2);  
                }
            }
            else
            {
                this.eeCurrentpage = 1;
            }
            this.updatePageContent();
            this.eeGetOverlays();
        }
    },


    eeCheckAndChangePageLayout:function ()
    {
        if(this.eeSmallScreen == true)
        {
        //Do nothing as no option in small layout - will never happen
        //$("#ee-page-layout").removeClass("ee-layout-single");
        //$("#ee-page-layout").removeClass("ee-layout-double");
        }
        else
        {
            if(this.eePageLayout == 0 || this.eePageLayout == 2)
            {
                this.eePageLayout = 1;
                $("#ee-page-layout").removeClass("ee-layout-single");
                $("#ee-page-layout").addClass("ee-layout-double");        
                $("#ee-page-layout").attr('title','Switch to double page view');
            }
            else
            {
                this.eePageLayout = 2;
                if(this.eeCurrentpage % 2 == 0)
                {
                    this.eeCurrentpage--;
                }
            
                $("#ee-page-layout").removeClass("ee-layout-double");
                $("#ee-page-layout").addClass("ee-layout-single");
                $("#ee-page-layout").attr('title','Switch to single page view');
            
            }
            this.updatePageContent();
        }
    },

    eeAddNavigationEventHandlers:function ()
    {
        var _this = this;
        
        $("#ee-page-layout").click(function(){
            _this.eeCheckAndChangePageLayout();        
        })
    
        $("#nextPageEdition").click(function(){
            _this.eeCheckAndShowNextPage();        
        })
    
        $("#prevPageEdition").click(function(){
            _this.eeCheckAndShowPreviousPage();
        })
    /*    
    $("#eedition-container").touchwipe({
        wipeLeft: function() {  
            this.eeCheckAndShowNextPage();
        },
        wipeRight: function() {
            this.eeCheckAndShowPreviousPage();
        },     
        min_move_x: 10,
        min_move_y: 10,
        preventDefaultEvents: false
    });
    
    $("#overlays").touchwipe({
        wipeLeft: function() {  
            this.eeCheckAndShowNextPage();
        },
        wipeRight: function() {
            this.eeCheckAndShowPreviousPage();
        },     
        min_move_x: 10,
        min_move_y: 10,
        preventDefaultEvents: false
    });
         */
    
    },

    eeSubMenuEventhandler:function (msg)
    {    
    //this.toggleMenuSearch('menu', 'menu-down-up','sub-menu', '430px', 'menu-item', 'menu-item menu-open');    
    },

    resizeEeditionpage:function ()
    {
        this.eeUpdateResizedZoomStateAndPageNo();
    
        this.updatePageContent();
/*    
        $("#commonFooterExtender").css({
            "height": $("#globalfooter").height()           
        });
    
        $("#commonFooterExtender").css({
            "top": $("#globalfooter").position().top           
        });
*/
    },
    
    setInitialToolbarPosition:function ()
    {
        if($(window).height() >= $(document).height())
        {
            //$('#ee-book-toolbar').css('bottom', ($(document).scrollTop() + $(window).height() - $("#globalfooter").position().top + 5)+"px");
            $('#ee-book-toolbar').css('bottom', ($(document).scrollTop() + $(window).height() + 5)+"px");
        }
        else
        {
            $('#ee-book-toolbar').css('bottom', "0px");
        }
    },

    
    eeAddPageLoadingHandlers:function ()
    {
        $('#eeditionpageA').load(function(obj) {
            
            if(eReaderJS.eePageALastSource == obj.currentTarget.getAttribute("src"))
            {                
                eReaderJS.eeZoomChangedA = false;
                $('#eeditionpageA').hideLoading();
                
                eReaderJS.setInitialToolbarPosition();
                eReaderJS.eeAddScrollHandler();
                eReaderJS.eePageALastSource = ""; 
                eReaderJS.showOverlayIconsPageA(true);
            }
            else if(eReaderJS.eePageALastSource != "")
            {
                $("#eeditionpageA").attr("src", eReaderJS.eePageALastSource);
            }                
        });
      
        $('#eeditionpageB').load(function(obj) {            
            if(eReaderJS.eePageBLastSource == obj.currentTarget.getAttribute("src"))
            {
                
                eReaderJS.eeZoomChangedB = false;
                $('#eeditionpageB').hideLoading();
            
                eReaderJS.setInitialToolbarPosition();
                eReaderJS.eeAddScrollHandler();
                eReaderJS.eePageBLastSource = "";
                eReaderJS.showOverlayIconsPageB(true);
                    
            }
            else if(eReaderJS.eePageBLastSource != "")
            {
                $("#eeditionpageB").attr("src", eReaderJS.eePageBLastSource);
            }            
                
        }); 
    },

    eeAddZoomEventHandlers:function ()
    {
        $('#zoomInEdition').click(function()
        {
            if($(this).attr("wcdisabled") != 'true')
            {
                eReaderJS.eeZoomButtonClicked('in');
            }
        });        
        
        $('#zoomOutEdition').click(function()
        {
            if($(this).attr("wcdisabled") != 'true')
            {
                eReaderJS.eeZoomButtonClicked('out');
            }
        });            
        
    
        $('#ee-fullscreenEdition').click(function()
        {
            eReaderJS.eeFullscreenClicked();
        }); 

    },
/*
    eeAddMenuEventHandlers:function ()
    {
        $("#sub-menu > ul > li").bind({
            click: function(){
                this.eeSubMenuEventhandler($(this).attr("title"));
            }
        });
    },
*/
    eeAddHomeEventHandlers:function ()
    {
        $("#ee-home").bind({
            click: function(){
                window.open("index.html","_self");
            }
        });
    },
  
    eeAddTabEventHandlers:function ()
    {
        //alert("eeAddTabEventHandlers: " + $("#eedition-container").attr("id"));
        if(this.tabEventAdded == false)
        {
            this.tabEventAdded = true;            
            $("#ee-overlays").click(function(e){
                if(e.target !== this)
                {
                    //check to enable click only on parent div and not clildren div's
                    return;
                }
                //if($(window).width() <= 1024)
                {
                    eReaderJS.eeToolBarFadeIn();
                }
            });
        }
    },
    
    eeToolBarFadeIn:function()
    {
        $('#ee-book-toolbar > div').stop().fadeTo("slow",1, function(){
            //alert("fade in complete");
            eReaderJS.eeToolBarFadeOut();
        });
    },
    
    eeToolBarFadeOut:function()
    {
        $('#ee-book-toolbar > div').stop().fadeTo(8000,0.1, function(){
            //alert("fade out complete");
            $("#ee-book-toolbar > div").removeAttr("style");
        });
    },
    
    eeAddResizeEventHandlers:function ()
    {
        $(window).resize( function() {            
            //        resizeMenubar();
            eReaderJS.resizeEeditionpage.apply(eReaderJS);
            eReaderJS.eeAddScrollHandler.apply(eReaderJS);
        });
    },

    domreadyEeditionpage:function ()
    {
        this.eeAddResizeEventHandlers();
    
        this.eeAddPageLoadingHandlers();
    
//        this.eeAddMenuEventHandlers();
    
        this.eeAddHomeEventHandlers();
    
        this.eeAddZoomEventHandlers();     
    
        this.eeAddNavigationEventHandlers();    
            
        this.eeUpdateInitialZoomStateAndPageNo();     
    
        this.updatePageContent();    
    },
/*
    loadBookmap:function ()
    {
        $.getJSON("assets/data/bookmap.json",function(data)
        {        
            this.bookHashMap = data;
        })
    },
*/
    
    //////////////////////////
    ////  API Functions   ////
    //////////////////////////    
    initilaze: function(pageNumber, bookDataObject)
    {
        this.initHardVars();
        this.initZoomSatesVars();
        this.initCalcBaseVars();
        this.initIntermediateVars();
        this.initPreferencesVars();
        
        this.eeCurrentpage = pageNumber;
        this.bookData = bookDataObject;
    },
    
    customize:function(useSingleAudio, useMimimumImages, enableImageViewer)
    {
        this.eeMimimumImages = useMimimumImages;
        this.eeSingleAudio = useSingleAudio;
        //this.eeMinimumZoomStates = useMinimumZoomStates;
        this.eeImageViewerEnabled = enableImageViewer;
        this.eeUpdateZoomStateData();
        
    },
    
    setup:function ()
    {
        this.eeUpdateInitialZoomStateAndPageNo();            
        this.updateImageLayout();        
        this.domreadyEeditionpage();
        this.eeAddTabEventHandlers();    
    },
    
    getCurrentPage:function ()
    {
        return this.eeCurrentpage;
    },
    
    nextPage:function ()
    {
        var currentpage = this.eeCurrentpage;
        this.eeCheckAndShowNextPage();
        if(currentpage < this.eeCurrentpage)
        {
            return true;            
        }
        else
        {
            return false;
        }        
    },
    
    previousPage:function ()
    {
        var currentpage = this.eeCurrentpage;
        this.eeCheckAndShowPreviousPage();
        if(currentpage > this.eeCurrentpage)
        {
            return true;            
        }
        else
        {
            return false;
        }   
    },
    
    
    zoomIn:function ()
    {
        var zoomState = this.eeZoomState;
        this.eeZoomButtonClicked('in');
        if(zoomState < this.eeZoomState)
        {
            return true;            
        }
        else
        {
            return false;
        }   
    },
    
    zoomOut:function ()
    {
        var zoomState = this.eeZoomState;
        this.eeZoomButtonClicked('out');
        if(zoomState > this.eeZoomState)
        {
            return true;            
        }
        else
        {
            return false;
        }   
    }    
    
};

$(window).load(function () {        
    eReaderJS.setInitialToolbarPosition();
    eReaderJS.eeAddScrollHandler();
    eReaderJS.eeGetOverlays();
});

$(window).scroll(function () {
    eReaderJS.eeAddScrollHandler();
});
