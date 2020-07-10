//=============================================================================
// TMPlugin - サーバーRTP
// バージョン: 2.0.0
// 最終更新日: 2016/08/12
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc ひとつ上の階層にある audio, img を参照することで、複数の
 * プロジェクトで画像、音声ファイルを共用します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param defaultLoadSystem
 * @desc img/system フォルダだけ元々の階層を参照する。
 * 初期値: 0 ( 0 でひとつ上の階層 / 1 で元々の階層 )
 * @default 0
 *
 * @help
 * 使い方:
 *
 *   まず、このプラグインを有効にしたプロジェクト（audio, img フォルダ以外）
 *   をサーバーにアップロードしてください。
 *   次に audio, img フォルダをプロジェクトフォルダと同じ階層に用意します。
 *
 *   プロジェクトが３つある場合のフォルダ構成は下記のようになります。
 *     audio
 *     img
 *     project1
 *     project2
 *     project3
 *
 *   project1 ～ project3 の各プロジェクトにこのプラグインが導入されていれば、
 *   それぞれのフォルダ内に画像や音声ファイルを用意する必要はありません。
 *
 *   これにより、複数のプロジェクトで同じファイルを共有することができ、
 *   サーバーのファイル容量削減はもちろん、ブラウザのキャッシュ機能により
 *   転送量の削減にもつながります。
 *
 *   プラグインコマンドはありません。
 *
 *   このプラグインは RPGツクールMV Version 1.3.0 で動作確認をしています。
 * 
 *
 * プラグインパラメータ補足:
 *
 *   defaultLoadSystem
 *     このパラメータに 1 を設定すると、img/system フォルダだけは元々の階層
 *     を参照することができます。Window.png や IconSet.png などのファイルに
 *     変更をくわえていて、他のプロジェクトと共用できない場合に使用します。
 *
 *
 * 使用上の注意:
 *
 *   複数のプロジェクトで画像と音声を共用するため、これらのファイルを
 *   編集した場合、すべてのプロジェクトに影響が出ます。
 *   このため、プロジェクト専用に新しい画像を追加するような場合は
 *   他のプロジェクトと重複しないファイル名をつけてください。
 * 
 *   元々の階層にある audio, img フォルダは完全に無視されます、ファイルが
 *   見つからない場合でも探しにいきません。
 *   ただし、img/system フォルダだけはプラグインパラメータの設定によっては
 *   元々の階層を参照します。
 * 
 *   ローカル環境ではエディタの都合上、元々の階層にも audio, img フォルダが
 *   必要になります。両方の階層に audio, img フォルダを配置することによって
 *   プラグインを ON にしたまま開発作業をすることが可能になります。
 */

var Imported = Imported || {};
Imported.TMServerRTP = true;

var TMPlugin = TMPlugin || {};
TMPlugin.ServerRTP = {};
TMPlugin.ServerRTP.Parameters = PluginManager.parameters('TMServerRTP');
TMPlugin.ServerRTP.DefaultLoadSystem = TMPlugin.ServerRTP.Parameters['defaultLoadSystem'] === '1';

(function() {

  //-----------------------------------------------------------------------------
  // Graphics
  //
  
  var _Graphics_setLoadingImage = Graphics.setLoadingImage;
  Graphics.setLoadingImage = function(src) {
    if (!TMPlugin.ServerRTP.DefaultLoadSystem) src = '../' + src;
    _Graphics_setLoadingImage.call(this, src);
  };

  //-----------------------------------------------------------------------------
  // ImageManager
  //
  
  ImageManager.loadAnimation = function(filename, hue) {
    return this.loadBitmap('../img/animations/', filename, hue, true);
  };

  ImageManager.loadBattleback1 = function(filename, hue) {
    return this.loadBitmap('../img/battlebacks1/', filename, hue, true);
  };

  ImageManager.loadBattleback2 = function(filename, hue) {
    return this.loadBitmap('../img/battlebacks2/', filename, hue, true);
  };

  ImageManager.loadEnemy = function(filename, hue) {
    return this.loadBitmap('../img/enemies/', filename, hue, true);
  };

  ImageManager.loadCharacter = function(filename, hue) {
    return this.loadBitmap('../img/characters/', filename, hue, false);
  };

  ImageManager.loadFace = function(filename, hue) {
    return this.loadBitmap('../img/faces/', filename, hue, true);
  };

  ImageManager.loadParallax = function(filename, hue) {
    return this.loadBitmap('../img/parallaxes/', filename, hue, true);
  };

  ImageManager.loadPicture = function(filename, hue) {
      return this.loadBitmap('../img/pictures/', filename, hue, true);
  };

  ImageManager.loadSvActor = function(filename, hue) {
    return this.loadBitmap('../img/sv_actors/', filename, hue, false);
  };

  ImageManager.loadSvEnemy = function(filename, hue) {
    return this.loadBitmap('../img/sv_enemies/', filename, hue, true);
  };

  ImageManager.loadSystem = function(filename, hue) {
    var src = TMPlugin.ServerRTP.DefaultLoadSystem ? 'img/system/' : '../img/system/';
    return this.loadBitmap(src, filename, hue, false);
  };

  ImageManager.loadTileset = function(filename, hue) {
    return this.loadBitmap('../img/tilesets/', filename, hue, false);
  };

  ImageManager.loadTitle1 = function(filename, hue) {
    return this.loadBitmap('../img/titles1/', filename, hue, true);
  };

  ImageManager.loadTitle2 = function(filename, hue) {
    return this.loadBitmap('../img/titles2/', filename, hue, true);
  };

  //-----------------------------------------------------------------------------
  // AudioManager
  //
  
  AudioManager._path = '../audio/';
  
})();
