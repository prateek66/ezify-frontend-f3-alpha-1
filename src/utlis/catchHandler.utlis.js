export const catchHandler = (fn) => {
  fn().catch((err) => {
    console.log(err);
  });
};
