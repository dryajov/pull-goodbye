
module.exports = function endable (goodbye) {
  var ended, waiting, sentEnd
  function h (read) {
    return function (abort, cb) {
      read(abort, function (end, data) {
        if(end && !sentEnd) {
          sentEnd = true
          return cb(null, typeof goodbye === 'function' 
          ? goodbye(undefined, true)
          : goodbye)
        }
        //send end message...

        if(end && ended) cb(end)
        else if(end)     waiting = cb
        else             cb(null, data)
      })
    }
  }
  h.end = function () {
    ended = true
    if(waiting) waiting(ended)
    return h
  }
  return h
}

