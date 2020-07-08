/*事件循环是通过任务队列的机制来进行协调的。一个 Event Loop 中，可以有一个或者多个任务队列
(task queue)，一个任务队列便是一系列有序任务(task)的集合；每个任务都有一个任务源(task source)，
源自同一个任务源的 task 必须放到同一个任务队列，从不同源来的则被添加到不同队列。 setTimeout/Promise
等API便是任务源，而进入任务队列的是他们指定的具体执行任务。

宏任务：可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行
栈中执行）。浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，会在一个(macro)task执行结束
后，在下一个(macro)task 执行开始前，对页面进行重新渲染
宏任务(源)主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、
MessageChannel、setImmediate(Node.js 环境)

微任务：可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，
在渲染之前。所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染。也就是说，
在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）。
微任务(源)主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)
 */

//练习1：
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('settimeout')
})
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')
console.log('---------------')

/*执行顺序：（不同环境执行顺序稍有不一样，下面是在谷歌浏览器下面执行）
  script start
  async1 start
  async2
  promise1
  script end
  async1 end
  promise2
  setTimeout

解析：(来自同类型的任务源在同一个队列)
第一次宏任务(宏任务源：script整体代码)：
  script start
  async1 start
  async2
  promise1
  script end
执行完毕以后执行在第一次宏任务期间遇到的所有微任务(微任务源：promise)：
  async1 end
  promise2
再执行第二次宏任务(宏任务源：setTimeout)：
  setTimeout
*/

//练习2
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  //async2做出如下更改：
  new Promise(function(resolve) {
    console.log('promise1');
    resolve();
  }).then(function() {
    console.log('promise2');
  });
}
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0)
async1();

new Promise(function(resolve) {
  console.log('promise3');
  resolve();
}).then(function() {
  console.log('promise4');
});

console.log('script end');
console.log('-------------')

/*执行顺序：（不同环境执行顺序稍有不一样，下面是在谷歌浏览器下面执行）
  script start
  async1 start
  promise1
  promise3
  script end
  promise2
  async1 end
  promise4
  settimeout

解析：
第一次宏任务：
  script start
  async1 start
  promise1
  promise3
  script end
执行完毕以后执行在第一次宏任务期间遇到的所有微任务：
  promise2
  async1 end
  promise4
再执行第二次宏任务：
  setTimeout
*/

//练习3
async function async1() {
  console.log('async1 start');
  await async2();
  //更改如下：
  setTimeout(function() {
    console.log('setTimeout1')
  },0)
}
async function async2() {
  //更改如下：
  setTimeout(function() {
    console.log('setTimeout2')
  },0)
}
console.log('script start');

setTimeout(function() {
  console.log('setTimeout3');
}, 0)
async1();

new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');

/*执行顺序：（不同环境执行顺序稍有不一样，下面是在谷歌浏览器下面执行）
  script start
  async1 start
  promise1
  script end
  promise2
  setTimeout3
  setTimeout2
  setTimeout1

解析：
第一次宏任务：
 script start
  async1 start
  promise1
  script end
执行完毕以后执行在第一次宏任务期间遇到的所有微任务：
  promise2
再执行第二次宏任务：
  setTimeout3
  setTimeout2
  setTimeout1
*/
