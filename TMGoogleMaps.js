//=============================================================================
// TMVplugin - Googleマップ遠景
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 2.0
// 最終更新日: 2016/05/26
//=============================================================================

/*:
 * @plugindesc Googleマップにアクセスして地図画像を取得、表示します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param earthR
 * @desc 地球の半径（km）
 * 初期値: 6378.137
 * @default 6378.137
 *
 * @help
 *
 * 注意事項:
 *   このプラグインを使用してゲームを作成する際は必ずGoogleマップの利用規約にも
 *   目を通してください。使用により何らかの不利益が発生してもプラグイン作者はその
 *   責任を負いません、すべて自己責任でお願いします。
 *
 * 使い方:
 *   最初にプラグインコマンドの geoCoding を実行して現実世界の座標を取得します。
 *   取得が成功した状態で geoParallax を実行すれば、遠景がその座標の地図に変更さ
 *   れます。
 *
 * プラグインコマンド:
 *   geoCoding address 日本
 *   住所や地名でジオコーディング。この例では日本という地名に該当する場所の
 *   情報をGoogleマップに接続して取得します。通信が完了したかどうかをチェック
 *   するには後述のスクリプトコマンドを利用します。
 *
 *   geoCoding actor 5
 *   アクター５番の名前でジオコーディング。
 *
 *   geoCoding vn 10
 *   変数１０番の値でジオコーディング
 *
 *   geoCoding latlng 35.794 139.790
 *   緯度と経度で逆ジオコーディング
 *
 *   googleParallax 1 2
 *   直前のジオコーディング結果から得られる地図画像を遠景として設定します。
 *   数値は遠景のスクロール量（ X と Y ）です。
 *
 *   googlePicture 1 0 48 96 100 100 255 0
 *   直前のジオコーディング結果から得られる地図画像をピクチャとして表示する。
 *   数値は左から順に ピクチャ番号 原点（ 0 = 左上 / 1 = 中央） Ｘ座標 Ｙ座標
 *   拡大率（横） 拡大率（縦） 不透明度 合成方法 の８つです。
 *   後ろの方にある数値は省略することが可能ですが、たとえば拡大率だけを
 *   省略することはできません。数値を４つ書いた場合は ピクチャ番号 ～ Ｙ座標
 *   までの４つが有効になります。
 *
 *   googleMapType 2
 *   地図画像のタイプを設定します、このコマンドよりも前にダウンロードされた
 *   画像には適用されません。数値は 0 ～ 3 を設定してください。
 *   0 = roadmap / 1 = satellite / 2 = hybrid / 3 = terrain
 *
 *   googleMapZoom 12
 *   地図画像の拡大率を設定します、このコマンドよりも前にダウンロードされた
 *   画像には適用されません。画像の大きさではなく、地図の縮尺です。
 *
 *   googleMapWidth 512
 *   地図画像の解像度（横）を設定します、このコマンドよりも前にダウンロード
 *   された画像には適用されません。
 *
 *   googleMapHeight 512
 *   地図画像の解像度（縦）を設定します、このコマンドよりも前にダウンロード
 *   された画像には適用されません。
 *
 *   googleAddress 4
 *   直前に実行されたジオコーディングによって得られた住所を、指定した番号の
 *   ゲーム変数に代入します。この例ではゲーム変数４番に住所（文字列）を代入。
 *
 * スクリプトコマンド:
 *   geoCoding を実行した後、通信が完了したかどうかをチェックする必要があります。
 *   チェックのためのコマンドはありませんので、イベントコマンド『スクリプト』を
 *   使用します。
 *
 *   $gameTemp.isGeoCodingComplete()
 *   geoCoding の通信が完了していれば true を返す
 *
 *   $gameTemp.isGeoCodingError()
 *   geoCoding の通信中にエラーが起きれば true を返す
 *
 *   $gameSystem.isGeoDataEmpty()
 *   geoCoding の通信の結果、座標が取得できなかった場合に true を返す
 * 
 *   上記３つのスクリプトをイベントコマンド『ループ』と『条件分岐』で使用し、
 *   通信の状態や結果を監視して、最終的に isGeoCodingComplete が true かつ
 *   isGeoDataEmpty が false を返したら geoParallax を実行してください。
 *
 * おまけ機能:
 *   前回の geoCoding との距離を取得することもできます。
 *   $gameSystem.getGeoDataDistance()
 *   イベントコマンド『変数の操作』のスクリプトとして上記コマンドを使用すると
 *   前回実行した geoCoding で取得した座標との差（距離）を変数に代入することが
 *   できます。前回、あるいは直前の geoCoding が失敗している場合には -1 が代入
 *   されます。
 *
 *   イベントコマンド『文章の表示』に距離を表示したい場合は \DIST という制御文字
 *   を使えば小数点以下３桁、単位つきの距離に置き換わります。
 *   getGeoDataDistance を使う必要はありません。
 *
 * 
 */

