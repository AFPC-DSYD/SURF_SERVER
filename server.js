// =======================
// get the packages we need ============
// =======================
var express     = require('express')
var http        = require('http')
var https       = require('https')
var fs          = require('fs')
var path        = require('path')
var app         = express()
var bodyParser  = require('body-parser')
var morgan      = require('morgan')
var cors        = require('cors')

// load data
var contents = fs.readFileSync("surf.js")
var dataSurf = JSON.parse(contents)
var arrayDataSurf = dataSurf.data

var contents = fs.readFileSync("ad_grab.js")
var ad_grab = JSON.parse(contents)
var arrayAd_grab = ad_grab.data

var contents = fs.readFileSync("ad_grab_final.js")
var ad_grab_final = JSON.parse(contents)
var arrayAd_grab_final = ad_grab_final.data

var contents = fs.readFileSync("vml.js")
var vml = JSON.parse(contents)
var array_vml = vml.data

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 5005 // used to create, sign, and verify tokens

//cors allows cross-origin request
var whitelist = ['http://localhost:8080','https://localhost:8080']
var corsOptions = {
    origin: function (origin, callback){
        // whitelist-test pass
        if (true){//(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }
        // whitelist-test fail
        else{
            callback(new Error('Not on whitelist'))    
        }
    }
}
app.use(cors(corsOptions))

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))

// =======================
// routes ================
// =======================
// basic route

app.get('/', (req, res)=> {
    res.send('Hello! The API is at http://localhost:' + port + '/api')
})

// API ROUTES -------------------
var apiRoutes = express.Router()

apiRoutes.get('/', (req, res)=>{
    res.json({message: 'Welcome to the API ROOT'})
})

//API endpoint for AD Manning
apiRoutes.get('/admanning', (req, res)=>{
    setTimeout(function() {
        res.json( {
            success: true,
            ASOFDATE: "31-JAN-2018",
            data: arrayDataALL 
        } )
    },1000)
})

//API endpoint for officers submitting ranked billets
apiRoutes.post('/adManning_post', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataALL
    } )
})

//API endpoint for officer manning
apiRoutes.get('/officer', (req, res)=>{
    setTimeout(function() {
        res.json( {
            success: true,
            ASOFDATE: "31-JAN-2018",
            data: arrayDataOFF
        } )
    },2000)
})

//API endpoint for officer manning 
apiRoutes.post('/officer_post', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataOFF
    } )
})

//API endpoint for officer promotions
apiRoutes.post('/officer_promo', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataOffPromo
    } )
})

//API endpoint for enlisted manning
apiRoutes.get('/enlisted', (req, res)=>{
        res.json( {
            success: true,
            ASOFDATE: "31-JAN-2018",
            data: arrayDataENL 
        } )
})

//API endpoint for officers submitting ranked billets
apiRoutes.post('/enlisted_post', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataENL
    } )
})

//API endpoint for enlisted retention
apiRoutes.get('/enlisted_ret', (req, res)=>{
        res.json( {
            success: true,
            asofdate: "31-JAN-2018",
            data: arrayDataEnlRet 
        } )
})

//API endpoint for officers submitting ranked billets
apiRoutes.post('/enlisted_ret_post', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataEnlRet
    } )
})

//API endpoint for enlisted promotions 
apiRoutes.post('/enlisted_promo_post', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataEnlPromo
    } )
})

//API endpoint for civilian inventory 
apiRoutes.post('/civilian_inv_post', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataCiv 
    } )
})

//API endpoint for civilian inventory 
apiRoutes.post('/join_spouse', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataJoint 
    } )
})

//API endpoint for off tos
apiRoutes.post('/officer_tos', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataOffTos
    } )
})

//API endpoint for enl tos
apiRoutes.post('/enlisted_tos', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataEnlTos
    } )
})

//API endpoint for enl tos
apiRoutes.post('/surf', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataSurf
    } )
})

//API endpoint for enl tos
apiRoutes.get('/surf', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        data: arrayDataSurf
    } )
})

//API endpoint for enl tos
apiRoutes.post('/ad_grab', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        goodDins: "GRADE UNIT MAJCOM",
        badDins: "GRANDFATHER_NAME",
        data: arrayAd_grab
    })
})

//API endpoint for enl tos
apiRoutes.post('/ad_grab_final', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        dins: "SSN GRADE UNIT MAJCOM",
        data: arrayAd_grab_final
    })
})

//API endpoint for enl tos
apiRoutes.post('/vml', (req, res)=>{
    res.json( {
        success: true,
        ASOFDATE: "31-JAN-2018",
        dins: "SSN GRADE UNIT MAJCOM",
        data: array_vml
    })
})



app.use('/api', apiRoutes)

// =======================
// start the server ======
// =======================


app.listen(port)
console.log('Server up at http://localhost:' + port)

