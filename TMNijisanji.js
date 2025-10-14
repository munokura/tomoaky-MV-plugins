//=============================================================================
// TMPlugin - にじさんじリンク
// バージョン: 1.1.0
// 最終更新日: 2018/04/21
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
/*:
@plugindesc Links to Nijisanji-related streaming pages in the title menu and main menu
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/tomoaky-MV-plugins ).
Original plugin by tomoaky.
-----
TMPlugin - Nijisanji Link ver. 1.1.0

Reference Script:

Script to open a specified link in the default browser (by Triacontan)
https://gist.github.com/triacontane/8992baccfb35f985ec93107b8ced6c30

How to Use:

Installing this plugin will add a "Nijisanji" item to the title menu and main menu.
Select a live streamer and streaming service, and the link will open in your default browser.
Depending on your environment (e.g., a browser with pop-up blocking), the link may not open correctly.

There are no plugin commands.

This plugin has been tested with RPG Maker MV Version 1.5.1.

This plugin is distributed under the MIT License and is free for commercial use, modification, redistribution, and other uses.

@param helpText
@desc The text to display in the help window. (You can use \n to create a new line.)
@default にじさんじリンク

@param liver0
@desc Set the URL for each official Nijisanji distribution service.
@default {"name":"にじさんじ公式","youtube":"https://www.youtube.com/channel/UCX7YkU9nEeaoZbkVLVajcMg","youtubeLive":"https://www.youtube.com/channel/UCX7YkU9nEeaoZbkVLVajcMg/live","mirrativ":"","showroom":"","openrec":"","twitter":"https://twitter.com/nijisanji_app","fanArt":"","official":"http://nijisanji.ichikara.co.jp/"}
@type struct<Url>

@param liver1
@desc Set the URL for each of Tsukino Mito's streaming services.
@default {"name":"月ノ美兎","youtube":"https://www.youtube.com/channel/UCD-miitqNY3nyukJ4Fnf4_A","youtubeLive":"https://www.youtube.com/channel/UCD-miitqNY3nyukJ4Fnf4_A/live","mirrativ":"https://www.mirrativ.com/user/2331446","showroom":"","openrec":"","twitter":"https://twitter.com/MitoTsukino","fanArt":"https://twitter.com/hashtag/%E3%81%BF%E3%81%A8%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver2
@desc Set the URL for each distribution service for Shizurin.
@default {"name":"静凛","youtube":"https://www.youtube.com/channel/UC6oDys1BGgBsIC3WhG1BovQ","youtubeLive":"https://www.youtube.com/channel/UC6oDys1BGgBsIC3WhG1BovQ/live","mirrativ":"https://www.mirrativ.com/user/2331816","showroom":"","openrec":"https://www.openrec.tv/user/shizurin23","twitter":"https://twitter.com/ShizuRin23","fanArt":"https://twitter.com/hashtag/%E5%87%9BArt?src=hash","official":""}
@type struct<Url>

@param liver3
@desc Set the URL for each of Higuchi Kaede's streaming services.
@default {"name":"樋口楓","youtube":"https://www.youtube.com/channel/UCsg-YqdqQ-KFF0LNk23BY4A","youtubeLive":"https://www.youtube.com/channel/UCsg-YqdqQ-KFF0LNk23BY4A/live","mirrativ":"https://www.mirrativ.com/user/2328706","showroom":"https://www.showroom-live.com/HiguchiKaede","openrec":"","twitter":"https://twitter.com/HiguchiKaede","fanArt":"https://twitter.com/hashtag/%E3%81%A7%E3%82%8D%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver4
@desc Set the URL for each of Shibuya Hajime's streaming services.
@default {"name":"渋谷ハジメ","youtube":"https://www.youtube.com/channel/UCeK9HFcRZoTrvqcUCtccMoQ","youtubeLive":"https://www.youtube.com/channel/UCeK9HFcRZoTrvqcUCtccMoQ/live","mirrativ":"https://www.mirrativ.com/user/2370347","showroom":"","openrec":"https://www.openrec.tv/user/sibuya_hajime0505","twitter":"https://twitter.com/sibuya_hajime","fanArt":"https://twitter.com/hashtag/%E3%83%94%E3%82%AF%E6%B8%8B?src=hash","official":""}
@type struct<Url>

@param liver5
@desc Set the URL for each of Aki Suzuya's streaming services.
@default {"name":"鈴谷アキ","youtube":"https://www.youtube.com/channel/UCt9qik4Z-_J-rj3bKKQCeHg","youtubeLive":"https://www.youtube.com/channel/UCt9qik4Z-_J-rj3bKKQCeHg/live","mirrativ":"https://www.mirrativ.com/user/2329734","showroom":"","openrec":"","twitter":"https://twitter.com/aki_suzuya","fanArt":"https://twitter.com/hashtag/%E3%82%A2%E3%82%AD%E3%81%8F%E3%82%93%E3%81%A1%E3%82%83%E3%82%93%E3%82%A2%E3%83%BC%E3%83%88?src=hash","official":""}
@type struct<Url>

@param liver6
@desc Set the URL for each Moira distribution service.
@default {"name":"モイラ","youtube":"https://www.youtube.com/channel/UCvmppcdYf4HOv-tFQhHHJMA","youtubeLive":"https://www.youtube.com/channel/UCvmppcdYf4HOv-tFQhHHJMA/live","mirrativ":"https://www.mirrativ.com/user/2328064","showroom":"","openrec":"","twitter":"https://twitter.com/Moiramoimoimoi","fanArt":"https://twitter.com/hashtag/%E3%82%82%E3%81%84%E3%82%82%E3%81%84%E3%82%82%E3%81%84?src=hash","official":""}
@type struct<Url>

@param liver7
@desc Set the URL for each streaming service.
@default {"name":"える","youtube":"https://www.youtube.com/channel/UCYKP16oMX9KKPbrNgo_Kgag","youtubeLive":"https://www.youtube.com/channel/UCYKP16oMX9KKPbrNgo_Kgag/live","mirrativ":"https://www.mirrativ.com/user/2331006","showroom":"https://www.showroom-live.com/Elu_World","openrec":"","twitter":"https://twitter.com/Elu_World","fanArt":"https://twitter.com/hashtag/%E3%81%88%E3%82%8B%E3%81%AE%E7%B5%B5%E3%81%A0%E3%82%88?src=hash","official":""}
@type struct<Url>

@param liver8
@desc Set the URL for each of Chihiro Yuki's streaming services.
@default {"name":"勇気ちひろ","youtube":"https://www.youtube.com/channel/UCLO9QDxVL4bnvRRsz6K4bsQ","youtubeLive":"https://www.youtube.com/channel/UCLO9QDxVL4bnvRRsz6K4bsQ/live","mirrativ":"https://www.mirrativ.com/user/2332313","showroom":"","openrec":"","twitter":"https://twitter.com/Chihiro_yuki23","fanArt":"https://twitter.com/hashtag/%E3%81%BF%E3%82%93%E3%81%AA%E3%81%AE%E5%A6%B9%E3%81%A1%E3%83%BC%E3%81%A1%E3%82%83%E3%82%93?src=hash","official":""}
@type struct<Url>

@param liver9
@desc Set the URL for each distribution service for Kenmochi Touya.
@default {"name":"剣持刀也","youtube":"https://www.youtube.com/channel/UCv1fFr156jc65EMiLbaLImw","youtubeLive":"https://www.youtube.com/channel/UCv1fFr156jc65EMiLbaLImw/live","mirrativ":"https://www.mirrativ.com/user/2573343","showroom":"https://www.showroom-live.com/rei_Toya_rei","openrec":"","twitter":"https://twitter.com/rei_Toya_rei","fanArt":"https://twitter.com/hashtag/%E9%87%91%E5%89%9B%E5%8A%9B%E4%B9%9F%E5%83%8F?src=hash","official":""}
@type struct<Url>

@param liver10
@desc Set the URL for each distribution service for Gilzaren III.
@default {"name":"ギルザレンⅢ世","youtube":"https://www.youtube.com/channel/UCUzJ90o1EjqUbk2pBAy0_aw","youtubeLive":"https://www.youtube.com/channel/UCUzJ90o1EjqUbk2pBAy0_aw/live","mirrativ":"https://www.mirrativ.com/user/2580900","showroom":"","openrec":"","twitter":"https://twitter.com/Gilzaren_III","fanArt":"https://twitter.com/hashtag/%E3%82%AE%E3%83%AB%E3%82%B6%E3%83%AC%E3%83%B3%E7%94%BB%E5%BB%8A?src=hash","official":""}
@type struct<Url>

@param liver11
@desc Set the URL for each of Fushimi Gaku's distribution services.
@default {"name":"伏見ガク","youtube":"https://www.youtube.com/channel/UCXU7YYxy_iQd3ulXyO-zC2w","youtubeLive":"https://www.youtube.com/channel/UCXU7YYxy_iQd3ulXyO-zC2w/live","mirrativ":"https://www.mirrativ.com/user/2573925","showroom":"https://www.showroom-live.com/gaku_fushimi","openrec":"","twitter":"https://twitter.com/gaku_fushimi","fanArt":"https://twitter.com/hashtag/%E7%B5%B5%E3%82%AC%E3%82%AF?src=hash","official":""}
@type struct<Url>

@param liver12
@desc Set the URL for each streaming service for Fumino Tamaki (stray cat).
@default {"name":"文野環(野良猫)","youtube":"https://www.youtube.com/channel/UCBiqkFJljoxAj10SoP2w2Cg","youtubeLive":"https://www.youtube.com/channel/UCBiqkFJljoxAj10SoP2w2Cg/live","mirrativ":"https://www.mirrativ.com/user/2595644","showroom":"","openrec":"","twitter":"https://twitter.com/nekokan_chu","fanArt":"https://twitter.com/hashtag/%E3%81%AE%E3%82%89%E3%81%AD%E3%81%A3%E3%81%93%E3%81%82%E3%82%89?src=hash","official":""}
@type struct<Url>

@param liver13
@desc Set the URL for each of Yuhi Lili's distribution services.
@default {"name":"夕陽リリ","youtube":"https://www.youtube.com/channel/UC48jH1ul-6HOrcSSfoR02fQ","youtubeLive":"https://www.youtube.com/channel/UC48jH1ul-6HOrcSSfoR02fQ/live","mirrativ":"https://www.mirrativ.com/user/2558470","showroom":"","openrec":"","twitter":"https://twitter.com/Yuuhi_Riri","fanArt":"https://twitter.com/hashtag/%E3%82%8A%E3%82%8A%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver14
@desc Set the URL for each streaming service for Utako Suzuka.
@default {"name":"鈴鹿詩子","youtube":"https://www.youtube.com/channel/UCwokZsOK_uEre70XayaFnzA","youtubeLive":"https://www.youtube.com/channel/UCwokZsOK_uEre70XayaFnzA/live","mirrativ":"https://www.mirrativ.com/user/2578026","showroom":"https://www.showroom-live.com/suzukautako","openrec":"","twitter":"https://twitter.com/suzukautako","fanArt":"https://twitter.com/hashtag/%E8%A9%A9%E5%AD%90%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver15
@desc Set the URL for each of Ushiumi Ichigo's distribution services.
@default {"name":"宇志海いちご","youtube":"https://www.youtube.com/channel/UCmUjjW5zF1MMOhYUwwwQv9Q","youtubeLive":"https://www.youtube.com/channel/UCmUjjW5zF1MMOhYUwwwQv9Q/live","mirrativ":"https://www.mirrativ.com/user/2584554","showroom":"","openrec":"","twitter":"https://twitter.com/ushimi_ichigo","fanArt":"https://twitter.com/hashtag/%E3%81%84%E3%81%A1%E3%81%94%E3%81%AE%E3%81%82%E3%81%A8%E3%82%8A%E3%81%88?src=hash","official":""}
@type struct<Url>

@param liver16
@desc Set the URL for each streaming service for Mononobe Arisu.
@default {"name":"物述有栖","youtube":"https://www.youtube.com/channel/UCt0clH12Xk1-Ej5PXKGfdPA","youtubeLive":"https://www.youtube.com/channel/UCt0clH12Xk1-Ej5PXKGfdPA/live","mirrativ":"https://www.mirrativ.com/user/2574970","showroom":"https://www.showroom-live.com/AliceMononobe","openrec":"","twitter":"https://twitter.com/AliceMononobe","fanArt":"https://twitter.com/hashtag/%E6%9C%89%E6%A0%96%E3%81%AE%E7%B5%B5%E6%9C%AC?src=hash","official":""}
@type struct<Url>

@param liver17
@desc Set the URL for each of Ienaga Mugi's streaming services.
@default {"name":"家長むぎ","youtube":"https://www.youtube.com/channel/UC_GCs6GARLxEHxy1w40d6VQ","youtubeLive":"https://www.youtube.com/channel/UC_GCs6GARLxEHxy1w40d6VQ/live","mirrativ":"https://www.mirrativ.com/user/2572637","showroom":"","openrec":"","twitter":"https://twitter.com/ienaga_mugi23","fanArt":"https://twitter.com/hashtag/%E3%82%80%E3%81%8E%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver18
@desc Set the URL for each distribution service for Morinaka Hanasaki.
@default {"name":"森中花咲","youtube":"https://www.youtube.com/channel/UCtpB6Bvhs1Um93ziEDACQ8g","youtubeLive":"https://www.youtube.com/channel/UCtpB6Bvhs1Um93ziEDACQ8g/live","mirrativ":"https://www.mirrativ.com/user/2641794","showroom":"","openrec":"","twitter":"https://twitter.com/KazakiMorinaka","fanArt":"https://twitter.com/hashtag/%E6%A3%AE%E4%B8%AD%E3%81%B3%E3%81%98%E3%82%85%E3%81%A4%E3%81%8B%E3%82%93?src=hash","official":""}
@type struct<Url>
*/


