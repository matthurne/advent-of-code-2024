import fs from 'fs'
import * as readline from "node:readline";

const day1part1 = async () => {
  const nums1: number[] = [];
  const nums2: number[] = [];

  const fileStream = fs.createReadStream('./input/day-1-input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const nums = line.split(/ +/);
    nums1.push(Number(nums[0]));
    nums2.push(Number(nums[1]));
  }

  nums1.sort();
  nums2.sort();

  let sum = 0;
  for (let i = 0; i < nums1.length; i++) {
    const num1 = nums1[i];
    const num2 = nums2[i];
    if (num1 && num2) {
      if (num1 > num2) {
        sum += num1 - num2;
      } else {
        sum += num2 - num1;
      }
    }
  }

  console.log(sum);
};

const day1part2 = async () => {
  const nums1: number[] = [];
  const nums2: number[] = [];

  const fileStream = fs.createReadStream('./input/day-1-input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const nums = line.split(/ +/);
    nums1.push(Number(nums[0]));
    nums2.push(Number(nums[1]));
  }

  nums1.sort();
  nums2.sort();

  let sum = 0;
  for (let i = 0; i < nums1.length; i++) {
    const num1 = nums1[i];
    if (num1) {
      const occurrences = nums2.reduce((previousValue, currentValue, currentIndex, array) => currentValue === num1 ? previousValue + 1 : previousValue, 0);
      sum += num1 * occurrences;
    }
  }

  console.log(sum);
};

const day2part1 = async () => {
  const fileStream = fs.createReadStream('./input/day-2-input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let safeCount = 0;
  for await (const line of rl) {
    let safe = true;
    const parts = line.split(/ +/);
    const report: number[] = [];
    for (const part of parts) {
      report.push(Number(part));
    }

    const increasing = report[0] && report[1] && report[0] < report[1];
    for (let i = 0; i < report.length - 1; i++) {
      const current = report[i];
      const next = report[i + 1];
      if (current && next) {
        if (current < next !== increasing) {
          safe = false;
        }

        const diff = increasing ? next - current : current - next;
        if (diff < 1 || diff > 3) {
          safe = false;
        }
      }
    }

    if (safe) {
      safeCount++;
    }
  }

  console.log(safeCount);
};

const isSafe = (report: number[]) => {
  console.log(JSON.stringify(report));

  let safe = true;
  const increasing = report[0] && report[1] && report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    const current = report[i];
    const next = report[i + 1];
    if (current && next) {
      if (current < next !== increasing) {
        safe = false;
      } else {
        const diff = increasing ? next - current : current - next;
        if (diff < 1 || diff > 3) {
          safe = false;
        }
      }
    }
  }
  return safe;
};

const day2part2 = async () => {
  const fileStream = fs.createReadStream('./input/day-2-input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let safeCount = 0;
  for await (const line of rl) {
    const parts = line.split(/ +/);
    const report: number[] = [];
    for (const part of parts) {
      report.push(Number(part));
    }

    let safe = isSafe(report);
    let removeIdx = 0;
    while (!safe && removeIdx < report.length) {
      const modifiedReport = report.slice();
      modifiedReport.splice(removeIdx, 1);
      safe = isSafe(modifiedReport);
      removeIdx++;
    }

    if (safe) {
      safeCount++;
    }
  }

  console.log(safeCount);
};

day1part1().then();
day1part2().then();
day2part1().then();
day2part2().then();
