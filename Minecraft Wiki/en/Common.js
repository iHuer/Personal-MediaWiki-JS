////////////////////////////////////////////
/* 

Huer's JavaScript

Author: https://minecraft-zh.gamepedia.com/User:呼儿
Copyright: DO NOT COPY

 */
////////////////////////////////////////////
//<nowiki>
/* 

InPageEdit

Author:https://minecraft-zh.gamepedia.com/User:Xiaoyujun
Information:https://common.wjghj.cn/wiki/InPageEdit-v2
Source code:https://common.wjghj.cn/js/InPageEdit-v2

 */
mw.loader.load('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/script.js');

// 偏好设置
window.InPageEdit = window.InPageEdit || {};
InPageEdit.myPreference = {"outSideClose":false,"editMinor":true,"editSummary":"[InPageEdit] $section$oldid"};

// 顶部增加编辑按钮
$(function(){
  $('#ca-view').after(
    $('<li>',{
      id:'ca-quick-edit',
      class:'collapsible'
    }).append(
      $('<span>').append(
        $('<a>',{
          href: 'javascript:void(0)'
        })
        .text('IPE速编')
        .click(function(){
          InPageEdit.edit({
            page: mw.config.get('wgPageName'),
            revision: mw.config.get('wgRevisionId')
          });
        })
      )
    )
  );
});

// 编辑栏自定义按钮
InPageEdit.buttons =[{
  open: '<!-- ',
  middle: '注释内容',
  close: ' -->',
  text: 'low-vision'
}, {
  open: '<s>',
  middle: '删除线',
  close: '</s>',
  text: 'strikethrough'
}, {
  open: '[[en:',
  middle: '跨语言链接',
  close: ']]',
  text: '↗'
}];

