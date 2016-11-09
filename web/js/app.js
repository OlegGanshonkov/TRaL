/*
 * 
 *  $('#tag-editor').tagEditor(); - запускаем tagEditor
 *  $('#tag-editor').tagEditor('addTag', {tagValue: 'asd'}); - добавляем один таг
 *  $('#tag-editor').tagEditor('addTags', {tagsValue: ".json_encode($arr)."}); - добавляем много тагов
 *  $('#tag-editor').tagEditor('exportTags', {textAreaId: 'test'}); - экспортируем таги JSON-ом в textarea
 *
 */

(function ($) {

    function htmlspecialchars(str) {
        return str.replace('&', '&amp;').replace('"', '&quot;').replace("'", '&#039;').replace('<', '&lt;').replace('>', '&gt;');
    }

    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    var methods = {
        init: function (options) {
            $(this).tagEditor("tag", {tagAreaId: $(this).attr('id')});

        },
        tag: function (options) {
            var tagAreaId = options['tagAreaId'];
            var lastId = tagAreaId + 'last';
            var container = $('#' + tagAreaId + '[contenteditable]');

            // cursor to end
            container.on('click', function (e) {
                if ($('#' + lastId).length > 0) {
                    placeCaretAtEnd(document.getElementById(lastId));
                }
            });

            container.keydown(function (e) {
                var container_tmp, tagValue;
                var tags = [];

                if (e.keyCode === 13 || e.keyCode === 188) { // enter key
                    container_tmp = container.clone();
                    container.empty();
                    container_tmp.find('span.tag').each(function (index, value) {
                        var tmp = $(value).clone();
                        tagValue = tmp.find('span').html();
                        tags[index] = tagValue;
                        $(this).tagEditor("addTag", {tagValue: tagValue, tagAreaId: tagAreaId, skipLastId: 1});
                        $(value).remove();
                    });

                    var tagValue = container_tmp.text();
                    tagValue = htmlspecialchars($.trim(tagValue));

                    if (tagValue != '' && jQuery.inArray(tagValue, tags) === -1 && tagValue.length < 30 && tagValue.length > 2) {
                        $(this).tagEditor("addTag", {tagValue: tagValue, tagAreaId: tagAreaId, skipLastId: 1});
                    }

                    $(this).tagEditor("activateTags", {container: container, lastId: lastId});

                    e.preventDefault();
                    return false;
                }
            });
            
                    $(this).tagEditor("activateTags", {container: container, lastId: lastId});
        }, //tag method

        addTag: function (options) {
            var tagAreaId, tagValue, tagCat;
            if ($(this).attr('id')) {
                tagAreaId = $(this).attr('id');
            } else if (options['tagAreaId']) {
                tagAreaId = options['tagAreaId'];
            } else {
                return false;
            }

            var max = 30;
            var skipLastId = 0;
            if (options['skipLastId'] && options['skipLastId'].length > 0)
                skipLastId = options['skipLastId'];

            var smart = options['smart'];
            tagValue = options['tagValue'];
            tagCat = options['tagCat'];
            if (!tagCat) {
                tagCat = '';
            } else {
                tagCat = 'title="' + tagCat + '"';
            }

            var lastId = tagAreaId + 'last';
            var container = $('#' + tagAreaId + '[contenteditable]');

            var currentTags = [];
            container.find('span.tag').each(function (index, value) {
                currentTags[index] = $(value).find('span').html();
            });

            if (smart){
                max = 300;
            }
            if (tagValue != '' && jQuery.inArray(tagValue, currentTags) === -1 && tagValue.length < max && tagValue.length > 2) {
                container.empty();
                var currentTag = '';
                for (var n in currentTags) {
                    currentTag += '<span class="tag" contentEditable="false"><span>' + currentTags[n] + '</span><i>x</i></span>';
                } 
                container.append(currentTag);
                
                var tag = '<span class="tag" ' + tagCat + ' contentEditable="false"><span>' + tagValue + '</span><i>x</i></span>';
                container.append(tag);
            } else {
                /*для обработки ситуации когда тег не добавлен в шаблоне и выводе Tooltip*/
                return false;
            }

            if (skipLastId === 0) {
                // cursor to end
                var last = container.find('#' + lastId);
                if (last.length < 1) {
                    container.append('<span id="' + lastId + '"></span>');
                } else {
                    last.remove();
                    container.append('<span id="' + lastId + '"></span>');
                }
                placeCaretAtEnd(document.getElementById(lastId));
            }
            /*Здесь метод активации тагов добавлен здесь потому что после добавления одного тага все равно нужно биндить коллбэк для remove() на клик по символу крестика */
            $(this).tagEditor("activateTags", {container: container, lastId: lastId});
            return true;
        }, //addTag method

        addTags: function (options) {
            var tagAreaId, tagsValue, tagValue;
            var oldTags = [];

            if (options['tagsValue'] && options['tagsValue'].length < 1)
                return false;

            tagsValue = options['tagsValue'];

            if ($(this).attr('id')) {
                tagAreaId = $(this).attr('id');
            } else if (options['tagAreaId']) {
                tagAreaId = options['tagAreaId'];
            } else {
                return false;
            }

            var lastId = tagAreaId + 'last';
            var container = $('#' + tagAreaId + '[contenteditable]');

            container.find('span.tag').each(function (index, value) {
                oldTags[index] = $(value).find('span').html();
            });

            $(tagsValue).each(function (index, value) {
                tagValue = value;
                tagValue = htmlspecialchars($.trim(tagValue));

                if (tagValue != '' && jQuery.inArray(tagValue, oldTags) === -1 && tagValue.length < 30 && tagValue.length > 2) {
                    $(this).tagEditor("addTag", {tagValue: tagValue, tagAreaId: tagAreaId, skipLastId: 1});
                }

            });

            $(this).tagEditor("activateTags", {container: container, lastId: lastId});

            return true;
        }, //addTags method

        activateTags: function (options) {
            var container = options['container'];
            var lastId = options['lastId'];
            var smart = options['smart'];

            // activate remove button
            var tags = container.find('span.tag');
            if (tags.length > 0) {
                tags.find('i').click(function () {
                    console.info('tag was removed!');
                    if (smart) {
                        var title = $(this).parent(".tag").attr('title');
                        // select
                        var currentSelect = $('#cy-search-wrap select[placeholder2="' + title + '"]');
                        var currentOptionTxt = $(this).parent().find('span').text();
                        var currentOption = currentSelect.find('option:selected:contains("' + currentOptionTxt + '")');
                        if (currentOption.length > 0) {
                            currentOption.removeAttr("selected");
                            currentSelect.trigger('change');
                        }
                        //keyword
                        var keyword = $('#cy-search-wrap .keyword input');
                        var keyword_tagCat = keyword.attr('placeholder2');
                        if (title == keyword_tagCat) {
                            keyword.val('');
                            $('#cy-search-wrap').find('form').submit();
                        }
                    }
                    $(this).parent(".tag").remove();
                });
            }

            // cursor to end
            var last = container.find('#' + lastId);
            if (last.length < 1) {
                container.append('<span id="' + lastId + '"></span>');
            }
            placeCaretAtEnd(document.getElementById(lastId));

            return true;
        }, //activateTag method

        exportTags: function (options) {
            var tagAreaId, textAreaId;
            var tags = [];

            if ($(this).attr('id')) {
                tagAreaId = $(this).attr('id');
            } else {
                return false;
            }

            if (options['textAreaId'] && options['textAreaId'].length < 1)
                return false;

            textAreaId = options['textAreaId'];

            var container = $('#' + tagAreaId + '[contenteditable]');
            container.find('span.tag').each(function (index, value) {
                tags[index] = $(value).find('span').html();
            });

            if (tags.length > 0) {
                tags = JSON.stringify(tags);
                $('#' + textAreaId).val(tags);
            } else {
                $('#' + textAreaId).val('');
            }

            return true;
        }, //activateTag method

        // add && remove tags |  tagsValue = Array ( [0] => asdas [1] => 11111111 )
        addTagsSmart: function (options) {
            var tagAreaId, tagsValue, tagValue, tagCat, tagsDelete;
            var oldTags = [];

            tagsValue = options['tagsValue'];
            tagCat = options['tagCat'];
            tagsDelete = options['tagsDelete'];

            if ($(this).attr('id')) {
                tagAreaId = $(this).attr('id');
            } else if (options['tagAreaId']) {
                tagAreaId = options['tagAreaId'];
            } else {
                return false;
            }

            var lastId = tagAreaId + 'last';
            var container = $('#' + tagAreaId + '[contenteditable]');

            container.find('span.tag[title="' + tagCat + '"]').each(function (index, value) {
                oldTags[index] = $(value).find('span').html();
            });

            $(tagsValue).each(function (index, value) {
                tagValue = value;
                tagValue = htmlspecialchars($.trim(tagValue));

                if (tagValue != '' && jQuery.inArray(tagValue, oldTags) === -1 && tagValue.length < 300 && tagValue.length > 2) {
                    $(this).tagEditor("addTag", {tagValue: tagValue, tagAreaId: tagAreaId, skipLastId: 1, tagCat: tagCat, smart: 1});
                }

            });

            if (tagsDelete) {
                container.find('span.tag[title="' + tagCat + '"]').each(function (index, value) {
                    var val = $(value).find('span').html();
                    var findedIndex = $.inArray(val, tagsDelete);
                    if (findedIndex > -1) {
                        $(this).remove();
                    }
                });
            }

            $(this).tagEditor("activateTags", {container: container, lastId: lastId, smart: 1});

            return true;
        }, //addTags method
    };
    $.fn.tagEditor = function (method) {

        // логика вызова метода
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.tagEditor');
        }
    };
})(window.jQuery);
