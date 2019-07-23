function step(iterator, resolve, reject, nextcall, throwcall, key, args) {
  try {
    var info = iterator[key](args)
    var v = info.value
  } catch (e) {
    reject(e)
    return
  }
  if (info.done) {
    resolve(v)
    return
  }

  // resolve 结果之后讲value传递给nextcall，继续下面调用
  Promise.resolve(v).then(nextcall, throwcall)
}
/**
 * 
 * @param {fn 是生成器函数 } fn 
 */
function co(fn) {
  return function () {
    let self = this
    let args = arguments
    return new Promise(function (resolve, reject) {
      // fn 是生成器函数，调用返回 iterator
      let iterator = fn.apply(self, args)

      function next(value) {
        step(iterator, resolve, reject, next, throwFn, "next", value)
      }

      function throwFn(err) {
        step(iterator, resolve, reject, next, throwFn, "throw", err)
      }

      next(undefined)
    })
  }
}

module.exports = {
  co
}