var Imported = Imported || {};
Imported.TMGoogleMaps = true;

(function() {

  var parameters = PluginManager.parameters('TMGoogleMaps');
  var earthR = +parameters['earthR'];

  //-----------------------------------------------------------------------------
  // Bitmap
  //

  Bitmap.load = function(url) {
    var bitmap = new Bitmap();
    bitmap._image = new Image();
    bitmap._image.src = url;
    bitmap._image.crossOrigin = 'Anonymous';
    bitmap._image.onload = Bitmap.prototype._onLoad.bind(bitmap);
    bitmap._image.onerror = Bitmap.prototype._onError.bind(bitmap);
    bitmap._url = url;
    bitmap._isLoading = true;
    return bitmap;
  };

  //-----------------------------------------------------------------------------
  // ImageManager
  //

  ImageManager.loadGoogleBitmap = function(url) {
    var bitmap = this.loadNormalBitmap(url, 0);
    bitmap.smooth = true;
    return bitmap;
  };

  //-----------------------------------------------------------------------------
  // Game_Temp
  //

  Game_Temp.prototype.setGeoStatus = function(status) {
    this._geoStatus = status;
  };
  
  Game_Temp.prototype.isGeoCodingComplete = function() {
    return this._geoStatus === 1;
  };
  
  Game_Temp.prototype.isGeoCodingError = function() {
    return this._geoStatus === -1;
  };
  
  Game_Temp.prototype.geoCoding = function(keyword, lat, lng) {
    this._geoStatus = 0;
    this._geoKeyword = keyword;
    var url = 'http://maps.google.com/maps/api/geocode/json?';
    if (keyword) {
      url += 'address=' + encodeURI(keyword);
    } else if (lat !== undefined && lng !== undefined) {
      url += 'latlng=' + lat + ',' + lng;
    }
    url += '&sensor=false&language=ja';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
//    if (xhr.timeout !== undefined) {
//      console.log(xhr.timeout);
//      xhr.timeout = 5000;
//    }
    xhr.onload = function() {
      if (xhr.status === 200) {
        $gameSystem.receiveGeoData(xhr.responseText);
        $gameTemp.setGeoStatus(1);
      } else {
        $gameTemp.setGeoStatus(-1);
      }
    };
    xhr.onerror = function() {
      $gameTemp.setGeoStatus(-1);
    };
    xhr.send();
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //

  Game_System.prototype.googleMapType = function() {
    return this._googleMapType || 'hybrid';
  };
  
  Game_System.prototype.setGoogleMapType = function(type) {
    this._googleMapType = type;
  };

  Game_System.prototype.googleMapZoom = function() {
    return this._googleMapZoom || 12;
  };
  
  Game_System.prototype.setGoogleMapZoom = function(zoom) {
    this._googleMapZoom = zoom;
  };

  Game_System.prototype.googleMapWidth = function() {
    return this._googleMapWidth || 512;
  };
  
  Game_System.prototype.setGoogleMapWidth = function(width) {
    this._googleMapWidth = width;
  };

  Game_System.prototype.googleMapHeight = function() {
    return this._googleMapHeight || 512;
  };
  
  Game_System.prototype.setGoogleMapHeight = function(height) {
    this._googleMapHeight = height;
  };

  Game_System.prototype.geoData = function() {
    return this._geoData;
  };
  
  Game_System.prototype.receiveGeoData = function(responseText) {
    if (!this.isGeoDataEmpty()) {
      this._lastGeoData = this._geoData;
    }
    this._geoData = JSON.parse(responseText);
  };

  Game_System.prototype.isGeoDataEmpty = function() {
    return this._geoData === undefined || this._geoData.results.length === 0;
  };
  
  Game_System.prototype.isLastGeoDataEmpty = function() {
    return this._lastGeoData === undefined || this._lastGeoData.results.length === 0;
  };
  
  Game_System.prototype.getGeoDataDistance = function() {
    if (this.isLastGeoDataEmpty() || this.isGeoDataEmpty()) {
      return -1;
    }
    var lat = +this._lastGeoData.results[0].geometry.location.lat;
    var lng = +this._lastGeoData.results[0].geometry.location.lng;
    var lat2 = (+this._geoData.results[0].geometry.location.lat - lat) * Math.PI / 180;
    var lng2 = (+this._geoData.results[0].geometry.location.lng - lng) * Math.PI / 180;
    lat2 *= earthR;
    lng2 = Math.cos(lat * Math.PI / 180) * earthR * lng2;
    return Math.sqrt(lat2 * lat2 + lng2 * lng2);
  };
  
  Game_System.prototype.googleMapUrl = function() {
    var geoData = this.geoData();
    var lat = +geoData.results[0].geometry.location.lat;
    var lng = +geoData.results[0].geometry.location.lng;
    return 'http://maps.google.com/maps/api/staticmap?center=' + lat + ',' + lng +
           '&zoom=' + this.googleMapZoom() + '&size=' + this.googleMapWidth() + 'x' +
           this.googleMapHeight() + '&maptype=' + this.googleMapType() +
           '&sensor=false&language=ja';
    return url;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'geoCoding') {
      if (args[0] === 'address') {
        $gameTemp.geoCoding(args[1]);
      } else if (args[0] === 'actor') {
        var actor = $gameActors.actor(+args[1]);
        if (actor) {
          $gameTemp.geoCoding(actor.name());
        }
      } else if (args[0] === 'vn') {
        $gameTemp.geoCoding($gameVariables.value(+args[1]));
      } else if (args[0] === 'latlng') {
        $gameTemp.geoCoding('', +args[1], +args[2]);
      }
    } else if (command === 'googleParallax') {
      var name = $gameSystem.googleMapUrl();
      var vx = +args[0];
      var vy = +args[1];
      $gameMap.changeParallax(name, vx !== 0, vy !== 0, vx, vy);
    } else if (command === 'googlePicture') {
      var arr = args.map(Number);
      var id = arr[0] || 1;
      var name = $gameSystem.googleMapUrl();
      var origin = arr[1] || 0;
      var x = arr[2] || 0;
      var y = arr[3] || 0;
      var scaleX = arr[4] || 100;
      var scaleY = arr[5] || 100;
      var opacity = arr[6] || 255;
      var blendMode = arr[7] || 0;
      $gameScreen.showPicture(id, name, origin, x, y, scaleX, scaleY,
                              opacity, blendMode);
    } else if (command === 'googleMapType') {
      $gameSystem.setGoogleMapType(+args[0]);
    } else if (command === 'googleMapZoom') {
      $gameSystem.setGoogleMapZoom(+args[0]);
    } else if (command === 'googleMapWidth') {
      $gameSystem.setGoogleMapWidth(+args[0]);
    } else if (command === 'googleMapHeight') {
      $gameSystem.setGoogleMapHeight(+args[0]);
    } else if (command === 'googleAddress') {
      if (!$gameSystem.isGeoDataEmpty()) {
        var geoData = $gameSystem.geoData();
        $gameVariables.setValue(+args[0], geoData.results[0].formatted_address);
      }
    }
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Picture
  //

  var _Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
  Sprite_Picture.prototype.loadBitmap = function() {
    var re = /^http\:\/\/.*$/;
    match = re.exec(this._pictureName);
    if (match) {
      this.bitmap = ImageManager.loadGoogleBitmap(this._pictureName);
    } else {
      _Sprite_Picture_loadBitmap.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  var _Spriteset_Map_updateParallax = Spriteset_Map.prototype.updateParallax;
  Spriteset_Map.prototype.updateParallax = function() {
    var parallaxName = $gameMap.parallaxName();
    if (this._parallaxName !== parallaxName) {
      var re = /^http\:\/\/.*$/;
      match = re.exec(parallaxName);
      if (match) {
        this._parallaxName = parallaxName;
        this._parallax.bitmap = ImageManager.loadGoogleBitmap(this._parallaxName);
        if (this._parallax.bitmap) {
          this._parallax.origin.x = $gameMap.parallaxOx();
          this._parallax.origin.y = $gameMap.parallaxOy();
        }
      }
    }
    _Spriteset_Map_updateParallax.call(this);
  };

  //-----------------------------------------------------------------------------
  // Window_Base
  //

  var _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = _Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(/\x1bDIST/gi, $gameSystem.getGeoDataDistance().toFixed(3) + 'km');
    return text;
  };

})();
