/*
  This function takes in another function and executes it, catching any
  errors it throws using "throw". This way, a try block is not
  needed in the asyncFunction, and we can have a single "catch" function
  that deals with all errors.

  Before:
  asyncFunc() {
    try {
      regular asyncFunc code
    } catch {
      async func errror handling 
    }
  }

  After:
  asyncFunc() {
    regular asyncFunc code
  }
*/
function catchAsync(asyncFunc) {
  return function wrapper(request, response, next) {
    asyncFunc(request, response, next).catch(next);
  };
}
