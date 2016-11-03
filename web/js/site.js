$(document).ready(function () {
    var menu = $('.navbar-inverse.navbar-fixed-top');

    if (window.location.hash) {
        var hash = window.location.hash.substring(1);

        if (hash == 'success') {
            $('#regformok').modal('show');
            history.pushState(null, null, '/');
        } else {

            var moveTo = $('.section.contacts').offset().top - 100;

            $('html, body').animate({
                scrollTop: moveTo
            }, 500);
        }

    }

    $('.navbar-toggle').on('click', function () {
        if ($('.navbar-collapse.in').length > 0) {
            //$('.navbar-inverse').css('background-color', 'transparent');
        } else {
            $('.navbar-inverse').css('background-color', 'rgba(95,131,197,1)').css('margin-top', '0');
        }
    });

    var indexpage = $('body.site-index');
    $(window).scroll(function () {
        if (indexpage.length) {


            var about = $('.section.about').offset().top - 100;
            var retreat = $('.section.retreat').offset().top - 100;
            var food = $('.section.food').offset().top - 100;
            //var team = $('.section.team').offset().top - 100;
            var issues = $('.section.issues').offset().top - 100;
            var contacts = $('.section.contacts').offset().top - 100;
            // alert($('.section.about').offset().top);

            var value = $(window).scrollTop();
            var end = $(document).height() - $(window).height();
            //console.log(value);


            if (value < 40) {
                menu.removeClass('moved');
            } else {
                if (menu.hasClass('moved')) {

                } else {
                    menu.addClass('moved');
                }
                // change active
                if (value >= about) {
                    //console.log('about= ' + about);
                    if ($('.navbar-nav li').has('a[href="/#about"]').hasClass('active')) {

                    } else {
                        $('.navbar-nav li').removeClass('active');
                        $('.navbar-nav li').has('a[href="/#about"]').addClass('active');
                    }
                } else {
                    $('.navbar-nav li').removeClass('active');
                }
                if (value >= retreat) {
                    //console.log('about= ' + retreat);
                    $('.navbar-nav li').removeClass('active');
                    $('.navbar-nav li').has('a[href="/#retreat"]').addClass('active');
                }
                if (value >= food) {
                    //console.log('about= ' + food);
                    $('.navbar-nav li').removeClass('active');
                    $('.navbar-nav li').has('a[href="/#food"]').addClass('active');
                }
                /*
                 if (value >= team) {
                 //console.log('about= ' + team);
                 $('.navbar-nav li').removeClass('active');
                 $('.navbar-nav li').has('a[href="/#team"]').addClass('active');
                 }
                 */
                if (value >= issues) {
                    //console.log('about= ' + issues);
                    $('.navbar-nav li').removeClass('active');
                    $('.navbar-nav li').has('a[href="/#issues"]').addClass('active');
                }
                if (value >= contacts || value >= end) {
                    //console.log('about= ' + contacts);
                    $('.navbar-nav li').removeClass('active');
                    $('.navbar-nav li').has('a[href="/#contacts"]').addClass('active');
                }

            }
        }

    });




});

(function () {
    // menu close
    $("body").click(function (event) {
        if ($(event.target).hasClass('navbar-toggle')) {

        } else {
            var el = $('.navbar-collapse.collapse');
            if ($('.navbar-collapse.collapse').hasClass('in')) {
                el.removeClass('in');
            }
        }
    });

    // move up
    $('body').on('click', '.icon-ctrl', function (e) {
        $("html, body").animate({scrollTop: "0px"})
    });


    // Menu
    $('.navbar-nav li').each(function () {
        $(this).find('a').on('click', function (e) {
            // move to
            var hash = $(this).attr('href').split('#')[1];
            var to = $('.section.' + hash).offset().top - 60;

            $('html, body').animate({
                scrollTop: to
            }, 500);

            // activate
            //var el = $(this).closest('li');
            // $('.navbar-nav li').removeClass('active');
            // el.addClass('active');

            //alert(hash);


            if (window.location.hash) {
                //alert(1);
                // Fragment exists
            }

            //var href = $(this).attr('href');

            //alert(1);
            //$("html, body").animate({scrollTop: "0px"});
        });
    });



})();


/* 
 * Google map
 */
// Кнопка центрирования   
function CenterControl(controlDiv, map, myLatlng) {

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Показать на карте';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    //controlText.style.fontFamily = 'PTMonoRegular,Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Venda des Port, Poligono 2 Parcela 258, San Miquel de Balansat, 07815, San Joan de Labritja';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to
    // Chicago
    google.maps.event.addDomListener(controlUI, 'click', function () {
        map.setCenter(myLatlng);
        $('#forumCenter').hide();
    });

}

var initialize = function () {

    var styles = [];
    var myLatlng = new google.maps.LatLng(39.059008, 1.442149)
    var map_canvas = document.getElementById('map');
    var map_options = {
        streetViewControl: false,
        draggable: true,
        scrollwheel: false,
        center: myLatlng,
        zoom: 16,
        minZoom: 8,
        maxZoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }

    // Текст для маркера
    /*
     var contentString = '<div id="content">' +
     '<div id="siteNotice">' +
     '</div>' +
     '<h4 id="firstHeading" class="firstHeading">Форум разработчиков приложений Apps4All</h4>' +
     '<div id="bodyContent">' +
     '<p>DI Telegraph,<br/>' +
     'Тверская, д.7,<br/> ' +
     'Вход со стороны Газетного переулка<br/> ' +
     '9 подъезд, 5 этаж.<br/> ' +
     '</p>' +
     '</div>' +
     '</div>';
     
     var infowindow = new google.maps.InfoWindow({
     content: contentString
     });
     */

    // Картинка для маркера
    var image = {
        url: '/img/layout/marker-google.png'
    };

    var map = new google.maps.Map(map_canvas, map_options)
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image,
        title: 'Venda des Port, Poligono 2 Parcela 258, San Miquel de Balansat, 07815, San Joan de Labritja'
    });
    var styledMapType = new google.maps.StyledMapType(styles, {name: 'Styled'});
    map.mapTypes.set('Styled', styledMapType);

    // Create the DIV to hold the control and
    // call the CenterControl() constructor passing
    // in this DIV.
    var centerControlDiv = document.createElement('div');
    centerControlDiv.id = 'forumCenter';
    var centerControl = new CenterControl(centerControlDiv, map, myLatlng);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(centerControlDiv);

    // events
    google.maps.event.addListenerOnce(map, 'idle', function () {
        $('#forumCenter').hide();
    });
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
    google.maps.event.addListener(map, 'center_changed', function () {
        $('#forumCenter').show();
    });
};
if (typeof google !== "undefined") {
    google.maps.event.addDomListener(window, 'load', initialize);
}