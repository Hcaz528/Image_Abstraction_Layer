const mongoose = require('mongoose');
const URL = mongoose.model('URL');
const promisify = require('es6-promisify');
const domains = [".arpa",".test",".com",".org",".net",".int",".int",".edu",".gov",".mil",".arpa",".ac",".ac.uk",".ad",".ae",".af",".ag",".ai",".al",".am",".an",".ao",".aq",".ar",".as",".at",".au",".aw",".ax",".az",".ba",".bb",".bd",".be",".bf",".bg",".bh",".bi",".bj",".bl",".bm",".bn",".bo",".bq",".br",".bs",".bt",".bv",".no",".bw",".by",".bz",".ca",".cc",".cd",".cf",".cg",".ch",".ci",".ck",".cl",".cm",".cn",".co",".cr",".cu",".cv",".cw",".cx",".cy",".cz",".de",".dj",".dk",".dm",".do",".dz",".ec",".ee",".eg",".eh",".er",".es",".et",".eu",".eus",".fi",".fj",".fk",".fm",".fo",".fr",".ga",".gb",".gd",".ge",".gf",".gg",".gh",".gi",".gl",".gal",".gm",".gn",".gp",".gq",".gr",".gs",".gt",".gu",".gw",".gy",".hk",".hm",".hn",".hr",".ht",".hu",".id",".ie",".il",".im",".in",".io",".iq",".ir",".is",".it",".je",".jm",".jo",".jp",".ke",".kg",".kh",".ki",".km",".kn",".kp",".kr",".kw",".ky",".kz",".la",".lb",".lc",".li",".lk",".lr",".ls",".lt",".lu",".lv",".ly",".ma",".mc",".md",".me",".mf",".mg",".mh",".mk",".ml","....%84",".aaa",".abb",".aeg",".afl",".aig",".airtel",".bbc",".bentley",".example",".invalid",".local",".localhost",".onion",".test",".ca",".bar",".bible",".biz",".church",".club",".college",".com",".design",".download",".eco",".green",".hiv",".info",".kaufen",".kiwi",".lat",".lgbt",".moe",".name",".net",".ninja",".NGO_and_.ONG",".one_(domain)",".NGO_and_.ONG",".OOO",".org",".pro",".wiki",".wtf",".xyz",".aero",".asia",".cat",".coop",".edu",".eus",".google",".gov",".int",".jobs",".mil",".mobi",".museum",".post",".tel",".travel",".xxx",".africa",".alsace",".amsterdam",".berlin",".brussels",".bzh",".cymru",".frl",".gal",".gent",".irish",".ist",".istanbul",".kiwi",".krd",".london",".miami",".nyc",".paris",".quebec",".rio",".saarland",".scot",".tokyo",".vlaanderen",".wales",".wien",".arpa",".nato",".example",".invalid",".local",".localhost",".onion",".test",".africa",".bcn",".lat",".%D0%B1%D0%B3",".eng",".sic",".%D0%B1%D0%B3",".geo",".mail",".web",".shop",".art",".eco",".kid",".kids",".music"]

// MAGICALLY REGEX THAT MATCHES ANY DOMAIN NAME (that I can think of in this moment)
// FOR .com's ([a-zA-Z1-9 \-]+)?\.com/

exports.getHomepage = (req, res) => {
  res.render('index', {title: (req.protocol + 's://' + req.get('host') + req.originalUrl), example: 'https://www.google.com'});
};

exports.getShortURL = async (req, res) => {
  let url2Find = (req.protocol + 's://' + req.get('host') + req.originalUrl);

  let foundYou = await URL.findOne({ shortLink: url2Find }, function(err, character) {
    console.log(character); // { name: 'Frodo', inventory: { ringOfPower: 1 }}
  });
  if(foundYou)
    res.redirect(foundYou.originalLink);
  else
    res.send('Please try a valid link instead');
}

// Functions from https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    }
    return domain;
}


exports.getNew = (req, res) => {
  let originalLink = req.url.replace(/\/new\//g,''), shortLink;
  let regHTTP = /https?\:/; let matchedHTTP = originalLink.match(regHTTP);
  let regDomain = /([a-zA-Z1-9 \-]+)?\.com$/; let matchedDomain = originalLink.match(regDomain);
  let hit_domains = domains.reduce( (a,b) => {
    // console.log(`b:  ${b}`);
    let root = '.'+extractRootDomain(originalLink).split('.')[1];
    var replace = "([a-zA-Z1-9 \\-]+)?\\"+root+'($|\/[a-zA-Z1-9 \\- \/]+)?';
    // UPDATE: Can not get proper regex to identify example.com/yay
    // and not example.comp/yay where comp is an illegitimate domain
    // Link to regexp explanation:  https://regex101.com/r/BkmgTh/1
    
    // Regex explanation
    //     /([a-zA-Z1-9 \-]+)?\.com$/
    // 1st Capturing Group ([a-zA-Z1-9 \-]+)?
    // ? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
    // Match a single character present in the list below [a-zA-Z1-9 \-]+
    // + Quantifier — Matches between one and unlimited times, as many times as possible, giving back as needed (greedy)
    // a-z a single character in the range between a (index 97) and z (index 122) (case sensitive)
    // A-Z a single character in the range between A (index 65) and Z (index 90) (case sensitive)
    // 1-9 a single character in the range between 1 (index 49) and 9 (index 57) (case sensitive)
    //   matches the character   literally (case sensitive)
    // \- matches the character - literally (case sensitive)
    // \. matches the character . literally (case sensitive)
    // com matches the characters com literally (case sensitive)
    // $ asserts position at the end of the string
    
    let re = new RegExp(replace,"");
    let c = originalLink.match(re);
    // console.log(c);
    if(c) {
      // console.log(c);
      c = (c[0].replace(c[1],'')).replace(c[2],'');
      // console.log(c);
      b = root.match(new RegExp(b+'$',""));
      if (b)
        console.log(b);
    }
    return a || b != null ? true : false;
  }, false);
  
  console.log(`matchedHTTP:  ${matchedHTTP}`);
  console.log(`hit_domains:  ${hit_domains}`);
  
  if(matchedHTTP && hit_domains) {
    // const store = await (new URL({originalLink, shortLink})).save();
    
    URL.count({}, function(err, count){
        shortLink = `${(req.protocol + 's://' + req.get('host'))}/${count+1}`;
        console.log( "Number of docs: ", count );
        console.log(`shortLink: ${shortLink}`);
        const url = (new URL({originalLink, shortLink})).save();
        res.json({originalLink, shortLink});
    });
  }
  else
    res.json({'Error': 'Wrong Url format.',
              'MakeSure':'Make sure you have the http:// or https:// at the start of the link.',
              'Also':'Also make sure the domain is a valid one such as .com or .ca or .org',
              'Example': 'https://www.google.com'});
};

