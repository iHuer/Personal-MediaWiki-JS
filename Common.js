////////////////////////////////////////////
/* 
呼儿的个人JS
作者：https://minecraft-zh.gamepedia.com/User:呼儿
授权协议：仅使用为注释的代码。
 */
////////////////////////////////////////////
//<nowiki>
/* 
InPageEdit
作者：https://minecraft-zh.gamepedia.com/User:Xiaoyujun
信息：https://ipe.netlify.app/
源代码：https://github.com/Dragon-Fish/InPageEdit-v2
 */

mw.loader.load('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/script.js');

// 偏好设置
window.InPageEdit = window.InPageEdit || {};
InPageEdit.myPreference = {
    "doNotCollectMyInfo": ture,
    "doNotShowLocalWarn": false,
    "editMinor": true,
    "editSummary": "[InPageEdit] $section$oldid",
    "lockToolBox": true,
    "redLinkQuickEdit": false,
    "outSideClose": false,
    "watchList": Boolean(mw.user.options.get("watchdefault"))
}

// 顶部增加编辑按钮
$(function () {
    $('#ca-view').after(
        $('<li>', {
            id: 'ca-quick-edit',
            class: 'collapsible'
        }).append(
            $('<span>').append(
                $('<a>', {
                    href: 'javascript:void(0)'
                })
                .text('IPE速编')
                .click(function () {
                    InPageEdit.edit({
                        page: mw.config.get('wgPageName'),
                        revision: mw.config.get('wgRevisionId')
                    });
                })
            )
        )
    );
});

// 自定页面编辑
mw.hook('InPageEdit.toolbox').add(function () {
    $('#ipe-edit-toolbox .btn-group.group1').append(
        $('<li>', {
            class: 'btn-tip-group'
        }).append(
            $('<div>', {
                class: 'btn-tip',
                text: '编辑指定页面'
            }),
            $('<button>', {
                class: 'ipe-toolbox-btn material-icons',
                text: 'edit'
            }).click(function () {
                ssi_modal.show({
                    className: 'in-page-edit',
                    sizeClass: 'dialog',
                    center: true,
                    outSideClose: false,
                    title: '快速编辑页面',
                    content: $('<div>').append(
                        $('<label>').append(
                            $('<b>', {
                                text: '请指定页面名'
                            }),
                            $('<br>'),
                            $('<input>', {
                                id: 'which-page',
                                style: 'width: 96%',
                                value: mw.config.get('wgPageName')
                            }).click(function () {
                                $(this).css('box-shadow', '');
                            })
                        )
                    ),
                    buttons: [{
                        label: '确定',
                        className: 'btn btn-primary IPE-anypage-ok',
                        keyPress: 13, // Enter
                        method: function (a, modal) {
                            var page = $('#which-page').val();
                            if (page === '' || page === undefined) {
                                $('#which-page').css('box-shadow', '0 0 4px red');
                                return false;
                            }
                            modal.close();
                            InPageEdit.quickEdit({
                                page: page,
                                reload: false
                            });
                        }
          }, {
                        label: '取消',
                        className: 'btn btn-secondary IPE-anypage-cancel',
                        keyPress: 27, // Esc
                        method: function (a, modal) {
                            modal.close();
                        }
          }]
                });
            })
        )
    );
});

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
作者：https://zh.moegirl.org/User:妹空酱
信息：https://zh.moegirl.org/User:妹空酱/Wikiplus
源代码：https://wikiplus-app.com/Main.js

mw.loader.load('https://wikiplus-app.com/Main.js');
 */
////////////////////////////////////////////
/* 
HotCat
作者：https://commons.wikimedia.org/wiki/Help:Gadget-HotCat/Version history
信息：https://zh.wikipedia.org/wiki/Wikipedia:维基百科工具/HotCat
源代码：https://commons.wikimedia.org/w/MediaWiki:Gadget-HotCat.js
 */

