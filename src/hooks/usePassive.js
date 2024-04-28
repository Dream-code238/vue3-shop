/*
 * @Author: 一路向阳 tt_sunzhenfeng@163.com
 * @Date: 2024-04-27 21:25:40
 * @LastEditors: 一路向阳 tt_sunzhenfeng@163.com
 * @LastEditTime: 2024-04-27 21:27:45
 * @FilePath: \shop-admin\src\hooks\usePassive.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const usePassive = () => {
  if (typeof EventTarget !== 'undefined') {
    const func = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, fn, capture) {
      this.func = func;
      if (typeof capture !== 'boolean') {
        capture = capture || {}
        capture.passive = false
      }
      this.func(type, fn, capture);
    }
  }
}

export default usePassive;
