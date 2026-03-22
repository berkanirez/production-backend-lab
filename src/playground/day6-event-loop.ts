// function logSection(title: string): void {
//   console.log(`\n===== ${title} =====`);
// }

// // --------------------------------------------------
// // 1) Call stack ve temel sıralama
// // --------------------------------------------------
// function first(): void {
//   console.log("first başladı");
//   console.log("first bitti");
// }

// function second(): void {
//   console.log("second başladı");
//   first();
//   console.log("second bitti");
// }

// // --------------------------------------------------
// // 2) setTimeout vs Promise
// // --------------------------------------------------
// function timerAndPromiseDemo(): void {
//   console.log("demo başladı");

//   setTimeout(() => {
//     console.log("setTimeout callback çalıştı");
//   }, 0);

//   Promise.resolve().then(() => {
//     console.log("Promise.then çalıştı");
//   });

//   console.log("demo bitti");
// }

// // --------------------------------------------------
// // 3) Async işler: sırayla mı, birlikte mi?
// // --------------------------------------------------
// function wait(ms: number): Promise<void> {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// async function fetchUsersFake(): Promise<string[]> {
//   await wait(1000);
//   return ["Berkan", "Ayse", "Mehmet"];
// }

// async function fetchProjectsFake(): Promise<string[]> {
//   await wait(1000);
//   return ["Backend Lab", "CRM Module"];
// }

// async function fetchTasksFake(): Promise<string[]> {
//   await wait(1000);
//   return ["Setup project", "Write routes", "Add validation"];
// }

// async function runSequentialDemo(): Promise<void> {
//   console.time("sequential");

//   const users = await fetchUsersFake();
//   const projects = await fetchProjectsFake();
//   const tasks = await fetchTasksFake();

//   console.log("sequential users:", users);
//   console.log("sequential projects:", projects);
//   console.log("sequential tasks:", tasks);

//   console.timeEnd("sequential");
// }

// async function runParallelDemo(): Promise<void> {
//   console.time("parallel");

//   const [users, projects, tasks] = await Promise.all([
//     fetchUsersFake(),
//     fetchProjectsFake(),
//     fetchTasksFake(),
//   ]);

//   console.log("parallel users:", users);
//   console.log("parallel projects:", projects);
//   console.log("parallel tasks:", tasks);

//   console.timeEnd("parallel");
// }

// // --------------------------------------------------
// // 4) CPU-bound blocking örneği
// // --------------------------------------------------
// function heavyCpuTask(): void {
//   console.log("heavyCpuTask başladı");

//   let total = 0;

//   for (let i = 0; i < 1_000_000_000; i++) {
//     total += i;
//   }

//   console.log("heavyCpuTask bitti:", total);
// }

// function blockingDemo(): void {
//   console.log("blocking demo başladı");

//   setTimeout(() => {
//     console.log("timer callback çalıştı");
//   }, 0);

//   heavyCpuTask();

//   console.log("blocking demo bitti");
// }

// // --------------------------------------------------
// // Main
// // --------------------------------------------------
// async function main(): Promise<void> {
//   logSection("1) Call Stack");
//   second();

//   logSection("2) Timer vs Promise");
//   timerAndPromiseDemo();

//   await wait(100);

//   logSection("3A) Sequential Async");
//   await runSequentialDemo();

//   logSection("3B) Parallel Async");
//   await runParallelDemo();

//   logSection("4) Blocking Demo");
//   blockingDemo();
// }

// main().catch((error) => {
//   console.error("Main function error:", error);
// });