let previewModalFlag = 0;
let previewLoaderFlag = 0;
let needHelpFlag = 0;
let previewIconCloseFlag;
$(document).ready(function(){
    // Materialize Initialization Sidenav
    $('.sidenav').sidenav({
        edge:'right'
    });
    // Materialize Initialization Carousel
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
      });
    // Materialize Initialization Dropdown
    $('.dropdown-trigger').dropdown();

    // Materialize Select option
    $('select').formSelect();

    // Materialize Initialization Modal
    $('.modal').modal();
    // Materialize Initialization Tooltip
    $('.tooltipped').tooltip();
    let previewModalFlag = 0;
    $('#preview-modal').modal(
        {
            onOpenEnd: function(e){
                window.location.hash = "previewmodal";
                previewModalFlag = 1;
            },
            onCloseEnd:function(e){
                if(previewModalFlag == 1){
                    window.history.back();
                    previewModalFlag = 0;
                }
            }
        }
    );
    $(window).on('hashchange', function(event) {
        if (window.location.hash != "#previewmodal" && previewModalFlag == 1) {
            previewModalFlag = 0;
            $('#preview-modal').modal('close');
        }
    });
    $('#preview-loader').modal(
        {
            onOpenEnd: function(e){
                window.location.hash = "previewloader";
                previewLoaderFlag = 1;
            },
            onCloseEnd:function(e){
                if(previewLoaderFlag == 1){
                    window.history.back();
                    previewLoaderFlag = 0;
                }
            }
        }
    );
    $(window).on('hashchange', function(event) {
        if (window.location.hash != "#previewloader" && previewLoaderFlag == 1) {
            previewLoaderFlag = 0;
            $('#preview-loader').modal('close');
        }
    });
    // for need help preview
    $('#needHelpModal').modal(
        {
            onOpenEnd: function(e){
                window.location.hash = "helpModal";
                needHelpFlag = 1;
            },
            onCloseEnd:function(e){
                if(needHelpFlag == 1){
                    window.history.back();
                    needHelpFlag = 0;
                }
            }
        }
    );
    $(window).on('hashchange', function(event) {
        if (window.location.hash != "#helpModal" && needHelpFlag == 1) {
            needHelpFlag = 0;
            $('#needHelpModal').modal('close');
        }
    });

    // for need help preview
    $('#needHelpShareModal').modal(
        {
            onOpenEnd: function(e){
                window.location.hash = "helpModal";
                needHelpFlag = 1;
            },
            onCloseEnd:function(e){
                if(needHelpFlag == 1){
                    window.history.back();
                    needHelpFlag = 0;
                }
            }
        }
    );
    $(window).on('hashchange', function(event) {
        if (window.location.hash != "#helpModal" && needHelpFlag == 1) {
            needHelpFlag = 0;
            $('#needHelpShareModal').modal('close');
        }
    });

    // Stoping Enter Button to submit upload form
    $('#print-option-form').on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          e.preventDefault();
          return false;
        }
      });

    //All Steps Event & function
    $("#step1-next-btn").click(function () {
        if(document.querySelector('#fileInput').files[0] !== undefined){
            canReset = true;
            goStep1ToStep2();
        }
        else{
            $('#fileError').text("Please choose a file");
            $('#file-input-error').show();
            $('#uploadFileForm').addClass('tz-fileError');
        }
    });
    $(".step2-prev-btn").click(function () {
		goStep2ToStep1();
    });
    $("#step2-next-btn").click(function () {
        if($("input[name='page_range_type']:checked"). val() == 'custom' && pageRangeFlag == 1){
            $('#page-range-error-text').text("Please enter a valid page range.");
            $('#custom-range-input-block').addClass('tz-custom-range-input-error');
        }else{
            goStep2ToStep3();
        }
    });
    $("#step3-prev-btn").click(function () {
		goStep3ToStep2();
    });
    let uploadPage = 1;
    function goStep1ToStep2(){
        calculatePrice();
        $("#step1").removeClass('tz-step-active');
        $("#step1").addClass('tz-step-completed');
        $("#step2").addClass('tz-step-active');
        $('#step1-container').hide();
        $('#ecoRate').text( rateObject[colorModeValue]['EC'][level]);
        $('#superRate').text( rateObject[colorModeValue]['SP'][level]);
        $('#step2-container').show();
        uploadPage = 3;
    }
    function goStep2ToStep1(){
        $('#step2-container').hide();
        $('#step1-container').show();
        $("#step1").removeClass('tz-step-completed');
        $("#step1").addClass('tz-step-active');
        $("#step2").removeClass('tz-step-active');
        uploadPage = 2;
    }
    function goStep2ToStep3(){
        $('#step2-container').hide();
        $('#step3-container').show();
        $("#step2").removeClass('tz-step-active');
        $("#step2").addClass('tz-step-completed');
        $("#step3").addClass('tz-step-active');
        uploadPage = 4;
    }
    function goStep3ToStep2(){
        $('#step3-container').hide();
        $('#step2-container').show();
        $("#step2").removeClass('tz-step-completed');
        $("#step2").addClass('tz-step-active');
        $("#step3").removeClass('tz-step-active');
        uploadPage = 3;
    }

    // Block link for upload form when form is not been submitted
    window.addEventListener("beforeunload", function (e) {
        if(uploadPage > 1 && !formSubmitting){
            for (const [key, value] of Object.entries(e)) {
                console.log(e);
                // if(value.toString().includes("stations"))
                    // {
                        console.log(`${key}: ${value}`);
                    // }
            }
            var confirmationMessage = 'It looks like you have been editing something. '
                        + 'If you leave before saving, your changes will be lost.';
            const loader = $('.tz-loader');
            loader.removeClass("tz-shown");
            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        }
    });
    var formSubmitting = false;
    $('#print-option-form').on('submit',function(e){
        e.preventDefault();
        formSubmitting = true;
        e.currentTarget.submit();
    });

    // history.pushState(null, null, location.href);
    // history.back();
    // history.forward();
    // window.onpopstate = function () {
    //     console.log("working");
    //     history.go(1);
    // };
    // if (performance.navigation.type == 2) {
    //     alert("Back button clicked");
    // }
    let colorModeValue = 'BW', qualityModeValue = 'EC';
    // Radio Button Style Change
    $('input[name="color_mode"]').click(function () {
        radioColorChange();
        calculatePrice();
    });
    function radioColorChange(){
        let colorMode = $("input[name='color_mode']:checked"). val();

        if(colorMode == "CL"){
            $('#label_color').addClass('tz-radio-active');
            $('#label_black').removeClass('tz-radio-active');
            colorModeValue = 'CL';
        }else{
            $('#label_black').addClass('tz-radio-active');
            $('#label_color').removeClass('tz-radio-active');
            colorModeValue = 'BW';
        }
        $('#ecoRate').text( rateObject[colorModeValue]['EC'][level]);
        $('#superRate').text( rateObject[colorModeValue]['SP'][level]);
    }
    $("input[name='quality']").click(function () {
        radioQualityChange();
        calculatePrice();
    });
    function radioQualityChange(){
        let quality = $("input[name='quality']:checked"). val();

        if(quality == "SP"){
            $('#label_super').addClass('tz-radio-active');
            $('#label_eco').removeClass('tz-radio-active');
            $('#qualityHelpText').parent().addClass('superHelpText');
            $('#qualityHelpText').text('For cheap price select Eco');
            qualityModeValue = 'SP';
        }else{
            $('#label_eco').addClass('tz-radio-active');
            $('#label_super').removeClass('tz-radio-active');
            qualityModeValue = 'EC';
            $('#qualityHelpText').parent().removeClass('superHelpText');
            $('#qualityHelpText').text('For superior quality select Super ');
        }
    }
    $("input[name='is_public']").click(function () {
        let isSharable = $("input[name='is_public']:checked"). val();
          if(isSharable == "false"){
              $('#share-info-text').hide();
        }else{
            $('#share-info-text').show();
        }

    });
    $('.is_sharable').click(function () {
        radioSharableChange();
    });
    function radioSharableChange(){
        let isSharable = $(".is_sharable:checked").val();
        if(isSharable == "true"){
            $('#label_share_true').addClass('tz-radio-active');
            $('#label_share_false').removeClass('tz-radio-active');
            $('#printing-option-block').hide();
            $('#sharing-form-btn').show();
        }else{
            $('#label_share_false').addClass('tz-radio-active');
            $('#label_share_true').removeClass('tz-radio-active');
            $('#printing-option-block').show();
            $('#sharing-form-btn').hide();
        }
    }
    $('#share-submit').click(function () {
        $('input[name="color_mode"]').prop('checked', false);
        $('input[name="quality"]').prop('checked', false);
        $('input[name="page_range_type"]').prop('checked', false);
        $('input[name="page_range"]').val("");
        $('input[name="copies"]').val("");
        $('input[name="payment_mode"]').prop('checked', false);
        $('input[name="payment_mode"]').removeAttr('required');
        $('#print-option-form').submit();
    });
    if(document.querySelector('#guestUploadSubmit')){
        $('#guestUploadSubmit').click(function () {
            $("input[name='payment_mode']:checked").val("FR");
            $('#print-option-form').submit();
        });
    }
    $('input[name="page_range_type"]').click(function () {
        radioCustomPageChange();
        calculatePrice();
    });
    function radioCustomPageChange(){
        let pageRange = $("input[name='page_range_type']:checked").val();

        if(pageRange == "all"){
            $('#label_all_pages').addClass('tz-radio-active');
            $('#label_custom_pages').removeClass('tz-radio-active');
            $("#custom_range").val("");
            $('#custom-range-block').hide();
            pagesToPrint = pagesValue;
        }else{
            $('#label_custom_pages').addClass('tz-radio-active');
            $('#label_all_pages').removeClass('tz-radio-active');
            $('#custom-range-block').show();
        }
    }
    $('input[name="payment_mode"]').click(function () {
        radioPaymentChange();
        $('#infoTextPayCont').show();
    });
    function radioPaymentChange(){
        let paymentMode = $("input[name='payment_mode']:checked").val();
        if(paymentMode == "CO"){
            $('#label_coin').addClass('tz-radio-active');
            $('#label_wallet').removeClass('tz-radio-active');
            $('#label_free').removeClass('tz-radio-active');
            $('#infoTextForPayMode').text("2₹ coin is not allowed.");
            $('#infoTextForPayModePopup').text("2₹ coin is not allowed.");
        }else if(paymentMode == "FR"){
            $('#label_free').addClass('tz-radio-active');
            $('#label_coin').removeClass('tz-radio-active');
            $('#label_wallet').removeClass('tz-radio-active');
            $('#infoTextForPayMode').text("There will be additional footer at the bottom of printed page.");
            $('#infoTextForPayModePopup').text("There will be additional footer at the bottom of printed page.");
        }
        else{
            $('#label_wallet').addClass('tz-radio-active');
            $('#label_coin').removeClass('tz-radio-active');
            $('#label_free').removeClass('tz-radio-active');
            $('#infoTextForPayMode').text("Your amount will deducted from your wallet.");
            $('#infoTextForPayModePopup').text("Your amount will deducted from your wallet.");
        }
    }

    function copyShareLink() {
        let copyText = document.getElementById("share_file_link");
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
    }


    // Validate Range
    $("#custom_range").keyup(function () {
        validateRange();
        calculatePrice();
    });
    let pageRangeFlag = 1;
    function validateRange(){
        let rangeRegx = /^ ?\d+ ?(- ?\d+ ?)?(, ?\d+ ?(- ?\d+ ?)?)*$/;
        let ele = document.querySelector('#custom_range');
        let range = ele.value;
        let checkEqualFlag = 0;
        if(!rangeRegx.test(range)){
            // $('#page-range-error-text').text("Please enter a valid page range.");
            // $('#custom-range-input-block').addClass('tz-custom-range-input-error');
            pageRangeFlag = 1;
        }else{
            pageRangeFlag = 0;
            let removeComma = range.split(',');
            let removeHyphen;
            let pages = new Array();
            let k=0;
            removeComma.forEach(commaElement => {
                if(commaElement.includes('-')){
                    removeHyphen = commaElement.split('-');
                        if(removeHyphen.length == 2){
                            if(parseInt(removeHyphen[0]) <= parseInt(removeHyphen[1])){
                                for(let i=parseInt(removeHyphen[0]);i<=parseInt(removeHyphen[1]);i++){
                                    // let checkEqualFlag = 0;
                                    for(let j=0;j<k;j++){
                                        if(pages[j]== i){
                                            checkEqualFlag = 1;
                                            pageRangeFlag = 1;
                                            break;
                                        }
                                    }
                                    if(checkEqualFlag == 0){
                                        pages[k] = i;
                                        k++;
                                    }
                                }
                            }
                            else{
                                pageRangeFlag = 1;
                            }
                        }
                }else{
                    // let checkEqualFlag = 0;
                    for(let j=0;j<k;j++){
                        if(pages[j]== parseInt(commaElement)){
                            checkEqualFlag = 1;
                            pageRangeFlag = 1;
                            break;
                        }
                    }
                    if(checkEqualFlag == 0){
                        pages[k]=parseInt(commaElement);
                        k++;
                    }

                }
            });
            for(let i=0;i<pages.length;i++){
                if(pages[i]>pagesValue){
                    pageRangeFlag = 1;
                    break;
                }
            }
            if(pages.length > limited_copies){
                pageRangeFlag = 1;
           }
            if(pageRangeFlag == 0){
                $('#custom-range-input-block').removeClass('tz-custom-range-input-error');
                pagesToPrint = pages.length;
            }else{
                if(checkEqualFlag == 0){
                    $('#page-range-error-text').text("Please enter a valid page range.");
                }else{
                    $('#page-range-error-text').text("No repeated pages are allowed.");
                }
                $('#custom-range-input-block').addClass('tz-custom-range-input-error');
            }
            validateLimitedCopies();
        }
    }
    function validateLimitedCopies(){
        // $('#limitedCopiesError').hide();
        let copies = $('#copies').val();
        if(pagesToPrint * copies > limited_copies){
                alert("You can't print more than our page range limit("+limited_copies+" pages) without login! Please login or register for FREE to increase this limit.");
        }
        while(pagesToPrint * copies > limited_copies){
            copies--;
        }
        $('#copies').val(copies);
    }
    // Caculating Copies
    $("#add-btn").click(function () {
        addCopies();
        calculatePrice();
    });
    $("#sub-btn").click(function () {
        subtractCopies();
        calculatePrice();
    });
    $("#copies").change(function(){
        let copies = $('#copies').val();

        if(copies < 1){
            copies = 1;
            $('#copies').val(copies);
        }else{
            validateLimitedCopies()
        }
        calculatePrice();
    })
    function addCopies(){
        let copies = $('#copies').val();
        if(copies > 0){
            copies++;
            if(pagesToPrint * copies > limited_copies){
                alert("You can't print more than our page range limit("+limited_copies+" pages) without login! Please login or register for FREE to increase this limit.");
            }else{
                $('#copies').val(copies);
            }
        }else{
            copies = 1;
            $('#copies').val(copies);
        }
    }

    function subtractCopies(){
        let copies = $('#copies').val();
        if(copies > 1){
            copies--;
            if(pagesToPrint * copies > limited_copies){
                alert("You can't print more than our page range limit("+limited_copies+" pages) without login! Please login or register for FREE to increase this limit.");
            }else{
                $('#copies').val(copies);
            }
        }else{
            copies = 1;
        }
        $('#copies').val(copies);
    }

    //Calculate Price
    function calculatePrice(){
        // Setting payment value to null
        $('input[name="payment_mode"]').prop('checked', false);
        $('#label_coin, #label_wallet, #label_free').removeClass('tz-radio-active');
        let rate;
        rate = rateObject[colorModeValue][qualityModeValue][level];
        let copiesValue = parseInt($('#copies').val());
        let amount = rate * pagesToPrint * copiesValue;
        $('#amountTxt').text(amount);
        $('#pagesTxt').text(pagesToPrint * copiesValue);
        $('#amountPaymntTxt').text(amount);
        console.log(isAuthenticated);
        console.log(freeBalance);
        if(isAuthenticated){
            if(amount > walletBalance){
                document.querySelector('#wallet').disabled = true;
                $('#label_wallet').addClass('tz-radio-disabled');
                $('#walletLessInfo').show();
            }else{
                document.querySelector('#wallet').disabled = false;
                $('#label_wallet').removeClass('tz-radio-disabled');
                $('#walletLessInfo').hide();
            }
            if(amount > freeBalance){
                console.log("disabled free balance");
                document.querySelector('#free').disabled = true;
                $('#label_free').addClass('tz-radio-disabled');
                $('#freeLessInfo').show();
                console.log("disabled free balance");

            }else{
                document.querySelector('#free').disabled = false;
                $('#label_free').removeClass('tz-radio-disabled');
                $('#freeLessInfo').hide();
            }
        }
        // if(qualityModeValue == "SP"){
            // document.querySelector('#free').disabled = true;
            // $('#label_free').addClass('tz-radio-disabled');
            // $('#freeLessInfo').hide();
            // $('#superNotForFree').show();
        // }else{
            // document.querySelector('#free').disabled = false;
            // $('#label_free').removeClass('tz-radio-disabled');
            // $('#superNotForFree').hide();
        // }
    }

    $('.showPassword').click(function () {
        showPassword(this)

    });
    function showPassword(element){
        let psswdInp = $(element).prev();
        let passwdIcon = element.childNodes[0];
        if($(psswdInp).prop('type') === "password"){
            $(psswdInp).prop('type','text');
            passwdIcon.classList.remove('fa-eye-slash')
            passwdIcon.classList.add('fa-eye');

        }else{
            $(psswdInp).prop('type','password');
            passwdIcon.classList.remove('fa-eye')
            passwdIcon.classList.add('fa-eye-slash');
        }
    }
     //Switch History Table Event & Function
    $("#not-printed-btn, #printed-btn, #share-btn").click(function () {
        switchTable(this)
    });
    function switchTable(element) {
        if(element.id === 'printed-btn'){
            $('#printed-btn').addClass('tz-history-active-btn');
            $('#not-printed-btn').removeClass('tz-history-active-btn');
            $('#share-btn').removeClass('tz-history-active-btn');
            $('#not-printed-container').hide();
            $('#share-container').hide();
            $('#printed-container').show();
        }else if(element.id === 'not-printed-btn'){
            $('#not-printed-btn').addClass('tz-history-active-btn');
            $('#printed-btn').removeClass('tz-history-active-btn');
            $('#share-btn').removeClass('tz-history-active-btn');
            $('#printed-container').hide();
            $('#share-container').hide();
            $('#not-printed-container').show();
        }else{
            $('#share-btn').addClass('tz-history-active-btn');
            $('#printed-btn').removeClass('tz-history-active-btn');
            $('#not-printed-btn').removeClass('tz-history-active-btn');
            $('#printed-container').hide();
            $('#not-printed-container').hide();
            $('#share-container').show();
        }
    }
    // Mobile Accordion Table Functions
	var maxMobileSize = 721; // this value should match the media query
    var accordionTableSelector = ".table-accordion" // this value should match with table class;

	var checkScreenSize = function() {
		var width = $(window).width();

		if (width < maxMobileSize) {
			handleMobile();
		} else {
			handleDesktop();
		}
	};

    window.addEventListener("resize", checkScreenSize, false);

	function handleMobile() {
		slideUpAllInactive();
    }

	function handleDesktop() {
		showRows();
    }

	function showRows() {
		$(accordionTableSelector + " .tr").each(function () {
			$(this).removeAttr("style");
		});
    }

	function slideUpAllInactive() {
		$(accordionTableSelector + " .rh").not(".row-active").each(function() {
			$(this).next().slideUp();
		});
    }

    // Click Event to Display Row
    $(accordionTableSelector + " .rh").click(function () {
		handleMobileAccordionTableClick(this);
    });

	function handleMobileAccordionTableClick(rowHeader) {
		var table = $(rowHeader).parents(accordionTableSelector);

		$(table).find(".rh").each(function () {
			$(this).removeClass("row-active");
		});

		slideUpAllInactive();

		var nextRow = $(rowHeader).next();
		if (!nextRow.is(":visible")) {
			$(rowHeader).addClass("row-active");
			nextRow.slideDown();
		}
	}

	// Need to run this on first load
    checkScreenSize();


