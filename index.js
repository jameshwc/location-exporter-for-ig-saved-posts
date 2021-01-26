const igapi = require('instagram-private-api');
const IgApiClient = igapi.IgApiClient
const fs = require('fs')
const createWriteStream = fs.createWriteStream

const username = process.env.IG_USERNAME
const password = process.env.IG_PASSWORD

if (username == "" || password == "" || username === undefined || password === undefined) {
    console.log("username or password empty! you must provide them as env variable: $IG_USERNAME, $IG_PASSWORD")
    process.exit(1)
}

async function fetchSavedPosts(feed) {
  const items = await feed.items()
  const loc = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].location === undefined) {
            console.log(`https://www.instagram.com/p/${items[i].code}`)
        } else {
          loc.push(items[i].location)
        }
    }
  return loc
};

const ig = new IgApiClient();

ig.state.generateDevice(username);

(async () => {
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(username, password);
  
  process.nextTick(async () => await ig.simulate.postLoginFlow());
    const userFeed = ig.feed.saved()
    // console.log(userFeed)
    fetchSavedPosts(userFeed).then(loc => {
    var stream = createWriteStream("location.csv");
    stream.once('open', function(fd) {
      stream.write("Latitude,Longitude,Description,Address\n");
      for (var i = 0; i < loc.length; i++) {
        stream.write(loc[i].lat + "," + loc[i].lng + "," + loc[i].name + "," + loc[i].address + "\n")
      }
      stream.end();
    });
  })
})();

