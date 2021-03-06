#Released

##0.8
* Typescript 1.6.2 に対応
  * experimentalAsyncFunctions オプションに対応
  * jsx オプションに対応

##0.7
* Typescript 1.5.3 に対応
  * module の system と umd に対応
  * emitDecoratorMetadata オプションに対応
  * experimentalDecorators オプションに対応
  * newLine オプションに対応
  * inlineSourceMap オプションに対応
  * inlineSources オプションに対応
  * noEmitHelpers オプションに対応

##0.6.2
* コンパイルのコードファイルをtypescriptService.js から typescript.js に変更
* Typescript 1.5-beta に対応
  * dest でディレクトリを指定した際のディレクトリ階層の保持方法をtscと同じ動きに変更
  * 以前のディレクトリ階層の保持ができるように keepDirectoryHierarchy オプションを追加
  * basePath オプションをobsoluteに変更
  * rootDir オプションに対応
  * generateTsConfig オプションを追加

##0.6.1
* 不具合修正
  * 内部処理でScriptTargetが設定されていない場合に例外が発生することがある不具合？に初期値を設定しておくことで対応

## 0.6.0
* Typescript 1.4.1 に対応
  * preserveConstEnums オプションの追加
  * noEmitOnError オプションの追加と ignoreError オプションの obsolete 化
  * suppressImplicitAnyIndexErrors オプションの追加
  * target オプションに ES6 を追加
* comment オプションの削除
* コンパイルのコードファイルをコマンドライン用の tsc.js から typescriptService.js に変更

## 0.4.7 / 0.4.8
* watch の時に reference で指定されているファイルが更新されていても内容が反映されない不具合を修正

## 0.4.6
* taskにdescription を追加
  * grunt-jsmin-sourcemap と競合？して grunt が task を実行できていなかった挙動の修正

## 0.4.5
* README の option の記述を修正

## 0.4.4
* TypeScript 1.3.0 に対応

## 0.4.3
* 不具合の修正
  * 同じファイルが何回もemit実行されてしまうため "lib.d.ts を Emmit 時の対象外に変更" を取りやめ

## 0.4.2
* 不具合の修正
  * 例外を握りつぶしてしまっていたのを表示するように修正
* パフォーマンス対応
  * lib.d.ts を TypeCheck の対象外に変更
  * lib.d.ts を Emmit 時の対象外に変更
* grunt の --verbose に対応
* grunt の実行時に --showtsc オプションを付加することで処理内容と近い tsc コマンドを表示するように対応

## 0.4.1
* 不具合の修正
  * watch のコンパイル失敗時の次回コンパイル対象
* 参照するファイルを設定する references オプションを追加
  * lib.core.d.ts や lib.dom.d.ts の参照にも対応


## 0.4.0
* All rewrite
  全部書き直しを実施
* Support TypeScript version 1.1.0-1
  TypeScript の ver 1.1.0-1 で動作するように対応

## 0.3.7
* Added support to include the files that fail to file the next target of the compilation failure.
  watchのコンパイルが失敗した時に、次回のコンパイル対象に含めるように対応
* Fixed a bug that it had failed to check the update date and time in the file deletion.
  watchでファイル削除時に更新日時の取得に失敗していた不具合を修正

## 0.3.6
* Add support TypeScript version 1.0.0 and 1.0.1

## 0.3.5
* Added watch.atBegin option to run tasks when watcher starts
  watch.atBeginオプションを追加。watchが開始された時にコンパイルを実行します。
* Corresponding to delete files from the cache when a file is deleted
  ファイルが削除された時に、ファイルキャッシュからも削除してコンパイル対象にならないように対応

## 0.3.3 / 0.3.4
* Compilation with watch option is more fast.

## 0.3.1 / 0.3.2
* Added watch option

## 0.3.0
* Update to TypeScript `1.0.0`.
* Remove `base_path`, `sourcemap` and `nolib` options. (Changed to `basePath`, `sourceMap` and `noLib`)
* Remove `ignoreTypeCheck` option.
* **Breaking Changes**: `ignoreError:true` is now the default.
