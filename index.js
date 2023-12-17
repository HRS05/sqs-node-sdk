const { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs');
const { configObject } = require('./cred');
const sqsClient = new SQSClient(configObject);
const queueUrl = '';


const sendMessageToQueue = async(body, messageGroupId, messageDeduplicationId) => {
    try {
        const command = new SendMessageCommand({
            MessageBody: body,
            QueueUrl: queueUrl,
            MessageGroupId: messageGroupId,
            MessageDeduplicationId: messageDeduplicationId,
            MessageAttributes: {
                orderId: { DataType: "String", StringValue: "4421x" }
            },
        });
        const result = await sqsClient.send(command);
        console.log(result);
    }catch(e) {
        console.log(e);
    }
};

const pollMessageFromQueue = async(messageGroupId, messageDeduplicationId) => {
    try {
        const command = new ReceiveMessageCommand({
            MaxNumberOfMessages: 10,
            QueueUrl: queueUrl,
            MessageGroupId: messageGroupId,
            MessageDeduplicationId: messageDeduplicationId,
            WaitTimeSeconds: 5,
            MessageAttributes: ['All'],
        });
        const result = await sqsClient.send(command);
        console.log(result);

        // process data here....
        // const deleteResult = await deleteMessageFromQueue({receiptHandler: result.message[0].ReceiptHandle});
        // console.log(deleteResult);

    }catch(e) {
        console.log(e);
    }
};

const deleteMessageFromQueue = async(receiptHandler) => {
    try {
        const data = await sqsClient.send(
            new DeleteMessageCommand({
                QueueUrl: queueUrl,
                ReceiptHandle: receiptHandler
            })
        );
    }catch(e) {
        console.log(e);
    }
}


//pollMessageFromQueue("group-1", "unique-dedup-id-1");

//sendMessageToQueue("first from node", "group-2", "unique-dedup-id-1");
