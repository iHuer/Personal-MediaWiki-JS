////////////////////////////////////////////
/* 
iHuer's Personal JavaScript
Author: https://minecraft-zh.gamepedia.com/User:呼儿
Information: https://github.com/iHuer/Personal-MediaWiki-JS/blob/master/README.md
Copyright: https://github.com/iHuer/Personal-MediaWiki-JS/blob/master/LICENSE
 */
////////////////////////////////////////////
//<nowiki>
/* 
InPageEdit
Author: https://minecraft-zh.gamepedia.com/User:机智的小鱼君
Information: https://ipe.netlify.app/
Source code: https://github.com/Wjghj-Project/InPageEdit
 */
mw.loader.load('https://cdn.jsdelivr.net/npm/mediawiki-inpageedit@latest/dist/InPageEdit.js');

// 偏好设置
window.InPageEdit = window.InPageEdit || {};
InPageEdit.myPreference = {
  "editMinor": true,
  "editSummary": "[InPageEdit] $section$oldid",
  "redLinkQuickEdit": false,
  "outSideClose": false,
  "watchList": "0",
  "plugins": [
    "toolbox.js",
    "edit-any-page.js",
    "color-preview.js"
  ]
}

// 编辑栏自定义按钮
InPageEdit.buttons = [{
    open: '<!-- ',
    middle: '注释内容',
    close: ' -->',
    text: 'low-vision'
}, {
    open: '<s>',
    middle: '删除线',
    close: '</s>',
    text: 'strikethrough'
}];

////////////////////////////////////////////
/* 
Wikiplus
Author: https://zh.moegirl.org/User:妹空酱
Information: https://zh.moegirl.org/User:妹空酱/Wikiplus
Source code: https://wikiplus-app.com/Main.js

mw.loader.load('https://wikiplus-app.com/Main.js');
 */
////////////////////////////////////////////
/* 
HotCat
Author: https://commons.wikimedia.org/wiki/Help:Gadget-HotCat/Version history
Information: https://zh.wikipedia.org/wiki/Wikipedia:维基百科工具/HotCat
Source code: https://commons.wikimedia.org/w/MediaWiki:Gadget-HotCat.js
 */
window.hotcat_translations_from_commons = true;
mw.loader.load(
    'https://commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-HotCat.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 
Share-btn
Author: https://minecraft-zh.gamepedia.com/User:Xiaoyujun
Source code: https://wjghj.cn/wiki/MediaWiki:Share-btn.js
Copyright: CC BY-NC-SA 4.0
 */
mw.loader.using('jquery.cookie', function () {
    /* 按钮 */
    $('.action-view .firstHeading').after(
        '<div id="share-this-page">' +
        '<button id="QR-btn">页面二维码</button>' +
        '<button id="purge-btn" title="使用Purge变量刷新页面">清除页面缓存</button>' +
        '</div>'
    );
    /* 短链接 */
    $.ajax({
        url: '/api.php',
        type: 'post',
        dataType: 'json',
        data: {
            action: 'shortenurl',
            url: location.href,
            format: 'json'
        },
        success: function (data) {
            var surl = data.shortenurl.shorturl;
            $('#s-url-placeholder').html('<a id="short-url" href="' + surl + '">' + surl + '</a>');
        }
    });
    /* 清除缓存 */
    $('#purge-btn').click(function () {
        var $this = $(this);
        if ($.cookie('wasPerged') > 0) {
            $this.html('请求频率过高 (<span id="purge-btn_countdown">' + Math.floor(($.cookie('wasPerged') -
                new Date().getTime()) / 1000) + '</span>)').attr('disabled', 'disabled');
            var endTime = $.cookie('wasPerged');
            setInterval(function () {
                var timeleft = Math.floor((endTime - new Date().getTime()) / 1000);
                if (timeleft < 1) {
                    $this.html('清除页面缓存').attr('disabled', false);
                    clearInterval();
                } else {
                    $('#purge-btn_countdown').html(timeleft);
                }
            }, 1000);
        } else {
            $this.html(
                '正在清除&nbsp;<img src="https://vignette.wikia.nocookie.net/dftest/images/8/8c/Ms-loading-spinner.svg" style="height:14px;width:auto" />'
            ).attr('disabled', 'disabled');
            // 设置30秒CD时间
            mw.loader.using(['jquery.cookie'], function () {
                var timeLeft = new Date();
                timeLeft.setTime(timeLeft.getTime() + 30 * 1000);
                $.cookie('wasPerged', new Date().getTime() + (30 * 1000), {
                    expires: timeLeft
                });
            });

            new mw.Api().post({
                action: 'purge',
                titles: wgPageName,
            }).done(function () {
                $this.html('清除成功!');
                window.location.reload();
            }).fail(function () {
                $this.html('清除失败，请重试').attr('disabled', false);
            });
        }
    });
    /* 生成二维码 */
    $('#QR-btn').click(function () {
        var QRurl =
            'https://api.qrserver.com/v1/create-qr-code/?color=Fl000000&bgcolor=FFFFFF&data=https://wjghj.cn/' +
            mw.config.get('wgPageName') + '&qzone=1&margin=0&size=150x150';
        var QRimg = '<img id="QR-code" src="' + QRurl +
            '"  alt="二维码服务检索失败！" style="width:150px;height:150px"/>';
        ssi_modal.show({
            sizeClass: 'dialog',
            className: 'centerbox',
            content: '<center>' +
                QRimg +
                '<div>此二维码可直接扫描。<br><span style="color:gray;font-size:70%;">您也可以<a href="' +
                QRurl + '" target="_blank">直接保存</a>二维码<br></span></div>' +
                '</center>',
            title: '分享本页二维码'
        });
    });
});
////////////////////////////////////////////
/* 
Page top
Author: https://zh.wikipedia.org/wiki/User:小跃
Source code: https://zh.wikipedia.org/wiki/User:小跃/Page-top.js
 */
var GoToTop = '返回顶部';
$(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('#wpGoToTop').fadeIn();
    } else {
        $('#wpGoToTop').fadeOut();
    }
});

