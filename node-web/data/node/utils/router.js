module.exports = function(app){
    const crypto = require('crypto');
    const fs = require('fs');
    const flag = "Defenit{this_is_flag}";

    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);

    app.use(function(req, res, next){
        req.fp = crypto.createHash('md5').update(req.ip).digest('hex') + '/';
        if (!fs.existsSync('views/' + req.fp)){
            fs.mkdirSync('views/' + req.fp);
        }
        next();
    });

    app.get('/', function(req, res){
        res.set('Content-Type', 'text/html; charset=utf-8');

        if (!req.query.view && !req.query.write) {
            res.end('Hello World!😀');
        }
        if(req.query.write){
            const fn = crypto.randomBytes(8).toString('hex') + '.html';
            fs.writeFile('views/' + req.fp + fn, req.query.write, function(){
                console.log(`${req.fp}${fn}`);
                res.redirect(`/?view=${req.fp}${fn}`);
            });
        }
        if(req.query.view){
            res.render(req.query.view, {'flag':flag});
        }
    });
}
