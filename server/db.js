var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// connect to mongo database named runplanner
mongoose.connect('mongodb://fangyacomeon:tiancai121190@ds121456.mlab.com:21456/runplanner');

var db = mongoose.connection;

db.on('error', function() {
  console.error('database connection error');
})
db.once('open', function() {
  console.log('Mongodb connected');
})

// weather schema
var clothesSchema = new mongoose.Schema({
  gender: String,
  temp30: {
    top: String,
    bottom: String
  },
  temp40: {
    top: String,
    bottom: String
  },
  temp50: {
    top: String,
    bottom: String
  },
  temp60: {
    top: String,
    bottom: String
  },
  temp70: {
    top: String,
    bottom: String
  },
  temp80: {
    top: String,
    bottom: String
  }
});

var Clothes = mongoose.model('clothes', clothesSchema);

// insert men's clothes data into the mongo database
var mensClothes = new Clothes({
  gender: 'male',
  temp30: {
    top: 'https://image.spreadshirtmedia.com/image-server/v1/mp/products/P20783016T210A1MPC29322314PA330PT17/views/1,width=800,height=800,appearanceId=1,backgroundColor=E8E8E8,version=1485256808/running-man-cast-episode-74-super-natural-t-shir-men-s-t-shirt.webp',
    bottom: 'http://i00.i.aliimg.com/wsphoto/v0/32315814164_1/2015-New-Joggers-font-b-Pants-b-font-Sport-Men-font-b-Pants-b-font-Casual.jpg'
  },
  temp40: {
    top: 'http://www.cwlothing4sportss.com/wp-content/uploads/2014/03/30/5/1683-adidas-Running-Sequencials-Long-Sleeve-Tee-for-Men-1.jpg',
    bottom: 'https://i.pinimg.com/originals/b7/fa/be/b7fabe6145b99a87350026e3451e3ba9.jpg'
  },
  temp50: {
    top: 'http://cdn.gazellesports.com/media/catalog/product/cache/1/small_image/346x412/9df78eab33525d08d6e5fb8d27136e95/p/s/ps1271842-985_f.jpg',
    bottom: 'http://www.northwords.co.uk/images/products/IEW9UL%20adidas%20Climalite%20Response%20Tights%20Men%20s%20Running%20Clothing%20B%20.jpg'
  },
  temp60: {
    top: 'https://i.pinimg.com/originals/7a/ef/0d/7aef0df02ae350f34eed5d4f93effeaf.jpg',
    bottom: 'https://i.pinimg.com/originals/b7/fa/be/b7fabe6145b99a87350026e3451e3ba9.jpg'
  }
});
mensClothes.save(function(err, clothes) {
  if (err) return console.error(err);
});

// insert women's clothes data into the mongo database
var womensClothes = new Clothes({
  gender: 'female',
  temp30: {
    top: 'https://i.pinimg.com/236x/e7/ef/37/e7ef37fdb75ab2208182c48a2b0a4499--running-women-running-gear.jpg',
    bottom: 'https://i.pinimg.com/originals/85/e4/1e/85e41ea68c37edd5d7fe84e8ca05794b.jpg'
  },
  temp40: {
    top: "https://i.pinimg.com/736x/52/28/07/522807b70fa76a9e7568714077928f24--running-shirts-woman-running.jpg",
    bottom: 'https://ae01.alicdn.com/kf/HTB1xzZEJXXXXXayaXXXq6xXFXXXM/2016-Women-Sports-Leggings-Fitness-font-b-Winter-b-font-font-b-Lady-b-font-Yoga.jpg'
  },
  temp50: {
    top: 'https://i.pinimg.com/736x/20/a4/55/20a4552868c25a5a3bdf761e18a1951e--running-clothing-running-gear.jpg',
    bottom: 'http://www.wigglestatic.com/product-media/5360099096/Ronhill-Women-s-Trail-Winter-Tight-AW14-Running-Tights-All-Black-AW14-RH-000817-R009.jpg?w=1900&h=1900&a=7'
  },
  temp60: {
    top: 'http://www.defencefire.co.uk/images/large/products/Montane%20Pink%20Running%20Clothing%20-%20Montane%20Sonic%20Women%20s%20Long%20Sleeve%20Running%20Top%20789_LRG.jpg',
    bottom: 'https://i.pinimg.com/236x/eb/89/30/eb893084d72d15aeffbe03aa4b50fc18--running-clothing-running-gear.jpg'
  }
});
womensClothes.save(function(err, clothes) {

  if (err) return console.error(err);
  console.log(clothes);
});


// exports the Clothes schema for use in the server
module.exports = Clothes;