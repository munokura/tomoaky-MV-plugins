//=============================================================================
// TMPlugin - シミュレーションRPG
// バージョン: 0.1.3a
// 最終更新日: 2017/04/07
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2017 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc いわゆるシミュレーションRPGぽい機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param vnSrpgTurnCount
 * @desc 現在のターン数を代入するゲーム変数番号
 * 初期値: 1
 * @default 1
 *
 * @param vnActorUnitNums
 * @desc 残りアクターユニット数を代入するゲーム変数番号
 * 初期値: 2
 * @default 2
 *
 * @param vnEnemyUnitNums
 * @desc 残りエネミーユニット数を代入するゲーム変数番号
 * 初期値: 3
 * @default 3
 *
 * @param srpgBasicWait
 * @desc 敵ターン進行の基本ウェイト時間（フレーム）
 * 初期値: 30
 * @default 30
 *
 * @param damagePopupInterval
 * @desc 連続ダメージポップアップの間隔（フレーム）
 * 初期値: 30
 * @default 30
 *
 * @param checkSkillId
 * @desc 調べる/話すスキルの番号
 * 初期値: 0
 * @default 0
 *
 * @param regionEffects
 * @desc リージョンごとの地形効果の設定
 * 初期値: 1,11 2,12
 * @default 1,11 2,12
 *
 * @param useRegionEffectWindow
 * @desc 地形効果ウィンドウを利用するかどうか
 * 初期値: 1 ( 0 = 無効 / 1 = 有効)
 * @default 1
 *
 * @param useUnitHpGauge
 * @desc ユニットHPゲージを利用するかどうか
 * 初期値: 1 ( 0 = 無効 / 1 = 有効)
 * @default 1
 *
 * @param useUnitStateIcon
 * @desc ユニットステートアイコンを利用するかどうか
 * 初期値: 1 ( 0 = 無効 / 1 = 有効)
 * @default 1
 *
 * @param simpleMoveInput
 * @desc 移動可能範囲が表示中ならそのまま移動できるようにする
 * 初期値: 0 ( 0 = 無効 / 1 = 有効 )
 * @default 0
 *
 * @param moveCommand
 * @desc 移動コマンド名
 * 初期値: 移動
 * @default 移動
 *
 * @param moveCancelCommand
 * @desc 移動キャンセルコマンド名
 * 初期値: 移動取り消し
 * @default 移動取り消し
 *
 * @param actionCommand
 * @desc 行動コマンド名
 * 初期値: 行動
 * @default 行動
 *
 * @param itemCommand
 * @desc アイテムコマンド名（未入力でコマンド削除）
 * 初期値: アイテム
 * @default アイテム
 *
 * @param equipCommand
 * @desc 装備変更コマンド名（未入力でコマンド削除）
 * 初期値: 装備変更
 * @default 装備変更
 *
 * @param waitingCommand
 * @desc 待機コマンド名（未入力でコマンド削除）
 * 初期値: 待機
 * @default 待機
 *
 * @param statusCommand
 * @desc ステータスコマンド名（未入力でコマンド削除）
 * 初期値: ステータス
 * @default ステータス
 *
 * @param turnEndCommand
 * @desc ターン終了コマンド名
 * 初期値: ターン終了
 * @default ターン終了
 *
 * @param unitListCommand
 * @desc ユニットリストコマンド名（未入力でコマンド削除）
 * 初期値: ユニットリスト
 * @default ユニットリスト
 *
 * @param infoCommand
 * @desc マップ情報コマンド名（未入力でコマンド削除）
 * 初期値: マップ情報
 * @default マップ情報
 *
 * @param optionsCommand
 * @desc オプションコマンド名（未入力でコマンド削除）
 * 初期値: オプション
 * @default オプション
 *
 * @param saveCommand
 * @desc セーブコマンド名（未入力でコマンド削除）
 * 初期値: セーブ
 * @default セーブ
 *
 * @param loadCommand
 * @desc ロードコマンド名（未入力でコマンド削除）
 * 初期値: ロード
 * @default ロード
 *
 * @param gameEndCommand
 * @desc ゲーム終了コマンド名（未入力でコマンド削除）
 * 初期値: ゲーム終了
 * @default ゲーム終了
 *
 * @param yesCommand
 * @desc 肯定コマンド名
 * 初期値: はい
 * @default はい
 *
 * @param noCommand
 * @desc 否定コマンド名
 * 初期値: いいえ
 * @default いいえ
 *
 * @param moveParam
 * @desc 移動力パラメータの名前
 * 初期値: 移動力
 * @default 移動力
 *
 * @param moveHelp
 * @desc 移動場所選択ヘルプ
 * 初期値: 移動する場所を決定してください
 * @default 移動する場所を決定してください
 *
 * @param waitingHelp
 * @desc 待機方向選択ヘルプ
 * 初期値: 待機中の向きを決定してください
 * @default 待機中の向きを決定してください
 *
 * @param turnEndHelp
 * @desc ターン終了確認ヘルプ
 * 初期値: 味方のターンを終了してよろしいですか？
 * @default 味方のターンを終了してよろしいですか？
 *
 * @param actionRangeHelp
 * @desc 行動実行場所選択ヘルプ
 * 初期値: 行動を実行する場所を決定してください
 * @default 行動を実行する場所を決定してください
 *
 * @param actionEffectHelp
 * @desc 行動最終確認ヘルプ
 * 初期値: この行動でよろしいですか？
 * @default この行動でよろしいですか？
 *
 * @param colorAreaMove
 * @desc 移動可能範囲のタイルトナー設定
 * 初期値: 0 64 255 128
 * @default 0 64 255 128
 *
 * @param colorAreaWaiting
 * @desc 待機範囲のタイルトナー設定
 * 初期値: 255 32 255 128
 * @default 255 32 255 128
 *
 * @param colorAreaRange
 * @desc 射程範囲のタイルトナー設定
 * 初期値: 255 32 32 128
 * @default 255 32 32 128
 *
 * @param colorAreaEffect
 * @desc 効果範囲のタイルトナー設定
 * 初期値: 255 255 32 128
 * @default 255 255 32 128
 *
 * @param backAttackPhysical
 * @desc 物理による背後攻撃倍率
 * 初期値: 1.5
 * @default 1.5
 *
 * @param backAttackMagical
 * @desc 魔法による背後攻撃倍率
 * 初期値: 1.5
 * @default 1.5
 *
 * @param reflectAnimationId
 * @desc 魔法反射時に再生するアニメーションの番号
 * 初期値: 0
 * @default 0
 * @require 1
 * @type animation
 * 
 * @param srpgCommandX
 * @desc コマンドウィンドウの表示位置（Ｘ座標）
 * 初期値: 0
 * @default 0
 *
 * @param srpgCommandY
 * @desc コマンドウィンドウの表示位置（Ｙ座標）
 * 初期値: 0
 * @default 0
 *
 * @param srpgCommandLineHeight
 * @desc コマンドウィンドウの１行の高さ
 * 初期値: 36
 * @default 36
 *
 * @param srpgStatusBackground
 * @desc ステータスウィンドウの背景タイプ
 * 初期値: 1（ 0 = ウィンドウ / 1 = 暗くする / 2 = 透明）
 * @default 1
 *
 * @param srpgStatusNameWidth
 * @desc ステータスウィンドウのユニット名の幅
 * 初期値: 144
 * @default 144
 *
 * @param srpgStatusHpWidth
 * @desc ステータスウィンドウのＨＰゲージの幅（ＭＰでも利用）
 * 初期値: 186
 * @default 186
 *
 * @param srpgStatusFaceMirror
 * @desc ステータスウィンドウの顔グラフィック左右反転設定
 * 初期値: left（ left = 左側を反転 / right = 右側を反転）
 * @default left
 *
 * @param srpgUnitListWidth
 * @desc ユニットリストウィンドウの幅
 * 初期値: 240
 * @default 240
 *
 * @param srpgUnitListRows
 * @desc ユニットリストウィンドウの表示行数
 * 初期値: 7
 * @default 7
 *
 * @param srpgInfoSize
 * @desc マップ情報ウィンドウの大きさ
 * 初期値: 480*480
 * @default 480*480
 *
 * @param srpgStatusArrowImage
 * @desc ステータスウィンドウの矢印画像のファイル名
 * 初期値: SrpgStatusArrow
 * @default SrpgStatusArrow
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param srpgCursorImage
 * @desc SRPGカーソルのファイル名
 * 初期値: !$SrpgCursor
 * @default !$SrpgCursor
 * @require 1
 * @dir img/characters/
 * @type file
 *
 * @noteParam faceName
 * @noteRequire 1
 * @noteDir img/faces/
 * @noteType file
 * @noteData enemies
 *
 * @help
 * TMPlugin - シミュレーションRPG ver0.1.3a
 * 
 * 使用方法:
 * 
 *   下記URLを参照してください。
 *   http://hikimoki.sakura.ne.jp/plugin/plugin_srpg.html
 *   このヘルプにはメモ欄タグやプラグインコマンドの簡単な説明のみを
 *   記載しています。
 * 
 *   このプラグインは RPGツクールMV Version 1.3.5 で動作確認をしています。
 * 
 *   このプラグインはMITライセンスのもとに配布しています、商用利用、
 *   改造、再配布など、自由にお使いいただけます。
 *
 * 
 * メモ欄タグ（イベント）:
 * 
 *   <srpgManager>
 *   このタグのついたイベントをSRPG管理イベントとして利用します。
 *
 *   <srpgActor:0>
 *   このタグのついたイベントを味方ユニットとして利用します。
 *   数値はパーティ内の並び順（ 0 が先頭）です。
 *
 *   <srpgEnemy:3>
 *   このタグのついたイベントを敵ユニットとして利用します。
 *   数値は敵キャラのデータベース上の番号です。
 *
 *   <neutral>
 *   このタグのついたイベントは残りユニット数のカウントから除外します。
 * 
 *   <traitor>
 *   このタグのついたイベントに行動制約『味方を攻撃』が常時付加されます。
 * 
 *   <autoState:5 9>
 *   SRPG開始時、またはsrpgAddUnitコマンド実行時に 5 番と 9 番のステートを
 *   自動的に付加します。
 *
 * 
 * メモ欄タグ（アクター、職業、武器、防具、敵キャラ、ステート）:
 * 
 *   <mov:4>
 *   移動力を設定します。アクターの場合は現在の職業、装備品、ステートの値も
 *   含めた合計値が採用されます。
 * 
 *   <shipMove>
 *   通常は進入不可能な水の上も移動することができるようになります。
 *
 *   <floatMove>
 *   地形を無視して移動することができるようになります。
 * 
 *   <search:5>
 *   索敵距離を設定します。一番近くにいる敵対ユニットとの距離が
 *   この値よりも大きい場合、移動も行動もしなくなります。
 *   タグを省略、または 0 を指定するとこの機能はオフになります。
 * 
 * 
 * メモ欄タグ（アイテム、スキル）:
 * 
 *   <range:diamond 2>
 *   スキルの射程距離を設定します。射程タイプと射程距離を半角スペースで
 *   区切って指定してください。射程タイプは下記の中から選んでください。
 *     diamond = ひし形
 *     rect    = 四角形
 *     line    = 直線（上下左右）
 *   また、<range:diamond 2 rect 0> のように続けてもうひとつタイプと距離を
 *   指定すると、範囲の中心に穴をあけることができます。
 *
 *   <effect:rect 3>
 *   スキルの効果範囲を設定します。範囲タイプと大きさを半角スペースで
 *   区切って指定してください。指定する値は射程距離と同じです。
 * 
 * 
 * メモ欄タグ（敵キャラ）:
 * 
 *   <faceName:Monster>
 *   敵キャラの顔グラフィックとして利用する画像ファイル名を設定します。
 * 
 *   <faceIndex:0>
 *   敵キャラの顔グラフィックのインデックスを設定します。
 *   インデックスとは画像のどの部分を使用するかを決める番号です。
 *   0 1 2 3
 *   4 5 6 7
 *
 *   <level:10>
 *   敵キャラのレベルを設定します、この値はステータス表示のためのダミーです、
 *   数値によって能力値が変化するようなことはありません。
 *
 *   <class:3>
 *   敵キャラの職業を設定します、この値はステータス表示のためのダミーです、
 *   数値によって能力値が変化するようなことはありません。
 *
 *   <nickname:乱暴者>
 *   敵キャラの二つ名を設定します。
 *
 *   <profile:人間が大嫌いなオーク族の戦士>
 *   敵キャラのプロフィールを設定します。
 *
 *   <equips:2 0 0 3 0>
 *   敵キャラの装備品を設定します、この値はステータス表示のためのダミーです、
 *   数値によって能力値が変化するようなことはありません。
 *   装備スロットの上から順に装備品の番号を半角スペースで区切って
 *   指定してください。
 *
 *   <attackAnimation:6>
 *   敵キャラの通常攻撃のアニメーション番号を設定します。
 * 
 * 
 * プラグインコマンド:
 * 
 *   reserveSrpg
 *   SRPG機能を有効化する予約をします、このコマンドを実行したあとにイベント
 *   コマンド『場所移動』でマップが切り替わるとSRPG機能が有効になります。
 *
 *   srpgCursorMove 10 5
 *   SRPGカーソルを座標 (10, 5) へ移動させます。
 * 
 *   srpgCursorMoveToEvent 2
 *   SRPGカーソルをイベント 2 番へ移動させます。
 * 
 *   setSrpgDestination 4 10 15
 *   4 番のイベントの目的地を座標 (10, 15) に設定します。
 * 
 *   clearSrpgDestination 4
 *   4 番のイベントの目的地設定を解除します。
 * 
 * 
 * スクリプトコマンド:
 * 
 *   this.isSrpgTurnStart()
 *   ターン開始フラグが立っているかどうかを返します。
 *
 *   this.isSrpgActorTurn()
 *   味方ターンかどうかを返します。
 *
 *   this.srpgNextUnit()
 *   次に行動するイベント番号を返します。
 * 
 *   this.srpgLastUnit()
 *   直前に行動したイベント番号を返します。
 * 
 *   this.srpgBattler(0)
 *   ユニットイベントのバトラーオブジェクトを返します。
 *   括弧内に取得したいユニットイベントのイベント番号を指定してください。
 *   0 を指定した場合はこのコマンドを実行しているイベントが対象となります。
 *   何も指定しなかった場合は次に行動するイベント、または直前に行動した
 *   イベントが対象となります。
 * 
 *   this.srpgRemoveUnit(0)
 *   ユニットイベントを強制的に排除します。
 *   戦闘不能になった場合と同じ扱いとなり、セルフスイッチＡが自動的に
 *   オンになり、イベント内容も実行されます。
 *   対象の指定方法は this.srpgBattler と同じです。
 * 
 *   this.srpgAddUnit(10, 1)
 *   イベント番号 10 番を敵キャラ 1 番のエネミーユニットとして設定します。
*/

var Imported = Imported || {};
Imported.TMSrpg = true;