// });
//Camera File Change

    //Drag and Drop Variable
    var uploadFileForm = document.getElementById("uploadFileForm");
    var fileText = document.getElementById("fileText");
    var fileInput = document.getElementById("fileInput");
    var fileLabel = document.getElementById("fileLabel");
    var droppedFiles;

    //Drag and Drop Events
    $(uploadFileForm)
    // .on("submit", function (event) {
    //     uploadFiles(event);
    //     })
    .on("dragenter", function () {
        overrideDefault(event),fileHover()
        })
    .on("dragover", function () {
        overrideDefault(event),fileHover()
        })
    .on("dragleave", function () {
        overrideDefault(event),fileHoverEnd()
    })
    .on("drop", function () {
        overrideDefault(event),fileHoverEnd(),addFiles(event)
        });
    $(fileInput).on("change", function () {
        addFiles(event);
    });

    //Drag and Drop Function
    function overrideDefault(event){
        event.preventDefault();
        event.stopPropagation();
    }

    function fileHover(){
        uploadFileForm.classList.add("fileHover");
    }

    function fileHoverEnd(){
        uploadFileForm.classList.remove("fileHover");
    }

    function addFiles(event){
        droppedFiles = event.target.files || event.dataTransfer.files;
        // First time drag and drop not working so added this
        if(!event.target.files){
            document.querySelector('#fileInput').files = event.dataTransfer.files;
        }
        showFiles(droppedFiles);
    }

    function resetUploadForm(){
        $('#black').trigger('click');
        $('#eco').trigger('click');
        $('#all_pages').trigger('click');
        $('#custom_range').val("");
        pageRangeFlag = 1;
        $('#copies').val(1);
        $('#coin').trigger('click');
    }
    let canReset = false
    function showFiles(files){
        uploadPage = 1;
        if(canReset){
            resetUploadForm();
        }
        let allowed_types = ["pdf","doc","docx","jpeg", "jpg", "png","xls","xlsx","ppt","pptx"];
        let fileName;
        if(files.length == 1){
            fileName =files[0].name;
        }
        if(files.length == 1 && files[0].size <= 10485760 && allowed_types.includes(fileName.slice(fileName.lastIndexOf('.') + 1, ).toLowerCase())){
            fileText.innerText = files[0].name;
            fileLabel.innerText = "Change";
            $('#file-input-error').hide();
            $('#uploadButton').hide();
            $('#uploadFileForm').removeClass('tz-fileError');
            $('#uploadInputContainer').hide();
            $("#uploadFileForm").trigger("submit");
            if(fileName.slice(fileName.lastIndexOf('.') + 1, ).toLowerCase() == "xls" || fileName.slice(fileName.lastIndexOf('.') + 1, ).toLowerCase() == "xlsx"){
                $('#excelHelpText').show();
            }else{
                $('#excelHelpText').hide();
            }
        }else{
            if(files.length < 1){
                makeDefaultForm('Please choose a file');
            }else if(files.length > 1){
                makeDefaultForm('Multiple Files Not Supported');
            }else if(!allowed_types.includes(fileName.slice(fileName.lastIndexOf('.') + 1, ).toLowerCase())){
                makeDefaultForm('Wrong File Format.');
            }else if(files[0].size >= 10485760){

                makeDefaultForm('File must be less than 10mb.');
            }else{
                makeDefaultForm('File Error on Uploading File.');
            }
        }
    }
    // File Change
    $("#cameraFile").change(function(){
        if(this.files.length > 0){
            document.querySelector('#fileInput').files = this.files;
            showFiles(this.files);
        }
    });
    // $("#pdfFile").change(function(){
    //     if(this.files.length > 0){
    //         document.querySelector('#fileInput').files = this.files;
    //         showFiles(this.files);
    //     }
    // });
    $("#imageFile").change(function(){
        if(this.files.length > 0){
            document.querySelector('#fileInput').files = this.files;
            showFiles(this.files);
        }
    });
    // $("#officeFile").change(function(){
    //     if(this.files.length > 0){
    //         document.querySelector('#fileInput').files = this.files;
    //         showFiles(this.files);
    //     }
    // });

    // Make Default Upload Form with error
    function makeDefaultForm(errorMsg){
        fileText.innerText = "";
        fileLabel.innerText = "Choose File";
        $('#cloud-icon').show();
        $('#uploadInputContainer').show();
        $('#file-input-error').show();
        $('#fileError').text(errorMsg);
        $('#uploadFileForm').addClass('tz-fileError');
        $('#excelHelpText').hide();
        $('#preview-btn-container').removeClass('inline-grid');
        $('#progressContainer').hide();
        $('#uploadButton').show();
    }

    // let previewModalFlag;
    //Global Variable for Calculating Price
    let pagesValue, pagesToPrint, file_url, bool, level, rateObject;
    //Upload File Submit
    $('#uploadFileForm').submit(function(e) {
        e.preventDefault();
        $('#preview-btn-container').removeClass('inline-grid');
        $('#cloud-icon').show();
        $('.page-range-error').hide();
        $('#progressBar').removeClass('indeterminate');
        $('#progressBar').addClass('determinate');
        $('#progressBar').css('width','0%');
        $('#progressContainer').show();
        let formData = new FormData(this);
        $.ajax({
            url:$(this).attr("action"),
            type: 'POST',
            data: formData,
            success: function(response) {
                // console.log("Response Came : " , response);
                if (response.error) {
                    // console.log(response.message);
                    makeDefaultForm(response.message);
                } else{
                    // Backend Data Transfer
                    pagesValue = response.pages;
                    if (parseInt(pagesValue) === 1){
                        $("#page_range_section").hide();
                    }else{
                        $("#page_range_section").show();
                    }
                    checkPageRange();
                    rateObject = response.rate_object;
                    file_url = response.file_url;
                    level = response.file_level;
                    if (parseInt(level) === 2){
                        $("#high_rate_msg").show();
                    }
                    $("input[name='file']").val(response.file_id);
                    $('#progressContainer').hide();
                    $('#cloud-icon').hide();
                    $("#loading-preview-div").show();
                    $('#uploadButton').show();
                    uploadPage = 2;
                    bool = 1;
                    previewIconCloseFlag = 0;
                    $('#canvas-container').empty();
                    preview(file_url);
                    closePreviewLoader();
                }
            },
            statusCode:{
                502: function(){
                    // console.log("status code called");
                    makeDefaultForm("Upload failed!!! Please try again.")
                }
            },
            xhr: function() {
                let xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(event) {
                    if(event.lengthComputable){
                        let per = Math.round((event.loaded / event.total) * 100);
                        per = per + "%";
                        $('#progressBar').css('width', per);
                        $('#progress-status').text(Math.round((event.loaded / event.total) * 100) + "% uploaded...(" + (event.loaded / 1000000).toFixed(2) + " mb/" + (event.total / 1000000).toFixed(2) + " mb)");
                        if(per == "100%"){
                            $('#progressBar').removeClass('determinate');
                            $('#progressBar').addClass('indeterminate');
                            $('#progress-status').text("File is Uploaded, it may take some time for processing.");
                        }
                    }
                }, !1);
                xhr.addEventListener("error", function(event) {
                    // console.log("xhr error called");
                    makeDefaultForm("Upload failed!!! Please try again.")
                }, !1);
                xhr.addEventListener("abort", function(event) {
                    // console.log("xhr abort called");
                    makeDefaultForm("Upload Aborted!!! Please try again.")
                    // $('#progress-status').text("Upload Aborted");
                    // $('#progressContainer').hide();
                    // $('#uploadButton').show();
                }, !1);
                xhr.addEventListener("load", function(event) {
                    $('#progress-status').text("Rendering the file, it may take some time.");
                    // console.log(event);
                    // $('#progressBar').val(100);
                    // $('#progressBar').css('width', '100%');
                }, !1);
                return xhr
            },
            cache: !1,
            contentType: !1,
            processData: !1
        });
    });
    function checkPageRange(){
        if(pagesValue > limited_copies){
            pagesToPrint = limited_copies;
            $('#custom_range').val("1-"+limited_copies);
            $('#total_pages1').text(pagesValue);
            $('#total_pages2').text(pagesValue);
            $('.page-range-error').show();
            document.querySelector('#custom_pages').checked = true;
            radioCustomPageChange();
            $("#page_range_section").hide();
            pageRangeFlag = 0;
        }else{
            pagesToPrint = pagesValue;
            $('#custom_range').val("");
            $('.page-range-error').hide();
            document.querySelector('#all_pages').checked = true;
            radioCustomPageChange();
        }
    }
    function closePreviewLoader(){
        $('#preview-btn').attr('href','#preview-modal');
        $('#preview-icon').attr('data-target','preview-modal');
        if (window.location.hash == "#previewloader" && previewLoaderFlag == 1) {
            previewLoaderFlag = 0;
            $('#preview-loader').modal('close');
            window.history.back();
            $('#preview-modal').modal('open');
        }
    }


    let pdfDoc, pageNum, pageIsRendering, pageNumIsPending, scale, canvas, ctx, canvasCount = 0;
    function preview(url) {

        pdfDoc = null, pageNum = 1, pageIsRendering = !1, pageNumIsPending = null, scale = 1;
        // $("#canvas-container").show();
        let id = getCanvasElement();
            // url = file_url;
            // url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
        canvas = document.getElementById(id), ctx = canvas.getContext('2d');
        pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            $('#page-count').text(pdfDoc.numPages);
            renderPage(pageNum, bool);
        })
    }
    // Open Preview for history page
    $(".preview-model-event").click(function () {
       $('#canvas-container').empty();
        openPreview($(this).attr('data-url'));
    });
    function openPreview(get_url){
        $.ajax({
            url:get_url,
            type: 'GET',
            success: function(response) {
                if (response.error) {
                console.log(response.error);
                } else{
                    // pdfData = atob(response.file_content);
                    // for opening preview
                    bool = 0;
                    preview(get_url);
                }
            },
        });
    }

    //Making Canvas Element for each Preview and removing previous render preview
    function getCanvasElement() {
        let id, container = document.querySelector('#canvas-container'),
            canvas = document.createElement("canvas");
        // if (canvasCount == 0) {
            canvasCount++
        // } else {
        //     id = "my-canvas" + canvasCount;
        //     // let removingElement = document.getElementById(id);
        //     // container.removeChild(removingElement);
        //     canvasCount++
        // }
        id = "my-canvas" + canvasCount;
        canvas.setAttribute("id", id);
        container.appendChild(canvas);
        return (id)
    }
    //Rendering Pdf page in canvas
    const renderPage = (num, bool) => {
        pageIsRendering = !0;
        pdfDoc.getPage(num).then(page => {
            $('#preview-modal').modal('open');
            let container = document.querySelector('#canvas-container'),
                viewport = page.getViewport(1);
            scale = container.clientWidth / viewport.width;
            viewport = page.getViewport(scale);
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            if (bool) {
                $('#preview-modal').modal('close');
            }
            const renderCtx = {
                canvasContext: ctx,
                viewport
            };
            page.render(renderCtx).promise.then(() => {
                pageIsRendering = !1;
                if (pageNumIsPending !== null) {
                    renderPage(pageNumIsPending, bool);
                    pageNumIsPending = null
                }
            });
            $('#page-num').text(num);
            if(previewIconCloseFlag == 0){
                previewIconCloseFlag = 1;
                $("#loading-preview-div").hide();
                $('#preview-btn-container').addClass('inline-grid');
                // $('#preview-icon').show();
            }
        })
    };
    const queueRenderPage = num => {
        if (pageIsRendering) {
            pageNumIsPending = num
        } else {
            renderPage(num, 0)
        }
    };
    $("#prev").click(function () {
        showPrevPage();
    });
    const showPrevPage = () => {
        if (pageNum <= 1) {
            return
        }
        pageNum--;
        queueRenderPage(pageNum)
    };
    $("#next").click(function () {
        showNextPage();
    });
    const showNextPage = () => {
        if (pageNum >= pdfDoc.numPages) {
            return
        }
        pageNum++;
        queueRenderPage(pageNum)
    };

});
$("#male, #female, #custom").click(function () {
    radioGenderChange()
});
function radioGenderChange(){
    let gender = $("input[name='gender']:checked"). val();

    if(gender == "ML"){
        $('#label_male').addClass('tz-radio-active');
        $('#label_female').removeClass('tz-radio-active');
        $('#label_custom').removeClass('tz-radio-active');
    }else if(gender == "FL"){
        $('#label_female').addClass('tz-radio-active');
        $('#label_male').removeClass('tz-radio-active');
        $('#label_custom').removeClass('tz-radio-active');
    }else if(gender == "CS"){
        $('#label_custom').addClass('tz-radio-active');
        $('#label_male').removeClass('tz-radio-active');
        $('#label_female').removeClass('tz-radio-active');
    }
}
// Ready jquery function Ends here


    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // some code..
        $('.onMobile').show();
    }else{
        $('.onMobile').hide();
    }

