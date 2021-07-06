jQuery.fn.extend({
    jsSlider: function(images, height = 0) {

        var desiredHeight = height;
        var elm = $(this);

        $.when(addElement()).then(function(){
            addCss();
        })
        .then(function(){
            addElement();
        });


        function addElement()
        {
            //add images to element
            var html = '';

            html += '<div class="col-md-12 imagesWrapper text-center">';
                html += '<a target="_blank" href="' + images[0].src + '" class="viewFull">VIEW</a>';

                html += '<div class="goToPreviousImage">';
                    html += '<label class="previous inactive">❮</label>';
                html += '</div>';

                $.each(images, function(i ,item){
                    html += '<div class="imageWrapper ' + (i == 0 ? "active" : "nextImage") + '" data-id="' + (i + 1) + '">';
                        html += '<img class="img-responsive img-fluid" src="' + item.src + '" alt="' + item.alt + '" />';
                    html += '</div>';
                });

                html += '<div class="goToNextImage">';
                    html += '<label class="next ' + (images.length > 1 ? "" : "inactive") + '">❯</label>';
                html += '</div>';

            html += '</div>';

            $(elm).html(html);
            //end add images to element
        }

        function addCss()
        {
            //add CSS
            var css = '<style> \n' +
            '.imagesWrapper .imageWrapper img { \n\n' +
                'max-height: \n' + desiredHeight + 'px;\n\n' +
                'display: inline;\n\n' +
            '}\n' +

            '.imagesWrapper {\n' +
                'position: relative;\n' +
                'overflow: hidden;\n' +
                'height: \n' + desiredHeight + 'px;\n' +
            '}\n' +

            '.imagesWrapper .imageWrapper {\n' +
                'position: absolute;\n' +
                'transition: 1.5s all ease-in-out;\n' +
                'width: 100%;\n' +
                'height: \n' + desiredHeight + 'px;\n' +
                'display: flex;\n' +
                'justify-content: center;\n' +
                'align-items: center;\n' +
            '}\n' +

            '.imageWrapper.previousImage {\n' +
                'transform: translateX(-100%);\n' +
                'left: 0;\n' +
            '}\n' +

            '.imageWrapper.nextImage {\n' +
                'transform: translateX(100%);\n' +
                'left: 0;\n' +
            '}\n' +

            '.imageWrapper.active {\n' +
                'transform: translateX(0);\n' +
                'left: 0;\n' +
            '}\n' +

            '.goToNextImage {\n' +
            'position: absolute;\n' +
                'height: \n' + desiredHeight + 'px;\n' +
                'transform: translateY(42%);\n' +
                'right: 0;\n' +
                'z-index: 1;\n' +
            '}\n' +

            '.goToPreviousImage {\n' +
                'position: absolute;\n' +
                'height: \n' + desiredHeight + 'px;\n' +
                'transform: translateY(42%);\n' +
                'left: 0;\n' +
                'z-index: 1;\n' +
            '}\n' +

            '.previous {\n' +
                'cursor: pointer;\n' +
                'padding: 5px;\n' +
                'font-size: 45px;\n' +
                'background: #fafafa;\n' +
            '}\n' +

            '.next {\n' +
                'cursor: pointer;\n' +
                'padding: 5px;\n' +
                'font-size: 45px;\n' +
                'background: #fafafa;\n' +
            '}\n' +

            '.next.inactive, .previous.inactive {\n' +
                'visibility: hidden;\n' +
                'opacity: 0;\n' +
            '}\n' +
            '.viewFull {\n' +
                'position: absolute;\n' +
                'right: 0;\n' +
               'cursor: pointer;\n' +
                'z-index: 1;\n' +
            '}\n' +

            '.viewFull:hover {\n' +
                'text-decoration: none;\n' +
            '}\n' +
            '</style>';

            $('html head').append(css);
            //end adding CSS
        }

        $(function(){
            var current = 1;

            $(elm).on('click', '.previous', function () {
                if (current == 1) {
                    return false;
                }

                var active = $(elm).find('.imagesWrapper .imageWrapper.active');

                if (current == 2) {
                    $(elm).find('.previous').addClass('inactive');
                }

                if (current <= images.length) {
                    $(elm).find('.next').removeClass('inactive');
                }

                var previous = $(elm).find('.imagesWrapper .imageWrapper[data-id=' + (current - 1) + ']');

                active.addClass('nextImage');
                active.removeClass('active');
                $(previous).addClass('active');
                $(previous).removeClass('previousImage');

                $(elm).find('.viewFull').attr('href', previous.children('img').attr('src'));
                current--;
            });

            $(elm).on('click', '.goToNextImage', function () {
                if (current == images.length) {
                    return false;
                }

                var active = $(elm).find('.imagesWrapper .imageWrapper.active');

                if (current == images.length - 1) {
                    $(elm).find('.next').addClass('inactive');
                }

                $(elm).find('.previous').removeClass('inactive')
                var next = $(elm).find('.imagesWrapper .imageWrapper[data-id=' + (current + 1) + ']');

                active.addClass('previousImage');
                active.removeClass('active');
                $(next).addClass('active');
                $(next).removeClass('nextImage');

                $(elm).find('.viewFull').attr('href', next.children('img').attr('src'));
                current++;
            });
        });
    }
  });

