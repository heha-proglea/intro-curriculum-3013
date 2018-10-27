'use strict';

// HTTPモジュールの読み込み
const http = require('http');

// モジュールhttpを用いて、サーバーを作成
const server = http.createServer((req, res) => {
    // サーバーにリクエストがあった時に呼び出されるコールバック関数

    // アクセスログを出力
    const now = new Date();
    console.info('[' + now + '] Requested by ' + req.connection.remoteAddress); // req.cone...ではリクエストが送られたIP情報を取得している

    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });

    switch (req.method) {
        // reqオブジェクトHTTPメソッドの文字列、req.methodの値に応じて、条件分岐

        case 'GET': // GETメソッドだった場合
            // リクエストされたURLをレスポンスに返す
            res.write('GET ' + req.url);
            break;

        case 'POST': // POSTメソッドだった場合
            // リクエストされたURLをレスポンスに返す
            res.write('POST ' + req.url);

            // 追加して送られてくるデータに対する処理
            let body = [];
            // リクエストオブジェクトreqも、イベントを発行するタイプのオブジェクトである
            req.on('data', (chunk) => { // dataイベント発生時(=データを受け取った時) 変数chunkには細切れなデータが入る
                body.push(chunk); // 受け取ったデータchunkを、配列bodyに追加していく
            }).on('end', () => { // endイベント発生時(=データを全て受信し終わった時)
                body = Buffer.concat(body).toString(); // 配列bodyを全てくっつけて、文字列に変換する
                console.info('[' + now + '] Data posted: ' + body); // infoログとして出力
            });
            break;

        case 'DELETE': // DELETEメソッドだった場合
            // リクエストされたURLをレスポンスに返す
            res.write('DELETE ' + req.url);
            break;

        default:
            break;
    }

    res.end();
}).on('error', (e) => { // エラーのハンドリングを行う←「httpサーバーが次のイベントを発行した際に補足するよ」という書き方
    // 'error'という文字列のイベントが発生した時に呼び出されるコールバック関数
    console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
    // 'clientError'という文字列のイベントが発生した時に呼び出されるコールバック関数
    console.error('[' + new Date() + '] Client Error', e);
});

// このHTTPが起動するポートを宣言し、サーバーを起動
const port = 8000;
server.listen(port, () => {
    // サーバーを起動時に実行されるコールバック関数
    // console.log('Listening on ' + port);
    console.info('[' + new Date() + '] Listening on ' + port)
});