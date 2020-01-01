require('ignore-styles')

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-class-properties']
})

// cluster 
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const clusterMap = {};
const clusterflag = process.argv.indexOf('cluster') >= 0 ? true :false;
if(clusterflag){
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      const worker = cluster.fork()
      clusterMap[worker.id] = i;
      worker.send({ cpu: worker.id });
    }
  
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
  
    process.on('message', msg => {
      process.env.cpuCore = msg.cpu;
      // console.log(`Worker ${(process.env.cpuCore)} started`);
      // console.log('Message from master:', msg);
      require('./server')
  
    });
}

} else{
  require('./server')

}