/*~struct~Url:
@param name
@desc name

@param youtube
@desc YouTube URL

@param youtubeLive
@desc YouTube Live URL

@param mirrativ
@desc Mirrativ URL

@param showroom
@desc SHOWROOM URL

@param openrec
@desc OPENREC URL

@param twitter
@desc Twitter URL

@param fanArt
@desc Fan art URL

@param official
@desc Official website URL
*/


/*:ja
@plugindesc にじさんじ関連の配信ページへのリンクをタイトルメニューとメインメニューに
@author tomoaky
@url https://github.com/munokura/tomoaky-MV-plugins
@license MIT License

@help
TMPlugin - にじさんじリンク ver1.1.0

参考にしたスクリプト:

  既定のブラウザで指定したリンクを開くスクリプト (トリアコンタン様)
  https://gist.github.com/triacontane/8992baccfb35f985ec93107b8ced6c30


使い方:

  このプラグインを導入すると、タイトルメニューとメインメニューに
  『にじさんじ』という項目が追加されます。
  ライバーと配信サービスを選択すると、規定のブラウザでリンク先が開きます。
  環境 (ポップアップがブロックされているブラウザ等) によっては
  リンク先が正しく開けない場合があります。

  プラグインコマンドはありません。

  このプラグインは RPGツクールMV Version 1.5.1 で動作確認をしています。

  このプラグインはMITライセンスのもとに配布しています、商用利用、
  改造、再配布など、自由にお使いいただけます。

@param helpText
@desc ヘルプウィンドウに表示するテキストです。 ( \n で改行ができます )
@default にじさんじリンク

@param liver0
@desc にじさんじ公式の各配信サービスのURLを設定します。
@default {"name":"にじさんじ公式","youtube":"https://www.youtube.com/channel/UCX7YkU9nEeaoZbkVLVajcMg","youtubeLive":"https://www.youtube.com/channel/UCX7YkU9nEeaoZbkVLVajcMg/live","mirrativ":"","showroom":"","openrec":"","twitter":"https://twitter.com/nijisanji_app","fanArt":"","official":"http://nijisanji.ichikara.co.jp/"}
@type struct<Url>

@param liver1
@desc 月ノ美兎の各配信サービスのURLを設定します。
@default {"name":"月ノ美兎","youtube":"https://www.youtube.com/channel/UCD-miitqNY3nyukJ4Fnf4_A","youtubeLive":"https://www.youtube.com/channel/UCD-miitqNY3nyukJ4Fnf4_A/live","mirrativ":"https://www.mirrativ.com/user/2331446","showroom":"","openrec":"","twitter":"https://twitter.com/MitoTsukino","fanArt":"https://twitter.com/hashtag/%E3%81%BF%E3%81%A8%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver2
@desc 静凛の各配信サービスのURLを設定します。
@default {"name":"静凛","youtube":"https://www.youtube.com/channel/UC6oDys1BGgBsIC3WhG1BovQ","youtubeLive":"https://www.youtube.com/channel/UC6oDys1BGgBsIC3WhG1BovQ/live","mirrativ":"https://www.mirrativ.com/user/2331816","showroom":"","openrec":"https://www.openrec.tv/user/shizurin23","twitter":"https://twitter.com/ShizuRin23","fanArt":"https://twitter.com/hashtag/%E5%87%9BArt?src=hash","official":""}
@type struct<Url>

@param liver3
@desc 樋口楓の各配信サービスのURLを設定します。
@default {"name":"樋口楓","youtube":"https://www.youtube.com/channel/UCsg-YqdqQ-KFF0LNk23BY4A","youtubeLive":"https://www.youtube.com/channel/UCsg-YqdqQ-KFF0LNk23BY4A/live","mirrativ":"https://www.mirrativ.com/user/2328706","showroom":"https://www.showroom-live.com/HiguchiKaede","openrec":"","twitter":"https://twitter.com/HiguchiKaede","fanArt":"https://twitter.com/hashtag/%E3%81%A7%E3%82%8D%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver4
@desc 渋谷ハジメの各配信サービスのURLを設定します。
@default {"name":"渋谷ハジメ","youtube":"https://www.youtube.com/channel/UCeK9HFcRZoTrvqcUCtccMoQ","youtubeLive":"https://www.youtube.com/channel/UCeK9HFcRZoTrvqcUCtccMoQ/live","mirrativ":"https://www.mirrativ.com/user/2370347","showroom":"","openrec":"https://www.openrec.tv/user/sibuya_hajime0505","twitter":"https://twitter.com/sibuya_hajime","fanArt":"https://twitter.com/hashtag/%E3%83%94%E3%82%AF%E6%B8%8B?src=hash","official":""}
@type struct<Url>

@param liver5
@desc 鈴谷アキの各配信サービスのURLを設定します。
@default {"name":"鈴谷アキ","youtube":"https://www.youtube.com/channel/UCt9qik4Z-_J-rj3bKKQCeHg","youtubeLive":"https://www.youtube.com/channel/UCt9qik4Z-_J-rj3bKKQCeHg/live","mirrativ":"https://www.mirrativ.com/user/2329734","showroom":"","openrec":"","twitter":"https://twitter.com/aki_suzuya","fanArt":"https://twitter.com/hashtag/%E3%82%A2%E3%82%AD%E3%81%8F%E3%82%93%E3%81%A1%E3%82%83%E3%82%93%E3%82%A2%E3%83%BC%E3%83%88?src=hash","official":""}
@type struct<Url>

@param liver6
@desc モイラの各配信サービスのURLを設定します。
@default {"name":"モイラ","youtube":"https://www.youtube.com/channel/UCvmppcdYf4HOv-tFQhHHJMA","youtubeLive":"https://www.youtube.com/channel/UCvmppcdYf4HOv-tFQhHHJMA/live","mirrativ":"https://www.mirrativ.com/user/2328064","showroom":"","openrec":"","twitter":"https://twitter.com/Moiramoimoimoi","fanArt":"https://twitter.com/hashtag/%E3%82%82%E3%81%84%E3%82%82%E3%81%84%E3%82%82%E3%81%84?src=hash","official":""}
@type struct<Url>

@param liver7
@desc えるの各配信サービスのURLを設定します。
@default {"name":"える","youtube":"https://www.youtube.com/channel/UCYKP16oMX9KKPbrNgo_Kgag","youtubeLive":"https://www.youtube.com/channel/UCYKP16oMX9KKPbrNgo_Kgag/live","mirrativ":"https://www.mirrativ.com/user/2331006","showroom":"https://www.showroom-live.com/Elu_World","openrec":"","twitter":"https://twitter.com/Elu_World","fanArt":"https://twitter.com/hashtag/%E3%81%88%E3%82%8B%E3%81%AE%E7%B5%B5%E3%81%A0%E3%82%88?src=hash","official":""}
@type struct<Url>

@param liver8
@desc 勇気ちひろの各配信サービスのURLを設定します。
@default {"name":"勇気ちひろ","youtube":"https://www.youtube.com/channel/UCLO9QDxVL4bnvRRsz6K4bsQ","youtubeLive":"https://www.youtube.com/channel/UCLO9QDxVL4bnvRRsz6K4bsQ/live","mirrativ":"https://www.mirrativ.com/user/2332313","showroom":"","openrec":"","twitter":"https://twitter.com/Chihiro_yuki23","fanArt":"https://twitter.com/hashtag/%E3%81%BF%E3%82%93%E3%81%AA%E3%81%AE%E5%A6%B9%E3%81%A1%E3%83%BC%E3%81%A1%E3%82%83%E3%82%93?src=hash","official":""}
@type struct<Url>

@param liver9
@desc 剣持刀也の各配信サービスのURLを設定します。
@default {"name":"剣持刀也","youtube":"https://www.youtube.com/channel/UCv1fFr156jc65EMiLbaLImw","youtubeLive":"https://www.youtube.com/channel/UCv1fFr156jc65EMiLbaLImw/live","mirrativ":"https://www.mirrativ.com/user/2573343","showroom":"https://www.showroom-live.com/rei_Toya_rei","openrec":"","twitter":"https://twitter.com/rei_Toya_rei","fanArt":"https://twitter.com/hashtag/%E9%87%91%E5%89%9B%E5%8A%9B%E4%B9%9F%E5%83%8F?src=hash","official":""}
@type struct<Url>

@param liver10
@desc ギルザレンⅢ世の各配信サービスのURLを設定します。
@default {"name":"ギルザレンⅢ世","youtube":"https://www.youtube.com/channel/UCUzJ90o1EjqUbk2pBAy0_aw","youtubeLive":"https://www.youtube.com/channel/UCUzJ90o1EjqUbk2pBAy0_aw/live","mirrativ":"https://www.mirrativ.com/user/2580900","showroom":"","openrec":"","twitter":"https://twitter.com/Gilzaren_III","fanArt":"https://twitter.com/hashtag/%E3%82%AE%E3%83%AB%E3%82%B6%E3%83%AC%E3%83%B3%E7%94%BB%E5%BB%8A?src=hash","official":""}
@type struct<Url>

@param liver11
@desc 伏見ガクの各配信サービスのURLを設定します。
@default {"name":"伏見ガク","youtube":"https://www.youtube.com/channel/UCXU7YYxy_iQd3ulXyO-zC2w","youtubeLive":"https://www.youtube.com/channel/UCXU7YYxy_iQd3ulXyO-zC2w/live","mirrativ":"https://www.mirrativ.com/user/2573925","showroom":"https://www.showroom-live.com/gaku_fushimi","openrec":"","twitter":"https://twitter.com/gaku_fushimi","fanArt":"https://twitter.com/hashtag/%E7%B5%B5%E3%82%AC%E3%82%AF?src=hash","official":""}
@type struct<Url>

@param liver12
@desc 文野環(野良猫)の各配信サービスのURLを設定します。
@default {"name":"文野環(野良猫)","youtube":"https://www.youtube.com/channel/UCBiqkFJljoxAj10SoP2w2Cg","youtubeLive":"https://www.youtube.com/channel/UCBiqkFJljoxAj10SoP2w2Cg/live","mirrativ":"https://www.mirrativ.com/user/2595644","showroom":"","openrec":"","twitter":"https://twitter.com/nekokan_chu","fanArt":"https://twitter.com/hashtag/%E3%81%AE%E3%82%89%E3%81%AD%E3%81%A3%E3%81%93%E3%81%82%E3%82%89?src=hash","official":""}
@type struct<Url>

@param liver13
@desc 夕陽リリの各配信サービスのURLを設定します。
@default {"name":"夕陽リリ","youtube":"https://www.youtube.com/channel/UC48jH1ul-6HOrcSSfoR02fQ","youtubeLive":"https://www.youtube.com/channel/UC48jH1ul-6HOrcSSfoR02fQ/live","mirrativ":"https://www.mirrativ.com/user/2558470","showroom":"","openrec":"","twitter":"https://twitter.com/Yuuhi_Riri","fanArt":"https://twitter.com/hashtag/%E3%82%8A%E3%82%8A%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver14
@desc 鈴鹿詩子の各配信サービスのURLを設定します。
@default {"name":"鈴鹿詩子","youtube":"https://www.youtube.com/channel/UCwokZsOK_uEre70XayaFnzA","youtubeLive":"https://www.youtube.com/channel/UCwokZsOK_uEre70XayaFnzA/live","mirrativ":"https://www.mirrativ.com/user/2578026","showroom":"https://www.showroom-live.com/suzukautako","openrec":"","twitter":"https://twitter.com/suzukautako","fanArt":"https://twitter.com/hashtag/%E8%A9%A9%E5%AD%90%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver15
@desc 宇志海いちごの各配信サービスのURLを設定します。
@default {"name":"宇志海いちご","youtube":"https://www.youtube.com/channel/UCmUjjW5zF1MMOhYUwwwQv9Q","youtubeLive":"https://www.youtube.com/channel/UCmUjjW5zF1MMOhYUwwwQv9Q/live","mirrativ":"https://www.mirrativ.com/user/2584554","showroom":"","openrec":"","twitter":"https://twitter.com/ushimi_ichigo","fanArt":"https://twitter.com/hashtag/%E3%81%84%E3%81%A1%E3%81%94%E3%81%AE%E3%81%82%E3%81%A8%E3%82%8A%E3%81%88?src=hash","official":""}
@type struct<Url>

@param liver16
@desc 物述有栖の各配信サービスのURLを設定します。
@default {"name":"物述有栖","youtube":"https://www.youtube.com/channel/UCt0clH12Xk1-Ej5PXKGfdPA","youtubeLive":"https://www.youtube.com/channel/UCt0clH12Xk1-Ej5PXKGfdPA/live","mirrativ":"https://www.mirrativ.com/user/2574970","showroom":"https://www.showroom-live.com/AliceMononobe","openrec":"","twitter":"https://twitter.com/AliceMononobe","fanArt":"https://twitter.com/hashtag/%E6%9C%89%E6%A0%96%E3%81%AE%E7%B5%B5%E6%9C%AC?src=hash","official":""}
@type struct<Url>

@param liver17
@desc 家長むぎの各配信サービスのURLを設定します。
@default {"name":"家長むぎ","youtube":"https://www.youtube.com/channel/UC_GCs6GARLxEHxy1w40d6VQ","youtubeLive":"https://www.youtube.com/channel/UC_GCs6GARLxEHxy1w40d6VQ/live","mirrativ":"https://www.mirrativ.com/user/2572637","showroom":"","openrec":"","twitter":"https://twitter.com/ienaga_mugi23","fanArt":"https://twitter.com/hashtag/%E3%82%80%E3%81%8E%E3%81%82%E3%83%BC%E3%81%A8?src=hash","official":""}
@type struct<Url>

@param liver18
@desc 森中花咲の各配信サービスのURLを設定します。
@default {"name":"森中花咲","youtube":"https://www.youtube.com/channel/UCtpB6Bvhs1Um93ziEDACQ8g","youtubeLive":"https://www.youtube.com/channel/UCtpB6Bvhs1Um93ziEDACQ8g/live","mirrativ":"https://www.mirrativ.com/user/2641794","showroom":"","openrec":"","twitter":"https://twitter.com/KazakiMorinaka","fanArt":"https://twitter.com/hashtag/%E6%A3%AE%E4%B8%AD%E3%81%B3%E3%81%98%E3%82%85%E3%81%A4%E3%81%8B%E3%82%93?src=hash","official":""}
@type struct<Url>
*/


