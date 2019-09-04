module.exports = function debounce (fn, delay) {
  var timeoutID = null
  return () => {
    clearTimeout(timeoutID)
    var that = this
    timeoutID = setTimeout(function () {
      fn.apply(that, [fn, delay])
    }, delay)
  }
}