// Form Method

function  showFormError(){
    if($('.form-error').attr('errortext') != ""){
        $('.form-error .tz-form-error').find('span').text($('.form-error').attr('errortext'));
        $('.form-error .tz-form-error').show();
    }else{
        $('.form-error .tz-form-error').hide();
    }
    $('.form-error :input').each(function(){
        let input = $(this);
        if(input.attr('errortext') != ""){
            input.addClass('tz-inp-error');
            input.parent().next().find('span').text(input.attr('errortext'));
            input.parent().next().show();
        }else{
            input.removeClass('tz-inp-error');
            input.parent().next().hide();
        }
    })

}
// Sign Up Page
function validateSignUp(){
    let errorFlag = 0;
    let mobileNoInp = $('#mobile-number');
    let mobileRegx = /^\d{10}$/;
    let referCodeRegx = /^\d{10}$/;
    if(!mobileRegx.test(mobileNoInp.val())){
        // Mobile Number is wrong
        mobileNoInp.attr('errortext',"Incorrect Mobile Number")
        errorFlag = 1;
    }else{
        mobileNoInp.attr('errortext',"");
    }
    let password = $('#sign-up-password1');
    let passwordRegx = /.{4,}/;
    if(!passwordRegx.test(password.val())){
        // Password is invalid
        password.attr('errortext',"Password must contain atleast 4 characters!")
        errorFlag = 1;
    }else{
        password.attr('errortext',"")
    }
    let referalCode = $('#referalCode');
    if((!referCodeRegx.test(referalCode.val()) && referalCode.val().length != 4) && referalCode.val() != ""){
        // Mobile Number is wrong
        referalCode.attr('errortext',"Invalid Refer Code");
        errorFlag = 1;
    }else{
        referalCode.attr('errortext',"");
    }
    if(errorFlag == 1){
        showFormError()
        return false;
    }
}
// Teacher Sign Up Page
function validateTeacherSignUp(){
    let errorFlag = 0;
    let mobileNoInp = $('#mobile-number');
    let mobileRegx = /^\d{10}$/;
    let referCodeRegx = /^\d{10}$/;
    if(!mobileRegx.test(mobileNoInp.val())){
        // Mobile Number is wrong
        mobileNoInp.attr('errortext',"Incorrect Mobile Number");
        errorFlag = 1;
        // for Scrolling to error
        mobileNoInp[0].scrollIntoView();
        // Adding 84 scroll down to get below header
        window.scrollBy(0, -84);
    }else{
        mobileNoInp.attr('errortext',"");
    }
    let password = $('#password1');
    let passwordRegx = /.{4,}/;
    if(!passwordRegx.test(password.val())){
        // Password is invalid
        password.attr('errortext',"Password must contain atleast 4 characters!")
        errorFlag = 1;
    }else{
        password.attr('errortext',"")
    }
    let referalCode = $('#referalCode');
    if((!referCodeRegx.test(referalCode.val()) && referalCode.val().length != 4) && referalCode.val() != ""){
        // Mobile Number is wrong
        referalCode.attr('errortext',"Invalid Refer Code");
        errorFlag = 1;
    }else{
        referalCode.attr('errortext',"");
    }
    if(errorFlag == 1){
        showFormError();
        // showSelectFormError();
        // $("")[0].scrollIntoView();
        return false;
    }
}
//Sign in page
function validateSignIn(){
    let mobileNo = $('#mobile-number');
    let mobileRegx = /^\d{10}$/;
    if(!mobileRegx.test(mobileNo.val())){
        // Mobile Number is wrong
        mobileNo.attr('errortext',"Incorrect Mobile Number")
        showFormError()
        return false;
    }else{
        mobileNo.attr('errortext',"");
    }
}
//Forgot Password page
function validateForgotPassword(){
    let errorFlag = 0;
    let mobileNo = $('#mobile-number');
    let mobileRegx = /^\d{10}$/;
    if(!mobileRegx.test(mobileNo.val())){
        // Mobile Number is wrong
        mobileNo.attr('errortext',"Incorrect Mobile Number")
        showFormError()
        return false;
    }else{
        mobileNo.attr('errortext',"");
    }
}
//Reset Password
function validateResetPassword(){
    let errorFlag = 0;
    let password = $('#reset-password1');
    let passwordRegx = /.{4,}/;
    if(!passwordRegx.test(password.val())){
        // Password is invalid
        password.attr('errortext',"Password must contain atleast 4 characters!")
        errorFlag = 1;
    }else{
        password.attr('errortext',"");
    }
    if(errorFlag == 0){
        let password2 = $('#reset-password2');
        if(password.val() != password2.val()){
            // Password did'nt matched
            password2.attr('errortext',"Password did not match")
            errorFlag = 1;
        }else{
            password2.attr('errortext',"")
        }
    }
    if(errorFlag == 1){
        showFormError()
        return false;
    }
}
//Update Profile
function sameWhatsAppNo(ele){
    if($(ele).prop("checked")){
        let num = $('#my-mobile-num').text();
        num = num.substring(3,num.length);
        $('#mobile-number').val(num);
    }else{
        $('#mobile-number').val("");
    }
}
function validateUpdateProfile(){
    let mobileNo = $('#mobile-number');
    if(mobileNo.val() != ""){
        let mobileRegx = /^\d{10}$/;
        if(!mobileRegx.test(mobileNo.val())){
            // Mobile Number is wrong
            mobileNo.attr('errortext',"Incorrect Mobile Number")
            showFormError()
            return false;
        }else{
            mobileNo.attr('errortext',"")
        }
    }
}
//Change Password Page
function validateChangePassword(){
    let errorFlag = 0;
    let password = $('#new-password1');
    let passwordRegx = /.{4,}/;
    if(!passwordRegx.test(password.val())){
        // Password is invalid
        password.attr('errortext',"Password must contain atleast 4 characters!");
        errorFlag = 1;
    }else{
        password.attr('errortext',"");
    }
    if(errorFlag == 0){
        let password2 = $('#new-password2');
        if(password.val() != password2.val()){
            // Password did'nt matched
            password2.attr('errortext',"Password did not match")
            errorFlag = 1;
        }else{
            password2.attr('errortext',"")
        }
    }
    if(errorFlag == 1){
        showFormError()
        return false;
    }
}
//Alert Close
$('.alert-close').click(function(){
    $(this).parent().hide();
})

