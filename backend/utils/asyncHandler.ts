// using asyncHandler promises to handle async errors in Express routes
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};
export default asyncHandler;

// asyncHandler using try catch
// const asyncHandler = (fn: Function) => async (req: any, res: any, next: any) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     next(error);
//   }
// }
// export default asyncHandler;