window.hotcat_translations_from_commons = true;
mw.loader.load(
    'https://commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-HotCat.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 
Share-btn
作者：https://minecraft-zh.gamepedia.com/User:Xiaoyujun
源代码：https://wjghj.cn/wiki/MediaWiki:Share-btn.js
授权协议：CC BY-NC-SA 4.0
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
作者：https://zh.wikipedia.org/wiki/User:小跃
源代码：https://zh.wikipedia.org/wiki/User:小跃/Page-top.js
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
作者：https://zh.wikipedia.org/wiki/Wikipedia:维基百科工具/导航Popup#制作人员名单和外部链接
信息：https://zh.wikipedia.org/wiki/Wikipedia:维基百科工具/导航
源代码：
JS：https://zh.wikipedia.org/wiki/MediaWiki:Gadget-popups.js
CSS：https://en.wikipedia.org/wiki/MediaWiki:Gadget-navpop.css
备注：Wikipedia的源代码不兼容此Wiki，故使用Advent Of Ascension Wiki的兼容版本。
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
作者：https://terraria-zh.gamepedia.com/UserProfile:Westgrass
信息：https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab
源代码：
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
作者：未知
信息：未知
源代码：见下
备注：使用时请务必全部复制，否则无法使用。
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
作者：https://minecraft-zh.gamepedia.com/User:SteveZihang
源代码：https://minecraft.gamepedia.com/User:SteveZihang/edittools.js
 */

mw.loader.load(
    'https://minecraft-zh.gamepedia.com/index.php?title=User:SteveZihang/edittools.js&action=raw&ctype=text/javascript'
);
////////////////////////////////////////////
/* 
CopyTitle
作者：https://help.gamepedia.com/UserProfile:RheingoldRiver
信息：https://help.gamepedia.com/MediaWiki:Gadget-copyTitle
源代码：
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
作者：未知
信息：https://help.gamepedia.com/MediaWiki:Gadget-contributionGrid
源代码：https://help.gamepedia.com/MediaWiki:Gadget-contributionGrid.js
 */

mw.loader.load(
    'https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-contributionGrid.js&action=raw&ctype=text/javascript'
);
////////////////////////////////////////////
/* 
ExLinks
作者：未知
信息：https://www.mediawiki.org/wiki/Snippets/Open specific links in new window
源代码：https://en.wikipedia.org/wiki/MediaWiki:Gadget-exlinks.js
 */

mw.loader.load(
    'https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-exlinks.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 
JavaScriptWikiBrowser
作者：https://en.wikipedia.org/wiki/User:Joeytje50
信息：https://en.wikipedia.org/wiki/User:Joeytje50/JWB
源代码：https://en.wikipedia.org/wiki/User:Joeytje50/JWB.js
备注：不建议非巡查豁免者使用。
 */

mw.loader.load(
    'https://en.wikipedia.org/w/index.php?title=User:Joeytje50/JWB.js/load.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 
ImageForeignUseCheck
作者：未知
信息：https://adventofascension-zh.gamepedia.com/MediaWiki:Gadget-ImageForeignUseCheck
源代码：https://adventofascension-zh.gamepedia.com/MediaWiki:Gadget-ImageForeignUseCheck.js
备注：此为个人的汉化版本。
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
            "英语": "minecraft",
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
作者：https://zh.wikipedia.org/wiki/User:Bluedeck
信息：https://zh.wikipedia.org/wiki/User:Bluedeck/haystack/edit-count
源代码：https://zh.wikipedia.org/wiki/User:Bluedeck/serve/edit-count.js
 */

mw.loader.load(
    'https://zh.wikipedia.org/w/index.php?title=User:Bluedeck/serve/edit-count.js&action=raw&ctype=text/javascript'
);
////////////////////////////////////////////
/* 
Duplinks
作者：https://zh.wikipedia.org/wiki/User:胡葡萄
源代码：https://zh.wikipedia.org/wiki/User:胡葡萄/duplinks.js
 */

mw.loader.load('https://zh.wikipedia.org/w/index.php?title=User:胡葡萄/duplinks.js&action=raw&ctype=text/javascript')
////////////////////////////////////////////
/* 
Markblocked
作者：未知
信息：https://zh.wikipedia.org/wiki/MediaWiki:Gadget-markblocked
源代码：https://zh.wikipedia.org/wiki/MediaWiki:Gadget-markblocked.js
 */

mw.loader.load(
    'https://zh.wikipedia.org/w/index.php?title=MediaWiki:Gadget-markblocked.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 
DocTabs
作者：User:Majr
信息：https://minecraft.gamepedia.com/User:Majr#Scripts
源代码：https://minecraft.gamepedia.com/User:Majr/docTabs.js
备注：采用https://minecraft-zh.gamepedia.com/User:Dianliang233的汉化版。
 */

if ($.inArray(mw.config.get("wgNamespaceNumber"), [10, 11, 828, 829]) > -1 || $.inArray(mw.config.get(
        "wgNamespaceNumber"), [2, 3]) > -1 && mw.config.get("wgTitle").replace(/\/doc$/, "").search(/\.(js|css)$/) > -1) {
    mw.loader.load("https://cdn.jsdelivr.net/gh/dianliang233/dianliang-personal-js-css@master/DocTabs.js");
}
////////////////////////////////////////////
/* 
Real-Time Recent Changes
作者：https://meta.wikimedia.org/wiki/User:Krinkle
信息：https://meta.wikimedia.org/wiki/User:Krinkle/Tools/Real-Time Recent Changes
源代码：https://www.mediawiki.org/w/load.php?modules=ext.gadget.rtrc&lang=zh
*/

(mw.loader.getState('ext.gadget.rtrc') ? mw.loader.load('ext.gadget.rtrc') : mw.loader.load(
    'https://www.mediawiki.org/w/load.php?modules=ext.gadget.rtrc&lang=' + mw.config.get('wgUserLanguage', 'zh')));
////////////////////////////////////////////
/* 
VersionList
作者：https://minecraft-de.gamepedia.com/Benutzer:Violine1101
信息：https://minecraft-de.gamepedia.com/MediaWiki:Gadget-versionlist
源代码：
JS：https://minecraft-de.gamepedia.com/MediaWiki:Gadget-versionlist.js
CSS：https://minecraft.gamepedia.com/MediaWiki:Gadget-versionlist.css
备注：由本人翻译自https://minecraft.gamepedia.com/MediaWiki:Gadget-versionlist.js。
*/

// JS
$(document).ready(function ($) {
    var pagename = mw.config.get('wgPageName');
    if (pagename != 'User:呼儿/Java_Edition_version_list') return;

    $('.list_versions_form').show();
    $('.list_versions_disabled').hide();
    $.getJSON('https://launchermeta.mojang.com/mc/game/version_manifest.json').done(
        function (data) {
            $('.list_versions_loading').hide();
            $('.list_versions_list').append(
                $('<div>').addClass('list_versions_header').append(
                    $('<div>').addClass('list_versions_version_desc').append(
                        $('<div>').addClass('list_versions_version_id').html('版本'),
                        $('<div>').addClass('list_versions_version_type').html('类型'),
                        $('<div>').addClass('list_versions_version_time').html('最后更新'),
                        $('<div>').addClass('list_versions_version_releasetime').html('发布日期'),
                        $('<div>').addClass('list_versions_version_url').html('链接'),
                        $('<div>').addClass('list_versions_header_loadinfo').html('信息')
                    )
                )
            );

            $.each(data.versions, function (i, version) {
                $('.list_versions_list').append(
                    $('<div>').addClass('list_versions_version').append(
                        $('<div>').addClass('list_versions_version_desc').append(
                            $('<div>').addClass('list_versions_version_id').append(
                                $('<a>').attr('href', '/' + version.id).attr('title', version.id)
                                .html(version.id)
                            ),
                            $('<div>').addClass('list_versions_version_type').html(version.type),
                            $('<div>').addClass('list_versions_version_time').html(version.time),
                            $('<div>').addClass('list_versions_version_releasetime').html(
                                version.releaseTime),
                            $('<div>').addClass('list_versions_version_url').append(
                                $('<a>').attr('href', version.url).html(version.url)
                            ),
                            $('<div>').addClass('list_versions_version_loadinfo').attr(
                                'data-versionurl', version.url).html('[加载]').click(function () {
                                var info_button = $(this);
                                if (info_button.hasClass(
                                        'list_versions_version_loadinfo_loaded')) return;
                                $.getJSON(info_button.attr('data-versionurl')).done(
                                    function (data) {
                                        var assetIndex = data.assetIndex == undefined ?
                                            undefined : data.assetIndex.url,
                                            client = data.downloads.client == undefined ?
                                            undefined : data.downloads.client.url,
                                            server = data.downloads.server == undefined ?
                                            undefined : data.downloads.server.url,
                                            client_obf = data.downloads.client_mappings ==
                                            undefined ? undefined : data.downloads.client_mappings
                                            .url,
                                            server_obf = data.downloads.server_mappings ==
                                            undefined ? undefined : data.downloads.server_mappings
                                            .url;

                                        var version_info = $('<div>').addClass(
                                            'list_versions_version_info');

                                        if (assetIndex !== undefined) version_info.append(
                                            $('<div>').addClass(
                                                'list_versions_version_info_assets'
                                            ).append(
                                                $('<div>').addClass(
                                                    'list_versions_version_info_assets_title'
                                                ).html('资源：'),
                                                $('<div>').addClass(
                                                    'list_versions_version_info_assets_url'
                                                ).append(
                                                    $('<a>').attr('href',
                                                        assetIndex).html(assetIndex)
                                                )
                                            )
                                        );
                                        if (client !== undefined) version_info.append(
                                            $('<div>').addClass(
                                                'list_versions_version_info_client'
                                            ).append(
                                                $('<div>').addClass(
                                                    'list_versions_version_info_client_title'
                                                ).html('客户端：'),
                                                $('<div>').addClass(
                                                    'list_versions_version_info_client_url'
                                                ).append(
                                                    $('<a>').attr('href', client).html(
                                                        client)
                                                )
                                            )
                                        );
                                        if (server !== undefined) version_info.append(
                                            $('<div>').addClass(
                                                'list_versions_version_info_server'
                                            ).append(
                                                $('<div>').addClass(
                                                    'list_versions_version_info_server_title'
                                                ).html('服务器：'),
                                                $('<div>').addClass(
                                                    'list_versions_version_info_server_url'
                                                ).append(
                                                    $('<a>').attr('href', server).html(
                                                        server)
                                                )
                                            )
                                        );
                                        if (client_obf !== undefined) version_info.append(
                                            $('<div>').addClass(
                                                'list_versions_version_info_client_obf'
                                            ).append(
                                                $('<div>').addClass(
                                                    'list_versions_version_info_client_obf_title'
                                                ).html('客户端映射：'),
                                                $('<div>').addClass(
                                                    'list_versions_version_info_client_obf_url'
                                                ).append(
                                                    $('<a>').attr('href',
                                                        client_obf).html(client_obf)
                                                )
                                            )
                                        );
                                        if (server_obf !== undefined) version_info.append(
                                            $('<div>').addClass(
                                                'list_versions_version_info_server_obf'
                                            ).append(
                                                $('<div>').addClass(
                                                    'list_versions_version_info_server_obf_title'
                                                ).html('服务器映射：'),
                                                $('<div>').addClass(
                                                    'list_versions_version_info_server_obf_url'
                                                ).append(
                                                    $('<a>').attr('href',
                                                        server_obf).html(server_obf)
                                                )
                                            )
                                        );

                                        info_button.closest(
                                            '.list_versions_version_desc').after(
                                            version_info);
                                        info_button.addClass(
                                            'list_versions_version_loadinfo_loaded'
                                        ).html('');
                                    }).fail(function () {
                                    info_button.closest(
                                        '.list_versions_version_desc').after(
                                        $('<div>').addClass(
                                            'list_versions_version_info').append(
                                            $('<div>').addClass(
                                                'list_versions_version_info_fail'
                                            ).html('加载版本信息失败。')
                                        )
                                    );
                                    info_button.html('[加载]');
                                });
                                info_button.html('加载中...');
                            })
                        )
                    )
                );
            });
        }
    ).fail(function () {
        $('.list_versions_loading').hide();
        $('.list_versions_list').html('加载版本信息时出错。');
    });
});

// CSS
$("head").first().append(
    '<link rel="stylesheet" type="text/css" href="https://minecraft.gamepedia.com/index.php?title=MediaWiki:Gadget-versionlist.css&action=raw&ctype=text/css" />'
);
//</nowiki>
////////////////////////////////////////////