//sorting wallet history by date & time
function sortByDate(){
    let rows = document.querySelector("#wallet-history").rows;
    for(let i=1;i<rows.length-1;i++){
        for(let j=i+1;j<rows.length;j++){
            let rows = document.querySelector("#wallet-history").rows;
            let dateString1 = rows[i].querySelector('.datetime').innerHTML;
            let year1 = dateString1.slice(6,10);
            let month1 = dateString1.slice(3,5);
            let day1 = dateString1.slice(0,2);
            let hour1 = dateString1.slice(11,13);
            let min1 = dateString1.slice(14,16);
            let sec1 = dateString1.slice(17,19);
            let date1 = new Date(year1, month1, day1, hour1, min1, sec1);
            let dateString2 = rows[j].querySelector('.datetime').innerHTML;
            let year2 = dateString2.slice(6,10);
            let month2 = dateString2.slice(3,5);
            let day2 = dateString2.slice(0,2);
            let hour2 = dateString2.slice(11,13);
            let min2 = dateString2.slice(14,16);
            let sec2 = dateString2.slice(17,19);
            let date2 = new Date(year2, month2, day2, hour2, min2, sec2);
            if(date2 > date1){
                // Swapping Table Row
                if($(rows[i]).next().is("tr") && $(rows[j]).next().is("tr")){
                    $(rows[j]).insertBefore($(rows[i]).next());
                    $(rows[i]).insertBefore($(rows[j]).next());
                }else{
                    $(rows[j]).insertAfter($(rows[i]));
                    $(rows[i]).insertAfter($(rows[j]));
                }
            }
        }
    }
}