var GoToTopBtn = '<button id="wpGoToTop">' + GoToTop + '</button>';
$('#mw-content-text').before(GoToTopBtn);
$('#wpGoToTop').addClass('mw-ui-button');
$('#wpGoToTop').css('position', 'fixed').css('top', '0%').css('left', '160px');
$('#wpGoToTop').hide();
$('#wpGoToTop').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 1000);
});
////////////////////////////////////////////
/* 
Popup
Author: https://zh.wikipedia.org/wiki/Wikipedia:维基百科工具/导航Popup#制作人员名单和外部链接
Information: https://zh.wikipedia.org/wiki/Wikipedia:维基百科工具/导航
Source code: 
JS：https://zh.wikipedia.org/wiki/MediaWiki:Gadget-popups.js
CSS：https://en.wikipedia.org/wiki/MediaWiki:Gadget-navpop.css
Note: Wikipedia的源代码不兼容此Wiki，故使用Advent Of Ascension Wiki的兼容版本。
 */
// JS
mw.loader.load(
    "https://adventofascension-zh.gamepedia.com/index.php?title=MediaWiki:Gadget-popups.js&action=raw&ctype=text/javascript"
);

// CSS
$("head").first().append(
    '<link rel="stylesheet" type="text/css" href="https://adventofascension-zh.gamepedia.com/index.php?title=MediaWiki:Gadget-navpop.css&action=raw&ctype=text/css" />'
);

// 偏好设置
window.popupStructure = "menus";
////////////////////////////////////////////
/* 
PreViewTab
Author: https://terraria-zh.gamepedia.com/UserProfile:Westgrass
Information: https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab
Source code: 
JS：https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab.js
CSS：https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab.css
 */
// JS
mw.loader.load(
    'https://terraria.gamepedia.com/index.php?title=MediaWiki:Gadget-previewTab.js&action=raw&ctype=text/javascript'
);

// CSS
$("head").first().append(
    '<link rel="stylesheet" type="text/css" href="https://terraria.gamepedia.com/index.php?title=MediaWiki:Gadget-previewTab.css&action=raw&ctype=text/css" />'
);
////////////////////////////////////////////
/* 
SpriteEditor
Author: Unknow
Information: Unknow
Note: 使用时请务必全部复制，否则无法使用。
*/
// 由于依赖项众多故不作标记。
mw.loader.load(
    'https://minecraft.gamepedia.com/index.php?title=MediaWiki:Gadget-spriteEditLoader.js&action=raw&ctype=text/javascript'
);
mw.loader.load(
    'https://minecraft.gamepedia.com/index.php?title=MediaWiki:Gadget-spriteEdit.js&action=raw&ctype=text/javascript'
);
$("head").first().append(
    '<link rel="stylesheet" type="text/css" href="https://minecraft.gamepedia.com/index.php?title=MediaWiki:Gadget-spriteEdit.css&action=raw&ctype=text/css" />'
);
$("head").first().append(
    '<link rel="stylesheet" type="text/css" href="https://minecraft.gamepedia.com/index.php?title=MediaWiki:Gadget-spriteEditMCW.css&action=raw&ctype=text/css" />'
);
////////////////////////////////////////////
/* 
EditTools
Author: https://minecraft-zh.gamepedia.com/User:SteveZihang
Source code: https://minecraft.gamepedia.com/User:SteveZihang/edittools.js
 */