// 自定页面编辑
mw.hook('InPageEdit.toolbox').add(function () {
  $('#ipe-edit-toolbox .btn-group.group1').append(
    $('<li>', { class: 'btn-tip-group' }).append(
      $('<div>', { class: 'btn-tip', text: '编辑指定页面' }),
      $('<button>', { class: 'ipe-toolbox-btn material-icons', text: 'edit' }).click(function () {
        ssi_modal.show({
          className: 'in-page-edit',
          sizeClass: 'dialog',
          center: true,
          outSideClose: false,
          title: '快速编辑页面',
          content: $('<div>').append(
            $('<label>').append(
              $('<b>', { text: '请指定页面名' }),
              $('<br>'),
              $('<input>', { id: 'which-page', style: 'width: 96%', value: mw.config.get('wgPageName') }).click(function () { $(this).css('box-shadow', ''); })
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
////////////////////////////////////////////
/* 

HotCat - 快速添加、删除、更改分类

Author:https://commons.wikimedia.org/wiki/Help:Gadget-HotCat/Version history
Information:https://zh.wikipedia.org/wiki/Wikipedia:维基百科工具/HotCat
Source code:https://commons.wikimedia.org/w/MediaWiki:Gadget-HotCat.js

 */
window.hotcat_translations_from_commons = true;
mw.loader.load('https://commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-HotCat.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

Share-btn - 清除缓存与分享二维码

Author:User:Xiaoyujun
Source code:https://wjghj.cn/wiki/MediaWiki:Share-btn.js
授权协议:CC BY-NC-SA 4.0

 */
mw.loader.using('jquery.cookie',function () {
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
    success: function(data) {
      var surl = data.shortenurl.shorturl;
      $('#s-url-placeholder').html('<a id="short-url" href="'+surl+'">'+surl+'</a>');
    }
  });
  /* 清除缓存 */
  $('#purge-btn').click(function () {
    var $this = $(this);
    if ($.cookie('wasPerged') > 0) {
      $this.html('请求频率过高 (<span id="purge-btn_countdown">' + Math.floor(($.cookie('wasPerged') - new Date().getTime()) / 1000) + '</span>)').attr('disabled', 'disabled');
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
      $this.html('正在清除&nbsp;<img src="https://vignette.wikia.nocookie.net/dftest/images/8/8c/Ms-loading-spinner.svg" style="height:14px;width:auto" />').attr('disabled', 'disabled');
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
    var QRurl = 'https://api.qrserver.com/v1/create-qr-code/?color=Fl000000&bgcolor=FFFFFF&data=https://wjghj.cn/' + mw.config.get('wgPageName') + '&qzone=1&margin=0&size=150x150';
    var QRimg = '<img id="QR-code" src="' + QRurl + '"  alt="二维码服务检索失败！" style="width:150px;height:150px"/>';
    ssi_modal.show({
      sizeClass: 'dialog',
      className: 'centerbox',
      content:
        '<center>' +
        QRimg +
        '<div>此二维码可直接扫描。<br><span style="color:gray;font-size:70%;">您也可以<a href="' + QRurl + '" target="_blank">直接保存</a>二维码<br></span></div>' +
        '</center>',
      title: '分享本页二维码'
    });
  });
});
////////////////////////////////////////////
/* 

SectionLink - 快速获取段落链接

Author:https://zh.wikipedia.org/wiki/User:Hat600
Source code:https://zh.wikipedia.org/wiki/User:Hat600/script/sectionlink.js

 */
mw.loader.load('https://zh.wikipedia.org/w/index.php?title=User:Hat600/script/sectionlink.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

Page top - 一键返回页面顶部

Author:https://zh.wikipedia.org/wiki/User:小跃
Source code:https://zh.wikipedia.org/wiki/User:小跃/Page-top.js

 */
var GoToTop='返回顶部';
$(window).scroll(function() {
        if ( $(this).scrollTop() > 500){
            $('#wpGoToTop').fadeIn();
        } else {
            $('#wpGoToTop').fadeOut();
        }
});

	var GoToTopBtn='<button id="wpGoToTop">' + GoToTop +'</button>';
	$('#mw-content-text').before(GoToTopBtn);
	$('#wpGoToTop').addClass('mw-ui-button');
	$('#wpGoToTop').css('position','fixed').css('top','0%').css('left','160px');
	$('#wpGoToTop').hide();
	$('#wpGoToTop').click(function(){
        $("html, body").animate({scrollTop: 0}, 1000);
	});
////////////////////////////////////////////
/* 

Watchlist HideAWB - 隐藏使用AWB的编辑

Author:https://zh.wikipedia.org/wiki/User:Temp3600
Source code:https://zh.wikipedia.org/wiki/User:Temp3600/Watchlist-hideAWB.js
Note:多用于Wikipedia。

 */
mw.loader.load('https://zh.wikipedia.org/w/index.php?title=User:Temp3600/Watchlist-hideAWB.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

PreViewTab - 编辑栏上方工具栏

Author:https://terraria-zh.gamepedia.com/UserProfile:Westgrass
Information:https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab
Source code:
JS:https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab.js
CSS:https://terraria.gamepedia.com/MediaWiki:Gadget-previewTab.css

 */
// JS
mw.loader.load('https://terraria.gamepedia.com/index.php?title=MediaWiki:Gadget-previewTab.js&action=raw&ctype=text/javascript');

// CSS
$("head").first().append('<link rel="stylesheet" type="text/css" href="https://terraria.gamepedia.com/index.php?title=MediaWiki:Gadget-previewTab.css&action=raw&ctype=text/css" />');
////////////////////////////////////////////
/* 

SyntaxHighlighter - 语法高亮显示

Author:https://en.wikipedia.org/wiki/User:Remember the dot
Information:https://www.mediawiki.org/wiki/User:Remember the dot/Syntax highlighter/zh
Source code:https://www.mediawiki.org/wiki/MediaWiki:Gadget-DotsSyntaxHighlighter.js

*/
mw.loader.load('https://www.mediawiki.org/w/index.php?title=MediaWiki:Gadget-DotsSyntaxHighlighter.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

EditTools - 编辑栏便捷按钮

Author:User:SteveZihang
Source code:https://minecraft.gamepedia.com/User:SteveZihang/edittools.js

 */
mw.loader.load('https://minecraft-zh.gamepedia.com/index.php?title=User:SteveZihang/edittools.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

CopyTitle - 一键复制标题

Author:https://help.gamepedia.com/UserProfile:RheingoldRiver
Information:https://help.gamepedia.com/MediaWiki:Gadget-copyTitle
Source code:
JS:https://help.gamepedia.com/MediaWiki:Gadget-copyTitle.js
CSS:https://help.gamepedia.com/MediaWiki:Gadget-copyTitle.css

 */
// JS
mw.loader.load('https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-copyTitle.js&action=raw&ctype=text/javascript');

// CSS
$("head").first().append('<link rel="stylesheet" type="text/css" href="https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-copyTitle.css&action=raw&ctype=text/css" />');
////////////////////////////////////////////
/* 

ContributionGrid - 资料页贡献网格

Author:未知
Information:https://help.gamepedia.com/MediaWiki:Gadget-contributionGrid
Source code:https://help.gamepedia.com/MediaWiki:Gadget-contributionGrid.js

 */
mw.loader.load('https://help.gamepedia.com/index.php?title=MediaWiki:Gadget-contributionGrid.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

ExLinks - 在新窗口打开外部链接

Author:未知
Information:https://www.mediawiki.org/wiki/Snippets/Open specific links in new window
Source code:https://en.wikipedia.org/wiki/MediaWiki:Gadget-exlinks.js

 */
mw.loader.load('https://en.wikipedia.org/w/index.php?title=MediaWiki:Gadget-exlinks.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

JavaScriptWikiBrowser - 利用JS进行批量编辑

Author:https://en.wikipedia.org/wiki/User:Joeytje50
Information:https://en.wikipedia.org/wiki/User:Joeytje50/JWB
Source code:https://en.wikipedia.org/wiki/User:Joeytje50/JWB.js
Note:不建议非巡查豁免者使用。

 */
mw.loader.load('https://en.wikipedia.org/w/index.php?title=User:Joeytje50/JWB.js/load.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

ImageForeignUseCheck - 查看文件全域用途

Author:未知
Information:https://adventofascension-zh.gamepedia.com/MediaWiki:Gadget-ImageForeignUseCheck
Source code:https://adventofascension-zh.gamepedia.com/MediaWiki:Gadget-ImageForeignUseCheck.js
Note:采用了Huerdada的本地化版本。

 */
var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var wgPageName = mw.config.get( 'wgPageName' );
var wgTitle = mw.config.get( 'wgTitle' );

if (wgNamespaceNumber == 6) {
	$('<ul></ul>').append(
		$('<li></li>').append(
			$('<a></a>', {'class':'foreignLink', 'href':'#ddd', 'text':'外部用途列表'})
		)
	).insertAfter('#filelinks');
	$('.foreignLink').click(function(){
		$('.interUses').remove();
		$('div[id$="linkstoimage"]').append($('<ul></ul>', {'class':'interUses'}));
		var $interUses = $('.interUses');
		var URLprefix = 'https://', 
			URLsuffix = '.gamepedia.com/api.php?format=json&callback=?';
		var msgForeignUses = '外部用途',
			msgFileLink = '文件页面',
			msgNoUses = '未检测到此文件的外部用途。';
		$interUses.append( $('<h2></h2>', {'text':msgForeignUses, 'style':'margin-left:-22px;'}) );
		var langs = {
			"捷克语":"minecraft-cs",
			"德语":"minecraft-de",
			"希腊语":"minecraft-el",
			"西班牙语":"minecraft-es",
			"法语":"minecraft-fr",
			"匈牙利语":"minecraft-hu",
			"意大利语":"minecraft-it",
			"日本语":"minecraft-ja",
			"韩语":"minecraft-ko",
			"荷兰语":"minecraft-nl",
			"波兰语":"minecraft-pl",
			"葡萄牙语":"minecraft-pt",
			"俄语":"minecraft-ru",
			"泰语":"minecraft-th",
			"土耳其语":"minecraft-tr",
			"乌克兰语":"minecraft-uk",
			"汉语":"minecraft-zh",
		};
		$interUses.append( $('<h3></h3>', {'text': msgNoUses, 'class':'no_foreign_uses'}) );
		$.each(langs, function(key, value) {
			var currentLangCode = value;
			var request2 = { action:'query', list:'allimages', ailimit:'1',	aifrom:wgTitle }
			$.getJSON(URLprefix + currentLangCode + URLsuffix, request2, function(response2) {
				$.each(response2.query.allimages, function(index, value){
					if (value.name != wgTitle.replace(/ /g,'_')){
						var request1 = { action:'query', list:'imageusage', iutitle:wgPageName };
						$.getJSON(URLprefix + currentLangCode + URLsuffix, request1, function(response1) {
							var currentLangName = key;
							if (response1.query.imageusage.length > 0) {
								var urlImage = URLprefix + currentLangCode + '.gamepedia.com/' + wgPageName;
								$('.no_foreign_uses').remove();
								$interUses.append(
									$('<h3></h3>', {'style':'margin-left:-20px;', 'text':currentLangName}).append(
										$('<span></span>', {'style':'font-size:85%;'}).append(
											' (', $('<a></a>', {'href':urlImage, 'text':msgFileLink}), ')'
										)
									)
								);
								$.each(response1.query.imageusage, function(index, value) {
									var urlUse = URLprefix + currentLangCode + '.gamepedia.com/' + value.title;
									$interUses.append(
										$('<li></li>').append(
											$('<a></a>', {'href': urlUse, 'text':value.title})
										)
									);
								});
							}
						});
					}
				});
			});
		});
	setTimeout(function(){$interUses[0].scrollIntoView(true)}, 1000);
	});
}
////////////////////////////////////////////
/* 

Edit Count - 贡献栏编辑计数

Author:https://zh.wikipedia.org/wiki/User:Bluedeck
Information:https://zh.wikipedia.org/wiki/User:Bluedeck/haystack/edit-count
Source code:https://zh.wikipedia.org/wiki/User:Bluedeck/serve/edit-count.js

 */
mw.loader.load('https://zh.wikipedia.org/w/index.php?title=User:Bluedeck/serve/edit-count.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

Duplinks - 检查重复链接

Author:https://zh.wikipedia.org/wiki/User:胡葡萄
Source code:https://zh.wikipedia.org/wiki/User:胡葡萄/duplinks.js

 */
mw.loader.load('https://zh.wikipedia.org/w/index.php?title=User:胡葡萄/duplinks.js&action=raw&ctype=text/javascript')
////////////////////////////////////////////
/* 

Markblocked - 标记被封禁用户

Author:未知
Information:https://zh.wikipedia.org/wiki/MediaWiki:Gadget-markblocked
Source code:https://zh.wikipedia.org/wiki/MediaWiki:Gadget-markblocked.js

 */
mw.loader.load('https://zh.wikipedia.org/w/index.php?title=MediaWiki:Gadget-markblocked.js&action=raw&ctype=text/javascript');
////////////////////////////////////////////
/* 

DocTabs - 文档页按钮

Author:User:Majr
Information:https://minecraft.gamepedia.com/User:Majr#Scripts
Source code:https://minecraft.gamepedia.com/User:Majr/docTabs.js
Note:采用User:Dianliang233的汉化版。

 */
if ($.inArray(mw.config.get("wgNamespaceNumber"), [ 10, 11, 828, 829 ]) > -1 || $.inArray(mw.config.get("wgNamespaceNumber"), [ 2, 3 ]) > -1 && mw.config.get("wgTitle").replace(/\/doc$/, "").search(/\.(js|css)$/) > -1) {
  mw.loader.load("https://cdn.jsdelivr.net/gh/dianliang233/dianliang-personal-js-css@master/DocTabs.js");
}
////////////////////////////////////////////
/* 

Real-Time Recent Changes - 实时最近更改

Author:https://meta.wikimedia.org/wiki/User:Krinkle
Information:https://meta.wikimedia.org/wiki/User:Krinkle/Tools/Real-Time Recent Changes
Source code:https://www.mediawiki.org/w/load.php?modules=ext.gadget.rtrc&lang=zh

*/
(mw.loader.getState('ext.gadget.rtrc') ? mw.loader.load('ext.gadget.rtrc') : mw.loader.load('https://www.mediawiki.org/w/load.php?modules=ext.gadget.rtrc&lang=' + mw.config.get('wgUserLanguage', 'zh')));
//</nowiki>
////////////////////////////////////////////
