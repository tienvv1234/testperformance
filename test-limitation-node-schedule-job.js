const schedule = require("node-schedule");

// for (let index = 0; index < 10000; index++) {
//   const job = schedule.scheduleJob("10 * * * * *", function (fireDate) {
//     console.log(
//       "This job was supposed to run at " +
//         fireDate +
//         ", but actually ran at " +
//         new Date() + ', index: ' + index
//     );
//   });
//   console.log(`job ${index}`);
// }

const job = schedule.scheduleJob("10 * * * * *", function (fireDate) {
    console.log(
      "This job was supposed to run at " +
        fireDate +
        ", but actually ran at " +
        new Date() + ', index: ' + index
    );
  });

  job.cancel();

console.log("done");