mw.loader.load(
    'https://minecraft-zh.gamepedia.com/index.php?title=User:SteveZihang/edittools.js&action=raw&ctype=text/javascript'
);
////////////////////////////////////////////
/* 
CopyTitle
Author: https://help.gamepedia.com/UserProfile:RheingoldRiver
Information: https://help.gamepedia.com/MediaWiki:Gadget-copyTitle
Source code: 
JS：https://help.gamepedia.com/MediaWiki:Gadget-copyTitle.js
CSS：https://help.gamepedia.com/MediaWiki:Gadget-copyTitle.css
 */
// JS
mw.loader.load(
    'https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-copyTitle.js&action=raw&ctype=text/javascript');

// CSS
$("head").first().append(
    '<link rel="stylesheet" type="text/css" href="https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-copyTitle.css&action=raw&ctype=text/css" />'
);
////////////////////////////////////////////
/* 
ContributionGrid
Author: Unknow
Information: https://help.gamepedia.com/MediaWiki:Gadget-contributionGrid
Source code: https://help.gamepedia.com/MediaWiki:Gadget-contributionGrid.js
 */
mw.loader.load(
    'https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-contributionGrid.js&action=raw&ctype=text/javascript'
);
////////////////////////////////////////////
/* 
ExLinks
Author: Unknow
Information: https://www.mediawiki.org/wiki/Snippets/Open specific links in new window
Source code: https://en.wikipedia.org/wiki/MediaWiki:Gadget-exlinks.js
 */
