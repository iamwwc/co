const {
  co
} = require('./coasync_test')

function asyncTask(fn) {
  let that = this
  let args = arguments
  return new Promise(resolve => {
    setTimeout(() => {
      let res = fn.apply(that, args)
      resolve(res)
    }, 3000)
  })
}


!co(function* () {
  let r = co(function* () {
    return yield asyncTask(() => 1)
    // let r2 = yield asyncTask(() => 2)
  })
  let result = yield r.apply(null,arguments)

  console.log(result)
})()