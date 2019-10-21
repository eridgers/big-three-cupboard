console.log('This script populates some test items to the database');

var async = require('async')
var Item = require('./models/item')
var Category = require('./models/category')
var Brand = require('./models/brand');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/bigthree", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []
var brands = []

function itemCreate(name, brand, weight, cost, quantity, description, category, cb) {
    itemdetail = {name:name, brand:brand, weight:weight, cost:cost, 
                quantity:quantity, description:description, category: category }
  
    itemdetail.category = category;
    itemdetail.brand = brand;
    var item = new Item(itemdetail);
        
    item.save(function (err) {
        if (err) {
        cb(err, null)
        return
        }
        console.log('New Item: ' + item);
        items.push(item)
        cb(null, item)
    }  );
}

function categoryCreate(name, description, cb) {
  var category = new Category({ name: name, description: description });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function brandCreate(name, cb){
    var brand = new Brand({name: name});

    brand.save(function (err){
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Brand: ' + brand);
        brands.push(brand)
        cb(null, brand);
    });
}


function createItems(cb) {
    async.series([
        // itemCreate(name, brand, weight, cost, quantity, description, category)
        // tents
        function(callback) {
            itemCreate('Fly Creek UL1', brands[0], 750, 325, 8, 'A great lighweight option, semi-freestanding', categories[0], callback);
        },
        function(callback) {
            itemCreate('Duplex', brands[4], 550, 600, 2, 'Specifically designed for ultralight backpacking and thru-hiking, the award-winning Duplex hits the sweet spot when it comes to size, weight, and features. This tent will allow you to push your limits and explore over greater distances, whether you’re finding the best route on the Pacific Crest Trail, or losing yourself in the beauty of the Swiss Alps. This tent is roomy, well-ventilated, packs down small, offers simple set up, and can be set up almost anywhere! You won’t find a lighter functional version of this tent anywhere on the market.', categories[0], callback);
        },
        function(callback) {
            itemCreate('The One', brands[5], 585, 300, 5, 'The One is back, and even more determined to keep you dry without weighing you down. Features include factory-taped seams, reflective pull-outs, robust zippers, and fully-rigged lines. Easy to set up, rugged, spacious and less than two pounds, The One is the shelter of your minimalist dreams.', categories[0], callback);
        },
        function(callback) {
            itemCreate('Twinn Tarp', brands[5], 270, 155, 0, 'Exceptionally waterproof 7 denier nylon with a computer-designed catenary cut provides a generous 47 square feet of protected area, plus overhangs to keep gear dry. Easy set-up with our optional ultralight carbon trekking poles. Tapered front to back for lighter weight and better wind deflection. A great choice when the goal is maximum protection for minimal weight.', categories[0], callback);
        },
        // bags
        function(callback){
            itemCreate('Exos 48', brands[3], 110, 1200, 9, 'Osprey exos mega big baller, super comfy', categories[1], callback)
        },
        function(callback){
            itemCreate('Kumo 36 Superlight', brands[5], 165, 600, 4, 'This is a smaller-volume pack for low-stuff adventures. Maybe you’re doing a day hike and just carrying six or seven of the ten essentials. Or maybe you’re a wilderness warrior whose trail name is “Tent? Who needs a tent?” and thinks nothing of heading out on a backcountry weekend with six energy bars, one pair of socks and a Mylar blanket. Any hiker who wants more of an experience with less luggage will love the Kumo 36.', categories[1], callback);
        },
        function(callback){
            itemCreate('Mariposa 60', brands[5], 225, 865, 7, 'This award-winning pack’s roomy main pocket holds your shelter, clothing, sleeping pad and food. There are seven extra pockets - one mesh for wet stuff, two easy-to-reach for water and high-energy snacks, and the rest for whatever else.  Made of custom 100 and 200 denier Robic nylon fabric, this tough, light pack delivers a very comfortable carry even with overloaded with 35 pounds of gear', categories[1], callback)
        },
        function(callback){
            itemCreate('Arc Blast 55', brands[4], 325, 583, 9, 'If you want to feel freedom of traveling along dusty trails and enjoy views from exposed ridge-lines, the Arc Blast is the ultralight backpack for you. This pack has our signature feature - the patented Flexed Arc adjustable frame. This frame creates an air gap between your back and the pack, keeping you cool and providing a super comfortable fit. This fine-tuned innovative design makes the pack a true thru-hiker favorite.', categories[1], callback)
        },
        // sleeping bags
        function(callback){
            itemCreate('Mystic UL 15', brands[0], 399, 900, 5, 'The Mystic UL 15 is one of our most technically designed Big Agnes System bags, using our Flex Pad Sleeve design, a very durable nylon ripstop shell fabric, and super cozy 850 fill power DownTek™ water repellent insulation. This bag combines ultralight versatility with a long line of packable creature comforts. Whether you’re a 3/4 length-pad-carrying, fast fly tent-gram-counter or just gearing up for a trip where weight and packed size is important, this is the go-to bag for you.', categories[2], callback);
        },
        function(callback){
            itemCreate('Womens Lamina 15F', brands[1], 200, 1500, 10, 'Unique Lamina™ construction maximizes the loft of your insulation; eliminates cold spots; and thermally maps insulation to areas you need the most warmth. By strategically placing insulation, we are able to concentrate warmth where you need it. ', categories[2], callback);
        },
        function(callback){
            itemCreate('Vesper 20F Quilt', brands[2], 389, 538, 6, 'Featuring unrivaled packability and featherweight design, the Vesper 20F/-6C quilt provides no-frills camp comfort. The quilt uses thermally-efficient box baffled construction to maximize warmth and comfort for a high-performance, ultralight piece.', categories[2], callback);
        },
        function(callback){
            itemCreate('10F Solo Quilt', brands[4], 339, 590, 5, 'Conquer any landscape with courage knowing that you’ll be warm and comfy in our Solo Quilt when you get to camp. This minimalist quilt can be tucked under you, clipped at the center, or clipped to your sleeping pad with the included strap. Super soft, extra warm, and ultralight, this quilt is a great choice for the hiker that wants it all without sacrificing anything.', categories[2], callback);
        },
        // sleeping pads
        function(callback){
            itemCreate('Insulated AXL Air', brands[0], 180, 330, 6, 'Simply put, this is the most comfortable and lightest ultralight three-season pad you can put in your pack. Designed with gram counters, thru hikers, and technical gear junkies in mind, the Insulated AXL Air combines a high-tenacity, patent-pending nylon rip-stop shell with internal minimalist construction that maximizes every ounces stability and comfort. With larger outer tubes, this pad keeps you cradled on top, while the PrimaLoft Silver® insulation, working with the heat reflective barrier, traps body heat and reflects it back so you stay comfy as the temperatures drop. Save room and weight in your pack for other backcountry essentials, since you wont even know the Insulated AXL Air is in there.', categories[3], callback);
        },
        function(callback){
            itemCreate('NeoAir XLite', brands[2], 120, 340, 3, 'The NeoAir XLite mattress delivers more warmth and comfort per ounce than any other three-season air mattress available. Our patent-pending technologies deliver that performance with minimal weight and less bulk than a one-liter water bottle. Softer fabrics bring better next-to-skin comfort and a boost in durability, all with no added weight. For the discerning alpinist, thru-hiker or backcountry minimalist whos counting every ounce, there is simply no better choice to assure the kind of rest you need to enjoy tomorrow. Stuff sack and repair kit included.', categories[3], callback);
        },
        function(callback){
            itemCreate('Neoair Uberlite', brands[2], 134, 250, 7, 'As the absolute lightest insulated air mattress available, the UberLite keeps your pack featherweight on the trail. Thermarests proprietary construction provides the critical warmth needed in the backcountry. Boasting 2.5 inches of legendary NeoAir comfort, the minimal UberLite makes a big impact during nights in the backcountry. To endure the rigors of the backcountry, unique fabrics and construction meet strict durability standards. Stuff sack and repair kit included.', categories[3], callback);
        },
        function(callback){
            itemCreate('Thinlight Foam Pad', brands[5], 18, 70, 3, 'The Gossamer Gear Thinlight Foam Insulation Pad can be rolled and placed either inside the pack or on top (where it can be held under the closure for instance). The 1/8" pad will fold up to fit into the back of our larger packs, providing a super-minimalist pad.', categories[3], callback);
        }
        ],
        // optional callback
        cb);
}


function createCategories(cb) {
    async.parallel([
        function(callback) {
            categoryCreate("Tents", "The perfect place to lay your head at night", callback);
        },
        function(callback) {
            categoryCreate("Backpacks", "Jam all your stuff in and sling it on your back!", callback);
        },
        function(callback) {
            categoryCreate("Sleeping Bag", "Get snuggly, stay warm out there", callback);
        },
        function(callback) {
            categoryCreate("Sleeping Pad", "I guess its the big four, these keep you warm at night too", callback);
        }
        ],
        // optional callback
        cb);
}


function createBrands(cb) {
    async.parallel([
         // brands
        function(callback){
            brandCreate('Big Agnes', callback);
        },
        function(callback){
            brandCreate('Mountain Hardwear', callback);
        },
        function(callback){
            brandCreate('Thermarest', callback);
        },
        function(callback){
            brandCreate('Osprey', callback);
        },
        function(callback){
            brandCreate('Zpacks', callback);
        },
        function(callback){
            brandCreate('Gossamer Gear', callback);
        }
        ],
        // Optional callback
        cb);
}

async.series([
    createBrands,
    createCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        // console.log('BOOKInstances: '+bookinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});