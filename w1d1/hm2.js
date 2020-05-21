// Fix the slow function to be asynchronous/non-blocking

/**
 * @param {Function} callback 
 * @returns {*} calls callback()
 */
function slow(callback){
  if (Math.random() > 0.5) {
     return callback("Error", null);
  }
  return callback(null, {id:12345})
}

/**
 * @param {Function} fn 
 * @returns {Object} contains done and fail methods
 */
function exec(fn){
  let obj = {};
  fn(function(error, data){
    obj.done = function(callback){
      if(error === null){
        callback(data);
      }
      return this;
    }
    obj.fail = function(callback){
      if(error !== null){
        callback(error);
      }
      return this;
    }
  })
  return obj;
}

exec(slow).done(function(data){ console.log(data); })
          .fail(function(err){ console.log("Error: " + err); });