/*~struct~Url:ja
@param name
@desc 名前

@param youtube
@desc YouTubeのURL

@param youtubeLive
@desc YouTube LiveのURL

@param mirrativ
@desc MirrativのURL

@param showroom
@desc SHOWROOMのURL

@param openrec
@desc OPENRECのURL

@param twitter
@desc TwitterのURL

@param fanArt
@desc ファンアートのURL

@param official
@desc 公式サイトのURL
*/

var Imported = Imported || {};
Imported.TMNijisanji = true;

(function() {

  var parameters = PluginManager.parameters('TMNijisanji');
  var helpText = parameters['helpText'].replace(/\\n/g, '\n');
  var liverUrl = [];
  for (var i = 1; i <= 18; i++) {
    liverUrl.push(JSON.parse(parameters['liver' + i] || "{}"));
  }
  liverUrl.push(JSON.parse(parameters['liver0'] || "{}"));

  //-----------------------------------------------------------------------------
  // Window_MenuCommand
  //

  var _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function() {
    _Window_MenuCommand_addOriginalCommands.call(this);
    this.addCommand('にじさんじ', 'nijisanji', true);
  };

  //-----------------------------------------------------------------------------
  // Window_TitleCommand
  //

  var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
  Window_TitleCommand.prototype.makeCommandList = function() {
    _Window_TitleCommand_makeCommandList.call(this);
    this.addCommand('にじさんじ', 'nijisanji');
  };

  //-----------------------------------------------------------------------------
  // Window_Liver
  //

  function Window_Liver() {
    this.initialize.apply(this, arguments);
  }

  Window_Liver.prototype = Object.create(Window_Command.prototype);
  Window_Liver.prototype.constructor = Window_Liver;

  Window_Liver.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.activate();
  };

  Window_Liver.prototype.maxCols = function() {
    return 2;
  };

  Window_Liver.prototype.windowWidth = function() {
    return 492;
  };

  Window_Liver.prototype.makeCommandList = function() {
    liverUrl.forEach(function(data, i) {
      this.addCommand(data.name, 'liver' + i);
    }, this);
  };

  //-----------------------------------------------------------------------------
  // Window_Web
  //

  function Window_Web() {
    this.initialize.apply(this, arguments);
  }

  Window_Web.prototype = Object.create(Window_Command.prototype);
  Window_Web.prototype.constructor = Window_Web;

  Window_Web.prototype.initialize = function(x, y) {
    this._liverId = 0;
    Window_Command.prototype.initialize.call(this, x, y);
    this.hide();
  };

  Window_Web.prototype.windowWidth = function() {
    return 240;
  };

  Window_Web.prototype.setLiverId = function(liverId) {
    this._liverId = liverId;
    this.refresh();
  };

  Window_Web.prototype.makeCommandList = function() {
    var data = liverUrl[this._liverId];
    this.addCommand('YouTube', 'youtube', data.youtube);
    this.addCommand('YouTube Live', 'youtubeLive', data.youtubeLive);
    this.addCommand('Mirrativ', 'mirrativ', data.mirrativ);
    this.addCommand('SHOWROOM', 'showroom', data.showroom);
    this.addCommand('OPENREC', 'openrec', data.openrec);
    this.addCommand('Twitter', 'twitter', data.twitter);
    this.addCommand('ファンアート', 'fanArt', data.fanArt);
    this.addCommand('公式サイト', 'official', data.official);
  };

  //-----------------------------------------------------------------------------
  // Scene_Title
  //

  var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
  Scene_Title.prototype.createCommandWindow = function() {
    _Scene_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler('nijisanji',  this.commandNijisanji.bind(this));
  };

  Scene_Title.prototype.commandNijisanji = function() {
    this._commandWindow.close();
    SceneManager.push(Scene_Nijisanji);
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('nijisanji', this.commandNijisanji.bind(this));
  };

  Scene_Menu.prototype.commandNijisanji = function() {
    SceneManager.push(Scene_Nijisanji);
  };

  //-----------------------------------------------------------------------------
  // Scene_Nijisanji
  //

  function Scene_Nijisanji() {
    this.initialize.apply(this, arguments);
  }

  Scene_Nijisanji.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_Nijisanji.prototype.constructor = Scene_Nijisanji;

  Scene_Nijisanji.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_Nijisanji.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createLiverWindow();
    this.createWebWindow();
  };

  Scene_Nijisanji.prototype.createHelpWindow = function() {
    Scene_MenuBase.prototype.createHelpWindow.call(this);
    this._helpWindow.setText(helpText);
  };

  Scene_Nijisanji.prototype.createLiverWindow = function() {
    var wx = Math.floor(Graphics.boxWidth - 732) / 2;
    var wy = this._helpWindow.y + this._helpWindow.height;
    this._liverWindow = new Window_Liver(wx, wy);
    this._liverWindow.setHandler('ok', this.onLiverOk.bind(this));
    this._liverWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._liverWindow);
  };

  Scene_Nijisanji.prototype.createWebWindow = function() {
    var wx = this._liverWindow.x + this._liverWindow.width;
    var wy = this._liverWindow.y;
    this._webWindow = new Window_Web(wx, wy);
    this._webWindow.setHandler('ok', this.onWebOk.bind(this));
    this._webWindow.setHandler('cancel', this.onWebCancel.bind(this));
    this.addWindow(this._webWindow);
  };

  Scene_Nijisanji.prototype.onLiverOk = function() {
    this._webWindow.setLiverId(this._liverWindow.index());
    this._webWindow.select(0);
    this._webWindow.activate();
    this._webWindow.show();
  };

  Scene_Nijisanji.prototype.onWebOk = function() {
    this._webWindow.activate();
    var data = liverUrl[this._liverWindow.index()];
    var url = data[this._webWindow.currentSymbol()];
    if (Utils.isNwjs()) {
      var exec = require('child_process').exec;
      switch (process.platform) {
      case 'win32':
        exec('rundll32.exe url.dll,FileProtocolHandler  "' + url + '"');
        break;
      default:
        exec('open "' + url + '"');
        break;
      }
    } else {
      window.open(url);
    }
  };

  Scene_Nijisanji.prototype.onWebCancel = function() {
    this._webWindow.hide();
    this._liverWindow.activate();
  };

})();