(function() {

  var parameters = PluginManager.parameters('TMSrpg');
  var vnSrpgTurnCount = +(parameters['vnSrpgTurnCount'] || 1);
  var vnActorUnitNums = +(parameters['vnActorUnitNums'] || 2);
  var vnEnemyUnitNums = +(parameters['vnEnemyUnitNums'] || 3);
  var srpgBasicWait = +(parameters['srpgBasicWait'] || 30);
  var damagePopupInterval = +(parameters['damagePopupInterval'] || 30);
  var checkSkillId = +(parameters['checkSkillId'] || 0);
  var regionEffects = {};
  parameters['regionEffects'].split(' ').forEach(function(arg) {
    arg = arg.split(',').map(Number);
    regionEffects[arg[0]] = arg[1];
  });
  var useRegionEffectWindow = parameters['useRegionEffectWindow'] === '1';
  var useUnitHpGauge = parameters['useUnitHpGauge'] === '1';
  var useUnitStateIcon = parameters['useUnitStateIcon'] === '1';
  var simpleMoveInput = parameters['simpleMoveInput'] === '1';
  var moveCommand = parameters['moveCommand'];
  var moveCancelCommand = parameters['moveCancelCommand'];
  var actionCommand = parameters['actionCommand'];
  var itemCommand = parameters['itemCommand'];
  var equipCommand = parameters['equipCommand'];
  var waitingCommand = parameters['waitingCommand'];
  var statusCommand = parameters['statusCommand'];
  var turnEndCommand = parameters['turnEndCommand'];
  var unitListCommand = parameters['unitListCommand'];
  var infoCommand = parameters['infoCommand'];
  var optionsCommand = parameters['optionsCommand'];
  var saveCommand = parameters['saveCommand'];
  var loadCommand = parameters['loadCommand'];
  var gameEndCommand = parameters['gameEndCommand'];
  var yesCommand = parameters['yesCommand'];
  var noCommand = parameters['noCommand'];
  var moveParam = parameters['moveParam'];
  var moveHelp = parameters['moveHelp'];
  var waitingHelp = parameters['waitingHelp'];
  var turnEndHelp = parameters['turnEndHelp'];
  var actionRangeHelp = parameters['actionRangeHelp'];
  var actionEffectHelp = parameters['actionEffectHelp'];
  var colorAreaMove = parameters['colorAreaMove'].split(' ').map(Number);
  var colorAreaWaiting = parameters['colorAreaWaiting'].split(' ').map(Number);
  var colorAreaRange = parameters['colorAreaRange'].split(' ').map(Number);
  var colorAreaEffect = parameters['colorAreaEffect'].split(' ').map(Number);
  var backAttackPhysical = +(parameters['backAttackPhysical'] || 1.5);
  var backAttackMagical = +(parameters['backAttackMagical'] || 1.5);
  var reflectAnimationId = +(parameters['reflectAnimationId'] || 0);
  var srpgCommandX = +parameters['srpgCommandX'];
  var srpgCommandY = +parameters['srpgCommandY'];
  var srpgCommandLineHeight = +parameters['srpgCommandLineHeight'];
  var srpgStatusBackground = +parameters['srpgStatusBackground'];
  var srpgStatusNameWidth = +parameters['srpgStatusNameWidth'];
  var srpgStatusHpWidth = +parameters['srpgStatusHpWidth'];
  var srpgStatusFaceMirror = parameters['srpgStatusFaceMirror'];
  var srpgUnitListWidth = +parameters['srpgUnitListWidth'];
  var srpgUnitListRows = +parameters['srpgUnitListRows'];
  var srpgInfoSize = parameters['srpgInfoSize'].split('*').map(Number);
  var srpgStatusArrowImage = parameters['srpgStatusArrowImage'];
  var srpgCursorImage = parameters['srpgCursorImage'];
  
  //-----------------------------------------------------------------------------
  // Game_Temp
  //

  // 初期化処理
  var _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.call(this);
    this.clearSrpgCommand();
    this.clearSrpgNextUnitId();
    this._srpgLastUnitId = -1;
    this._srpgDeadUnitIds = [];
    this._srpgCounterUnitIds = [];
  };

  // ダミーウィンドウを返す
  Game_Temp.prototype.srpgDummyWindow = function() {
    if (this._srpgDummyWindow == null) this._srpgDummyWindow = new Window_Base(0, 0, 0, 0);
    return this._srpgDummyWindow;
  };
  
  // SRPGコマンドウィンドウの復元予約
  Game_Temp.prototype.reserveSrpgCommand = function(index, event) {
    this._srpgCommandIndex = index;
    this._srpgCommandEventId = event ? event.eventId() : 0;
  };

  // SRPGコマンドウィンドウの復元予約をクリア
  Game_Temp.prototype.clearSrpgCommand = function() {
    this._srpgCommandIndex = -1;
  };

  // SRPGコマンドウィンドウの復元予約が有効かどうかを返す
  Game_Temp.prototype.isSrpgCommandReserved = function() {
    return this._srpgCommandIndex >= 0;
  };

  // 復元予約のウィンドウインデックスを返す
  Game_Temp.prototype.srpgCommandIndex = function() {
    return this._srpgCommandIndex;
  };

  // 復元予約の対象イベントを返す
  Game_Temp.prototype.srpgCommandEvent = function() {
    return $gameMap.event(this._srpgCommandEventId);
  };
  
  // SRPGのターン開始フラグをセット
  Game_Temp.prototype.setSrpgTurnStart = function(flag) {
    this._srpgTurnStart = flag;
  };
  
  // SRPGのターン開始フラグが立っているかを返す
  Game_Temp.prototype.isSrpgTurnStart = function() {
    return this._srpgTurnStart;
  };
  
  // これから行動するユニットのイベント番号をクリア
  Game_Temp.prototype.clearSrpgNextUnitId = function() {
    this.setSrpgNextUnitId(0);
  };

  // これから行動するユニットのイベント番号をセット
  Game_Temp.prototype.setSrpgNextUnitId = function(id) {
    this._srpgNextUnitId = id;
  };

  // これから行動するユニットのイベント番号を返す
  Game_Temp.prototype.srpgNextUnitId = function() {
    return this._srpgNextUnitId;
  };

  // 最後に選択したユニットのイベント番号をセット
  Game_Temp.prototype.setSrpgLastUnitId = function(id) {
    this._srpgLastUnitId = id;
  };

  // 最後に選択したユニットのイベント番号を返す
  Game_Temp.prototype.srpgLastUnitId = function() {
    return this._srpgLastUnitId;
  };

  // ユニットの退場予約
  Game_Temp.prototype.setSrpgDeadUnitId = function(id) {
    this._srpgDeadUnitIds.push(id);
  };

  // 退場予約されているユニットのイベント番号をひとつ返す
  Game_Temp.prototype.srpgDeadUnitId = function() {
    return this._srpgDeadUnitIds.shift();
  };

  // ユニットの反撃予約
  Game_Temp.prototype.setSrpgCounterUnitId = function(id) {
    this._srpgCounterUnitIds.push(id);
  };

  // 反撃予約されているユニットのイベント番号をひとつ返す
  Game_Temp.prototype.srpgCounterUnitId = function() {
    return this._srpgCounterUnitIds.shift();
  };

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  // 行動主体のセット
  var _Game_Action_setSubject = Game_Action.prototype.setSubject;
  Game_Action.prototype.setSubject = function(subject) {
    _Game_Action_setSubject.call(this, subject);
    // エネミーをトループではなくユニットイベントから取得するための仕込み
    if (this._subjectActorId === 0 && this._subjectEnemyIndex < 0) {
      this._subjectActorId = -subject.srpgEventId();
    }
  };

  // 行動主体を返す
  var _Game_Action_subject = Game_Action.prototype.subject;
  Game_Action.prototype.subject = function() {
    if (this._subjectActorId < 0) {
      // トループを使わずに行動主体としてSRPGバトラーを返す
      return $gameMap.event(-this._subjectActorId).srpgBattler();
    }
    return _Game_Action_subject.call(this);
  };

  // SRPG用の行動評価計算
  Game_Action.prototype.srpgEvaluateWithTarget = function(target) {
    if (this.isHpEffect()) {
      var value = this.srpgMakeDamageValue(target, true);
      if (this.isForOpponent()) {
        return value / Math.max(target.hp, 1);
      } else {
        var recovery = Math.min(-value, target.mhp - target.hp);
        return recovery / target.mhp;
      }
    }
  };

  // SRPG用の行動結果適用
  Game_Action.prototype.srpgApply = function(target) {
    var result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
    result.missed = (result.used && Math.random() >= this.itemHit(target));
    result.evaded = (!result.missed && Math.random() < this.itemEva(target));
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
    if (result.isHit()) {
      if (this.item().damage.type > 0) {
        result.critical = (Math.random() < this.itemCri(target));
        var value = this.srpgMakeDamageValue(target, false, result.critical);
        this.executeDamage(target, value);
      }
      this.item().effects.forEach(function(effect) {
        this.applyItemEffect(target, effect);
      }, this);
      this.applyItemUserEffect(target);
    }
  };

  // 結果予測用のダメージ計算
  Game_Action.prototype.srpgMakeDamageValue = function(target, evaluate, critical) {
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) value *= target.pdr;
    if (this.isMagical()) value *= target.mdr;
    if (baseValue < 0) value *= target.rec;
    if (baseValue > 0) value = this.applyBackAttack(value, target);
    if (!evaluate) {
      var item = this.item();
      if (critical) value = this.applyCritical(value);
      value = this.applyVariance(value, item.damage.variance);
    }
    value = this.applyGuard(value, target);
    return Math.round(value);
  };

  // 背後攻撃のダメージ補正
  Game_Action.prototype.applyBackAttack = function(value, target) {
    var subject = this.subject();
    if (subject.srpgEventId() > 0 && target.srpgEventId() > 0) {
      var subjectEvent = subject.srpgEvent();
      var targetEvent = target.srpgEvent();
      var lastDirection = subjectEvent.direction();
      subjectEvent.turnTowardCharacter(targetEvent);
      if (subjectEvent.direction() === targetEvent.direction()) {
        if (this.isPhysical()) value *= backAttackPhysical;
        if (this.isMagical()) value *= backAttackMagical;
      }
      subjectEvent.setDirection(lastDirection);
    }
    return value;
  };

  // ターゲットに対して有効な効果を返す
  Game_Action.prototype.itemValidEffect = function(target) {
    var effects = this.item().effects;
    for (var i = 0; i < effects.length; i++) {
      var effect = effects[i];
      if (this.testItemEffect(target, effect)) return effect;
    }
    return null;
  };

  // 行動内容が逃げるかどうかを返す
  Game_Action.prototype.isEscape = function() {
    var effects = this.item().effects;
    return effects.some(function(effect) {
      return effect.code === Game_Action.EFFECT_SPECIAL;
    });
  };

  //-----------------------------------------------------------------------------
  // Game_BattlerBase
  //

  // 使用可能時の適合判定
  var _Game_BattlerBase_isOccasionOk = Game_BattlerBase.prototype.isOccasionOk;
  Game_BattlerBase.prototype.isOccasionOk = function(item) {
    // SRPGが有効なら『常時』か『バトル画面』に設定されていれば使用可能
    if ($gameMap.isSrpg()) return item.occasion === 0 || item.occasion === 1;
    return _Game_BattlerBase_isOccasionOk.call(this, item);
  };

  // SRPGパラメータを返す
  Game_BattlerBase.prototype.srpgParam = function(tag) {
    var result = this.traitObjects().reduce(function(r, object) {
      return r + Number(object.meta[tag] || 0);
    }, 0);
    return Math.max(result, 0);
  };

  // SRPGフラグを返す
  Game_BattlerBase.prototype.srpgFlag = function(tag) {
    return this.traitObjects().some(function(object) {
      return object.meta[tag];
    });
  };

  // ユニットのイベント番号をセット
  Game_BattlerBase.prototype.setSrpgEventId = function(id) {
    this._srpgEventId = id;
  };

  // ユニットのイベント番号を返す
  Game_BattlerBase.prototype.srpgEventId = function() {
    return this._srpgEventId || 0;
  };

  // ユニットイベントを返す
  Game_BattlerBase.prototype.srpgEvent = function() {
    return $gameMap.event(this.srpgEventId());
  };

  //-----------------------------------------------------------------------------
  // Game_Battler
  //

  // ユニット退場に対応したgainHp
  Game_Battler.prototype.srpgGainHp = function(value) {
    Game_Battler.prototype.gainHp.call(this, value);
    if (this.isDead()) $gameTemp.setSrpgDeadUnitId(this.srpgEventId());
  };

  // 行動のアニメーションIDを返す
  Game_Battler.prototype.srpgActionAnimationId = function(item) {
    var animationId = item.animationId;
    return animationId < 0 ? this.attackAnimationId1() : animationId;
  };

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  // srpg用の自動行動決定処理
  Game_Actor.prototype.srpgMakeActions = function() {
    Game_Battler.prototype.makeActions.call(this);
    if (this.isAutoBattle()) {
      // 使用可能な行動内容からランダムに選択する
      var list = this.makeActionList();
      for (var i = 0; i < this.numActions(); i++) {
        this.setAction(i, list[Math.randomInt(list.length)]);
      }
    } else {
      this.makeConfusionActions();
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Enemy
  //

  Object.defineProperty(Game_Enemy.prototype, 'level', {
    get: function() {
      return this.enemy().meta.level || 1;
    },
    configurable: true
  });

  Game_Enemy.prototype.faceName = function() {
    return this.enemy().meta.faceName || '';
  };

  Game_Enemy.prototype.faceIndex = function() {
    return +(this.enemy().meta.faceIndex || 0);
  };
  
  Game_Enemy.prototype.nickname = function() {
    return this.enemy().meta.nickname || '';
  };

  Game_Enemy.prototype.profile = function() {
    return this.enemy().meta.profile || '';
  };

  Game_Enemy.prototype.currentClass = function() {
    return $dataClasses[this.enemy().meta.class || 1];
  };

  Game_Enemy.prototype.equips = function() {
    var equipIds = this.enemy().meta.equips;
    if (equipIds) {
      equipIds = equipIds.split(' ').map(Number);
      return equipIds.map(function(id, i) {
        return i === 0 ? $dataWeapons[id] : $dataArmors[id];
      });
    }
    return [];
  };

  Game_Enemy.prototype.attackAnimationId1 = function() {
    return +(this.enemy().meta.attackAnimation || 1);
  };

  // srpg用の自動行動決定処理
  Game_Enemy.prototype.srpgMakeActions = function() {
    return this.makeActions();
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  // 範囲表示カラーを初期化
  Game_Map.prototype.initColorArea = function() {
    if (!Imported.SAN_TileToner) return;
    this.clearTileTones();
  };

  // 範囲表示カラーをセット
  Game_Map.prototype.setColorArea = function(colorParam) {
    if (!Imported.SAN_TileToner) return;
    this.clearTileTones();
    var keys = Object.keys(this._srpgArea);
    for (var i = 0, a; i < keys.length; i++) {
      a = keys[i].split(',').map(Number);
      this.setTileTone.apply(this, a.concat(colorParam));
    }
  };

  // SRPG機能が有効になっているかどうかを返す
  Game_Map.prototype.isSrpg = function() {
    return this._srpgActive;
  };
  
  // SRPG機能を有効にします
  Game_Map.prototype.srpgActivate = function() {
    this._srpgActive = true;
    this._srpgActorTurn = false;
    this.changeSrpgTurnCount(0);
    this.setupTilePassableTable();        // 地形通行判定テーブルのセットアップ
    this.setupSrpgManagerEvent();         // SRPG管理イベントのセットアップ
    this.setupSrpgUnits();                // SRPGユニットのセットアップ
    this.onSrpgTurnStart();
  };
  
  // SRPG機能を無効にします
  Game_Map.prototype.srpgDeactivate = function() {
    this._srpgActive = false;
    $gameTemp.clearSrpgCommand();
    $gameTemp.clearSrpgNextUnitId();
  };
  
  // SRPGの開始を予約します
  Game_Map.prototype.reserveSrpgStart = function() {
    this._needsSrpgStart = true;
  };
  
  // ターン開始
  Game_Map.prototype.onSrpgTurnStart = function() {
    this._srpgActorTurn = !this._srpgActorTurn;
    if (this._srpgActorTurn) {
      this.changeSrpgTurnCount(this._srpgTurnCount + 1);  // ターン数のカウント
    }
    this.srpgActiveTurnUnits(true).forEach(function(event) {
      event.onSrpgTurnStart();
    });
    $gameTemp.setSrpgTurnStart(true);     // ターン開始フラグを立てる
    this.startSrpgManagerEvent();         // SRPG管理イベントを起動する
  };

  // ターン数の変更
  Game_Map.prototype.changeSrpgTurnCount = function(n) {
    this._srpgTurnCount = n;
    $gameVariables.setValue(vnSrpgTurnCount, n);
  };

  // 味方ターンかどうかを返す
  Game_Map.prototype.isSrpgActorTurn = function() {
    return this._srpgActorTurn;
  };
  
  // マップのセットアップ
  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.initColorArea();
    if (this._needsSrpgStart) {
      this.srpgActivate();                // SRPG機能を有効化
      this._needsSrpgStart = false;
    } else if (this.isSrpg()) {
      this.srpgDeactivate();              // SRPG機能を無効化
    }
  };
  
  // 地形通行判定テーブルをセットアップ
  Game_Map.prototype.setupTilePassableTable = function() {
    this._normalTilePassableTable = [];
    this._floatTilePassableTable  = [];
    this._shipTilePassableTable   = [];
    this._terrainTagTable = [];
    for (var x = 0; x < this.width(); x++) {
      this._normalTilePassableTable[x] = [];
      this._floatTilePassableTable[x]  = [];
      this._shipTilePassableTable[x]   = [];
      for (var y = 0; y < this.height(); y++) {
        this._normalTilePassableTable[x][y] = [];
        this._floatTilePassableTable[x][y]  = [];
        this._shipTilePassableTable[x][y]   = [];
        for (var d = 2; d <= 8; d += 2) {
          var x2 = this.roundXWithDirection(x, d);
          var y2 = this.roundYWithDirection(y, d);
          if (this.isValid(x2, y2)) {
            var d2 = 10 - d;
            var index = d / 2 - 1;
            var pass2 = this.isPassable(x2, y2, d2);
            if (this.isPassable(x, y, d) && pass2) {
              this._normalTilePassableTable[x][y][index] = true;
              this._shipTilePassableTable[x][y][index]   = true;
            } else if (this.isShipPassable(x2, y2) ||
                       (this.isShipPassable(x, y) && pass2)) {
              this._shipTilePassableTable[x][y][index] = true;
            }
            this._floatTilePassableTable[x][y][index] = true;
          }
        }
        if (this.terrainTag(x, y) === 1) {
          this._terrainTagTable.push(new Point(x, y));
        }
      }
    }
  };

  // SRPG管理イベントのセットアップ
  Game_Map.prototype.setupSrpgManagerEvent = function() {
    var events = this.events();
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (event.event().meta.srpgManager) {
        this._srpgManagerEventId = event.eventId();
        event.setSelfSwitch('A', false);
        event.setSelfSwitch('B', false);
        event.refresh();
        break;
      }
    }
  };
  
  // SRPG管理イベントを返す
  Game_Map.prototype.srpgManagerEvent = function() {
    return this.event(this._srpgManagerEventId);
  };
  
  // SRPG管理イベントを起動する
  Game_Map.prototype.startSrpgManagerEvent = function() {
    this.srpgManagerEvent().start();
  };
  
  // SRPGユニットのセットアップ
  Game_Map.prototype.setupSrpgUnits = function() {
    this._srpgEnemyIds = {};
    this.events().forEach(function(event) {
      event.setupSrpgBattler();
    });
    this.updateSrpgEnemyLetter();
    this.updateActorUnitNums();
    this.updateEnemyUnitNums();
    $gameTemp.setSrpgLastUnitId(-1);
  };

  Game_Map.prototype.updateSrpgEnemyLetter = function() {
    var events = this.srpgEnemyUnits();
    for (var i = 0; i < events.length; i++) {
      var id = events[i].srpgBattler().enemyId();
      if (this._srpgEnemyIds[id] >= 2) events[i].setPlural(true);
    }
  };

  Game_Map.prototype.setSrpgEnemyId = function(id) {
    if (this._srpgEnemyIds[id] == null) this._srpgEnemyIds[id] = 0;
    return this._srpgEnemyIds[id]++;
  };

  // 残っているアクターユニットの数を更新
  Game_Map.prototype.updateActorUnitNums = function() {
    var events = this.srpgActorUnits(true).filter(function(event) {
      return !event.event().meta.neutral;
    });
    $gameVariables.setValue(vnActorUnitNums, events.length);
  };
  
  // 残っているエネミーユニットの数を更新
  Game_Map.prototype.updateEnemyUnitNums = function() {
    var events = this.srpgEnemyUnits(true).filter(function(event) {
      return !event.event().meta.neutral;
    });
    $gameVariables.setValue(vnEnemyUnitNums, events.length);
  };
  
  // SRPGユニットを返す
  Game_Map.prototype.srpgUnits = function(alive) {
    return this.events().filter(function(event) {
      return event.isSrpgUnit(alive);
    });
  };
  
  // SRPGアクターユニットを返す
  Game_Map.prototype.srpgActorUnits = function(alive) {
    return this.events().filter(function(event) {
      return event.isSrpgActorUnit(alive);
    });
  };
  
  // SRPGエネミーユニットを返す
  Game_Map.prototype.srpgEnemyUnits = function(alive) {
    return this.events().filter(function(event) {
      return event.isSrpgEnemyUnit(alive);
    });
  };

  // ターンがアクティブな勢力に属するユニットを返す
  Game_Map.prototype.srpgActiveTurnUnits = function(alive) {
    return this._srpgActorTurn ? this.srpgActorUnits(alive) :
           this.srpgEnemyUnits(alive);
  };
  
  // 指定ユニットと違う勢力に属するユニットを返す
  Game_Map.prototype.srpgOpponentUnits = function(unit, alive) {
    return unit.isSrpgActorUnit() ? this.srpgEnemyUnits(alive) : this.srpgActorUnits(alive);
  };

  // 指定ユニットと違う勢力に属するユニットを返す（魅了と裏切り者を考慮）
  Game_Map.prototype.srpgOpponentUnitsEx = function(unit, alive) {
    var confusionLevel = unit.srpgBattler().confusionLevel();
    var flag = unit.isSrpgActorUnit() ^ unit.isTraitor() ^
               ((confusionLevel === 2 && Math.randomInt(2) === 0) || confusionLevel === 3);
    var a = flag ? this.srpgEnemyUnits(alive) : this.srpgActorUnits(alive);
    var b = flag ? this.srpgActorUnits(alive) : this.srpgEnemyUnits(alive);
    var result = a.filter(function(event) {
      return (event.srpgBattler().confusionLevel() < 3) === !event.isTraitor();
    });
    return result.concat(b.filter(function(event) {
      return (event.srpgBattler().confusionLevel() < 3) !== !event.isTraitor();
    }));
  };
  
  // 指定ユニットと同じ勢力に属するユニットを返す
  Game_Map.prototype.srpgFriendUnits = function(unit, alive) {
    return unit.isSrpgActorUnit() ? this.srpgActorUnits(alive) : this.srpgEnemyUnits(alive);
  };
  
  // 指定座標のSRPGユニットを返す
  Game_Map.prototype.srpgUnitXy = function(x, y, alive) {
    var events = this.srpgUnits(alive);
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (event.pos(x, y)) return event;
    }
    return null;
  };
  
  // 範囲内のSRPGユニットを返す
  Game_Map.prototype.srpgUnitsArea = function(area, alive) {
    area = area || this._srpgArea;
    var result = [];
    var events = this.srpgUnits(alive);
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var key = '' + event.x + ',' + event.y;
      if (area[key]) result.push(event);
    }
    return result;
  };

  // 指定した行動が有効なユニットを返す
  Game_Map.prototype.srpgActionEffectiveUnits = function(unit, action) {
    if (!action.item()) return [];
    var confusionLevel = unit.srpgBattler().confusionLevel();
    var flag = ((confusionLevel === 2 && Math.randomInt(2) === 0) ||
               confusionLevel === 3) ^ unit.isTraitor();
    // 敵対象スキルかつ勢力反転なし、または味方対象スキルかつ勢力反転あり
    if (action.isForOpponent() ^ flag) {
      // 魅了されていない敵対ユニットを抽出
      var result = this.srpgOpponentUnits(unit, true).filter(function(event) {
        return event.srpgBattler().confusionLevel() < 3;
      });
      // 裏切り者の味方ユニットを追加
      result = result.concat(this.srpgFriendUnits(unit, true).filter(function(event) {
        return event.isTraitor();
      }));
      return result;
    }
    // 敵対象スキルかつ勢力反転あり
    if (flag) {
      // 自分以外かつ、勢力反転していない味方ユニットを返す
      return this.srpgFriendUnits(unit, true).filter(function(event) {
        return event.eventId() !== unit.eventId() &&
               (!event.isTraitor() ^ event.srpgBattler().confusionLevel() === 3);
      });
    }
    // 味方対象スキルかつ勢力反転なし
    // 裏切り者以外の味方ユニットを返す
    return this.srpgFriendUnits(unit, true).filter(function(event) {
      return !event.isTraitor();
    });
  };

  // 移動中のSRPGユニットがいるかどうかを返す
  Game_Map.prototype.isSrpgUnitMoving = function() {
    return this.srpgUnits().some(function(event) {
      return event.isMoveRouteForcing();
    });
  };
  
  // アニメーション表示中のSRPGユニットがいるかどうかを返す
  Game_Map.prototype.isSrpgUnitAnimationPlaying = function() {
    return this.srpgUnits().some(function(event) {
      return event.isAnimationPlaying();
    });
  };
  
  // イベントを指定座標からの距離で並べ替える
  Game_Map.prototype.sortEventsDistance = function(events, x, y) {
    events.sort(function(a, b) {
      var d1 = Math.abs(x - a.x) + Math.abs(y - a.y);
      var d2 = Math.abs(x - b.x) + Math.abs(y - b.y);
      return d1 - d2;
    });
    return events;
  };
  
  // イベントを敏捷性で並べ替える
  Game_Map.prototype.sortEventsAgi = function(events) {
    events.sort(function(a, b) {
      return b.srpgBattler().agi - a.srpgBattler().agi;
    });
    return events;
  };
  
  // 移動可能範囲を表示する
  Game_Map.prototype.showMovableArea = function(unit) {
    this._srpgArea = {};
    this.setupPassableTable(unit);        // 通行判定テーブルをセットアップ
    this.checkMovableArea(unit);          // 移動可能範囲のルートチェック
    this.deleteAreaOverlapEvent();        // すでにイベントがある座標を除外
    this.setColorArea(colorAreaMove);
  };

  // 通行判定テーブルをセットアップ
  Game_Map.prototype.setupPassableTable = function(unit) {
    if (unit.isFloat()) {
      this._passableTable = JSON.parse(JSON.stringify(this._floatTilePassableTable));
    } else if (unit.isShip()) {
      this._passableTable = JSON.parse(JSON.stringify(this._shipTilePassableTable));
    } else {
      this._passableTable = JSON.parse(JSON.stringify(this._normalTilePassableTable));
    }
    var events = this.srpgUnits(true);
    for (var i = 0, len = events.length; i < len; i++) {
      var event = events[i];
      if (event.isNormalPriority() && !unit.isFriend(event)) {
        for (var j = 0; j < 4; j++) {
          this._passableTable[event.x][event.y][j] = undefined;
        }
      }
    }
  };
  
  // 移動可能範囲のルートチェック
  Game_Map.prototype.checkMovableArea = function(unit) {
    var mov = unit.mov();
    if (mov === 0) return;
    mov = mov - 1;
    var a = [];
    a.push([unit.x, unit.y + 1, unit.x, unit.y, 0, '1', mov]);
    a.push([unit.x - 1, unit.y, unit.x, unit.y, 1, '2', mov]);
    a.push([unit.x + 1, unit.y, unit.x, unit.y, 2, '3', mov]);
    a.push([unit.x, unit.y - 1, unit.x, unit.y, 3, '4', mov]);
    while (a.length > 0) {
      var data = a.pop();
      var x = data[0];
      var y = data[1];
      var key = '' + x + ',' + y;
      if (this._passableTable[data[2]][data[3]][data[4]] &&
          (!this._srpgArea[key] || data[5].length <= this._srpgArea[key].length)) {
        this._srpgArea[key] = data[5];
        if (data[6] > 0) {
          data[6] = data[6] - 1;
          if (data[4] !== 3) a.push([x, y + 1, x, y, 0, data[5] + '1', data[6]]);
          if (data[4] !== 2) a.push([x - 1, y, x, y, 1, data[5] + '2', data[6]]);
          if (data[4] !== 1) a.push([x + 1, y, x, y, 2, data[5] + '3', data[6]]);
          if (data[4] !== 0) a.push([x, y - 1, x, y, 3, data[5] + '4', data[6]]);
        }
      }
    }
  };

  // 待機範囲を表示する
  Game_Map.prototype.showWaitingArea = function(unit) {
    this._srpgArea = this.createArea(unit.x, unit.y, ['diamond', 1, 'rect', 0]);
    this.setColorArea(colorAreaWaiting);
  };
  
  // 射程範囲を表示する
  Game_Map.prototype.showRangeArea = function(x, y, skill) {
    this._srpgArea = this.createRangeArea(x, y, skill);
    this.setColorArea(colorAreaRange);
  };

  // 射程範囲を作成する
  Game_Map.prototype.createRangeArea = function(x, y, skill) {
    var a = (skill.meta.range || 'diamond 1').split(' ');
    return this.createArea(x, y, a);
  };
  
  // 効果範囲を表示する
  Game_Map.prototype.showEffectArea = function(x, y, skill) {
    this._srpgArea = this.createEffectArea(x, y, skill);
    this.setColorArea(colorAreaEffect);
  };

  // 効果範囲を作成する
  Game_Map.prototype.createEffectArea = function(x, y, skill) {
    var a = (skill.meta.effect || 'diamond 0').split(' ');
    return this.createArea(x, y, a);
  };

  // 範囲を作成する
  Game_Map.prototype.createArea = function(x, y, param) {
    var area = {};
    if (param[0] === 'diamond') {
      this.setArea(area, this.isAreaValidDiamond, x, y, +param[1], true);
    } else if (param[0] === 'rect') {
      this.setArea(area, this.isAreaValidRect, x, y, +param[1], true);
    } else if (param[0] === 'line') {
      this.setArea(area, this.isAreaValidLine, x, y, +param[1], true);
    }
    if (param[2] === 'diamond') {
      this.deleteArea(area, this.isAreaValidDiamond, x, y, +param[3], false);
    } else if (param[2] === 'rect') {
      this.deleteArea(area, this.isAreaValidRect, x, y, +param[3], false);
    } else if (param[2] === 'line') {
      this.deleteArea(area, this.isAreaValidLine, x, y, +param[3], false);
    }
    return area;
  };
  
  Game_Map.prototype.setArea = function(area, checker, x, y, size) {
    for (var x2 = x - size; x2 <= x + size; x2++) {
      for (var y2 = y - size; y2 <= y + size; y2++) {
        if (checker(x, y, x2, y2, size)) area['' + x2 + ',' + y2] = true;
      }
    }
  };

  Game_Map.prototype.deleteArea = function(area, checker, x, y, size) {
    for (var x2 = x - size; x2 <= x + size; x2++) {
      for (var y2 = y - size; y2 <= y + size; y2++) {
        if (checker(x, y, x2, y2, size)) delete area['' + x2 + ',' + y2];
      }
    }
  };

  Game_Map.prototype.isAreaValidDiamond = function(x, y, x2, y2, size) {
    return Math.abs(x - x2) + Math.abs(y - y2) <= size;
  };

  Game_Map.prototype.isAreaValidRect = function(x, y, x2, y2, size) {
    return true;
  };

  Game_Map.prototype.isAreaValidLine = function(x, y, x2, y2, size) {
    return x === x2 || y === y2;
  };

  // 範囲からすでにイベントがある座標を除外
  Game_Map.prototype.deleteAreaOverlapEvent = function() {
    var events = this.events();
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (event.isNormalPriority() && !event.isThrough()) {
        delete this._srpgArea['' + event.x + ',' + event.y];
      }
    };
  };

  // 範囲が空かどうかを返す
  Game_Map.prototype.isSrpgAreaEmpty = function() {
    return Object.keys(this._srpgArea).length === 0;
  };
  
  // 範囲表示を隠す
  Game_Map.prototype.hideSrpgArea = function() {
    this.initColorArea();
  };
  
  // 指定座標の範囲の値を返す
  Game_Map.prototype.srpgAreaXy = function(x, y) {
    return this._srpgArea['' + x + ',' + y];
  };
  
  // 指定座標に一番近い範囲の座標を返す
  Game_Map.prototype.posInsideAreaNearXy = function(x, y) {
    var result = null;
    var minValue = 1000;
    var targetEvent = this.srpgUnitXy(x, y, true);
    if (targetEvent) {
      // 指定座標にユニットがいればその背後の評価を高くする
      var bonusD = 10 - targetEvent.direction();
      var bonusX = this.xWithDirection(x, bonusD);
      var bonusY = this.yWithDirection(y, bonusD);
    }
    for (var prop in this._srpgArea) {
      var pos = prop.split(',').map(Number);
      var d = Math.abs(x - pos[0]) + Math.abs(y - pos[1]);
      if (pos[0] === bonusX && pos[1] === bonusY) d--; 
      if (d < minValue) {
        minValue = d;
        result = new Point(pos[0], pos[1]);
      }
    }
    return result;
  };
  
  // 指定座標から一番遠い範囲の座標を返す
  Game_Map.prototype.posInsideAreaFarXy = function(x, y) {
    var result = null;
    var maxValue = -1;
    for (var prop in this._srpgArea) {
      var pos = prop.split(',').map(Number);
      var d = Math.abs(x - pos[0]) + Math.abs(y - pos[1]);
      if (d > maxValue) {
        maxValue = d;
        result = new Point(pos[0], pos[1]);
      }
    }
    return result;
  };
  
  // 指定座標が範囲に含まれているかを返す
  Game_Map.prototype.isInsideArea = function(x, y) {
    return this.srpgAreaXy(x, y) !== undefined;
  };

  // 指定イベントの一番近くにあり、ユニットイベントのいない地形タグ 1 番の座標を返す
  Game_Map.prototype.srpgBlankPosition = function(event) {
    var result = null;
    var minValue = 1000;
    for (var i = 0; i < this._terrainTagTable.length; i++) {
      var x = this._terrainTagTable[i].x;
      var y = this._terrainTagTable[i].y;
      if (this.srpgUnitXy(x, y)) continue;
      var d = Math.abs(event.x - x) + Math.abs(event.y - y);
      if (d < minValue) {
        minValue = d;
        result = this._terrainTagTable[i];
      }
    }
    return result;
  };
  
  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //
  
  // キャラクターがSRPGユニットかどうかを返す
  Game_CharacterBase.prototype.isSrpgUnit = function() {
    return false;
  };
  
  //-----------------------------------------------------------------------------
  // Game_Character
  //
  
  Game_Character.prototype.turnTowardXy = function(x, y) {
    var sx = this.deltaXFrom(x);
    var sy = this.deltaYFrom(y);
    if (Math.abs(sx) > Math.abs(sy)) {
      this.setDirection(sx > 0 ? 4 : 6);
    } else if (sy !== 0) {
      this.setDirection(sy > 0 ? 8 : 2);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //
  
  var _Game_Player_hasStepAnime = Game_Player.prototype.hasStepAnime;
  Game_Player.prototype.hasStepAnime = function() {
    return _Game_Player_hasStepAnime.call(this) || $gameMap.isSrpg();
  };

  var _Game_Player_refresh = Game_Player.prototype.refresh;
  Game_Player.prototype.refresh = function() {
    _Game_Player_refresh.call(this);
    if ($gameMap.isSrpg()) {  // SRPG機能が有効なら歩行グラフィックをカーソルにする
      var characterName = srpgCursorImage;
      var characterIndex = 0;
      this.setImage(characterName, characterIndex);
    }
  };

  var _Game_Player_updateMove = Game_Player.prototype.updateMove;
  Game_Player.prototype.updateMove = function() {
    if ($gameMap.isSrpg()) {
      if (this._x < this._realX) {
        this._realX = Math.max(this._realX - this._srpgVx, this._x);
      } else if (this._x > this._realX) {
        this._realX = Math.min(this._realX + this._srpgVx, this._x);
      }
      if (this._y < this._realY) {
        this._realY = Math.max(this._realY - this._srpgVy, this._y);
      } else if (this._y > this._realY) {
        this._realY = Math.min(this._realY + this._srpgVy, this._y);
      }
    } else {
      _Game_Player_updateMove.call(this);
    }
  };

  var _Game_Player_updateNonmiving = Game_Player.prototype.updateNonmoving;
  Game_Player.prototype.updateNonmoving = function(wasMoving) {
    if (!$gameMap.isSrpg()) {
      _Game_Player_updateNonmiving.call(this, wasMoving);
    }
  };

  var _Game_Player_canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    return $gameMap.isSrpg() ? false : _Game_Player_canMove.call(this);
  };

  // SRPG機能（カメラ）としての移動先をセットする（座標で指定）
  Game_Player.prototype.setSrpgCameraXy = function(x, y) {
    this._x = x;
    this._y = y;
    this._srpgVx = Math.abs((this._x - this._realX) / 8);
    this._srpgVy = Math.abs((this._y - this._realY) / 8);
  };
  
  // SRPG機能（カメラ）としての移動先をセットする（イベントで指定）
  Game_Player.prototype.setSrpgCameraEvent = function(event) {
    this.setSrpgCameraXy(event.x, event.y);
  };
  
  //-----------------------------------------------------------------------------
  // Game_Followers
  //
  
  var _Game_Followers_isVisible = Game_Followers.prototype.isVisible;
  Game_Followers.prototype.isVisible = function() {
    return _Game_Followers_isVisible.call(this) && !$gameMap.isSrpg();
  };

  //-----------------------------------------------------------------------------
  // Game_Event
  //

  Game_Event.prototype.setSelfSwitch = function(switchCode, flag) {
    var key = [this._mapId, this._eventId, switchCode];
    $gameSelfSwitches.setValue(key, flag);
  };

  Game_Event.prototype.srpgAutoStart = function(switchCode) {
    this.setSelfSwitch(switchCode, true);
    this.refresh();
    this.start();
  };
  
  var _Game_Event_erase = Game_Event.prototype.erase;
  Game_Event.prototype.erase = function() {
    _Game_Event_erase.call(this);
    if (this.isSrpgActorUnit()) {
      $gameMap.updateActorUnitNums();
    } else {
      $gameMap.updateEnemyUnitNums();
    }
  };

  // SRPGバトラーをセットアップ
  Game_Event.prototype.setupSrpgBattler = function(enemyId) {
    this._srpgActorId = null;
    this._srpgEnemyId = null;
    this._srpgBattler = null;
    var srpgActorId = this.event().meta.srpgActor;
    if (srpgActorId) {
      this.setSelfSwitch('A', false);
      var actor = $gameParty.allMembers()[+srpgActorId];
      if (actor) {
        this.initSrpgUnitSetting();
        this._srpgActorId = +srpgActorId;
        this.setImage(actor.characterName(), actor.characterIndex());
      } else {
        this.erase();
      }
    } else {
      var srpgEnemyId = enemyId || this.event().meta.srpgEnemy;
      if (srpgEnemyId != null) {
        this.setSelfSwitch('A', false);
        if (+srpgEnemyId > 0) {
          this.initSrpgUnitSetting();
          this._srpgEnemyId = +srpgEnemyId;
          this._srpgBattler = new Game_Enemy(this._srpgEnemyId, 0, 0);
          this._letterIndex = $gameMap.setSrpgEnemyId(this._srpgEnemyId);
        }
      }
    }
    if (this.isSrpgUnit()) {
      this.srpgBattler().setSrpgEventId(this.eventId());
      this.setSrpgAutoState();
      this.refreshRegionEffect(this.x, this.y, this.x, this.y);
    }
  };

  Game_Event.prototype.initSrpgUnitSetting = function() {
    this.refresh();
    this.setPriorityType(1);
  };

  Game_Event.prototype.setSrpgAutoState = function() {
    var stateIds = (this.event().meta.autoState || '').split(' ').map(Number);
    var battler = this.srpgBattler();
    stateIds.forEach(function(stateId) {
      battler.addState(stateId);
    });
  };

  Game_Event.prototype.setPlural = function(plural) {
    var battler = this.srpgBattler();
    battler.setPlural(plural);
    battler.setLetter(plural ? $gameTroop.letterTable()[this._letterIndex] : '');
  };
  
  // イベントのSRPGバトラーを返す
  Game_Event.prototype.srpgBattler = function() {
    if (this.isSrpgActorUnit()) return $gameParty.allMembers()[this._srpgActorId];
    return this._srpgBattler;
  };
  
  // イベントがSRPGユニットかどうかを返す
  Game_Event.prototype.isSrpgUnit = function(alive) {
    return this.isSrpgActorUnit(alive) || this.isSrpgEnemyUnit(alive);
  };
  
  // イベントがSRPGアクターユニットかどうかを返す
  Game_Event.prototype.isSrpgActorUnit = function(alive) {
    if (this._srpgActorId == null) return false;
    return alive == null || this.srpgBattler().isAlive() === alive;
  };
  
  // イベントがSRPGエネミーユニットかどうかを返す
  Game_Event.prototype.isSrpgEnemyUnit = function(alive) {
    if (this._srpgEnemyId == null) return false;
    return alive == null || this.srpgBattler().isAlive() === alive;
  };
  
  // イベントが対象ユニットと同じ勢力に属しているかどうかを返す
  Game_Event.prototype.isFriend = function(unit) {
    return this.srpgBattler().isActor() === unit.srpgBattler().isActor();
  };

  // イベントが自動行動かどうかを返す
  Game_Event.prototype.isSrpgAutoBattle = function() {
    var battler = this.srpgBattler();
    if (this.isSrpgActorUnit()) {
      return battler.isAutoBattle() || battler.isConfused();
    }
    return battler.enemy().actions.length > 0;
  };

  // イベントが操作入力可能かどうかを返す
  Game_Event.prototype.isSrpgInputtable = function() {
    return this.isSrpgActorUnit(true) && !this.isSrpgAutoBattle();
  };
  
  // イベントが水上移動可能状態かどうかを返す
  Game_Event.prototype.isShip = function() {
    return this.srpgBattler().srpgFlag('shipMove');
  };
  
  // イベントが浮遊移動状態かどうかを返す
  Game_Event.prototype.isFloat = function() {
    return this.srpgBattler().srpgFlag('floatMove');
  };
  
  // イベントの移動力を返す
  Game_Event.prototype.mov = function() {
    return Math.max(this.srpgBattler().srpgParam('mov'), 0);
  };
  
  // イベントの索敵距離を返す
  Game_Event.prototype.search = function() {
    return this.srpgBattler().srpgParam('search');
  };

  // イベントが裏切り者かどうかを返す
  Game_Event.prototype.isTraitor = function() {
    return this.event().meta.traitor;
  };
  
  // イベントが移動可能かどうかを返す
  Game_Event.prototype.canSrpgMove = function() {
    return !this._moved && this.mov() > 0;
  };
  
  // イベントの移動を終了する
  Game_Event.prototype.endSrpgMove = function() {
    this._moved = true;
  };
  
  // イベントが行動可能かどうかを返す
  Game_Event.prototype.canSrpgAct = function() {
    return !this._acted && this.srpgBattler().canMove();
  };
  
  // イベントの行動を終了する
  Game_Event.prototype.endSrpgAction = function() {
    this._acted = true;
    this.clearLastPosition();     // 移動前の座標情報をクリア
  };
  
  // イベントのターン開始処理
  Game_Event.prototype.onSrpgTurnStart = function() {
    var battler = this.srpgBattler();
    battler.onTurnEnd();
    this.srpgCheckDead();
    this._moved = false;
    this._acted = false;
  };
  
  // イベントの待機処理
  Game_Event.prototype.executeSrpgWaiting = function(x, y) {
    this.turnTowardXy(x, y);
    this._moved = true;     // 移動済みフラグを立てる
    this.endSrpgAction();   // 行動を終了する
  };

  // イベントの索敵距離内に敵対ユニットがいるかどうかを返す
  Game_Event.prototype.checkSearch = function() {
    var search = this.search();
    if (search === 0 || this.srpgBattler().isConfused() ||
        this.srpgDestination()) return true;
    var area = $gameMap.createArea(this.x, this.y, ['diamond', search, 'rect', 0]);
    var events = $gameMap.srpgUnitsArea(area, true);
    var flag = this.isSrpgActorUnit();
    return events.some(function(event) {
      return event.isSrpgActorUnit() !== flag || event.isTraitor();
    });
  };

  // 目的地を設定する
  Game_Event.prototype.setSrpgDestination = function(x, y) {
    this._srpgDestination = new Point(x, y);
  };

  // 目的地の設定を解除する
  Game_Event.prototype.clearSrpgDestination = function() {
    this._srpgDestination = null;
  };

  // 目的地を返す
  Game_Event.prototype.srpgDestination = function() {
    return this._srpgDestination;
  };
  
  // 文字列から移動ルートを生成して移動する
  Game_Event.prototype.moveRouteText = function(routeText) {
    var gc = Game_Character;
    var moveRoute = {list:[], repeat:false, skippable:false, wait:true};
    moveRoute.list.push({code:gc.ROUTE_THROUGH_ON, parameters:[]});
    moveRoute.list.push({code:gc.ROUTE_CHANGE_SPEED, parameters:[5]});
    while (routeText.length > 0) {
      moveRoute.list.push({code:+routeText.slice(0, 1), parameters:[]});
      routeText = routeText.slice(1);
    }
    moveRoute.list.push({code:gc.ROUTE_THROUGH_OFF, parameters:[]});
    moveRoute.list.push({code:gc.ROUTE_CHANGE_SPEED, parameters:[3]});
    moveRoute.list.push({code:gc.ROUTE_END, parameters:[]});
    this.forceMoveRoute(moveRoute);
    this._lastPosition = {x:this._x, y:this._y, direction:this.direction()};
    this._moved = true;     // 移動済みフラグを立てる
  };
  
  // 移動キャンセル
  Game_Event.prototype.backToLastPosition = function() {
    this.refreshRegionEffect(this._x, this._y, this._lastPosition.x, this._lastPosition.y);
    this.locate(this._lastPosition.x, this._lastPosition.y);
    this.setDirection(this._lastPosition.direction);
    this.clearLastPosition();     // 移動前の座標情報をクリア
    this._moved = false;
  };
  
  // 移動前の座標情報をクリア
  Game_Event.prototype.clearLastPosition = function() {
    this._lastPosition = null;
  };
  
  // 移動前の座標情報が有効かどうかを返す
  Game_Event.prototype.isLastPositionValid = function() {
    return !!this._lastPosition;
  };

  // 地形効果のリフレッシュ
  Game_Event.prototype.refreshRegionEffect = function(lastX, lastY, newX, newY) {
    var battler = this.srpgBattler();
    var lastStateId = regionEffects[$gameMap.regionId(lastX, lastY)];
    var newStateId = regionEffects[$gameMap.regionId(newX, newY)];
    battler.clearResult();
    if (lastStateId !== newStateId && lastStateId) battler.removeState(lastStateId);
    if (newStateId) battler.addState(newStateId);
  };
  
  // 指定した行動を評価して最も効果の高い座標を返す
  Game_Event.prototype.srpgEvaluateAction = function(action) {
    var skill = action.item();
    if (!skill) return null;
    var result = null, maxValue = 0, cache = {};
    var targets = $gameMap.srpgActionEffectiveUnits(this, action);
    var rangeArea = $gameMap.createRangeArea(this.x, this.y, skill);
    for (var prop in rangeArea) {
      var sum = 0;
      var pos = prop.split(',').map(Number);
      var effectArea = $gameMap.createEffectArea(pos[0], pos[1], skill);
      for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var key = '' + target.x + ',' + target.y;
        if (effectArea[key]) {
          if (!cache[key]) {
            var battler = target.srpgBattler();
            cache[key] = action.srpgEvaluateWithTarget(battler);
            if (action.hasItemAnyValidEffects(battler)) cache[key] += 0.5;
          }
          sum += cache[key];
        }
      }
      if (sum > maxValue) {
        maxValue = sum;
        result = new Point(pos[0], pos[1]);
      }
    }
    return result;
  };
  
  // 行動のアニメーションを表示
  Game_Event.prototype.showSrpgActionAnimation = function() {
    var subject = this.srpgBattler();
    var targets = $gameMap.srpgUnitsArea(null, true);
    var action = subject.currentAction();
    var item = action.item();
    var animationId = subject.srpgActionAnimationId(item);
    subject.useItem(item);      // コストの支払い
    for (var i = 0; i < targets.length; i++) {
      targets[i].requestAnimation(animationId);
    }
  };

  // 反撃のアニメーションを表示
  Game_Event.prototype.showSrpgCounterAnimation = function() {
    var subject = this.srpgBattler();
    var target = $gameMap.event(Math.abs($gameTemp.srpgNextUnitId()));
    var skill = $dataSkills[subject.attackSkillId()];
    var animationId = subject.srpgActionAnimationId(skill);
    this.turnTowardCharacter(target);       // 最初の行動者がいる方向を向く
    target.requestAnimation(animationId);   // アニメーションの表示
  };
  
  // 行動の実行
  Game_Event.prototype.executeSrpgAction = function() {
    $gameTemp.setSrpgNextUnitId(-this.eventId());
    var subject = this.srpgBattler();
    var action = subject.currentAction();
    var checkFlag = action.isSkill() && action.item().id === checkSkillId;
    var targets = $gameMap.srpgUnitsArea(null, true);
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].srpgCheckReflection(action)) targets[i] = this;
      action.srpgApply(targets[i].srpgBattler());
      targets[i].reserveDamagePopup(i * damagePopupInterval);
      targets[i].srpgCheckDead();
      targets[i].srpgCheckCounter(action, this);
      if (checkFlag) targets[i].start();
    }
    this.endSrpgAction();
    subject.onAllActionsEnd();
    return targets.length * damagePopupInterval;
  };

  // 反撃の実行
  Game_Event.prototype.executeSrpgCounter = function() {
    var target = $gameMap.event(Math.abs($gameTemp.srpgNextUnitId()));
    var battler = target.srpgBattler();
    if (battler.isDead()) return 0; // 最初の行動者が戦闘不能なら反撃しない
    var action = new Game_Action(this.srpgBattler());
    action.setAttack();
    action.srpgApply(battler);
    target.reserveDamagePopup(0);
    target.srpgCheckDead();
    return damagePopupInterval;
  };

  // 戦闘不能チェック
  Game_Event.prototype.srpgCheckDead = function() {
    if (this.srpgBattler().isDead()) {
      $gameTemp.setSrpgDeadUnitId(this._eventId);
    }
  };

  // 反撃チェック
  Game_Event.prototype.srpgCheckCounter = function(action, attacker) {
    var battler = this.srpgBattler();
    if (Math.random() < action.itemCnt(battler)) {
      var skill = $dataSkills[battler.attackSkillId()];
      var area = $gameMap.createRangeArea(this.x, this.y, skill);
      if (area['' + attacker.x + ',' + attacker.y]) {
        $gameTemp.setSrpgCounterUnitId(this._eventId);
      }
    }
  };

  // 魔法反射チェック
  Game_Event.prototype.srpgCheckReflection = function(action) {
    var battler = this.srpgBattler();
    if (Math.random() < action.itemMrf(battler)) {
      this.requestAnimation(reflectAnimationId);  // 魔法反射アニメーションの再生
      return true;
    }
    return false;
  };
  
  // ダメージポップアップの予約
  Game_Event.prototype.reserveDamagePopup = function(delay) {
    this._damagePopupDelay = delay;
    this._damagePopupResult = JSON.parse(JSON.stringify(this.srpgBattler().result()));
  };
  
  // ダメージポップアップが予約されているかを返す
  Game_Event.prototype.isDamagePopupReserved = function() {
    return this._damagePopupDelay !== undefined;
  };

  // フレーム更新
  var _Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function() {
    _Game_Event_update.call(this);
    this.updateDamagePopup();
  };
  
  // ダメージポップアップの更新
  Game_Event.prototype.updateDamagePopup = function() {
    if (this.isDamagePopupReserved()) {
      this._damagePopupDelay--;
      if (this._damagePopupDelay <= 0) {
        this.pasteDamagePopupResult();
        var battler = this.srpgBattler();
        battler.startDamagePopup();
        var result = battler.result();
        if (result.missed) {
          SoundManager.playMiss();
        } else if (result.evaded) {
          SoundManager.playEvasion();
        } else if (result.hpAffected) {
          if (result.hpDamage > 0) {
            if (battler.isActor()) {
              SoundManager.playActorDamage();
            } else {
              SoundManager.playEnemyDamage();
            }
          } else if (result.hpDamage < 0) {
            SoundManager.playRecovery();
          }
        }
        this._damagePopupDelay = undefined;
      }
    }
  };

  Game_Event.prototype.pasteDamagePopupResult = function() {
    var result = this.srpgBattler().result();
    result.missed = this._damagePopupResult.missed;
    result.evaded = this._damagePopupResult.evaded;
    result.hpAffected = this._damagePopupResult.hpAffected;
    result.hpDamage = this._damagePopupResult.hpDamage;
    result.mpDamage = this._damagePopupResult.mpDamage;
    result.critical = this._damagePopupResult.critical;
    this._damagePopupResult = null;
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    var a = this.convertArgs(args);
    if (command === 'reserveSrpg') {
      $gameMap.reserveSrpgStart();
    } else if (command === 'srpgCursorMove') {
      $gamePlayer.setSrpgCameraXy(+a[0], +a[1]);
    } else if (command === 'srpgCursorMoveToEvent') {
      var event = $gameMap.event(+a[0]);
      if (event) $gamePlayer.setSrpgCameraEvent(event);
    } else if (command === 'setSrpgDestination') {
      var event = $gameMap.event(+a[0]);
      if (event) event.setSrpgDestination(+a[1], +a[2]);
    } else if (command === 'clearSrpgDestination') {
      var event = $gameMap.event(+a[0]);
      if (event) event.clearSrpgDestination();
    }
  };

  Game_Interpreter.prototype.convertArgs = function(args) {
    var window = $gameTemp.srpgDummyWindow();
    return args.map(window.convertEscapeCharacters, window);
  };
  
  Game_Interpreter.prototype.isSrpgTurnStart = function() {
    return $gameTemp.isSrpgTurnStart();
  };
  
  Game_Interpreter.prototype.isSrpgActorTurn = function() {
    return $gameMap.isSrpgActorTurn();
  };
  
  Game_Interpreter.prototype.srpgNextUnit = function() {
    var id = $gameTemp.srpgNextUnitId();
    return id > 0 ? id : 0;
  };

  Game_Interpreter.prototype.srpgLastUnit = function() {
    var id = $gameTemp.srpgNextUnitId();
    return id < 0 ? 0 - id : 0;
  };

  Game_Interpreter.prototype.srpgBattler = function(eventId) {
    if (eventId == null) eventId = Math.abs($gameTemp.srpgNextUnitId());
    var event = this.character(eventId);
    return event && event.isSrpgUnit() ? event.srpgBattler() : null;
  };

  Game_Interpreter.prototype.srpgRemoveUnit = function(eventId) {
    var event = $gameMap.event(eventId);
    if (event && event.isSrpgUnit(true)) {
      var battler = event.srpgBattler();
      battler.addState(battler.deathStateId());
      $gameTemp.setSrpgDeadUnitId(eventId);
      return true;
    }
    return false;
  };

  Game_Interpreter.prototype.srpgAddUnit = function(eventId, enemyId) {
    var event = $gameMap.event(eventId);
    if (event && !event.isSrpgUnit()) {
      if ($gameMap.srpgUnitXy(event.x, event.y)) {
        var pos = $gameMap.srpgBlankPosition(event);
        if (pos == null) return false;
        event.locate(pos.x, pos.y);
      }
      event.setupSrpgBattler(enemyId);
      $gameMap.updateSrpgEnemyLetter();
      $gameMap.updateActorUnitNums();
      $gameMap.updateEnemyUnitNums();
    }
    return true;
  };

  Game_Interpreter.prototype.srpgActorEventId = function(actorId) {
    var actor = $gameActors.actor(actorId);
    var event = actor.srpgEvent();
    if (event && event.isSrpgUnit(true) && event.srpgBattler() === actor) {
      return actor.srpgEventId();
    }
    return 0;
  };
  
  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  // メンバ変数の初期化
  var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.call(this);
    this._damages = [];
  };

  // フレーム更新
  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateDamagePopup();
    if (useUnitHpGauge) this.updateHpGauge();
    if (useUnitStateIcon) this.updateStateIcon();
  };

  // ダメージポップアップの更新
  Sprite_Character.prototype.updateDamagePopup = function() {
    if (this._character.isSrpgUnit()) {
      this.setupDamagePopup();
    }
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; i++) {
        var damage = this._damages[i];
        damage.update();
        damage.x = this.x;
        damage.y = this.y;
      }
      if (!this._damages[0].isPlaying()) {
        this.parent.removeChild(this._damages[0]);
        this._damages.shift();
      }
    }
  };

  // ダメージポップアップのセット
  Sprite_Character.prototype.setupDamagePopup = function() {
    var battler = this._character.srpgBattler();
    if (battler.isDamagePopupRequested()) {
      var sprite = new Sprite_Damage();
      sprite.x = this.x;
      sprite.y = this.y;
      sprite.z = this.z + 1;
      sprite.setup(battler);
      this._damages.push(sprite);
      this.parent.addChild(sprite);
      battler.clearDamagePopup();
    }
  };

  // HPゲージの更新
  Sprite_Character.prototype.updateHpGauge = function() {
    if (this._character.isSrpgUnit()) {
      if (!this._srpgHpGaugeSprite) {
        this._srpgHpGaugeSprite = new Sprite_SrpgHpGauge(this._character);
        this._srpgHpGaugeSprite.y = -2;
        this.addChild(this._srpgHpGaugeSprite);
      }
    }
  };

  // ステートアイコンの更新
  Sprite_Character.prototype.updateStateIcon = function() {
    if (this._character.isSrpgUnit()) {
      if (!this._srpgStateIconSprite) {
        this._srpgStateIconSprite = new Sprite_StateIcon();
        this._srpgStateIconSprite.setup(this._character.srpgBattler());
        this._srpgStateIconSprite.y = -40;
        this._srpgStateIconSprite.z = 9;
        this._srpgStateIconSprite.scale.x = 0.5;
        this._srpgStateIconSprite.scale.y = 0.5;
        this.addChild(this._srpgStateIconSprite);
      }
    }
  };

  // HPゲージとステートアイコンのbushDepth対応
  var _Sprite_Character_createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
  Sprite_Character.prototype.createHalfBodySprites = function() {
    var flag = !this._upperBody;
    _Sprite_Character_createHalfBodySprites.call(this);
    if (flag) {
      if (this._srpgHpGaugeSprite) this.addChild(this.removeChild(this._srpgHpGaugeSprite));
      if (this._srpgStateIconSprite) this.addChild(this.removeChild(this._srpgStateIconSprite));
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_SrpgHpGauge
  //

  function Sprite_SrpgHpGauge() {
    this.initialize.apply(this, arguments);
  }

  Sprite_SrpgHpGauge.prototype = Object.create(Sprite.prototype);
  Sprite_SrpgHpGauge.prototype.constructor = Sprite_SrpgHpGauge;

  Sprite_SrpgHpGauge.prototype.initialize = function(character) {
    this._battler = character.srpgBattler();
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(32, 4);
    this.z = 9;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
  };

  Sprite_SrpgHpGauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._hp !== this._battler.hp || this._mhp !== this._battler.mhp) {
      this._hp = this._battler.hp;
      this._mhp = this._battler.mhp;
      this.refresh();
    }
  };

  Sprite_SrpgHpGauge.prototype.refresh = function() {
    this.bitmap.clear();
    if (this._hp === 0) return;
    this.bitmap.fillRect(0, 0, 32, 4, '#000000');
    var w = Math.floor(this._hp / this._mhp * 30);
    this.bitmap.fillRect(1, 1, w, 2, this._hp === this._mhp ? '#fff060' : '#ffa030');
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable
  //

  Window_Selectable.prototype.activeOpen = function() {
    this.open();
    this.activate();
  };

  //-----------------------------------------------------------------------------
  // Window_Status
  //

  Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
      var paramId = i + 2;
      var y2 = y + lineHeight * i;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramId), 6, y2, 120);
      this.resetTextColor();
      this.drawText(this._actor.param(paramId), 126, y2, 60, 'right');
    }
    this.drawText(this._actor.srpgParam('mov'), 350, y, 60, 'right');
    this.changeTextColor(this.systemColor());
    this.drawText(moveParam, 230, y, 120);
  };

  var _Window_Status_drawExpInfo = Window_Status.prototype.drawExpInfo;
  Window_Status.prototype.drawExpInfo = function(x, y) {
    if (this._actor.isActor()) _Window_Status_drawExpInfo.call(this, x, y);
  };

  //-----------------------------------------------------------------------------
  // Window_SrpgCommand
  //
  
  function Window_SrpgCommand() {
    this.initialize.apply(this, arguments);
  }

  Window_SrpgCommand.prototype = Object.create(Window_Command.prototype);
  Window_SrpgCommand.prototype.constructor = Window_SrpgCommand;

  Window_SrpgCommand.prototype.initialize = function() {
    this.clearCommandList();
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.openness = 0;
    this.deactivate();
  };

  Window_SrpgCommand._lastCommandSymbol = null;

  Window_SrpgCommand.prototype.lineHeight = function() {
    return srpgCommandLineHeight;
  };

  Window_SrpgCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
  };

  Window_SrpgCommand.prototype.windowWidth = function() {
    return 240;
  };

  Window_SrpgCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
  };

  Window_SrpgCommand.prototype.makeCommandList = function() {
    this.setHandler('cancel', this._handlers['cancelOrigin']);
    if (this._srpgUnit.isSrpgInputtable()) {
      var canMove = this._srpgUnit.canSrpgMove();
      var canAct  = this._srpgUnit.canSrpgAct();
      if (canMove) {
        this.addCommand(moveCommand, 'move', true);
      } else {
        var enabled = this._srpgUnit.isLastPositionValid();
        this.addCommand(moveCancelCommand, 'moveCancel', enabled);
      }
      this.addCommand(actionCommand, 'action', canAct);
      if (itemCommand) this.addCommand(itemCommand, 'item', canAct);
      if (equipCommand) this.addCommand(equipCommand, 'equip', canAct);
      if (waitingCommand) {
        var enabled = this._srpgUnit.isLastPositionValid() || canMove || canAct;
        this.addCommand(waitingCommand, 'waiting', enabled);
      }
    }
    if (statusCommand) this.addCommand(statusCommand, 'status', true);
    this.move(srpgCommandX, srpgCommandY, this.windowWidth(), this.windowHeight());
  };

  Window_SrpgCommand.prototype.makeMenuCommandList = function() {
    this.setHandler('cancel', this._handlers['cancelOrigin']);
    this.addCommand(turnEndCommand, 'turnEnd', true);
    if (unitListCommand) this.addCommand(unitListCommand, 'unitList', true);
    if (infoCommand) this.addCommand(infoCommand, 'info', true);
    if (optionsCommand) this.addCommand(optionsCommand, 'options', true);
    if (saveCommand) this.addCommand(saveCommand, 'save', true);
    if (loadCommand) this.addCommand(loadCommand, 'load', true);
    if (gameEndCommand) this.addCommand(gameEndCommand, 'gameEnd', true);
    this.move(srpgCommandX, srpgCommandY, this.windowWidth(), this.windowHeight());
  };

  Window_SrpgCommand.prototype.makeYesNoCommandList = function() {
    this.setHandler('cancel', this._handlers['noCommand']);
    this.addCommand(yesCommand, 'yesCommand', true);
    this.addCommand(noCommand, 'noCommand', true);
    var width = this.windowWidth();
    this.move((Graphics.boxWidth - width) / 2, 0, width, this.windowHeight());
  };
  
  Window_SrpgCommand.prototype.processOk = function() {
    Window_SrpgCommand._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
  };

  Window_SrpgCommand.prototype.selectLast = function() {
    this.selectSymbol(Window_SrpgCommand._lastCommandSymbol);
  };
  
  Window_SrpgCommand.prototype.setSrpgUnit = function(srpgUnit) {
    this._srpgUnit = srpgUnit;
    this.refresh();
    this.activeOpen();
  };
  
  Window_SrpgCommand.prototype.refreshMenu = function() {
    this.clearCommandList();
    this.makeMenuCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
    this.activeOpen();
  };

  Window_SrpgCommand.prototype.refreshYesNo = function(y) {
    this.clearCommandList();
    this.makeYesNoCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
    this.select(0);
    this.activeOpen();
    this.y = y;
  };
  
  //-----------------------------------------------------------------------------
  // Window_SrpgStatus
  //

  function Window_SrpgStatus() {
    this.initialize.apply(this, arguments);
  }

  Window_SrpgStatus.prototype = Object.create(Window_Base.prototype);
  Window_SrpgStatus.prototype.constructor = Window_SrpgStatus;

  Window_SrpgStatus.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(4);
    var y = Graphics.boxHeight - height;
    Window_Base.prototype.initialize.call(this, 0, y, width, height);
    this.setBackgroundType(srpgStatusBackground);
    this.openness = 0;
    this.createFaceSprites();
    this.createArrowSprite();
  };

  Window_SrpgStatus.prototype.createFaceSprites = function() {
    var faceWidth = Window_Base._faceWidth;
    this._userFaceSprite = new Sprite();
    this._userFaceSprite.anchor.x = 0.5;
    this._userFaceSprite.x = this.standardPadding() + faceWidth / 2;
    this._userFaceSprite.y = this.standardPadding();
    if (srpgStatusFaceMirror === 'left') {
      this._userFaceSprite.scale.x = -1.0;
    }
    this.addChildAt(this._userFaceSprite, 2);
    this._targetFaceSprite = new Sprite();
    this._targetFaceSprite.anchor.x = 0.5;
    this._targetFaceSprite.x = this.width - faceWidth / 2 - this.standardPadding();
    this._targetFaceSprite.y = this.standardPadding();
    if (srpgStatusFaceMirror === 'right') {
      this._targetFaceSprite.scale.x = -1.0;
    }
    this.addChildAt(this._targetFaceSprite, 2);
  };
  
  Window_SrpgStatus.prototype.createArrowSprite = function() {
    this._arrowSprite = new Sprite();
    this._arrowSprite.anchor.x = 0.5;
    this._arrowSprite.anchor.y = 0.5;
    this._arrowSprite.x = this.width / 2;
    this._arrowSprite.y = this.height / 2 + this.lineHeight() / 2;
    this._arrowSprite.bitmap = ImageManager.loadSystem(srpgStatusArrowImage);
    this.addChild(this._arrowSprite);
  };
  
  Window_SrpgStatus.prototype.setSrpgUnit = function(user) {
    if (user) {
      this.open();
    } else {
      this.close();
    }
    if (this._user === user && this._target == null) return;
    this._user = user;
    this._target = null;
    this.refresh();
  };
  
  Window_SrpgStatus.prototype.setAction = function(actionObject, target) {
    this._actionObject = actionObject;
    this._target = target;
    var userBattler = this._user.srpgBattler();
    userBattler.clearActions();
    var action = new Game_Action(userBattler);
    action.setItemObject(this._actionObject);
    userBattler.setAction(0, action);
    this.refresh();
  };
  
  Window_SrpgStatus.prototype.user = function() {
    return this._user;
  };
  
  Window_SrpgStatus.prototype.target = function() {
    return this._target;
  };
  
  var _Window_SrpgStatus_update = Window_SrpgStatus.prototype.update;
  Window_SrpgStatus.prototype.update = function() {
    _Window_SrpgStatus_update.call(this);
    this._userFaceSprite.opacity   = this.contentsOpacity;
    this._targetFaceSprite.opacity = this.contentsOpacity;
    this.updateArrowSprite();
  };
  
  // 矢印スプライトの更新
  Window_SrpgStatus.prototype.updateArrowSprite = function() {
    if (this._arrowSprite.visible) {
      var n = Graphics.frameCount % 30;
      var shiftX = Math.sin(Math.PI * 2 * n / 60) * 36 - 18;
      this._arrowSprite.x = this.width / 2 + shiftX;
    }
  };
  
  Window_SrpgStatus.prototype.refresh = function() {
    this.contents.clear();
    if (!this._user) return;
    var userBattler = this._user.srpgBattler();
    var lineHeight = this.lineHeight();
    var x = this.textPadding();
    var w = this.textWidth(TextManager.levelA);
    this.setFaceSprite(userBattler, this._userFaceSprite);
    this.drawActorIcons(userBattler, 0, lineHeight * 3);
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, lineHeight, w);
    this.resetTextColor();
    this.drawText(userBattler.name(), x, 0, srpgStatusNameWidth);
    this.drawText(userBattler.level, x + w, lineHeight, 36, 'right');
    this.drawActorGauges(userBattler, Window_Base._faceWidth, lineHeight * 2);
    if (this._target) {
      this.refreshTarget();
      this.refreshAction();
      this._targetFaceSprite.visible = true;
      this._arrowSprite.visible = true;
    } else {
      this.refreshStatus(userBattler);
      this._targetFaceSprite.visible = false;
      this._arrowSprite.visible = false;
    }
  };
  
  Window_SrpgStatus.prototype.refreshTarget = function() {
    var targetBattler = this._target.srpgBattler();
    var lineHeight = this.lineHeight();
    var faceWidth = Window_Base._faceWidth;
    var x = this.contents.width - faceWidth;
    var w = this.textWidth(TextManager.levelA);
    this.setFaceSprite(targetBattler, this._targetFaceSprite);
    this.drawActorIcons(targetBattler, x, lineHeight * 3);
    x = this.contents.width - this.textPadding();
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x - 36 - w, lineHeight, w);
    this.resetTextColor();
    this.drawText(targetBattler.name(), x - srpgStatusNameWidth, 0,
                  srpgStatusNameWidth, 'right');
    this.drawText(targetBattler.level, x - 36, lineHeight, 36, 'right');
    x = this.contents.width - faceWidth - srpgStatusHpWidth;
    this.drawActorGauges(targetBattler, x, lineHeight * 2);
  };
  
  Window_SrpgStatus.prototype.refreshAction = function() {
    var targetBattler = this._target.srpgBattler();
    var action = this._user.srpgBattler().currentAction();
    var faceWidth = Window_Base._faceWidth;
    var w = this.contents.width - faceWidth * 2;
    var lineHeight = this.lineHeight();
    this.drawText(action.item().name, faceWidth, 0, w, 'center');
    var damageText = this.makeDamageText(targetBattler, action);
    this.drawText(damageText, faceWidth, lineHeight * 1, w, 'center');
  };
  
  // 結果予測テキストを作成
  Window_SrpgStatus.prototype.makeDamageText = function(targetBattler, action) {
    if (action.isSkill() && action.item().id === checkSkillId) return '????(100%)';
    var result = '';
    var hit = action.itemHit(targetBattler);
    var eva = action.itemEva(targetBattler);
    var cnt = action.itemCnt(targetBattler);
    var mrf = action.itemMrf(targetBattler);
    hit = Math.floor((hit * (1 - eva)) * 100);
    if (action.checkDamageType([0])) {
      var effect = action.itemValidEffect(targetBattler);
      result = this.makeEffectText(targetBattler, effect, hit);
    } else {
      var damage = -action.srpgMakeDamageValue(targetBattler, true);
      if (action.isHpEffect()) {
        result = TextManager.hpA;
      } else if (action.isMpEffect()) {
        result = TextManager.mpA;
      }
      result += (damage >= 0 ? '+' : '') + damage + '(' + hit + '%)';
    }
    if (cnt > 0) result += ' / 反撃(' + Math.floor(cnt * 100) + '%)';
    if (mrf > 0) result += ' / 反射(' + Math.floor(mrf * 100) + '%)';
    return result;
  };
  
  // 結果予測テキストを作成
  Window_SrpgStatus.prototype.makeEffectText = function(targetBattler, effect, hit) {
    if (!effect) return '効果なし';
    switch (effect.code) {
    case Game_Action.EFFECT_RECOVER_HP:       // HP回復
      var n = targetBattler.mhp * effect.value1 + effect.value2;
      return TextManager.hpA + (n >= 0 ? '+' : '') + n;
    case Game_Action.EFFECT_RECOVER_MP:       // MP回復
      var n = targetBattler.mmp * effect.value1 + effect.value2;
      return TextManager.mpA + (n >= 0 ? '+' : '') + n;
    case Game_Action.EFFECT_GAIN_TP:          // TP増加
      return TextManager.tpA + (effect.value1 >= 0 ? '+' : '') + effect.value1;
    case Game_Action.EFFECT_ADD_STATE:        // ステート付加
      var stateId = effect.dataId;
      return $dataStates[stateId].name + '付加' + '(' + hit + '%)';
    case Game_Action.EFFECT_REMOVE_STATE:     // ステート解除
      var stateId = effect.dataId;
      return $dataStates[stateId].name + '解除' + '(' + hit + '%)';
    case Game_Action.EFFECT_ADD_BUFF:         // 強化
      var buffId = effect.dataId;
      return TextManager.param(buffId) + '強化' + effect.value1 + 'ターン' + '(' + hit + '%)';
    case Game_Action.EFFECT_ADD_DEBUFF:       // 弱体
      var buffId = effect.dataId;
      return TextManager.param(buffId) + '弱体' + effect.value1 + 'ターン' + '(' + hit + '%)';
    case Game_Action.EFFECT_REMOVE_BUFF:      // 強化解除
      var buffId = effect.dataId;
      return TextManager.param(buffId) + '強化解除' + '(' + hit + '%)';
    case Game_Action.EFFECT_REMOVE_DEBUFF:    // 弱体解除
      var buffId = effect.dataId;
      return TextManager.param(buffId) + '弱体解除' + '(' + hit + '%)';
    case Game_Action.EFFECT_LEARN_SKILL:      // スキル習得
      var skill = $dataSkills[effect.dataId];
      return skill.name + '習得';
    default:
      return '効果なし';
    }
  };

  Window_SrpgStatus.prototype.refreshStatus = function(userBattler) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
      var paramId = i + 2;
      var x = i % 2 * 224 + 360;
      var y = lineHeight * Math.floor(i / 2);
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramId), x, y, 120);
      this.resetTextColor();
      this.drawText(userBattler.param(paramId), x + 120, y, 60, 'right');
    }
    this.drawText(userBattler.srpgParam('mov'), 480, lineHeight * 3, 60, 'right');
    this.changeTextColor(this.systemColor());
    this.drawText(moveParam, 360, lineHeight * 3, 120);
  };
  
  Window_SrpgStatus.prototype.setFaceSprite = function(battler, sprite) {
    var faceName  = battler.faceName();
    var faceIndex = battler.faceIndex();
    var faceWidth = Window_Base._faceWidth;
    var faceHeight = Window_Base._faceHeight;
    sprite.bitmap = ImageManager.loadFace(faceName);
    sprite.setFrame(faceIndex % 4 * faceWidth, Math.floor(faceIndex / 4) * faceHeight,
                    faceWidth, faceHeight);
  };
  
  Window_SrpgStatus.prototype.drawActorGauges = function(actor, x, y) {
    this.drawActorHp(actor, x, y, srpgStatusHpWidth);
    y += this.lineHeight();
    if ($dataSystem.optDisplayTp) {
      var w = srpgStatusHpWidth / 2 - 4;
      this.drawActorMp(actor, x, y, w);
      this.drawActorTp(actor, x + w + 8, y, w);
    } else {
      this.drawActorMp(actor, x, y, srpgStatusHpWidth);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_SrpgSkillList
  //

  function Window_SrpgSkillList() {
    this.initialize.apply(this, arguments);
  }

  Window_SrpgSkillList.prototype = Object.create(Window_Selectable.prototype);
  Window_SrpgSkillList.prototype.constructor = Window_SrpgSkillList;

  Window_SrpgSkillList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.openness = 0;
    this._data = [];
  };

  Window_SrpgSkillList.prototype.setActor = function(actor, category) {
    this._actor = actor;
    this._category = category || 'skill';
    this.refresh();
    this.resetScroll();
  };

  Window_SrpgSkillList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_SrpgSkillList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
  };

  Window_SrpgSkillList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
  };

  Window_SrpgSkillList.prototype.includes = function(item) {
    return item;
  };

  Window_SrpgSkillList.prototype.isEnabled = function(item) {
    return this._actor && this._actor.canUse(item);
  };

  Window_SrpgSkillList.prototype.makeItemList = function() {
    if (this._actor) {
      if (this._category === 'skill') {
        this._data = this._actor.skills().filter(function(item) {
          return this.includes(item);
        }, this);
        this._data.unshift($dataSkills[this._actor.attackSkillId()]);
        if (checkSkillId) this._data.push($dataSkills[checkSkillId]);
        this._data.push($dataSkills[this._actor.guardSkillId()]);
      } else {
        this._data = $gameParty.items().filter(function(item) {
          return this._actor.canUse(item);
        }, this);
      }
    } else {
      this._data = [];
    }
  };

  Window_SrpgSkillList.prototype.selectLast = function() {
    var index = this._category === 'skill' ?
                this._data.indexOf(this._actor.lastBattleSkill()) :
                this._data.indexOf($gameParty.lastItem());
    this.select(index >= 0 ? index : 0);
  };

  Window_SrpgSkillList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill) {
      var rect = this.itemRect(index);
      rect.width -= this.textPadding();
      if (this._category === 'skill') {
        var costWidth = this.costWidth();
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawSkillCost(skill, rect.x, rect.y, rect.width);
      } else {
        var costWidth = this.numberWidth();
        this.changePaintOpacity(1);
        this.drawItemNumber(skill, rect.x, rect.y, rect.width);
      }
      this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
      this.changePaintOpacity(1);
    }
  };

  Window_SrpgSkillList.prototype.costWidth = function() {
    return this.textWidth('000');
  };

  Window_SrpgSkillList.prototype.numberWidth = function() {
    return this.textWidth('000');
  };

  Window_SrpgSkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
      this.changeTextColor(this.tpCostColor());
      this.drawText(this._actor.skillTpCost(skill), x, y, width, 'right');
    } else if (this._actor.skillMpCost(skill) > 0) {
      this.changeTextColor(this.mpCostColor());
      this.drawText(this._actor.skillMpCost(skill), x, y, width, 'right');
    }
  };

  Window_SrpgSkillList.prototype.drawItemNumber = function(item, x, y, width) {
    this.drawText(':', x, y, width - this.textWidth('00'), 'right');
    this.drawText($gameParty.numItems(item), x, y, width, 'right');
  };

  Window_SrpgSkillList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
  };

  Window_SrpgSkillList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
  };

