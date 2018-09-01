
// to learn express 
const expressObj = require('express');
const hbsObj = require('hbs');
const fsObj = require('fs');

var app = expressObj();

//to register partials so that we can move commonly used code piece there 
// for using it later from several places
hbsObj.registerPartials(__dirname + '/views/partials');

//this is to set the express to use the view engine as hbs
//a folder view must be created where express can take hbs templates from
app.set('view engine','hbs'); //key value pair



//app.use is to register a middleware. usually it takes a fun with req,res and next
app.use( ( req,res,next) => {
    // console.log(req.url + req.path );
    // console.log('hi' + JSON.stringify(req.params));
    
    var log = req.url + req.path  +  JSON.stringify(req.params) + '\n';
    fsObj.appendFile('server.log',log,(req,res,err) => {
        if(err)
        {
            console.log(err);
        }
    });
    //console.log('hi about rendering');
    
    next(); //very imp. If this is not added, the middleware won;t return back to this server.js.. 
    //it would stay there forever
});


app.use( (req,res,next) => {
    res.render('maintenance.hbs');
});

//use functiuon would use the middleware to render from the given directory
//app.use is to register a middleware
//all app.use would be executed sequentilaly.
//if we are gonna show a maintenance page, this public page must be set after that so that it wont be shown 
app.use(expressObj.static(__dirname + '/public'));

hbsObj.registerHelper('getCurrentYear', () => 
{
    return new Date().getUTCFullYear();
});

hbsObj.registerHelper('convertUpper', (textInput)=> {
    return textInput.toUpperCase()
}
);

app.get('/', (req,res) =>  
    {        
        //res.send('<h1>Hi Uma.. </h1>'); //this can be replaced with render to fetch 
        //teh template from views folder and replace the template stting with values
        res.render('home.hbs', {
            'file-type' : "Home",
            //'copyright-year' : new Date().getUTCFullYear(),
             'welcome-text' : 'Hey there!!!! Avada Kedavra!!'
        })
    }
);

// instead of sting we can render the templates
// app.get('/about', (req,res) =>  
//     {
//         res.send({
//             name: "Uma",
//             Sub: "NodeJs",
//             testArr : {
//                 a1 : "Books",
//                 a2 : "HP"
//             },
//             likes : ['like1', 'like2']
//         });
//     }
// );

app.get('/about', (req,res) => {
     //first param is the file name, after that we can pass the template strings as obj
     res.render('about.hbs', {
        'file-type' : "About"
        //,'copyright-year' : new Date().getFullYear()    
    });
});

app.get('/bad', (req,res) => {
    res.send( {
        Err : 'Sorry.. You ran into an error'
    }
    );
}
);
app.listen(8080);
console.log('running');