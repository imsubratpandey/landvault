const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

//const JAN_1ST_2030 = 1893456000;
//const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("LockModule", (m) => {
  //const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  //const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const smartcontract = m.contract("SmartContract", []);

  return { smartcontract };
});


// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// // const JAN_1ST_2030 = 1893456000;
// // const ONE_GWEI = 1_000_000_000n;

// module.exports = buildModule("TaskToDoModule", (m) => {
//     // const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
//     // const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

//     const taskToDo = m.contract("TaskToDo", []);

//     return { taskToDo };
// });

// // 0xEcfA9ca282e05393df4d1161bD4A1d3711F3c3a5