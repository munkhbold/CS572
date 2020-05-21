setTimeout(() => { console.log('timeout 1'); }, 0);
setImmediate(() => { console.log('immediate'); });
process.nextTick(() => console.log('nexttick'));
setTimeout(() => { console.log('timeout 2'); }, 0);