//-----------------------------------------------------------------------------
// Window_SrpgUnitList
//

  function Window_SrpgUnitList() {
    this.initialize.apply(this, arguments);
  }

  Window_SrpgUnitList.prototype = Object.create(Window_Selectable.prototype);
  Window_SrpgUnitList.prototype.constructor = Window_SrpgUnitList;

  Window_SrpgUnitList.prototype.initialize = function(x, y) {
    Window_Selectable.prototype.initialize.call(this, x, y, srpgUnitListWidth,
                                                this.fittingHeight(srpgUnitListRows));
    this.openness = 0;
    this._data = [];
  };

  Window_SrpgUnitList.prototype.lineHeight = function() {
    return srpgCommandLineHeight;
  };

  Window_SrpgUnitList.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
  };

  Window_SrpgUnitList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
  };

  Window_SrpgUnitList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
  };

  Window_SrpgUnitList.prototype.makeItemList = function() {
    this._data = $gameMap.srpgActorUnits(true).concat($gameMap.srpgEnemyUnits(true));
  };

  Window_SrpgUnitList.prototype.selectLast = function() {
    var lastUnit = $gameMap.event($gameTemp.srpgLastUnitId());
    var lastIndex = this._data.indexOf(lastUnit);
    this.select(lastIndex >= 0 ? lastIndex : 0);
  };

  Window_SrpgUnitList.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    Window_Selectable.prototype.onTouch.call(this, triggered);
    if (this.index() !== lastIndex) this.changeUnit();
  };

  Window_SrpgUnitList.prototype.changeUnit = function() {
    var unit = this.item();
    if (unit) {
      $gameTemp.setSrpgLastUnitId(unit.eventId());
      $gamePlayer.setSrpgCameraEvent(unit);   // カメラ移動
      $gameMap.showMovableArea(unit);         // 移動可能範囲を表示する
      this._statusWindow.setSrpgUnit(unit);
    } else {
      $gameMap.hideSrpgArea();                // 範囲表示を隠す
      this._statusWindow.close();
    }
  };

  Window_SrpgUnitList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (!item) return;
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.drawText(item.srpgBattler().name(), rect.x, rect.y, rect.width);
  };

  Window_SrpgUnitList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
  };

  //-----------------------------------------------------------------------------
  // Window_SrpgInfo
  //

  function Window_SrpgInfo() {
    this.initialize.apply(this, arguments);
  }

  Window_SrpgInfo.prototype = Object.create(Window_Selectable.prototype);
  Window_SrpgInfo.prototype.constructor = Window_SrpgInfo;

  Window_SrpgInfo.prototype.initialize = function() {
    var ww = srpgInfoSize[0];
    var wh = srpgInfoSize[1];
    var wx = (Graphics.width - ww) / 2;
    var wy = (Graphics.height - wh) / 2;
    Window_Selectable.prototype.initialize.call(this, wx, wy, ww, wh);
    this.refresh();
    this.activate();
  };

  Window_SrpgInfo.prototype.refresh = function() {
    this.contents.clear();
    var re = /<srpgInfo>([\s\S]+)<\/srpgInfo>/g;
    var match = re.exec($dataMap.note);
    if (match) this.drawTextEx(match[1], this.textPadding(), 0);
  };

  //-----------------------------------------------------------------------------
  // Window_SrpgRegionEffect
  //

  function Window_SrpgRegionEffect() {
    this.initialize.apply(this, arguments);
  }

  Window_SrpgRegionEffect.prototype = Object.create(Window_Base.prototype);
  Window_SrpgRegionEffect.prototype.constructor = Window_SrpgRegionEffect;

  Window_SrpgRegionEffect.prototype.initialize = function(wy) {
    var ww = 200;
    var wh = this.fittingHeight(1);
    var wx = Graphics.width - ww;
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this._stateId = -1;
    this.update();
  };

  Window_SrpgRegionEffect.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!$gameMap.isSrpg()) {
      this.hide();
      return;
    }
    var stateId = regionEffects[$gamePlayer.regionId()] || 0;
    if (this._stateId !== stateId) {
      this._stateId = stateId;
      this.refresh();
      this.show();
    }
  };

  Window_SrpgRegionEffect.prototype.refresh = function() {
    var state = $dataStates[this._stateId];
    this.contents.clear();
    this.drawTextEx('\\C[16]\\}地形\\{\\C[0]', 0, 0)
    this.drawText(state ? state.name : 'なし', 44, 0, this.contents.Width - 48);
  };

  //-----------------------------------------------------------------------------
  // Scene_MenuBase
  //

  // SRPGが有効なとき、$gameParty.menuActor() ではなくユニットイベントのバトラーを参照する
  var _Scene_MenuBase_updateActor = Scene_MenuBase.prototype.updateActor;
  Scene_MenuBase.prototype.updateActor = function() {
    if ($gameMap.isSrpg() && $gameTemp.isSrpgCommandReserved()) {
      var event = $gameTemp.srpgCommandEvent();
      this._actor = event ? event.srpgBattler() : null;
    } else {
      _Scene_MenuBase_updateActor.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.call(this);
    this.createHelpWindow();
    this.createSrpgStatusWindow();
    this.createSrpgCommandWindow();
    this.createSrpgSkillWindow();
    this.createSrpgUnitWindow();
    if (useRegionEffectWindow) this.createSrpgRegionEffectWindow();
  };
  
  Scene_Map.prototype.createHelpWindow = function() {
    this._helpWindow = new Window_Help();
    this._helpWindow.openness = 0;
    this.addWindow(this._helpWindow);
  };

  Scene_Map.prototype.createSrpgCommandWindow = function() {
    this._srpgCommandWindow = new Window_SrpgCommand();
    this._srpgCommandWindow.setHandler('move', this.srpgCommandMove.bind(this));
    this._srpgCommandWindow.setHandler('moveCancel', this.srpgCommandMoveCancel.bind(this));
    this._srpgCommandWindow.setHandler('action', this.srpgCommandAction.bind(this));
    this._srpgCommandWindow.setHandler('item', this.srpgCommandItem.bind(this));
    this._srpgCommandWindow.setHandler('equip', this.srpgCommandEquip.bind(this));
    this._srpgCommandWindow.setHandler('waiting', this.srpgCommandWaiting.bind(this));
    this._srpgCommandWindow.setHandler('status', this.srpgCommandStatus.bind(this));
    this._srpgCommandWindow.setHandler('turnEnd', this.srpgCommandTurnEnd.bind(this));
    this._srpgCommandWindow.setHandler('unitList', this.srpgCommandUnitList.bind(this));
    this._srpgCommandWindow.setHandler('info', this.srpgCommandInfo.bind(this));
    this._srpgCommandWindow.setHandler('options', this.srpgCommandOptions.bind(this));
    this._srpgCommandWindow.setHandler('save', this.srpgCommandSave.bind(this));
    this._srpgCommandWindow.setHandler('load', this.srpgCommandLoad.bind(this));
    this._srpgCommandWindow.setHandler('gameEnd', this.srpgCommandGameEnd.bind(this));
    this._srpgCommandWindow.setHandler('cancelOrigin', this.cancelSrpgCommand.bind(this));
    this.addWindow(this._srpgCommandWindow);
    if ($gameTemp.isSrpgCommandReserved()) this.autoOpen();
  };
  
  // SRPGコマンドウィンドウの復元
  Scene_Map.prototype.autoOpen = function() {
    this.openSrpgCommand($gameTemp.srpgCommandEvent(), true);
    this._srpgCommandWindow.select($gameTemp.srpgCommandIndex());
    $gameTemp.clearSrpgCommand();
  };
  
  Scene_Map.prototype.createSrpgStatusWindow = function() {
    this._srpgStatusWindow = new Window_SrpgStatus();
    this.addWindow(this._srpgStatusWindow);
  };
  
  Scene_Map.prototype.createSrpgSkillWindow = function() {
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy - this._srpgStatusWindow.height;
    this._srpgSkillWindow = new Window_SrpgSkillList(0, wy, ww, wh);
    this._srpgSkillWindow.setHandler('ok', this.okSrpgSkill.bind(this));
    this._srpgSkillWindow.setHandler('cancel', this.cancelSrpgSkill.bind(this));
    this._srpgSkillWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._srpgSkillWindow);
  };
  
  Scene_Map.prototype.createSrpgUnitWindow = function() {
    var wx = srpgCommandX;
    var wy = srpgCommandY;
    this._srpgUnitWindow = new Window_SrpgUnitList(wx, wy);
    this._srpgUnitWindow.setHandler('ok', this.okSrpgUnit.bind(this));
    this._srpgUnitWindow.setHandler('cancel', this.cancelSrpgUnit.bind(this));
    this._srpgUnitWindow.setStatusWindow(this._srpgStatusWindow);
    this.addWindow(this._srpgUnitWindow);
  };
  
  // 地形効果ウィンドウの作成
  Scene_Map.prototype.createSrpgRegionEffectWindow = function() {
    var wy = this._helpWindow.fittingHeight(2);
    this._srpgRegionEffectWindow = new Window_SrpgRegionEffect(wy);
    this.addWindow(this._srpgRegionEffectWindow);
  };

  Scene_Map.prototype.setSrpgWait = function(waitType, waitCount) {
    this._srpgWaitType = waitType;
    this._srpgWaitCount = waitCount;
  };
  
  Scene_Map.prototype.clearSrpgWait = function() {
    this.setSrpgWait(null, 0);
  };
  
  var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
  Scene_Map.prototype.updateMain = function() {
    _Scene_Map_updateMain.call(this);
    if (!$gameMap.isSrpg() || $gameMap.isEventRunning()) return;
    if (!this.updateSrpgWait() && !this.updateSrpgDeadUnit() &&
        !this.updateSrpgCounterUnit() && !this.checkSrpgGameOver()) {
      if ($gameMap.isSrpgActorTurn()) {
        if (this._areaSelecterActive) {
          this.updateAreaSelecter();      // 範囲選択の更新
        } else if (this._srpgTurnState) {
          this.updateSrpgActorTurn();     // 味方ターンの更新
        } else if (!this._srpgCommandWindow.active && !this._srpgSkillWindow.active &&
                  !this._srpgUnitWindow.active) {
          this.updateSrpgInput();         // SRPG入力の更新
        }
      } else {
        this.updateSrpgEnemyTurn();       // 敵ターンの更新
      }
    }
  };
  
  // SRPGウェイトの更新
  Scene_Map.prototype.updateSrpgWait = function() {
    if (this._srpgWaitType === 'normal') {
      this._srpgWaitCount--;
      if (this._srpgWaitCount <= 0) this.clearSrpgWait();
    } else if (this._srpgWaitType === 'route') {
      if (!$gameMap.isSrpgUnitMoving()) this.clearSrpgWait();
    } else if (this._srpgWaitType === 'animation') {
      if (!$gameMap.isSrpgUnitAnimationPlaying()) this.clearSrpgWait();
    } else {
      return false;
    }
    return true;
  };

  // 戦闘不能ユニットの処理
  Scene_Map.prototype.updateSrpgDeadUnit = function() {
    var eventId = $gameTemp.srpgDeadUnitId();
    if (eventId > 0) {
      var event = $gameMap.event(eventId);
      event.srpgAutoStart('A');
      if (event.isSrpgActorUnit()) {
        var battler = event.srpgBattler();
        event.setImage(battler.characterName(), battler.characterIndex());
      }
      return true;
    }
    return false;
  };

  // 反撃ユニットの処理
  Scene_Map.prototype.updateSrpgCounterUnit = function() {
    if (this._counterUnit) {
      this.setSrpgWait('normal', this._counterUnit.executeSrpgCounter());
      this._counterUnit = null;
      return true;
    } else {
      var eventId = $gameTemp.srpgCounterUnitId();
      if (eventId > 0) {
        this._counterUnit = $gameMap.event(eventId);
        this._counterUnit.showSrpgCounterAnimation();
        this.setSrpgWait('animation');
        return true;
      }
    }
    return false;
  };

  // ゲームオーバー判定
  Scene_Map.prototype.checkSrpgGameOver = function() {
    if ($gameVariables.value(vnEnemyUnitNums) === 0) {
      $gameMap.srpgManagerEvent().srpgAutoStart('A');
      return true;
    } else if ($gameVariables.value(vnActorUnitNums) === 0) {
      $gameMap.srpgManagerEvent().srpgAutoStart('B');
      return true;
    }
    return false;
  };
  
  // 範囲選択の更新
  Scene_Map.prototype.updateAreaSelecter = function() {
    if (TouchInput.isTriggered()){
      var x = $gameMap.canvasToMapX(TouchInput.x);
      var y = $gameMap.canvasToMapY(TouchInput.y);
      if ($gameMap.isInsideArea(x, y)) this.callAreaOkHandler(x, y);
    } else if (TouchInput.isCancelled()) {
      this.callAreaCancelHandler();
    }
  };
  
  // 味方ターンの更新
  Scene_Map.prototype.updateSrpgActorTurn = function() {
    var event = this._srpgStatusWindow.user();
    switch (this._srpgTurnState) {
    case 3:   // 行動結果の反映
      $gameTemp.setSrpgTurnStart(false);
      this.setSrpgWait('normal', event.executeSrpgAction() + srpgBasicWait);
      this._srpgTurnState = 4;
      break;
    case 4:   // 行動後イベントの処理
      $gameMap.startSrpgManagerEvent();
      this._srpgTurnState = !event.canSrpgMove() ? 5 : 0;
      break;
    case 5:   // 行動後の待機選択
      this.srpgAutoWaiting(true);
      break;
    case 12:  // 移動結果の反映
      this._srpgStatusWindow.refresh();
      this.srpgAutoWaiting(!event.canSrpgAct());
      break;
    case 32:  // ターン開始待ち
      $gameMap.onSrpgTurnStart();
      var events = $gameMap.srpgUnits(true).filter(function(event) {
        return event.isSrpgAutoBattle();
      });
      this._actionEnemyUnits = $gameMap.sortEventsAgi(events);
      this._srpgTurnState = 31;
      break;
    }
  };

  Scene_Map.prototype.srpgAutoWaiting = function(flag) {
    this.openSrpgCommand(this._srpgStatusWindow.user(), !flag);
    if (flag) {
      this._srpgCommandWindow.deactivate();
      this.srpgCommandWaiting();
    }
    this._srpgTurnState = 0;
  };
  
  // SRPG入力の更新
  Scene_Map.prototype.updateSrpgInput = function() {
    if (TouchInput.isRepeated()){
      var x = $gameMap.canvasToMapX(TouchInput.x);
      var y = $gameMap.canvasToMapY(TouchInput.y);
      var event = $gameMap.srpgUnitXy(x, y, true);
      if (event && TouchInput.isTriggered()) {
        this._srpgTurnState = 0;
        this.openSrpgCommand(event, true);  // ユニットコマンドを開く
        SoundManager.playOk();              // 決定効果音を鳴らす
      }
      $gamePlayer.setSrpgCameraXy(x, y);    // カメラ移動
    } else if (TouchInput.isCancelled()) {
      this.openSrpgCommand(null);
      SoundManager.playOk();                // 決定効果音を鳴らす
    }
  };
  
  var _Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled;
  Scene_Map.prototype.isMenuEnabled = function() {
    // SRPG機能が有効になっている間は通常のメニューを禁止する
    return _Scene_Map_isMenuEnabled.call(this) && !$gameMap.isSrpg();
  };

  // SRPGコマンドウィンドウを開く
  Scene_Map.prototype.openSrpgCommand = function(event, showArea) {
    this._srpgStatusWindow.setSrpgUnit(event);
    if (event) {
      this._srpgCommandWindow.setSrpgUnit(event);
      if (showArea) {
        $gameMap.showMovableArea(event);
        this.setSimpleMoveInput(event);
      }
    } else {
      this._srpgCommandWindow.refreshMenu();
    }
    this._srpgCommandWindow.select(0);
  };

  // シンプル移動入力の準備
  Scene_Map.prototype.setSimpleMoveInput = function(event) {
    if (simpleMoveInput && event.isSrpgInputtable() && event.canSrpgMove()) {
      this.setAreaHandler(this.okAreaMove, this.cancelAreaMove);
    }
  };

  // SRPGヘルプウィンドウを開く
  Scene_Map.prototype.openSrpgHelp = function(text, lines) {
    this._helpWindow.setText(text);
    this._helpWindow.move(0, 0, Graphics.boxWidth, this._helpWindow.fittingHeight(lines));
    this._helpWindow.open();
  };

  // SRPGスキルウィンドウを開く
  Scene_Map.prototype.openSrpgSkill = function(category) {
    this.areaSelecterDeactivate(true);
    var event = this._srpgStatusWindow.user();
    this.openSrpgHelp('', 2);
    this._srpgCommandWindow.close();
    this._srpgSkillWindow.setActor(event.srpgBattler(), category);
    this._srpgSkillWindow.selectLast();
    this._srpgSkillWindow.activeOpen();
  };
  
  // SRPGコマンド【移動】
  Scene_Map.prototype.srpgCommandMove = function() {
    this.openSrpgHelp(moveHelp, 1);
    this._srpgCommandWindow.close();
    this.setAreaHandler(this.okAreaMove, this.cancelAreaMove);
  };

  // SRPGコマンド【移動キャンセル】
  Scene_Map.prototype.srpgCommandMoveCancel = function() {
    var event = this._srpgStatusWindow.user();
    event.backToLastPosition();               // 移動キャンセル実行
    $gamePlayer.setSrpgCameraEvent(event);    // カメラ移動
    SoundManager.playCancel();                // キャンセル効果音を鳴らす
    this._srpgStatusWindow.refresh();
    this.cancelSrpgCommand();
  };

  // SRPGコマンド【行動】
  Scene_Map.prototype.srpgCommandAction = function() {
    this.openSrpgSkill('skill');
  };

  // SRPGコマンド【アイテム】
  Scene_Map.prototype.srpgCommandItem = function() {
    this.openSrpgSkill('item');
  };
  
  // SRPGコマンド【装備変更】
  Scene_Map.prototype.srpgCommandEquip = function() {
    this.changeSceneCommand(Scene_Equip);
  };
  
  // SRPGコマンド【待機】
  Scene_Map.prototype.srpgCommandWaiting = function() {
    var event = this._srpgStatusWindow.user();
    $gameMap.showWaitingArea(event);
    this.openSrpgHelp(waitingHelp, 1);
    this._srpgCommandWindow.close();
    this.setAreaHandler(this.okAreaWaiting, this.cancelAreaWaiting);
  };
  
  // SRPGコマンド【ステータス】
  Scene_Map.prototype.srpgCommandStatus = function() {
    this.changeSceneCommand(Scene_Status);
  };
  
  // SRPGコマンド【ターン終了】
  Scene_Map.prototype.srpgCommandTurnEnd = function() {
    this.openSrpgHelp(turnEndHelp, 1);
    this._srpgCommandWindow.setHandler('yesCommand', this.srpgCommandTurnEndYes.bind(this));
    this._srpgCommandWindow.setHandler('noCommand', this.srpgCommandTurnEndNo.bind(this));
    this._srpgCommandWindow.refreshYesNo(this._helpWindow.height);
  };
  
  // SRPGコマンド【ユニットリスト】
  Scene_Map.prototype.srpgCommandUnitList = function() {
    this._srpgCommandWindow.close();
    this._srpgUnitWindow.refresh();
    this._srpgUnitWindow.selectLast();
    this._srpgUnitWindow.changeUnit();
    this._srpgUnitWindow.activeOpen();
  };
  
  // SRPGコマンド【マップ情報】
  Scene_Map.prototype.srpgCommandInfo = function() {
    this.changeSceneCommand(Scene_SrpgInfo);
  };
  
  // SRPGコマンド【オプション】
  Scene_Map.prototype.srpgCommandOptions = function() {
    this.changeSceneCommand(Scene_Options);
  };

  // SRPGコマンド【セーブ】
  Scene_Map.prototype.srpgCommandSave = function() {
    this.changeSceneCommand(Scene_Save);
  };

  // SRPGコマンド【ロード】
  Scene_Map.prototype.srpgCommandLoad = function() {
    this.changeSceneCommand(Scene_Load);
  };

  // SRPGコマンド【ゲーム終了】
  Scene_Map.prototype.srpgCommandGameEnd = function() {
    this.changeSceneCommand(Scene_GameEnd);
  };

  // SRPGコマンド【行動：はい】
  Scene_Map.prototype.srpgCommandActionYes = function() {
    var event = this._srpgStatusWindow.user();
    this.showSrpgActionAnimation(event);    // 行動アニメーションの表示
    this._helpWindow.close();
    this._srpgCommandWindow.close();
    this._srpgTurnState = 3;
  };
  
  // SRPGコマンド【行動：いいえ】
  Scene_Map.prototype.srpgCommandActionNo = function() {
    var event = this._srpgStatusWindow.user();
    var skill = this._srpgSkillWindow.item();
    this.openSrpgHelp(actionRangeHelp, 1);
    this.setAreaHandler(this.okAreaAction, this.cancelAreaAction);
    $gameMap.showRangeArea(event.x, event.y, skill);
    event.setDirection(this._lastUnitDirection);    // 向きを元に戻す
    $gamePlayer.setSrpgCameraEvent(event);          // カメラ移動
    this._srpgCommandWindow.close();
    this._srpgStatusWindow.setSrpgUnit(event);
  };
  
  // SRPGコマンド【ターン終了：はい】
  Scene_Map.prototype.srpgCommandTurnEndYes = function() {
    this._helpWindow.close();
    this._srpgCommandWindow.close();
    $gameTemp.clearSrpgNextUnitId();
    this._srpgTurnState = 32;
  };
  
  // SRPGコマンド【ターン終了：いいえ】
  Scene_Map.prototype.srpgCommandTurnEndNo = function() {
    this._helpWindow.close();
    this._srpgCommandWindow.refreshMenu();
    this._srpgCommandWindow.selectSymbol('turnEnd');
  };
  
  // SRPGコマンド【キャンセル】
  Scene_Map.prototype.cancelSrpgCommand = function() {
    this._srpgCommandWindow.close();
    this._srpgStatusWindow.close();
    this.areaSelecterDeactivate(true);
  };
  
  // コマンドによるシーン遷移
  Scene_Map.prototype.changeSceneCommand = function(nextScene) {
    var event = this._srpgStatusWindow.user();
    $gameTemp.reserveSrpgCommand(this._srpgCommandWindow.index(), event);   // コマンドウィンドウの復元予約
    this._srpgCommandWindow.hide();
    this._srpgStatusWindow.hide();
    if (this._srpgRegionEffectWindow) this._srpgRegionEffectWindow.hide();
    SceneManager.push(nextScene);
  };
  
  // SRPGスキルウィンドウ【決定】
  Scene_Map.prototype.okSrpgSkill = function() {
    var event = this._srpgStatusWindow.user();
    this.openSrpgHelp(actionRangeHelp, 1);
    this._srpgSkillWindow.close();
    this.setAreaHandler(this.okAreaAction, this.cancelAreaAction);
    $gameMap.showRangeArea(event.x, event.y, this._srpgSkillWindow.item());
  };
  
  // SRPGスキルウィンドウ【キャンセル】
  Scene_Map.prototype.cancelSrpgSkill = function() {
    var event = this._srpgStatusWindow.user();
    this._helpWindow.close();
    this._srpgSkillWindow.close();    
    this._srpgCommandWindow.setSrpgUnit(event);
    $gameMap.showMovableArea(event);
    this.setSimpleMoveInput(event);
  };
  
  // SRPGユニットウィンドウ【決定】
  Scene_Map.prototype.okSrpgUnit = function() {
    var event = this._srpgUnitWindow.item();
    this.openSrpgCommand(event, false);    // ユニットコマンドを開く
    this.setSimpleMoveInput(event);
    this._srpgUnitWindow.close();
  };
  
  // SRPGユニットウィンドウ【キャンセル】
  Scene_Map.prototype.cancelSrpgUnit = function() {
    $gameMap.hideSrpgArea();          // 範囲表示を隠す
    this._srpgUnitWindow.close();
    this._srpgStatusWindow.setSrpgUnit(null);
    this._srpgCommandWindow.activeOpen();
  };
  
  // 範囲選択の有効化
  Scene_Map.prototype.areaSelecterActivate = function() {
    this._areaSelecterActive = true;
  };
  
  // 範囲選択の無効化
  Scene_Map.prototype.areaSelecterDeactivate = function(hide) {
    this._areaSelecterActive = false;
    this._areaOkHandler = null;
    this._areaCancelHandler = null;
    if (hide) $gameMap.hideSrpgArea();
  };
  
  Scene_Map.prototype.setAreaHandler = function(okMethod, cancelMethod) {
    this._areaOkHandler = okMethod;
    this._areaCancelHandler = cancelMethod;
    this.areaSelecterActivate();
  };
  
  Scene_Map.prototype.callAreaOkHandler = function(x, y) {
    if (this._areaOkHandler) {
      this._areaOkHandler(x, y);
      SoundManager.playOk();        // 決定効果音を鳴らす
    }
  };
  
  Scene_Map.prototype.callAreaCancelHandler = function() {
    if (this._areaCancelHandler) {
      this._areaCancelHandler();
      SoundManager.playCancel();    // キャンセル効果音を鳴らす
    }
  };
  
  // 範囲選択の決定【移動】
  Scene_Map.prototype.okAreaMove = function(x, y) {
    var event = this._srpgStatusWindow.user();
    this.setSrpgMove(event, x, y);
    this._srpgCommandWindow.close();
    this._helpWindow.close();
    this.areaSelecterDeactivate(true);
    this._srpgTurnState = 12;
  };

  Scene_Map.prototype.setSrpgMove = function(event, x, y) {
    var routeText = $gameMap.srpgAreaXy(x, y);
    event.moveRouteText(routeText);         // 移動を実行
    event.refreshRegionEffect(event._x, event._y, x, y);  //地形効果をリフレッシュ
    $gamePlayer.setSrpgCameraXy(x, y);      // カメラ移動
    this.setSrpgWait('route');              // 移動完了までウェイト
  };
  
  // 範囲選択のキャンセル【移動】
  Scene_Map.prototype.cancelAreaMove = function() {
    this._srpgCommandWindow.activeOpen();
    this._helpWindow.close();
    if (!simpleMoveInput) this.areaSelecterDeactivate(false);
  };
  
  // 範囲選択の決定【待機】
  Scene_Map.prototype.okAreaWaiting = function(x, y) {
    this._srpgStatusWindow.user().executeSrpgWaiting(x, y);
    $gamePlayer.setSrpgCameraXy(x, y);      // カメラ移動
    this._helpWindow.close();
    this._srpgStatusWindow.close();
    this.areaSelecterDeactivate(true);
    if (this.isAllActorSrpgWaiting()) {
      this.srpgCommandTurnEnd();    // ターン終了へ移行
    }
  };

  // アクター全員が移動と行動を終えているかを返す
  Scene_Map.prototype.isAllActorSrpgWaiting = function() {
    return !$gameMap.srpgActorUnits(true).some(function(event) {
      return !event.isSrpgAutoBattle() &&
             (event.canSrpgMove() || event.canSrpgAct());
    });
  };

  // 範囲選択のキャンセル【待機】
  Scene_Map.prototype.cancelAreaWaiting = function() {
    var event = this._srpgStatusWindow.user();
    this._srpgCommandWindow.activeOpen();
    this._helpWindow.close();
    this.areaSelecterDeactivate(false);
    $gameMap.showMovableArea(event);
    this.setSimpleMoveInput(event);
  };
  
  // 範囲選択の決定【行動】
  Scene_Map.prototype.okAreaAction = function(x, y) {
    var event = this._srpgStatusWindow.user();
    $gameTemp.reserveSrpgCommand(this._srpgCommandWindow.index(), event);   // コマンドウィンドウの復元予約
    this.openSrpgHelp(actionEffectHelp, 1);
    this._srpgCommandWindow.setHandler('yesCommand', this.srpgCommandActionYes.bind(this));
    this._srpgCommandWindow.setHandler('noCommand', this.srpgCommandActionNo.bind(this));
    this._srpgCommandWindow.refreshYesNo(this._helpWindow.height);
    this.areaSelecterDeactivate(false);
    this._lastUnitDirection = event.direction();// 現在の向きを記憶
    this.setSrpgAction(event, this._srpgSkillWindow.item(), x, y);
  };

  Scene_Map.prototype.setSrpgAction = function(event, skill, x, y) {
    $gameMap.showEffectArea(x, y, skill);       // 効果範囲の表示
    event.turnTowardXy(x, y);                   // 実行先の座標を向く
    $gamePlayer.setSrpgCameraXy(x, y);          // カメラ移動
    var events = $gameMap.sortEventsDistance($gameMap.srpgUnitsArea(null, true), x, y);
    this._srpgStatusWindow.setAction(skill, events[0]);
  };
  
  // 範囲選択のキャンセル【行動】
  Scene_Map.prototype.cancelAreaAction = function() {
    this.openSrpgHelp('', 2);
    this._srpgSkillWindow.activeOpen();
    this.areaSelecterDeactivate(true);
  };
  
  // 行動アニメーションの表示
  Scene_Map.prototype.showSrpgActionAnimation = function(event) {
    $gameMap.hideSrpgArea();          // 範囲表示を隠す
    this._srpgStatusWindow.close();
    event.showSrpgActionAnimation();  // 行動アニメーションの表示
    this.setSrpgWait('animation');    // アニメーション完了までウェイト
  };
  
  // 次に行動するSRPGエネミーユニットをセット
  Scene_Map.prototype.setSrpgNextEnemyUnit = function() {
    if (this._actionEnemyUnits.length > 0) {
      var event = this._actionEnemyUnits.shift();
      var battler = event.srpgBattler();
      this._srpgTurnState = 31;
      if (event.isSrpgAutoBattle() && !battler.isDead()) {
        $gameTemp.setSrpgNextUnitId(event.eventId());
        $gamePlayer.setSrpgCameraEvent(event);      // カメラ移動
        this._srpgStatusWindow.setSrpgUnit(event);
        if (event.checkSearch()) {
          battler.srpgMakeActions();                // 行動を作成
          if (battler.numActions() > 0) this._srpgTurnState = 1;
        }
      }
    } else {
      $gameTemp.clearSrpgNextUnitId();
      this._srpgStatusWindow.setSrpgUnit(null);
      this._srpgTurnState = 32;                     // 敵ターン状態遷移
    }
  };

  // 敵ターンの更新
  Scene_Map.prototype.updateSrpgEnemyTurn = function() {
    var event = this._srpgStatusWindow.user();
    switch (this._srpgTurnState) {
    case 1:   // 移動前行動（準備）
      this._srpgTurnState = this.updateSrpgEnemyActionReady(event) ? 2 : 11;
      break;
    case 2:   // 移動前行動（アニメーション表示）
      this.showSrpgActionAnimation(event);
      this._srpgTurnState = 3;
      break;
    case 3:   // 移動前行動（行動結果の反映）
      this.setSrpgWait('normal', event.executeSrpgAction() + srpgBasicWait);
      this._srpgTurnState = 4;
      break;
    case 4:   // 移動前行動（行動後イベントの処理）
      $gameMap.startSrpgManagerEvent();
      this._srpgTurnState = 11;
      break;
    case 11:  // 移動（準備）
      this._srpgTurnState = this.updateSrpgEnemyMoveReady(event) ? 12 : 21;
      break;
    case 12:  // 移動（移動結果の反映）
      this.updateSrpgEnemyMove(event);
      this._srpgTurnState = 21;
      break;
    case 21:  // 移動後行動（準備）
      this._srpgTurnState = this.updateSrpgEnemyActionReady(event) ? 22 : 31;
      break;
    case 22:  // 移動後行動（アニメーション表示）
      this.showSrpgActionAnimation(event);
      this._srpgTurnState = 23;
      break;
    case 23:  // 移動後行動（行動結果の反映）
      this.setSrpgWait('normal', event.executeSrpgAction() + srpgBasicWait);
      this._srpgTurnState = 24;
      break;
    case 24:  // 移動後行動（行動後イベントの処理）
      $gameMap.startSrpgManagerEvent();
      this._srpgTurnState = 31;
      break;
    case 31:  // 次のユニットへ
      this.setSrpgNextEnemyUnit();
      $gameTemp.setSrpgTurnStart(false);
      $gameMap.startSrpgManagerEvent();
      break;
    case 32:  // ターン開始待ち
      $gameMap.onSrpgTurnStart();
      this._srpgTurnState = 0;
      break;
    }
  };
  
  // 敵の行動準備処理
  Scene_Map.prototype.updateSrpgEnemyActionReady = function(event) {
    if (!event.canSrpgAct()) return false;    // 行動不可なら終了
    var action = event.srpgBattler().currentAction();
    var targetPos = event.srpgEvaluateAction(action);
    if (targetPos) {    // 有効な実行先が見つかった
      this.setSrpgAction(event, action.item(), targetPos.x, targetPos.y);
      this.setSrpgWait('normal', srpgBasicWait);
      return true;
    }
    return false;
  };
  
  // 敵の移動準備処理
  Scene_Map.prototype.updateSrpgEnemyMoveReady = function(event) {
    if (event.srpgBattler().isDead()) return false;   // 反撃等で戦闘不能なら終了
    var destination = event.srpgDestination();
    if (destination) {
      // すでに目的地に到着していれば終了
      if (event.pos(destination.x, destination.y)) return false;
    } else {
      var action = event.srpgBattler().currentAction();
      var targets = action.isEscape() ? $gameMap.srpgOpponentUnitsEx(event, true) :
                                        $gameMap.srpgActionEffectiveUnits(event, action);
      this._moveTarget = $gameMap.sortEventsDistance(targets, event.x, event.y)[0];
      if (!this._moveTarget) return false;  // 対象がいなければ終了
    }
    $gameMap.showMovableArea(event);
    if ($gameMap.isSrpgAreaEmpty()) return false; // 移動できる座標がなければ終了
    this._srpgStatusWindow.setSrpgUnit(event);
    this.setSrpgWait('normal', srpgBasicWait);
    return true;
  };

  // 敵の移動処理
  Scene_Map.prototype.updateSrpgEnemyMove = function(event) {
    var escape = event.srpgBattler().currentAction().isEscape() || !event.canSrpgAct();
    var target = event.srpgDestination() || this._moveTarget;
    var targetPos = escape ? $gameMap.posInsideAreaFarXy(target.x, target.y) :
                             $gameMap.posInsideAreaNearXy(target.x, target.y);
    this.setSrpgMove(event, targetPos.x, targetPos.y);
    $gameMap.hideSrpgArea();        // 範囲表示を隠す
  };

  //-----------------------------------------------------------------------------
  // Scene_SrpgInfo
  //

  function Scene_SrpgInfo() {
    this.initialize.apply(this, arguments);
  }

  Scene_SrpgInfo.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_SrpgInfo.prototype.constructor = Scene_SrpgInfo;

  Scene_SrpgInfo.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_SrpgInfo.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._statusWindow = new Window_SrpgInfo();
    this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
    this.addWindow(this._statusWindow);
  };

})();
