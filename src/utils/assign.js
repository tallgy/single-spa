// Object.assign() is not available in IE11. And the babel compiled output for object spread
// syntax checks a bunch of Symbol stuff and is almost a kb. So this function is the smaller replacement.
// Object.assign()在IE11中不可用。babel编译的对象扩展语法的输出检查了一堆符号的东西，几乎是一个kb。所以这个函数是较小的替换。
export function assign() {
  for (let i = arguments.length - 1; i > 0; i--) {
    for (let key in arguments[i]) {
      if (key === "__proto__") {
        continue;
      }
      arguments[i - 1][key] = arguments[i][key];
    }
  }

  return arguments[0];
}