// Print Progress Page

function openAdItemDetails(ele){
    let itemId = ele.getAttribute("productid");
    for(let i=0; i < shop.products.length; i++ ){
        if(shop.products[i].id == itemId){
            $('#item-name').text(shop.products[i].name);
            $('#item-actualPrice').text(shop.products[i].actualPrice);
            $('#item-discount').text(shop.products[i].discount);
            $('#item-price').text(shop.products[i].price);
            $('#ad-description').text(shop.products[i].descrpition);
            $('#item-img').attr('src',shop.products[i].photo);
        }
    }
    $('#item-list').hide();
    $('#item-list').removeClass('scale-in');
    $('#item-list').addClass('scale-out');
    $('#item-details').show();
    $('#item-details').removeClass('scale-out');
    $('#item-details').addClass('scale-in');
}
function closeAdItemDetails(){
    $('#item-details').hide();
    $('#item-details').removeClass('scale-in');
    $('#item-details').addClass('scale-out');
    $('#item-list').show();
    $('#item-list').removeClass('scale-out');
    $('#item-list').addClass('scale-in');
}
$('#showDetailsBtn').click(function(){
    $('#shopDetails').slideDown();
    $('#showDetailsBtn').hide();
    $('#closeDetailsBtn').show();
});
$('#closeDetailsBtn').click(function(){
    $('#shopDetails').slideUp();
    $('#closeDetailsBtn').hide();
    $('#showDetailsBtn').show();
})
    // Loader function to hide loader when page is loaded
    window.addEventListener("load", function() {
        const loader = $('.tz-loader');
        loader.addClass("tz-hidden");
    });
    //Loader function to show loader before jumping to next page
    window.onbeforeunload = function(event) {
        const loader = $('.tz-loader');
        loader.addClass("tz-shown");
    }

    function dontShowLoader(){
        window.onbeforeunload = function(event) {}
        setTimeout(() => {
        window.onbeforeunload = function(event) {
                const loader = $('.tz-loader');
                loader.addClass("tz-shown");
            }
        },500);
    }

