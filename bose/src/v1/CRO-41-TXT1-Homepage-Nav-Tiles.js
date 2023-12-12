(function() {

    const EXPERIMENT_PREFIX = 'exp-7';

    function track(action, optlabel = null) {

        const params = {
            'acn_eventaction': action,
            'acn_eventcategory': EXPERIMENT_PREFIX,
            'event': 'acn_experience'
        };

        if (optlabel) {
            params.acn_eventlabel = optlabel
                .toLowerCase()
                .replaceAll(' ', '_')
                .replaceAll("'", '');

        }

        dataLayer.push(params);
    }

    function customGoals() {

        // Open Nav v0,v1,v2 
        // Fires on all variations when a user opens the navigation on mobile and desktop
        window.addEventListener("load", (event) => {
            track('open_nav ');
        });

        // Visual Category Nav Clicks v1
        // Fires on v1 when a user clicks any of the visual category links. The event label should change depending on the category clicked.
        document.querySelectorAll('.secondary-navigation__item').forEach(pill => {
            pill.addEventListener('click', e => {
                track('v1_visual_category_click', e.target.innerText);
            });
        });

        // Visual Category Nav Clicks v2 
        // Fires on v2 when a user clicks any of the shop by category links. The event label should change depending on the category clicked.
        document.querySelectorAll('.category__link').forEach(pill => {
            pill.addEventListener('click', e => {
                track('v2_shop_by_category_click', e.target.innerText);
            });
        });

        // Homepage Hero Click v0,v1,v2 
        // Fires on all variations when a user clicks on the homepage hero banner
        var card1 = document.querySelector('.page-intro .editorial-card');
        var card2 = document.querySelector('.page-intro .prod-card');
        if (card1!=null){ card1.addEventListener('click', e => { track('hero_click'); }); }
        if (card2!=null){ card2.addEventListener('click', e => { track('hero_click'); }); }

        // Category Clicks below Hero v0 
        // Fires on v0 when a user clicks any of the category links directly below the homepage hero
        /*document.querySelectorAll('.secondary-navigation__item').forEach(pill => {
            pill.addEventListener('click', e => {
                track('v0_category_click', e.target.innerText);
            });
        }); */

        var links = document.querySelectorAll('.dropdown-link');   
        // 2023.10.23 - Main menu - 17 total links
        // 8 (0-7) links on Shop category Menu
        // 5 (8-12) links on Explore category Menu
        // 4 (13-16) links on Support category Menu

        for (var i = 0; i < links.length; i++) {    
            if(i<8){
                // Shop Nav Clicks v0,v1,v2 
                // Fires on all variations when a user clicks on any of the main nav links in the “shop” category 

                links[i].addEventListener('click', e => {
                    track('shop_nav');
                });
            }else{
                if(i<13){
                    // Explore Nav Clicks v0,v1,v2 
                    // Fires on all variations when a user clicks on any of the main nav links in the “explore” category 

                    links[i].addEventListener('click', e => {
                        track('explore_nav');
                    });
                }
            }
        }

        // New Drops Product Clicks  v0,v1,v2 
        // Fires on all variations when a user clicks on any of the new drops products  
        // Images
        var dropImages = document.querySelectorAll('.product-carousel.card-ribbon-carousel .image-container .image-container-product-url');
        for (var i = 0; i < dropImages.length; i++) {
            dropImages[i].addEventListener('click', e => {
                let text = e.target.getAttribute('href');
                let myArray = text.split('/');
                track('new_drops', myArray[myArray.length-2] ); 
            });
        }
        // labels
        var dropLabels = document.querySelectorAll('.product-carousel.card-ribbon-carousel .tile-body .image-container-product-url')
        for (var i = 0; i < dropLabels.length; i++) {
            dropLabels[i].addEventListener('click', e => {
                track('new_drops', e.target.innerText ); 
            });
        }

        // Feature Products Clicks v0,v1,v2 
        // Fires on all variations when a user clicks on any of the “buy now” CTAs in the feature products category below the “sound is power” video 
        document.querySelector('.card-grid--1-over-2').addEventListener('click',(e)=>{
            if(e.target.getAttribute('title') === "BUY NOW" || e.target.getAttribute('title') === "Buy Now"){ 
                let text = e.target.getAttribute('href');
                let myArray = text.split('/');
                track('featured_products', myArray[myArray.length-2] ); 
            }
        });
    }

    function newArt(){
        var buttons = document.querySelectorAll('.secondary-navigation__button');

        for(var i = 0; i < buttons.length; i++){
            var img = document.createElement("img");
            var sizes = "?io=height:44,transform:fit";

            // IMAGE VALUES
            switch( buttons[i].getAttribute("title" )) {
                case 'Holiday Early Access':
                    var lis = document.querySelectorAll('.secondary-navigation__item');
                    lis[i].style.display = "none";
                    break;
                case 'Headphones':
                    img.src = "https://assets.bosecreative.com/transform/ab738d65-f8fb-4aaa-9b30-af023ade6fd8/QC45_TripleBlack_001_RGB" + sizes;
                    break;
                case 'Earbuds':
                    img.src = "https://assets.bosecreative.com/transform/8c62d466-b6da-4e29-b9f1-b4ac266ac1be/QCEBII_Buds_Front_7200px_final_black_RGB" + sizes;
                    break;
                case 'Speakers':
                    img.src = "https://assets.bosecreative.com/transform/a6282cf5-fbb1-463f-99d4-ca286fcaf26e/SLRII_Black_Ecom_1" + sizes;
                    break;
                case 'Home Theater':
                    img.src = "https://assets.bosecreative.com/transform/a19a55c2-1399-4553-9259-2a51921292d8/SB600_RT_Bundle_Speakers_Stack_RGB" + sizes;
                    break;
                case 'Home theater':
                    img.src = "https://assets.bosecreative.com/transform/a19a55c2-1399-4553-9259-2a51921292d8/SB600_RT_Bundle_Speakers_Stack_RGB" + sizes;
                    break;
                case 'Portable PA':
                    img.src = "https://assets.bosecreative.com/transform/65f22bef-4116-482c-b7cf-8821767a532d/s1_pro_plus_0_gallery_01_transparent" + sizes;
                    break;
                case 'Sets':
                    img.src = "https://assets.bosecreative.com/transform/f574ddcc-222b-4dd5-be1f-fa5f0ce781bc/SLF_product-silo_black_bundle_1200x1022" + sizes;
                    break;
                case 'Accessories':
                    img.src = "https://assets.bosecreative.com/transform/f906203e-f3a0-40d5-903c-e92c9983f170/BTVS_SOLOII_Remote_001_RGB" + sizes;
                    break;
                case 'Refurbished':
                    img.src = "https://assets.bosecreative.com/transform/ab738d65-f8fb-4aaa-9b30-af023ade6fd8/QC45_TripleBlack_001_RGB" + sizes;
                    break;
            }

            // ADD IMAGES
            var nodoText = document.createTextNode(buttons[i].innerHTML);
            buttons[i].innerHTML = '';
            buttons[i].appendChild(img);
            buttons[i].appendChild(nodoText);
        }
    }

    function styles(){
        var secondNav = document.querySelector('.secondary-navigation');
        var pageIntro = document.querySelector('#page-intro');
        pageIntro.insertBefore(secondNav, pageIntro.firstChild);

        
    }

    function apply(context, template) {

        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils
            .pageElementLoaded(contentZoneSelector)
            .then((element) => {
                const html = template(context);
                Evergage.cashDom(element).html(html);

                setTimeout(function(){
                    newArt();
                    styles();
                    customGoals();
                }, 500);
            });
    }

    function reset(context, template) {

        /** Remove the template from the DOM to reset the template. */
        Evergage.cashDom("#evg-new-template").remove();
    }

    function control(context) {

        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils
            .pageElementLoaded(contentZoneSelector)
            .then((element) => {
                Evergage.cashDom(element).attr({
                    "data-evg-campaign-id": context.campaign,
                    "data-evg-experience-id": context.experience,
                    "data-evg-user-group": context.userGroup
                });
            });
    }

    registerTemplate({
        apply: apply,
        reset: reset,
        control: control
    });

})();