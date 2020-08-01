const YouTube = require('youtube-node');
const config = require('../yt-config.json');

const youtubeURL = 'https://www.youtube.com/watch?v';

const youtube = new YouTube();

youtube.setKey(config.key);

function searchVideoURL(msg, queryText) {
  return new Promise((resolve, reject) => {
    youtube.search(`Exercicio em casa para biceps ${queryText}`, 2, (error, result) => {
      if (!error) {
        const videoIds = result.items
          .map(item => item.id.videoId)
          .filter(item => item);
        
        const youtubeLinks = videoIds
          .map(videoId => `${youtubeURL}=${videoId}`);

        resolve(`${msg} ${youtubeLinks.join(`, `)}`);

        console.log(JSON.stringify(result, null, 2));
      } else {
        reject('Deu erro');
      }
    });
  });
}

module.exports.searchVideoURL = searchVideoURL;