function triggerHistoryIconAnimation(){
    $('#history-badge').addClass('tilting-animation');
}

function showTimeStatus(){
    let allData = document.getElementsByClassName('timeStatus');
    // console.log(allData);
}

// Print station Page
function changeStationStatus(){
    // Making station card height respect to map in desktop
    if(screen.width > 992){
        let mapHeight = document.querySelector('#station_map').clientHeight;
        document.querySelector('.station-container').style.height = mapHeight+"px" ;
    }

    let allCards = document.getElementsByClassName('station-card');
    for(let i=0; i< allCards.length; i++){
        let ele = allCards[i].querySelector('.stationStatus');
        if(ele.getAttribute('isComingSoon') === 'True') {
            allCards[i].classList.add('tz-card-overlay-parent');
            allCards[i].querySelector('.tz-card-overlay').style.display = "block";
            ele.innerHTML = "Coming Soon";
            ele.classList.add('color-info');
            allCards[i].querySelector('.station-active').classList.add('color-info');
        }
        else if(ele.getAttribute('isLive') === 'True'){
            ele.innerHTML = "Open Now";
            ele.classList.add('color-success');
            allCards[i].querySelector('.station-active').classList.add('color-success');
            let dt = new Date();
            let time = dt.getHours()+""+dt.getMinutes();
            let closeTime = ele.getAttribute('closeTime');
            let hours = closeTime.substr(0,2);
            let mins = closeTime.substr(3,2);
            mins = -(-mins) - 30;
            while(0 > mins){
                mins = 60 + mins;
                --hours;
            }
            if(mins == 0){
                mins = "00"
            }
            while(hours < 0){
                hours = 24 + hours;
            }
            if(hours == 24){
                hours = "00";
            }
            closeTime = hours+""+mins;
            if(time > closeTime){
                ele.innerHTML = "Closing Soon";
            }
        }else{
            ele.innerHTML = "Closed Now";
            ele.classList.add('color-danger');
            allCards[i].querySelector('.station-active').classList.add('color-danger');
        }
    }
}

// Adding Home Screen Button on side nav
let deferredPrompt;
let homeScrBtnDropDown = document.querySelector('#hSBtnDropDown');
let homeScrBtnSidenav = document.querySelector('#hSBtnSidenav');
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log("add to home screen working")
    // Keep the event so it can be triggered later.
    deferredPrompt = e;
    $(homeScrBtnDropDown).show();
    $(homeScrBtnSidenav).show();
});
homeScrBtnDropDown.addEventListener('click',(e)=>{
    $(homeScrBtnDropDown).hide();
    deferredPrompt.prompt();
});
homeScrBtnSidenav.addEventListener('click',(e)=>{
    $(homeScrBtnSidenav).hide();
    deferredPrompt.prompt();
});