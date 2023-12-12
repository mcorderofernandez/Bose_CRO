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

    function styles(){
        var secondNav = document.querySelector('.secondary-navigation');
        if(secondNav != null){
            secondNav.style.display = "none";
        }

        var table = document.querySelector('#shopByCategory');
        var intro = document.querySelector("#page-intro");
        intro.appendChild(table);
    }

    function apply(context, template) {

        const contentZoneSelector = Evergage.getContentZoneSelector(context.contentZone);
        return Evergage.DisplayUtils
            .pageElementLoaded(contentZoneSelector)
            .then((element) => {
                const html = template(context);
                Evergage.cashDom(element).html(html);

                
                setTimeout(function(){
                    styles();
                    customGoals();
                }, 1);
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