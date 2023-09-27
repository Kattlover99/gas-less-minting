const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  helpers,
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

const {
  getEventsValueByTx,
  showSignersList,
} = require("../testscripts/helper.js");

const fixture = async () => {
  const signers = await ethers.getSigners();

  const addresses = {
    owner: signers[0],
    user1: signers[1],
    user2: signers[2]
  };

  const GASL = await ethers.getContractFactory("GASL");
  const gasl = await GASL.deploy(addresses.owner);
  await gasl.deployed();

  return {
    addresses,
    gasl,
    signers,
  };
};

describe("Testing", async () => {
  const tokens = {}
  const GASLAbi =
    require("../artifacts/contracts/GASL.sol/GASL.json").abi;
  describe("Mint testing", async () => {
    before("Should initial preparation", async () => {
      tokens = {
        addresses,
        gasl,
        signers
      } = await loadFixture(fixture);

    })

    it("Should deploy correctly and initialize", async () => {
      const {
        addresses,
        gasl,
        signers
      } = tokens

      // check to if the set functions working
      // await queueFactory.setAthStaking(athStaking.address);

      // expect(await queueFactory.athStaking()).to.equal(
      //   athStaking.address
      // );

    });

    // it("Should create queue", async () => {
    //   const { addresses, queueFactory } = tokens;

    //   // create queue
    //   await queueFactory
    //     .connect(addresses.owner)
    //     .createQueue(addresses.tmp1.address, {
    //       value: etherAmount,
    //     });

    //   // number of queue increase
    //   queueCnt++;

    //   // check if correct number
    //   expect(await queueInfo.queuesLength()).to.equal(queueCnt);
    // });

    // it("Should remove queue from queue factory", async () => {
    //   const { addresses, queueFactory, queueInfo } = tokens;

    //   // remove queue already created by index
    //   await queueInfo.removeQueueByIndex(1);

    //   // check queues
    //   expect(await queueInfo.queuesLength()).to.equal(BigInt(0));

    //   // create queues
    //   await queueFactory
    //     .connect(addresses.owner)
    //     .createQueue(addresses.trader1.address, {
    //       value: etherAmount,
    //     });

    //   await queueFactory
    //     .connect(addresses.owner)
    //     .createQueue(addresses.referrer1.address, {
    //       value: etherAmount,
    //     });

    //   await queueFactory
    //     .connect(addresses.owner)
    //     .createQueue(addresses.referrer2.address, {
    //       value: etherAmount,
    //     });

    //   await queueFactory
    //     .connect(addresses.owner)
    //     .createQueue(addresses.referrer3.address, {
    //       value: etherAmount,
    //     });

    //   await queueFactory
    //     .connect(addresses.owner)
    //     .createQueueByOwner(addresses.investor3.address);

    //   await queueFactory
    //     .connect(addresses.owner)
    //     .createQueueByOwner(addresses.investor2.address);

    //   // get the list of queue
    //   let queueList = await queueInfo.getQueues.call();

    //   expect(await queueInfo.queuesLength()).to.equal(BigInt(6));

    //   // remove by address array
    //   await queueInfo.removeQueuesByAddress([queueList[5], queueList[3]]);

    //   // check the remove action
    //   expect(await queueInfo.queuesLength()).to.equal(BigInt(4));

    //   queueList = await queueInfo.getQueues.call();

    //   tokens.queueList = queueList;
    // });

    // it("Should allow tokens", async () => {
    //   const { queueFactory, queueInfo, addresses } = tokens;

    //   // add allow tokens
    //   await queueInfo.addAllowedToken([addresses.tmp1.address]);

    //   // check
    //   expect(
    //     await queueInfo.AllowedTokens(addresses.tmp1.address)
    //   ).to.equal(true);
    // });

    // it("Should remove tokens", async () => {
    //   const { queueInfo, addresses } = tokens;

    //   // add allow tokens
    //   await queueInfo.addAllowedToken([addresses.tmp2.address]);

    //   // check
    //   expect(
    //     await queueInfo.AllowedTokens(addresses.tmp2.address)
    //   ).to.equal(true);

    //   // remove tokens
    //   await queueInfo.removeAllowedToken([
    //     addresses.tmp1.address,
    //     addresses.tmp2.address,
    //   ]);

    //   // check
    //   expect(
    //     await queueInfo.AllowedTokens(addresses.tmp2.address)
    //   ).to.equal(false);

    //   expect(
    //     await queueInfo.AllowedTokens(addresses.tmp1.address)
    //   ).to.equal(false);
    // });

    // it("Should add short to queue", async () => {
    //   const { queueInfo, queueList, shortFactory } = tokens;

    //   const queue1 = new ethers.Contract(
    //     queueList[0],
    //     queueAbi,
    //     addresses.owner
    //   );

    //   // add short to queue
    //   await queueInfo.addShortToQueue(queue1.address);

    //   // check
    //   expect(await queue1.shortOrderContract.call()).to.equal(
    //     await shortFactory.shorts(0)
    //   );
    // });
  });

  // describe("AthQueue", async () => {
  //   it("Should invest to the queue", async () => {
  //     const {
  //       addresses,
  //       testCurrency,
  //       athToken,
  //       athStaking,
  //       athReferral,
  //       queueFactory,
  //       shortFactory,
  //       queueList,
  //       queueInfo,
  //     } = tokens;

  //     const queue1 = new ethers.Contract(
  //       queueList[0],
  //       queueAbi,
  //       addresses.owner
  //     );

  //     // assign users currency
  //     await testCurrency.transfer(
  //       addresses.investor1.address,
  //       userCurrency
  //     );
  //     await testCurrency.transfer(
  //       addresses.investor2.address,
  //       userCurrency
  //     );
  //     await testCurrency.transfer(
  //       addresses.investor3.address,
  //       userCurrency
  //     );

  //     // add allow tokens in queue factory
  //     await queueInfo.addAllowedToken([testCurrency.address]);
  //     // add allow tokens in queue
  //     await queue1.addToAllowed([testCurrency.address]);

  //     // initialize
  //     await queue1.initializeRound(testCurrency.address, minContribute);

  //     // before invest, must allow
  //     await testCurrency
  //       .connect(addresses.investor1)
  //       .approve(queue1.address, amount2);

  //     // users1 invest money less then min contribution
  //     await expect(
  //       queue1.connect(addresses.investor1).invest(amount1)
  //     ).to.revertedWith("15");

  //     // users invest money to the queue contract
  //     await queue1.connect(addresses.investor1).invest(amount2);

  //     expect(await testCurrency.balanceOf(queue1.address)).to.equal(
  //       amount2
  //     );

  //     tokens.queue1 = queue1;
  //   });

  //   it("Should add invest amount and address", async () => {
  //     const { queue1, queueList, addresses } = tokens;

  //     // check before invest action
  //     expect(
  //       await queue1.standbyAmount(addresses.investor1.address)
  //     ).to.equal(amount2);
  //     expect(await queue1.standbyAddress(0)).to.equal(
  //       addresses.investor1.address
  //     );

  //     // before invest, must allow
  //     await testCurrency
  //       .connect(addresses.investor2)
  //       .approve(queue1.address, amount3);

  //     // user2 invest to the queue contract
  //     await queue1.connect(addresses.investor2).invest(amount3);

  //     // check current invest action
  //     expect(
  //       await queue1.standbyAmount(addresses.investor2.address)
  //     ).to.equal(amount3);
  //     expect(await queue1.standbyAddress(1)).to.equal(
  //       addresses.investor2.address
  //     );

  //     // user1 invest again, approve and then invest
  //     await testCurrency
  //       .connect(addresses.investor1)
  //       .approve(queue1.address, amount3);

  //     await queue1.connect(addresses.investor1).invest(amount3);

  //     // check the user1 invest amount
  //     expect(
  //       await queue1.standbyAmount(addresses.investor1.address)
  //     ).to.equal(amount2 + amount3);
  //   });

  //   it("Should withdraw invested amount", async () => {
  //     const { queue1, addresses } = tokens;

  //     // withdraw invest amount
  //     await queue1.connect(addresses.investor2).withdraw();

  //     // check the standby amount
  //     expect(
  //       await queue1.standbyAmount(addresses.investor2.address)
  //     ).to.equal(0n);

  //     // check the cnt of investors
  //     expect((await queue1.getStandbyInfo())[0].length).to.equal(1);
  //   });

  //   it("Should start trading", async () => {
  //     const { queue1, addresses, testCurrency } = tokens;

  //     // invest to the queue
  //     await testCurrency
  //       .connect(addresses.investor2)
  //       .approve(queue1.address, amount3);

  //     await testCurrency
  //       .connect(addresses.investor3)
  //       .approve(queue1.address, amount4);

  //     await queue1.connect(addresses.investor2).invest(amount3);

  //     await queue1.connect(addresses.investor3).invest(amount4);

  //     // start trading
  //     await queue1.connect(addresses.trader1).startTrading();

  //     // check current state
  //     expect(await queue1.currentState()).to.equal(BigInt(1));

  //     // check standby address is null
  //     expect((await queue1.getStandbyInfo())[0].length).to.equal(0);

  //     // check trading amount
  //     const tradingAmount1 = await queue1.totalTradingAmount();

  //     expect(tradingAmount1).to.equal(
  //       amount2 + amount3 + amount3 + amount4
  //     );

  //     const traderAddr1 = await queue1.traderContract();

  //     // check trading balance
  //     expect(await testCurrency.balanceOf(traderAddr1)).to.equal(
  //       tradingAmount1
  //     );

  //     const traderCon1 = new ethers.Contract(
  //       traderAddr1,
  //       tradingAbi,
  //       addresses.owner
  //     );

  //     tokens.traderCon1 = traderCon1;
  //   });
  // });

  // describe("Trading", async () => {
  //   it("Should invest more when trading is active", async () => {
  //     const { athReferral, addresses, traderCon1, queue1, testCurrency } =
  //       tokens;

  //     // referral actions
  //     await athReferral.addUserReferrer(
  //       addresses.trader1.address,
  //       addresses.referrer1.address
  //     );
  //     await athReferral.addUserReferrer(
  //       addresses.trader2.address,
  //       addresses.referrer2.address
  //     );

  //     // await athReferral.getReferrer

  //     // referrers invest
  //     await testCurrency.transfer(
  //       addresses.referrer1.address,
  //       userCurrency
  //     );
  //     await testCurrency.transfer(
  //       addresses.referrer2.address,
  //       userCurrency
  //     );
  //     await testCurrency
  //       .connect(addresses.referrer1)
  //       .approve(queue1.address, amount5);
  //     await testCurrency
  //       .connect(addresses.referrer2)
  //       .approve(queue1.address, amount5);
  //     await queue1.connect(addresses.referrer1).invest(amount5);
  //     await queue1.connect(addresses.referrer2).invest(amount5);

  //     const newInvest = BigInt(amount5) + BigInt(amount5);

  //     // additional currency : mean trading profit
  //     const tradinProfit1 = amount2;
  //     await testCurrency.transfer(traderCon1.address, tradinProfit1);

  //     tokens.tradingAmount1 = BigInt(await queue1.totalTradingAmount());

  //     tokens.tradingAmountResult1 =
  //       BigInt(await queue1.totalTradingAmount()) +
  //       BigInt(tradinProfit1);

  //     tokens.newInvest = newInvest;
  //     tokens.tradinProfit1 = tradinProfit1;

  //     expect(await testCurrency.balanceOf(traderCon1.address)).to.equal(
  //       tokens.tradingAmountResult1
  //     );

  //     // conclude trading
  //     await traderCon1.connect(addresses.trader1).endTradingContract();

  //     // console.log("trader1", await testCurrency.balanceOf(addresses.trader1.address))
  //   });
  // });

  // describe("AthQueue conclude Trading", async () => {
  //   it("Should claim claimable amount", async () => {
  //     const {
  //       newInvest,
  //       athReferral,
  //       addresses,
  //       traderCon1,
  //       tradingAmount1,
  //       queue1,
  //       testCurrency,
  //       tradinProfit1,
  //       tradingAmountResult1,
  //     } = tokens;

  //     // get rewardRate
  //     const rewardRate = await queue1.rewardRate();

  //     // console.log(rewardRate)

  //     const traderFee = await queue1.traderFee();

  //     const claimedAmt = await queue1.claimableAmount(
  //       addresses.investor1.address
  //     );

  //     // console.log("claimedAmt",claimedAmt)

  //     const investAmt1 = amount2 + amount3;

  //     const afterFee =
  //       (BigInt(investAmt1) * BigInt(rewardRate)) / BigInt(1000000000) -
  //       (((BigInt(investAmt1) * BigInt(rewardRate)) /
  //         BigInt(1000000000) -
  //         BigInt(investAmt1)) *
  //         BigInt(traderFee)) /
  //       BigInt(100);

  //     expect(afterFee).to.equal(claimedAmt);

  //     // console.log(await queue1.getclaimableInfo())

  //     // claim harvest amount
  //     await queue1.connect(addresses.investor1).harvestReward();

  //     // check if the amount is right
  //     expect(
  //       await queue1.claimableAmount(addresses.investor1.address)
  //     ).to.equal(0);

  //     expect(
  //       await queue1.userClaimedAmount(addresses.investor1.address)
  //     ).to.equal(claimedAmt);

  //     const newTradingAmount1 =
  //       BigInt(tradingAmountResult1) -
  //       (((BigInt(tradingAmount1) * BigInt(rewardRate)) /
  //         BigInt(1000000000) -
  //         BigInt(tradingAmount1)) *
  //         BigInt(traderFee)) /
  //       BigInt(100);

  //     tokens.claimedAmt = claimedAmt;
  //     tokens.tradingAmount1 = newTradingAmount1;
  //   });

  //   it("Should start trading again with claimable amount and more invest", async () => {
  //     const {
  //       athReferral,
  //       addresses,
  //       traderCon1,
  //       queue1,
  //       testCurrency,
  //       tradingAmount1,
  //       claimedAmt,
  //       newInvest,
  //       tradingAmountResult1,
  //     } = tokens;

  //     // console.log(await queue1.getTraderInfo())
  //     // console.log(await queue1.getStandbyInfo())
  //     // console.log(await queue1.getclaimableInfo())

  //     // start trading again
  //     await queue1.startTrading();

  //     // get new trading contract address
  //     const traderAddr2 = await queue1.traderContract();

  //     // get new trading contract
  //     const traderCon2 = new ethers.Contract(
  //       traderAddr2,
  //       tradingAbi,
  //       addresses.owner
  //     );

  //     const tradingAmount2 =
  //       BigInt(tradingAmount1) + BigInt(newInvest) - BigInt(claimedAmt);
  //     // check balance of tading contract
  //     expect(await testCurrency.balanceOf(traderCon2.address)).to.equal(
  //       tradingAmount2
  //     );

  //     tokens.tradingAmount2 = tradingAmount2;
  //     tokens.traderAddr2 = traderAddr2;
  //     tokens.traderCon2 = traderCon2;
  //   });

  //   it("Should get referral fee", async () => {
  //     const {
  //       signers,
  //       addresses,
  //       traderCon2,
  //       testCurrency,
  //       tradingAmount2,
  //       queue1,
  //       athReferral,
  //     } = tokens;

  //     // additional currency : mean trading profit
  //     const tradinProfit2 = amount2;

  //     await testCurrency.transfer(traderCon2.address, tradinProfit2);

  //     expect(await testCurrency.balanceOf(traderCon2.address)).to.equal(
  //       tradingAmount2 + BigInt(tradinProfit2)
  //     );

  //     const finalTradingAmount2 = tradingAmount2 + BigInt(tradinProfit2);

  //     const traderAmoutList = (await queue1.getTraderInfo())[0];

  //     let TAmt = BigInt(0);

  //     for (let index = 0; index < traderAmoutList.length; index++) {
  //       const element = traderAmoutList[index];
  //       TAmt += BigInt(element);
  //     }

  //     const traderAddressList = (await queue1.getTraderInfo())[1];

  //     // conclude trading
  //     let tx = await traderCon2
  //       .connect(addresses.trader1)
  //       .endTradingContract();

  //     // Catch the emitted event using expectEvent
  //     let eventValue = await getEventsValueByTx(tx, "Distributed");

  //     const claimableAmoutList = (await queue1.getclaimableInfo())[0];
  //     const claimableAddressList = (await queue1.getclaimableInfo())[1];

  //     for (let index = 0; index < traderAmoutList.length; index++) {
  //       const tAmt = traderAmoutList[index];
  //       const cAmt = claimableAmoutList[index];

  //       // Accuracy claimable amount to 3 decimal places
  //       expect(
  //         ((BigInt(amount2) * BigInt(tAmt)) /
  //           BigInt(TAmt) /
  //           BigInt(2) +
  //           BigInt(tAmt) -
  //           BigInt(cAmt)) /
  //         BigInt(1000000000000000)
  //       ).to.equal(0);
  //     }

  //     const referralFee =
  //       ((BigInt(amount2) * BigInt(traderAmoutList[0])) /
  //         BigInt(TAmt) /
  //         BigInt(2) /
  //         BigInt(20)) *
  //       BigInt(2);

  //     expect(
  //       referralFee -
  //       BigInt(await testCurrency.balanceOf(athReferral.address))
  //     ).to.be.lessThan(BigInt(1000000000000000));

  //     expect(await testCurrency.balanceOf(athReferral.address)).to.equal(
  //       eventValue[2]
  //     );

  //     tokens.finalTradingAmount2 = finalTradingAmount2;
  //   });
  // });
});