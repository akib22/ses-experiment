const AWS = require("aws-sdk");
require('dotenv').config();


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES();
const cw = new AWS.CloudWatch();

// var params = {
//   EndTime: new Date, /* required */
//   MetricName: 'test2CloudWatch', /* required */
//   Namespace: 'STRING_VALUE', /* required */
//   Period: 648000, /* required */
//   StartTime: new Date('Wed Jan 31 2020 16:00:00 GMT-0800 (PST)'), /* required */
//   Dimensions: [
//     {
//       Name: 'STRING_VALUE', /* required */
//       Value: 'STRING_VALUE' /* required */
//     },
//     /* more items */
//   ],
//   ExtendedStatistics: [
//     'p100',
//     /* more items */
//   ],
//   Statistics: [
//     'SampleCount'
//   ],
//   // Unit: Seconds | Microseconds | Milliseconds | Bytes | Kilobytes | Megabytes | Gigabytes | Terabytes | Bits | Kilobits | Megabits | Gigabits | Terabits | Percent | Count | Bytes/Second | Kilobytes/Second | Megabytes/Second | Gigabytes/Second | Terabytes/Second | Bits/Second | Kilobits/Second | Megabits/Second | Gigabits/Second | Terabits/Second | Count/Second | None
//   Unit: 'Seconds'
// };

// cw.getMetricStatistics(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

// const params = {
//   Destination: {
//     ToAddresses: ["yvondac13@gbouquete1.com"] // Email address/addresses that you want to send your email
//   },
//   Message: {
//     Body: {
//       Html: {
//         // HTML Format of the email
//         Charset: "UTF-8",
//         Data:
//           "<html><body><h1>Hello  Charith</h1><p style='color:red'>Sample description</p> <p>Time 1517831318946</p></body></html>"
//       },
//       Text: {
//         Charset: "UTF-8",
//         Data: "Hello Charith Sample description time 1517831318946"
//       }
//     },
//     Subject: {
//       Charset: "UTF-8",
//       Data: "Test email"
//     }
//   },
//   Source: "simeon@gbouquete.com"
// };

// ses.verifyEmailIdentity({ EmailAddress: "yvondac13@gbouquete.com" }, (err, data) => {
//   if(err) console.error(err);
//   else if(data) {
//     console.log(data, '<---- I am data.');
//   }
// });

// ses.getSendStatistics({}, (err, data) => {
//   if(err) console.error(err);
//   else console.log(data);
// })

// const sendEmail = ses.sendEmail(params).promise();

// sendEmail
//   .then(data => {
//     console.log("email submitted to SES", data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

var params = {
  StartTime: "1971-09-14T07:25:00.000Z",
  EndTime: "2020-09-23T07:25:00.000Z",
  MetricDataQueries: [
    /* required */
    {
      Id: "m2",
      MetricStat: {
        Metric: {
          /* required */
          Dimensions: [{ Name: "test2CloudWatch", Value: "test2CloudWatch" }],
          MetricName: "Click",
          Namespace: "AWS/SES",
        },
        Period: 300 /* required */,
        Stat: "Sum" /* required */,
        // Unit: 'Bytes'
        //| Microseconds | Milliseconds | Bytes | Kilobytes | Megabytes | Gigabytes | Terabytes | Bits | Kilobits | Megabits | Gigabits | Terabits | Percent | Count | Bytes/Second | Kilobytes/Second | Megabytes/Second | Gigabytes/Second | Terabytes/Second | Bits/Second | Kilobits/Second | Megabits/Second | Gigabits/Second | Terabits/Second | Count/Second | None
      },
      // Period: 68400,
      ReturnData: true,
    },
    /* more items */
  ],
  // MaxDatapoints: 100,
  NextToken: null,
  // NextToken: 'AByIAzaDuXYAyRFThiRt8u0j6++hqhleCUYokuRC5hZfpY4Kr0wR9HwoRjz+0vpRz1Fu7UWT2ON4Hj8PWVy7ikzZ8QOEPEKFxShJe5RZxy1o62FgGeHjFdJCIq64SxaqYIV8yz2sAxY7fsjILbqsDM4=',
  // ScanBy: "TimestampDescending",
};

const payload = {
  Metrics: [
    {
      Alias: "m2",
      Namespace: "AWS/SES",
      MetricName: "Click",
      Dimensions: [{ Name: "test2CloudWatch", Value: "test2CloudWatch" }],
      Id: "m2",
      ReturnData: true,
    },
  ],
  Defaults: {
    Period: 300,
    Stat: "Average",
    Range: {
      StartTime: "2020-09-14T07:25:00.000Z",
      EndTime: "2020-09-21T07:25:00.000Z",
    },
  },
  NextToken: null,
};

cw.getMetricData(params, function (err, data) {
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data, data.MetricDataResults[0].Values); // successful response
});
