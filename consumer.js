const sqsClient = new SQSClient(configObject);
const { Consumer } = require('sqs-consumer');
const queueUrl = '';

const app = Consumer.create({
    queueUrl: queueUrl,
    sqs: sqsClient,
    handleMessage: async (message) => {
        console.log(message);
    }
})

app.on("processing_error", (err) => {
    console.log(err);
});

app.start();