mw.loader.load(
    'https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-exlinks.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 
ImageForeignUseCheck
Author: Unknow
Information: https://adventofascension-zh.gamepedia.com/MediaWiki:Gadget-ImageForeignUseCheck
Source code: https://adventofascension-zh.gamepedia.com/MediaWiki:Gadget-ImageForeignUseCheck.js
Note: 此为个人汉化版。
 */
var wgNamespaceNumber = mw.config.get('wgNamespaceNumber');
var wgPageName = mw.config.get('wgPageName');
var wgTitle = mw.config.get('wgTitle');

if (wgNamespaceNumber == 6) {
    $('<ul></ul>').append(
        $('<li></li>').append(
            $('<a></a>', {
                'class': 'foreignLink',
                'href': '#ddd',
                'text': '外部用途列表'
            })
        )
    ).insertAfter('#filelinks');
    $('.foreignLink').click(function () {
        $('.interUses').remove();
        $('div[id$="linkstoimage"]').append($('<ul></ul>', {
            'class': 'interUses'
        }));
        var $interUses = $('.interUses');
        var URLprefix = 'https://',
            URLsuffix = '.gamepedia.com/api.php?format=json&callback=?';
        var msgForeignUses = '外部用途',
            msgFileLink = '文件页面',
            msgNoUses = '未检测到此文件的外部用途。';
        $interUses.append($('<h2></h2>', {
            'text': msgForeignUses,
            'style': 'margin-left:-22px;'
        }));
        var langs = {
            "捷克语": "minecraft-cs",
            "德语": "minecraft-de",
            "希腊语": "minecraft-el",
            "西班牙语": "minecraft-es",
            "法语": "minecraft-fr",
            "匈牙利语": "minecraft-hu",
            "意大利语": "minecraft-it",
            "日本语": "minecraft-ja",
            "韩语": "minecraft-ko",
            "荷兰语": "minecraft-nl",
            "波兰语": "minecraft-pl",
            "葡萄牙语": "minecraft-pt",
            "俄语": "minecraft-ru",
            "泰语": "minecraft-th",
            "土耳其语": "minecraft-tr",
            "乌克兰语": "minecraft-uk",
            "中国语": "minecraft-zh",
        };
        $interUses.append($('<h3></h3>', {
            'text': msgNoUses,
            'class': 'no_foreign_uses'
        }));
        $.each(langs, function (key, value) {
            var currentLangCode = value;
            var request2 = {
                action: 'query',
                list: 'allimages',
                ailimit: '1',
                aifrom: wgTitle
            }
            $.getJSON(URLprefix + currentLangCode + URLsuffix, request2, function (response2) {
                $.each(response2.query.allimages, function (index, value) {
                    if (value.name != wgTitle.replace(/ /g, '_')) {
                        var request1 = {
                            action: 'query',
                            list: 'imageusage',
                            iutitle: wgPageName
                        };
                        $.getJSON(URLprefix + currentLangCode + URLsuffix, request1,
                            function (response1) {
                                var currentLangName = key;
                                if (response1.query.imageusage.length > 0) {
                                    var urlImage = URLprefix + currentLangCode +
                                        '.gamepedia.com/' + wgPageName;
                                    $('.no_foreign_uses').remove();
                                    $interUses.append(
                                        $('<h3></h3>', {
                                            'style': 'margin-left:-20px;',
                                            'text': currentLangName
                                        }).append(
                                            $('<span></span>', {
                                                'style': 'font-size:85%;'
                                            }).append(
                                                ' (', $('<a></a>', {
                                                    'href': urlImage,
                                                    'text': msgFileLink
                                                }), ')'
                                            )
                                        )
                                    );
                                    $.each(response1.query.imageusage, function (
                                        index, value) {
                                        var urlUse = URLprefix +
                                            currentLangCode +
                                            '.gamepedia.com/' + value.title;
                                        $interUses.append(
                                            $('<li></li>').append(
                                                $('<a></a>', {
                                                    'href': urlUse,
                                                    'text': value.title
                                                })
                                            )
                                        );
                                    });
                                }
                            });
                    }
                });
            });
        });
        setTimeout(function () {
            $interUses[0].scrollIntoView(true)
        }, 1000);
    });
}
////////////////////////////////////////////
/* 
Edit Count
Author: https://zh.wikipedia.org/wiki/User:Bluedeck
Information: https://zh.wikipedia.org/wiki/User:Bluedeck/haystack/edit-count
Source code: https://zh.wikipedia.org/wiki/User:Bluedeck/serve/edit-count.js
 */
mw.loader.load(
    'https://zh.wikipedia.org/w/index.php?title=User:Bluedeck/serve/edit-count.js&action=raw&ctype=text/javascript'
);
////////////////////////////////////////////
/* 
Markblocked
Author: Unknow
Information: https://zh.wikipedia.org/wiki/MediaWiki:Gadget-markblocked
Source code: https://zh.wikipedia.org/wiki/MediaWiki:Gadget-markblocked.js
 */
mw.loader.load(
    'https://zh.wikipedia.org/w/index.php?title=MediaWiki:Gadget-markblocked.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 
DocTabs
Author: User:Majr
Information: https://minecraft.gamepedia.com/User:Majr#Scripts
Source code: https://minecraft.gamepedia.com/User:Majr/docTabs.js
Note: 采用https://minecraft-zh.gamepedia.com/User:Dianliang233的汉化版。
 */
if ($.inArray(mw.config.get("wgNamespaceNumber"), [10, 11, 828, 829]) > -1 || $.inArray(mw.config.get(
        "wgNamespaceNumber"), [2, 3]) > -1 && mw.config.get("wgTitle").replace(/\/doc$/, "").search(/\.(js|css)$/) > -1) {
    mw.loader.load("https://cdn.jsdelivr.net/gh/dianliang233/dianliang-personal-js-css@master/DocTabs.js");
}
////////////////////////////////////////////
/* 
Real-Time Recent Changes
Author: https://meta.wikimedia.org/wiki/User:Krinkle
Information: https://meta.wikimedia.org/wiki/User:Krinkle/Tools/Real-Time Recent Changes
Source code: https://www.mediawiki.org/w/load.php?modules=ext.gadget.rtrc&lang=zh
*/
(mw.loader.getState('ext.gadget.rtrc') ? mw.loader.load('ext.gadget.rtrc') : mw.loader.load(
    'https://www.mediawiki.org/w/load.php?modules=ext.gadget.rtrc&lang=' + mw.config.get('wgUserLanguage', 'zh')));
//</nowiki>
////////////////////////////////////////////
