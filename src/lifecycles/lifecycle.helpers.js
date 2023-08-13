import { find } from "../utils/find.js";
import { objectType, toName } from "../applications/app.helpers.js";
import { formatErrorMessage } from "../applications/app-errors.js";

export function validLifecycleFn(fn) {
  return fn && (typeof fn === "function" || isArrayOfFns(fn));

  function isArrayOfFns(arr) {
    return (
      Array.isArray(arr) && !find(arr, (item) => typeof item !== "function")
    );
  }
}

/**
 * 返回一个方法，方法参数将会传递给 lifecycle 的 Array<promise> 里面的参数
 * 使用的 reduce
 * @param {*} appOrParcel 
 * @param {*} lifecycle 
 * @returns { function }
 */
export function flattenFnArray(appOrParcel, lifecycle) {
  let fns = appOrParcel[lifecycle] || [];
  fns = Array.isArray(fns) ? fns : [fns];
  if (fns.length === 0) {
    fns = [() => Promise.resolve()];
  }

  return function (props) {
    return fns.reduce((resultPromise, fn, index) => {
      return resultPromise.then(() => fn(props));
    }, Promise.resolve());
  };
}

export function smellsLikeAPromise(promise) {
  return (
    promise &&
    typeof promise.then === "function" &&
    typeof promise.catch === "function"
  );
}
