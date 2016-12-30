var express = require('express');
var router = express.Router();

var indico = require('indico.io');
// TODO: Set indico.apiKey from process.env

/*** Utils ***/
var logError = function(err) { console.log(err); }

/*** REST ***/
/* GET */
/*
 * Response
 *   API list
 */
router.get('/', function(req, res, next) {
  res.render('api_list', { title: 'ER API List' });
  //TODO
});

/* GET */
router.get('/emotion', function(req, res){
  // single example
  indico.emotion("I did it. I got into Grad School. Not just any program, but a GREAT program. :-)")
    .then(function(res_emotion){
      res.send(res_emotion);
    })
    .catch(logError);
});

/* POST */
/*
 * Request params
 *   sentence: string;
 * Response
 *   anger: number;
 *   joy: number;
 *   fear: number;
 *   sadness: number;
 *   surprise: number;
 *   sentence: string;
 */
router.post('/sentence', function(req, res){
  let sentence = req.body.sentence;
  indico.emotion(sentence)
    .then(function(res_emotion){
      res_emotion.sentence = sentence;
      res.send(res_emotion);
    })
    .catch(logError);
});

/*
 * Request params
 *   paragraph: string;
 * Response
 *   anger: number;
 *   joy: number;
 *   fear: number;
 *   sadness: number;
 *   surprise: number;
 *   sentence: string;
 */
router.post('/paragraph', function(req, res){
  let splitToSentences = function(paragraph){
    // .
    let sentenceArr = paragraph.split(".");
    sentenceArr.forEach(function(sent, index){
      if(sent != ""){
        sentenceArr[index] = sent + ".";
      }
    });
    // !
    let newArr2 = [];
    sentenceArr.forEach(function(sent){
      let arr2 = sent.split("!");
      arr2.forEach(function(sent2, index2){
        if(sent2 != "" && index2 != arr2.length - 1){
          arr2[index2] = sent2 + "!";
        }
      });
      newArr2 = newArr2.concat(arr2);
    });
    sentenceArr = newArr2;
    // ?
    let newArr3 = [];
    sentenceArr.forEach(function(sent){
      let arr3 = sent.split("?");
      arr3.forEach(function(sent3, index3){
        if(sent3 != "" && index3 != arr3.length - 1){
          arr3[index3] = sent3 + "?";
        }
      });
      newArr3 = newArr3.concat(arr3);
    });
    sentenceArr = newArr3;
    return sentenceArr;
  }

  let paragraph = req.body.paragraph;
  let sentenceArr = splitToSentences(paragraph);
  let defArr = [];
  let res_emotions = [];
  console.log(sentenceArr);

  sentenceArr.forEach(function(sentence, index){
    if(sentence === ""){ return; }
    defArr.push(new Promise(function(resolve, reject){
      indico.emotion(sentence)
        .then(function(res_emotion){
          res_emotion.index = index; // for sorting
          res_emotion.sentence = sentence;
          res_emotions.push(res_emotion);
          resolve();
        })
        .catch(function(err){
          console.log(err);
          reject(err);
        });
    }));
  })

  Promise.all(defArr).then(function(){
    res_emotions.sort(function(a, b){
      return a.index - b.index;
    });
    let obj = {
      list: res_emotions
    };
    res.send(obj);
  })
  .catch(function(err){
    console.log(err);
  });
});

module.exports = router;
